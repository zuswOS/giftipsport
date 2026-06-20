import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MailCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const EmailConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Helmet>
        <title>Confirma tu Email - Giftip</title>
        <meta name="description" content="Revisa tu bandeja de entrada para confirmar tu cuenta y empezar tu viaje con Giftip." />
      </Helmet>
      <Navigation onAuthClick={(mode) => navigate(mode === 'login' ? '/#login' : '/auth')} />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md text-center glass-effect p-4 md:p-8">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 flex items-center justify-center">
                <MailCheck className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-3xl font-bold font-orbitron">¡Casi listo!</CardTitle>
              <CardDescription className="text-muted-foreground text-lg mt-2">
                Confirma tu correo electrónico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground/80">
                Hemos enviado un enlace de confirmación a tu dirección de correo. Por favor, haz clic en el enlace para activar tu cuenta.
              </p>
              <p className="text-sm text-muted-foreground">
                ¿No recibiste el correo? Revisa tu carpeta de spam o solicita uno nuevo.
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Volver a Inicio
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailConfirmationPage;