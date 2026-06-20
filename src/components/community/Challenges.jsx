import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const challenges = [{
  id: 1,
  title: "Reto 30 Días de Cardio",
  description: "Mejora tu resistencia cardiovascular con entrenamientos diarios progresivos",
  participants: 2847,
  daysLeft: 12,
  difficulty: "Intermedio",
  reward: "Badge Cardio Master",
  image: "A person running on a treadmill with intensity"
}, {
  id: 2,
  title: "Fuerza Mental y Física",
  description: "Combina entrenamiento de fuerza con técnicas de mindfulness",
  participants: 1523,
  daysLeft: 18,
  difficulty: "Avanzado",
  reward: "Badge Warrior Mind",
  image: "A person lifting heavy weights with focused expression"
}, {
  id: 3,
  title: "Flexibilidad Total",
  description: "Mejora tu flexibilidad y movilidad con yoga y estiramientos",
  participants: 3241,
  daysLeft: 25,
  difficulty: "Principiante",
  reward: "Badge Flexibility Pro",
  image: "A person in a deep yoga stretch pose at sunrise"
}];

const Challenges = () => {
  const {
    toast
  } = useToast();
  const handleFeatureClick = feature => {
    toast({
      title: "¡Te has unido al reto!",
      description: `¡El ${feature} ha sido añadido a tu dashboard!`,
    });
  };
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {challenges.map((challenge, index) => <motion.div key={challenge.id} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      delay: index * 0.1
    }}>
          <Card className="glass-effect border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img  className="w-full h-48 object-cover" alt={challenge.image} src="" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-accent to-primary text-white">
                  {challenge.difficulty}
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-foreground font-bold text-lg mb-2">{challenge.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 h-12">{challenge.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Participantes</span>
                  <span className="text-foreground">{challenge.participants.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Días restantes</span>
                  <span className="text-foreground">{challenge.daysLeft}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recompensa</span>
                  <span className="text-primary">{challenge.reward}</span>
                </div>
              </div>
              
              <Button onClick={() => handleFeatureClick(challenge.title)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Unirse al Reto
              </Button>
            </CardContent>
          </Card>
        </motion.div>)}
    </div>;
};
export default Challenges;