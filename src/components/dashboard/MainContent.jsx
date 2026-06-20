import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import WorkoutTimer from './WorkoutTimer';
import { useToast } from '@/components/ui/use-toast';

const WeeklyProgress = ({ user }) => {
  const weeklyProgressDays = [
    { day: 'L', completed: true }, { day: 'M', completed: true }, { day: 'X', completed: true },
    { day: 'J', completed: false }, { day: 'V', completed: false }, { day: 'S', completed: false },
    { day: 'D', completed: false }
  ];

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-foreground">Progreso Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Meta semanal</span>
              <span>{user.completedThisWeek}/{user.weeklyGoal} entrenamientos</span>
            </div>
            <Progress value={(user.completedThisWeek / user.weeklyGoal) * 100} className="h-2 bg-primary/20" indicatorClassName="bg-primary" />
          </div>
          
          <div className="flex justify-between">
            {weeklyProgressDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  day.completed 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {day.day}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentWorkouts = () => {
  const recentWorkoutsData = [
    { name: "Cardio HIIT", duration: "25 min", calories: 320, date: "Hoy" },
    { name: "Fuerza Superior", duration: "45 min", calories: 280, date: "Ayer" },
    { name: "Yoga Flow", duration: "30 min", calories: 150, date: "Hace 2 días" },
  ];

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-foreground">Entrenamientos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentWorkoutsData.map((workout, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/80">
              <div>
                <h4 className="text-foreground font-medium">{workout.name}</h4>
                <p className="text-muted-foreground text-sm">{workout.date}</p>
              </div>
              <div className="text-right">
                <p className="text-foreground text-sm">{workout.duration}</p>
                <p className="text-muted-foreground text-xs">{workout.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const NutritionTab = () => {
  const { toast } = useToast();
  
  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Función en desarrollo",
      description: `¡${feature} estará disponible pronto!`,
    });
  };

  return (
    <Card className="glass-effect">
      <CardContent className="p-6">
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-foreground text-lg font-semibold mb-2">
            Seguimiento Nutricional
          </h3>
          <p className="text-muted-foreground mb-4">
            Registra tus comidas y obtén recomendaciones personalizadas.
          </p>
          <Button
            onClick={() => handleFeatureClick("Seguimiento nutricional")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Activar Seguimiento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MainContent = ({ user }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <WorkoutTimer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Progreso
            </TabsTrigger>
            <TabsTrigger value="workouts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Entrenamientos
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Nutrición
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="mt-6">
            <WeeklyProgress user={user} />
          </TabsContent>
          
          <TabsContent value="workouts" className="mt-6">
            <RecentWorkouts />
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-6">
            <NutritionTab />
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default MainContent;