import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Calendar, Heart, MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FeaturedPostCard = ({ post, categories }) => {
  const { toast } = useToast();

  const handleInteraction = (action) => {
    toast({
      title: ` ¡ Lo Siento ${action}!`,
      description: `¡Tienes que resgistrarte ${action}para usar esta opcion!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="glass-effect overflow-hidden">
        <div className="relative">
          <img 
            className="w-full h-64 md:h-80 object-cover"
            alt={post.title}
           src={post.image} />
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-accent to-primary text-white">
              Destacado
            </Badge>
          </div>
        </div>
        <CardContent className="p-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className="text-primary border-primary/30">
              {categories.find(c => c.id === post.category)?.name}
            </Badge>
            <div className="flex items-center text-muted-foreground text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{post.publishDate}</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {post.title}
          </h2>
          
          <p className="text-muted-foreground text-lg mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-accent to-primary text-white">
                  {post.author.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-foreground font-medium">{post.author.name}</p>
                <p className="text-muted-foreground text-sm">{post.author.role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInteraction("")}
                className="text-muted-foreground hover:text-red-400 hover:bg-accent/10"
              >
                <Heart className="w-4 h-4 mr-1" />
                {post.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInteraction("")}
                className="text-muted-foreground hover:text-blue-400 hover:bg-accent/10"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments}
              </Button>
            </div>
          </div>
          
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              Leer Articulo Completo
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeaturedPostCard;