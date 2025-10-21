import { useEffect, useMemo, useRef, useState } from "react";
import { openF1Api } from "@/services/openf1-api";
import {
  calculateDriverStandings,
  calculateTeamStandings,
} from "@/utils/f1-calculations";
import type { Session, SessionResult } from "@/types/openf1";

export type ProgressiveSeasonData = {
  driverStandings: ReturnType<typeof calculateDriverStandings>;
  teamStandings: ReturnType<typeof calculateTeamStandings>;
  progress: { completed: number; total: number };
};

// Progressive season loader: streams standings as results arrive
export function useSeasonProgressive(year: number) {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [resultsSoFar, setResultsSoFar] = useState<SessionResult[][]>([]);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple driver cache (one shot) to enrich names and teams without many requests
  const driverMapRef = useRef<Record<number, { full_name?: string; team_name?: string; team_colour?: string }>>({});
  const abortRef = useRef<{ aborted: boolean }>({ aborted: false });

  useEffect(() => {
    abortRef.current.aborted = false;
    setIsLoading(true);
    setError(null);
    setSessions(null);
    setResultsSoFar([]);
    setProgress({ completed: 0, total: 0 });

    const load = async () => {
      try {
        // 1) Get all race sessions for the year
        const raceSessions = await openF1Api.getRaceSessions(year);
        if (abortRef.current.aborted) return;
        setSessions(raceSessions);
        setProgress({ completed: 0, total: raceSessions.length });

        // 2) Fetch drivers ONCE from the first available session to enrich names
        if (raceSessions.length > 0) {
          try {
            const firstDrivers = await openF1Api.getDrivers(raceSessions[0].session_key);
            if (abortRef.current.aborted) return;
            const map: Record<number, { full_name?: string; team_name?: string; team_colour?: string }> = {};
            firstDrivers.forEach((d) => {
              map[d.driver_number] = {
                full_name: d.full_name || d.name_acronym,
                team_name: d.team_name,
                team_colour: d.team_colour,
              };
            });
            driverMapRef.current = map;
          } catch {}
        }

        // 3) Batch results with low concurrency to avoid 429
        const batchSize = 2;
        const delayMs = 500;

        for (let i = 0; i < raceSessions.length; i += batchSize) {
          const slice = raceSessions.slice(i, i + batchSize);
          const settled = await Promise.allSettled(
            slice.map((s) => openF1Api.getSessionResults(s.session_key))
          );
          if (abortRef.current.aborted) return;

          const newResults: SessionResult[][] = settled
            .filter((r): r is PromiseFulfilledResult<SessionResult[]> => r.status === "fulfilled")
            .map((r) => r.value);

          // Enrich names using the single driver map
          const enriched = newResults.map((arr) =>
            arr.map((r) => ({
              ...r,
              full_name: driverMapRef.current[r.driver_number]?.full_name || (r as any).full_name || `Driver ${r.driver_number}`,
              team_name: driverMapRef.current[r.driver_number]?.team_name || (r as any).team_name || "Unknown",
              team_colour: driverMapRef.current[r.driver_number]?.team_colour || (r as any).team_colour,
            }))
          );

          setResultsSoFar((prev) => {
            const next = [...prev, ...enriched];
            setProgress({ completed: Math.min((i + newResults.length), raceSessions.length), total: raceSessions.length });
            return next;
          });

          if (i + batchSize < raceSessions.length) {
            await new Promise((r) => setTimeout(r, delayMs));
          }
        }
      } catch (e) {
        if (!abortRef.current.aborted) setError(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        if (!abortRef.current.aborted) setIsLoading(false);
      }
    };

    load();

    return () => {
      abortRef.current.aborted = true;
    };
  }, [year]);

  const data: ProgressiveSeasonData | null = useMemo(() => {
    if (!sessions || resultsSoFar.length === 0) return null;

    const flat = resultsSoFar.flat();
    let driverStandings = calculateDriverStandings(flat);
    // Note: We skip poles/fastest enrichment here for speed; seasonData can still provide later.
    const teamStandings = calculateTeamStandings(driverStandings);

    // Enrich standings with driverMap fields to ensure names even on partial data
    const map = driverMapRef.current;
    driverStandings = driverStandings.map((d) => ({
      ...d,
      full_name: d.full_name || map[d.driver_number]?.full_name || d.name_acronym || `Driver ${d.driver_number}`,
      team_name: d.team_name || map[d.driver_number]?.team_name || d.team_name || "Unknown",
      team_colour: d.team_colour || map[d.driver_number]?.team_colour || d.team_colour,
    }));

    return {
      driverStandings,
      teamStandings,
      progress,
    };
  }, [resultsSoFar, sessions, progress]);

  return {
    data,
    isLoading,
    error,
    progress,
  };
}
