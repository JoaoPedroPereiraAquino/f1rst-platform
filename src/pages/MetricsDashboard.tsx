import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Trophy,
  Flag,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Zap,
  TrendingUp,
  Clock,
  CloudRain,
  Sun,
  CloudSnow,
  ArrowLeft,
  Star,
  Home,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  useSeasonData,
  useSeasonStatistics,
  useRaceDetails,
  useRaceSessions,
} from "@/hooks/useOpenF1";
import { useSeasonProgressive } from "@/hooks/useSeasonProgressive";
import {
  getDriverWithMostAttribute,
  formatDate,
  formatLapTime,
  getWeatherCondition,
} from "@/utils/f1-calculations";

// Available years (OpenF1 has data from 2018+)
const CURRENT_YEAR = new Date().getFullYear();
const AVAILABLE_YEARS = Array.from({ length: CURRENT_YEAR - 2018 + 1 }, (_, i) => CURRENT_YEAR - i);

export default function MetricsDashboard() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedSessionKey, setSelectedSessionKey] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "drivers" | "teams" | "tracks" | "awards"
  >("overview");

  const selectedYear = AVAILABLE_YEARS[selectedYearIndex];

// Fetch data using React Query hooks - independent queries for progressive loading
const { data: seasonData, isLoading: isLoadingSeasonData } = useSeasonData(selectedYear);
const { data: statistics, isLoading: isLoadingStatistics } = useSeasonStatistics(selectedYear);
const { data: raceSessions, isLoading: isLoadingRaces } = useRaceSessions(selectedYear);
const { data: raceDetails, isLoading: isLoadingRaceDetails } = useRaceDetails(selectedSessionKey);

