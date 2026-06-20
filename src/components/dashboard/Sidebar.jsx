import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, TrendingUp, Award, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QuickActions = ({ handleFeatureClick }) => (
  <Card className="glass-effect">
    <CardHeader>
      <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <Button onClick={() => handleFeatureClick("Nuevo entrenamiento")} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Play className="w-4 h-4 mr-2" /> Nuevo Entrenamiento
      </Button>
      <Button onClick={() => handleFeatureClick("Plan nutricional")} variant="outline" className="w-full">
        <Heart className="w-4 h-4 mr-2" /> Ver Plan Nutricional
      </Button>
      <Button onClick={() => handleFeatureClick("Progreso detallado")} variant="ghost" className="w-full">
        <TrendingUp className="w-4 h-4 mr-2" /> Ver Progreso Detallado
      </Button>
    </CardContent>
  </Card>
);

const Achievements = () => {
  const achievementsData = [
    { title: "Primera Semana", description: "Completaste tu primera semana", icon: "🎯" },
    { title: "Racha de 10", description: "10 días consecutivos", icon: "🔥" },
    { title: "Quema Calorías", description: "5000 calorías quemadas", icon: "⚡" },
  ];

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center">
          <Award className="w-5 h-5 mr-2" /> Logros Recientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievementsData.map((achievement, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-card/80">
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <h4 className="text-foreground font-medium text-sm">{achievement.title}</h4>
              <p className="text-muted-foreground text-xs">{achievement.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const AIRecommendations = () => (
  <Card className="glass-effect">
    <CardHeader>
      <CardTitle className="text-foreground flex items-center">
        <Zap className="w-5 h-5 mr-2 text-primary" /> Recomendaciones IA
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-accent-foreground text-sm">
            💡 Basado en tu progreso, te recomiendo aumentar la intensidad de cardio en un 10%.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-foreground text-sm">
            🥗 Tu ingesta de proteinas esta perfecta. Considera anadir mas vegetales verdes.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Sidebar = () => {
  const { toast } = useToast();
  
  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Función en desarrollo",
      description: `¡${feature} estará disponible pronto!`,
    });
  };

  const sidebarComponents = [QuickActions, Achievements, AIRecommendations];

  return (
    <>
      {sidebarComponents.map((Component, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
        >
          <Component handleFeatureClick={handleFeatureClick} />
        </motion.div>
      ))}
    </>
  );
};

export default Sidebar;