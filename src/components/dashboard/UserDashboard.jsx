import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import StatsGrid from '@/components/dashboard/StatsGrid';
import MainContent from '@/components/dashboard/MainContent';
import Sidebar from '@/components/dashboard/Sidebar';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Simulating fetching detailed user data after auth user is available
    if (user) {
      // In a real app, this would be an API call using user.id
      const fetchedUserData = {
        name: user.user_metadata?.full_name || "Usuario Giftip",
        email: user.email,
        avatar: user.user_metadata?.full_name?.split(' ').map(n => n[0]).join('') || 'G',
        level: "Intermedio",
        joinDate: new Date(user.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        currentStreak: 0,
        totalWorkouts: 0,
        caloriesBurned: 0,
        currentWeight: 0,
        targetWeight: 0,
        weeklyGoal: 0,
        completedThisWeek: 0
      };
      setUserData(fetchedUserData);
    }
  }, [user]);

  const handleFeatureClick = (feature) => {
    toast({
      title: "Función en desarrollo",
      description: `¡${feature} estará disponible pronto! `,
    });
  };
  
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={userData.avatarUrl} />
              <AvatarFallback className="bg-primary/20 text-primary text-xl">
                {userData.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                ¡Hola, {userData.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Miembro desde {userData.joinDate} • Nivel {userData.level}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => handleFeatureClick("Configuración")}
              className="text-foreground hover:bg-accent/20"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuracion
            </Button>
            <Button
              onClick={() => handleFeatureClick("Exportar datos")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </motion.div>

      <StatsGrid stats={userData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <MainContent user={userData} />
        </div>
        <div className="space-y-8">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;