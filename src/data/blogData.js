import { BookOpen, Zap, Heart, Brain, Target } from 'lucide-react';

export const categories = [
  { id: 'all', name: 'Todos', icon: BookOpen },
  { id: 'fitness', name: 'Fitness', icon: Zap },
  { id: 'nutrition', name: 'Nutrición', icon: Heart },
  { id: 'mindfulness', name: 'Mindfulness', icon: Brain },
  { id: 'lifestyle', name: 'Lifestyle', icon: Target }
];

export const featuredPost = {
  id: 1,
  title: "IA adaptiva",
  excerpt: "Descubre cómo la inteligencia artificial está transformando la manera en que entrenamos, comemos y vivimos. Una mirada profunda a las tecnologías que están redefiniendo el fitness personal.",
  author: {
    name: "Dr. Elena Rodríguez",
    avatar: "ER",
    role: "Directora de Innovación"
  },
  category: "fitness",
  readTime: "8 hours",
  publishDate: "15 Sep 2025",
  image: "https://valssport.com/wp-content/uploads/002.webp",
  likes: 288,
  comments: 67,
  featured: true,
  link: "https://valssport.com/la-revolucion-del-fitness-con-inteligencia-artificial-personalizacion-y-eficiencia/"
};

export const blogPosts = [
  {
    id: 2,
    title: "10 Superalimentos que Potenciarán tu Rendimiento Deportivo",
    excerpt: "Conoce los alimentos que los atletas de élite incluyen en su dieta diaria para maximizar su rendimiento y acelerar la recuperación.",
    author: {
      name: "Nutricionista María López",
      avatar: "ML",
      role: "Especialista en Nutrición Deportiva"
    },
    category: "nutrition",
    readTime: "6 min",
    publishDate: "12 Sep 2024",
    image: "https://i.pinimg.com/736x/28/e5/c8/28e5c8915420a37a4f30ae9b00abb228.jpg",
    likes: 189,
    comments: 34,
    featured: false,
    link: "https://www.healthline.com/nutrition/superfoodhttps://clubmetropolitan.com/los-10-superalimentos-que-deben-estar-en-tu-dieta-fitness/"
  },
  {
    id: 3,
    title: "Mindfulness y Ejercicio: La Conexión Mente-Cuerpo que Necesitas",
    excerpt: "Aprende cómo integrar técnicas de mindfulness en tu rutina de ejercicios para obtener beneficios tanto físicos como mentales.",
    author: {
      name: "Coach Ana Wellness",
      avatar: "AW",
      role: "Especialista en Bienestar Mental"
    },
    category: "mindfulness",
    readTime: "7 min",
    publishDate: "10 Sep 2025",
    image: "https://aprende.com/wp-content/uploads/2022/06/mujeres-corriendo-1.jpg",
    likes: 156,
    comments: 28,
    featured: false,
    link: "https://aprende.com/blog/bienestar/meditacion/conexion-entre-la-mente-y-el-cuerpo-como-potenciarla/"
  },
  {
    id: 4,
    title: "Rutina HIIT de 20 Minutos para Quemar Grasa en Casa",
    excerpt: "Una rutina completa de alta intensidad que puedes hacer en casa sin equipamiento. Perfecta para días ocupados.",
    author: {
      name: "Trainer Carlos Fit",
      avatar: "CF",
      role: "Entrenador Personal Certificado"
    },
    category: "fitness",
    readTime: "5 min",
    publishDate: "2 agos 2025",
    image: "https://clubmetropolitan.com/wp-content/uploads/2023/03/image_2023_03_17T10_51_14_286Z.png",
    likes: 298,
    comments: 45,
    featured: false,
    link: "https://www.sabervivirtv.com/salud-activa/ejercicios-para-quemar-grasa-rapidamente-en-casa-aptos-para-principiantes_4452"
  },
  {
    id: 5,
    title: "Cómo Crear Hábitos Saludables que Realmente Perduren",
    excerpt: "La ciencia detrás de la formación de hábitos y estrategias prácticas para hacer que los cambios positivos se mantengan a largo plazo.",
    author: {
      name: "Psicóloga Laura Mente",
      avatar: "LM",
      role: "Especialista en Psicología del Comportamiento"
    },
    category: "lifestyle",
    readTime: "9 min",
    publishDate: "1 oct 2025",
    image: "https://www.mutualmedica.com/documents/d/global/10-habitos-de-vida-saludable-jpg",
    likes: 234,
    comments: 52,
    featured: false,
    link: "https://medlineplus.gov/spanish/ency/article/002393.htm"
  },
  {
    id: 6,
    title: "Proteínas Vegetales: Guía Completa para Atletas Veganos",
    excerpt: "Todo lo que necesitas saber sobre proteínas vegetales para mantener y desarrollar masa muscular con una dieta plant-based.",
    author: {
      name: "Chef Verde Martín",
      avatar: "VM",
      role: "Chef Especializado en Nutrición Vegana"
    },
    category: "nutrition",
    readTime: "8 min",
    publishDate: "3 Sep 2025",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop",
    likes: 167,
    comments: 31,
    featured: false,
    link: "https://www.nomeatathlete.com/"
  },
  {
    id: 7,
    title: "Recuperación Activa: Por Qué los Días de Descanso No Significan Inactividad",
    excerpt: "Descubre cómo optimizar tus días de descanso con actividades de recuperación activa que aceleren tu progreso.",
    author: {
      name: "Fisioterapeuta Roberto",
      avatar: "FR",
      role: "Especialista en Recuperación Deportiva"
    },
    category: "fitness",
    readTime: "6 min",
    publishDate: "1 Sep 2024",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2787&auto=format&fit=crop",
    likes: 145,
    comments: 22,
    featured: false,
    link: "https://www.acefitness.org/resources/pros/expert-articles/6475/active-vs-passive-recovery-which-is-best-for-your-clients/"
  }
];

export const trendingTopics = [
  "IA en Fitness",
  "Nutrición Personalizada",
  "Entrenamiento en Casa",
  "Mindfulness Deportivo",
  "Recuperación Muscular",
  "Dieta Plant-Based"
];

export const popularAuthors = [
  { name: "Dr. Elena Rodríguez", specialty: "IA & Fitness" },
  { name: "Nutricionista María López", specialty: "Nutrición Deportiva" },
  { name: "Coach Ana Wellness", specialty: "Mindfulness" }
];