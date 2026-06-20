import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleInteraction = (action) => {
    if (!session) {
      toast({
        title: "¡Lo siento!",
        description: "Regístrate para poder acceder a esta función",
        variant: "destructive",
      });
      setTimeout(() => navigate('/auth'), 1500);
      return;
    }

    let description = `¡La función de ${action} estará disponible pronto!`;
    if (action === 'Compartir') {
      navigator.clipboard.writeText(`${window.location.origin}/community/post/${post.id}`);
      description = '¡Enlace al post copiado al portapapeles!';
    }
    
    toast({
      title: action === 'Compartir' ? '¡Compartido!' : `🚧 ${action}`,
      description: description
    });
  };

  return (
    <Card className="glass-effect border-white/10 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-accent to-primary text-white">
                {post.user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-foreground font-semibold">{post.user.name}</h4>
                {post.user.verified && <Star className="w-4 h-4 text-primary fill-current" />}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {post.user.level}
                </Badge>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-foreground mb-4">{post.content}</p>

        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              className="w-full h-64 object-cover" 
              alt={`Imagen de la publicación de ${post.user.name}`} 
              src={post.image} 
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-primary border-primary/30">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" onClick={() => handleInteraction("Me gusta")} className="text-muted-foreground hover:text-red-400 hover:bg-white/10">
              <Heart className="w-4 h-4 mr-2" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleInteraction("Comentar")} className="text-muted-foreground hover:text-blue-400 hover:bg-white/10">
              <MessageCircle className="w-4 h-4 mr-2" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleInteraction("Compartir")} className="text-muted-foreground hover:text-green-400 hover:bg-white/10">
              <Share2 className="w-4 h-4 mr-2" />
              {post.shares}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;