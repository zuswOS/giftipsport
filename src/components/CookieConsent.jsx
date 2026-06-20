import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consentType) => {
    localStorage.setItem('cookie_consent', consentType);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-md"
        >
          <Card className="glass-effect shadow-2xl border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Cookie className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Tu Privacidad es Importante</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Utilizamos cookies para mejorar tu experiencia en nuestro sitio, analizar el tráfico y personalizar el contenido. Al continuar, aceptas nuestro uso de cookies.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button 
                      onClick={() => handleConsent('accepted')} 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Aceptar
                    </Button>
                    <Button 
                      onClick={() => handleConsent('declined')} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Rechazar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;