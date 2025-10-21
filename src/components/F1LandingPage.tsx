import { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, Zap, MapPin, Clock, Radio, Trophy, Gauge, Flag, 
  Users, Play, Activity, Target, Thermometer, Wind, TrendingUp,
  BarChart3, Package, ShoppingBag, Star, Timer, LogIn, LogOut, UserCircle, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import bahrainCircuit from '@/assets/bahrain-circuit.png';

export default function F1LandingPage() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
  const [activeDriver, setActiveDriver] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(prev => ({ ...prev, [index]: isInView }));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDriver(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const drivers = [
    { name: 'VER', position: { x: 25, y: 75 }, color: 'bg-neon-blue', team: 'RBR', lap: '1:18.234' },
    { name: 'HAM', position: { x: 45, y: 85 }, color: 'bg-cyan-400', team: 'MER', lap: '1:18.567' },
    { name: 'LEC', position: { x: 35, y: 35 }, color: 'bg-racing-red', team: 'FER', lap: '1:18.789' },
    { name: 'NOR', position: { x: 70, y: 50 }, color: 'bg-orange-500', team: 'MCL', lap: '1:18.890' },
    { name: 'PER', position: { x: 80, y: 75 }, color: 'bg-blue-600', team: 'RBR', lap: '1:19.123' }
  ];

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Mapa da Pista",
      description: "Visualize em tempo real onde cada piloto está na pista"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Telemetria ao Vivo",
      description: "Dados instantâneos de velocidade, RPM e temperatura"
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: "Rádio dos Times",
      description: "Escute as comunicações entre pilotos e equipes"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Classificação Live",
      description: "Posições atualizadas em tempo real"
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Dados do Carro",
      description: "Telemetria completa do veículo selecionado"
    },
    {
      icon: <Flag className="w-8 h-8" />,
      title: "Flags & Eventos",
      description: "Sinalizações e ultrapassagens instantâneas"
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Condições da Pista",
      description: "Clima e temperatura atualizados"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Para Novos Fãs",
      description: "Interface intuitiva e explicativa"
    }
  ];

  const stats = [
    { icon: <TrendingUp />, value: "100K+", label: "Usuários Ativos" },
    { icon: <Timer />, value: "<1s", label: "Latência de Dados" },
    { icon: <BarChart3 />, value: "50+", label: "Métricas Rastreadas" },
    { icon: <Star />, value: "4.9", label: "Avaliação App" }
  ];

  const products = [
    { name: "Boné Red Bull Racing", price: "R$ 199,90", img: "🧢" },
    { name: "Camisa Ferrari", price: "R$ 349,90", img: "👕" },
    { name: "Chaveiro Mercedes", price: "R$ 89,90", img: "🔑" },
    { name: "Miniatura McLaren", price: "R$ 299,90", img: "🏎️" }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-racing-red-dark/20 via-carbon to-carbon">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='%23dc2626' stroke-width='1' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-racing-red/10 to-carbon/90" />
      </div>

      {/* Main Container */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-black text-foreground">
              F1<span className="text-racing-red">rst</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Link to="/metrics">
                  <Button variant="ghost" className="gap-2 hover:text-racing-red">
                    <BarChart3 className="w-4 h-4" />
                    Métricas
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="ghost" 
                  className="gap-2 opacity-50 cursor-not-allowed"
                  disabled
                >
                  <BarChart3 className="w-4 h-4" />
                  Métricas
                </Button>
              )}
              <Link to="/subscription">
                <Button variant="ghost" className="gap-2 hover:text-racing-red">
                  <Star className="w-4 h-4" />
                  Planos
                </Button>
              </Link>
              
              {user && profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-10 w-10 cursor-pointer border-2 border-racing-red/50 hover:border-racing-red transition-colors">
                      <AvatarImage src={profile.foto_url || undefined} />
                      <AvatarFallback className="bg-racing-red text-foreground font-bold">
                        {getInitials(profile.nome_completo)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile.nome_completo}</p>
                        <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
                        <Badge variant={profile.assinatura_ativa ? 'default' : 'secondary'} className="w-fit mt-1">
                          {profile.assinatura_ativa ? 'Premium' : 'Free'}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/subscription')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Assinatura
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" className="border-racing-red/50 hover:bg-racing-red hover:text-foreground">
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="bg-card/50 backdrop-blur-lg rounded-3xl p-12 border border-racing-red/30 shadow-racing">
            {/* Header */}
            <div className="text-center mb-16 animate-speed-in">
              <h1 className="text-7xl font-black text-foreground mb-6 tracking-tight">
                F1<span className="text-racing-red">rst</span>
              </h1>
              <div className="h-1 w-32 bg-gradient-speed mx-auto mb-8 animate-pulse-glow"></div>
              <p className="text-2xl text-foreground/90 mb-4">
                A Plataforma Definitiva de <span className="text-racing-red font-bold">Tempo Real</span> para Fórmula 1
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Mergulhe na adrenalina da F1 com dados instantâneos, métricas avançadas e uma experiência 
                imersiva perfeita para novos fãs e veteranos do esporte
              </p>
            </div>

            {/* Real-time Badge */}
            <div className="flex justify-center mb-12">
              <div className="bg-racing-red text-foreground px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 animate-pulse">
                <Zap className="w-5 h-5" />
                TEMPO REAL • LIVE DATA • INSTANTÂNEO
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-racing-red/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-racing-red mb-4 group-hover:text-racing-red-light transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Main Features */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2 bg-gradient-to-br from-racing-red/20 to-secondary/30 rounded-2xl p-8 border border-racing-red/30">
                <h2 className="text-3xl font-bold text-foreground mb-4">Experiência Completa de Corrida</h2>
                <div className="space-y-4">
                  {[
                    'Mapa interativo com posicionamento dos pilotos',
                    'Dados detalhados de cada piloto e equipe',
                    'Informações da pista e condições da sessão',
                    'Análise de gaps, pits e estratégias'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-foreground/90">
                      <div className="w-2 h-2 bg-racing-red rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-secondary/30 to-carbon/30 rounded-2xl p-8 border border-border">
                {user ? (
                  <>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Explore as Métricas</h3>
                    <p className="text-foreground/80 mb-6">
                      Acesse estatísticas detalhadas, histórico de temporadas e análises completas de pilotos e equipes.
                    </p>
                    <Link to="/metrics">
                      <Button className="w-full bg-racing-red hover:bg-racing-red-dark text-foreground">
                        Ver Métricas
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Para Todos os Fãs</h3>
                    <p className="text-foreground/80 mb-6">
                      Interface pensada para tornar a F1 acessível e emocionante, 
                      seja você um novato ou expert no esporte.
                    </p>
                    <Button 
                      className="w-full bg-racing-red/50 hover:bg-racing-red/50 text-foreground/50 cursor-not-allowed" 
                      disabled
                    >
                      Começar Agora
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">Faça login para acessar</p>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-6 bg-secondary/30 rounded-xl border border-border">
                  <div className="text-racing-red mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground animate-bounce">
                <span>Descubra a revolução da F1</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Live Track Section */}
        <div 
          ref={el => sectionsRef.current[0] = el}
          className={`container mx-auto px-6 py-20 transition-all duration-1000 ${
            isVisible[0] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="bg-card/40 backdrop-blur-lg rounded-3xl p-12 border border-racing-red/30">
            <h2 className="text-5xl font-bold text-foreground text-center mb-16">
              Acompanhe a Corrida <span className="text-racing-red">AO VIVO</span>
            </h2>
            
            {/* Interactive Track */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <h3 className="text-2xl font-bold text-foreground mb-6">Circuito Internacional do Bahrain</h3>
                <div className="relative w-full h-80 rounded-2xl border border-racing-red/30 overflow-hidden">
                  {/* Track Image Background */}
                  <img 
                    src={bahrainCircuit} 
                    alt="Circuito do Bahrain"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  
                  {/* Driver Positions */}
                  {drivers.map((driver, index) => (
                    <div
                      key={driver.name}
                      className={`absolute w-4 h-4 rounded-full ${driver.color} transition-all duration-1000 z-10 ${
                        activeDriver === index ? 'scale-150 shadow-glow' : ''
                      }`}
                      style={{
                        left: `${driver.position.x}%`,
                        top: `${driver.position.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
                        <span className="text-xs text-foreground font-bold bg-carbon/90 px-2 py-1 rounded whitespace-nowrap shadow-lg">
                          {driver.name}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Live Indicators */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-carbon/80 backdrop-blur-sm px-3 py-2 rounded-lg z-10">
                    <div className="w-3 h-3 bg-racing-red rounded-full animate-pulse"></div>
                    <span className="text-foreground text-sm font-semibold">LIVE</span>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-carbon/80 backdrop-blur-sm px-3 py-2 rounded-lg text-foreground text-sm font-semibold z-10">
                    Volta 47/71
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Dados em Tempo Real</h3>
                {drivers.slice(0, 3).map((driver, index) => (
                  <div key={driver.name} className="bg-secondary/50 rounded-xl p-4 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${driver.color}`}></div>
                        <span className="text-foreground font-bold">{index + 1}. {driver.name}</span>
                        <span className="text-muted-foreground text-sm">{driver.team}</span>
                      </div>
                      <span className="text-neon-green font-mono text-sm">{driver.lap}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-speed h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${85 - index * 5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Section */}
        <div 
          ref={el => sectionsRef.current[1] = el}
          className={`container mx-auto px-6 py-20 transition-all duration-1000 ${
            isVisible[1] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="bg-card/40 backdrop-blur-lg rounded-3xl p-12 border border-racing-red/30">
            <h2 className="text-5xl font-bold text-foreground text-center mb-16">
              Telemetria <span className="text-racing-red">Avançada</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Velocidade</span>
                  <Target className="w-5 h-5 text-neon-green" />
                </div>
                <div className="text-4xl font-bold text-neon-green mb-2">312 km/h</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-neon-green h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">RPM</span>
                  <Activity className="w-5 h-5 text-racing-red" />
                </div>
                <div className="text-4xl font-bold text-racing-red mb-2">11,500</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-racing-red h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Temperatura</span>
                  <Thermometer className="w-5 h-5 text-neon-yellow" />
                </div>
                <div className="text-4xl font-bold text-neon-yellow mb-2">98°C</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-neon-yellow h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketplace Section */}
        <div 
          ref={el => sectionsRef.current[2] = el}
          className={`container mx-auto px-6 py-20 transition-all duration-1000 ${
            isVisible[2] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="bg-card/40 backdrop-blur-lg rounded-3xl p-12 border border-racing-red/30">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-racing-red/20 text-racing-red px-4 py-2 rounded-full mb-6">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">Marketplace Oficial</span>
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-4">
                Produtos <span className="text-racing-red">Oficiais</span>
              </h2>
              <p className="text-muted-foreground text-lg">Leve a paixão pela F1 para casa</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <div key={i} className="bg-secondary/50 rounded-xl p-6 border border-border hover:border-racing-red/50 transition-all hover:scale-105 group">
                  <div className="text-6xl mb-4 text-center">{product.img}</div>
                  <h4 className="text-foreground font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-racing-red font-bold text-lg">{product.price}</span>
                    <Button size="sm" variant="outline" className="group-hover:bg-racing-red group-hover:text-foreground group-hover:border-racing-red">
                      <Package className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-6 py-20">
          <div className="bg-gradient-racing rounded-3xl p-12 text-center border border-racing-red/50 shadow-racing">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Pronto para a <span className="text-racing-red-light">Adrenalina</span>?
            </h2>
            <p className="text-foreground/80 text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de fãs que já vivem a experiência definitiva da Fórmula 1
            </p>
            <Link to="/live">
              <Button size="lg" className="bg-foreground text-carbon hover:bg-foreground/90 text-lg px-8 py-6">
                Começar Gratuitamente
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
