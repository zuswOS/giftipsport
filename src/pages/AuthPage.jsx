import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModal from '@/components/auth/AuthModal';
import LoginModal from '@/components/auth/LoginModal';
import Logo from '@/components/Logo';

const AuthPage = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(true);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseAll = () => {
    setRegisterOpen(false);
    setLoginOpen(false);
    navigate('/');
  };

  const openLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const openRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };
  
  return (
    <>
      <Helmet>
        <title>Únete a Giftip - Comienza tu Transformación</title>
        <meta name="description" content="Crea tu cuenta en Giftip para acceder a planes personalizados de fitness, nutrición inteligente y una comunidad que te impulsa a alcanzar tus metas." />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center p-4 auth-page-pattern">
        <div className="absolute top-8 left-8">
            <Logo className="h-10 w-auto" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        </div>
        
        <AnimatePresence>
          {isRegisterOpen && (
            <AuthModal
              isOpen={isRegisterOpen}
              onClose={handleCloseAll}
              onLoginRedirect={openLogin}
            />
          )}
          {isLoginOpen && (
            <LoginModal
              isOpen={isLoginOpen}
              onClose={handleCloseAll}
              onRegisterRedirect={openRegister}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AuthPage;