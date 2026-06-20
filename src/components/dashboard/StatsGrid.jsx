import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Activity, Heart, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, unit, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card className="glass-effect">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-muted-foreground text-xs">{unit}</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: `hsl(var(--${color}))`}}>
            <Icon className={`w-6 h-6`} style={{ color: `hsl(var(--${color}-foreground))`}} />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const StatsGrid = ({ stats }) => {
  const statItems = [
    { icon: Zap, title: "Racha Actual", value: stats.currentStreak, unit: "días", color: "accent", colorForeground: "accent-foreground", delay: 0.1 },
    { icon: Activity, title: "Entrenamientos", value: stats.totalWorkouts, unit: "completados", color: "secondary", colorForeground: "secondary-foreground", delay: 0.2 },
    { icon: Heart, title: "Calorías", value: stats.caloriesBurned.toLocaleString(), unit: "quemadas", color: "destructive", colorForeground: "destructive-foreground", delay: 0.3 },
    { icon: Target, title: "Progreso Peso", value: `${stats.currentWeight}kg`, unit: `objetivo: ${stats.targetWeight}kg`, color: "primary", colorForeground: "primary-foreground", delay: 0.4 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map(item => (
         <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay }}
          >
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{item.title}</p>
                    <p className="text-2xl font-bold text-foreground">{item.value}</p>
                    <p className="text-muted-foreground text-xs">{item.unit}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${item.color}`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-foreground`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;