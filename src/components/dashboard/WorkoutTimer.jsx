import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WorkoutTimer = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleControl = (action) => {
    switch (action) {
      case 'start':
        setIsActive(true);
        toast({ title: "¡Entrenamiento iniciado!", description: "¡Dale con todo!" });
        break;
      case 'pause':
        setIsActive(false);
        toast({ title: "Entrenamiento pausado", description: "Toma un respiro." });
        break;
      case 'reset':
        setIsActive(false);
        setTimer(0);
        toast({ title: "Entrenamiento reiniciado" });
        break;
      default:
        break;
    }
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Entrenamiento Actual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6">
          <div className="text-6xl font-mono font-bold text-foreground">
            {formatTime(timer)}
          </div>
          
          <div className="flex justify-center space-x-4">
            {!isActive ? (
              <Button onClick={() => handleControl('start')} className="bg-green-600 hover:bg-green-700 text-white">
                <Play className="w-4 h-4 mr-2" /> Iniciar
              </Button>
            ) : (
              <Button onClick={() => handleControl('pause')} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Pause className="w-4 h-4 mr-2" /> Pausar
              </Button>
            )}
            <Button onClick={() => handleControl('reset')} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTimer;