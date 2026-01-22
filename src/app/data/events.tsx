export interface Event {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
}

export const events: Event[] = [
  {
    id: "1",
    slug: "new-year-gala-2026",
    title: "New Year Gala 2026",
    shortDescription:
      "Ring in the new year with an unforgettable celebration featuring live performances and fireworks.",
    fullDescription:
      "Join us for the most spectacular New Year celebration of 2026! This exclusive gala features world-class DJs, live band performances, gourmet dining, premium open bar, and a breathtaking midnight fireworks display. Dress code: Black tie optional.",
    date: "December 31, 2025",
    time: "8:00 PM - 3:00 AM",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70061974.73935777!2d144.67907661822878!3d30.8709325409558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86249d7a0b3face1%3A0x2367a2e44ea400b8!2sDowntown%20Convention%20Center!5e1!3m2!1sen!2smn!4v1767684653220!5m2!1sen!2smn",
    venue: "Downtown Convention Center",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80",
    category: "Celebration",
    featured: true,
  },

  {
    id: "2",
    slug: "winter-music-festival",
    title: "Winter Music Festival",
    shortDescription:
      "Experience three days of incredible live music from top artists across multiple stages.",
    fullDescription:
      "The Winter Music Festival returns bigger than ever! Over 50 artists across 5 stages, featuring genres from EDM to indie rock. Includes camping options, food trucks, art installations, and late-night silent disco. Early bird tickets include exclusive merchandise.",
    date: "January 15-17, 2026",
    time: "12:00 PM - 11:00 PM Daily",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.6422384089037!2d-121.94621952352522!3d38.34033517937984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80853cfc37a5a929%3A0x46eeaca55a2dd1c5!2sMeadowlands%20Park!5e1!3m2!1sen!2smn!4v1767684707533!5m2!1sen!2smn",
    venue: "Meadowlands Park",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    category: "Music",
    featured: true,
  },
  {
    id: "3",
    slug: "tech-innovation-summit",
    title: "Tech Innovation Summit",
    shortDescription:
      "Connect with industry leaders and discover the latest breakthroughs in technology.",
    fullDescription:
      "The premier technology conference of the year featuring keynotes from Fortune 500 CTOs, hands-on workshops, startup pitch competitions, and networking events. Topics include AI, blockchain, quantum computing, and sustainable tech.",
    date: "February 8-10, 2026",
    time: "9:00 AM - 6:00 PM Daily",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253311.54821009596!2d-122.24152714034082!3d37.39701815704403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc9c94dfa50b9%3A0xc1ebf7e60770d2e4!2sSanta%20Clara%20Convention%20Center!5e1!3m2!1sen!2smn!4v1767684782597!5m2!1sen!2smn",
    venue: "Silicon Valley Conference Center",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    category: "Conference",
    featured: false,
  },
  {
    id: "4",
    slug: "spring-food-wine-expo",
    title: "Spring Food & Wine Expo",
    shortDescription:
      "Indulge in culinary delights from renowned chefs and premium wine tastings.",
    fullDescription:
      "A gastronomic adventure featuring 100+ vendors, celebrity chef demonstrations, wine pairing workshops, and exclusive tastings from Michelin-starred restaurants. VIP tickets include private sessions and take-home gift baskets.",
    date: "March 22-23, 2026",
    time: "11:00 AM - 8:00 PM",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.376722872767!2d-79.95029822335336!3d43.0721969898136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c8d90e24ba909%3A0x175d8aabe7a3392c!2sRiverside%20Exhibition%20Centre!5e1!3m2!1sen!2smn!4v1767684821531!5m2!1sen!2smn",
    venue: "Riverside Exhibition Hall",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    category: "Food & Drink",
    featured: true,
  },
  {
    id: "5",
    slug: "art-culture-night",
    title: "Art & Culture Night",
    shortDescription:
      "An evening celebrating contemporary art with live performances and gallery exhibitions.",
    fullDescription:
      "Immerse yourself in creativity with gallery exhibitions from emerging artists, live painting demonstrations, poetry readings, and musical performances. Complimentary wine and appetizers included. Limited to 500 guests for an intimate experience.",
    date: "April 5, 2026",
    time: "6:00 PM - 11:00 PM",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30904945.821686707!2d-112.98668149999996!3d40.779436600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25896f660c26f%3A0x3b2fa4f4b6c6a1fa!2sThe%20Metropolitan%20Museum%20of%20Art!5e1!3m2!1sen!2smn!4v1767684860222!5m2!1sen!2smn",
    venue: "Metropolitan Art Gallery",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80",
    category: "Art",
    featured: false,
  },
  {
    id: "6",
    slug: "summer-beach-party",
    title: "Summer Beach Party",
    shortDescription:
      "The ultimate beach celebration with DJs, water activities, and sunset vibes.",
    fullDescription:
      "Kick off summer at our legendary beach party! Features international DJs, volleyball tournaments, jet ski rides, bonfire sessions, and a stunning sunset ceremony. Beach cabanas and bottle service available for VIP guests.",
    date: "June 21, 2026",
    time: "2:00 PM - 12:00 AM",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78955844.2308974!2d15.842304371988448!3d14.69641618822939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185d2ee0063bcb25%3A0xb8ad949bda830739!2sParadise%20Beach%20Resort!5e1!3m2!1sen!2smn!4v1767684901935!5m2!1sen!2smn",
    venue: "",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    category: "Party",
    featured: false,
  },
];

export const getEventBySlug = (slug: string): Event | undefined => {
  return events.find((event) => event.slug === slug);
};

export const getFeaturedEvents = (): Event[] => {
  return events.filter((event) => event.featured);
};
