import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Mail, 
  Phone, 
  MessageCircle,
  Headphones,
  Users,
  Zap,
  CheckCircle
} from 'lucide-react';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import ContactForm from '@/components/contact/ContactForm.jsx';
import ContactInfo from '@/components/contact/ContactInfo.jsx';
import ContactFAQ from '@/components/contact/ContactFAQ.jsx';

const Contact = ({ isInsideTabs }) => {
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Escríbenos directamente",
      value: "giftipbusiness@outlook.es",
      action: "Enviar Email",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "Llámanos de 9:00 a 18:00",
      value: "+34 654788874",
      action: "Llamar Ahora",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Soporte instantáneo 24/7",
      value: "Disponible ahora",
      action: "Iniciar Chat",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Headphones,
      title: "Soporte Premium",
      description: "Para miembros Premium y Elite",
      value: "Soporte prioritario",
      action: "Acceder",
      color: "from-yellow-600 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contacto - Giftip | Estamos Aqui para Ayudarte</title>
        <meta name="description" content="¿Necesitas ayuda? Contacta con el equipo de Giftip. Soporte 24/7, chat en vivo, email y teléfono. Estamos aquí para resolver todas tus dudas sobre fitness y bienestar." />
      </Helmet>

      <div className={!isInsideTabs ? "pt-20 pb-12" : "pb-12"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold font-orbitron mb-6">
              <span className="gradient-text">Contacta</span> con Nosotros
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Estamos aqui para ayudarte en cada paso de tu journey fitness. 
              Nuestro equipo de expertos esta disponible 24/7 para resolver todas tus dudas.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Respuesta en menos de 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Equipo de expertos</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-effect hover:border-primary/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-foreground font-bold text-lg mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                    <p className="text-foreground font-medium mb-4">{method.value}</p>
                    <Button
                      onClick={() => toast({
                        title: "Inicia sesion para utilizar esta funcion."
                      })}
                      className={`w-full bg-gradient-to-r ${method.color} hover:opacity-90 text-white`}
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>
            </div>
            
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ContactInfo />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ContactFAQ />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Contact;