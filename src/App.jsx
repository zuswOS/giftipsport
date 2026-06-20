import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';
import TabNavigation from '@/components/TabNavigation'; // New component
import HomePage from '@/pages/HomePage';
import Community from '@/pages/Community';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import AuthPage from '@/pages/AuthPage';
import AdvisorProfile from '@/pages/AdvisorProfile';
import UserDashboard from '@/pages/UserDashboard';
import AdvisorDashboard from '@/pages/AdvisorDashboard';
import EditAdvisorProfile from '@/pages/EditAdvisorProfile';
import ProtectedRoute from '@/components/ProtectedRoute';
import EmailConfirmationPage from '@/pages/EmailConfirmation';
import Plans from '@/pages/Plans';
import CookieConsent from '@/components/CookieConsent';
import ChatBot from '@/components/ChatBot';

const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
  in: {
    x: 0,
    opacity: 1,
  },
  out: (direction) => ({
    x: direction < 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
};

const pageTransition = {
  type: 'tween',
  ease: [0.4, 0, 0.2, 1],
  duration: 0.5,
};

const PageLayout = ({ children, direction }) => (
  <motion.div
    key={useLocation().pathname}
    custom={direction}
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const pageOrder = ['/', '/plans', '/community', '/blog', '/contact'];

const AppRoutes = () => {
  const { profile } = useAuth();
  const location = useLocation();
  const [direction, setDirection] = React.useState(0);

  const prevLocationRef = React.useRef(location.pathname);

  React.useEffect(() => {
    const prevIndex = pageOrder.indexOf(prevLocationRef.current);
    const newIndex = pageOrder.indexOf(location.pathname);

    if (prevIndex !== -1 && newIndex !== -1) {
      setDirection(newIndex > prevIndex ? 1 : -1);
    } else {
      setDirection(0);
    }
    
    prevLocationRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageLayout direction={direction}><HomePage /></PageLayout>} />
        <Route path="/plans" element={<PageLayout direction={direction}><Plans /></PageLayout>} />
        <Route path="/community" element={<PageLayout direction={direction}><Community /></PageLayout>} />
        <Route path="/blog" element={<PageLayout direction={direction}><Blog /></PageLayout>} />
        <Route path="/contact" element={<PageLayout direction={direction}><Contact /></PageLayout>} />
        
        <Route path="/auth" element={<PageLayout direction={0}><AuthPage /></PageLayout>} />
        <Route path="/advisor/:id" element={<PageLayout direction={0}><AdvisorProfile /></PageLayout>} />
        <Route path="/confirm-email" element={<PageLayout direction={0}><EmailConfirmationPage /></PageLayout>} />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageLayout direction={0}>
                {profile?.role === 'asesor' ? <Navigate to="/advisor-dashboard" /> : <UserDashboard />}
              </PageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/advisor-dashboard"
          element={
            <ProtectedRoute role="asesor">
              <PageLayout direction={0}><AdvisorDashboard /></PageLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/advisor/edit"
          element={
            <ProtectedRoute role="asesor">
              <PageLayout direction={0}><EditAdvisorProfile /></PageLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ThemeProvider defaultTheme="dark" storageKey="giftip-theme">
          <AuthProvider>
            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
              <Helmet>
                <title>Giftip - El puente entre la ciencia del bienestar y tu vida</title>
                <meta name="description" content="Giftip simplifica la conexión entre entrenadores, nutricionistas y psicólogos con sus clientes. La plataforma definitiva para el bienestar integral." />
              </Helmet>
              
              <TabNavigation />
              
              <main className="pt-20"> {/* Add padding top to account for fixed header */}
                <AppRoutes />
              </main>

              <Toaster />
              <CookieConsent />
              <ChatBot />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;