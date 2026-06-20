import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, TrendingUp, Trophy } from 'lucide-react';

const features = [{
  icon: Zap,
  title: "IA Adaptativa",
  description: "Algoritmos que aprenden de tu progreso y ajustan automáticamente tus planes"
}, {
  icon: Shield,
  title: "Datos Seguros",
  description: "Cifrado de nivel bancario para proteger toda tu información personal"
}, {
  icon: Clock,
  title: "Disponible 24/7",
  description: "Acceso completo a tu entrenador virtual en cualquier momento y lugar"
}, {
  icon: TrendingUp,
  title: "Progreso Medible",
  description: "Analytics detallados para visualizar tu evolución y celebrar logros"
}];

const Technology = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Columna de Texto y Características */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-8">
              <span className="gradient-text">Tecnología</span>
              <br />
              de Vanguardia
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Nuestra plataforma utiliza los algoritmos más avanzados de inteligencia artificial
              para crear una experiencia verdaderamente personalizada.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Columna de Imagen y Animaciones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img className="rounded-2xl shadow-2xl w-full" alt="Abstract vector art representing the intersection of technology, fitness, and nutrition data" src="https://images.unsplash.com/photo-1677442135131-4d7c123aef1c" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
            </div>

            <motion.div className="absolute -top-4 -right-4 glass-effect rounded-lg p-4" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </motion.div>

            <motion.div className="absolute -bottom-4 -left-4 glass-effect rounded-lg p-4" animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <Zap className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technology;