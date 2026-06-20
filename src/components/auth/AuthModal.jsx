import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SportsForm from './SportsForm';
import AuthForm from './AuthForm';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, onLoginRedirect }) => {
  const [step, setStep] = useState(1);
  const [authData, setAuthData] = useState(null);
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const { signUp, saveQuestionnaire } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    setAuthData(data);
    setStep(2);
  };

  const handleQuestionnaireSubmit = async (data) => {
    setQuestionnaireData(data);
    
    if (!authData) {
      toast({ variant: "destructive", title: "Error", description: "Faltan los datos de autenticación." });
      return;
    }

    const { data: signUpData, error } = await signUp(authData.email, authData.password, {
        full_name: authData.fullName,
        role: 'cliente',
    });

    if (error) {
      toast({ variant: "destructive", title: "Error en el registro", description: error.message });
      setStep(1); // Go back to auth form on error
    } else if (signUpData.user) {
      await saveQuestionnaire(signUpData.user.id, data);
      toast({
        title: "¡Registro completo!",
        description: "Te hemos enviado un correo de confirmación. Por favor, verifica tu cuenta para iniciar sesión.",
        duration: 7000,
      });
      handleClose();
      navigate('/confirm-email');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };
  
  const handleClose = () => {
    setStep(1);
    setAuthData(null);
    setQuestionnaireData(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="glass-effect overflow-hidden border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:bg-accent/10 p-1 z-10"
              >
                <X className="w-5 h-5" />
              </Button>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: step === 1 ? 0 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <AuthForm 
                        onRegister={handleRegister}
                        onLoginRedirect={onLoginRedirect}
                      />
                    )}
                    {step === 2 && (
                      <SportsForm 
                        onSubmit={handleQuestionnaireSubmit} 
                        onBack={handleBack}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;