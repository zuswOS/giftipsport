import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, User as UserIcon, Menu, X, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Logo from '@/components/Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ThemeToggle from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/plans', label: 'Planes' },
  { path: '/community', label: 'Comunidad' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contacto' },
];

const TabNavigation = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isNavOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isNavOpen]);

  const getAvatarFallback = name => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  const handleAuthAction = (action) => {
    setIsNavOpen(false);
    if (action === 'logout') {
      signOut();
      toast({ title: "Has cerrado sesión." });
    } else {
      navigate('/auth');
    }
  };
  
  const handleNavigation = (path) => {
    setIsNavOpen(false);
    navigate(path);
  }

  const mobileNavVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <Logo className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 relative">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  asChild
                  className="relative text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setActiveTab(link.path)}
                >
                  <Link to={link.path}>
                    {link.label}
                    {activeTab === link.path && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {/* Desktop User Menu */}
              <div className="hidden md:block">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                        <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary">
                          <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                          <AvatarFallback className="bg-primary/20 text-primary">{getAvatarFallback(profile?.full_name)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                       <DropdownMenuLabel>{profile?.full_name || user.email}</DropdownMenuLabel>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem onClick={() => navigate('/dashboard')}><LayoutDashboard className="mr-2 h-4 w-4" /><span>Dashboard</span></DropdownMenuItem>
                       <DropdownMenuItem onClick={() => navigate('/advisor/edit')} disabled={profile?.role !== 'asesor'}><UserIcon className="mr-2 h-4 w-4" /><span>Mi Perfil</span></DropdownMenuItem>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem onClick={() => handleAuthAction('logout')}><LogOut className="mr-2 h-4 w-4" /><span>Cerrar Sesión</span></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button onClick={() => navigate('/auth')}>
                    <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
                  </Button>
                )}
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(true)}>
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            variants={mobileNavVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-border">
              <Link to="/" onClick={() => setIsNavOpen(false)}><Logo className="h-7" /></Link>
              <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex-1 flex flex-col items-center justify-center space-y-6">
              {navLinks.map((link) => (
                <Button key={link.path} variant="ghost" className="text-2xl font-semibold text-muted-foreground w-full py-4" onClick={() => handleNavigation(link.path)}>
                  {link.label}
                </Button>
              ))}
            </nav>

            <div className="p-4 border-t border-border">
              {user ? (
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <Avatar>
                           <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                           <AvatarFallback>{getAvatarFallback(profile?.full_name)}</AvatarFallback>
                         </Avatar>
                         <div>
                            <p className="font-semibold">{profile?.full_name || 'Usuario'}</p>
                            <p className="text-sm text-muted-foreground">{profile?.role === 'asesor' ? 'Asesor' : 'Miembro'}</p>
                         </div>
                    </div>
                   <Button variant="outline" onClick={() => handleAuthAction('logout')}>Cerrar Sesión</Button>
                 </div>
              ) : (
                <Button className="w-full" onClick={() => handleAuthAction('login')}>
                    <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión / Registrarse
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TabNavigation;