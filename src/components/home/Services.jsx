import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Heart, Brain, Users, CheckCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const services = [
  {
    icon: Target,
    title: "Entrenamiento Personalizado",
    description: "Rutinas adaptadas a tu nivel, objetivos y disponibilidad con IA avanzada",
    features: ["Planes adaptativos", "Seguimiento en tiempo real", "Corrección de forma"]
  },
  {
    icon: Heart,
    title: "Nutrición Inteligente",
    description: "Planes alimentarios personalizados basados en tus preferencias y metas",
    features: ["Recetas personalizadas", "Tracking nutricional", "Ajustes automáticos"]
  },
  {
    icon: Brain,
    title: "Bienestar Mental",
    description: "Coaching psicológico y técnicas de mindfulness para una vida equilibrada",
    features: ["Meditación guiada", "Gestión del estrés", "Coaching motivacional"]
  },
  {
    icon: Users,
    title: "Comunidad Global",
    description: "Conecta con personas que comparten tus objetivos y motivaciones",
    features: ["Grupos de apoyo", "Retos grupales", "Mentorías peer-to-peer"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-6">
            <span className="gradient-text">Servicios</span> Revolucionarios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada servicio está diseñado con IA avanzada para adaptarse perfectamente a tu estilo de vida y objetivos únicos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="glass-effect hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
                  >
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <CardTitle className="text-foreground text-xl font-orbitron">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                  <ul className="space-y-2 text-left">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            textClassName="font-orbitron gradient-text"
          >
            Tu Transformación Comienza Aquí
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Services;