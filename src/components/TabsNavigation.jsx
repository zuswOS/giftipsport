import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import Plans from '@/pages/Plans';
import Community from '@/pages/Community';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';

const tabs = [
  { name: 'Inicio', path: '/', component: HomePage, id: 'home' },
  { name: 'Planes', path: '/plans', component: Plans, id: 'plans' },
  { name: 'Comunidad', path: '/community', component: Community, id: 'community' },
  { name: 'Blog', path: '/blog', component: Blog, id: 'blog' },
  { name: 'Contacto', path: '/contact', component: Contact, id: 'contact' },
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
};

const transition = {
  x: { type: 'spring', stiffness: 300, damping: 30, duration: 0.2 },
  opacity: { duration: 0.2 },
};

const TabsNavigation = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialIndex = Math.max(0, tabs.findIndex(tab => tab.path === location.pathname));
  
  const [[page, direction], setPage] = useState([initialIndex, 0]);

  const paginate = (newDirection, newPath) => {
    setPage([tabs.findIndex(t => t.path === newPath), newDirection]);
    navigate(newPath);
    if(onNavigate) onNavigate();
  };

  const handleTabClick = (tab, index) => {
    const newDirection = index > page ? 1 : -1;
    paginate(newDirection, tab.path);
  };

  const ActiveComponent = tabs[page].component;

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto overflow-hidden">
      <motion.nav className="p-4 sm:p-6 lg:p-8" initial={{opacity:0, y: -20}} animate={{opacity:1, y: 0, transition: {delay: 0.6}}}>
        <ul className="flex flex-col items-start space-y-4">
          {tabs.map((tab, index) => (
            <li key={tab.id} className="relative w-full">
              <button
                onClick={() => handleTabClick(tab, index)}
                className={`w-full text-left text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                  page === index ? 'text-foreground' : 'text-muted-foreground/50 hover:text-muted-foreground'
                }`}
              >
                {tab.name}
              </button>
              {page === index && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{ right: 0 }}
                />
              )}
            </li>
          ))}
        </ul>
      </motion.nav>

      <div className="flex-grow relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div className="overflow-y-auto h-full w-full">
              {/* We render a simplified version of the page to avoid nested navigations */}
              {React.createElement(ActiveComponent, { isInsideTabs: true, onNavigate: onNavigate })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Simplified page components for use inside TabsNavigation
const SimplePageWrapper = ({ children }) => (
    <div className="pt-0 pb-16">
        {children}
    </div>
);

const SimpleHomePage = ({onNavigate}) => {
    const navigate = useNavigate();
    const handleAuthClick = (mode) => {
        if(onNavigate) onNavigate();
        navigate('/auth');
    };
    return <SimplePageWrapper><HomePage onAuthClick={handleAuthClick} /></SimplePageWrapper>
};
const SimplePlansPage = ({onNavigate}) => {
     const navigate = useNavigate();
     const handleAuthClick = () => {
        if(onNavigate) onNavigate();
        navigate('/auth');
    };
    return <SimplePageWrapper><Plans onAuthClick={handleAuthClick}/></SimplePageWrapper>
};
const SimpleCommunityPage = () => <SimplePageWrapper><Community /></SimplePageWrapper>;
const SimpleBlogPage = () => <SimplePageWrapper><Blog /></SimplePageWrapper>;
const SimpleContactPage = () => <SimplePageWrapper><Contact /></SimplePageWrapper>;


// Remap components to their simple versions for Tabs
tabs[0].component = SimpleHomePage;
tabs[1].component = SimplePlansPage;
tabs[2].component = SimpleCommunityPage;
tabs[3].component = SimpleBlogPage;
tabs[4].component = SimpleContactPage;


export default TabsNavigation;