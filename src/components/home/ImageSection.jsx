import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ImageSection = () => {
  return (
    <section className="py-16 relative bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-4">
            <span className="gradient-text">Tu Transformación</span> Comienza Aquí
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En Giftip, creemos en el poder de la dedicación y la tecnología para alcanzar tus metas.
            Cada paso que das con nosotros te acerca a tu mejor versión.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <Card className="glass-effect overflow-hidden border-2 border-primary/20 shadow-xl max-w-2xl w-full">
            <CardContent className="p-0">
              <img
                src="https://horizons-cdn.hostinger.com/2797da0c-83cb-479d-9581-8077985efc7c/49011a135e1e48bcad50eae990168f54.png"
                alt="Descubre tu mejor versión con Giftip"
                className="w-full h-auto object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageSection;