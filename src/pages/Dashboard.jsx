import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  // In a real app, we would fetch the user's role from the 'profiles' table
  // For now, we'll assume a 'cliente' role if not specified.
  const userRole = user?.profile?.role || 'cliente';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Giftip | Tu Centro de Control Personal</title>
        <meta name="description" content="Accede a tu dashboard personalizado en Giftip. Monitorea tu progreso, gestiona entrenamientos, revisa estadísticas y alcanza tus objetivos de fitness." />
        <meta property="og:title" content="Dashboard - Giftip | Tu Centro de Control Personal" />
        <meta property="og:description" content="Accede a tu dashboard personalizado en Giftip para monitorear tu progreso." />
      </Helmet>

      <Navigation />

      <div className="pt-20 pb-12">
        {userRole === 'cliente' ? (
          <UserDashboard />
        ) : (
          <div>Advisor Dashboard (To be implemented)</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;