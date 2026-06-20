import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PostCard from '@/components/community/PostCard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';


const feedPosts = [
  {
    id: 1,
    user: { name: "María González", avatar: "MG", level: "Avanzado", verified: true },
    content: "¡Acabo de completar mi primer maratón! Hace un año no podía correr ni 5km. Giftip me ayudó a crear un plan progresivo que me llevó hasta aquí. ¡Nunca se rindan!",
    image: "https://images.unsplash.com/photo-1758684051090-bc83bb0af184?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000",
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "hace 6 horas",
    tags: ["maratón", "logro", "perseverancia"]
  },
  {
    id: 2,
    user: { name: "Carlos Ruiz", avatar: "CR", level: "Intermedio", verified: false },
    content: "Semana 8 de mi transformación 💪 He perdido 12kg y ganado mucha confianza. La comunidad de Giftip es increíble, siempre hay alguien para motivarte cuando más lo necesitas.",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    likes: 189,
    comments: 32,
    shares: 8,
    timestamp: "hace 5 horas",
    tags: ["transformación", "pérdida de peso", "motivación"]
  },
  {
    id: 3,
    user: { name: "Ana Martín", avatar: "AM", level: "Principiante", verified: false },
    content: "Primera vez en el gimnasio después de tener a mi bebé 👶 Estaba nerviosa pero la rutina postparto de Giftip es perfecta. ¡Pequeños pasos, grandes cambios!",
    image: "https://www.anbbaby.com/cdn/shop/articles/Postpartum_Exercise_Gentle_Workouts_For_New_Moms_1_46cc1e90-e09f-4c5d-a8b1-2551a333d90c_1024x1024.jpg?v=1742832883",
    likes: 156,
    comments: 28,
    shares: 15,
    timestamp: "hace 1 día",
    tags: ["postparto", "maternidad", "nuevos comienzos"]
  }
];

const Feed = () => {
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleFeatureClick = () => {
     if (!session) {
      toast({
        title: "¡Lo siento!",
        description: "Regístrate para poder acceder a esta función",
        variant: "destructive",
      });
      setTimeout(() => navigate('/auth'), 1500);
    } else {
      toast({
        title: "🚧 Función en desarrollo",
        description: `¡Crear publicaciones estará disponible pronto!`
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="glass-effect border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-accent to-primary text-white">
                {session ? session.user.email.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <Button onClick={handleFeatureClick} variant="ghost" className="flex-1 justify-start text-muted-foreground hover:bg-white/10">
              ¿Qué logro quieres compartir hoy?
            </Button>
            <Button onClick={handleFeatureClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {feedPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </div>
  );
};

export default Feed;