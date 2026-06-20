import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Technology from '@/components/home/Technology';
import Advisors from '@/components/home/Advisors';
import ImageSection from '@/components/home/ImageSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const handleStartClick = () => {
    if (user) {
        if (profile?.role === 'asesor') {
            navigate('/advisor-dashboard');
        } else {
            navigate('/dashboard');
        }
    } else {
      navigate('/auth');
    }
  };

  return (
    <>
      <Helmet>
        <title>Giftip - Tu Revolucion en Fitness y Bienestar</title>
        <meta name="description" content="Únete a Giftip y transforma tu cuerpo y mente con planes de entrenamiento y nutrición personalizados por IA. Descubre una comunidad que te apoya y alcanza tus metas." />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <main className="flex-grow">
          <Hero onStartClick={handleStartClick} />
          <Services />
          <Technology />
          <Advisors />
          <ImageSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;