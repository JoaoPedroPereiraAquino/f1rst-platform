import type {
  Meeting,
  Session,
  Driver,
  SessionResult,
  Lap,
  Weather,
  PitStop,
  Overtake,
} from "@/types/openf1";

const BASE_URL = "https://api.openf1.org/v1";

// Cache configuration
const CACHE_PREFIX = "openf1_cache_";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Global in-memory de-duplication and rate limiter to avoid 429
const inflightRequests = new Map<string, Promise<any>>();
let lastRequestTime = 0;
let activeRequests = 0;
const MAX_CONCURRENT = 2; // keep very low to respect OpenF1
const MIN_SPACING_MS = 350; // space out requests

// Cache utilities
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getCacheKey(url: string): string {
  return `${CACHE_PREFIX}${btoa(url)}`;
}

function getFromCache<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();
    
    if (now - entry.timestamp > CACHE_DURATION_MS) {
      localStorage.removeItem(key);
      return null;
    }

    console.log('📦 Cache hit:', key);
    return entry.data;
  } catch (error) {
    console.warn('⚠️ Cache read error:', error);
    return null;
  }
}

function saveToCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(entry));
    console.log('💾 Saved to cache:', key);
  } catch (error) {
    console.warn('⚠️ Cache write error (storage might be full):', error);
  }
}

async function scheduleRequest() {
  return new Promise<void>((resolve) => {
    const tryRun = () => {
      const now = Date.now();
      const since = now - lastRequestTime;
      if (activeRequests < MAX_CONCURRENT && since >= MIN_SPACING_MS) {
        activeRequests++;
        lastRequestTime = now;
        resolve();
      } else {
        const wait = Math.max(MIN_SPACING_MS - since, 60);
        setTimeout(tryRun, wait);
      }
    };
    tryRun();
  });
}

function releaseRequest() {
  activeRequests = Math.max(0, activeRequests - 1);
}

class OpenF1ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "OpenF1ApiError";
  }
}

