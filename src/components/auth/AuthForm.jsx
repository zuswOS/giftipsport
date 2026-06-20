import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const AuthForm = ({ onRegister, onLoginRedirect }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
        toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Por favor, completa todos los campos.",
        });
        return;
    }
    setLoading(true);
    onRegister({ fullName, email, password });
    setLoading(false);
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CardHeader className="text-center p-0">
        <CardTitle className="text-3xl font-bold font-orbitron text-foreground">
          Crea tu Cuenta
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          Unete a una comunidad exclusiva de bienestar.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Nombre completo"
              required
              className="pl-10 bg-background/50 h-12"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="email"
              placeholder="Email"
              required
              className="pl-10 bg-background/50 h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña (mín. 6 caracteres)"
              required
              className="pl-10 pr-10 bg-background/50 h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button id="auth-form-submit-button" type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={loading}>
            {loading ? 'Procesando...' : 'Siguiente'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground pt-4">
          ¿Ya tienes una cuenta?
          <button onClick={onLoginRedirect} className="font-medium text-primary hover:text-primary/80 ml-1">
            Inicia Sesion
          </button>
        </p>
      </CardContent>
    </motion.div>
  );
};

export default AuthForm;