import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, BarChart, BookOpen, Target, Heart, Brain, Dumbbell } from 'lucide-react';

const UserDashboard = () => {
  const { user, profile } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const planDetails = {
    name: 'GIFTIPRO',
    color: 'text-primary'
  };

  const stats = [
    { label: 'Entrenamientos Completados', value: '0', icon: CheckCircle },
    { label: 'Racha Actual', value: '0 días', icon: BarChart },
    { label: 'Plan Nutricional', value: 'Inactivo', icon: BookOpen }
  ];

  return (
    <>
      <Helmet>
        <title>Mi Dashboard | Giftip</title>
        <meta name="description" content="Tu panel personal en Giftip. Sigue tu progreso, accede a tus planes y alcanza tus metas." />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        <main className="flex-grow pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col md:flex-row items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-orbitron">
                  <span className="gradient-text">Bienvenido de nuevo,</span> {profile?.full_name || user?.email}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">Aquí tienes un resumen de tu increíble progreso.</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{getInitials(profile?.full_name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{profile?.full_name || 'Usuario'}</p>
                  <p className={`font-bold ${planDetails.color}`}>{planDetails.name}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                  <Card className="glass-effect">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                      <stat.icon className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="glass-effect h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-orbitron flex items-center">
                      <Target className="mr-3 text-primary"/> Tu Plan de Hoy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-muted-foreground">Aquí aparecerá tu entrenamiento del día, comidas y tareas de bienestar mental.</p>
                     <div className="p-8 text-center border-2 border-dashed border-border rounded-lg">
                       <p className="text-muted-foreground">¡El panel de estadísticas y diagramas está en construcción!</p>
                       <Button variant="link" className="text-primary">Solicitar esta función</Button>
                     </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card className="glass-effect h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-orbitron">Acceso Rápido</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex-col gap-2 glass-effect hover:border-primary">
                      <Heart className="w-6 h-6 text-accent"/>
                      <span className="text-xs">Plan Nutricional</span>
                    </Button>
                     <Button variant="outline" className="h-24 flex-col gap-2 glass-effect hover:border-primary">
                      <Dumbbell className="w-6 h-6 text-accent"/>
                       <span className="text-xs">Mis Entrenamientos</span>
                    </Button>
                     <Button variant="outline" className="h-24 flex-col gap-2 glass-effect hover:border-primary">
                      <Brain className="w-6 h-6 text-accent"/>
                       <span className="text-xs">Coaching Mental</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;