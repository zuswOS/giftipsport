import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const supportCategories = [
  {
    id: 'general',
    name: 'Consulta General',
    description: 'Preguntas generales sobre Giftip'
  },
  {
    id: 'technical',
    name: 'Soporte Técnico',
    description: 'Problemas con la app o plataforma'
  },
  {
    id: 'billing',
    name: 'Facturación',
    description: 'Consultas sobre pagos y suscripciones'
  },
  {
    id: 'partnership',
    name: 'Colaboraciones',
    description: 'Propuestas de partnership o colaboración'
  }
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-foreground text-2xl">Envíanos un Mensaje</CardTitle>
        <p className="text-muted-foreground">
          Completa el formulario y te responderemos lo antes posible
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-foreground font-medium mb-3">
              Tipo de Consulta
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {supportCategories.map((category) => (
                <label
                  key={category.id}
                  className={`cursor-pointer p-4 rounded-lg border transition-all ${
                    formData.type === category.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={category.id}
                    checked={formData.type === category.id}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-foreground font-medium text-sm mb-1">
                    {category.name}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {category.description}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground font-medium mb-2">
                Nombre Completo *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Tu nombre"
                className="bg-card/80 border-border text-foreground placeholder:text-muted-foreground"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-2">
                Email *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
                className="bg-card/80 border-border text-foreground placeholder:text-muted-foreground"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">
              Asunto *
            </label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="¿En qué podemos ayudarte?"
              className="bg-card/80 border-border text-foreground placeholder:text-muted-foreground"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-foreground font-medium mb-2">
              Mensaje *
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Describe tu consulta con el mayor detalle posible..."
              rows={6}
              className="bg-card/80 border-border text-foreground placeholder:text-muted-foreground"
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;