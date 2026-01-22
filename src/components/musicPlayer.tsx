"use client";
import { useMusic } from "@/context/MusicContext";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { Button } from "./ui/button";

export const MiniPlayer = () => {
  const { activeTrack, isPlaying, play, pause, closePlayer } = useMusic();

  if (!activeTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-80 z-50"
      >
        <div className="bg-card border shadow-2xl rounded-2xl p-4 flex items-center gap-4">
         
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
            <img 
              src={activeTrack.cover_image} 
              alt={activeTrack.title} 
              className="h-full w-full object-cover" 
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{activeTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{activeTrack.artist}</p>
          </div>

          <div className="flex items-center gap-1">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => isPlaying ? pause() : play(activeTrack)} 
              className="h-9 w-9"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={closePlayer} 
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};