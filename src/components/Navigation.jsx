import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, User as UserIcon, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Logo from '@/components/Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ThemeToggle from '@/components/ThemeToggle';
import TabsNavigation from '@/components/TabsNavigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const Navigation = ({ onAuthClick }) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNavOpen]);

  const getAvatarFallback = name => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const handleAuthAndCloseMenu = (mode) => {
    if (onAuthClick) {
      onAuthClick(mode);
    } else {
      // Fallback behavior if onAuthClick is not provided
      if (mode === 'login') {
        navigate('/auth');
      } else {
        navigate('/auth');
      }
    }
    setIsNavOpen(false);
  };
  
  const handleSignOut = () => {
    signOut();
    setIsNavOpen(false);
  };
  
  const handleDashboardClick = () => {
    setIsNavOpen(false);
    navigate('/dashboard');
  };

  const handleProfileClick = () => {
    setIsNavOpen(false);
    // Future: navigate('/profile');
  };

  const navOverlayVariants = {
    hidden: { opacity: 0, scale: 1.1, borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%" },
    visible: { opacity: 1, scale: 1, borderRadius: "0% 0% 0% 0%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }},
    exit: { opacity: 0, scale: 1.1, borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }},
  };

  return (
    <>
      <motion.header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <Logo className="h-8 w-auto" />
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            variants={navOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
          >
            <div className="flex justify-between items-center p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
               <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0, transition: {delay: 0.5}}}>
                 {user ? (
                   <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                       <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                         <Avatar className="h-10 w-10">
                           <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                           <AvatarFallback className="bg-primary text-primary-foreground">
                             {getAvatarFallback(profile?.full_name)}
                           </AvatarFallback>
                         </Avatar>
                       </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56" align="start" forceMount>
                       <DropdownMenuLabel className="font-normal">
                         <div className="flex flex-col space-y-1">
                           <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
                           <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                         </div>
                       </DropdownMenuLabel>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem onClick={handleDashboardClick}><LayoutDashboard className="mr-2 h-4 w-4" /><span>Dashboard</span></DropdownMenuItem>
                       <DropdownMenuItem onClick={handleProfileClick}><UserIcon className="mr-2 h-4 w-4" /><span>Perfil</span></DropdownMenuItem>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem onClick={handleSignOut}><LogOut className="mr-2 h-4 w-4" /><span>Cerrar sesión</span></DropdownMenuItem>
                     </DropdownMenuContent>
                   </DropdownMenu>
                 ) : (
                    <Button variant="outline" onClick={() => handleAuthAndCloseMenu('login')}>
                        Iniciar Sesion
                    </Button>
                 )}
               </motion.div>
               <motion.button onClick={() => setIsNavOpen(false)} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0, transition: {delay: 0.5}}} className="p-2 rounded-full hover:bg-accent">
                 <X className="h-6 w-6" />
               </motion.button>
            </div>
            
            <div className="flex-grow flex flex-col">
              <TabsNavigation onNavigate={() => setIsNavOpen(false)} />
            </div>

            <motion.div className="text-center p-6" initial={{opacity:0}} animate={{opacity:1, transition: {delay: 0.7}}}>
              {!user && (
                <Button onClick={() => handleAuthAndCloseMenu('register')} variant="link" className="text-foreground">
                  No tienes cuenta... Registrate
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;