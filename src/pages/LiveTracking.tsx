import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, BarChart3, Settings, User, Bell, Search, 
  Layout, Flag, MapPin, Zap, Clock, Trophy, 
  ChevronUp, ChevronDown, Circle, ArrowUpRight, Lock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLiveSession } from '@/hooks/useLiveSession';

interface Driver {
  id: number;
  name: string;
  shortName: string;
  team: string;
  teamCode: string;
  teamColor: string;
  position: number;
  lapTime: string;
  gap: string;
  lastLap: string;
  sector1: string;
  sector2: string;
  sector3: string;
  speed: number;
  isInPit: boolean;
  overtakes: number;
  tireCompound: string;
  circuitPosition: { x: number; y: number };
}

interface RaceData {
  currentLap: number;
  totalLaps: number;
  raceStatus: string;
  flags: { type: string; message: string };
  weather: string;
}

export default function LiveTracking() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { data: liveSessionData } = useLiveSession();
  const [layoutMode, setLayoutMode] = useState<'side-by-side' | 'stacked'>('side-by-side');
  const [hoveredDriver, setHoveredDriver] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const isPremium = profile?.status_plano === 'premium';
  const isLive = liveSessionData?.isLive || false;
  const [raceData, setRaceData] = useState<RaceData>({
    currentLap: 47,
    totalLaps: 71,
    raceStatus: 'live',
    flags: { type: 'green', message: 'Pista livre' },
    weather: 'Seco, 28°C'
  });

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: 1,
      name: 'Max Verstappen',
      shortName: 'VER',
      team: 'Red Bull Racing',
      teamCode: 'RBR',
      teamColor: '#0066cc',
      position: 1,
      lapTime: '1:18.234',
      gap: '00:00.000',
      lastLap: '1:18.456',
      sector1: '24.123',
      sector2: '28.901',
      sector3: '25.432',
      speed: 318,
      isInPit: false,
      overtakes: 2,
      tireCompound: 'Medium',
      circuitPosition: { x: 20, y: 28 }
    },
    {
      id: 2,
      name: 'Lewis Hamilton',
      shortName: 'HAM',
      team: 'Mercedes AMG F1',
      teamCode: 'MER',
      teamColor: '#00d4aa',
      position: 2,
      lapTime: '1:18.456',
      gap: '+2.341',
      lastLap: '1:18.789',
      sector1: '24.234',
      sector2: '29.012',
      sector3: '25.543',
      speed: 315,
      isInPit: false,
      overtakes: 1,
      tireCompound: 'Hard',
      circuitPosition: { x: 32, y: 26 }
    },
    {
      id: 3,
      name: 'Charles Leclerc',
      shortName: 'LEC',
      team: 'Scuderia Ferrari',
      teamCode: 'FER',
      teamColor: '#dc2626',
      position: 3,
      lapTime: '1:18.678',
      gap: '+4.892',
      lastLap: '1:19.123',
      sector1: '24.345',
      sector2: '29.123',
      sector3: '25.654',
      speed: 312,
      isInPit: true,
      overtakes: 0,
      tireCompound: 'Soft',
      circuitPosition: { x: 58, y: 35 }
    },
    {
      id: 4,
      name: 'Lando Norris',
      shortName: 'NOR',
      team: 'McLaren F1 Team',
      teamCode: 'MCL',
      teamColor: '#ff8700',
      position: 4,
      lapTime: '1:18.891',
      gap: '+6.123',
      lastLap: '1:19.345',
      sector1: '24.456',
      sector2: '29.234',
      sector3: '25.765',
      speed: 310,
      isInPit: false,
      overtakes: 3,
      tireCompound: 'Medium',
      circuitPosition: { x: 65, y: 52 }
    },
    {
      id: 5,
      name: 'Sergio Perez',
      shortName: 'PER',
      team: 'Red Bull Racing',
      teamCode: 'RBR',
      teamColor: '#0066cc',
      position: 5,
      lapTime: '1:19.012',
      gap: '+8.456',
      lastLap: '1:19.567',
      sector1: '24.567',
      sector2: '29.345',
      sector3: '25.876',
      speed: 308,
      isInPit: false,
      overtakes: 1,
      tireCompound: 'Hard',
      circuitPosition: { x: 46, y: 75 }
    },
    {
      id: 6,
      name: 'George Russell',
      shortName: 'RUS',
      team: 'Mercedes AMG F1',
      teamCode: 'MER',
      teamColor: '#00d4aa',
      position: 6,
      lapTime: '1:19.234',
      gap: '+12.567',
      lastLap: '1:19.678',
      sector1: '24.678',
      sector2: '29.456',
      sector3: '25.987',
      speed: 306,
      isInPit: false,
      overtakes: 0,
      tireCompound: 'Medium',
      circuitPosition: { x: 72, y: 45 }
    },
    {
      id: 7,
      name: 'Carlos Sainz Jr',
      shortName: 'SAI',
      team: 'Scuderia Ferrari',
      teamCode: 'FER',
      teamColor: '#dc2626',
      position: 7,
      lapTime: '1:19.456',
      gap: '+15.234',
      lastLap: '1:19.890',
      sector1: '24.789',
      sector2: '29.567',
      sector3: '26.098',
      speed: 304,
      isInPit: false,
      overtakes: 1,
      tireCompound: 'Hard',
      circuitPosition: { x: 38, y: 68 }
    },
    {
      id: 8,
      name: 'Oscar Piastri',
      shortName: 'PIA',
      team: 'McLaren F1 Team',
      teamCode: 'MCL',
      teamColor: '#ff8700',
      position: 8,
      lapTime: '1:19.678',
      gap: '+18.901',
      lastLap: '1:20.123',
      sector1: '24.890',
      sector2: '29.678',
      sector3: '26.209',
      speed: 302,
      isInPit: false,
      overtakes: 0,
      tireCompound: 'Soft',
      circuitPosition: { x: 28, y: 82 }
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(driver => ({
        ...driver,
        speed: driver.speed + (Math.random() - 0.5) * 10,
        gap: driver.position === 1 ? '00:00.000' : `+${(Math.random() * 10 + driver.position).toFixed(3)}`,
        lastLap: `1:${18 + Math.floor(Math.random() * 2)}.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`
      })));

      if (Math.random() > 0.95) {
        const driverIndex = Math.floor(Math.random() * drivers.length);
        setDrivers(prev => prev.map((driver, index) => 
          index === driverIndex 
            ? { ...driver, overtakes: driver.overtakes + 1 }
            : driver
        ));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTeamIcon = (teamCode: string) => {
    const icons: Record<string, string> = {
      'RBR': '🟦',
      'MER': '⭐',
      'FER': '🐎',
      'MCL': '🧡',
    };
    return icons[teamCode] || '🏎️';
  };

  const CircuitView = ({ isCompact = false }: { isCompact?: boolean }) => (
    <div className={`bg-card/30 backdrop-blur-xl rounded-2xl border border-border overflow-hidden relative transition-all duration-500 ${isCompact ? 'h-full' : 'h-[500px]'}`}>
      <div className="p-3 md:p-4 border-b border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="min-w-0 flex-shrink">
            <h3 className="text-base md:text-lg font-bold text-foreground truncate">Autódromo José Carlos Pace</h3>
            <p className="text-muted-foreground text-xs md:text-sm truncate">Interlagos • São Paulo, Brasil</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className={`px-2 md:px-3 py-1 rounded-full border flex items-center gap-1 md:gap-2 ${
              raceData.flags.type === 'green' 
                ? 'bg-neon-green/20 border-neon-green/30 text-neon-green'
                : 'bg-neon-yellow/20 border-neon-yellow/30 text-neon-yellow'
            }`}>
              <Flag className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">{raceData.flags.message}</span>
            </div>
            <div className="text-foreground font-bold text-xs md:text-sm whitespace-nowrap">
              {raceData.currentLap}/{raceData.totalLaps}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full p-4" style={{ height: 'calc(100% - 80px)' }}>
        <svg 
          viewBox="0 0 800 400" 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 150 100 C 180 80, 220 80, 250 100 L 350 120 C 380 130, 420 140, 450 160 L 500 200 C 520 220, 530 250, 520 280 L 500 320 C 480 340, 450 350, 420 340 L 350 330 C 320 320, 290 310, 270 290 L 200 250 C 180 230, 160 200, 150 170 Z"
            fill="none"
            stroke="hsl(var(--metal-gray))"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <path
            d="M 150 100 C 180 80, 220 80, 250 100 L 350 120 C 380 130, 420 140, 450 160 L 500 200 C 520 220, 530 250, 520 280 L 500 320 C 480 340, 450 350, 420 340 L 350 330 C 320 320, 290 310, 270 290 L 200 250 C 180 230, 160 200, 150 170 Z"
            fill="none"
            stroke="hsl(var(--carbon-black))"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <rect x="145" y="95" width="10" height="30" fill="hsl(var(--foreground))" />
          <rect x="160" y="95" width="10" height="30" fill="hsl(var(--foreground))" />
          
          <line x1="200" y1="90" x2="300" y2="110" stroke="hsl(var(--neon-green))" strokeWidth="4" opacity="0.6" strokeDasharray="5,5" />
          <line x1="450" y1="180" x2="480" y2="220" stroke="hsl(var(--neon-green))" strokeWidth="4" opacity="0.6" strokeDasharray="5,5" />
          
          <path
            d="M 130 120 C 140 115, 160 115, 180 120 L 200 125"
            fill="none"
            stroke="hsl(var(--neon-yellow))"
            strokeWidth="8"
            opacity="0.8"
          />
        </svg>

        {layoutMode === 'stacked' && (
          <div className="absolute inset-0 pointer-events-none">
            {drivers.map((driver) => (
              <div 
                key={driver.id} 
                className="absolute pointer-events-auto"
                style={{
                  left: `${driver.circuitPosition.x}%`,
                  top: `${driver.circuitPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 border-white shadow-glow transition-all duration-500 cursor-pointer hover:scale-150 z-10 ${
                    driver.isInPit ? 'animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: driver.teamColor,
                    zIndex: hoveredDriver === driver.id ? 30 : 10
                  }}
                  onMouseEnter={() => setHoveredDriver(driver.id)}
                  onMouseLeave={() => setHoveredDriver(null)}
                >
                  {hoveredDriver === driver.id && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-carbon/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border whitespace-nowrap z-40 shadow-racing">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getTeamIcon(driver.teamCode)}</span>
                        <div>
                          <div className="text-foreground font-bold text-sm">{driver.shortName}</div>
                          <div className="text-muted-foreground text-xs">P{driver.position} • {Math.floor(driver.speed)} km/h</div>
                        </div>
                      </div>
                      {driver.isInPit && (
                        <div className="text-neon-yellow text-xs mt-1 flex items-center gap-1">
                          <Circle className="w-3 h-3 fill-current" />
                          PIT STOP
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-carbon/50 px-2 py-1 rounded text-muted-foreground text-xs">
            <Flag className="w-3 h-3 inline mr-1" />
            Largada/Chegada
          </div>
          <div className="bg-neon-green/20 px-2 py-1 rounded text-neon-green text-xs">
            <Zap className="w-3 h-3 inline mr-1" />
            DRS Zone
          </div>
          <div className="bg-neon-yellow/20 px-2 py-1 rounded text-neon-yellow text-xs">
            <Circle className="w-3 h-3 inline mr-1" />
            Pit Lane
          </div>
        </div>
      </div>
    </div>
  );

  const RankingTable = ({ isScrollable = false }: { isScrollable?: boolean }) => (
    <div className={`bg-card/30 backdrop-blur-xl rounded-2xl border border-border transition-all duration-500 overflow-hidden ${isScrollable ? 'h-full flex flex-col' : ''}`}>
      <div className="p-3 md:p-4 border-b border-border">
        <h3 className="text-base md:text-lg font-bold text-foreground">Classificação da Corrida</h3>
      </div>

      <div className={`${isScrollable ? 'flex-1 overflow-y-auto' : 'overflow-x-auto'}`}>
        <table className="w-full min-w-[600px]">
          <thead className="bg-muted/30 sticky top-0 z-10">
            <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-2 md:px-4 py-2 md:py-3">Pos</th>
              <th className="px-2 md:px-4 py-2 md:py-3">Piloto</th>
              <th className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">Time</th>
              <th className="px-2 md:px-4 py-2 md:py-3">Volta</th>
              <th className="px-2 md:px-4 py-2 md:py-3">Gap</th>
              <th className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell">Ultrapass.</th>
              <th className="px-2 md:px-4 py-2 md:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr 
                key={driver.id} 
                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-foreground font-bold text-sm md:text-base">{driver.position}</span>
                    {index < drivers.length - 1 && driver.position < drivers[index + 1]?.position && (
                      <ChevronUp className="w-3 h-3 md:w-4 md:h-4 text-neon-green flex-shrink-0" />
                    )}
                    {index > 0 && driver.position > drivers[index - 1]?.position && (
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-racing-red flex-shrink-0" />
                    )}
                  </div>
                </td>
                
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-border bg-muted flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {driver.shortName}
                    </div>
                    <div className="min-w-0 hidden sm:block">
                      <div className="text-foreground font-medium text-sm truncate">{driver.shortName}</div>
                      <div className="text-muted-foreground text-xs truncate">{driver.name}</div>
                    </div>
                  </div>
                </td>

                <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl">{getTeamIcon(driver.teamCode)}</span>
                    <span className="text-muted-foreground text-xs md:text-sm">{driver.teamCode}</span>
                  </div>
                </td>

                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="text-foreground font-mono text-xs md:text-sm">{raceData.currentLap}</div>
                  <div className="text-muted-foreground text-xs hidden md:block">{driver.lastLap}</div>
                </td>

                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className={`font-mono font-bold text-xs md:text-sm ${
                    driver.position === 1 
                      ? 'text-neon-green' 
                      : 'text-neon-blue'
                  }`}>
                    {driver.gap}
                  </div>
                </td>

                <td className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-yellow font-bold">{driver.overtakes}</span>
                    {driver.overtakes > 0 && (
                      <ArrowUpRight className="w-4 h-4 text-neon-yellow animate-pulse flex-shrink-0" />
                    )}
                  </div>
                </td>

                <td className="px-2 md:px-4 py-2 md:py-3">
                  {driver.isInPit ? (
                    <div className="flex items-center gap-1 text-neon-yellow">
                      <Circle className="w-3 h-3 fill-current animate-pulse flex-shrink-0" />
                      <span className="text-xs font-bold whitespace-nowrap">PIT</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-neon-green">
                      <Circle className="w-3 h-3 fill-current flex-shrink-0" />
                      <span className="text-xs whitespace-nowrap">Pista</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Show Premium required screen
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[var(--gradient-racing)] opacity-20" />
        <div className="absolute inset-0 bg-[var(--gradient-glow)]" />
        
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Acesso Premium Necessário
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            O acompanhamento ao vivo com dados em tempo real é exclusivo para assinantes Premium.
            Faça upgrade agora e tenha acesso a telemetria, team radio e muito mais!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/subscription')} size="lg" className="gap-2">
              <Zap className="w-5 h-5" />
              Assinar Premium
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" size="lg">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show no live session screen
  if (!isLive) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[var(--gradient-racing)] opacity-20" />
        <div className="absolute inset-0 bg-[var(--gradient-glow)]" />
        
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Flag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Nenhuma Sessão Ao Vivo
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            No momento não há nenhuma sessão de F1 acontecendo. 
            Volte durante um treino, qualificação ou corrida para acompanhar os dados em tempo real!
          </p>
          {liveSessionData?.nextSession && (
            <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Próxima Sessão:</p>
              <p className="text-xl font-bold">{liveSessionData.nextSession.session_name}</p>
              <p className="text-muted-foreground">{new Date(liveSessionData.nextSession.date_start).toLocaleString('pt-BR')}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/metrics')} size="lg" variant="outline" className="gap-2">
              <BarChart3 className="w-5 h-5" />
              Ver Estatísticas
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" size="lg">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="bg-card/50 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-4 md:gap-8 min-w-0">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  F<span className="text-racing-red">1</span>rst
                </h1>
              </Link>
              
              <nav className="hidden lg:flex space-x-4 xl:space-x-8">
                <Link to="/live" className="text-racing-red hover:text-racing-red-light transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 whitespace-nowrap">
                  <BarChart3 className="w-4 h-4" />
                  Análises
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Trophy className="w-4 h-4" />
                  Campeonato
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <Button
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setLayoutMode(layoutMode === 'stacked' ? 'side-by-side' : 'stacked');
                    setIsAnimating(false);
                  }, 100);
                }}
                variant="ghost"
                size="icon"
                title="Alterar layout"
                className="flex-shrink-0"
              >
                <Layout className="w-4 h-4 md:w-5 md:h-5" />
              </Button>

              <Button variant="ghost" size="icon" className="hidden sm:flex flex-shrink-0">
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
              </Button>

              <Button variant="ghost" size="icon" className="hidden md:flex flex-shrink-0">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </Button>

              <Link to="/auth" className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-border bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 md:w-4 md:h-4" />
                </div>
                <span className="text-foreground text-sm font-medium hidden sm:block truncate">Carlos</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto overflow-hidden">
        {layoutMode === 'stacked' ? (
          <div className="space-y-4 md:space-y-6 p-4 md:p-6">
            <CircuitView />
            <RankingTable />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-auto lg:h-[calc(100vh-136px)] p-4 md:p-6">
            <div className="w-full lg:w-[65%] xl:w-[70%] h-[500px] lg:h-full overflow-hidden">
              <RankingTable isScrollable={true} />
            </div>
            
            <div className="w-full lg:w-[35%] xl:w-[30%] h-[400px] lg:h-full overflow-hidden">
              <CircuitView isCompact={true} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
