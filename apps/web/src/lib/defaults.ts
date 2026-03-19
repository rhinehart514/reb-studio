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
  headline: "Restore Your\nMobility.\nFeel Like You Again.",
  subheadline: "Assisted stretching in Williamsville, NY",
  tagline: "Hands-on, one-on-one stretching sessions designed by a physical therapist. Book your Flexibility Foundation session to get started.",
  ctaText: "Book a Session",
  ctaLink: "https://www.vagaro.com/rohlaxwellness",
  backgroundImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=2400&h=1600&fit=crop&q=80",
};

export const defaultServices: ServicesContent = {
  sectionLabel: "Services",
  headline: "Assisted Stretching Sessions",
  description: "Every new client starts with a Flexibility Foundation session — a 90-minute assessment so we can build a stretch plan around your body. After that, choose the session that fits your needs.",
  services: [
    {
      id: "flexibility-foundation",
      name: "Flexibility Foundation",
      description: "Required for new clients. 90-minute session starting with an in-depth discussion of your medical history, injuries, medications, sleep, and stress levels — followed by a full-body hands-on assisted stretching assessment. You'll leave with personalized recommendations for future sessions.",
      duration: "90 min",
      price: "85",
      featured: true,
      who_its_for: "New clients or anyone who hasn't visited in over a year",
      booking_link: "https://www.vagaro.com/rohlaxwellness",
      comingSoon: false,
    },
    {
      id: "prenatal-foundation",
      name: "Prenatal Flexibility Foundation",
      description: "Required for new pregnant clients. 90-minute session with pregnancy-specific considerations, supportive positioning aides for comfort and safety, and a full-body stretching assessment tailored to your needs during pregnancy.",
      duration: "90 min",
      price: "85",
      featured: false,
      who_its_for: "Pregnant clients — new or returning after 1+ year",
      booking_link: "https://www.vagaro.com/rohlaxwellness",
      comingSoon: false,
    },
    {
      id: "stretch-360",
      name: "Stretch 360",
      description: "Full-body assisted stretching targeting all major muscle groups. You'll move between back and stomach positioning as we work through each area. Finishes with a heating pad and deep-tissue massage gun for relaxation.",
      duration: "60 min",
      price: "60",
      featured: true,
      who_its_for: "Returning clients who want a complete full-body session",
      booking_link: "https://www.vagaro.com/rohlaxwellness",
      comingSoon: false,
    },
    {
      id: "spinal-sequence",
      name: "Spinal Sequence",
      description: "Focused on the neck, mid-back, and low back. Perfect for anyone who spends long hours at a desk or dealing with back stiffness. Finishes with heating pad and massage gun.",
      duration: "60 min",
      price: "60",
      featured: false,
      who_its_for: "Desk workers and anyone with back tension",
      booking_link: "https://www.vagaro.com/rohlaxwellness",
      comingSoon: false,
    },
    {
      id: "upper-body",
      name: "Upper Body Focused Stretch",
      description: "Targets the neck, mid-back, shoulders, shoulder blades, forearms, wrists, and hands. Finishes with heating pad and massage gun for enhanced relaxation.",
      duration: "60 min",
      price: "60",
      featured: false,
      who_its_for: "Anyone carrying tension in the shoulders, neck, or arms",
      booking_link: "https://www.vagaro.com/rohlaxwellness",
      comingSoon: false,
    },
    {
      id: "lower-body",
      name: "Lower Body Focused Stretch",
      description: "Targets the low back, hips, knees, and ankles. Finishes with heating pad and massage gun for enhanced relaxation.",
      duration: "60 min",
      price: "60",
      featured: false,
      who_its_for: "Runners, athletes, or anyone with hip and knee tightness",
      booking_link: "https://www.vagaro.com/rohlaxwellness",
      comingSoon: false,
    },
    {
      id: "prenatal-stretch",
      name: "Prenatal Stretch",
      description: "Fully customized 60-minute session designed around mom's needs that day. Safe, pregnancy-supported techniques with positioning aides for comfort. Heating pad and massage gun use based on your preference.",
      duration: "60 min",
      price: "60",
      featured: false,
      who_its_for: "Pregnant clients (must complete Prenatal Foundation first)",
      booking_link: "https://www.vagaro.com/rohlaxwellness",
      comingSoon: false,
    },
  ],
};

export const defaultStory: StoryContent = {
  sectionLabel: "About",
  headline: "Meet Chelsea",
  accentText: "Physical therapist turned stretch specialist",
  statement: "After a decade in healthcare, I was burned out. I started Rohlax Wellness to help people feel better in a way that actually felt good — no clinical settings, no rush, just real hands-on care.",
  paragraphs: [
    "With a background in physical therapy, I bring a clinical understanding of the body to every session. I know where tension hides, why it's there, and how to release it safely.",
    "Rohlax Wellness is intentionally small. One-on-one sessions, by appointment only, in a calm private studio inside Bel Viso Skin Studio. This isn't a franchise — it's personal.",
  ],
  stats: [
    { value: "10+", label: "Years in Healthcare" },
    { value: "5.0", label: "Vagaro Rating" },
  ],
  quote: "You shouldn't have to be in pain to prioritize your body.",
  quoteAttribution: "Chelsea Rohl, PT",
  imageUrl: "",
  secondaryImageUrl: "",
};

export const defaultTestimonials: TestimonialsContent = {
  sectionLabel: "Testimonials",
  headline: "What Clients Say",
  testimonials: [],
};

export const defaultEvents: EventsContent = {
  sectionLabel: "Community",
  headline: "Upcoming Events",
  events: [
    {
      id: "mindful-meetup",
      title: "Mindful Meet-Up",
      date: "2026-04-15",
      time: "12:00 PM",
      location: "Rohlax Wellness — 7158 Transit Rd, Williamsville",
      description: "A gathering for small business owners who value connection, collaboration, and community. 60 minutes of meaningful conversation about the challenges and triumphs of entrepreneurship.",
      hosted_by: "owner",
      external_link: "https://www.vagaro.com/rohlaxwellness",
    },
  ],
};

export const defaultProviders: ProvidersContent = {
  sectionLabel: "Partners",
  headline: "Our Network",
  description: "Local wellness professionals we trust and recommend.",
  providers: [],
};

export const defaultContact: ContactContent = {
  email: "rohlaxwellness@gmail.com",
  phone: "",
  address: "7158 Transit Rd, Williamsville, NY 14221 (inside Bel Viso Skin Studio, 2nd floor)",
  hours: "Tuesday & Thursday: 12–6 PM\nWednesday & Friday: 10 AM–4 PM\nSaturday, Sunday, Monday: Closed",
  locationTitle: "Find Us",
  locationDescription: "We're on the second floor of Bel Viso Skin Studio on Transit Road. Parking is available behind the building. Look for the Bel Viso entrance and head upstairs.",
  instagramUrl: "https://www.instagram.com/rohlaxwellness",
  facebookUrl: "",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2920.0!2d-78.7!3d42.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU3JzM2LjAiTiA3OMKwNDInMDAuMCJX!5e0!3m2!1sen!2sus!4v1",
};

export const defaultSettings: SiteSettings = {
  siteName: "Rohlax Wellness",
  siteTagline: "Assisted Stretching in Williamsville, NY",
  siteDescription: "Professional assisted stretching sessions designed by a physical therapist. Restore mobility, reduce tension, feel like yourself again. Located inside Bel Viso Skin Studio, Williamsville NY.",
  footerTagline: "Restore. Stretch. Feel Better.",
  copyrightText: "Rohlax Wellness",
  bookingUrl: "https://www.vagaro.com/rohlaxwellness",
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
