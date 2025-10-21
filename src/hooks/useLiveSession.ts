import { useQuery } from '@tanstack/react-query';
import { openF1Api } from '@/services/openf1-api';

interface LiveSessionResult {
  isLive: boolean;
  session: any | null;
  nextSession: any | null;
}

export function useLiveSession() {
  return useQuery<LiveSessionResult>({
    queryKey: ['live-session-status'],
    queryFn: async () => {
      try {
        // Buscar última sessão
        const latestSession = await openF1Api.getLatestSession();
        
        if (!latestSession || latestSession.length === 0) {
          return { isLive: false, session: null, nextSession: null };
        }

        const session = latestSession[0];
        const now = new Date();
        const start = new Date(session.date_start);
        const end = new Date(session.date_end);

        // Verificar se está ao vivo agora
        const isLive = now >= start && now <= end;

        return { 
          isLive, 
          session: isLive ? session : null,
          nextSession: !isLive ? session : null
        };
      } catch (error) {
        console.error('Erro ao verificar sessão ao vivo:', error);
        return { isLive: false, session: null, nextSession: null };
      }
    },
    refetchInterval: 60000, // Verificar a cada 1 minuto
    staleTime: 30000,
  });
}
