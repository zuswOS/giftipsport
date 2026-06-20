import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

const PlanCard = ({ plan, index, billingCycle, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative ${plan.popular ? 'scale-105' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-accent to-primary text-white px-4 py-1">
            <Star className="w-4 h-4 mr-1" />
            Más Popular
          </Badge>
        </div>
      )}
      
      <Card className={`glass-effect hover:border-primary/30 transition-all duration-300 h-full flex flex-col ${
        plan.popular ? 'ring-2 ring-primary/30' : ''
      }`}>
        <CardHeader className="text-center pb-4">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
            <plan.icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-foreground text-2xl font-bold">{plan.name}</CardTitle>
          <p className="text-muted-foreground text-sm">{plan.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-6 flex-grow flex flex-col">
          <div className="text-center">
            <div className="flex items-baseline justify-center space-x-1">
              <span className="text-4xl font-bold text-foreground">
                €{billingCycle === 'monthly' ? plan.pricing.monthly : Math.floor(plan.pricing.yearly / 12)}
              </span>
              <span className="text-muted-foreground">
                /{billingCycle === 'monthly' ? 'mes' : 'mes'}
              </span>
            </div>
            {billingCycle === 'yearly' && (
              <p className="text-green-400 text-sm mt-1">
                Facturado anualmente como €{plan.pricing.yearly}
              </p>
            )}
          </div>

          <div className="space-y-3 flex-grow">
            {plan.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => onSelect(plan.name)}
            className={`w-full ${
              plan.popular
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
            }`}
          >
            {plan.name === 'Básico' ? 'Comenzar Gratis' : `Elegir ${plan.name}`}
          </Button>

          {plan.name === 'Básico' && (
            <p className="text-center text-muted-foreground text-xs">
              7 días gratis, luego €{plan.pricing.monthly}/mes
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlanCard;