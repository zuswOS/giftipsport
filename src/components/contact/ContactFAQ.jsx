import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
  {
    question: "¿Cómo puedo cancelar mi suscripción?",
    answer: "Puedes cancelar tu suscripción en cualquier momento desde tu dashboard en la sección de configuración de cuenta."
  },
  {
    question: "¿Ofrecen reembolsos?",
    answer: "Sí, ofrecemos reembolso completo dentro de los primeros 30 días si no estás satisfecho con el servicio."
  },
  {
    question: "¿Puedo usar Giftip sin equipamiento?",
    answer: "¡Absolutamente! Nuestros entrenamientos se adaptan a tu equipamiento disponible, incluyendo rutinas completas sin equipamiento."
  },
  {
    question: "¿Cómo funciona la IA personalizada?",
    answer: "Nuestra IA analiza tu progreso, preferencias y objetivos para crear planes únicos que evolucionan contigo."
  }
];

const ContactFAQ = () => {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-foreground">Preguntas Frecuentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
            <h4 className="text-foreground font-medium text-sm mb-2">
              {item.question}
            </h4>
            <p className="text-muted-foreground text-xs">
              {item.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactFAQ;