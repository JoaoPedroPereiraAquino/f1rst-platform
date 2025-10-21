// OpenF1 API Types
// https://openf1.org/

export interface Meeting {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  year: number;
}

export interface Session {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_end: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  meeting_key: number;
  session_key: number;
  session_name: string;
  session_type: string;
  year: number;
}

export interface Driver {
  broadcast_name: string;
  country_code: string;
  driver_number: number;
  first_name: string;
  full_name: string;
  headshot_url: string;
  last_name: string;
  meeting_key: number;
  name_acronym: string;
  session_key: number;
  team_colour: string;
  team_name: string;
}

export interface SessionResult {
  broadcast_name: string;
  driver_number: number;
  full_name: string;
  name_acronym: string;
  position: number;
  points: number;
  session_key: number;
  team_colour: string;
  team_name: string;
}

export interface Lap {
  date_start: string;
  driver_number: number;
  duration_sector_1: number;
  duration_sector_2: number;
  duration_sector_3: number;
  i1_speed: number;
  i2_speed: number;
  is_pit_out_lap: boolean;
  lap_duration: number;
  lap_number: number;
  meeting_key: number;
  segments_sector_1: number[];
  segments_sector_2: number[];
  segments_sector_3: number[];
  session_key: number;
  st_speed: number;
}

export interface Weather {
  air_temperature: number;
  date: string;
  humidity: number;
  meeting_key: number;
  pressure: number;
  rainfall: number;
  session_key: number;
  track_temperature: number;
  wind_direction: number;
  wind_speed: number;
}

export interface PitStop {
  date: string;
  driver_number: number;
  lap_number: number;
  meeting_key: number;
  pit_duration: number;
  session_key: number;
}

export interface Overtake {
  date: string;
  driver_number: number;
  lap_number: number;
  meeting_key: number;
  opponent_number: number;
  session_key: number;
}

export interface RaceControl {
  category: string;
  date: string;
  driver_number: number;
  flag: string;
  lap_number: number;
  meeting_key: number;
  message: string;
  scope: string;
  sector: number;
  session_key: number;
}

// Aggregated types for dashboard
export interface DriverStanding {
  driver_number: number;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastest_laps: number;
}

export interface TeamStanding {
  team_name: string;
  team_colour: string;
  points: number;
  wins: number;
  podiums: number;
}

export interface RaceDetails {
  meeting: Meeting;
  session: Session;
  results: SessionResult[];
  weather: Weather | null;
  fastest_lap: Lap | null;
  winner: SessionResult | null;
}
