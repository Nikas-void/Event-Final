"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles, Ticket } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";
import { getFeaturedEvents } from "../data/events";
import EventCard from "@/components/eventcard";



const Index = ()=> {
  const featuredEvents = getFeaturedEvents();
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl"
          />
        </div>

        <div className=" mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Discover Amazing Events
                </span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-foreground">Your Gateway to</span>
                <br />
                <span className="text-gradient-primary">Unforgettable</span>
                <br />
                <span className="text-foreground">Experiences</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                From New Year galas to music festivals, discover and book
                tickets to the most exciting events happening in your city.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 pt-4"
              >
                <Link href="/events">
                  <Button className=" text-white">
                    <Ticket className="w-5 h-5 " />
                    View All Events
                  </Button>
                </Link>
                <Link href="/events">
                  <Button>
                    Buy Tickets
                    <ArrowRight className="w-5 h-5 " />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            >
              {[
                { value: "50+", label: "Events" },
                { value: "10K+", label: "Attendees" },
                { value: "15+", label: "Cities" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Events Section */}
      <section className="py-24 bg-background">
        <div className=" mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured <span className="text-gradient-primary">Events</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these incredible experiences handpicked just for
              you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/events">
              <Button variant="outline" size="lg">
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Why Choose
                <span className="text-gradient-secondary">EventHub</span>?
              </h2>
              <p className="text-muted-foreground text-lg">
                We bring you the best events with seamless booking experience
                and exclusive perks.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Calendar,
                    title: "Curated Selection",
                    desc: "Hand-picked events from trusted organizers",
                  },
                  {
                    icon: Ticket,
                    title: "Instant Booking",
                    desc: "Secure your spot in seconds with easy checkout",
                  },
                  {
                    icon: Sparkles,
                    title: "Exclusive Deals",
                    desc: "Early bird discounts and VIP packages",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
                  alt="Event highlights"
                  className="w-full h-125 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    Coming Soon
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground mt-3">
                    New Year Gala 2026
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    December 31, 2025
                  </p>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -left-8 p-4 rounded-xl glass shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent border-2 border-background"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      500+ Attending
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Join them now!
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Experience Something{" "}
              <span className="text-gradient-primary">Amazing</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our collection of events and find your next unforgettable
              experience. From concerts to conferences, we have something for
              everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/events">
                <Button>
                  Explore Events
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button>Admin Portal</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Index;
