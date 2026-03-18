import type {
  HeroContent,
  ServicesContent,
  StoryContent,
  TestimonialsContent,
  EventsContent,
  ProvidersContent,
  ContactContent,
  SiteSettings,
  ContentMap,
} from "./types";

export const defaultHero: HeroContent = {
  headline: "Your Business.\nOnline.\nWorking for You.",
  subheadline: "A website that never sleeps",
  tagline: "AI-powered websites for local businesses. Connect your Square account and we build the rest.",
  ctaText: "Get Started",
  ctaLink: "/get-started",
  backgroundImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&h=1600&fit=crop&q=80",
};

export const defaultServices: ServicesContent = {
  sectionLabel: "Services",
  headline: "What We Offer",
  description: "Add your services here. Connect Square to auto-import your catalog.",
  services: [
    {
      id: "service-1",
      name: "Example Service",
      description: "Describe what this service includes and who it's for.",
      duration: "60 min",
      price: "50",
      featured: true,
      who_its_for: "Your ideal customer",
      booking_link: "",
      comingSoon: false,
    },
  ],
};

export const defaultStory: StoryContent = {
  sectionLabel: "Our Story",
  headline: "About Us",
  accentText: "Local business, personal touch",
  statement: "Tell your customers why you started this business and what makes you different.",
  paragraphs: [
    "Share your story here. Customers connect with the people behind the business.",
  ],
  stats: [
    { value: "5+", label: "Years in Business" },
    { value: "1000+", label: "Happy Customers" },
  ],
  quote: "Your tagline or motto goes here.",
  quoteAttribution: "Business Owner",
  imageUrl: "",
  secondaryImageUrl: "",
};

export const defaultTestimonials: TestimonialsContent = {
  sectionLabel: "Testimonials",
  headline: "What Customers Say",
  testimonials: [
    {
      id: "t1",
      quote: "Add your customer reviews here. Real testimonials build trust.",
      author: "Happy Customer",
      location: "",
    },
  ],
};

export const defaultEvents: EventsContent = {
  sectionLabel: "Events",
  headline: "Upcoming Events",
  events: [],
};

export const defaultProviders: ProvidersContent = {
  sectionLabel: "Partners",
  headline: "Our Network",
  description: "Businesses and partners we recommend.",
  providers: [],
};

export const defaultContact: ContactContent = {
  email: "",
  phone: "",
  address: "",
  hours: "",
  locationTitle: "Visit Us",
  locationDescription: "",
  instagramUrl: "",
  facebookUrl: "",
  googleMapsUrl: "",
};

export const defaultSettings: SiteSettings = {
  siteName: "My Business",
  siteTagline: "Your tagline here",
  siteDescription: "A brief description of your business for search engines.",
  footerTagline: "Powered by REB",
  copyrightText: "My Business",
  bookingUrl: "",
};

export const defaults: ContentMap = {
  hero: defaultHero,
  services: defaultServices,
  story: defaultStory,
  testimonials: defaultTestimonials,
  events: defaultEvents,
  providers: defaultProviders,
  contact: defaultContact,
  settings: defaultSettings,
};
