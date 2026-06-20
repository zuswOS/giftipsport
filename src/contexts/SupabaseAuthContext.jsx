import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase'; // Corrected import
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = useCallback(async (currentUser) => {
    if (!currentUser) {
      setProfile(null);
      return null;
    }

    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', currentUser.id)
        .single();

      if (error && status !== 406) { // 406 is returned when no rows are found, which is not a server error.
        console.error("Error fetching profile:", error);
        toast({
          title: "Error al cargar el perfil",
          description: "No se pudo conectar con el servidor para obtener los datos de tu perfil.",
          variant: "destructive",
        });
        return null;
      }
      
      setProfile(data);
      return data;
    } catch (e) {
      console.error("Unhandled error in fetchProfile", e);
      toast({
        title: "Error de red",
        description: "Hubo un problema de conexión al buscar tu perfil.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  const saveQuestionnaire = useCallback(async (userId, formData) => {
      if (!formData || !userId) return;
      const { error } = await supabase
        .from('sports_questionnaire')
        .insert({ ...formData, user_id: userId });

      if (error) {
        console.error('Error saving questionnaire:', error);
        toast({
          variant: "destructive",
          title: "Error al guardar formulario",
          description: "No pudimos guardar tus respuestas. Podrás completarlas más tarde en tu perfil.",
        });
      } else {
        toast({
          title: "¡Cuestionario guardado!",
          description: "Tus respuestas han sido guardadas con éxito.",
        });
      }
    }, [toast]);

  useEffect(() => {
    const initializeSession = async () => {
      setLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          toast({ title: "Error de Sesión", description: "No se pudo verificar tu sesión.", variant: "destructive" });
        }
        
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await fetchProfile(currentUser);
        }
      } catch (e) {
        console.error("Network error during session initialization:", e);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
         if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
          await fetchProfile(currentUser);
         }
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [fetchProfile, toast]);

  const value = {
    user,
    profile,
    loading,
    signUp: (email, password, meta) => 
        supabase.auth.signUp({ 
            email, 
            password, 
            options: {
                data: meta,
                emailRedirectTo: `${window.location.origin}/confirm-email`
            }
        }),
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({ title: "Error al cerrar sesión", description: error.message, variant: "destructive" });
      }
    },
    refreshProfile: () => user ? fetchProfile(user) : Promise.resolve(null),
    saveQuestionnaire,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};