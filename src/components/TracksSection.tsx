"use client";
import { useMusic } from "@/context/MusicContext";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

type Track = {
  id: string;
  title: string;
  artist: string;
  cover_image: string;
  audio_url: string;
};

export const TracksSection = ({ tracks }: { tracks: Track[] }) => {
  const { playingId, play, pause } = useMusic();
  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((t) => {
          const isPlaying = playingId === t.id;

          return (
            <motion.article
              key={t.id}
              className={`rounded-2xl border p-5 ${
                isPlaying ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              <div className="aspect-video bg-muted rounded-xl mb-4 overflow-hidden relative">
                {t.cover_image && (
                  <img
                    src={t.cover_image}
                    className="w-full h-full object-cover"
                    alt={t.title}
                  />
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="truncate mr-2">
                  <h3 className="font-bold truncate">{t.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {t.artist}
                  </p>
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
    </div>
  );
};
