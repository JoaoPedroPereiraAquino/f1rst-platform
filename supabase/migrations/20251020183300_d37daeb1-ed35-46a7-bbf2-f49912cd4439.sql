-- ========================================
-- CORREÇÃO: Segurança da View status_assinatura_usuario
-- ========================================

-- Remover view anterior que expõe auth.users
DROP VIEW IF EXISTS public.status_assinatura_usuario;

-- Criar view segura que usa apenas a tabela perfis
CREATE OR REPLACE VIEW public.status_assinatura_usuario 
WITH (security_invoker=true) AS
SELECT 
  p.id as usuario_id,
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
FROM public.perfis p
LEFT JOIN public.assinaturas_usuario a ON p.id = a.usuario_id
LEFT JOIN public.planos_assinatura pl ON a.plano_id = pl.id;