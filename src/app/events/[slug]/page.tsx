"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Reviews } from "@/components/reviews";

import Footer from "@/components/footer";
import EventCard from "@/components/eventcard";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ArrowLeft,
  Users,
  Star,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
// export const revalidate = 0;

interface EventDetailsProps {
  params: Promise<{ slug: string }>;
}

const EventDetails = ({ params }: EventDetailsProps) => {
  const router = useRouter();
  const { slug } = use(params);

  const [event, setEvent] = useState<any>(null);
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    let isMounted = true; 

    const fetchEventData = async () => {
      if (!slug) return;
      setLoading(true);

      try {
        const { data: eventData, error } = await supabase
          .from("events" as any)
          .select("*")
          .eq("slug", slug)
          .maybeSingle(); 

        if (isMounted) {
          if (error || !eventData) {
            console.error("Error:", error);
            setEvent(null);
          } else {
            setEvent(eventData);

            
            const { data: relatedData } = await supabase
              .from("events" as any)
              .select("*")
              .eq("category", (eventData as any).category)
              .neq("id", (eventData as any).id)
              .limit(2);

            setRelatedEvents(relatedData || []);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEventData();
    return () => {
      isMounted = false;
    }; 
  }, [slug]);

  const handleBuyTicket = () => {
    toast({
      title: "Ticket Reserved! 🎉",
      description: `Your ticket for ${event?.title} has been reserved.`,
    });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="h-screen w-full justify-center text-3xl items-center flex flex-col">
        <div className="text-primary font-bold">404</div>
        <p>Event Not Found</p>
        <Button onClick={() => router.push("/events")} className="mt-4">
          Return to Events
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-125">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-24 left-4 md:left-8"
        >
          <Button
            variant="ghost"
            className="glass"
            onClick={() => router.push("/events")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
          </Button>
        </motion.div>
      </section>

      <section className="relative -mt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Header Card */}
              <div className="p-8 rounded-2xl bg-gradient-card border border-border shadow-card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/20 text-primary">
                    {event.category}
                  </span>
                </div>

                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {event.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs">Date</div>
                      <div className="text-foreground font-medium">
                        {event.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs">Time</div>
                      <div className="text-foreground font-medium">
                        {event.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs">Venue</div>
                      <div className="text-foreground font-medium">
                        {event.venue}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  About This Event
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.full_description || event.description}
                </p>
              </div>

              {/* Reviews Section */}
              <Reviews eventId={event.id} />
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-fit sticky top-24"
            >
              <div className="p-8 rounded-2xl bg-gradient-card border border-border shadow-glow text-center">
                <div className="text-muted-foreground text-sm mb-1">
                  Starting from
                </div>
                <div className="font-display text-5xl font-bold text-primary">
                  ${event.price}
                </div>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleBuyTicket}
                >
                  <Ticket className="w-5 h-5 mr-2" /> Buy Ticket
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Similar Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedEvents.map((e, index) => (
                  <EventCard key={e.id} event={e} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EventDetails;
