import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

const fallbackAdvisors = [
  {
    id: 'fallback-1',
    name: 'Dr. Ana Martín',
    specialty: 'Nutrición y bienestar',
    description:
      'Especialista en planificación nutricional y hábitos saludables para un estilo de vida sostenible.',
    image_url:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
    contact_email: 'ana.martin@giftip.com',
    linkedin_url: 'https://www.linkedin.com',
  },
  {
    id: 'fallback-2',
    name: 'Carlos Ortega',
    specialty: 'Entrenamiento funcional',
    description:
      'Coach especializado en fuerza, movilidad y preparación física adaptada a cada objetivo.',
    image_url:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    contact_email: 'carlos.ortega@giftip.com',
    linkedin_url: 'https://www.linkedin.com',
  },
  {
    id: 'fallback-3',
    name: 'Lucía Fernández',
    specialty: 'Mindfulness y rendimiento',
    description:
      'Profesional en bienestar mental, foco y equilibrio para mejorar el rendimiento diario.',
    image_url:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80',
    contact_email: 'lucia.fernandez@giftip.com',
    linkedin_url: 'https://www.linkedin.com',
  },
];

const Advisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const { data, error } = await supabase
          .from('advisors')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(3);

        if (error) {
          throw error;
        }

        setAdvisors(data || []);
      } catch (error) {
        console.error('Error fetching advisors:', error);
        setAdvisors(fallbackAdvisors);
        setFetchError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  const handleContactClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Conoce a Nuestros</span> Asesores Expertos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un equipo de profesionales dedicados a guiarte en cada paso de tu transformación.
          </p>
        </motion.div>

        {isLoading && (
            <div className="text-center text-muted-foreground">Cargando asesores...</div>
        )}

        {fetchError && (
            <div className="text-center text-destructive-foreground bg-destructive/20 p-4 rounded-md">{fetchError}</div>
        )}

        {!isLoading && !fetchError && advisors.length === 0 && (
            <div className="text-center text-muted-foreground">No hay asesores disponibles en este momento.</div>
        )}

        {!isLoading && !fetchError && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <Card className="glass-effect hover:border-primary/50 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <div className="relative">
                    <img
                      className="w-full h-80 object-cover"
                      alt={`Foto de ${advisor.name}`}
                      src={advisor.image_url}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{advisor.name}</h3>
                      <p className="text-primary font-semibold">{advisor.specialty}</p>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <p className="text-muted-foreground mb-6 flex-grow">{advisor.description}</p>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-card/50 border-border text-foreground hover:bg-accent/20 hover:text-accent-foreground"
                        onClick={() => handleContactClick(advisor.contact_email)}
                      >
                        <Mail className="h-5 w-5" />
                      </Button>
                      <a href={advisor.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-card/50 border-border text-foreground hover:bg-accent/20 hover:text-accent-foreground"
                        >
                          <Linkedin className="h-5 w-5" />
                        </Button>
                      </a>
                      <Link to={`/advisor/${advisor.id}`} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Ver Perfil
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Advisors;