"use client";
import React, { createContext, useContext, useState, useRef } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  cover_image: string;
  audio_url: string;
}

interface MusicContextType {
  activeTrack: Track | null;
  isPlaying: boolean;
  playingId: string | null;
  play: (track: Track) => Promise<void>;
  pause: () => void;
  closePlayer: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playPromiseRef = useRef<Promise<void> | null>(null);

  const play = async (track: Track) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    if (activeTrack?.id !== track.id) {
      audioRef.current.src = track.audio_url;
      setActiveTrack(track);
    }

    try {
      playPromiseRef.current = audioRef.current.play();
      await playPromiseRef.current;
      setIsPlaying(true);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Playback error:", error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      if (playPromiseRef.current !== null) {
        playPromiseRef.current.then(() => {
          audioRef.current?.pause();
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const closePlayer = () => {
    pause();
    setActiveTrack(null);
  };

  return (
    <MusicContext.Provider
      value={{
        activeTrack,
        isPlaying,
        playingId: activeTrack?.id || null,
        play,
        pause,
        closePlayer,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within MusicProvider");
  return context;
};