// Progressive standings (streams while loading)
const { data: progressiveData, isLoading: isLoadingProgressive, progress: progressiveProgress } = useSeasonProgressive(selectedYear);
const driverStandings = progressiveData?.driverStandings ?? seasonData?.driverStandings;
const teamStandings = progressiveData?.teamStandings ?? seasonData?.teamStandings;

  // Show content as data becomes available (don't wait for everything)

  const getWeatherIcon = (condition: "sunny" | "cloudy" | "rainy") => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-5 h-5 text-neon-yellow" />;
      case "cloudy":
        return <CloudRain className="w-5 h-5 text-muted-foreground" />;
      case "rainy":
        return <CloudSnow className="w-5 h-5 text-neon-blue" />;
    }
  };

  const translateWeather = (condition: "sunny" | "cloudy" | "rainy") => {
    switch (condition) {
      case "sunny":
        return "Ensolarado";
      case "cloudy":
        return "Nublado";
      case "rainy":
        return "Chuvoso";
    }
  };

  const getAwardIcon = (type: string) => {
    const icons = {
      pole: <Flag className="w-5 h-5 text-neon-yellow" />,
      fastest: <Zap className="w-5 h-5 text-accent" />,
      overtake: <TrendingUp className="w-5 h-5 text-neon-green" />,
      rookie: <Star className="w-5 h-5 text-neon-blue" />,
    };
    return icons[type as keyof typeof icons] || <Trophy className="w-5 h-5" />;
  };

  const getAwardTitle = (type: string) => {
    const titles = {
      pole: "Pole Positions",
      fastest: "Voltas Mais Rápidas",
      overtake: "Maior Número de Ultrapassagens",
      rookie: "Melhor Estreante",
    };
    return titles[type as keyof typeof titles] || "Prêmio";
  };

  // Get award winners from season data
  const mostPoles = seasonData
    ? getDriverWithMostAttribute(seasonData.driverStandings, "poles")
    : null;
  const mostFastestLaps = seasonData
    ? getDriverWithMostAttribute(seasonData.driverStandings, "fastest_laps")
    : null;
  const mostWins = seasonData
    ? getDriverWithMostAttribute(seasonData.driverStandings, "wins")
    : null;

  // Race detail view component
  const RaceDetailView = () => {
    if (!raceDetails || isLoadingRaceDetails) {
      return (
        <div className="min-h-screen bg-background p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-10 w-32 mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      );
    }

    const { meeting, session, results, weather, fastest_lap } = raceDetails;
    const weatherCondition = weather
      ? getWeatherCondition(weather.rainfall, weather.track_temperature)
      : "sunny";

    return (
      <div className="min-h-screen bg-background">
        {/* Header/Banner */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-background">
          <div className="absolute inset-0 bg-[var(--gradient-racing)]" />

          <div className="relative h-full flex items-center justify-between px-8">
            <div className="flex items-center gap-6">
              <div className="text-foreground">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-neon-yellow" />
                  <span className="text-sm font-medium text-muted-foreground">VENCEDOR</span>
                </div>
                {results[0] && (
                  <>
                    <h2 className="text-4xl font-bold mb-1">{results[0].full_name}</h2>
                    <p
                      className="text-xl mb-2"
                      style={{ color: `#${results[0].team_colour}` }}
                    >
                      {results[0].team_name}
                    </p>
                  </>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{formatDate(session.date_start)}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    {getWeatherIcon(weatherCondition)}
                    <span>{translateWeather(weatherCondition)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-foreground">
              <div className="w-64 h-48 bg-card rounded-xl p-4 border border-border">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-bold">{meeting.circuit_short_name}</h3>
                  <p className="text-sm text-muted-foreground">{meeting.country_name}</p>
                </div>
                {weather && (
                  <div className="flex gap-4 text-sm justify-center mt-4">
                    <div className="text-center">
                      <div className="text-muted-foreground">Pista</div>
                      <div className="text-xl font-bold">{weather.track_temperature}°C</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Ar</div>
                      <div className="text-xl font-bold">{weather.air_temperature}°C</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={() => setSelectedSessionKey(null)}
            variant="secondary"
            size="icon"
            className="absolute top-6 left-6"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Race Data */}
        <div className="px-8 py-6">
          <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-2xl font-bold mb-4">Resultado da Corrida</h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {weather && (
                  <>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-muted-foreground mb-1">Temperatura da Pista</div>
                      <div className="font-medium">{weather.track_temperature}°C</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-muted-foreground mb-1">Temperatura do Ar</div>
                      <div className="font-medium">{weather.air_temperature}°C</div>
                    </div>
                  </>
                )}
                {fastest_lap && (
                  <div className="bg-secondary/50 rounded-lg p-3 col-span-2">
                    <div className="text-muted-foreground mb-2">Volta Mais Rápida</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-racing-red" />
                        <span className="font-bold text-lg">{formatLapTime(fastest_lap.lap_duration)}</span>
                      </div>
                      {(() => {
                        const fastestDriver = results.find(r => r.driver_number === fastest_lap.driver_number);
                        return fastestDriver ? (
                          <div className="text-right">
                            <div className="font-semibold">{fastestDriver.full_name}</div>
                            <div className="text-sm" style={{ color: `#${fastestDriver.team_colour}` }}>
                              {fastestDriver.team_name}
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                )}
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="text-muted-foreground mb-1">Condições</div>
                  <div className="font-medium flex items-center gap-2">
                    {getWeatherIcon(weatherCondition)}
                    {translateWeather(weatherCondition)}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                      Pos
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                      Piloto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                      Equipe
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                      Pontos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {results.map((result) => (
                    <tr key={result.driver_number} className="hover:bg-accent/5 transition-colors">
                      <td className="px-4 py-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            result.position === 1
                              ? "bg-neon-yellow text-background"
                              : result.position === 2
                              ? "bg-metal-gray-light text-foreground"
                              : result.position === 3
                              ? "bg-racing-red-light text-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {result.position}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium">{result.full_name}</div>
                        <div className="text-sm text-muted-foreground">{result.name_acronym}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `#${result.team_colour}20`,
                            color: `#${result.team_colour}`,
                          }}
                        >
                          {result.team_name}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-neon-green">
                        {result.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show race details if a race is selected
  if (selectedSessionKey) {
    return <RaceDetailView />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Home className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  F1rst Metrics
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Temporada:</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                <Button
                  onClick={() => {
                    if (selectedYearIndex < AVAILABLE_YEARS.length - 1) {
                      setSelectedYearIndex(selectedYearIndex + 1);
                      setActiveTab("overview");
                    }
                  }}
                  variant="ghost"
                  size="icon"
                  disabled={selectedYearIndex === AVAILABLE_YEARS.length - 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium min-w-[80px] text-center">
                  {selectedYear}
                </span>
                <Button
                  onClick={() => {
                    if (selectedYearIndex > 0) {
                      setSelectedYearIndex(selectedYearIndex - 1);
                      setActiveTab("overview");
                    }
                  }}
                  variant="ghost"
                  size="icon"
                  disabled={selectedYearIndex === 0}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
</header>

{/* Progressive loading indicator for standings */}
{isLoadingProgressive && progressiveProgress.total > 0 && (
  <div className="px-4 sm:px-6 lg:px-8 py-2 bg-secondary/30 border-b border-border">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground">Carregando métricas: {progressiveProgress.completed}/{progressiveProgress.total}</span>
        <div className="w-64">
          <Progress value={(progressiveProgress.completed / progressiveProgress.total) * 100} />
        </div>
      </div>
    </div>
  </div>
)}

<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show race details view if selected */}
        {selectedSessionKey ? (
          <RaceDetailView />
        ) : (
          <>
            {/* Overview Stats - show progressive loading */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {isLoadingStatistics ? (
                <>
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </>
              ) : (
                <>
                  <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-6 hover:shadow-[var(--shadow-racing)] transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {statistics?.totalOvertakes || 0}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Total de Ultrapassagens</h3>
                    <p className="text-sm text-muted-foreground">Durante toda a temporada</p>
                  </div>

                  <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-6 hover:shadow-[var(--shadow-racing)] transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {statistics?.totalPitStops || 0}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Total de Pit Stops</h3>
                    <p className="text-sm text-muted-foreground">Paradas nos boxes</p>
                  </div>

                  <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-6 hover:shadow-[var(--shadow-racing)] transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Flag className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {statistics?.totalRaces || 0}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Total de Corridas</h3>
                    <p className="text-sm text-muted-foreground">Corridas realizadas</p>
                  </div>
                </>
              )}
            </div>

            {/* Content Tabs */}
            <Card className="overflow-hidden">
              <div className="border-b border-border">
                <div className="flex overflow-x-auto">
                  {["overview", "drivers", "teams", "tracks", "awards"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setActiveTab(
                          tab as "overview" | "drivers" | "teams" | "tracks" | "awards"
                        )
                      }
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab === "overview" && "Visão Geral"}
                      {tab === "drivers" && "Ranking Pilotos"}
                      {tab === "teams" && "Ranking Equipes"}
                      {tab === "tracks" && "Pistas"}
                      {tab === "awards" && "Premiados"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Visão Geral - {selectedYear}</h2>
                    <p className="text-muted-foreground">
                      Estatísticas completas da temporada {selectedYear} de Fórmula 1, obtidas em
                      tempo real através da OpenF1 API.
                    </p>
                    
                    {/* Championship Status Alert */}
                    {selectedYear === CURRENT_YEAR && (
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3">
                        <Flame className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-primary mb-1">Campeonato em Aberto</p>
                          <p className="text-sm text-muted-foreground">
                            A temporada {selectedYear} ainda está em andamento. Os dados mostrados refletem a classificação atual e serão atualizados conforme as corridas acontecem.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {seasonData && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-primary" />
                            Campeão
                          </h3>
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-primary">
                              {seasonData.driverStandings[0]?.full_name}
                            </p>
                            <p
                              className="text-lg"
                              style={{
                                color: `#${seasonData.driverStandings[0]?.team_colour}`,
                              }}
                            >
                              {seasonData.driverStandings[0]?.team_name}
                            </p>
                            <p className="text-3xl font-bold">
                              {seasonData.driverStandings[0]?.points} pts
                            </p>
                          </div>
                        </Card>

                        <Card className="p-6">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Flag className="w-5 h-5 text-primary" />
                            Campeão de Construtores
                          </h3>
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-primary">
                              {seasonData.teamStandings[0]?.team_name}
                            </p>
                            <p className="text-3xl font-bold">
                              {seasonData.teamStandings[0]?.points} pts
                            </p>
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                )}

                {/* Drivers Tab */}
                {activeTab === "drivers" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Ranking de Pilotos - {selectedYear}</h2>
                    {!driverStandings ? (
                      <div className="space-y-3 animate-fade-in">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-card/30 rounded-lg">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-6 w-32 ml-auto" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto animate-fade-in">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3 text-sm font-semibold">Pos</th>
                              <th className="text-left p-3 text-sm font-semibold">Piloto</th>
                              <th className="text-left p-3 text-sm font-semibold">Equipe</th>
                              <th className="text-right p-3 text-sm font-semibold">Pontos</th>
                              <th className="text-right p-3 text-sm font-semibold">Vitórias</th>
                              <th className="text-right p-3 text-sm font-semibold">Pódios</th>
                            </tr>
                          </thead>
                          <tbody>
                            {driverStandings.map((driver, index) => (
                            <tr
                              key={driver.driver_number}
                              className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                            >
                              <td className="p-3 font-bold">
                                <div className="flex items-center gap-2">
                                  {index < 3 && (
                                    <Trophy
                                      className={`w-4 h-4 ${
                                        index === 0
                                          ? "text-yellow-400"
                                          : index === 1
                                          ? "text-gray-400"
                                          : "text-orange-600"
                                      }`}
                                    />
                                  )}
                                  {index + 1}
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="font-semibold">
                                  {driver.full_name || driver.name_acronym || `Piloto ${driver.driver_number}`}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {driver.name_acronym || `#${driver.driver_number}`}
                                </div>
                              </td>
                              <td className="p-3">
                                <div
                                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                                  style={{
                                    backgroundColor: driver.team_colour ? `#${driver.team_colour}20` : '#33333320',
                                    color: driver.team_colour ? `#${driver.team_colour}` : '#666666',
                                  }}
                                >
                                  {driver.team_name || 'Equipe Desconhecida'}
                                </div>
                              </td>
                              <td className="p-3 text-right font-bold text-primary">
                                {driver.points}
                              </td>
                              <td className="p-3 text-right">{driver.wins}</td>
                              <td className="p-3 text-right">{driver.podiums}</td>
                            </tr>
                          ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                {/* Teams Tab */}
                {activeTab === "teams" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Ranking de Equipes - {selectedYear}</h2>
                    {!teamStandings ? (
                      <div className="space-y-3 animate-fade-in">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-card/30 rounded-lg">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-6 w-20 ml-auto" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto animate-fade-in">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3 text-sm font-semibold">Pos</th>
                              <th className="text-left p-3 text-sm font-semibold">Equipe</th>
                              <th className="text-right p-3 text-sm font-semibold">Pontos</th>
                              <th className="text-right p-3 text-sm font-semibold">Vitórias</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamStandings.map((team, index) => (
                            <tr
                              key={team.team_name}
                              className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                            >
                              <td className="p-3 font-bold">
                                <div className="flex items-center gap-2">
                                  {index < 3 && (
                                    <Trophy
                                      className={`w-4 h-4 ${
                                        index === 0
                                          ? "text-yellow-400"
                                          : index === 1
                                          ? "text-gray-400"
                                          : "text-orange-600"
                                      }`}
                                    />
                                  )}
                                  {index + 1}
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: `#${team.team_colour}` }}
                                  />
                                  <span className="font-semibold">{team.team_name}</span>
                                </div>
                              </td>
                              <td className="p-3 text-right font-bold text-primary">
                                {team.points}
                              </td>
                              <td className="p-3 text-right">{team.wins}</td>
                            </tr>
                          ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                {/* Tracks Tab */}
                {activeTab === "tracks" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Pistas - {selectedYear}</h2>
                    {!raceSessions || !seasonData ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="bg-card/30 rounded-2xl border border-border p-4">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-4" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                          {raceSessions.map((session) => {
                            // Find race results for this session
                            const raceIndex = seasonData.raceSessions.findIndex(
                              (s) => s.session_key === session.session_key
                            );
                            const raceResults =
                              (raceIndex >= 0 && seasonData.allRaceResults[raceIndex]) 
                                ? seasonData.allRaceResults[raceIndex] 
                                : [];
                            const winner = raceResults?.find((r) => r.position === 1);

                        return (
                          <div
                            key={session.session_key}
                            className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-4 hover:border-primary/40 hover:shadow-[var(--shadow-racing)] transition-all cursor-pointer"
                            onClick={() => setSelectedSessionKey(session.session_key)}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-bold text-lg">
                                    {session.circuit_short_name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {session.location}, {session.country_name}
                                  </p>
                                </div>
                                <Sun className="w-5 h-5 text-neon-yellow" />
                              </div>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(session.date_start)}</span>
                              </div>

                              {winner && (
                                <div className="pt-3 border-t border-border">
                                  <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-primary" />
                                    <div>
                                      <div className="text-sm font-semibold">
                                        {winner.full_name}
                                      </div>
                                      <div
                                        className="text-xs"
                                        style={{ color: `#${winner.team_colour}` }}
                                      >
                                        {winner.team_name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

                {/* Awards Tab */}
                {activeTab === "awards" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">
                      Premiados da Temporada - {selectedYear}
                    </h2>
                    {!seasonData ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="bg-card/30 rounded-2xl border border-border p-6">
                            <div className="flex items-start gap-4">
                              <Skeleton className="w-12 h-12 rounded-lg" />
                              <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-8 w-20 mt-2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                     ) : (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                      {/* Most Pole Positions */}
                      {mostPoles && (
                        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                              {getAwardIcon("pole")}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold mb-2">
                                {getAwardTitle("pole")}
                              </h3>
                              <div className="space-y-1">
                                <p className="font-semibold text-primary">
                                  {mostPoles.full_name}
                                </p>
                                <p
                                  className="text-sm"
                                  style={{ color: `#${mostPoles.team_colour}` }}
                                >
                                  {mostPoles.team_name}
                                </p>
                                <p className="text-2xl font-bold mt-2">{mostPoles.poles} poles</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Most Fastest Laps */}
                      {mostFastestLaps && (
                        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                              {getAwardIcon("fastest")}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold mb-2">
                                {getAwardTitle("fastest")}
                              </h3>
                              <div className="space-y-1">
                                <p className="font-semibold text-primary">
                                  {mostFastestLaps.full_name}
                                </p>
                                <p
                                  className="text-sm"
                                  style={{ color: `#${mostFastestLaps.team_colour}` }}
                                >
                                  {mostFastestLaps.team_name}
                                </p>
                                <p className="text-2xl font-bold mt-2">
                                  {mostFastestLaps.fastest_laps} voltas
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Most Wins */}
                      {mostWins && (
                        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                              {getAwardIcon("overtake")}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold mb-2">Mais Vitórias</h3>
                              <div className="space-y-1">
                                <p className="font-semibold text-primary">{mostWins.full_name}</p>
                                <p
                                  className="text-sm"
                                  style={{ color: `#${mostWins.team_colour}` }}
                                >
                                  {mostWins.team_name}
                                </p>
                                <p className="text-2xl font-bold mt-2">{mostWins.wins} vitórias</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Champion */}
                      {seasonData.driverStandings[0] && (
                        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                              {getAwardIcon("rookie")}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold mb-2">Campeão Mundial</h3>
                              <div className="space-y-1">
                                <p className="font-semibold text-primary">
                                  {seasonData.driverStandings[0].full_name}
                                </p>
                                <p
                                  className="text-sm"
                                  style={{
                                    color: `#${seasonData.driverStandings[0].team_colour}`,
                                  }}
                                >
                                  {seasonData.driverStandings[0].team_name}
                                </p>
                                <p className="text-2xl font-bold mt-2">
                                  {seasonData.driverStandings[0].points} pontos
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        )}
                       </div>
                     )}
                   </div>
                 )}
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
