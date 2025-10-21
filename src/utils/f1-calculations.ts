import type {
  SessionResult,
  DriverStanding,
  TeamStanding,
  Lap,
} from "@/types/openf1";

// F1 Points System (2010-2024)
const POINTS_SYSTEM = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export function calculateDriverStandings(
  allResults: SessionResult[]
): DriverStanding[] {
  const driverMap = new Map<number, DriverStanding>();

  allResults.forEach((result) => {
    const existing = driverMap.get(result.driver_number);

    if (!existing) {
      driverMap.set(result.driver_number, {
        driver_number: result.driver_number,
        full_name: result.full_name,
        name_acronym: result.name_acronym,
        team_name: result.team_name,
        team_colour: result.team_colour,
        points: result.points || 0,
        wins: result.position === 1 ? 1 : 0,
        podiums: result.position <= 3 ? 1 : 0,
        poles: 0,
        fastest_laps: 0,
      });
    } else {
      existing.points += result.points || 0;
      if (result.position === 1) existing.wins++;
      if (result.position <= 3) existing.podiums++;
    }
  });

  return Array.from(driverMap.values()).sort((a, b) => b.points - a.points);
}

export function calculateTeamStandings(
  driverStandings: DriverStanding[]
): TeamStanding[] {
  const teamMap = new Map<string, TeamStanding>();

  driverStandings.forEach((driver) => {
    const existing = teamMap.get(driver.team_name);

    if (!existing) {
      teamMap.set(driver.team_name, {
        team_name: driver.team_name,
        team_colour: driver.team_colour,
        points: driver.points,
        wins: driver.wins,
        podiums: driver.podiums,
      });
    } else {
      existing.points += driver.points;
      existing.wins += driver.wins;
      existing.podiums += driver.podiums;
    }
  });

  return Array.from(teamMap.values()).sort((a, b) => b.points - a.points);
}

export function addPolePositions(
  standings: DriverStanding[],
  qualifyingResults: SessionResult[][]
): DriverStanding[] {
  const poleMap = new Map<number, number>();

  qualifyingResults.forEach((results) => {
    const pole = results.find((r) => r.position === 1);
    if (pole) {
      poleMap.set(pole.driver_number, (poleMap.get(pole.driver_number) || 0) + 1);
    }
  });

  return standings.map((standing) => ({
    ...standing,
    poles: poleMap.get(standing.driver_number) || 0,
  }));
}

export function addFastestLaps(
  standings: DriverStanding[],
  fastestLaps: (Lap | null)[]
): DriverStanding[] {
  const fastestMap = new Map<number, number>();

  fastestLaps.forEach((lap) => {
    if (lap) {
      fastestMap.set(
        lap.driver_number,
        (fastestMap.get(lap.driver_number) || 0) + 1
      );
    }
  });

  return standings.map((standing) => ({
    ...standing,
    fastest_laps: fastestMap.get(standing.driver_number) || 0,
  }));
}

export function getDriverWithMostAttribute(
  standings: DriverStanding[],
  attribute: keyof Pick<DriverStanding, "poles" | "fastest_laps" | "wins">
): DriverStanding | null {
  if (standings.length === 0) return null;

  return standings.reduce((max, current) =>
    current[attribute] > max[attribute] ? current : max
  );
}

export function getTopRookie(
  standings: DriverStanding[],
  rookieNumbers: number[]
): DriverStanding | null {
  const rookies = standings.filter((s) =>
    rookieNumbers.includes(s.driver_number)
  );

  if (rookies.length === 0) return null;

  return rookies[0]; // Already sorted by points
}

export function formatLapTime(durationInSeconds: number): string {
  if (!durationInSeconds) return "--";

  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = (durationInSeconds % 60).toFixed(3);

  return `${minutes}:${seconds.padStart(6, "0")}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getWeatherCondition(
  rainfall: number,
  trackTemp: number
): "sunny" | "cloudy" | "rainy" {
  if (rainfall > 0) return "rainy";
  if (trackTemp > 40) return "sunny";
  return "cloudy";
}

export function calculateTotalOvertakes(allOvertakes: number[][]): number {
  return allOvertakes.reduce((sum, race) => sum + race.length, 0);
}

export function calculateTotalPitStops(allPitStops: number[][]): number {
  return allPitStops.reduce((sum, race) => sum + race.length, 0);
}
