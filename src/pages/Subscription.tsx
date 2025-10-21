import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, Star, Zap, Radio, Activity, MapPin, CreditCard, Shield, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Feature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  popular?: boolean;
  features: Feature[];
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  email: string;
}

export default function Subscription() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: ''
  });

  const plans: Record<'free' | 'premium', Plan> = {
    free: {
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      description: 'Acesso básico à plataforma F1rst',
      features: [
        { name: 'Dados básicos das corridas', included: true },
        { name: 'Classificações e resultados', included: true },
        { name: 'Histórico de corridas', included: true },
        { name: 'Estatísticas gerais', included: true },
        { name: 'Dados em tempo real', included: false, highlight: true },
        { name: 'Team Radio ao vivo', included: false, highlight: true },
        { name: 'Telemetria avançada', included: false, highlight: true },
        { name: 'Mapa interativo ao vivo', included: false, highlight: true },
        { name: 'Notificações push', included: false },
        { name: 'Análises preditivas', included: false }
      ]
    },
    premium: {
      name: 'Premium',
      price: 19.90,
      yearlyPrice: 199.90,
      description: 'Experiência completa com dados em tempo real',
      popular: true,
      features: [
        { name: 'Dados básicos das corridas', included: true },
        { name: 'Classificações e resultados', included: true },
        { name: 'Histórico de corridas', included: true },
        { name: 'Estatísticas gerais', included: true },
        { name: 'Dados em tempo real', included: true, highlight: true },
        { name: 'Team Radio ao vivo', included: true, highlight: true },
        { name: 'Telemetria avançada', included: true, highlight: true },
        { name: 'Mapa interativo ao vivo', included: true, highlight: true },
        { name: 'Notificações push', included: true },
        { name: 'Análises preditivas', included: true }
      ]
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar autenticado para assinar.",
        variant: "destructive"
      });
      navigate('/auth?redirect=/subscription');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get Premium plan ID
      const { data: premiumPlan, error: planError } = await supabase
        .from('planos_assinatura')
        .select('id')
        .eq('slug', 'premium')
        .single();

      if (planError || !premiumPlan) {
        throw new Error('Plano Premium não encontrado');
      }

      // Calculate period dates
      const startDate = new Date();
      const endDate = new Date(startDate);
      if (billingCycle === 'yearly') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }

      // Create subscription in database
      const { error } = await supabase.from('assinaturas_usuario').insert({
        usuario_id: user.id,
        plano_id: premiumPlan.id,
        status: 'ativa',
        periodo_atual_inicio: startDate.toISOString(),
        periodo_atual_fim: endDate.toISOString(),
        ciclo_cobranca: billingCycle === 'yearly' ? 'anual' : 'mensal',
        stripe_customer_id: `temp_${user.id}`,
        stripe_subscription_id: `sub_${Date.now()}`,
        origem_assinatura: 'website'
      });

      if (error) throw error;

      // Refresh profile to update subscription status
      await refreshProfile();

      toast({
        title: "Assinatura Confirmada! 🏆",
        description: "Bem-vindo ao F1rst Premium! Aproveite todos os recursos.",
      });

      // Redirect to live tracking
      setTimeout(() => {
        navigate('/live');
      }, 1500);

    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar seu pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (plan: Plan) => {
    if (plan.price === 0) return 'Grátis';
    
    const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.price;
    const period = billingCycle === 'yearly' ? '/ano' : '/mês';
    
    return `R$ ${price.toFixed(2).replace('.', ',')}${period}`;
  };

  const getSavings = (plan: Plan) => {
    if (plan.price === 0) return '';
    const monthlyCost = plan.price * 12;
    const savings = monthlyCost - plan.yearlyPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return `${percentage}% de desconto`;
  };

  if (showPayment && selectedPlan === 'premium') {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-racing)] opacity-30" />
        <div className="absolute inset-0 bg-[var(--gradient-glow)]" />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <Button
              onClick={() => setShowPayment(false)}
              variant="ghost"
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para planos
            </Button>

            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border shadow-[var(--shadow-racing)] p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Finalizar Pagamento</h2>
                <p className="text-muted-foreground">Plano Premium - {formatPrice(plans.premium)}</p>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={paymentData.email}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Número do cartão</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="pl-10"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardName">Nome no cartão</Label>
                  <Input
                    id="cardName"
                    type="text"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardName: e.target.value }))}
                    placeholder="Nome como está no cartão"
                    required
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                  <Shield className="w-5 h-5 text-neon-green" />
                  <div className="text-sm text-neon-green">
                    Pagamento 100% seguro com criptografia SSL
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-12 gap-2"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processando pagamento...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Confirmar Pagamento - {formatPrice(plans.premium)}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-racing)] opacity-20" />
      <div className="absolute inset-0 bg-[var(--gradient-glow)]" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--gradient-speed)]" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-[var(--gradient-speed)]" />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Escolha seu Plano
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Acesse dados exclusivos da Fórmula 1 com nossa plataforma. 
              Escolha entre acesso básico gratuito ou experiência premium com dados em tempo real.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-2 border border-border">
              <Button
                onClick={() => setBillingCycle('monthly')}
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                className="rounded-xl"
              >
                Mensal
              </Button>
              <Button
                onClick={() => setBillingCycle('yearly')}
                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                className="rounded-xl relative"
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-neon-green text-background text-xs px-2 py-1 rounded-full font-bold">
                  -17%
                </span>
              </Button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {Object.entries(plans).map(([key, plan]) => (
              <div key={key} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full flex items-center gap-2 shadow-[var(--shadow-racing)]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">MAIS POPULAR</span>
                    </div>
                  </div>
                )}

                <div className={`h-full bg-card/50 backdrop-blur-xl rounded-2xl border shadow-[var(--shadow-racing)] p-8 transition-all duration-300 hover:scale-105 ${
                  selectedPlan === key 
                    ? 'border-primary ring-2 ring-primary/50' 
                    : 'border-border hover:border-primary/50'
                }`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-4xl font-bold">
                        {formatPrice(plan)}
                      </div>
                      {billingCycle === 'yearly' && plan.price > 0 && (
                        <div className="text-sm text-neon-green mt-1">
                          {getSavings(plan)}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedPlan(key as 'free' | 'premium');
                        if (key === 'premium') {
                          if (!user) {
                            toast({
                              title: "Login necessário",
                              description: "Faça login para assinar o plano Premium.",
                            });
                            navigate('/auth?redirect=/subscription');
                          } else {
                            setShowPayment(true);
                          }
                        } else {
                          navigate('/');
                        }
                      }}
                      variant={key === 'premium' ? 'default' : 'outline'}
                      className="w-full"
                      size="lg"
                      disabled={profile?.status_plano === key}
                    >
                      {profile?.status_plano === key 
                        ? 'Plano Atual' 
                        : key === 'free' ? 'Começar Grátis' : 'Assinar Premium'}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className={`w-5 h-5 flex-shrink-0 ${feature.highlight ? 'text-primary' : 'text-neon-green'}`} />
                        ) : (
                          <X className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? feature.highlight ? 'text-foreground font-medium' : 'text-muted-foreground'
                            : 'text-muted-foreground/50'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              O que você ganha com o Premium
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Tempo Real</h3>
                <p className="text-muted-foreground text-sm">Dados atualizados instantaneamente durante as corridas</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Radio className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Team Radio</h3>
                <p className="text-muted-foreground text-sm">Escute as comunicações entre pilotos e equipe</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Telemetria</h3>
                <p className="text-muted-foreground text-sm">Dados técnicos avançados dos carros</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Mapa Ao Vivo</h3>
                <p className="text-muted-foreground text-sm">Acompanhe posições em tempo real na pista</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
