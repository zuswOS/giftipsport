import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Search, 
  Filter, 
  TrendingUp,
  Tag
} from 'lucide-react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { featuredPost, blogPosts, categories, trendingTopics, popularAuthors } from '@/data/blogData';
import FeaturedPostCard from '@/components/blog/FeaturedPostCard';
import BlogPostCard from '@/components/blog/BlogPostCard';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Blog = ({ isInsideTabs }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "Función en desarrollo"
    });
  };

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog - Giftip | Conocimiento y Inspiracion Fitness</title>
        <meta name="description" content="Descubre artículos expertos sobre fitness, nutrición, mindfulness y bienestar en el blog de Giftip. Consejos prácticos, investigación científica y inspiración para tu transformación." />
      </Helmet>

      <div className={!isInsideTabs ? "pt-20 pb-12" : "pb-12"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold font-orbitron mb-6">
              <span className="gradient-text">Blog</span> de Giftip.online
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Conocimiento experto, consejos practicos e inspiracion para tu journey de transformacion. 
              Contenido creado por profesionales y potenciado por IA.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Buscar artículos..."
                  className="pl-10 bg-card/80 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                onClick={() => handleFeatureClick("Filtros avanzados")}
                variant="ghost"
                className="text-foreground hover:bg-accent/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent/20'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {selectedCategory === 'all' && (
                <FeaturedPostCard post={featuredPost} categories={categories} />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <BlogPostCard key={post.id} post={post} index={index} categories={categories} />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Temas Trending
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {trendingTopics.map((topic) => (
                      <Button
                        key={topic}
                        variant="ghost"
                        onClick={() => handleFeatureClick(`Buscar ${topic}`)}
                        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      >
                        <Tag className="w-4 h-4 mr-2" />
                        {topic}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <NewsletterSignup />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-foreground">Autores Populares</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {popularAuthors.map((author) => (
                      <div key={author.name} className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-r from-accent to-primary text-white text-sm">
                            {author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-foreground font-medium text-sm">{author.name}</p>
                          <p className="text-muted-foreground text-xs">{author.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;