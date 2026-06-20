import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const TestimonialsSection = ({ testimonials }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-center mb-12">
        Lo que dicen nuestros <span className="gradient-text">miembros</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-effect h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                
                <div className="border-t border-border/20 pt-4">
                  <h4 className="text-foreground font-semibold">{testimonial.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      Plan {testimonial.plan}
                    </Badge>
                    <span className="text-green-400 text-xs">{testimonial.achievement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;