import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerSections = [{
    title: "Servicios",
    links: [{
      name: "Entrenamiento Personal",
      href: "/plans"
    }, {
      name: "Planes Nutricionales",
      href: "/plans"
    }, {
      name: "Asesoría de Bienestar",
      href: "/#advisors"
    }, {
      name: "Coaching Mental",
      href: "/#advisors"
    }]
  }, {
    title: "Comunidad",
    links: [{
      name: "Foro de Discusión",
      href: "/community"
    }, {
      name: "Retos",
      href: "/community"
    }, {
      name: "Eventos",
      href: "/community"
    }, {
      name: "Historias de Éxito",
      href: "/blog"
    }]
  }, {
    title: "Recursos",
    links: [{
      name: "Blog de Fitness",
      href: "/blog"
    }, {
      name: "Guías Descargables",
      href: "/blog"
    }, {
      name: "Videos de Ejercicios",
      href: "#"
    }, {
      name: "Calculadoras de Salud",
      href: "/"
    }]
  }, {
    title: "Soporte",
    links: [{
      name: "Centro de Ayuda",
      href: "/contact"
    }, {
      name: "Contacto",
      href: "/contact"
    }, {
      name: "Términos de Servicio",
      href: "#"
    }, {
      name: "Política de Privacidad",
      href: "#"
    }]
  }];
  const socialLinks = [{
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Youtube,
    href: "#",
    label: "YouTube"
  }];
  return <footer className="relative bg-background border-t border-border/20">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-2">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="font-orbitron font-bold text-2xl gradient-text">GIF-TIP</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Transformamos vidas a través de la tecnología más avanzada en fitness, 
                  nutrición y bienestar. Tu compañero inteligente hacia una vida más saludable.
                </p>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>giftipbusiness@outlook.es</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+34 (654788874)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Madrid, España</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {footerSections.map((section, index) => <motion.div key={section.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="space-y-4">
                <span className="font-semibold text-foreground text-sm uppercase tracking-wider">
                  {section.title}
                </span>
                <ul className="space-y-2">
                  {section.links.map(link => <li key={link.name}>
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>)}
                </ul>
              </motion.div>)}
          </div>
        </div>

        <div className="border-t border-border/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.6
          }} className="flex items-center space-x-2 text-muted-foreground text-sm">
              <span>© {currentYear} Giftip.online. Hecho con</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>para transformar vidas</span>
            </motion.div>

            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="flex items-center space-x-4">
              {socialLinks.map(social => <motion.a key={social.label} href={social.href} whileHover={{
              scale: 1.1,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </motion.a>)}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;