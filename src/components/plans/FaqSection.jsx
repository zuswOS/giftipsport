import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const FaqSection = ({ faq }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-center mb-12">
        Preguntas <span className="gradient-text">Frecuentes</span>
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-6">
        {faq.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="text-foreground font-semibold text-lg mb-3">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FaqSection;