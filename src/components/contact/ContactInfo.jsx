import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
const officeInfo = {
  address: "Calle de la Innovación, 42",
  city: "28001 Madrid, España",
  hours: "Lunes a Viernes: 9:00 - 18:00",
  timezone: "CET (UTC+1)"
};
const ContactInfo = () => {
  const {
    toast
  } = useToast();
  return <div className="space-y-8">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Nuestra Oficina
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-foreground font-medium">{officeInfo.address}</p>
            <p className="text-muted-foreground">{officeInfo.city}</p>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{officeInfo.hours}</span>
          </div>
          <div className="text-muted-foreground text-sm">
            <span>{officeInfo.timezone}</span>
          </div>
          <Button onClick={() => toast({
          title: "🚧 Función en desarrollo",
          description: "¡El mapa interactivo estará disponible pronto! Puedes solicitarlo en tu próximo prompt 🚀"
        })} variant="ghost" className="w-full text-foreground hover:bg-accent/10">
            Ver en Mapa
          </Button>
        </CardContent>
      </Card>
      
      <Card className="glass-effect bg-gradient-to-b from-red-600/10 to-orange-600/10">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2"></h3>
          <p className="text-white/70 text-sm mb-4"></p>
          <p className="text-white font-mono text-lg"></p>
        </CardContent>
      </Card>
    </div>;
};
export default ContactInfo;