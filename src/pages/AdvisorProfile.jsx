import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin, Mail, Edit, ArrowLeft, Award, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdvisorProfile = () => {
  const { id } = useParams();
  const { profile } = useAuth();
  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvisor = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('advisors')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast({ title: 'Error', description: 'No se pudo cargar el perfil del asesor.', variant: 'destructive' });
        console.error(error);
      } else {
        setAdvisor(data);
        if (profile?.role === 'asesor' && profile?.advisor_id === data.id) {
          setIsOwner(true);
        }
      }
      setLoading(false);
    };

    if (id) {
      fetchAdvisor();
    }
  }, [id, profile, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!advisor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-destructive">Perfil no encontrado</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${advisor.name} - Asesor Profesional | Giftip`}</title>
        <meta name="description" content={`Perfil profesional de ${advisor.name}, ${advisor.specialty} en Giftip.`} />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-grow pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-4">
                <Button variant="ghost" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4"/> Volver
                </Button>
              </div>
              <Card className="glass-effect overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-primary/30 to-accent/30 relative">
                  <Avatar className="w-32 h-32 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-background">
                    <AvatarImage src={advisor.image_url} alt={advisor.name} />
                    <AvatarFallback className="text-4xl bg-primary/20 text-primary">{advisor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardContent className="pt-20 text-center">
                  <h1 className="text-3xl font-bold text-foreground">{advisor.name}</h1>
                  <p className="text-lg text-primary font-medium">{advisor.specialty}</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <a href={`mailto:${advisor.contact_email}`}><Button variant="outline" size="icon"><Mail /></Button></a>
                    <a href={advisor.linkedin_url} target="_blank" rel="noreferrer"><Button variant="outline" size="icon"><Linkedin /></Button></a>
                    {isOwner && (
                      <Button variant="secondary" onClick={() => navigate('/advisor/edit')}>
                        <Edit className="mr-2 h-4 w-4" /> Editar Perfil
                      </Button>
                    )}
                  </div>
                  <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">{advisor.description}</p>
                </CardContent>
              </Card>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {advisor.titles && advisor.titles.length > 0 && (
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-3">
                        <Award className="text-primary"/>
                        Títulos y Certificaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {advisor.titles.map((title, index) => <li key={index}>{title}</li>)}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {advisor.history && (
                   <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-3">
                        <BookOpen className="text-primary"/>
                        Historia y Experiencia
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-line">{advisor.history}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdvisorProfile;