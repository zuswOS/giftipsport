import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Trash2, Plus, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const EditAdvisorProfile = () => {
    const { profile } = useAuth();
    const [advisorData, setAdvisorData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        description: '',
        history: '',
        titles: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const fetchAdvisorData = useCallback(async () => {
        if (profile?.role === 'asesor' && profile.advisor_id) {
            setLoading(true);
            const { data, error } = await supabase
                .from('advisors')
                .select('*')
                .eq('id', profile.advisor_id)
                .single();

            if (error) {
                toast({ title: "Error", description: "No se pudo cargar tu información.", variant: "destructive" });
            } else {
                setAdvisorData(data);
                setFormData({
                    name: data.name || '',
                    specialty: data.specialty || '',
                    description: data.description || '',
                    history: data.history || '',
                    titles: data.titles || []
                });
            }
            setLoading(false);
        }
    }, [profile, toast]);

    useEffect(() => {
        fetchAdvisorData();
    }, [fetchAdvisorData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTitleChange = (index, value) => {
        const newTitles = [...formData.titles];
        newTitles[index] = value;
        setFormData(prev => ({ ...prev, titles: newTitles }));
    };

    const addTitle = () => {
        setFormData(prev => ({ ...prev, titles: [...prev.titles, ''] }));
    };
    
    const removeTitle = (index) => {
        const newTitles = formData.titles.filter((_, i) => i !== index);
        setFormData(prev => ({...prev, titles: newTitles}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;
        setSaving(true);

        const { error } = await supabase
            .from('advisors')
            .update({
                name: formData.name,
                specialty: formData.specialty,
                description: formData.description,
                history: formData.history,
                titles: formData.titles.filter(t => t.trim() !== ''),
            })
            .eq('id', profile.advisor_id);
        
        setSaving(false);

        if (error) {
            toast({ title: "Error", description: "No se pudo guardar tu perfil. Inténtalo de nuevo.", variant: "destructive" });
        } else {
            toast({ title: "¡Éxito!", description: "Tu perfil se ha actualizado correctamente." });
            navigate(`/advisor/${profile.advisor_id}`);
        }
    };
    
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>;
    }

    if (!advisorData) {
        return <div className="min-h-screen flex items-center justify-center bg-background">No se encontraron datos del asesor.</div>;
    }

    return (
        <>
            <Helmet>
                <title>Editar Perfil de Asesor | Giftip</title>
                <meta name="description" content="Edita tu perfil profesional en Giftip." />
            </Helmet>
            <div className="min-h-screen flex flex-col bg-background">
                <Navigation />
                <main className="flex-grow pt-24 pb-12">
                    <motion.div
                        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                         <div className="mb-4">
                            <Button variant="ghost" onClick={() => navigate('/advisor-dashboard')} className="text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="mr-2 h-4 w-4"/> Volver al Panel
                            </Button>
                        </div>
                        <Card className="glass-effect">
                            <CardHeader>
                                <CardTitle className="text-2xl">Editar Perfil Profesional</CardTitle>
                                <CardDescription>Mantén tu información actualizada para atraer a más clientes.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nombre Completo</Label>
                                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={saving} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="specialty">Especialidad Principal</Label>
                                            <Input id="specialty" name="specialty" value={formData.specialty} onChange={handleInputChange} disabled={saving} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descripción Corta (para la tarjeta de perfil)</Label>
                                        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} disabled={saving} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="history">Historia y Experiencia</Label>
                                        <Textarea id="history" name="history" value={formData.history} onChange={handleInputChange} rows={6} disabled={saving} />
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Títulos y Certificaciones</Label>
                                        {formData.titles.map((title, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input value={title} onChange={(e) => handleTitleChange(index, e.target.value)} placeholder={`Título #${index + 1}`} disabled={saving} />
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeTitle(index)} disabled={saving}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        ))}
                                         <Button type="button" variant="outline" onClick={addTitle} disabled={saving}><Plus className="mr-2 h-4 w-4"/>Añadir Título</Button>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={saving}>
                                            {saving ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Save className="mr-2 h-4 w-4" />
                                            )}
                                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default EditAdvisorProfile;