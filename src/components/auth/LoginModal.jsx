import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { useNavigate } from 'react-router-dom';

    const LoginModal = ({ isOpen, onClose, onRegisterRedirect }) => {
      const [showPassword, setShowPassword] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);

      const { toast } = useToast();
      const { signIn } = useAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast({
                variant: "destructive",
                title: "Campos incompletos",
                description: "Por favor, introduce tu correo y contraseña.",
            });
            return;
        }
        setLoading(true);
        const { data, error } = await signIn(email, password);
        if (data?.user) {
          toast({
            title: "¡Inicio de sesión exitoso!",
            description: "Bienvenido de nuevo a Giftip.",
          });
          navigate('/dashboard');
          onClose();
        } else if (error) {
            toast({
                variant: "destructive",
                title: "Error de inicio de sesión",
                description: error.message === 'Invalid login credentials' ? 'Email o contraseña incorrectos.' : error.message,
            });
        }
        setLoading(false);
      };

      if (!isOpen) return null;

      return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="glass-effect overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:bg-accent/10 p-1 z-10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  <CardHeader className="text-center p-8">
                    <CardTitle className="text-3xl font-bold font-orbitron text-foreground">
                      Bienvenido de Nuevo
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Inicia sesion para continuar tu transformacion.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          type="email"
                          placeholder="Email"
                          required
                          className="pl-10 bg-background/50"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          required
                          className="pl-10 pr-10 bg-background/50"
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
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                        {loading ? 'Procesando...' : 'Iniciar Sesión'}
                      </Button>
                    </form>
                    <p className="text-center text-sm text-muted-foreground">
                      No tienes una cuenta?
                      <button onClick={onRegisterRedirect} className="font-medium text-primary hover:text-primary/80 ml-1">
                        Registrate
                      </button>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default LoginModal;