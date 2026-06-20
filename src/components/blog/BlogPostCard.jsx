import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Calendar, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BlogPostCard = ({ post, index, categories }) => {
  const { toast } = useToast();

  const handleInteraction = (action) => {
    toast({
      title: `¡ Lo Siento ${action}!`,
      description: `¡Tienes que registrarte ${action} para usar esta opcion!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="glass-effect hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
        <div className="relative">
          <img 
            className="w-full h-48 object-cover rounded-t-lg"
            alt={post.title}
           src={post.image} />
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="text-primary border-primary/30 bg-background/50 backdrop-blur-sm">
              {categories.find(c => c.id === post.category)?.name}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-muted-foreground text-sm space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{post.publishDate}</span>
            </div>
          </div>
          
          <h3 className="text-foreground font-bold text-lg mb-3 line-clamp-2 flex-grow">
            {post.title}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-r from-accent to-primary text-white text-xs">
                  {post.author.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-foreground text-sm font-medium">{post.author.name}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-border/20">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInteraction("")}
                className="text-muted-foreground hover:text-red-400 hover:bg-accent/10 p-1"
              >
                <Heart className="w-4 h-4 mr-1" />
                {post.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInteraction("")}
                className="text-muted-foreground hover:text-blue-400 hover:bg-accent/10 p-1"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleInteraction("")}
              className="text-muted-foreground hover:text-green-400 hover:bg-accent/10 p-1"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="w-full mt-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Leer Mas
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogPostCard;