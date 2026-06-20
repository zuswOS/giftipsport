import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NewsletterSignup = () => {
  const { toast } = useToast();

  const handleSubscription = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast({
        title: "¡Suscripción exitosa!",
        description: `Gracias por suscribirte. Recibirás lo mejor de Giftip en ${email}.`,
      });
      e.target.reset();
    } else {
      toast({
        title: "Error",
        description: "Por favor, introduce un email válido.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="glass-effect bg-gradient-to-b from-accent/10 to-primary/10">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-foreground font-bold text-lg mb-2">
            Newsletter Semanal
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Recibe los mejores consejos de fitness y nutricion directamente en tu email
          </p>
          <form onSubmit={handleSubscription}>
            <Input
              name="email"
              type="email"
              placeholder="Tu email"
              className="mb-3 bg-card/80 border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Suscribirse
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsletterSignup;