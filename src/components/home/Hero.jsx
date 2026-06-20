import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagicBento from '@/components/home/MagicBento';

const Hero = ({ onStartClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden hero-pattern pt-32 pb-20">
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold font-orbitron tracking-tight mt-14 leading-tight">
          <span className="block">
            <span className="gradient-text">Transformacion</span>
            <span className="text-foreground"> Inteligente</span>
          </span>
          <span className="block">
            <span className="text-foreground">para </span>
            <span className="gradient-text">Tú Vida.</span>
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-8">
          La plataforma mas avanzada de fitness y bienestar que se adapta a ti. 
          Entrenamientos personalizados, nutricion inteligente y una comunidad que te impulsa.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <motion.button
            onClick={onStartClick}
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-full bg-background/50 text-foreground/80 shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/30 hover:text-foreground border border-border"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative flex items-center space-x-2">
              <span>Empezar Ahora</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
         <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
        />
      </div>
    </section>
  );
};

export default Hero;