async function fetchFromAPI<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const maxRetries = 2;
  let attempt = 0;
  let lastError: any;

  // Build URL once for de-dup key
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  const key = url.toString();

  // Check cache first
  const cacheKey = getCacheKey(key);
  const cached = getFromCache<T>(cacheKey);
  if (cached !== null) {
    return cached;
  }

  if (inflightRequests.has(key)) {
    return inflightRequests.get(key) as Promise<T>;
  }

  const execPromise = (async (): Promise<T> => {
    // Hold one concurrency slot across retries for simplicity
    await scheduleRequest();
    try {
      while (attempt <= maxRetries) {
        try {
          console.log('🏎️ OpenF1 API Request:', key, 'attempt', attempt + 1);
          const response = await fetch(key);
          console.log('🏁 OpenF1 API Response:', response.status, response.statusText);

          if (response.status === 429) {
            const retryAfterHeader = response.headers.get('Retry-After');
            const retryAfter = retryAfterHeader ? Number(retryAfterHeader) * 1000 : 0;
            const backoff = retryAfter || (700 * Math.pow(2, attempt)) + Math.random() * 300;
            console.warn('⏳ OpenF1 rate limited, retrying in', backoff, 'ms');
            await new Promise((r) => setTimeout(r, backoff));
            attempt++;
            continue;
          }

          if (!response.ok) {
            console.error('❌ OpenF1 API Error:', response.status, response.statusText);
            throw new OpenF1ApiError(
              `API request failed: ${response.statusText}`,
              response.status
            );
          }

          const data = await response.json();
          console.log('✅ OpenF1 API Data:', endpoint, Array.isArray(data) ? `${data.length} items` : 'object');
          
          // Save to cache
          saveToCache(cacheKey, data);
          
          return data;
        } catch (error) {
          console.error('💥 OpenF1 API Exception:', error);
          lastError = error;

          if (error instanceof OpenF1ApiError) {
            if (error.status === 429 && attempt < maxRetries) {
              const backoff = (700 * Math.pow(2, attempt)) + Math.random() * 300;
              await new Promise((r) => setTimeout(r, backoff));
              attempt++;
              continue;
            }
            throw error;
          }

          if (attempt < maxRetries) {
            const backoff = (700 * Math.pow(2, attempt)) + Math.random() * 300;
            await new Promise((r) => setTimeout(r, backoff));
            attempt++;
            continue;
          }

          throw new OpenF1ApiError(
            `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
        }
      }

      // Exhausted retries
      throw lastError instanceof OpenF1ApiError
        ? lastError
        : new OpenF1ApiError('Unknown error after retries');
    } finally {
      releaseRequest();
    }
  })();

  inflightRequests.set(key, execPromise);
  try {
    return await execPromise;
  } finally {
    inflightRequests.delete(key);
  }
}


export const openF1Api = {
  // Meetings (Grand Prix weekends)
  async getMeetings(year?: number): Promise<Meeting[]> {
    return fetchFromAPI<Meeting[]>("/meetings", year ? { year } : undefined);
  },

  async getMeeting(meetingKey: number): Promise<Meeting[]> {
    return fetchFromAPI<Meeting[]>("/meetings", { meeting_key: meetingKey });
  },

  async getLatestMeeting(): Promise<Meeting[]> {
    return fetchFromAPI<Meeting[]>("/meetings", { meeting_key: "latest" });
  },

  // Sessions (Practice, Qualifying, Race, etc.)
  async getSessions(params?: {
    meeting_key?: number;
    session_key?: number;
    year?: number;
    session_type?: string;
  }): Promise<Session[]> {
    return fetchFromAPI<Session[]>("/sessions", params);
  },

  async getLatestSession(): Promise<Session[]> {
    return fetchFromAPI<Session[]>("/sessions", { session_key: "latest" });
  },

  // Drivers
  async getDrivers(sessionKey: number): Promise<Driver[]> {
    return fetchFromAPI<Driver[]>("/drivers", { session_key: sessionKey });
  },

  async getDriver(sessionKey: number, driverNumber: number): Promise<Driver[]> {
    return fetchFromAPI<Driver[]>("/drivers", {
      session_key: sessionKey,
      driver_number: driverNumber,
    });
  },

  // Session Results
  async getSessionResults(sessionKey: number): Promise<SessionResult[]> {
    return fetchFromAPI<SessionResult[]>("/session_result", {
      session_key: sessionKey,
    });
  },

  // Laps
  async getLaps(params: {
    session_key: number;
    driver_number?: number;
    lap_number?: number;
  }): Promise<Lap[]> {
    return fetchFromAPI<Lap[]>("/laps", params);
  },

  async getFastestLap(sessionKey: number): Promise<Lap | null> {
    try {
      const laps = await fetchFromAPI<Lap[]>("/laps", {
        session_key: sessionKey,
      });
      
      if (!laps || laps.length === 0) return null;
      
      const validLaps = laps.filter(
        (lap) => lap.lap_duration && !lap.is_pit_out_lap
      );
      
      if (validLaps.length === 0) return null;
      
      return validLaps.reduce((fastest, current) =>
        current.lap_duration < fastest.lap_duration ? current : fastest
      );
    } catch (e) {
      console.warn("⚠️ OpenF1 getFastestLap rate-limited or failed, returning null", e);
      return null;
    }
  },

  // Weather
  async getWeather(params: {
    meeting_key?: number;
    session_key?: number;
  }): Promise<Weather[]> {
    return fetchFromAPI<Weather[]>("/weather", params);
  },

  async getLatestWeather(sessionKey: number): Promise<Weather | null> {
    const weather = await fetchFromAPI<Weather[]>("/weather", {
      session_key: sessionKey,
    });
    
    if (!weather || weather.length === 0) return null;
    
    return weather[weather.length - 1];
  },

  // Pit Stops
  async getPitStops(sessionKey: number, driverNumber?: number): Promise<PitStop[]> {
    try {
      return await fetchFromAPI<PitStop[]>("/pit", {
        session_key: sessionKey,
        ...(driverNumber && { driver_number: driverNumber }),
      });
    } catch (e) {
      console.warn("⚠️ OpenF1 getPitStops rate-limited or failed, returning empty array", e);
      return [];
    }
  },

  // Overtakes (Beta)
  async getOvertakes(sessionKey: number): Promise<Overtake[]> {
    try {
      return await fetchFromAPI<Overtake[]>("/overtakes", {
        session_key: sessionKey,
      });
    } catch {
      return [];
    }
  },

  // Helper: Get all race sessions for a year
  async getRaceSessions(year: number): Promise<Session[]> {
    const sessions = await this.getSessions({ year, session_type: "Race" });
    return sessions.sort((a, b) => 
      new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );
  },

  // Helper: Get qualifying sessions for a year
  async getQualifyingSessions(year: number): Promise<Session[]> {
    const sessions = await this.getSessions({ year, session_type: "Qualifying" });
    return sessions.sort((a, b) => 
      new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );
  },
};

export { OpenF1ApiError };
