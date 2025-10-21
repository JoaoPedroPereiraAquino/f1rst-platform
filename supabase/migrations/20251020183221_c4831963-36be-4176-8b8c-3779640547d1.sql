-- ========================================
-- FASE 1: Configuração Completa do Banco de Dados
-- Sistema de Autenticação F1rst Platform
-- ========================================

-- 1. Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS public.perfis (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  foto_url TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS na tabela perfis
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para perfis
CREATE POLICY "Usuários podem ver próprio perfil"
  ON public.perfis FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON public.perfis FOR UPDATE
  USING (auth.uid() = id);

-- 2. Trigger para criar perfil automaticamente no signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.perfis (id, nome_completo, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome_completo', 'Usuário F1rst'),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Criar trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Adicionar políticas RLS faltantes em assinaturas_usuario
CREATE POLICY "Usuários podem inserir própria assinatura"
  ON public.assinaturas_usuario FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem atualizar própria assinatura"
  ON public.assinaturas_usuario FOR UPDATE
  USING (auth.uid() = usuario_id);

-- 4. Criar view para verificar status da assinatura do usuário
CREATE OR REPLACE VIEW public.status_assinatura_usuario AS
SELECT 
  u.id as usuario_id,
  p.nome_completo,
  p.email,
  p.foto_url,
  COALESCE(a.status, 'free') as status_plano,
  COALESCE(pl.slug, 'free') as slug_plano,
  COALESCE(pl.acesso_telemetria_tempo_real, false) as tem_acesso_tempo_real,
  CASE 
    WHEN a.status = 'active' AND a.periodo_atual_fim > NOW() THEN true
    ELSE false
  END as assinatura_ativa,
  a.periodo_atual_inicio,
  a.periodo_atual_fim,
  pl.nome as nome_plano
FROM auth.users u
LEFT JOIN public.perfis p ON u.id = p.id
LEFT JOIN public.assinaturas_usuario a ON u.id = a.usuario_id
LEFT JOIN public.planos_assinatura pl ON a.plano_id = pl.id;

-- 5. Trigger para atualizar updated_at em perfis
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_perfil_updated ON public.perfis;
CREATE TRIGGER on_perfil_updated
  BEFORE UPDATE ON public.perfis
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();