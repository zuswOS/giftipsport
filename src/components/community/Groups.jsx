import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Filter, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const groups = [
  { id: 1, name: "Mamás Fitness", members: 12500, description: "Comunidad de madres que buscan mantenerse activas y saludables", category: "Lifestyle", isJoined: true, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2940&auto=format&fit=crop" },
  { id: 2, name: "Runners Madrid", members: 8900, description: "Grupo local de corredores en Madrid para entrenar juntos", category: "Local", isJoined: false, image: "https://images.unsplash.com/photo-1530143260327-41b9c8c66c2a?q=80&w=2940&auto=format&fit=crop" },
  { id: 3, name: "Vegetarianos Activos", members: 15600, description: "Fitness y nutrición plant-based para un estilo de vida sostenible", category: "Nutrición", isJoined: true, image: "https://images.unsplash.com/photo-1540914124281-3425879423d9?q=80&w=2940&auto=format&fit=crop" },
  { id: 4, name: "Principiantes Motivados", members: 25300, description: "Apoyo y consejos para quienes empiezan su journey fitness", category: "Principiantes", isJoined: false, image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2940&auto=format&fit=crop" }
];

const Groups = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "Función en desarrollo"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input placeholder="Buscar grupos..." className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
        </div>
        <Button onClick={() => handleFeatureClick("Filtrar grupos")} variant="ghost" className="text-white hover:bg-white/10">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button onClick={() => handleFeatureClick("Crear grupo")} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Crear Grupo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
              <img  className="w-full h-40 object-cover" alt={`Group image for ${group.name}`} src="" />
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-bold text-lg">{group.name}</h3>
                      {group.isJoined && <Badge className="bg-green-600 text-white text-xs">Miembro</Badge>}
                    </div>
                    <Badge variant="outline" className="text-purple-400 border-purple-400/30 mb-2">
                      {group.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-4 h-10">{group.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-white/60">
                    <Users className="w-4 h-4" />
                    <span>{group.members.toLocaleString()} miembros</span>
                  </div>
                </div>
                
                <Button onClick={() => handleFeatureClick(group.isJoined ? "Ver grupo" : "Unirse al grupo")} className={`w-full ${group.isJoined ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'}`}>
                  {group.isJoined ? 'Ver Grupo' : 'Unirse'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Groups;