import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import ChatBotLogo from '@/components/ChatBotLogo';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { 
          id: 'initial', 
          text: '¡Hola! Soy tu asistente de IA de Giftip. ¿Cómo puedo ayudarte hoy con tu entrenamiento, nutrición o bienestar?', 
          sender: 'bot' 
        }
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: JSON.stringify({ message: input }),
      });

      if (error) throw error;
      
      const botMessage = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error invoking Supabase function:', error);
      toast({
        variant: 'destructive',
        title: 'Error de conexión',
        description: 'No se pudo contactar al asistente. Por favor, inténtalo de nuevo más tarde.',
      });
       const errorMessage = { id: Date.now() + 1, text: "Lo siento, estoy teniendo problemas para conectar. Inténtalo de nuevo.", sender: 'bot' };
       setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
        >
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg pulse-glow p-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-full h-full" /> : <ChatBotLogo className="w-full h-full" />}
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[600px] z-50"
          >
            <div className="flex flex-col h-full glass-effect rounded-2xl shadow-2xl overflow-hidden">
              <header className="flex items-center p-4 border-b border-border/50">
                <Bot className="w-8 h-8 mr-3 text-primary" />
                <div>
                  <h3 className="text-lg font-bold">Asistente Giftip</h3>
                  <p className="text-xs text-muted-foreground">En línea</p>
                </div>
              </header>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && <AvatarBot />}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-2 ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-secondary text-secondary-foreground rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      </motion.div>
                    </div>
                  ))}
                  {isLoading && <LoadingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <footer className="p-4 border-t border-border/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-background/70 border-border/50"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </Button>
                </form>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AvatarBot = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-accent-foreground flex-shrink-0">
    <Bot className="w-5 h-5" />
  </div>
);

const LoadingIndicator = () => (
  <div className="flex items-end gap-2 justify-start">
    <AvatarBot />
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl px-4 py-3 bg-secondary text-secondary-foreground rounded-bl-none"
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </motion.div>
  </div>
);

export default ChatBot;