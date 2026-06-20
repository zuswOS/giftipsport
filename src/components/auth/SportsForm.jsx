import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Zap, Dumbbell, Clock, MapPin, Check, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    id: 'main_goal',
    icon: Target,
    title: '¿Cuál es tu objetivo principal?',
    options: ['Perder peso', 'Ganar músculo', 'Mejorar resistencia', 'Mantenerme activo'],
  },
  {
    id: 'fitness_level',
    icon: Zap,
    title: '¿Cuál es tu nivel de fitness actual?',
    options: ['Principiante', 'Intermedio', 'Avanzado', 'Atleta'],
  },
  {
    id: 'training_days_per_week',
    icon: Dumbbell,
    title: '¿Cuántos días a la semana puedes entrenar?',
    options: ['1-2 días', '3-4 días', '5-6 días', 'Todos los días'],
  },
  {
    id: 'preferred_training_time',
    icon: Clock,
    title: '¿Cuándo prefieres entrenar?',
    options: ['Mañana', 'Tarde', 'Noche', 'Flexible'],
  },
  {
    id: 'training_location',
    icon: MapPin,
    title: '¿Dónde prefieres entrenar?',
    options: ['En casa', 'Gimnasio', 'Aire libre', 'Mixto'],
  },
];

const parseDays = (option) => {
  if (!option) return 0;
  if (option.includes('1-2')) return 2;
  if (option.includes('3-4')) return 4;
  if (option.includes('5-6')) return 6;
  if (option.includes('Todos')) return 7;
  return 0;
};

const SportsForm = ({ onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);

  const handleSelect = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setDirection(1);
        setCurrentStep(prev => prev + 1);
      }
    }, 300);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleFinalSubmit = () => {
    const parsedData = {
      ...answers,
      training_days_per_week: parseDays(answers.training_days_per_week),
    };
    onSubmit(parsedData);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  if (!currentQuestion) {
    return null;
  }

  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -direction * 50 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <CardHeader className="text-center p-0 mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <currentQuestion.icon className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold font-orbitron text-foreground">Completa tu Perfil</CardTitle>
        <CardDescription className="text-muted-foreground">Pregunta {currentStep + 1} de {questions.length}</CardDescription>
      </CardHeader>
      
      <div className="px-8">
        <Progress value={progress} className="w-full mb-8 h-2" />
      </div>

      <CardContent className="p-0">
        <h3 className="text-center text-xl font-semibold mb-6">{currentQuestion.title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.options.map(option => (
            <Button
              key={option}
              variant="outline"
              onClick={() => handleSelect(currentQuestion.id, option)}
              className={`text-lg h-auto py-4 px-4 glass-effect border-border text-foreground hover:bg-accent/20 transition-all duration-200 flex items-center justify-center space-x-2 ${
                answers[currentQuestion.id] === option ? 'ring-2 ring-primary' : ''
              }`}
            >
              {answers[currentQuestion.id] === option && <Check className="w-5 h-5 text-primary" />}
              <span>{option}</span>
            </Button>
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={handlePreviousStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Atrás
          </Button>
          {currentStep === questions.length - 1 && (
            <Button onClick={handleFinalSubmit} className="bg-primary hover:bg-primary/90">
              Finalizar y Crear Cuenta
            </Button>
          )}
        </div>
      </CardContent>
    </motion.div>
  );
};

export default SportsForm;