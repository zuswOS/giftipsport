import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, Repeat } from 'lucide-react';

const CommunityHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
        <span className="gradient-text">Nuestra Comunidad,</span> Tu Fuerza
      </h1>
      <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
        Esto es más que una app; es un movimiento. Un lugar donde cada esfuerzo se celebra y cada progreso inspira. Aquí, no estás solo en tu transformación.
      </p>

      <motion.div 
        className="relative group max-w-2xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 shadow-lg shadow-primary/10
                   before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-transparent before:opacity-0 before:pointer-events-none before:duration-700 before:transition-all
                   before:bg-gradient-to-r before:from-primary before:via-purple-500 before:to-accent before:bg-[length:200%_100%] before:animate-shimmer
                   group-hover:before:opacity-100 group-hover:before:scale-[1.01]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="relative z-10 aspect-video rounded-lg overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="w-1/2 h-full p-4 flex flex-col items-center justify-center text-center relative z-10">
            <img 
              alt="Persona antes de su transformación física" 
              className="w-32 h-32 object-cover rounded-full border-4 border-muted/50 mb-3"
              src="https://horizons-cdn.hostinger.com/2797da0c-83cb-479d-9581-8077985efc7c/c91471695df42cdfce6aa86a20efa0d0.jpg" />
            <p className="font-semibold text-muted-foreground text-sm">ANTES</p>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-primary p-3 rounded-full shadow-lg">
            <Repeat className="w-6 h-6 text-primary-foreground" />
          </div>

          <div className="w-1/2 h-full p-4 flex flex-col items-center justify-center text-center relative z-10">
             <img 
              alt="Persona después de su transformación física, luciendo en forma" 
              className="w-32 h-32 object-cover rounded-full border-4 border-primary/80 mb-3"
             src="https://horizons-cdn.hostinger.com/2797da0c-83cb-479d-9581-8077985efc7c/c38cc856d81dcaec8e14dd0962bb5036.jpg" />
            <p className="font-semibold text-primary text-sm">AHORA</p>
          </div>
        </div>
        <div className="mt-6 text-center relative z-10">
            <h3 className="text-xl font-semibold text-foreground mb-2">Comparte tu Progreso</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Inspira a otros y celebra tus victorias. ¡Toma una foto, compártela y únete a miles que ya lo están haciendo!
            </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommunityHeader;