import Link from "next/link";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Event } from '@/app/data/events';

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-500 shadow-card hover:shadow-glow"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent" />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground">
          {event.category}
        </span>

        {/* Featured Badge */}
        {event.featured && (
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {event.shortDescription}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-display font-bold text-gradient-primary">
            ${event.price}
          </span>
          <Link href={`/events/${event.slug}`}>
            <Button variant="default" size="sm" className="group/btn">
              View Event
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
