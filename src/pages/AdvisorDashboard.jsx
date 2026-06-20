import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Mail, Linkedin, Users, Calendar, MessageSquare, Eye } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AdvisorDashboard = () => {
    const { profile, signOut } = useAuth();
    const [advisorData, setAdvisorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdvisorData = async () => {
            if (profile?.role === 'asesor' && profile.advisor_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from('advisors')
                    .select('*')
                    .eq('id', profile.advisor_id)
                    .single();

                if (error) {
                    console.error('Error fetching advisor data:', error);
                    toast({
                        title: "Error",
                        description: "No se pudo cargar la información del asesor.",
                        variant: "destructive",
                    });
                } else {
                    setAdvisorData(data);
                }
                setLoading(false);
            }
        };

        fetchAdvisorData();
    }, [profile, toast]);

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };
    
    const handleFeatureClick = (feature) => {
        toast({
          title: "Función en desarrollo",
          description: ``,
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!advisorData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-background p-4">
                 <h1 className="text-2xl font-bold text-destructive mb-4">Perfil de Asesor no Encontrado</h1>
                 <p className="text-muted-foreground mb-6">No pudimos encontrar los datos asociados a tu perfil de asesor.</p>
                 <Button onClick={handleLogout}>Cerrar Sesión</Button>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Panel de Asesor - {advisorData.name} | Giftip</title>
                <meta name="description" content={`Panel de control para ${advisorData.name}, gestiona tu perfil, clientes y agenda.`} />
            </Helmet>
            <div className="min-h-screen flex flex-col bg-background">
                <Navigation />
                <main className="flex-grow pt-24 pb-12">
                    <motion.div 
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="glass-effect mb-8">
                            <CardHeader className="flex flex-row items-center space-x-6 p-6">
                                <Avatar className="w-24 h-24 border-4 border-primary/50">
                                    <AvatarImage src={advisorData.image_url} alt={advisorData.name} />
                                    <AvatarFallback className="text-4xl bg-primary/20 text-primary">
                                        {advisorData.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-3xl font-bold text-foreground">Bienvenido, {advisorData.name}</CardTitle>
                                    <CardDescription className="text-lg text-primary font-medium">{advisorData.specialty}</CardDescription>
                                    <div className="flex items-center gap-4 mt-2">
                                        <a href={`mailto:${advisorData.contact_email}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> Contacto</a>
                                        <a href={advisorData.linkedin_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                                    </div>
                                </div>
                                <div className="ml-auto flex flex-col items-end gap-2">
                                     <Button onClick={() => navigate('/advisor/edit')}>
                                        <Edit className="mr-2 h-4 w-4" /> Editar Perfil
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={() => navigate(`/advisor/${advisorData.id}`)}>
                                        <Eye className="mr-2 h-4 w-4" /> Ver Perfil Público
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={handleLogout}>Cerrar Sesión</Button>
                                </div>
                            </CardHeader>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <motion.div whileHover={{ y: -5 }}>
                                <Card className="glass-effect h-full cursor-pointer" onClick={() => handleFeatureClick('clientes')}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3"><Users className="text-primary"/> Mis Clientes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold">42</p>
                                        <p className="text-muted-foreground">Clientes activos</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div whileHover={{ y: -5 }}>
                                <Card className="glass-effect h-full cursor-pointer" onClick={() => handleFeatureClick('agenda')}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3"><Calendar className="text-primary"/> Mi Agenda</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold">5</p>
                                        <p className="text-muted-foreground">Citas para hoy</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div whileHover={{ y: -5 }}>
                                <Card className="glass-effect h-full cursor-pointer" onClick={() => handleFeatureClick('mensajes')}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3"><MessageSquare className="text-primary"/> Mensajes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold">12</p>
                                        <p className="text-muted-foreground">Mensajes sin leer</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                         <Card className="glass-effect mt-8">
                            <CardHeader>
                                <CardTitle>Actividad Reciente</CardTitle>
                                <CardDescription>Un resumen de las últimas interacciones.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-center py-8">El panel de actividad está en desarrollo. ¡Pronto verás aquí las actualizaciones de tus clientes!</p>
                            </CardContent>
                         </Card>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default AdvisorDashboard;