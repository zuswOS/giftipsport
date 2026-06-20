import { Target, Zap, Crown, Brain, Heart, Users, Shield, Clock, Smartphone } from 'lucide-react';

export const plans = [
  {
    name: "Básico",
    description: "Perfecto para comenzar tu journey fitness",
    icon: Target,
    color: "from-blue-600 to-cyan-600",
    popular: false,
    pricing: {
      monthly: 19,
      yearly: 190
    },
    features: [
      "Entrenamientos personalizados básicos",
      "Seguimiento de progreso",
      "Biblioteca de ejercicios (500+)",
      "Planes nutricionales básicos",
      "Soporte por email",
      "Acceso a la comunidad",
      "App móvil"
    ],
  },
  {
    name: "Premium",
    description: "La experiencia completa con IA avanzada",
    icon: Zap,
    color: "from-purple-600 to-pink-600",
    popular: true,
    pricing: {
      monthly: 39,
      yearly: 390
    },
    features: [
      "Todo lo del plan Básico",
      "IA avanzada adaptativa",
      "Coaching virtual personalizado",
      "Análisis biomecánico",
      "Planes nutricionales premium",
      "Seguimiento de salud mental",
      "Sesiones de mindfulness",
      "Soporte prioritario 24/7",
      "Acceso a masterclasses",
      "Integración con wearables"
    ],
  },
  {
    name: "Elite",
    description: "Para atletas y entusiastas serios",
    icon: Crown,
    color: "from-yellow-600 to-orange-600",
    popular: false,
    pricing: {
      monthly: 59,
      yearly: 590
    },
    features: [
      "Todo lo del plan Premium",
      "Coach personal dedicado",
      "Sesiones 1:1 mensuales",
      "Análisis genético fitness",
      "Planes de competición",
      "Nutricionista personal",
      "Acceso VIP a eventos",
      "Equipamiento premium incluido",
      "Análisis de laboratorio",
      "Programa de mentorías"
    ],
  }
];

export const features = [
  {
    icon: Brain,
    title: "IA Adaptativa",
    description: "Algoritmos que aprenden de tu progreso y ajustan automáticamente tus entrenamientos"
  },
  {
    icon: Heart,
    title: "Bienestar Integral",
    description: "No solo fitness: cuidamos tu salud mental, nutrición y estilo de vida completo"
  },
  {
    icon: Users,
    title: "Comunidad Global",
    description: "Conecta con miles de personas que comparten tus objetivos y motivaciones"
  },
  {
    icon: Shield,
    title: "Datos Seguros",
    description: "Cifrado de nivel bancario para proteger toda tu información personal y de salud"
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Tu entrenador virtual está siempre disponible, sin importar tu horario"
  },
  {
    icon: Smartphone,
    title: "Multiplataforma",
    description: "Accede desde cualquier dispositivo: móvil, tablet, web o smart TV"
  }
];

export const testimonials = [
  {
    name: "María González",
    plan: "Premium",
    content: "La IA de Giftip es increíble. Cada entrenamiento se adapta perfectamente a cómo me siento ese día.",
    rating: 5,
    achievement: "Perdió 15kg en 6 meses"
  },
  {
    name: "Carlos Ruiz",
    plan: "Elite",
    content: "El coach personal y las sesiones 1:1 han llevado mi rendimiento a otro nivel. Vale cada euro.",
    rating: 5,
    achievement: "Completó su primer triatlón"
  },
  {
    name: "Ana Martín",
    plan: "Básico",
    content: "Empecé con el plan básico y ya veo resultados increíbles. La app es súper fácil de usar.",
    rating: 5,
    achievement: "Estableció rutina de ejercicio"
  }
];

export const faq = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer: "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente y se prorratea el costo."
  },
  {
    question: "¿Hay compromiso de permanencia?",
    answer: "No hay compromisos. Puedes cancelar tu suscripción en cualquier momento y seguir usando el servicio hasta el final del período pagado."
  },
  {
    question: "¿Funciona sin equipamiento?",
    answer: "¡Absolutamente! Nuestros entrenamientos se adaptan a tu equipamiento disponible, incluyendo rutinas completas sin equipamiento."
  },
  {
    question: "¿Qué incluye el soporte 24/7?",
    answer: "Chat en vivo, email y videollamadas con nuestro equipo de expertos en fitness, nutrición y bienestar."
  }
];