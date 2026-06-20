import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PostCard from '@/components/community/PostCard';
import CommunitySidebar from '@/components/community/CommunitySidebar';

const feedPosts = [
  {
    id: 1,
    user: { name: "María González", avatar: "MG", level: "Avanzado", verified: true },
    content: "¡Acabo de completar mi primer maratón! Hace un año no podía correr ni 5km. Giftip me ayudó a crear un plan progresivo que me llevó hasta aquí. ¡Nunca se rindan!",
    image: "https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=2940&auto=format&fit=crop",
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "hace 4 dias",
    tags: ["maratón", "logro", "perseverancia"]
  },
  {
    id: 2,
    user: { name: "Carlos Ruiz", avatar: "CR", level: "Intermedio", verified: false },
    content: "Semana 8 de mi transformación 💪 He perdido 12kg y ganado mucha confianza. La comunidad de Giftip es increíble, siempre hay alguien para motivarte cuando más lo necesitas.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2940&auto=format&fit=crop",
    likes: 189,
    comments: 32,
    shares: 8,
    timestamp: "hace 4 dias",
    tags: ["transformación", "pérdida de peso", "motivación"]
  },
  {
    id: 3,
    user: { name: "Ana Martín", avatar: "AM", level: "Principiante", verified: false },
    content: "Primera vez en el gimnasio después de tener a mi bebé 👶 Estaba nerviosa pero la rutina postparto de Giftip es perfecta. ¡Pequeños pasos, grandes cambios!",
    image: "https://images.unsplash.com/photo-1548690312-e3b511d48d04?q=80&w=2787&auto=format&fit=crop",
    likes: 156,
    comments: 28,
    shares: 15,
    timestamp: "hace 2 semanas",
    tags: ["postparto", "maternidad", "nuevos comienzos"]
  }
];

const Feed = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "Función en desarrollo",
      description: `¡${feature} estará disponible pronto!`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-accent to-primary text-white">
                  TU
                </AvatarFallback>
              </Avatar>
              <Button onClick={() => handleFeatureClick("Crear publicación")} variant="ghost" className="flex-1 justify-start text-muted-foreground hover:bg-white/10">
                Que logro quieres compartir hoy?
              </Button>
              <Button onClick={() => handleFeatureClick("Crear publicación")} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {feedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
      <div className="space-y-6">
        <CommunitySidebar />
      </div>
    </div>
  );
};

export default Feed;