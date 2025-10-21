import { useQuery } from "@tanstack/react-query";
import { openF1Api } from "@/services/openf1-api";
import {
  calculateDriverStandings,
  calculateTeamStandings,
  addPolePositions,
  addFastestLaps,
} from "@/utils/f1-calculations";
import type { RaceDetails, SessionResult } from "@/types/openf1";

// Cache times
const STALE_TIME = 1000 * 60 * 5; // 5 minutes
const CACHE_TIME = 1000 * 60 * 30; // 30 minutes

// Hook to fetch meetings for a specific year
export function useMeetings(year: number) {
  return useQuery({
    queryKey: ["meetings", year],
    queryFn: () => openF1Api.getMeetings(year),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
}

// Hook to fetch race sessions for a year
export function useRaceSessions(year: number) {
  return useQuery({
    queryKey: ["race-sessions", year],
    queryFn: () => openF1Api.getRaceSessions(year),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
}

// Hook to fetch qualifying sessions for a year
export function useQualifyingSessions(year: number) {
  return useQuery({
    queryKey: ["qualifying-sessions", year],
    queryFn: () => openF1Api.getQualifyingSessions(year),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
}

// Hook to fetch complete season data with driver standings (progressive loading ready)
export function useSeasonData(year: number) {
  return useQuery({
    queryKey: ["season-data", year],
    queryFn: async () => {
      console.log('🏎️ Fetching season data for year:', year);
      
      // Fetch all race sessions for the year
      const raceSessions = await openF1Api.getRaceSessions(year);
      console.log('🏁 Race sessions found:', raceSessions.length);
      
      const qualifyingSessions = await openF1Api.getQualifyingSessions(year);
      console.log('🏁 Qualifying sessions found:', qualifyingSessions.length);

      // Throttled fetch with retry-friendly limits 
      const batch = async <T>(
        items: typeof raceSessions, 
        fn: (s: (typeof raceSessions)[number]) => Promise<T>,
        size = 4,
        delayMs = 300
      ): Promise<T[]> => {
        const out: T[] = [];
        for (let i = 0; i < items.length; i += size) {
          const slice = items.slice(i, i + size);
          const settled = await Promise.allSettled(slice.map(fn));
          settled.forEach((res) => {
            if (res.status === "fulfilled") out.push(res.value);
            else console.warn("⚠️ Batch item failed:", res.reason);
          });
          if (i + size < items.length) {
            await new Promise((r) => setTimeout(r, delayMs));
          }
        }
        return out;
      };

      // Fetch results for all races in throttled batches
      const allRaceResults = await batch(
        raceSessions,
        (session) => openF1Api.getSessionResults(session.session_key),
        4,
        300
      );

      const allQualifyingResults = await batch(
        qualifyingSessions,
        (session) => openF1Api.getSessionResults(session.session_key),
        4,
        300
      );

      const allFastestLaps = await batch(
        raceSessions,
        (session) => openF1Api.getFastestLap(session.session_key),
        3,
        600
      );

      // Enrich results with driver names from /drivers endpoint
      const enrichWithDriverNames = async (results: SessionResult[][]) => {
        const sessionKeys = [...new Set(results.flat().map(r => (r as any).session_key))].filter(Boolean);
        const driverCache: Record<number, { full_name: string; team_name: string }> = {};
        
        // Fetch drivers for unique sessions (throttled)
        for (let i = 0; i < sessionKeys.length; i += 3) {
          const batch = sessionKeys.slice(i, i + 3);
          await Promise.allSettled(
            batch.map(async (sk) => {
              try {
                const drivers = await openF1Api.getDrivers(sk as number);
                drivers.forEach((d: any) => {
                  driverCache[d.driver_number] = {
                    full_name: d.full_name || d.name_acronym || `Driver ${d.driver_number}`,
                    team_name: d.team_name || d.team_colour || 'Unknown Team',
                  };
                });
              } catch (e) {
                console.warn('⚠️ Failed to fetch drivers for session', sk, e);
              }
            })
          );
          if (i + 3 < sessionKeys.length) {
            await new Promise(r => setTimeout(r, 400));
          }
        }

        return results.map(sessionResults =>
          sessionResults.map(r => ({
            ...r,
            full_name: driverCache[r.driver_number]?.full_name || (r as any).full_name || `Driver ${r.driver_number}`,
            team_name: driverCache[r.driver_number]?.team_name || (r as any).team_name || 'Unknown',
          }))
        );
      };

      const enrichedRaceResults = await enrichWithDriverNames(allRaceResults);
      const flatResults = enrichedRaceResults.flat();

      // Calculate standings
      let driverStandings = calculateDriverStandings(flatResults);
      driverStandings = addPolePositions(driverStandings, allQualifyingResults);
      driverStandings = addFastestLaps(driverStandings, allFastestLaps);

      const teamStandings = calculateTeamStandings(driverStandings);

      return {
        driverStandings,
        teamStandings,
        raceSessions,
        allRaceResults: enrichedRaceResults,
        allQualifyingResults,
        allFastestLaps,
      };
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: year >= 2018, // OpenF1 only has data from 2018+
  });
}

// Hook to fetch detailed race information
export function useRaceDetails(sessionKey: number | null) {
  return useQuery({
    queryKey: ["race-details", sessionKey],
    queryFn: async (): Promise<RaceDetails | null> => {
      if (!sessionKey) return null;

      const [sessions, results, weather, fastestLap, drivers] = await Promise.all([
        openF1Api.getSessions({ session_key: sessionKey }),
        openF1Api.getSessionResults(sessionKey),
        openF1Api.getLatestWeather(sessionKey),
        openF1Api.getFastestLap(sessionKey),
        openF1Api.getDrivers(sessionKey),
      ]);

      const session = sessions[0];
      if (!session) return null;

      const meetings = await openF1Api.getMeeting(session.meeting_key);
      const meeting = meetings[0];

      // Create driver map for enrichment
      const driverMap = new Map(
        drivers.map((d: any) => [
          d.driver_number,
          {
            full_name: d.full_name || d.name_acronym || `Driver ${d.driver_number}`,
            name_acronym: d.name_acronym || '',
            team_name: d.team_name || 'Unknown Team',
            team_colour: d.team_colour || '999999',
            headshot_url: d.headshot_url || null,
          },
        ])
      );

      // Enrich results with driver data
      const enrichedResults = results.map((r) => ({
        ...r,
        full_name: driverMap.get(r.driver_number)?.full_name || `Driver ${r.driver_number}`,
        name_acronym: driverMap.get(r.driver_number)?.name_acronym || '',
        team_name: driverMap.get(r.driver_number)?.team_name || 'Unknown',
        team_colour: driverMap.get(r.driver_number)?.team_colour || '999999',
        headshot_url: driverMap.get(r.driver_number)?.headshot_url || null,
      }));

      const winner = enrichedResults.find((r) => r.position === 1) || null;

      return {
        meeting,
        session,
        results: enrichedResults.sort((a, b) => a.position - b.position),
        weather,
        fastest_lap: fastestLap,
        winner,
      };
    },
    enabled: !!sessionKey,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });
}

// Hook to fetch season statistics
export function useSeasonStatistics(year: number) {
  return useQuery({
    queryKey: ["season-statistics", year],
    queryFn: async () => {
      const raceSessions = await openF1Api.getRaceSessions(year);

      // Throttled fetches to respect API rate limits
      const batch = async <T>(
        items: typeof raceSessions,
        fn: (s: (typeof raceSessions)[number]) => Promise<T>,
        size = 4,
        delayMs = 250
      ): Promise<T[]> => {
        const out: T[] = [];
        for (let i = 0; i < items.length; i += size) {
          const slice = items.slice(i, i + size);
          const settled = await Promise.allSettled(slice.map(fn));
          settled.forEach((res) => {
            if (res.status === "fulfilled") out.push(res.value);
          });
          if (i + size < items.length) {
            await new Promise((r) => setTimeout(r, delayMs));
          }
        }
        return out;
      };

      const allPitStops = await batch(
        raceSessions,
        (session) => openF1Api.getPitStops(session.session_key)
      );

      const allOvertakes = await batch(
        raceSessions,
        (session) => openF1Api.getOvertakes(session.session_key)
      );

      const totalPitStops = allPitStops.reduce((sum, stops) => sum + stops.length, 0);
      const totalOvertakes = allOvertakes.reduce(
        (sum, overtakes) => sum + overtakes.length,
        0
      );
      const totalRaces = raceSessions.length;

      return {
        totalPitStops,
        totalOvertakes,
        totalRaces,
      };
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: year >= 2018,
  });
}
