import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Trophy, Calendar } from 'lucide-react';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommunityHeader from '@/components/community/CommunityHeader';
import Feed from '@/components/community/Feed';
import Challenges from '@/components/community/Challenges';

const Community = ({ isInsideTabs }) => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Comunidad - Giftip | Conecta, Motívate y Transforma</title>
        <meta name="description" content="Únete a la comunidad global de Giftip. Conecta con personas que comparten tus objetivos, participa en retos grupales, comparte tu progreso y encuentra la motivación que necesitas." />
      </Helmet>

      <main className={!isInsideTabs ? "pt-24 pb-16" : "pb-16"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityHeader />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-card/80 mb-8 border border-white/10">
              <TabsTrigger value="feed" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="challenges" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy className="w-4 h-4 mr-2" />
                Retos
              </TabsTrigger>
              <TabsTrigger value="events" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Eventos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed">
              <Feed />
            </TabsContent>
            <TabsContent value="challenges">
              <Challenges />
            </TabsContent>
            <TabsContent value="events">
              <p className="text-center text-muted-foreground py-10">La sección de eventos está en construcción. ¡Vuelve pronto para ver las próximas masterclasses y quedadas!</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;