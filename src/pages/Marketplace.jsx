import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart, 
  Star,
  Zap,
  Dumbbell,
  Apple,
  BookOpen,
  Tag
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Función en desarrollo",
      description: `¡${feature} estará disponible pronto! Puedes solicitarlo en tu próximo prompt 🚀`,
    });
  };

  const categories = [
    { id: 'all', name: 'Todo', icon: Zap },
    { id: 'equipment', name: 'Equipamiento', icon: Dumbbell },
    { id: 'nutrition', name: 'Nutrición', icon: Apple },
    { id: 'apparel', name: 'Ropa', icon: null },
    { id: 'programs', name: 'Programas', icon: BookOpen }
  ];

  const products = [
    {
      id: 1,
      name: "Mancuernas Ajustables Inteligentes",
      category: "equipment",
      price: 299.99,
      rating: 4.8,
      reviews: 124,
      image: "Sleek adjustable smart dumbbells with digital weight display",
      isNew: true,
      tags: ["Fuerza", "Hogar"]
    },
    {
      id: 2,
      name: "Proteína Whey Isolate Vainilla",
      category: "nutrition",
      price: 49.99,
      rating: 4.9,
      reviews: 345,
      image: "Modern protein powder container with vanilla flavor branding",
      isNew: false,
      tags: ["Recuperación", "Músculo"]
    },
    {
      id: 3,
      name: "Leggings de Compresión Pro",
      category: "apparel",
      price: 79.99,
      rating: 4.7,
      reviews: 210,
      image: "High-performance compression leggings in a dynamic pose",
      isNew: false,
      tags: ["Rendimiento", "Comodidad"]
    },
    {
      id: 4,
      name: "Programa 'Hypertrophy Master'",
      category: "programs",
      price: 99.99,
      rating: 5.0,
      reviews: 89,
      image: "Digital program cover with bold typography for a hypertrophy master plan",
      isNew: true,
      tags: ["Avanzado", "Músculo"]
    },
    {
      id: 5,
      name: "Esterilla de Yoga Eco-Friendly",
      category: "equipment",
      price: 59.99,
      rating: 4.8,
      reviews: 188,
      image: "Rolled-up eco-friendly yoga mat in a serene setting",
      isNew: false,
      tags: ["Yoga", "Sostenible"]
    },
    {
      id: 6,
      name: "Barritas Energéticas Orgánicas (Caja 12)",
      category: "nutrition",
      price: 29.99,
      rating: 4.6,
      reviews: 250,
      image: "Box of organic energy bars with natural ingredients visible",
      isNew: false,
      tags: ["Energía", "Snack"]
    },
    {
      id: 7,
      name: "Camiseta Técnica Transpirable",
      category: "apparel",
      price: 45.00,
      rating: 4.9,
      reviews: 412,
      image: "Breathable technical t-shirt on a mannequin showing fabric texture",
      isNew: true,
      tags: ["Running", "Ligero"]
    },
    {
      id: 8,
      name: "Plan Nutricional 'Quema Grasa'",
      category: "programs",
      price: 79.99,
      rating: 4.7,
      reviews: 150,
      image: "Digital meal plan cover with vibrant images of healthy food",
      isNew: false,
      tags: ["Pérdida de peso", "Dieta"]
    }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Marketplace - Giftip | Tu Tienda de Fitness y Bienestar</title>
        <meta name="description" content="Explora el Marketplace de Giftip. Encuentra el mejor equipamiento, nutrición, ropa y programas de fitness seleccionados por expertos para potenciar tu transformación." />
      </Helmet>

      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold font-space mb-6">
              <span className="gradient-text">Marketplace</span> de Giftip
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Productos y servicios seleccionados por expertos para potenciar tu journey. 
              Calidad y rendimiento garantizados.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <Input
                  placeholder="Buscar productos, marcas..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Button
                onClick={() => handleFeatureClick("Filtros avanzados")}
                variant="ghost"
                className="text-white hover:bg-white/10"
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
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4 mr-2" />}
                {category.name}
              </Button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="glass-effect border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full group overflow-hidden">
                  <div className="relative">
                    <img 
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={product.name}
                     src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleFeatureClick("Añadir a favoritos")}
                        className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-red-500/50"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    {product.isNew && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-purple-400 border-purple-400/30 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xl font-bold text-white">€{product.price}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm">{product.rating}</span>
                        <span className="text-white/60 text-sm">({product.reviews})</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleFeatureClick("Añadir al carrito")}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Añadir al Carrito
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;