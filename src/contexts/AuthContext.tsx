import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  usuario_id: string;
  nome_completo: string;
  email: string;
  foto_url: string | null;
  status_plano: string;
  slug_plano: string;
  tem_acesso_tempo_real: boolean;
  assinatura_ativa: boolean;
  nome_plano: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  hasActivePremium: boolean;
  signUp: (email: string, password: string, nomeCompleto: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('status_assinatura_usuario')
        .select('*')
        .eq('usuario_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  useEffect(() => {
    // Configurar listener de autenticação PRIMEIRO
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Usar setTimeout para evitar deadlock
        if (currentSession?.user) {
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // DEPOIS verificar sessão existente
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        setTimeout(() => {
          fetchProfile(currentSession.user.id);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, nomeCompleto: string) => {
    try {
      // Limpar storage antigo para evitar quota exceeded
      try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('sb-') && key.includes('-auth-token')) {
            localStorage.removeItem(key);
          }
        });
      } catch (storageError) {
        console.warn('Erro ao limpar localStorage:', storageError);
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nome_completo: nomeCompleto,
          },
        },
      });

      if (error) {
        // Traduzir erros comuns
        if (error.message.includes('already registered')) {
          return { error: { message: 'Este email já está cadastrado. Faça login.' } };
        }
        return { error };
      }

      toast.success('Conta criada com sucesso!');
      return { error: null };
    } catch (error: any) {
      if (error.message?.includes('quota')) {
        return { error: { message: 'Erro ao salvar dados. Limpe o cache do navegador.' } };
      }
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Limpar storage antigo para evitar quota exceeded
      try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('sb-') && key.includes('-auth-token')) {
            localStorage.removeItem(key);
          }
        });
      } catch (storageError) {
        console.warn('Erro ao limpar localStorage:', storageError);
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Traduzir erros comuns
        if (error.message.includes('Invalid login credentials')) {
          return { error: { message: 'Email ou senha incorretos' } };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: { message: 'Por favor, confirme seu email primeiro' } };
        }
        return { error };
      }

      toast.success('Login realizado com sucesso!');
      return { error: null };
    } catch (error: any) {
      if (error.message?.includes('quota')) {
        return { error: { message: 'Erro ao salvar dados. Limpe o cache do navegador.' } };
      }
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/auth?reset=true`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) return { error };

      toast.success('Email de recuperação enviado!');
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const hasActivePremium = profile?.assinatura_ativa && profile?.tem_acesso_tempo_real;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        hasActivePremium: hasActivePremium || false,
        signUp,
        signIn,
        signOut,
        resetPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
