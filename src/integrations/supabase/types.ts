export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alertas_usuario: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          condicoes: Json
          criado_em: string | null
          descricao: string | null
          frequencia: string | null
          id: string
          limite_por_dia: number | null
          nome: string
          notificar_app: boolean | null
          notificar_email: boolean | null
          notificar_push: boolean | null
          notificar_sms: boolean | null
          total_disparos: number | null
          ultimo_disparo: string | null
          usuario_id: string
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          condicoes: Json
          criado_em?: string | null
          descricao?: string | null
          frequencia?: string | null
          id?: string
          limite_por_dia?: number | null
          nome: string
          notificar_app?: boolean | null
          notificar_email?: boolean | null
          notificar_push?: boolean | null
          notificar_sms?: boolean | null
          total_disparos?: number | null
          ultimo_disparo?: string | null
          usuario_id: string
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          condicoes?: Json
          criado_em?: string | null
          descricao?: string | null
          frequencia?: string | null
          id?: string
          limite_por_dia?: number | null
          nome?: string
          notificar_app?: boolean | null
          notificar_email?: boolean | null
          notificar_push?: boolean | null
          notificar_sms?: boolean | null
          total_disparos?: number | null
          ultimo_disparo?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alertas_usuario_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      assinaturas_usuario: {
        Row: {
          atualizado_em: string | null
          cancelado_em: string | null
          cancelar_no_fim_periodo: boolean | null
          ciclo_cobranca: string
          codigo_promocional: string | null
          criado_em: string | null
          id: string
          motivo_cancelamento: string | null
          origem_assinatura: string | null
          periodo_atual_fim: string | null
          periodo_atual_inicio: string | null
          plano_id: string
          quantidade: number | null
          status: string
          stripe_current_period_end: string | null
          stripe_current_period_start: string | null
          stripe_customer_id: string
          stripe_latest_invoice_id: string | null
          stripe_subscription_id: string
          trial_fim: string | null
          trial_inicio: string | null
          usuario_id: string
          valor_desconto: number | null
        }
        Insert: {
          atualizado_em?: string | null
          cancelado_em?: string | null
          cancelar_no_fim_periodo?: boolean | null
          ciclo_cobranca: string
          codigo_promocional?: string | null
          criado_em?: string | null
          id?: string
          motivo_cancelamento?: string | null
          origem_assinatura?: string | null
          periodo_atual_fim?: string | null
          periodo_atual_inicio?: string | null
          plano_id: string
          quantidade?: number | null
          status?: string
          stripe_current_period_end?: string | null
          stripe_current_period_start?: string | null
          stripe_customer_id: string
          stripe_latest_invoice_id?: string | null
          stripe_subscription_id: string
          trial_fim?: string | null
          trial_inicio?: string | null
          usuario_id: string
          valor_desconto?: number | null
        }
        Update: {
          atualizado_em?: string | null
          cancelado_em?: string | null
          cancelar_no_fim_periodo?: boolean | null
          ciclo_cobranca?: string
          codigo_promocional?: string | null
          criado_em?: string | null
          id?: string
          motivo_cancelamento?: string | null
          origem_assinatura?: string | null
          periodo_atual_fim?: string | null
          periodo_atual_inicio?: string | null
          plano_id?: string
          quantidade?: number | null
          status?: string
          stripe_current_period_end?: string | null
          stripe_current_period_start?: string | null
          stripe_customer_id?: string
          stripe_latest_invoice_id?: string | null
          stripe_subscription_id?: string
          trial_fim?: string | null
          trial_inicio?: string | null
          usuario_id?: string
          valor_desconto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_usuario_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_assinatura"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assinaturas_usuario_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: true
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      avaliacoes_produto: {
        Row: {
          aprovado: boolean | null
          atualizado_em: string | null
          comentario: string | null
          compra_verificada: boolean | null
          contador_nao_util: number | null
          contador_util: number | null
          criado_em: string | null
          id: string
          imagens: Json | null
          moderado: boolean | null
          nota: number
          pedido_id: string | null
          produto_id: string
          respondido_em: string | null
          resposta_vendedor: string | null
          titulo: string | null
          usuario_id: string
        }
        Insert: {
          aprovado?: boolean | null
          atualizado_em?: string | null
          comentario?: string | null
          compra_verificada?: boolean | null
          contador_nao_util?: number | null
          contador_util?: number | null
          criado_em?: string | null
          id?: string
          imagens?: Json | null
          moderado?: boolean | null
          nota: number
          pedido_id?: string | null
          produto_id: string
          respondido_em?: string | null
          resposta_vendedor?: string | null
          titulo?: string | null
          usuario_id: string
        }
        Update: {
          aprovado?: boolean | null
          atualizado_em?: string | null
          comentario?: string | null
          compra_verificada?: boolean | null
          contador_nao_util?: number | null
          contador_util?: number | null
          criado_em?: string | null
          id?: string
          imagens?: Json | null
          moderado?: boolean | null
          nota?: number
          pedido_id?: string | null
          produto_id?: string
          respondido_em?: string | null
          resposta_vendedor?: string | null
          titulo?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "avaliacoes_produto_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avaliacoes_produto_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avaliacoes_produto_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_marketplace: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          categoria_pai_id: string | null
          criado_em: string | null
          descricao: string | null
          icone: string | null
          id: string
          imagem_url: string | null
          nome: string
          ordem_exibicao: number | null
          slug: string
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          categoria_pai_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          icone?: string | null
          id?: string
          imagem_url?: string | null
          nome: string
          ordem_exibicao?: number | null
          slug: string
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          categoria_pai_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          icone?: string | null
          id?: string
          imagem_url?: string | null
          nome?: string
          ordem_exibicao?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_marketplace_categoria_pai_id_fkey"
            columns: ["categoria_pai_id"]
            isOneToOne: false
            referencedRelation: "categorias_marketplace"
            referencedColumns: ["id"]
          },
        ]
      }
      circuitos: {
        Row: {
          altitude_metros: number | null
          ano_recorde_volta: number | null
          ativo: boolean | null
          atualizado_em: string | null
          comprimento_metros: number | null
          criado_em: string | null
          direcao_percurso: string | null
          ergast_circuit_id: string | null
          id: string
          latitude: number | null
          localizacao: string | null
          longitude: number | null
          nome: string
          nome_completo: string | null
          numero_curvas: number | null
          numero_curvas_direita: number | null
          numero_curvas_esquerda: number | null
          numero_voltas: number | null
          openf1_circuit_key: string | null
          pais_id: string
          piloto_recorde_volta: string | null
          primeiro_grand_prix: number | null
          tempo_recorde_volta: string | null
          tipo_circuito: string | null
          url_imagem_circuito: string | null
          url_layout_3d: string | null
          url_mapa_circuito: string | null
          url_site_oficial: string | null
          url_wikipedia: string | null
          velocidade_maxima_kmh: number | null
        }
        Insert: {
          altitude_metros?: number | null
          ano_recorde_volta?: number | null
          ativo?: boolean | null
          atualizado_em?: string | null
          comprimento_metros?: number | null
          criado_em?: string | null
          direcao_percurso?: string | null
          ergast_circuit_id?: string | null
          id?: string
          latitude?: number | null
          localizacao?: string | null
          longitude?: number | null
          nome: string
          nome_completo?: string | null
          numero_curvas?: number | null
          numero_curvas_direita?: number | null
          numero_curvas_esquerda?: number | null
          numero_voltas?: number | null
          openf1_circuit_key?: string | null
          pais_id: string
          piloto_recorde_volta?: string | null
          primeiro_grand_prix?: number | null
          tempo_recorde_volta?: string | null
          tipo_circuito?: string | null
          url_imagem_circuito?: string | null
          url_layout_3d?: string | null
          url_mapa_circuito?: string | null
          url_site_oficial?: string | null
          url_wikipedia?: string | null
          velocidade_maxima_kmh?: number | null
        }
        Update: {
          altitude_metros?: number | null
          ano_recorde_volta?: number | null
          ativo?: boolean | null
          atualizado_em?: string | null
          comprimento_metros?: number | null
          criado_em?: string | null
          direcao_percurso?: string | null
          ergast_circuit_id?: string | null
          id?: string
          latitude?: number | null
          localizacao?: string | null
          longitude?: number | null
          nome?: string
          nome_completo?: string | null
          numero_curvas?: number | null
          numero_curvas_direita?: number | null
          numero_curvas_esquerda?: number | null
          numero_voltas?: number | null
          openf1_circuit_key?: string | null
          pais_id?: string
          piloto_recorde_volta?: string | null
          primeiro_grand_prix?: number | null
          tempo_recorde_volta?: string | null
          tipo_circuito?: string | null
          url_imagem_circuito?: string | null
          url_layout_3d?: string | null
          url_mapa_circuito?: string | null
          url_site_oficial?: string | null
          url_wikipedia?: string | null
          velocidade_maxima_kmh?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "circuitos_pais_id_fkey"
            columns: ["pais_id"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id"]
          },
        ]
      }
      classificacao_equipes: {
        Row: {
          atualizado_apos_evento: boolean | null
          atualizado_em: string | null
          criado_em: string | null
          equipe_id: string
          id: string
          podios: number | null
          pole_positions: number | null
          pontos: number | null
          posicao: number
          temporada_id: string
          ultima_corrida_id: string | null
          vitorias: number | null
          voltas_mais_rapidas: number | null
        }
        Insert: {
          atualizado_apos_evento?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          equipe_id: string
          id?: string
          podios?: number | null
          pole_positions?: number | null
          pontos?: number | null
          posicao: number
          temporada_id: string
          ultima_corrida_id?: string | null
          vitorias?: number | null
          voltas_mais_rapidas?: number | null
        }
        Update: {
          atualizado_apos_evento?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          equipe_id?: string
          id?: string
          podios?: number | null
          pole_positions?: number | null
          pontos?: number | null
          posicao?: number
          temporada_id?: string
          ultima_corrida_id?: string | null
          vitorias?: number | null
          voltas_mais_rapidas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "classificacao_equipes_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classificacao_equipes_temporada_id_fkey"
            columns: ["temporada_id"]
            isOneToOne: false
            referencedRelation: "temporadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classificacao_equipes_ultima_corrida_id_fkey"
            columns: ["ultima_corrida_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
        ]
      }
      classificacao_pilotos: {
        Row: {
          atualizado_apos_evento: boolean | null
          atualizado_em: string | null
          corridas_disputadas: number | null
          corridas_terminadas: number | null
          criado_em: string | null
          equipe_id: string
          id: string
          piloto_id: string
          podios: number | null
          pole_positions: number | null
          pontos: number | null
          posicao: number
          segundo_lugares: number | null
          temporada_id: string
          terceiro_lugares: number | null
          ultima_corrida_id: string | null
          vitorias: number | null
          voltas_lideradas: number | null
          voltas_mais_rapidas: number | null
        }
        Insert: {
          atualizado_apos_evento?: boolean | null
          atualizado_em?: string | null
          corridas_disputadas?: number | null
          corridas_terminadas?: number | null
          criado_em?: string | null
          equipe_id: string
          id?: string
          piloto_id: string
          podios?: number | null
          pole_positions?: number | null
          pontos?: number | null
          posicao: number
          segundo_lugares?: number | null
          temporada_id: string
          terceiro_lugares?: number | null
          ultima_corrida_id?: string | null
          vitorias?: number | null
          voltas_lideradas?: number | null
          voltas_mais_rapidas?: number | null
        }
        Update: {
          atualizado_apos_evento?: boolean | null
          atualizado_em?: string | null
          corridas_disputadas?: number | null
          corridas_terminadas?: number | null
          criado_em?: string | null
          equipe_id?: string
          id?: string
          piloto_id?: string
          podios?: number | null
          pole_positions?: number | null
          pontos?: number | null
          posicao?: number
          segundo_lugares?: number | null
          temporada_id?: string
          terceiro_lugares?: number | null
          ultima_corrida_id?: string | null
          vitorias?: number | null
          voltas_lideradas?: number | null
          voltas_mais_rapidas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "classificacao_pilotos_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classificacao_pilotos_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classificacao_pilotos_temporada_id_fkey"
            columns: ["temporada_id"]
            isOneToOne: false
            referencedRelation: "temporadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classificacao_pilotos_ultima_corrida_id_fkey"
            columns: ["ultima_corrida_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_corrida: {
        Row: {
          bandeira: string | null
          categoria: string
          criado_em: string | null
          escopo: string | null
          id: string
          mensagem: string
          piloto_id: string | null
          sessao_id: string
          setor: number | null
          timestamp_utc: string
          volta_numero: number | null
        }
        Insert: {
          bandeira?: string | null
          categoria: string
          criado_em?: string | null
          escopo?: string | null
          id?: string
          mensagem: string
          piloto_id?: string | null
          sessao_id: string
          setor?: number | null
          timestamp_utc: string
          volta_numero?: number | null
        }
        Update: {
          bandeira?: string | null
          categoria?: string
          criado_em?: string | null
          escopo?: string | null
          id?: string
          mensagem?: string
          piloto_id?: string | null
          sessao_id?: string
          setor?: number | null
          timestamp_utc?: string
          volta_numero?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "controle_corrida_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "controle_corrida_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      enderecos_usuario: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          bairro: string
          cep: string
          cidade: string
          complemento: string | null
          criado_em: string | null
          email: string | null
          estado: string
          id: string
          latitude: number | null
          longitude: number | null
          nome_destinatario: string
          numero: string
          padrao: boolean | null
          pais: string | null
          rotulo: string | null
          rua: string
          telefone: string | null
          usuario_id: string
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          bairro: string
          cep: string
          cidade: string
          complemento?: string | null
          criado_em?: string | null
          email?: string | null
          estado: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome_destinatario: string
          numero: string
          padrao?: boolean | null
          pais?: string | null
          rotulo?: string | null
          rua: string
          telefone?: string | null
          usuario_id: string
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          bairro?: string
          cep?: string
          cidade?: string
          complemento?: string | null
          criado_em?: string | null
          email?: string | null
          estado?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome_destinatario?: string
          numero?: string
          padrao?: boolean | null
          pais?: string | null
          rotulo?: string | null
          rua?: string
          telefone?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enderecos_usuario_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      equipes: {
        Row: {
          ano_primeira_entrada: number | null
          ativo: boolean | null
          atualizado_em: string | null
          campeonatos_construtores: number | null
          campeonatos_pilotos: number | null
          chassis: string | null
          chefe_equipe: string | null
          codigo: string | null
          cor_primaria: string | null
          cor_secundaria: string | null
          criado_em: string | null
          diretor_tecnico: string | null
          ergast_constructor_id: string | null
          fornecedor_pneus: string | null
          id: string
          localizacao_base: string | null
          nome: string
          nome_completo: string | null
          nome_exibicao: string | null
          openf1_team_key: string | null
          pais_sede_id: string | null
          total_podios: number | null
          total_pole_positions: number | null
          total_vitorias: number | null
          total_voltas_mais_rapidas: number | null
          unidade_potencia: string | null
          url_facebook: string | null
          url_instagram: string | null
          url_logo: string | null
          url_logo_small: string | null
          url_site_oficial: string | null
          url_twitter: string | null
          url_wikipedia: string | null
        }
        Insert: {
          ano_primeira_entrada?: number | null
          ativo?: boolean | null
          atualizado_em?: string | null
          campeonatos_construtores?: number | null
          campeonatos_pilotos?: number | null
          chassis?: string | null
          chefe_equipe?: string | null
          codigo?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          criado_em?: string | null
          diretor_tecnico?: string | null
          ergast_constructor_id?: string | null
          fornecedor_pneus?: string | null
          id?: string
          localizacao_base?: string | null
          nome: string
          nome_completo?: string | null
          nome_exibicao?: string | null
          openf1_team_key?: string | null
          pais_sede_id?: string | null
          total_podios?: number | null
          total_pole_positions?: number | null
          total_vitorias?: number | null
          total_voltas_mais_rapidas?: number | null
          unidade_potencia?: string | null
          url_facebook?: string | null
          url_instagram?: string | null
          url_logo?: string | null
          url_logo_small?: string | null
          url_site_oficial?: string | null
          url_twitter?: string | null
          url_wikipedia?: string | null
        }
        Update: {
          ano_primeira_entrada?: number | null
          ativo?: boolean | null
          atualizado_em?: string | null
          campeonatos_construtores?: number | null
          campeonatos_pilotos?: number | null
          chassis?: string | null
          chefe_equipe?: string | null
          codigo?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          criado_em?: string | null
          diretor_tecnico?: string | null
          ergast_constructor_id?: string | null
          fornecedor_pneus?: string | null
          id?: string
          localizacao_base?: string | null
          nome?: string
          nome_completo?: string | null
          nome_exibicao?: string | null
          openf1_team_key?: string | null
          pais_sede_id?: string | null
          total_podios?: number | null
          total_pole_positions?: number | null
          total_vitorias?: number | null
          total_voltas_mais_rapidas?: number | null
          unidade_potencia?: string | null
          url_facebook?: string | null
          url_instagram?: string | null
          url_logo?: string | null
          url_logo_small?: string | null
          url_site_oficial?: string | null
          url_twitter?: string | null
          url_wikipedia?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipes_pais_sede_id_fkey"
            columns: ["pais_sede_id"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos: {
        Row: {
          atualizado_em: string | null
          circuito_id: string
          criado_em: string | null
          data_fim: string | null
          data_inicio: string
          ergast_race_id: string | null
          formato_weekend: string | null
          fuso_horario: string | null
          gmt_offset: unknown | null
          id: string
          nome: string
          nome_curto: string | null
          nome_oficial: string | null
          numero_corrida: number
          openf1_meeting_key: string | null
          rodada: number | null
          status: string | null
          temporada_id: string
          tipo_evento: string | null
          url_circuito: string | null
          url_site_oficial: string | null
          url_wikipedia: string | null
        }
        Insert: {
          atualizado_em?: string | null
          circuito_id: string
          criado_em?: string | null
          data_fim?: string | null
          data_inicio: string
          ergast_race_id?: string | null
          formato_weekend?: string | null
          fuso_horario?: string | null
          gmt_offset?: unknown | null
          id?: string
          nome: string
          nome_curto?: string | null
          nome_oficial?: string | null
          numero_corrida: number
          openf1_meeting_key?: string | null
          rodada?: number | null
          status?: string | null
          temporada_id: string
          tipo_evento?: string | null
          url_circuito?: string | null
          url_site_oficial?: string | null
          url_wikipedia?: string | null
        }
        Update: {
          atualizado_em?: string | null
          circuito_id?: string
          criado_em?: string | null
          data_fim?: string | null
          data_inicio?: string
          ergast_race_id?: string | null
          formato_weekend?: string | null
          fuso_horario?: string | null
          gmt_offset?: unknown | null
          id?: string
          nome?: string
          nome_curto?: string | null
          nome_oficial?: string | null
          numero_corrida?: number
          openf1_meeting_key?: string | null
          rodada?: number | null
          status?: string | null
          temporada_id?: string
          tipo_evento?: string | null
          url_circuito?: string | null
          url_site_oficial?: string | null
          url_wikipedia?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eventos_circuito_id_fkey"
            columns: ["circuito_id"]
            isOneToOne: false
            referencedRelation: "circuitos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_temporada_id_fkey"
            columns: ["temporada_id"]
            isOneToOne: false
            referencedRelation: "temporadas"
            referencedColumns: ["id"]
          },
        ]
      }
      favoritos_usuario: {
        Row: {
          circuito_id: string | null
          criado_em: string | null
          equipe_id: string | null
          evento_id: string | null
          id: string
          notificar_estatisticas: boolean | null
          notificar_noticias: boolean | null
          notificar_resultados: boolean | null
          piloto_id: string | null
          sessao_id: string | null
          tipo_favorito: string
          usuario_id: string
        }
        Insert: {
          circuito_id?: string | null
          criado_em?: string | null
          equipe_id?: string | null
          evento_id?: string | null
          id?: string
          notificar_estatisticas?: boolean | null
          notificar_noticias?: boolean | null
          notificar_resultados?: boolean | null
          piloto_id?: string | null
          sessao_id?: string | null
          tipo_favorito: string
          usuario_id: string
        }
        Update: {
          circuito_id?: string | null
          criado_em?: string | null
          equipe_id?: string | null
          evento_id?: string | null
          id?: string
          notificar_estatisticas?: boolean | null
          notificar_noticias?: boolean | null
          notificar_resultados?: boolean | null
          piloto_id?: string | null
          sessao_id?: string | null
          tipo_favorito?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_usuario_circuito_id_fkey"
            columns: ["circuito_id"]
            isOneToOne: false
            referencedRelation: "circuitos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_usuario_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_usuario_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_usuario_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_usuario_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_usuario_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      historico_pagamentos: {
        Row: {
          assinatura_id: string | null
          bandeira_cartao: string | null
          criado_em: string | null
          data_vencimento: string | null
          descricao: string | null
          id: string
          metodo_pagamento: string | null
          moeda: string | null
          pedido_marketplace_id: string | null
          processado_em: string | null
          status: string
          stripe_charge_id: string | null
          stripe_checkout_session_id: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          taxa_processamento: number | null
          tentativas_cobranca: number | null
          ultimos_4_digitos: string | null
          url_recibo: string | null
          usuario_id: string
          valor: number
          valor_liquido: number | null
          webhook_data: Json | null
          webhook_recebido_em: string | null
        }
        Insert: {
          assinatura_id?: string | null
          bandeira_cartao?: string | null
          criado_em?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id?: string
          metodo_pagamento?: string | null
          moeda?: string | null
          pedido_marketplace_id?: string | null
          processado_em?: string | null
          status: string
          stripe_charge_id?: string | null
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          taxa_processamento?: number | null
          tentativas_cobranca?: number | null
          ultimos_4_digitos?: string | null
          url_recibo?: string | null
          usuario_id: string
          valor: number
          valor_liquido?: number | null
          webhook_data?: Json | null
          webhook_recebido_em?: string | null
        }
        Update: {
          assinatura_id?: string | null
          bandeira_cartao?: string | null
          criado_em?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id?: string
          metodo_pagamento?: string | null
          moeda?: string | null
          pedido_marketplace_id?: string | null
          processado_em?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          taxa_processamento?: number | null
          tentativas_cobranca?: number | null
          ultimos_4_digitos?: string | null
          url_recibo?: string | null
          usuario_id?: string
          valor?: number
          valor_liquido?: number | null
          webhook_data?: Json | null
          webhook_recebido_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_historico_pagamentos_pedido_marketplace_id"
            columns: ["pedido_marketplace_id"]
            isOneToOne: false
            referencedRelation: "pedidos_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historico_pagamentos_assinatura_id_fkey"
            columns: ["assinatura_id"]
            isOneToOne: false
            referencedRelation: "assinaturas_usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historico_pagamentos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      historico_status_api: {
        Row: {
          cabecalhos_resposta: Json | null
          codigo_resposta_http: number | null
          corpo_resposta_sample: string | null
          id: string
          mensagem_erro: string | null
          servico_api_id: string
          status: string
          tempo_resposta_ms: number | null
          verificado_em: string | null
        }
        Insert: {
          cabecalhos_resposta?: Json | null
          codigo_resposta_http?: number | null
          corpo_resposta_sample?: string | null
          id?: string
          mensagem_erro?: string | null
          servico_api_id: string
          status: string
          tempo_resposta_ms?: number | null
          verificado_em?: string | null
        }
        Update: {
          cabecalhos_resposta?: Json | null
          codigo_resposta_http?: number | null
          corpo_resposta_sample?: string | null
          id?: string
          mensagem_erro?: string | null
          servico_api_id?: string
          status?: string
          tempo_resposta_ms?: number | null
          verificado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historico_status_api_servico_api_id_fkey"
            columns: ["servico_api_id"]
            isOneToOne: false
            referencedRelation: "status_servicos_api"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historico_status_api_servico_api_id_fkey"
            columns: ["servico_api_id"]
            isOneToOne: false
            referencedRelation: "vw_status_apis_resumo"
            referencedColumns: ["id"]
          },
        ]
      }
      incidentes_api: {
        Row: {
          acoes_preventivas: string | null
          atualizado_em: string | null
          causa_raiz: string | null
          criado_em: string | null
          descricao: string | null
          duracao_minutos: number | null
          fim_incidente: string | null
          id: string
          impacto: string | null
          inicio_incidente: string
          primeiro_impacto: string | null
          reportado_por: string | null
          requests_afetadas: number | null
          resolucao: string | null
          resolvido_em: string | null
          responsavel_id: string | null
          servico_api_id: string
          severidade: string
          status_incidente: string
          titulo: string
          usuarios_afetados: number | null
        }
        Insert: {
          acoes_preventivas?: string | null
          atualizado_em?: string | null
          causa_raiz?: string | null
          criado_em?: string | null
          descricao?: string | null
          duracao_minutos?: number | null
          fim_incidente?: string | null
          id?: string
          impacto?: string | null
          inicio_incidente: string
          primeiro_impacto?: string | null
          reportado_por?: string | null
          requests_afetadas?: number | null
          resolucao?: string | null
          resolvido_em?: string | null
          responsavel_id?: string | null
          servico_api_id: string
          severidade?: string
          status_incidente?: string
          titulo: string
          usuarios_afetados?: number | null
        }
        Update: {
          acoes_preventivas?: string | null
          atualizado_em?: string | null
          causa_raiz?: string | null
          criado_em?: string | null
          descricao?: string | null
          duracao_minutos?: number | null
          fim_incidente?: string | null
          id?: string
          impacto?: string | null
          inicio_incidente?: string
          primeiro_impacto?: string | null
          reportado_por?: string | null
          requests_afetadas?: number | null
          resolucao?: string | null
          resolvido_em?: string | null
          responsavel_id?: string | null
          servico_api_id?: string
          severidade?: string
          status_incidente?: string
          titulo?: string
          usuarios_afetados?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "incidentes_api_reportado_por_fkey"
            columns: ["reportado_por"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidentes_api_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidentes_api_servico_api_id_fkey"
            columns: ["servico_api_id"]
            isOneToOne: false
            referencedRelation: "status_servicos_api"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidentes_api_servico_api_id_fkey"
            columns: ["servico_api_id"]
            isOneToOne: false
            referencedRelation: "vw_status_apis_resumo"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_pedido_marketplace: {
        Row: {
          criado_em: string | null
          downloads_restantes: number | null
          expira_em: string | null
          id: string
          nome_produto: string
          pedido_id: string
          preco_total: number
          preco_unitario: number
          produto_id: string
          quantidade: number
          sku_produto: string | null
          url_download: string | null
        }
        Insert: {
          criado_em?: string | null
          downloads_restantes?: number | null
          expira_em?: string | null
          id?: string
          nome_produto: string
          pedido_id: string
          preco_total: number
          preco_unitario: number
          produto_id: string
          quantidade: number
          sku_produto?: string | null
          url_download?: string | null
        }
        Update: {
          criado_em?: string | null
          downloads_restantes?: number | null
          expira_em?: string | null
          id?: string
          nome_produto?: string
          pedido_id?: string
          preco_total?: number
          preco_unitario?: number
          produto_id?: string
          quantidade?: number
          sku_produto?: string | null
          url_download?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itens_pedido_marketplace_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_pedido_marketplace_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos_marketplace"
            referencedColumns: ["id"]
          },
        ]
      }
      log_atividades_usuario: {
        Row: {
          categoria: string | null
          cidade: string | null
          criado_em: string | null
          descricao: string | null
          duracao_ms: number | null
          endereco_ip: unknown | null
          entidade_id: string | null
          entidade_tipo: string | null
          id: string
          metadados: Json | null
          pais: string | null
          sessao_usuario_id: string | null
          tipo_atividade: string
          url_destino: string | null
          url_origem: string | null
          user_agent: string | null
          usuario_id: string | null
        }
        Insert: {
          categoria?: string | null
          cidade?: string | null
          criado_em?: string | null
          descricao?: string | null
          duracao_ms?: number | null
          endereco_ip?: unknown | null
          entidade_id?: string | null
          entidade_tipo?: string | null
          id?: string
          metadados?: Json | null
          pais?: string | null
          sessao_usuario_id?: string | null
          tipo_atividade: string
          url_destino?: string | null
          url_origem?: string | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Update: {
          categoria?: string | null
          cidade?: string | null
          criado_em?: string | null
          descricao?: string | null
          duracao_ms?: number | null
          endereco_ip?: unknown | null
          entidade_id?: string | null
          entidade_tipo?: string | null
          id?: string
          metadados?: Json | null
          pais?: string | null
          sessao_usuario_id?: string | null
          tipo_atividade?: string
          url_destino?: string | null
          url_origem?: string | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_atividades_usuario_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      log_erros_aplicacao: {
        Row: {
          cabecalhos_requisicao: Json | null
          categoria: string
          codigo_erro: string | null
          contexto: Json | null
          criado_em: string | null
          endereco_ip: unknown | null
          id: string
          mensagem: string
          metodo_http: string | null
          nivel: string
          ocorrencias: number | null
          parametros_requisicao: Json | null
          primeira_ocorrencia: string | null
          resolucao: string | null
          resolvido: boolean | null
          resolvido_em: string | null
          sessao_id: string | null
          stack_trace: string | null
          ultima_ocorrencia: string | null
          url: string | null
          user_agent: string | null
          usuario_id: string | null
        }
        Insert: {
          cabecalhos_requisicao?: Json | null
          categoria: string
          codigo_erro?: string | null
          contexto?: Json | null
          criado_em?: string | null
          endereco_ip?: unknown | null
          id?: string
          mensagem: string
          metodo_http?: string | null
          nivel: string
          ocorrencias?: number | null
          parametros_requisicao?: Json | null
          primeira_ocorrencia?: string | null
          resolucao?: string | null
          resolvido?: boolean | null
          resolvido_em?: string | null
          sessao_id?: string | null
          stack_trace?: string | null
          ultima_ocorrencia?: string | null
          url?: string | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Update: {
          cabecalhos_requisicao?: Json | null
          categoria?: string
          codigo_erro?: string | null
          contexto?: Json | null
          criado_em?: string | null
          endereco_ip?: unknown | null
          id?: string
          mensagem?: string
          metodo_http?: string | null
          nivel?: string
          ocorrencias?: number | null
          parametros_requisicao?: Json | null
          primeira_ocorrencia?: string | null
          resolucao?: string | null
          resolvido?: boolean | null
          resolvido_em?: string | null
          sessao_id?: string | null
          stack_trace?: string | null
          ultima_ocorrencia?: string | null
          url?: string | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_erros_aplicacao_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      log_requisicoes_api: {
        Row: {
          cabecalhos: Json | null
          cabecalhos_resposta: Json | null
          cache_hit: boolean | null
          cache_key: string | null
          codigo_resposta: number | null
          corpo_requisicao: string | null
          corpo_resposta_sample: string | null
          criado_em: string | null
          endpoint_origem: string | null
          erro: string | null
          finalidade: string | null
          id: string
          metodo: string
          servico_api_id: string | null
          sucesso: boolean | null
          tamanho_resposta_bytes: number | null
          tempo_resposta_ms: number | null
          url: string
          usuario_id: string | null
        }
        Insert: {
          cabecalhos?: Json | null
          cabecalhos_resposta?: Json | null
          cache_hit?: boolean | null
          cache_key?: string | null
          codigo_resposta?: number | null
          corpo_requisicao?: string | null
          corpo_resposta_sample?: string | null
          criado_em?: string | null
          endpoint_origem?: string | null
          erro?: string | null
          finalidade?: string | null
          id?: string
          metodo: string
          servico_api_id?: string | null
          sucesso?: boolean | null
          tamanho_resposta_bytes?: number | null
          tempo_resposta_ms?: number | null
          url: string
          usuario_id?: string | null
        }
        Update: {
          cabecalhos?: Json | null
          cabecalhos_resposta?: Json | null
          cache_hit?: boolean | null
          cache_key?: string | null
          codigo_resposta?: number | null
          corpo_requisicao?: string | null
          corpo_resposta_sample?: string | null
          criado_em?: string | null
          endpoint_origem?: string | null
          erro?: string | null
          finalidade?: string | null
          id?: string
          metodo?: string
          servico_api_id?: string | null
          sucesso?: boolean | null
          tamanho_resposta_bytes?: number | null
          tempo_resposta_ms?: number | null
          url?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_requisicoes_api_servico_api_id_fkey"
            columns: ["servico_api_id"]
            isOneToOne: false
            referencedRelation: "status_servicos_api"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "log_requisicoes_api_servico_api_id_fkey"
            columns: ["servico_api_id"]
            isOneToOne: false
            referencedRelation: "vw_status_apis_resumo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "log_requisicoes_api_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      notificacoes: {
        Row: {
          agendada_para: string | null
          botao_acao_texto: string | null
          canal: string | null
          categoria: string | null
          criado_em: string | null
          dados: Json | null
          enviada: boolean | null
          enviada_em: string | null
          expira_em: string | null
          id: string
          lida: boolean | null
          lida_em: string | null
          mensagem: string
          prioridade: string | null
          tipo: string
          titulo: string
          url_acao: string | null
          usuario_id: string
        }
        Insert: {
          agendada_para?: string | null
          botao_acao_texto?: string | null
          canal?: string | null
          categoria?: string | null
          criado_em?: string | null
          dados?: Json | null
          enviada?: boolean | null
          enviada_em?: string | null
          expira_em?: string | null
          id?: string
          lida?: boolean | null
          lida_em?: string | null
          mensagem: string
          prioridade?: string | null
          tipo: string
          titulo: string
          url_acao?: string | null
          usuario_id: string
        }
        Update: {
          agendada_para?: string | null
          botao_acao_texto?: string | null
          canal?: string | null
          categoria?: string | null
          criado_em?: string | null
          dados?: Json | null
          enviada?: boolean | null
          enviada_em?: string | null
          expira_em?: string | null
          id?: string
          lida?: boolean | null
          lida_em?: string | null
          mensagem?: string
          prioridade?: string | null
          tipo?: string
          titulo?: string
          url_acao?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      paises: {
        Row: {
          ativo: boolean | null
          codigo_iso2: string
          codigo_iso3: string | null
          criado_em: string | null
          ergast_country_id: string | null
          id: string
          nome: string
          openf1_country_key: string | null
        }
        Insert: {
          ativo?: boolean | null
          codigo_iso2: string
          codigo_iso3?: string | null
          criado_em?: string | null
          ergast_country_id?: string | null
          id?: string
          nome: string
          openf1_country_key?: string | null
        }
        Update: {
          ativo?: boolean | null
          codigo_iso2?: string
          codigo_iso3?: string | null
          criado_em?: string | null
          ergast_country_id?: string | null
          id?: string
          nome?: string
          openf1_country_key?: string | null
        }
        Relationships: []
      }
      participacoes_sessao: {
        Row: {
          criado_em: string | null
          equipe_id: string
          id: string
          melhor_tempo: string | null
          melhor_volta: number | null
          motivo_ausencia: string | null
          numero_carro: number
          participou: boolean | null
          piloto_id: string
          sessao_id: string
          total_voltas: number | null
          voltas_validas: number | null
        }
        Insert: {
          criado_em?: string | null
          equipe_id: string
          id?: string
          melhor_tempo?: string | null
          melhor_volta?: number | null
          motivo_ausencia?: string | null
          numero_carro: number
          participou?: boolean | null
          piloto_id: string
          sessao_id: string
          total_voltas?: number | null
          voltas_validas?: number | null
        }
        Update: {
          criado_em?: string | null
          equipe_id?: string
          id?: string
          melhor_tempo?: string | null
          melhor_volta?: number | null
          motivo_ausencia?: string | null
          numero_carro?: number
          participou?: boolean | null
          piloto_id?: string
          sessao_id?: string
          total_voltas?: number | null
          voltas_validas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "participacoes_sessao_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participacoes_sessao_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participacoes_sessao_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_marketplace: {
        Row: {
          atualizado_em: string | null
          cancelado_em: string | null
          codigo_cupom: string | null
          codigo_rastreamento: string | null
          comprador_id: string
          criado_em: string | null
          endereco_entrega_id: string | null
          entregue_em: string | null
          enviado_em: string | null
          id: string
          metodo_pagamento: string | null
          moeda: string | null
          numero_pedido: string
          observacoes: string | null
          observacoes_internas: string | null
          pago_em: string | null
          prazo_entrega_dias: number | null
          status: string
          status_pagamento: string | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          subtotal: number
          tipo_desconto: string | null
          tipo_entrega: string | null
          transportadora: string | null
          valor_desconto: number | null
          valor_desconto_aplicado: number | null
          valor_frete: number | null
          valor_taxa: number | null
          valor_total: number
        }
        Insert: {
          atualizado_em?: string | null
          cancelado_em?: string | null
          codigo_cupom?: string | null
          codigo_rastreamento?: string | null
          comprador_id: string
          criado_em?: string | null
          endereco_entrega_id?: string | null
          entregue_em?: string | null
          enviado_em?: string | null
          id?: string
          metodo_pagamento?: string | null
          moeda?: string | null
          numero_pedido: string
          observacoes?: string | null
          observacoes_internas?: string | null
          pago_em?: string | null
          prazo_entrega_dias?: number | null
          status?: string
          status_pagamento?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal: number
          tipo_desconto?: string | null
          tipo_entrega?: string | null
          transportadora?: string | null
          valor_desconto?: number | null
          valor_desconto_aplicado?: number | null
          valor_frete?: number | null
          valor_taxa?: number | null
          valor_total: number
        }
        Update: {
          atualizado_em?: string | null
          cancelado_em?: string | null
          codigo_cupom?: string | null
          codigo_rastreamento?: string | null
          comprador_id?: string
          criado_em?: string | null
          endereco_entrega_id?: string | null
          entregue_em?: string | null
          enviado_em?: string | null
          id?: string
          metodo_pagamento?: string | null
          moeda?: string | null
          numero_pedido?: string
          observacoes?: string | null
          observacoes_internas?: string | null
          pago_em?: string | null
          prazo_entrega_dias?: number | null
          status?: string
          status_pagamento?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal?: number
          tipo_desconto?: string | null
          tipo_entrega?: string | null
          transportadora?: string | null
          valor_desconto?: number | null
          valor_desconto_aplicado?: number | null
          valor_frete?: number | null
          valor_taxa?: number | null
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_marketplace_comprador_id_fkey"
            columns: ["comprador_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_marketplace_endereco_entrega_id_fkey"
            columns: ["endereco_entrega_id"]
            isOneToOne: false
            referencedRelation: "enderecos_usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          email: string
          foto_url: string | null
          id: string
          nome_completo: string
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          email: string
          foto_url?: string | null
          id: string
          nome_completo: string
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          email?: string
          foto_url?: string | null
          id?: string
          nome_completo?: string
        }
        Relationships: []
      }
      pilotos: {
        Row: {
          altura_cm: number | null
          ativo: boolean | null
          atualizado_em: string | null
          campeonatos: number | null
          contrato_ate: string | null
          criado_em: string | null
          data_nascimento: string | null
          equipe_atual_id: string | null
          ergast_driver_id: string | null
          estreia_f1: string | null
          id: string
          local_nascimento: string | null
          nacionalidade_id: string | null
          nome_completo: string | null
          nome_curto: string | null
          numero: number | null
          openf1_driver_key: string | null
          peso_kg: number | null
          primeiro_nome: string
          reserva: boolean | null
          salario_anual: number | null
          sobrenome: string
          total_corridas: number | null
          total_podios: number | null
          total_pole_positions: number | null
          total_pontos: number | null
          total_vitorias: number | null
          total_voltas_mais_rapidas: number | null
          ultima_corrida: string | null
          url_foto: string | null
          url_foto_capacete: string | null
          url_instagram: string | null
          url_site_oficial: string | null
          url_twitter: string | null
          url_wikipedia: string | null
        }
        Insert: {
          altura_cm?: number | null
          ativo?: boolean | null
          atualizado_em?: string | null
          campeonatos?: number | null
          contrato_ate?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          equipe_atual_id?: string | null
          ergast_driver_id?: string | null
          estreia_f1?: string | null
          id?: string
          local_nascimento?: string | null
          nacionalidade_id?: string | null
          nome_completo?: string | null
          nome_curto?: string | null
          numero?: number | null
          openf1_driver_key?: string | null
          peso_kg?: number | null
          primeiro_nome: string
          reserva?: boolean | null
          salario_anual?: number | null
          sobrenome: string
          total_corridas?: number | null
          total_podios?: number | null
          total_pole_positions?: number | null
          total_pontos?: number | null
          total_vitorias?: number | null
          total_voltas_mais_rapidas?: number | null
          ultima_corrida?: string | null
          url_foto?: string | null
          url_foto_capacete?: string | null
          url_instagram?: string | null
          url_site_oficial?: string | null
          url_twitter?: string | null
          url_wikipedia?: string | null
        }
        Update: {
          altura_cm?: number | null
          ativo?: boolean | null
          atualizado_em?: string | null
          campeonatos?: number | null
          contrato_ate?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          equipe_atual_id?: string | null
          ergast_driver_id?: string | null
          estreia_f1?: string | null
          id?: string
          local_nascimento?: string | null
          nacionalidade_id?: string | null
          nome_completo?: string | null
          nome_curto?: string | null
          numero?: number | null
          openf1_driver_key?: string | null
          peso_kg?: number | null
          primeiro_nome?: string
          reserva?: boolean | null
          salario_anual?: number | null
          sobrenome?: string
          total_corridas?: number | null
          total_podios?: number | null
          total_pole_positions?: number | null
          total_pontos?: number | null
          total_vitorias?: number | null
          total_voltas_mais_rapidas?: number | null
          ultima_corrida?: string | null
          url_foto?: string | null
          url_foto_capacete?: string | null
          url_instagram?: string | null
          url_site_oficial?: string | null
          url_twitter?: string | null
          url_wikipedia?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pilotos_equipe_atual_id_fkey"
            columns: ["equipe_atual_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pilotos_nacionalidade_id_fkey"
            columns: ["nacionalidade_id"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id"]
          },
        ]
      }
      pit_stops: {
        Row: {
          composto_instalado: string | null
          composto_removido: string | null
          criado_em: string | null
          descricao_problema: string | null
          duracao_segundos: number
          id: string
          idade_pneu_removido: number | null
          numero_parada: number
          numero_volta: number
          piloto_id: string
          posicao_antes: number | null
          posicao_depois: number | null
          problema: boolean | null
          sessao_id: string
          tempo_entrada: string | null
          tempo_saida: string | null
          tipo_parada: string | null
        }
        Insert: {
          composto_instalado?: string | null
          composto_removido?: string | null
          criado_em?: string | null
          descricao_problema?: string | null
          duracao_segundos: number
          id?: string
          idade_pneu_removido?: number | null
          numero_parada: number
          numero_volta: number
          piloto_id: string
          posicao_antes?: number | null
          posicao_depois?: number | null
          problema?: boolean | null
          sessao_id: string
          tempo_entrada?: string | null
          tempo_saida?: string | null
          tipo_parada?: string | null
        }
        Update: {
          composto_instalado?: string | null
          composto_removido?: string | null
          criado_em?: string | null
          descricao_problema?: string | null
          duracao_segundos?: number
          id?: string
          idade_pneu_removido?: number | null
          numero_parada?: number
          numero_volta?: number
          piloto_id?: string
          posicao_antes?: number | null
          posicao_depois?: number | null
          problema?: boolean | null
          sessao_id?: string
          tempo_entrada?: string | null
          tempo_saida?: string | null
          tipo_parada?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pit_stops_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pit_stops_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      planos_assinatura: {
        Row: {
          acesso_dados_historicos: boolean | null
          acesso_marketplace: boolean | null
          acesso_telemetria_tempo_real: boolean | null
          ativo: boolean | null
          atualizado_em: string | null
          criado_em: string | null
          desconto_anual_porcentagem: number | null
          descricao: string | null
          funcionalidades: Json | null
          id: string
          limite_alertas_personalizados: number | null
          limite_estatisticas_avancadas: boolean | null
          nome: string
          ordem_exibicao: number | null
          popular: boolean | null
          preco_anual: number | null
          preco_mensal: number | null
          slug: string
          stripe_price_id_anual: string | null
          stripe_price_id_mensal: string | null
          stripe_product_id: string | null
          trial_dias: number | null
        }
        Insert: {
          acesso_dados_historicos?: boolean | null
          acesso_marketplace?: boolean | null
          acesso_telemetria_tempo_real?: boolean | null
          ativo?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          desconto_anual_porcentagem?: number | null
          descricao?: string | null
          funcionalidades?: Json | null
          id?: string
          limite_alertas_personalizados?: number | null
          limite_estatisticas_avancadas?: boolean | null
          nome: string
          ordem_exibicao?: number | null
          popular?: boolean | null
          preco_anual?: number | null
          preco_mensal?: number | null
          slug: string
          stripe_price_id_anual?: string | null
          stripe_price_id_mensal?: string | null
          stripe_product_id?: string | null
          trial_dias?: number | null
        }
        Update: {
          acesso_dados_historicos?: boolean | null
          acesso_marketplace?: boolean | null
          acesso_telemetria_tempo_real?: boolean | null
          ativo?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          desconto_anual_porcentagem?: number | null
          descricao?: string | null
          funcionalidades?: Json | null
          id?: string
          limite_alertas_personalizados?: number | null
          limite_estatisticas_avancadas?: boolean | null
          nome?: string
          ordem_exibicao?: number | null
          popular?: boolean | null
          preco_anual?: number | null
          preco_mensal?: number | null
          slug?: string
          stripe_price_id_anual?: string | null
          stripe_price_id_mensal?: string | null
          stripe_product_id?: string | null
          trial_dias?: number | null
        }
        Relationships: []
      }
      preferencias_usuario: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          fuso_horario: string | null
          id: string
          idioma: string | null
          lembrete_inicio_corrida: boolean | null
          lembrete_minutos_antes: number | null
          moeda_preferida: string | null
          notificacoes_ativadas: boolean | null
          notificacoes_email: boolean | null
          notificacoes_favoritos: boolean | null
          notificacoes_push: boolean | null
          notificacoes_sms: boolean | null
          tema: string | null
          usuario_id: string
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          fuso_horario?: string | null
          id?: string
          idioma?: string | null
          lembrete_inicio_corrida?: boolean | null
          lembrete_minutos_antes?: number | null
          moeda_preferida?: string | null
          notificacoes_ativadas?: boolean | null
          notificacoes_email?: boolean | null
          notificacoes_favoritos?: boolean | null
          notificacoes_push?: boolean | null
          notificacoes_sms?: boolean | null
          tema?: string | null
          usuario_id: string
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          fuso_horario?: string | null
          id?: string
          idioma?: string | null
          lembrete_inicio_corrida?: boolean | null
          lembrete_minutos_antes?: number | null
          moeda_preferida?: string | null
          notificacoes_ativadas?: boolean | null
          notificacoes_email?: boolean | null
          notificacoes_favoritos?: boolean | null
          notificacoes_push?: boolean | null
          notificacoes_sms?: boolean | null
          tema?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "preferencias_usuario_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: true
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos_marketplace: {
        Row: {
          altura_cm: number | null
          atualizado_em: string | null
          avaliacao_media: number | null
          categoria_id: string
          codigo_barras: string | null
          comprimento_cm: number | null
          contador_vendas: number | null
          contador_visualizacoes: number | null
          controlar_estoque: boolean | null
          criado_em: string | null
          descricao: string | null
          descricao_curta: string | null
          descricao_seo: string | null
          destaque: boolean | null
          id: string
          idade_minima: number | null
          imagens: Json | null
          largura_cm: number | null
          nome: string
          palavras_chave: string | null
          permitir_avaliacoes: boolean | null
          permitir_venda_sem_estoque: boolean | null
          peso_gramas: number | null
          preco: number
          preco_comparacao: number | null
          preco_promocional: number | null
          quantidade_estoque: number | null
          sku: string | null
          slug: string
          status: string | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          tamanho_arquivo_mb: number | null
          tipo_produto: string
          titulo_seo: string | null
          total_avaliacoes: number | null
          url_arquivo_digital: string | null
          vendedor_id: string
          video_url: string | null
        }
        Insert: {
          altura_cm?: number | null
          atualizado_em?: string | null
          avaliacao_media?: number | null
          categoria_id: string
          codigo_barras?: string | null
          comprimento_cm?: number | null
          contador_vendas?: number | null
          contador_visualizacoes?: number | null
          controlar_estoque?: boolean | null
          criado_em?: string | null
          descricao?: string | null
          descricao_curta?: string | null
          descricao_seo?: string | null
          destaque?: boolean | null
          id?: string
          idade_minima?: number | null
          imagens?: Json | null
          largura_cm?: number | null
          nome: string
          palavras_chave?: string | null
          permitir_avaliacoes?: boolean | null
          permitir_venda_sem_estoque?: boolean | null
          peso_gramas?: number | null
          preco: number
          preco_comparacao?: number | null
          preco_promocional?: number | null
          quantidade_estoque?: number | null
          sku?: string | null
          slug: string
          status?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          tamanho_arquivo_mb?: number | null
          tipo_produto?: string
          titulo_seo?: string | null
          total_avaliacoes?: number | null
          url_arquivo_digital?: string | null
          vendedor_id: string
          video_url?: string | null
        }
        Update: {
          altura_cm?: number | null
          atualizado_em?: string | null
          avaliacao_media?: number | null
          categoria_id?: string
          codigo_barras?: string | null
          comprimento_cm?: number | null
          contador_vendas?: number | null
          contador_visualizacoes?: number | null
          controlar_estoque?: boolean | null
          criado_em?: string | null
          descricao?: string | null
          descricao_curta?: string | null
          descricao_seo?: string | null
          destaque?: boolean | null
          id?: string
          idade_minima?: number | null
          imagens?: Json | null
          largura_cm?: number | null
          nome?: string
          palavras_chave?: string | null
          permitir_avaliacoes?: boolean | null
          permitir_venda_sem_estoque?: boolean | null
          peso_gramas?: number | null
          preco?: number
          preco_comparacao?: number | null
          preco_promocional?: number | null
          quantidade_estoque?: number | null
          sku?: string | null
          slug?: string
          status?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          tamanho_arquivo_mb?: number | null
          tipo_produto?: string
          titulo_seo?: string | null
          total_avaliacoes?: number | null
          url_arquivo_digital?: string | null
          vendedor_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_marketplace_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtos_marketplace_vendedor_id_fkey"
            columns: ["vendedor_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      radios_equipe: {
        Row: {
          categoria: string | null
          criado_em: string | null
          duracao_segundos: number | null
          id: string
          piloto_id: string
          prioridade: string | null
          sessao_id: string
          timestamp_utc: string
          transcricao: string | null
          url_audio: string | null
          volta_numero: number | null
        }
        Insert: {
          categoria?: string | null
          criado_em?: string | null
          duracao_segundos?: number | null
          id?: string
          piloto_id: string
          prioridade?: string | null
          sessao_id: string
          timestamp_utc: string
          transcricao?: string | null
          url_audio?: string | null
          volta_numero?: number | null
        }
        Update: {
          categoria?: string | null
          criado_em?: string | null
          duracao_segundos?: number | null
          id?: string
          piloto_id?: string
          prioridade?: string | null
          sessao_id?: string
          timestamp_utc?: string
          transcricao?: string | null
          url_audio?: string | null
          volta_numero?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "radios_equipe_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "radios_equipe_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      resultados_classificacao: {
        Row: {
          avancou_q2: boolean | null
          avancou_q3: boolean | null
          criado_em: string | null
          eliminado_em: string | null
          equipe_id: string
          id: string
          melhor_tempo: string | null
          piloto_id: string
          posicao: number
          sessao_id: string
          tempo_q1: string | null
          tempo_q2: string | null
          tempo_q3: string | null
          volta_melhor_tempo: number | null
        }
        Insert: {
          avancou_q2?: boolean | null
          avancou_q3?: boolean | null
          criado_em?: string | null
          eliminado_em?: string | null
          equipe_id: string
          id?: string
          melhor_tempo?: string | null
          piloto_id: string
          posicao: number
          sessao_id: string
          tempo_q1?: string | null
          tempo_q2?: string | null
          tempo_q3?: string | null
          volta_melhor_tempo?: number | null
        }
        Update: {
          avancou_q2?: boolean | null
          avancou_q3?: boolean | null
          criado_em?: string | null
          eliminado_em?: string | null
          equipe_id?: string
          id?: string
          melhor_tempo?: string | null
          piloto_id?: string
          posicao?: number
          sessao_id?: string
          tempo_q1?: string | null
          tempo_q2?: string | null
          tempo_q3?: string | null
          volta_melhor_tempo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resultados_classificacao_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resultados_classificacao_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resultados_classificacao_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      resultados_corrida: {
        Row: {
          classificado: boolean | null
          criado_em: string | null
          distancia_percorrida_km: number | null
          equipe_id: string
          id: string
          observacoes: string | null
          penalidades: string | null
          piloto_id: string
          pontos: number | null
          posicao_final: number | null
          posicao_grid: number | null
          posicoes_ganhadas: number | null
          rank_volta_mais_rapida: number | null
          sessao_id: string
          status_final: string
          tempo_corrida: string | null
          tempo_melhor_volta: string | null
          tempo_total_pit_stops: number | null
          total_pit_stops: number | null
          volta_mais_rapida: number | null
          voltas_completadas: number | null
          voltas_lideradas: number | null
        }
        Insert: {
          classificado?: boolean | null
          criado_em?: string | null
          distancia_percorrida_km?: number | null
          equipe_id: string
          id?: string
          observacoes?: string | null
          penalidades?: string | null
          piloto_id: string
          pontos?: number | null
          posicao_final?: number | null
          posicao_grid?: number | null
          posicoes_ganhadas?: number | null
          rank_volta_mais_rapida?: number | null
          sessao_id: string
          status_final: string
          tempo_corrida?: string | null
          tempo_melhor_volta?: string | null
          tempo_total_pit_stops?: number | null
          total_pit_stops?: number | null
          volta_mais_rapida?: number | null
          voltas_completadas?: number | null
          voltas_lideradas?: number | null
        }
        Update: {
          classificado?: boolean | null
          criado_em?: string | null
          distancia_percorrida_km?: number | null
          equipe_id?: string
          id?: string
          observacoes?: string | null
          penalidades?: string | null
          piloto_id?: string
          pontos?: number | null
          posicao_final?: number | null
          posicao_grid?: number | null
          posicoes_ganhadas?: number | null
          rank_volta_mais_rapida?: number | null
          sessao_id?: string
          status_final?: string
          tempo_corrida?: string | null
          tempo_melhor_volta?: string | null
          tempo_total_pit_stops?: number | null
          total_pit_stops?: number | null
          volta_mais_rapida?: number | null
          voltas_completadas?: number | null
          voltas_lideradas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resultados_corrida_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resultados_corrida_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resultados_corrida_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      sessoes: {
        Row: {
          atualizado_em: string | null
          condicao_clima: string | null
          criado_em: string | null
          duracao_planejada_minutos: number | null
          duracao_real_minutos: number | null
          ergast_session_id: string | null
          evento_id: string
          fim_agendado: string | null
          fim_real: string | null
          id: string
          inicio_agendado: string
          inicio_real: string | null
          nome: string
          nome_curto: string | null
          openf1_session_key: string | null
          pressao_atmosferica: number | null
          status: string | null
          temperatura_ar: number | null
          temperatura_pista: number | null
          tempo_limite_minutos: number | null
          tipo_sessao: string
          total_voltas: number | null
          umidade: number | null
        }
        Insert: {
          atualizado_em?: string | null
          condicao_clima?: string | null
          criado_em?: string | null
          duracao_planejada_minutos?: number | null
          duracao_real_minutos?: number | null
          ergast_session_id?: string | null
          evento_id: string
          fim_agendado?: string | null
          fim_real?: string | null
          id?: string
          inicio_agendado: string
          inicio_real?: string | null
          nome: string
          nome_curto?: string | null
          openf1_session_key?: string | null
          pressao_atmosferica?: number | null
          status?: string | null
          temperatura_ar?: number | null
          temperatura_pista?: number | null
          tempo_limite_minutos?: number | null
          tipo_sessao: string
          total_voltas?: number | null
          umidade?: number | null
        }
        Update: {
          atualizado_em?: string | null
          condicao_clima?: string | null
          criado_em?: string | null
          duracao_planejada_minutos?: number | null
          duracao_real_minutos?: number | null
          ergast_session_id?: string | null
          evento_id?: string
          fim_agendado?: string | null
          fim_real?: string | null
          id?: string
          inicio_agendado?: string
          inicio_real?: string | null
          nome?: string
          nome_curto?: string | null
          openf1_session_key?: string | null
          pressao_atmosferica?: number | null
          status?: string | null
          temperatura_ar?: number | null
          temperatura_pista?: number | null
          tempo_limite_minutos?: number | null
          tipo_sessao?: string
          total_voltas?: number | null
          umidade?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
        ]
      }
      status_servicos_api: {
        Row: {
          alertas_ativados: boolean | null
          ativo: boolean | null
          atualizado_em: string | null
          codigo_resposta_http: number | null
          criado_em: string | null
          id: string
          intervalo_verificacao_minutos: number | null
          mensagem_erro: string | null
          mensagem_status: string | null
          nome_servico: string
          proxima_verificacao: string | null
          status: string
          tempo_resposta_medio_ms: number | null
          tempo_resposta_ms: number | null
          timeout_segundos: number | null
          tipo_servico: string
          total_falhas: number | null
          total_sucessos: number | null
          total_verificacoes: number | null
          ultima_verificacao: string | null
          uptime_porcentagem: number | null
          url_base: string
          url_health_check: string | null
          url_status_page: string | null
        }
        Insert: {
          alertas_ativados?: boolean | null
          ativo?: boolean | null
          atualizado_em?: string | null
          codigo_resposta_http?: number | null
          criado_em?: string | null
          id?: string
          intervalo_verificacao_minutos?: number | null
          mensagem_erro?: string | null
          mensagem_status?: string | null
          nome_servico: string
          proxima_verificacao?: string | null
          status?: string
          tempo_resposta_medio_ms?: number | null
          tempo_resposta_ms?: number | null
          timeout_segundos?: number | null
          tipo_servico: string
          total_falhas?: number | null
          total_sucessos?: number | null
          total_verificacoes?: number | null
          ultima_verificacao?: string | null
          uptime_porcentagem?: number | null
          url_base: string
          url_health_check?: string | null
          url_status_page?: string | null
        }
        Update: {
          alertas_ativados?: boolean | null
          ativo?: boolean | null
          atualizado_em?: string | null
          codigo_resposta_http?: number | null
          criado_em?: string | null
          id?: string
          intervalo_verificacao_minutos?: number | null
          mensagem_erro?: string | null
          mensagem_status?: string | null
          nome_servico?: string
          proxima_verificacao?: string | null
          status?: string
          tempo_resposta_medio_ms?: number | null
          tempo_resposta_ms?: number | null
          timeout_segundos?: number | null
          tipo_servico?: string
          total_falhas?: number | null
          total_sucessos?: number | null
          total_verificacoes?: number | null
          ultima_verificacao?: string | null
          uptime_porcentagem?: number | null
          url_base?: string
          url_health_check?: string | null
          url_status_page?: string | null
        }
        Relationships: []
      }
      telemetria_ao_vivo: {
        Row: {
          brake: boolean | null
          composto_pneu: string | null
          criado_em: string | null
          drs: boolean | null
          gap_para_frente: number | null
          gap_para_lider: number | null
          id: string
          idade_pneu: number | null
          marcha: number | null
          no_pit: boolean | null
          piloto_id: string
          posicao_corrida: number | null
          posicao_x: number | null
          posicao_y: number | null
          posicao_z: number | null
          rpm: number | null
          sessao_id: string
          tempo_melhor_volta: string | null
          tempo_setor_1: string | null
          tempo_setor_2: string | null
          tempo_setor_3: string | null
          tempo_ultima_volta: string | null
          throttle: number | null
          timestamp_sessao: unknown | null
          timestamp_utc: string
          velocidade: number | null
          volta_atual: number | null
        }
        Insert: {
          brake?: boolean | null
          composto_pneu?: string | null
          criado_em?: string | null
          drs?: boolean | null
          gap_para_frente?: number | null
          gap_para_lider?: number | null
          id?: string
          idade_pneu?: number | null
          marcha?: number | null
          no_pit?: boolean | null
          piloto_id: string
          posicao_corrida?: number | null
          posicao_x?: number | null
          posicao_y?: number | null
          posicao_z?: number | null
          rpm?: number | null
          sessao_id: string
          tempo_melhor_volta?: string | null
          tempo_setor_1?: string | null
          tempo_setor_2?: string | null
          tempo_setor_3?: string | null
          tempo_ultima_volta?: string | null
          throttle?: number | null
          timestamp_sessao?: unknown | null
          timestamp_utc: string
          velocidade?: number | null
          volta_atual?: number | null
        }
        Update: {
          brake?: boolean | null
          composto_pneu?: string | null
          criado_em?: string | null
          drs?: boolean | null
          gap_para_frente?: number | null
          gap_para_lider?: number | null
          id?: string
          idade_pneu?: number | null
          marcha?: number | null
          no_pit?: boolean | null
          piloto_id?: string
          posicao_corrida?: number | null
          posicao_x?: number | null
          posicao_y?: number | null
          posicao_z?: number | null
          rpm?: number | null
          sessao_id?: string
          tempo_melhor_volta?: string | null
          tempo_setor_1?: string | null
          tempo_setor_2?: string | null
          tempo_setor_3?: string | null
          tempo_ultima_volta?: string | null
          throttle?: number | null
          timestamp_sessao?: unknown | null
          timestamp_utc?: string
          velocidade?: number | null
          volta_atual?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "telemetria_ao_vivo_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "telemetria_ao_vivo_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      temporadas: {
        Row: {
          ano: number
          atual: boolean | null
          atualizado_em: string | null
          criado_em: string | null
          ergast_season_id: string | null
          finalizada: boolean | null
          id: string
          nome: string | null
          openf1_season_key: string | null
          total_corridas: number | null
          total_corridas_realizadas: number | null
          url_site_oficial: string | null
          url_wikipedia: string | null
        }
        Insert: {
          ano: number
          atual?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          ergast_season_id?: string | null
          finalizada?: boolean | null
          id?: string
          nome?: string | null
          openf1_season_key?: string | null
          total_corridas?: number | null
          total_corridas_realizadas?: number | null
          url_site_oficial?: string | null
          url_wikipedia?: string | null
        }
        Update: {
          ano?: number
          atual?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          ergast_season_id?: string | null
          finalizada?: boolean | null
          id?: string
          nome?: string | null
          openf1_season_key?: string | null
          total_corridas?: number | null
          total_corridas_realizadas?: number | null
          url_site_oficial?: string | null
          url_wikipedia?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          aceite_politica_privacidade_em: string | null
          aceite_termos_em: string | null
          ativo: boolean | null
          atualizado_em: string | null
          criado_em: string | null
          data_nascimento: string | null
          email: string
          equipe_favorita_id: string | null
          id: string
          idioma_preferido: string | null
          nome_completo: string | null
          onboarding_completo: boolean | null
          pais: string | null
          piloto_favorito_id: string | null
          stripe_customer_id: string | null
          telefone: string | null
          ultimo_login_em: string | null
          url_avatar: string | null
        }
        Insert: {
          aceite_politica_privacidade_em?: string | null
          aceite_termos_em?: string | null
          ativo?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          email: string
          equipe_favorita_id?: string | null
          id: string
          idioma_preferido?: string | null
          nome_completo?: string | null
          onboarding_completo?: boolean | null
          pais?: string | null
          piloto_favorito_id?: string | null
          stripe_customer_id?: string | null
          telefone?: string | null
          ultimo_login_em?: string | null
          url_avatar?: string | null
        }
        Update: {
          aceite_politica_privacidade_em?: string | null
          aceite_termos_em?: string | null
          ativo?: boolean | null
          atualizado_em?: string | null
          criado_em?: string | null
          data_nascimento?: string | null
          email?: string
          equipe_favorita_id?: string | null
          id?: string
          idioma_preferido?: string | null
          nome_completo?: string | null
          onboarding_completo?: boolean | null
          pais?: string | null
          piloto_favorito_id?: string | null
          stripe_customer_id?: string | null
          telefone?: string | null
          ultimo_login_em?: string | null
          url_avatar?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_usuarios_equipe_favorita_id"
            columns: ["equipe_favorita_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_usuarios_piloto_favorito_id"
            columns: ["piloto_favorito_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
        ]
      }
      voltas: {
        Row: {
          bandeira_amarela: boolean | null
          criado_em: string | null
          drs_habilitado: boolean | null
          fim_volta: string | null
          gap_anterior: string | null
          gap_lider: string | null
          id: string
          inicio_volta: string | null
          numero_volta: number
          piloto_id: string
          posicao: number | null
          safety_car: boolean | null
          sessao_id: string
          tempo_setor_1: string | null
          tempo_setor_2: string | null
          tempo_setor_3: string | null
          tempo_volta: string | null
          velocidade_i1: number | null
          velocidade_i2: number | null
          velocidade_st: number | null
          volta_inlap: boolean | null
          volta_outlap: boolean | null
          volta_pit: boolean | null
          volta_valida: boolean | null
        }
        Insert: {
          bandeira_amarela?: boolean | null
          criado_em?: string | null
          drs_habilitado?: boolean | null
          fim_volta?: string | null
          gap_anterior?: string | null
          gap_lider?: string | null
          id?: string
          inicio_volta?: string | null
          numero_volta: number
          piloto_id: string
          posicao?: number | null
          safety_car?: boolean | null
          sessao_id: string
          tempo_setor_1?: string | null
          tempo_setor_2?: string | null
          tempo_setor_3?: string | null
          tempo_volta?: string | null
          velocidade_i1?: number | null
          velocidade_i2?: number | null
          velocidade_st?: number | null
          volta_inlap?: boolean | null
          volta_outlap?: boolean | null
          volta_pit?: boolean | null
          volta_valida?: boolean | null
        }
        Update: {
          bandeira_amarela?: boolean | null
          criado_em?: string | null
          drs_habilitado?: boolean | null
          fim_volta?: string | null
          gap_anterior?: string | null
          gap_lider?: string | null
          id?: string
          inicio_volta?: string | null
          numero_volta?: number
          piloto_id?: string
          posicao?: number | null
          safety_car?: boolean | null
          sessao_id?: string
          tempo_setor_1?: string | null
          tempo_setor_2?: string | null
          tempo_setor_3?: string | null
          tempo_volta?: string | null
          velocidade_i1?: number | null
          velocidade_i2?: number | null
          velocidade_st?: number | null
          volta_inlap?: boolean | null
          volta_outlap?: boolean | null
          volta_pit?: boolean | null
          volta_valida?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "voltas_piloto_id_fkey"
            columns: ["piloto_id"]
            isOneToOne: false
            referencedRelation: "pilotos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voltas_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      status_assinatura_usuario: {
        Row: {
          assinatura_ativa: boolean | null
          email: string | null
          foto_url: string | null
          nome_completo: string | null
          nome_plano: string | null
          periodo_atual_fim: string | null
          periodo_atual_inicio: string | null
          slug_plano: string | null
          status_plano: string | null
          tem_acesso_tempo_real: boolean | null
          usuario_id: string | null
        }
        Relationships: []
      }
      vw_estatisticas_assinaturas: {
        Row: {
          assinantes_ativos: number | null
          assinantes_cancelados: number | null
          assinantes_inadimplentes: number | null
          assinantes_trial: number | null
          plano_nome: string | null
          plano_slug: string | null
          receita_mensal_recorrente: number | null
          tempo_medio_vida_dias: number | null
          total_assinantes: number | null
        }
        Relationships: []
      }
      vw_metricas_marketplace: {
        Row: {
          avaliacao_media_geral: number | null
          pedidos_entregues: number | null
          produtos_ativos: number | null
          receita_total: number | null
          total_avaliacoes: number | null
          total_compradores: number | null
          total_pedidos: number | null
          total_produtos: number | null
          total_vendedores: number | null
        }
        Relationships: []
      }
      vw_ranking_pilotos_completo: {
        Row: {
          cor_equipe: string | null
          corridas_disputadas: number | null
          corridas_terminadas: number | null
          equipe_codigo: string | null
          equipe_nome: string | null
          nacionalidade: string | null
          nome_completo: string | null
          nome_curto: string | null
          numero: number | null
          podios: number | null
          pole_positions: number | null
          pontos: number | null
          posicao: number | null
          segundo_lugares: number | null
          temporada: number | null
          terceiro_lugares: number | null
          vitorias: number | null
          voltas_mais_rapidas: number | null
        }
        Relationships: []
      }
      vw_status_apis_resumo: {
        Row: {
          id: string | null
          incidentes_abertos: number | null
          indicador_visual: string | null
          nome_servico: string | null
          status: string | null
          tempo_resposta_ms: number | null
          tipo_servico: string | null
          total_falhas: number | null
          total_sucessos: number | null
          total_verificacoes: number | null
          ultima_verificacao: string | null
          uptime_porcentagem: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
