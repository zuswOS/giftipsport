import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const navLinks = [
  { name: 'Servicios', path: '/services' },
  { name: 'Comunidad', path: '/community' },
  { name: 'Planes', path: '/plans' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contacto', path: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const handleAuthClick = (action) => {
    toast({
      title: '¡Función no implementada!'
    });
  };
  
  const handleNavClick = (e) => {
    e.preventDefault();
    toast({
        title: '¡Página no implementada!',
        description: "",
    });
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gray-900/50 backdrop-blur-sm"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Dumbbell className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">Giftip</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={handleNavClick}
              className={`text-gray-300 hover:text-purple-400 transition-colors duration-300 ${location.pathname === link.path ? 'text-purple-400 font-semibold' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-gray-700" onClick={() => handleAuthClick('Login')}>
            Iniciar Sesion
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleAuthClick('Sign Up')}>
            Registrarse
          </Button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gray-800/80 backdrop-blur-sm"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => { toggleMenu(); handleNavClick(e); }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${location.pathname === link.path ? 'text-purple-400 bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-700 w-full flex flex-col items-center space-y-2">
                 <Button variant="ghost" className="w-full text-white hover:bg-gray-700" onClick={() => { toggleMenu(); handleAuthClick('Login'); }}>
                    Iniciar Sesion
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => { toggleMenu(); handleAuthClick('Sign Up'); }}>
                    Registrarse
                  </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;