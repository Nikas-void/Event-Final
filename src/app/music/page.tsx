import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/integrations/supabase/client";
import { TracksSection } from "@/components/TracksSection";

type Track = {
  id: string;
  title: string;
  artist: string;
  cover_image: string;
  audio_url: string;
};

export const revalidate = 60; // ISR: cache for 60 seconds

const Music = async () => {

   const { data, error } = await supabase
        .from("music_tracks")
        .select("id,title,artist,cover_image,audio_url")
        .order("created_at", { ascending: false });
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
            <TracksSection tracks={data || []} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Music;
