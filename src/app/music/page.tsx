"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Play, Pause, Music2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMusic } from "@/context/MusicContext"; 

type Track = {
  id: string;
  title: string;
  artist: string;
  cover_image: string; 
  audio_url: string; 
};

const Music = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { playingId, play, pause } = useMusic();

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("music_tracks")
        .select("id,title,artist,cover_image,audio_url")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTracks((data ?? []) as Track[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header code stays the same... */}
          
          {loading ? (
            <div className="p-8 grid place-items-center"><Loader2 className="animate-spin" /></div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((t) => {
                const isPlaying = playingId === t.id;

                return (
                  <motion.article key={t.id} className={`rounded-2xl border p-5 ${isPlaying ? "border-primary shadow-lg" : "border-border"}`}>
                    <div className="aspect-video bg-muted rounded-xl mb-4 overflow-hidden relative">
                      {t.cover_image && <img src={t.cover_image} className="w-full h-full object-cover" alt={t.title} />}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="truncate mr-2">
                        <h3 className="font-bold truncate">{t.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{t.artist}</p>
                      </div>
                      <Button
                        variant={isPlaying ? "secondary" : "outline"}
                        size="icon"
                        onClick={() => (isPlaying ? pause() : play(t))}
                      >
                        {isPlaying ? <Pause /> : <Play />}
                      </Button>
                    </div>
                  </motion.article>
                );
              })}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Music;