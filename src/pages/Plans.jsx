import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { plans, features, testimonials, faq } from '@/data/plansData';
import PlanCard from '@/components/plans/PlanCard';
import FeaturesSection from '@/components/plans/FeaturesSection';
import TestimonialsSection from '@/components/plans/TestimonialsSection';
import FaqSection from '@/components/plans/FaqSection';

const Plans = ({ isInsideTabs, onAuthClick }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanSelection = (planName) => {
    if (user) {
      toast({
        title: `¡Plan ${planName} seleccionado!`,
        description: `Serás redirigido para completar tu suscripción.`,
      });
    } else {
      toast({
        title: "Necesitas una cuenta",
        description: "Por favor, crea una cuenta o inicia sesión para seleccionar un plan.",
        variant: "destructive",
      });
      if(onAuthClick) {
        onAuthClick();
      } else {
        navigate('/auth');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Planes y Precios - Giftip | Elige Tu Transformación</title>
        <meta name="description" content="Descubre los planes de Giftip: Básico, Premium y Elite. Entrenamientos con IA, coaching personalizado y comunidad global. Comienza gratis y transforma tu vida hoy." />
      </Helmet>

      {/* Navigation is handled by App.jsx or TabsNavigation */}

      <div className={!isInsideTabs ? "pt-20 pb-12" : "pb-12"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold font-orbitron mb-6">
              <span className="gradient-text">Planes</span> que se Adaptan a Ti
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Elige el plan perfecto para tu journey Vital. Todos incluyen nuestra IA avanzada 
              y acceso a la comunidad global mas motivadora.
            </p>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Mensual
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Anual
              </span>
              {billingCycle === 'yearly' && (
                <Badge className="bg-green-600 text-white">
                  Ahorra 20%
                </Badge>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <PlanCard 
                key={plan.name}
                plan={plan}
                index={index}
                billingCycle={billingCycle}
                onSelect={handlePlanSelection}
              />
            ))}
          </div>

          <FeaturesSection features={features} />
          <TestimonialsSection testimonials={testimonials} />
          <FaqSection faq={faq} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="glass-effect bg-gradient-to-r from-accent/10 to-primary/10">
              <CardContent className="p-12">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-6">
                  ¿Listo para <span className="gradient-text">transformar</span> tu vida?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Únete a miles de personas que ya están viviendo su mejor versión. 
                  Comienza tu prueba gratuita hoy mismo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => handlePlanSelection("Básico")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                  >
                    Comenzar Prueba Gratuita
                  </Button>
                  <Button
                    onClick={() => handlePlanSelection("Premium")}
                    variant="outline"
                    className="text-foreground border-border hover:bg-accent/10 text-lg px-8 py-6"
                  >
                    Ver Plan Premium
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Sin compromisos • Cancela cuando quieras • Soporte 24/7
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Plans;