// Shared 2027 events data (Ellevation Hub + Ms. Ellevation + joint).
// Dates are PROPOSED, not confirmed bookings.
// Do not add venue, ticket price, event time or registration links until supplied and approved.

export const EVENT_CATEGORIES = [
  "All Events",
  "Community",
  "Children & Youth",
  "Business & Networking",
  "Workshops & Leadership",
  "Corporate & Professional",
] as const;
export type EventCategory = typeof EVENT_CATEGORIES[number];

export type EventItem = {
  id: string;         // unique per event/session (Village Exchange runs twice)
  date: string;       // proposed date, not a confirmed booking
  brand: string;
  category: Exclude<EventCategory, "All Events">; // one category per event
  title: string;
  desc: string;

  // ── Optional detail-page fields (fill only when client approves) ──
  time?: string;          // e.g. "8:30 AM – 6:30 PM"
  venue?: string;         // e.g. "Crown Perth"
  address?: string;       // e.g. "Burswood, WA"
  priceFrom?: string;     // e.g. "From $53.56"
  image?: string;         // per-event image (import path)
  overview?: string[];    // paragraphs
  highlights?: string[];  // bullet points ("What to expect")
  whoFor?: string[];      // bullet points ("Who it's for")
};

export const EVENT_CTA = "Register your interest now";

export const EVENTS: EventItem[] = [
  {
    id: "village-exchange-2027-01-15",
    date: "Fri 15 Jan 2027",
    brand: "Ellevation Hub & Ms. Ellevation",
    category: "Business & Networking",
    title: "Ellevation Connect: The Village Exchange",
    desc: "Connect with entrepreneurs, professionals and community changemakers at The Village Exchange. Build meaningful relationships, share ideas and discover opportunities for collaboration and partnerships.",
  },
  {
    // TODO: confirm booking details (source also lists a duplicate backup date)
    id: "little-hearts-2027-01-30",
    date: "Sat 30 Jan 2027",
    brand: "Ellevation Hub",
    category: "Children & Youth",
    title: "Little Hearts Celebration",
    desc: "A celebration designed to help children grow in confidence, communication, friendship and belonging. Come together to encourage young leaders and celebrate culture and community.",
  },
  {
    id: "i-am-wow-2027-03-27",
    date: "Sat 27 Mar 2027",
    brand: "Ms. Ellevation",
    category: "Workshops & Leadership",
    title: "I Am WOW",
    desc: "A Ms. Ellevation experience empowering women to step forward with confidence, grow their leadership, increase their visibility and make a meaningful impact.",
  },
{
  id: "men-who-build-2027-04-17",
  date: "Sat 17 Apr 2027",
  brand: "Ellevation Hub",
  category: "Workshops & Leadership",
  title: "Men Who Build: Building Wealth & Securing the Future",
  desc: "Building strong men. Creating wealth. Securing futures. An empowering experience for men to explore financial growth, wealth creation, family responsibility and lasting legacy. For men at every stage of life, including fathers, professionals, entrepreneurs and aspiring wealth builders.",

  // ── Detail page fields ──
  time: "9:00 AM – 3:00 PM",
  venue: "Venue to be announced",
  overview: [
    "Paragraph 1...",
    "Paragraph 2...",
  ],
  highlights: [
    "Wealth creation basics",
    "Family responsibility",
    "Legacy planning",
  ],
  whoFor: [
    "Fathers",
    "Professionals",
    "Entrepreneurs",
  ],
},
  {
    // TODO: confirm date. Calendar says Fri 14 May; "Clashes to fix" mentions Sat 15 May / Sat 22 May.
    id: "her-presence-2027-05-14",
    date: "Fri 14 May 2027",
    brand: "Ms. Ellevation",
    category: "Workshops & Leadership",
    title: "Her Presence",
    desc: "Learn to show up with confidence, communicate clearly and make your presence count. This experience supports women to strengthen character, presentation skills and financial confidence.",
  },
  {
    id: "confidence-to-brand-2027-05-28",
    date: "Fri 28 – Sat 29 May 2027",
    brand: "Ellevation Hub",
    category: "Corporate & Professional",
    title: "Confidence to Brand",
    desc: "A small-group experience exploring personal branding and visibility. Build confidence in how you present yourself and your value.",
  },
  {
    id: "village-exchange-2027-06-18",
    date: "Fri 18 Jun 2027",
    brand: "Ellevation Hub",
    category: "Business & Networking",
    title: "Ellevation Connect: The Village Exchange",
    desc: "Meet people, exchange ideas and create new connections at The Village Exchange. Discover partnerships, community initiatives and opportunities to work together.",
  },
  {
    id: "character-to-career-2027-07-24",
    date: "Sat 24 Jul 2027",
    brand: "Ellevation Career Development Ecosystem",
    category: "Workshops & Leadership",
    title: "Access. Navigate. Lead. Stage 1: Character to Career",
    desc: "Begin your Character to Career journey. Develop confidence, communication, professional presence, leadership and readiness for employment, education, business or community opportunities.",
  },
  {
    id: "start-build-grow-2027-08-14",
    date: "Sat 14 Aug 2027",
    brand: "Ellevation Hub",
    category: "Business & Networking", // one category only
    title: "Start • Build • Grow",
    desc: "Thinking of starting a business or ready to strengthen one? Explore practical foundations for starting, building and growing a sustainable business.",
  },
  {
    id: "confidence-to-brand-visibility-2027-09-10",
    date: "Fri 10 – Sat 11 Sep 2027",
    brand: "Ellevation Hub",
    category: "Corporate & Professional",
    title: "Confidence to Brand: Visibility",
    desc: "A two-day experience focused on personal branding, visibility and showing up with confidence. Strengthen how you present your value and connect with opportunities to be seen.",
  },
  {
    id: "i-am-wow-her-voice-night-2027-10-16",
    date: "Sat 16 Oct 2027",
    brand: "Ms. Ellevation",
    category: "Community",
    title: "I Am WOW: Her Voice Night",
    desc: "Celebrate the voices, journeys and achievements of women at the annual I Am WOW finale. An evening of stories, recognition, connection and shared growth.",
  },
  {
    // TODO: confirm format (source says "two sessions" but gives no second date or times)
    id: "family-legacy-2027-11-06",
    date: "Sat 6 Nov 2027",
    brand: "Ellevation Hub",
    category: "Community",
    title: "Family Legacy",
    desc: "Explore how families can preserve their stories, pass on values and prepare future generations. Conversations include culture, knowledge, leadership, family business succession and legacy.",
  },
  {
    id: "one-community-celebration-2027-11-20",
    date: "Sat 20 Nov 2027",
    brand: "Ellevation Hub & Ms. Ellevation",
    category: "Community",
    title: "One Community Celebration",
    desc: "One community, endless pathways. Join us to celebrate culture, belonging, volunteers, partners and the people making a difference across the Ellevation ecosystem.",
  },
];