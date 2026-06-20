import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';

const events = [{
  id: 1,
  title: "Masterclass: Nutrición para Atletas",
  date: "25 Sep 2025",
  time: "19:00 CET",
  type: "Virtual",
  attendees: 450,
  expert: "Dr. Laura Pérez",
  image: "A nutritionist explaining a diet plan on a video call",
  registrationLink: "mailto:events@giftip.online?subject=Registro%20Masterclass:%20Nutrición%20para%20Atletas"
}, {
  id: 2,
  title: "Maratón Virtual Global Giftip",
  date: "05 Oct 2025",
  time: "Todo el día",
  type: "Global",
  attendees: 12500,
  expert: "Comunidad Giftip",
  image: "A diverse group of runners celebrating at a finish line",
  registrationLink: "mailto:events@giftip.online?subject=Registro%20Maratón%20Virtual%20Global"
}, {
  id: 3,
  title: "Retiro de Yoga y Mindfulness",
  date: "18-20 Oct 2025",
  time: "Fin de semana",
  type: "Presencial - Ibiza",
  attendees: 30,
  expert: "Ana Wellness",
  image: "People doing yoga on a beach at sunset",
  registrationLink: "mailto:events@giftip.online?subject=Registro%20Retiro%20de%20Yoga%20y%20Mindfulness"
}];

const Events = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => <motion.div key={event.id} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      delay: index * 0.1
    }}>
          <Card className="glass-effect border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
            <img  className="w-full h-40 object-cover" alt={event.image} src="https://images.unsplash.com/photo-1509930854872-0f61005b282e" />
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="outline" className="text-primary border-primary/30">
                  {event.type}
                </Badge>
              </div>
              
              <h3 className="text-foreground font-bold text-lg mb-2 h-12">{event.title}</h3>
              
              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees.toLocaleString()} asistentes</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">Facilitado por:</p>
                <p className="text-foreground font-medium">{event.expert}</p>
              </div>
              
              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Registrarse
                </Button>
              </a>
            </CardContent>
          </Card>
        </motion.div>)}
    </div>;
};
export default Events;