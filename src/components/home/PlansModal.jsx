import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Check, Star, Zap, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: "PLAN GRATUITO",
    description: "Perfecto para comenzar tu journey fitness",
    icon: Star,
    color: "from-blue-600 to-cyan-600",
    price: "€0",
    period: "para siempre",
    features: [
      "Entrenamientos personalizados básicos",
      "Seguimiento de progreso limitado",
      "Acceso a la comunidad",
    ],
  },
  {
    name: "GIFTPRO",
    description: "La experiencia completa con IA avanzada",
    icon: Zap,
    color: "from-purple-600 to-pink-600",
    popular: true,
    price: "€39",
    period: "/mes",
    features: [
      "IA avanzada adaptativa",
      "Planes nutricionales premium",
      "Seguimiento de salud mental",
      "Soporte prioritario 24/7",
    ],
  },
  {
    name: "GIFTRIP",
    description: "Para atletas y entusiastas serios",
    icon: Crown,
    color: "from-yellow-600 to-orange-600",
    price: "€59",
    period: "/mes",
    features: [
      "Todo lo del plan Pro",
      "Coach personal dedicado",
      "Sesiones 1:1 mensuales",
      "Análisis genético fitness",
      "Acceso VIP a eventos",
    ],
  },
];

const PlansModal = ({ isOpen, onClose, onSelectPlan }) => {

  const handleSelect = (planName) => {
    onSelectPlan(planName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="glass-effect overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:bg-accent/10 p-1 z-10"
            >
              <X className="w-5 h-5" />
            </Button>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-3xl font-bold font-orbitron text-foreground">Elige tu Plan</CardTitle>
              <p className="text-muted-foreground">Comienza tu transformación hoy mismo.</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`glass-effect border-border hover:border-primary/30 transition-all duration-300 flex flex-col ${
                      plan.popular ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-primary text-primary-foreground">
                        Más Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-foreground text-xl font-bold">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="text-center mb-6">
                          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                          <span className="text-muted-foreground">{plan.period}</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start text-sm">
                              <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        onClick={() => handleSelect(plan.name)}
                        className={`w-full ${
                          plan.popular
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                        }`}
                      >
                        Seleccionar Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlansModal;