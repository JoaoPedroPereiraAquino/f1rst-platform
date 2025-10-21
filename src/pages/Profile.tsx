import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState(profile?.nome_completo || '');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleUpdateProfile = async () => {
    if (!user || !profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('perfis')
        .update({ nome_completo: nomeCompleto })
        .eq('id', profile.usuario_id);

      if (error) throw error;

      await refreshProfile();
      toast.success('Perfil atualizado com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.foto_url || undefined} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(profile.nome_completo)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <CardTitle className="text-2xl">{profile.nome_completo}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </div>
                <Badge variant={profile.assinatura_ativa ? 'default' : 'secondary'}>
                  {profile.assinatura_ativa ? 'Premium' : 'Free'}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Edit Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Editar Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="opacity-60"
                />
                <p className="text-xs text-muted-foreground">
                  O email não pode ser alterado
                </p>
              </div>
              <Button
                onClick={handleUpdateProfile}
                disabled={loading || nomeCompleto === profile.nome_completo}
                className="w-full"
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Info */}
          <Card>
            <CardHeader>
              <CardTitle>Assinatura</CardTitle>
              <CardDescription>
                Informações sobre seu plano atual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Plano Atual</span>
                <Badge variant={profile.assinatura_ativa ? 'default' : 'secondary'}>
                  {profile.nome_plano || 'Free'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium">
                  {profile.assinatura_ativa ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Acesso Tempo Real</span>
                <span className="text-sm font-medium">
                  {profile.tem_acesso_tempo_real ? 'Sim' : 'Não'}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/subscription')}
              >
                Gerenciar Assinatura
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
