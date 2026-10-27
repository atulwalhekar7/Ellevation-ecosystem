import { useState, useEffect, useRef, type CSSProperties } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import banner6 from "../assets/hub-home.jpeg";
import banner2 from "../assets/hubimg1.jpeg";
import hubLogoLight from "../assets/hub-logo.png";
import hubLogoDark from "../assets/Ellevation-darkmode-logo.png";
import emailjs from "@emailjs/browser";
import { submitRegistration } from "../Emailjs/submitRegistration";


/* ── Animation Helpers (used by the Home page, Connect form + About page) ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}
function fade(inView: boolean, delay = 0): CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "about" | "membership" | "directory" | "programs" | "opportunities" | "events" | "impact" | "connect" | "register";
// `nav` accepts an optional param (used to pre-select a program on the Register page)
type NavFn = (p: Page, param?: string) => void;
type HubTier = "BELONG" | "GROW" | "INFLUENCE" | "PARTNER" | "LEGACY";
type Theme = "light" | "dark";

// ─── Constants ───────────────────────────────────────────────────────────────
const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Membership", page: "membership" },
  { label: "Directory", page: "directory" },
  { label: "Programs", page: "programs" },
  { label: "Opportunities", page: "opportunities" },
  { label: "Events", page: "events" },
  { label: "Impact", page: "impact" },
  { label: "Connect", page: "connect" },
];

// ─── SEO: per-page <title> and meta description ─────────────────────────────
const PAGE_META: Record<Page, { title: string; description: string }> = {
 home: {
  title: "Ellevation Hub | Every Pathway Into Opportunity",
  description:
    "Connecting CALD communities, professionals, entrepreneurs, businesses, organisations, and collaborators through opportunity, connection, and impact.",
},
  about: {
  title: "About the Hub | Ellevation Hub",
  description:
    "Ellevation Hub is a purpose-led social enterprise and community-led ecosystem creating pathways to confidence, connection, leadership, visibility, opportunity, and community impact.",
},
  membership: {
    title: "Membership Program | Ellevation Hub",
    description:
      "Belong, Grow, Influence, Partner — explore Ellevation Hub's four membership packages, compare benefits and submit an expression of interest to join.",
  },
  directory: {
    title: "Business Directory | Ellevation Hub",
    description:
      "Discover verified businesses built by our community, browse listings by category, or add your own business to the Ellevation Hub directory.",
  },
 programs: {
  title: "Our Programs | Ellevation Hub",
  description:
    "Development pathways for growth, leadership, and opportunity — children and youth, wellbeing and leadership, and business and enterprise programs.",
},
  opportunities: {
    title: "Opportunity Board | Ellevation Hub",
    description:
      "Browse jobs, collaborations, grants, professional development, and member-only openings connecting Hub members to real opportunity.",
  },
  events: {
    title: "Upcoming Events | Ellevation Hub",
    description:
      "Community celebrations, sport and youth activities, business networking, workshops, and corporate events — all in one Perth events calendar.",
  },
  impact: {
  title: "Our Impact | Ellevation Hub",
  description:
    "Real outcomes across every group we support — children and youth, CALD community outcomes, business growth and visibility, and stories from our members.",
},
  connect: {
    title: "Connect With Us | Ellevation Hub",
    description:
      "Reach out to Ellevation Hub for partnerships, programmatic guidance, or community connections — submit an enquiry through our unified request portal.",
  },
  register: {
    title: "Register for a Program | Ellevation Hub",
    description:
      "Register for the next Ellevation Hub program or request support, such as business coaching, mentoring or leadership guidance.",
  },
};

/* ── Home page content (client-final) ── */
const HOME_OPPORTUNITIES: { title: string; desc: string; page: Page; link?: string }[] = [
  { title: "Directory",     desc: "Find businesses, professionals, services, organisations, and community leaders.", page: "directory",     link: "Read More →" },
  { title: "Opportunities", desc: "Access jobs, grants, partnerships, collaborations, and pathways for growth.",     page: "opportunities", link: "Read More →" },
  { title: "Events",        desc: "Connect through networking, learning, and community experiences.",                page: "events",        link: "Read More →" },
  { title: "Programs",      desc: "Wellbeing, mentoring, leadership development, business support, and community learning designed to help individuals, entrepreneurs, professionals, and communities grow, connect, and create impact.", page: "programs", link: "Read More →" },
];

const HOME_FOR_EVERYONE = [
  { title: "Individuals & Families",        desc: "Find connection, opportunities, support, and pathways for growth." },
  { title: "Professionals & Entrepreneurs", desc: "Expand your network, increase visibility, and access new opportunities." },
  { title: "Businesses",                    desc: "Build meaningful partnerships and strengthen community impact." },
  { title: "Community Organisations",       desc: "Collaborate, connect, and create greater collective impact." },
  { title: "Supporters & Partners",         desc: "Help create opportunities that strengthen communities and transform lives." },
];

// Hub on the LEFT, Ms Ellevation on the RIGHT — always
const HOME_ECOSYSTEM: { eyebrow: string; title: string; desc: string; route: string }[] = [
  {
    eyebrow: "Building Opportunity",
    title: "Ellevation Hub",
    desc: "Creating pathways, partnerships, opportunities, and connections for individuals, families, professionals, businesses, and communities.",
    route: "/hub",
  },
  {
    eyebrow: "Building the Woman",
    title: "Ms. Ellevation",
    desc: "Supporting women and young women to discover their voice, strengthen identity, build confidence, and lead with purpose and impact.",
    route: "/ms-ellevation",
  },
];

/* ── About page content (client-final) ── */
const ABOUT_ECOSYSTEM_APPROACH = [
  { title: "Community Development", desc: "Creating stronger communities through connection, collaboration, participation, and grassroots engagement.", icon: "✿" },
  { title: "Leadership Development", desc: "Supporting emerging and established leaders to create positive impact in their communities, workplaces, and industries.", icon: "◑" },
  { title: "Youth Development", desc: "Empowering young people through mentoring, pathways, leadership opportunities, and personal growth.", icon: "✦" },
  { title: "Business Support", desc: "Providing visibility, collaboration, mentoring, enterprise development, and opportunities for sustainable growth.", icon: "◈" },
  { title: "Strategic Partnerships", desc: "Connecting organisations, businesses, professionals, and community leaders to create shared impact and lasting opportunities.", icon: "❖" },
];

const ABOUT_WHO_WE_SUPPORT = [
  { title: "Community", desc: "Supporting grassroots networks, local initiatives, and community-driven projects that strengthen connection, participation, and collective impact.", icon: "✿" },
  { title: "Business", desc: "Supporting entrepreneurs, professionals, business owners, and enterprises seeking visibility, growth, collaboration, and opportunity.", icon: "◈" },
  { title: "Youth", desc: "Creating pathways for young people through mentoring, leadership development, education, and opportunity.", icon: "✦" },
  { title: "Men", desc: "Supporting wellbeing, personal growth, leadership, and positive community participation.", icon: "◎" },
  { title: "Women & Young Women", desc: "Creating opportunities for identity, voice, confidence, leadership, mentoring, visibility, and meaningful participation.", icon: "❋" },
  { title: "Community Organisations", desc: "Supporting organisations and community groups through partnerships, collaboration, visibility, and shared impact.", icon: "⬡" },
];

const ABOUT_ACCESS: { title: string; desc: string; page: Page }[] = [
  { title: "Directory", desc: "Discover businesses, professionals, services, organisations, and community leaders within the Ellevation ecosystem.", page: "directory" },
  { title: "Programs", desc: "Access wellbeing initiatives, mentoring, leadership development, business support, and community learning designed to help people build confidence, strengthen leadership, and expand opportunities.", page: "programs" },
  { title: "Opportunities", desc: "Explore jobs, grants, partnerships, collaborations, and pathways for personal, professional, and business growth.", page: "opportunities" },
  { title: "Events", desc: "Connect through networking, learning, leadership, and community experiences designed to strengthen relationships and create opportunity.", page: "events" },
  { title: "Impact", desc: "Support and contribute to initiatives that strengthen communities, expand opportunities, and create lasting social impact.", page: "impact" },
];
const ABOUT_COMMITMENTS = [
  "We believe diversity is a strength.",
  "We believe lived experience matters.",
  "We believe leadership exists in every community.",
  "We believe collaboration creates greater impact.",
  "We believe opportunity should be accessible to everyone.",
  "We believe strong communities create stronger futures.",
];

// Hub first, then Ms Ellevation, then Together
const ABOUT_ECOSYSTEM_CONNECTION = [
  { title: "Ellevation Hub", desc: "Creating pathways to confidence, connection, leadership, visibility, opportunity, and community impact through partnerships, programs, business support, and community initiatives." },
  { title: "Ms. Ellevation", desc: "Supporting women and young women to discover their voice, strengthen their identity, build confidence, and lead with purpose and impact." },
  { title: "Together", desc: "Through one connected ecosystem, individuals, families, businesses, organisations, and communities can access the support, networks, opportunities, and pathways they need to grow, connect, lead, and create lasting impact." },
];

/* ── Membership program (Belong → Grow → Influence → Partner) ── */
const HUB_TIERS: HubTier[] = ["BELONG", "GROW", "INFLUENCE", "PARTNER", "LEGACY"];
type TierMeta = {
  label: string;      // short name (Belong)
  name: string;       // package name (Community Member)
  annual: number;
  monthly: number;
  purpose: string;
  popular: string[];
  quote: string;
  included: string[];
  outcome: string;
  color: string;
};

const HUB_TIER_META: Record<HubTier, TierMeta> = {
  BELONG: {
    label: "Belong",
    name: "Community Member",
    annual: 250,
    monthly: 25,
    purpose: "Community",
    popular: ["Individuals", "Community members", "Students", "Job seekers", "Volunteers", "New migrants", "Emerging leaders"],
    quote: "I want to belong to a supportive community.",
    included: [
      "Community Hub access",
      "Member networking events",
      "Member newsletter",
      "Early access to opportunities",
      "Event discounts",
      "Collaboration opportunities",
    ],
    outcome: "Belong to a supportive community.",
    color: "#8a5a97",
  },
  GROW: {
    label: "Grow",
    name: "Growth Member",
    annual: 550,
    monthly: 55,
    purpose: "Opportunity & Growth",
    popular: ["Professionals", "Entrepreneurs", "Freelancers", "Consultants", "Small business owners", "Creatives", "Start-ups"],
    quote: "I want to grow my business, career or professional network.",
    included: [
      "Everything in Community",
      "Directory listing",
      "2 business listings annually",
      "2 job listings annually",
      "2 internship listings annually",
      "2 event listings annually",
      "Business promotion opportunities",
      "One business support session",
      "One complimentary networking event ticket",
    ],
    outcome: "Increase visibility and grow opportunities.",
    color: "#6b4fc0",
  },
    INFLUENCE: {
    label: "Influence",
    name: "Impact Member",
    annual: 990,
    monthly: 89,
    purpose: "Visibility & Influence",
    popular: [
      "Established businesses",
      "Community leaders",
      "NDIS and community-service providers",
      "Social enterprises and not-for-profits",
      "Coaches, consultants and established professionals",
    ],
    quote: "I want visibility, credibility and influence.",
    included: [
      "Everything in Growth",
      "Featured directory listing",
      "Unlimited event listings",
      "6 job listings annually",
      "6 internship listings annually",
      "Business or Community Spotlight feature",
      "Referral opportunities (7% first referral invoice)",
      "Opportunity to host workshops and events",
      "Community Champion Recognition",
      "Two complimentary event tickets",
      "Exclusive Impact Network Session (Quarterly)",
      "20% discount on Ms Ellevation Membership",
    ],
    outcome: "Build influence, credibility and community presence.",
    color: "#D7B264",
  },
  PARTNER: {
    label: "Partner",
    name: "Ecosystem Partner",
    annual: 1500,
    monthly: 135,
    purpose: "Partnership & Impact",
    popular: [
      "Sponsors and strategic collaborators",
      "Community organisations and peak bodies",
      "Local government",
      "Universities and training providers",
      "Medium to large businesses",
      "Organisations seeking deeper ecosystem collaboration",
    ],
    quote: "I want strategic partnerships and community impact.",
    included: [
      "Everything in Impact",
      "Referral opportunities (5% first referral invoice)",
      "Featured Partner Recognition",
      "Unlimited priority listings",
      "Guest speaking opportunities",
      "VIP event access",
      "Sponsor recognition at selected events",
      "Strategic partnership opportunities",
      "Advisory and leadership opportunities",
      "Five complimentary event passes",
      "Quarterly Ecosystem Leadership Roundtables",
      "Complimentary Ms Ellevation Membership",
      "Visibility across both Ellevation Hub and Ms Ellevation",
    ],
    outcome: "Drive partnerships, leadership and community impact.",
    color: "#c0508a",
  },
  LEGACY: {
    label: "Legacy Partner",
    name: "Ecosystem Leader",
    annual: 2500,
    monthly: 230,
    purpose: "Ecosystem Leadership",
    popular: [
      "Established and high-impact businesses",
      "Major strategic partners and sponsors",
      "Industry and community leaders",
      "Organisations wanting premium visibility and referral priority",
      "Businesses seeking long-term ecosystem collaboration",
    ],
    quote: "I want to lead, influence and help shape lasting ecosystem impact.",
    included: [
      "Everything in Partner",
      "Priority Business Service List",
      "Premium priority directory visibility",
      "Referral opportunities (3% first referral invoice)",
      "Priority referral consideration",
      "Premium featured partner recognition",
      "Priority strategic collaboration opportunities",
      "Priority introductions where relevant",
      "Executive leadership and ecosystem conversations",
      "Legacy Partner recognition",
    ],
    outcome: "Lead, influence and help shape long-term opportunities and community impact across the ecosystem.",
    color: "#3b2a6b",
  },
};

// "—" = not included, "✓" = included (rendered as a check icon). Anything else is shown as text.
const MEMBERSHIP_COMPARISON: { label: string; values: [string, string, string, string, string] }[] = [
  { label: "Annual Fee",             values: ["$250", "$550", "$990", "$1,500", "$2,500"] },
  { label: "Monthly Fee",            values: ["$25", "$55", "$89", "$135", "$230"] },
  { label: "Purpose",                values: ["Community", "Opportunity & Growth", "Visibility & Influence", "Partnership & Impact", "Ecosystem Leadership"] },
  { label: "Popular With",           values: ["Individuals", "Professionals & Small Business", "Established Leaders & Organisations", "Sponsors & Strategic Partners", "Strategic Leaders & Major Partners"] },
  { label: "Directory Listing",      values: ["—", "Standard", "Featured", "Priority", "Premium Priority"] },
  { label: "Business Listings",      values: ["—", "2 per year", "Enhanced", "Unlimited", "Unlimited Priority"] },
  { label: "Job Listings",           values: ["—", "2 per year", "6 per year", "Unlimited", "Unlimited Priority"] },
  { label: "Internship Listings",    values: ["—", "2 per year", "6 per year", "Unlimited", "Unlimited Priority"] },
  { label: "Event Listings",         values: ["—", "2 per year", "Unlimited", "Unlimited Priority", "Premium Priority"] },
  { label: "Business Support",       values: ["—", "1 Session", "Included", "Priority", "Priority Plus"] },
  { label: "Referral Opportunities", values: ["—", "—", "✓", "Priority", "Priority Plus"] },
  { label: "Spotlight Features",     values: ["—", "—", "✓", "Priority", "Premium"] },
  { label: "Exclusive Networking",   values: ["Community Events", "Networking Ticket", "Quarterly Impact Network", "Leadership Roundtables", "Executive Leadership Sessions"] },
  { label: "Ms Ellevation Benefits", values: ["—", "—", "20% Membership Discount", "Complimentary Membership", "Complimentary Premium Access"] },
  { label: "Priority Business Service List", values: ["—", "—", "—", "—", "✓"] },
  { label: "Community Impact Contribution",  values: ["—", "—", "7% first referral invoice only", "5% first referral invoice only", "3% first referral invoice only"] },
  { label: "Outcome",                values: ["Belong", "Grow", "Influence", "Partner", "Lead"] },
];


const IMPACT_CONTRIBUTION_RATES = [
  { tier: "Influence",      rate: "7%", applies: "First paid invoice arising from a successful Ellevation Hub referral only" },
  { tier: "Partner",        rate: "5%", applies: "First paid invoice arising from a successful Ellevation Hub referral only" },
  { tier: "Legacy Partner", rate: "3%", applies: "First paid invoice arising from a successful Ellevation Hub referral only" },
];

const IMPACT_CONTRIBUTION_MEMBER = [
  "No contribution is payable unless an Ellevation Hub referral becomes paid business.",
  "The percentage applies to the first referral-generated invoice only.",
  "It is not taken from membership fees or unrelated business income.",
  "Future invoices from the referred client are not subject to the contribution.",
];

const IMPACT_CONTRIBUTION_ECOSYSTEM = [
  "A successful referral contributes to future community opportunities.",
  "Funds can support emerging businesses, entrepreneurs and community initiatives.",
  "Members can grow their businesses while contributing to a cycle of opportunity.",
  "The model reflects Ellevation Hub's social-enterprise purpose: growth and community impact working together.",
];
// Rows shown in bold/accent in the comparison table
const MEMBERSHIP_STRONG_ROWS = new Set(["Annual Fee", "Monthly Fee", "Purpose", "Outcome"]);

const DIRECTORY_CATEGORIES = [
  { title: "Retail & E-commerce",     count: "120+ listings", icon: "◈" },
  { title: "Consulting & Coaching",   count: "95+ listings",  icon: "✦" },
  { title: "Creative & Design",       count: "80+ listings",  icon: "✿" },
  { title: "Health & Wellness",       count: "65+ listings",  icon: "❖" },
  { title: "Technology",              count: "50+ listings",  icon: "◎" },
  { title: "Education & Training",    count: "40+ listings",  icon: "☖" },
];

const PROGRAM_PATHWAYS: { title: string; desc?: string; focus?: string[]; tag?: string; icon: string }[] = [
  {
    title: "Children & Youth",
    desc: "Building confidence, skills, leadership, and future opportunities for children and young people.",
    focus: ["Mentoring & Development", "Leadership & Life Skills", "Confidence Building", "Future Pathways"],
    icon: "✦",
  },
  {
    title: "Wellbeing & Leadership",
    desc: "Supporting individuals to strengthen wellbeing, build confidence, develop leadership capabilities, and create positive impact.",
    focus: ["Wellbeing & Personal Growth", "Confidence & Resilience", "Leadership Development", "Community Leadership", "Personal & Professional Growth"],
    icon: "◑",
  },
  {
    title: "Business & Enterprise",
    desc: "Supporting entrepreneurs, professionals, and businesses through visibility, mentoring, networking, and growth opportunities.",
    focus: ["Business Support", "Business Growth", "Networking Opportunities", "Mentoring & Guidance", "Visibility & Promotion"],
    icon: "◈",
  },
];

const PROGRAMS_WHO_WE_SUPPORT = [
  "Children & Families", "Young People", "Women & Young Women", "Men",
  "Entrepreneurs", "Professionals", "Businesses", "Community Organisations", "Partners & Collaborators",
];

const PROGRAMS_PARTNERS = [
  "Community Organisations", "Businesses & Industry", "Educational Institutions",
  "Government Agencies", "Sponsors & Supporters", "Community Leaders",
];

// Hub on the LEFT, Ms Ellevation on the RIGHT — always
const PROGRAMS_ECOSYSTEM = [
  { eyebrow: "Building Opportunity", title: "Ellevation Hub",  line: "Confidence. Connection. Leadership. Visibility. Opportunity. Community Impact." },
  { eyebrow: "Building the Woman",   title: "Ms. Ellevation",  line: "Identity. Voice. Confidence. Leadership. Wellbeing. Community." },
];

/* ── Opportunity "type" overview cards (compact) ── */
const OPPORTUNITY_TYPES = [
  { title: "Jobs & Work",               desc: "Curated roles from partner organizations and community businesses.",           icon: "◈" },
  { title: "Collaborations",            desc: "Project-based partnerships between members, businesses, and organizations.",   icon: "✿" },
  { title: "Professional Development",  desc: "Workshops, certifications, and skill-building sessions to sharpen your edge.", icon: "◑" },
  { title: "Referrals & Connections",   desc: "Warm introductions across our verified professional network.",                 icon: "✦" },
  { title: "Speaking & Visibility",     desc: "Panels, features, and media opportunities to raise your profile.",             icon: "◎" },
  { title: "Business Promotion",        desc: "Showcase your business through spotlights, cross-promotion and community exposure.", icon: "✺" },
  { title: "Grants & Funding",          desc: "Funding pathways for community initiatives and growing businesses.",           icon: "❖" },
  { title: "Member-Only Opportunities", desc: "Early access and exclusive openings shared first with Hub members.",           icon: "☖" },
];

/* ── Live "Current Openings" board — filterable by category ── */
const OPPORTUNITY_CATEGORIES = [
  "All Openings",
  "Jobs & Work",
  "Collaborations",
  "Professional Development",
  "Grants & Funding",
  "Speaking & Visibility",
  "Business Promotion",
] as const;
type OpportunityCategory = typeof OPPORTUNITY_CATEGORIES[number];

type OpportunityListing = {
  title: string;
  org: string;
  category: Exclude<OpportunityCategory, "All Openings">;
  type: string;
  location: string;
  deadline: string;
  desc: string;
  applyUrl: string;
};

// Demo listings only — final Hub opportunity board to be confirmed by Hannah.
const OPPORTUNITY_LISTINGS: OpportunityListing[] = [
  { title: "Community Engagement Coordinator", org: "Ellevation Hub", category: "Jobs & Work", type: "Part-time", location: "Perth, WA", deadline: "Rolling", desc: "Coordinate community events and directory partnerships across Perth's CALD communities.", applyUrl: "#" },
  { title: "Junior Graphic Designer", org: "Partner Business — Creative Studio", category: "Jobs & Work", type: "Contract", location: "Remote / Perth", deadline: "15 Sep 2025", desc: "Support brand and social content for a directory member's growing creative studio.", applyUrl: "#" },
  { title: "Youth Mentorship Co-Facilitator", org: "Ellevation Hub", category: "Collaborations", type: "Volunteer", location: "Joondalup, WA", deadline: "Rolling", desc: "Partner with our Youth Development program to co-facilitate mentorship circles.", applyUrl: "#" },
  { title: "Directory Cross-Promotion Partnership", org: "Open Call", category: "Collaborations", type: "Partnership", location: "Perth, WA", deadline: "30 Sep 2025", desc: "Two or more directory businesses team up on a joint offer or community activation.", applyUrl: "#" },
  { title: "Leadership & Confidence Workshop Series", org: "Ellevation Hub", category: "Professional Development", type: "Workshop", location: "Perth CBD, WA", deadline: "Next intake: Oct 2025", desc: "A 4-week series building executive presence, negotiation, and public speaking skills.", applyUrl: "#" },
  { title: "Small Business Certification Bootcamp", org: "Partner Provider", category: "Professional Development", type: "Certification", location: "Online", deadline: "Enrolling now", desc: "Get certified in business fundamentals with subsidised access for Hub members.", applyUrl: "#" },
  { title: "Community Micro-Grant Fund", org: "Ellevation Hub", category: "Grants & Funding", type: "Grant", location: "Perth, WA", deadline: "1 Nov 2025", desc: "Up to $2,000 in seed funding for grassroots community and youth initiatives.", applyUrl: "#" },
  { title: "Business Growth Grant", org: "Corporate Partner", category: "Grants & Funding", type: "Grant", location: "WA-wide", deadline: "20 Oct 2025", desc: "Funding support for directory-listed businesses ready to scale their operations.", applyUrl: "#" },
  { title: "Panel Speaker — Rise Summit 2025", org: "Ellevation Hub", category: "Speaking & Visibility", type: "Speaking", location: "Perth, WA", deadline: "10 Sep 2025", desc: "Share your story on a panel at our flagship leadership summit in June.", applyUrl: "#" },
  { title: "Member Spotlight Feature", org: "Ellevation Hub", category: "Speaking & Visibility", type: "Feature", location: "Digital", deadline: "Rolling", desc: "Get featured across our newsletter and social channels as a community spotlight.", applyUrl: "#" },
  { title: "Business Spotlight Feature", org: "Ellevation Hub", category: "Business Promotion", type: "Feature", location: "Digital", deadline: "Rolling", desc: "Promote your business to the Hub community through our newsletter and social channels.", applyUrl: "#" },
  { title: "Member Cross-Promotion Showcase", org: "Open Call", category: "Business Promotion", type: "Promotion", location: "Perth, WA", deadline: "Rolling", desc: "Join a joint showcase where member businesses promote each other's products and services.", applyUrl: "#" },
];

const EVENT_CATEGORIES = [
  "All Events",
  "Community",
  "Sports & Youth",
  "Business & Networking",
  "Workshops & Leadership",
  "Corporate & Professional",
] as const;
type EventCategory = typeof EVENT_CATEGORIES[number];

// Demo events only — final Perth event listings to be confirmed by Hannah.
const EVENTS: EventItem[] = [
  {
    day: "14",
    month: "JUN 2025",
    tag: "Conference",
    category: "Business & Networking",
    title: "Rise Summit: Women in Leadership",
    desc: "A full-day summit for leaders, innovators, and changemakers across Perth's business community.",
    location: "Perth, WA",
    price: "$149",
    registrationUrl: "#",
  },
  {
    day: "22",
    month: "JUL 2025",
    tag: "Cultural Celebration",
    category: "Community",
    title: "Harmony Perth: Cultural Festival",
    desc: "A celebration of Perth's CALD communities with food, performance, and shared stories.",
    location: "Fremantle, WA",
    price: "Free",
    registrationUrl: "#",
  },
  {
    day: "08",
    month: "AUG 2025",
    tag: "Gala",
    category: "Corporate & Professional",
    title: "Ellevation Hub Annual Gala",
    desc: "An elegant evening celebrating community achievements and forging new connections.",
    location: "Perth CBD, WA",
    price: "$199",
    registrationUrl: "#",
  },
  {
    day: "15",
    month: "SEP 2025",
    tag: "Youth Program",
    category: "Sports & Youth",
    title: "Young Futures Sports & Leadership Day",
    desc: "A day of sport, mentorship, and leadership activities for youth aged 13–18.",
    location: "Joondalup, WA",
    price: "Free",
    registrationUrl: "#",
  },
  {
    day: "20",
    month: "OCT 2025",
    tag: "Workshop",
    category: "Workshops & Leadership",
    title: "Professional Pathways Leadership Workshop",
    desc: "Hands-on sessions with employers, mentors, and professional development resources.",
    location: "Perth, WA",
    price: "$49",
    registrationUrl: "#",
  },
  {
    day: "08",
    month: "NOV 2025",
    tag: "Networking",
    category: "Business & Networking",
    title: "Small Business Growth Mixer",
    desc: "An evening of networking, business tips, and connection for Hub directory members.",
    location: "Perth, WA",
    price: "$29",
    registrationUrl: "#",
  },
  {
    day: "22",
    month: "NOV 2025",
    tag: "Independence Celebration",
    category: "Community",
    title: "Community Independence Day Celebration",
    desc: "Marking independence and heritage with music, food, and community storytelling.",
    location: "Perth, WA",
    price: "Free",
    registrationUrl: "#",
  },
  {
    day: "08",
    month: "DEC 2025",
    tag: "Corporate Breakfast",
    category: "Corporate & Professional",
    title: "Year-End Corporate Partners Breakfast",
    desc: "Reflecting on the year's impact with corporate partners and setting intentions ahead.",
    location: "Perth, WA",
    price: "$39",
    registrationUrl: "#",
  },
];

const IMPACT_STATS = [
  { n: "1,200+", l: "Community members" },
  { n: "350+",   l: "Businesses in the directory" },
  { n: "40+",    l: "Programs delivered" },
  { n: "$2.1M+", l: "In referred opportunities" },
];

// Children & Youth outcomes (section that was missing on the Impact page)
const CHILDREN_YOUTH_OUTCOMES = [
  { title: "Mentoring & Development",  desc: "Children and young people matched with mentors who help them build confidence, develop skills, and explore future possibilities.", icon: "✦" },
  { title: "Leadership & Life Skills", desc: "Leadership experiences, workshops, and practical life skills that prepare young people for future opportunities.",               icon: "◑" },
  { title: "Confidence Building",      desc: "Safe and supportive environments where children and young people can find their voice, grow their confidence, and try new things.", icon: "❀" },
  { title: "Future Pathways",          desc: "Connections to education, training, work experience, career pathways, and future opportunities.",                                icon: "❖" },
];

const CALD_OUTCOMES = [
  { title: "Language-Inclusive Programming",      desc: "Programs and resources supported through multilingual and interpreter services where needed.",                                              icon: "✦" },
  { title: "Culturally Responsive Mentorship",    desc: "Mentoring relationships that recognise cultural context, lived experience, and individual aspirations.",                                    icon: "✿" },
  { title: "Multilingual Directory Access",       desc: "Improving access to businesses, services, and opportunities through multilingual pathways and language accessibility.",                      icon: "◈" },
  { title: "Pathways for Newly Arrived Families", desc: "Connection, referrals, information, and support that help families navigate life, opportunities, and community in Perth.",                  icon: "❖" },
];

const BUSINESS_GROWTH_STATS = [
  { n: "68%",  l: "of directory members reported increased enquiries" },
  { n: "120+", l: "businesses featured or spotlighted" },
  { n: "45+",  l: "referral partnerships formed" },
  { n: "3x",   l: "average visibility growth after listing" },
];

const PROGRAMS_IN_ACTION = [
  { title: "Children & Youth",      desc: "Mentorship circles and leadership experiences helping children and young people build confidence, direction, and future pathways.", icon: "✦" },
  { title: "Men's Pathway",         desc: "Programs supporting wellbeing, growth, leadership, and positive participation in families and communities.",                       icon: "◎" },
  { title: "Community Development", desc: "Grassroots initiatives strengthening connection, participation, and collaboration across Perth's diverse communities.",            icon: "✿" },
  { title: "Business Directory",    desc: "Visibility, networking, and referral opportunities helping businesses increase their reach and create sustainable growth.",       icon: "◈" },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ current, nav }: { current: Page; nav: NavFn }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const rowRef = useRef<HTMLDivElement>(null);
  const routerNavigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // close mobile menu whenever the active page changes
  useEffect(() => { setMenuOpen(false); }, [current]);

  // Keep the logo (and theme) in sync with data-theme on <html>.
  useEffect(() => {
    const readTheme = () => {
      const attr = document.documentElement.getAttribute("data-theme");
      setTheme(attr === "dark" ? "dark" : "light");
    };
    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("storage", readTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", readTheme);
    };
  }, []);

  // The navbar is `position: fixed`, so measure its real height (including the
  // expanded mobile dropdown) and publish it as --nav-height for page content.
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const setVar = () => {
      document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`);
    };

    setVar();

    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, [menuOpen, current]);

  const goHome = () => { routerNavigate("/"); setMenuOpen(false); };
  const goPage = (p: Page) => { nav(p); setMenuOpen(false); };

  return (
    <div className="ms-nav-row" ref={rowRef}>
      <nav className={`ms-nav ${scrolled ? "ms-nav-scrolled" : ""}`}>
        {/* Back to Home */}
        <button onClick={goHome} className="ns-back-home" aria-label="Back to home">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back to Home</span>
        </button>

        {/* Logo — swaps automatically between light/dark variants */}
        <img
          src={theme === "dark" ? hubLogoDark : hubLogoLight}
          alt="Ellevation Hub Logo"
          onClick={() => goPage("home")}
          className="ns-logo"
        />

        {/* Desktop nav links */}
        <div className="ns-links-desktop">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => goPage(page)}
              className={`ns-link ${current === page ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger toggle */}
        <button
          className={`ns-menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`ns-mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => goPage(page)}
            className={`ns-mobile-link ${current === page ? "active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

/* ══════════════════════════════════════════════════════════════════════════
   HOME PAGE — built to the client-final developer version
   Structure: 1 Hero · 2 Opportunities · 3 For Everyone · 4 Ecosystem · 5 Final CTA
   ══════════════════════════════════════════════════════════════════════════ */
function HomeSection({ nav }: { nav: NavFn }) {
  const routerNavigate = useNavigate();
  const opp = useInView(0.1);
  const every = useInView(0.1);
  const eco = useInView(0.1);
  const cta = useInView(0.12);

  return (
    <div>
      {/* 1 ── HERO */}
      <div className="hub-home-page" style={hp.page}>
        <div className="hub-home-bg" style={hp.bgGrad} />
        <div style={hp.blobTL} />
        <div style={hp.blobBR} />
        <div className="hub-home-grid" style={hp.grid}>
          <div style={hp.left}>
<h1 className="hub-home-headline" style={hp.headline}>
  Every Pathway Into Opportunity.
  <span style={{ display: "block", marginTop: 12, fontSize: "0.55em", fontWeight: 600 }}>
    One Ecosystem. Endless Connections.
  </span>
</h1>           <p className="hub-home-sub" style={hp.sub}>
  Connecting culturally and linguistically diverse (CALD) communities, professionals, entrepreneurs, businesses, organisations, and collaborators through opportunity, connection, and impact.
</p>
<p className="hub-home-sub" style={hp.sub}>
  Whether you're looking to belong, grow, partner, support, or create change, there's a place for you here.
</p>
            <div className="hub-home-btn-row" style={hp.btnRow}>
              <button style={hp.btnPrimary} onClick={() => nav("membership")}>JOIN THE HUB</button>
              <button style={hp.btnSecondary} onClick={() => nav("opportunities")}>EXPLORE OPPORTUNITIES</button>
            </div>
          </div>
          <div className="hub-card" style={hp.card}>
            <p className="hub-card-desc" style={hp.cardDesc}>One ecosystem connecting directory, programs, and opportunity — built for the whole community.</p>
            <div style={hp.cardFeatures}>
{["Business Directory & Categories", "Youth & Men's Development Programs", "Jobs, Grants & Opportunities Board", "Community Events Calendar"].map(feat => (                <div key={feat} className="hub-feat" style={hp.feat}><span style={hp.check}>✓</span>{feat}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2 ── OPPORTUNITIES */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={opp.ref} style={{ ...ab.container, ...fade(opp.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>OPPORTUNITIES</p>
          <h2 className="hub-about-title" style={ab.title}>Discover. Connect. Grow.</h2>
          <div style={ab.gridAuto}>
            {HOME_OPPORTUNITIES.map((item, i) => (
              <button
                key={item.title}
                onClick={() => nav(item.page)}
                className="hub-about-card hub-about-access"
                style={{ ...ab.card, ...ab.accessCard, ...fade(opp.inView, 100 + i * 80) }}
              >
                <h3 className="hub-about-card-title" style={ab.cardTitle}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
                {item.link && <span className="hub-about-link" style={ab.cardLink}>{item.link}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3 ── FOR EVERYONE */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
        <div ref={every.ref} style={{ ...ab.container, ...fade(every.inView, 0) }}>
<h2 className="hub-about-title" style={ab.title}>Opportunities for Every Stage of the Journey</h2>          <div style={ab.gridAuto}>
            {HOME_FOR_EVERYONE.map((item, i) => (
              <div key={item.title} className="hub-about-card" style={{ ...ab.card, ...fade(every.inView, 100 + i * 80) }}>
                <h3 className="hub-about-card-title" style={ab.cardTitle}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── THE ECOSYSTEM (Hub left, Ms Ellevation right) */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={eco.ref} style={{ ...ab.container, ...fade(eco.inView, 0) }}>
<h2 className="hub-about-title" style={ab.title}>Together Creating Pathways for Opportunity, Connection, and Impact.</h2>          <div style={ab.gridAuto}>
            {HOME_ECOSYSTEM.map((item, i) => (
              <button
                key={item.title}
                onClick={() => {
                  if (item.route === "/hub") {
                    // Already on Hub home: make sure we're on "home" and scroll to the top
                    nav("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    routerNavigate(item.route);
                  }
                }}
                className="hub-about-card hub-about-access"
                style={{ ...ab.card, ...ab.accessCard, ...fade(eco.inView, 100 + i * 100) }}
              >
                <p className="hub-about-eye" style={ab.eyeLeft}>{item.eyebrow}</p>
               <h3 className="hub-about-card-title" style={{ ...ab.cardTitle, fontSize: "22px" }}>{item.title}</h3>
<p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
<span className="hub-about-link" style={ab.cardLink}>Visit →</span>
              </button>
            ))}
          </div>
       
        </div>
      </section>

      {/* 5 ── FINAL CTA */}
      <section className="hub-about-section hub-about-cta" style={ab.ctaSection}>
        <div ref={cta.ref} style={{ ...ab.containerNarrow, ...fade(cta.inView, 0) }}>
          <h2 style={{ ...ab.title, color: "#fff", marginBottom: 20 }}>Opportunity Starts With Connection.</h2>
         <p style={{ ...ab.para, color: "rgba(255,255,255,0.85)" }}>
  Join a growing ecosystem connecting people, organisations, businesses, and opportunities to create stronger communities and lasting impact.
</p>
          <div style={ab.ctaRow}>
            <button style={ab.ctaPrimary} onClick={() => nav("membership")}>JOIN MEMBERSHIP</button>
            <button style={ab.ctaSecondary} onClick={() => nav("connect")}>CONTACT US</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ABOUT PAGE — built to the client-final developer version
   ══════════════════════════════════════════════════════════════════════════ */
function AboutSection({ nav }: { nav: NavFn }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const v = useInView(0.12);
  const w = useInView(0.12);
  const y = useInView(0.12);
  const a = useInView(0.1);
  const s = useInView(0.1);
  const c = useInView(0.1);
  const m = useInView(0.12);
  const e = useInView(0.12);
  const f = useInView(0.12);

  return (
    <div className="hub-about-page">
      {/* 1 ── HERO */}
      <section className="hub-about-hero" style={ab.hero}>
        <div style={ab.heroInner}>
          <p style={{ ...ab.heroEye, ...fade(mounted, 0) }}>ABOUT ELLEVATION HUB</p>
          <h1 className="hub-about-hero-title" style={{ ...ab.heroTitle, ...fade(mounted, 120) }}>
            One Ecosystem. Every Pathway to Opportunity.
          </h1>
<p style={{ ...ab.heroText, ...fade(mounted, 240) }}>
  Ellevation Hub is a purpose-led social enterprise and community-led ecosystem creating pathways to confidence, connection, leadership, visibility, opportunity, and community impact.
</p>
<p style={{ ...ab.heroText, ...fade(mounted, 340), marginTop: 16 }}>
  Built with a strong commitment to culturally and linguistically diverse (CALD) communities, Ellevation Hub connects people, professionals, entrepreneurs, businesses, organisations, and opportunities through one integrated ecosystem.
</p>
        </div>
      </section>

      {/* 2 ── VISION & MISSION */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={v.ref} style={ab.container}>
          <div style={{ ...ab.twoCol, ...fade(v.inView, 0) }} className="hub-about-two-col">
            <div className="hub-about-card" style={ab.visionCard}>
              <p className="hub-about-eye" style={ab.eyeLeft}>OUR VISION</p>
              <h2 className="hub-about-card-title" style={ab.cardHeading}>Our Vision</h2>
              <p className="hub-about-card-text" style={ab.bodyText}>
An Australia where culturally and linguistically diverse (CALD) communities have equitable access to confidence, leadership, opportunity, visibility, and meaningful participation while contributing to stronger, more connected communities.     </p>
            </div>
            <div className="hub-about-card" style={ab.visionCard}>
              <p className="hub-about-eye" style={ab.eyeLeft}>OUR MISSION</p>
              <h2 className="hub-about-card-title" style={ab.cardHeading}>Our Mission</h2>
              <p className="hub-about-card-text" style={ab.bodyText}>
To create connected pathways that build confidence, strengthen leadership, increase visibility, and expand opportunities for individuals, businesses, organisations, and communities              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ── WHO WE ARE */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
        <div ref={w.ref} style={{ ...ab.containerNarrow, ...fade(w.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>WHO WE ARE</p>
          <h2 className="hub-about-title" style={ab.title}>Building Opportunity Through Community</h2>
      <p className="hub-about-sub" style={ab.para}>
  Ellevation Hub functions as a connected ecosystem supporting people at every stage of their journey, from early childhood through to leadership, entrepreneurship, employment, and economic participation.
</p>
<p className="hub-about-sub" style={ab.para}>
  We bring together community development, youth pathways, leadership programmes, business networks, strategic partnerships, and opportunities through one connected impact model.
</p>
<p className="hub-about-sub" style={{ ...ab.para, marginBottom: 6 }}>
  Our goal is simple:
</p>
<p className="hub-about-sub" style={{ ...ab.para, fontWeight: 600, color: "#4B1E56" }}>
  To ensure people, businesses, and communities have access to the networks, support, visibility, and opportunities needed to grow, connect, and create lasting impact.
</p>
        </div>
      </section>

      {/* 4 ── WHY ELLEVATION HUB MATTERS */}
      <section className="hub-about-section" style={ab.sectionDark}>
        <div ref={y.ref} style={{ ...ab.containerNarrow, ...fade(y.inView, 0) }}>
          <p style={{ ...ab.eye, color: "#c9a3d9" }}>WHY ELLEVATION HUB MATTERS</p>
          <h2 style={{ ...ab.title, color: "#fff", fontSize: "clamp(32px,4.5vw,52px)", fontStyle: "italic" }}>
            For many people and communities, opportunity is not always the challenge. Access is.
          </h2>
          <div style={{ margin: "0 auto 28px", display: "flex", flexDirection: "column", gap: 4 }}>
  {[
    "Access to networks.",
    "Access to mentors.",
    "Access to visibility.",
    "Access to leadership pathways.",
    "Access to business support.",
    "Access to opportunities.",
  ].map(line => (
    <p key={line} style={{ ...ab.para, color: "#e8e0f8", fontWeight: 600, marginBottom: 0 }}>
      {line}
    </p>
  ))}
</div>
<p style={{ ...ab.para, color: "rgba(255,255,255,0.82)" }}>
  Ellevation Hub exists to bridge these gaps by connecting people, organisations, partnerships, and opportunities through one integrated ecosystem.
</p>
        </div>
      </section>

      {/* 5 ── OUR ECOSYSTEM APPROACH */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={a.ref} style={{ ...ab.container, ...fade(a.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>OUR ECOSYSTEM APPROACH</p>
<h2 className="hub-about-title" style={{ ...ab.title, marginBottom: 16 }}>More Than a Network. More Than a Directory.</h2>
<p className="hub-about-sub" style={{ ...ab.para, maxWidth: 760, margin: "0 auto 40px" }}>
  Everything within Ellevation Hub is designed to strengthen confidence, connection, leadership, visibility, opportunity, and community impact.
</p>          <div style={ab.gridAuto}>
            {ABOUT_ECOSYSTEM_APPROACH.map((item, i) => (
              <div key={item.title} className="hub-about-card" style={{ ...ab.card, ...fade(a.inView, 100 + i * 80) }}>
                <div style={ab.icon}>{item.icon}</div>
                <h3 className="hub-about-card-title" style={ab.cardTitle}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* 7 ── WHAT YOU CAN ACCESS */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={c.ref} style={{ ...ab.container, ...fade(c.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>WHAT YOU CAN ACCESS</p>
          <h2 className="hub-about-title" style={ab.title}>Everything You Need, In One Place</h2>
          <div style={ab.gridAuto}>
            {ABOUT_ACCESS.map((item, i) => (
              <button
                key={item.title}
                onClick={() => nav(item.page)}
                className="hub-about-card hub-about-access"
                style={{ ...ab.card, ...ab.accessCard, ...fade(c.inView, 100 + i * 80) }}
              >
                <h3 className="hub-about-card-title" style={ab.cardTitle}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
                <span className="hub-about-link" style={ab.cardLink}>Explore →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

        {/* 6 ── WHO WE SUPPORT */}
     <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
  <div ref={s.ref} style={{ ...ab.container, maxWidth: 1360, ...fade(s.inView, 0) }}>
    <p className="hub-about-eye" style={ab.eye}>WHO WE SUPPORT</p>
    <h2 className="hub-about-title" style={ab.title}>Every Community. Every Pathway.</h2>
    <div
      className="hub-about-support-grid"
      style={{ ...ab.gridAuto, gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}
    >
      {ABOUT_WHO_WE_SUPPORT.map((item, i) => (
        <div key={item.title} className="hub-about-card" style={{ ...ab.card, ...fade(s.inView, 100 + i * 80) }}>
            <div style={ab.icon}>{item.icon}</div>
                <h3 className="hub-about-card-title" style={ab.cardTitle}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* WHAT YOU CAN ACCESS */}
<section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
          <div ref={m.ref} style={{ ...ab.container, ...fade(m.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>OUR COMMITMENT</p>
          <h2 className="hub-about-title" style={ab.title}>Community First. Collaboration Always.</h2>
          <div style={ab.commitGrid}>
            {ABOUT_COMMITMENTS.map((t, i) => (
              <div key={t} className="hub-about-commit" style={{ ...ab.commitItem, ...fade(m.inView, 100 + i * 70) }}>
                <span style={ab.commitDot}>✓</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 ── THE ELLEVATION ECOSYSTEM (Hub, Ms Ellevation, Together) */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={e.ref} style={{ ...ab.container, ...fade(e.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>THE ELLEVATION ECOSYSTEM</p>
<h2 className="hub-about-title" style={ab.title}>Two Pathways. One Connected Journey.</h2>          <div style={ab.gridThree}>
            {ABOUT_ECOSYSTEM_CONNECTION.map((item, i) => (
              <div
                key={item.title}
                className="hub-about-card"
                style={{
                  ...ab.card,
                  ...(item.title === "Together" ? ab.cardHighlight : {}),
                  ...fade(e.inView, 100 + i * 100),
                }}
              >
                <h3
                  className="hub-about-card-title"
                  style={{ ...ab.cardTitle, fontSize: "22px", ...(item.title === "Together" ? { color: "#fff" } : {}) }}
                >
                  {item.title}
                </h3>
                <p
                  className="hub-about-card-text"
                  style={{ ...ab.cardText, ...(item.title === "Together" ? { color: "rgba(255,255,255,0.85)" } : {}) }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 ── FINAL CTA */}
      <section className="hub-about-section hub-about-cta" style={ab.ctaSection}>
        <div ref={f.ref} style={{ ...ab.containerNarrow, ...fade(f.inView, 0) }}>
          <h2 style={{ ...ab.title, color: "#fff", marginBottom: 20 }}>
            Opportunity Grows When Communities Grow Together.
          </h2>
          <p style={{ ...ab.para, color: "rgba(255,255,255,0.85)" }}>
            Whether you are looking to connect, collaborate, support, grow a business, develop leadership or create community impact, there is a place for you within the Ellevation Hub.
          </p>
          <div style={ab.ctaRow}>
            <button style={ab.ctaPrimary} onClick={() => nav("membership")}>JOIN MEMBERSHIP</button>
            <button style={ab.ctaSecondary} onClick={() => nav("connect")}>CONNECT WITH US</button>
          </div>
          <p style={ab.positioning}>
            Ellevation Hub is a purpose-led social enterprise building pathways from potential to participation through leadership, community, business and opportunity.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MEMBERSHIP PAGE — Belong → Grow → Influence → Partner
   Structure: header · philosophy · plan selector (left) + plan details
              (right) · comparison table · Hub + Ms Ellevation bridge ·
              EOI form
   Cards + table are styled to match the Ms Ellevation membership page.
   ══════════════════════════════════════════════════════════════════════════ */
const MEMBERSHIP_PURPOSES = [
  { id: "enquiry",      label: "Membership Enquiry",       desc: "I have questions before deciding." },
  { id: "application",  label: "Membership Application",   desc: "I'm ready to apply now." },
  { id: "future",       label: "Future Registration",      desc: "Notify me when registrations open." },
] as const;

const MEMBERSHIP_CSS = `
.mp-t-4{ --a1:#3b2a6b; --a2:#9a86d6; --a3:#1a0a2e; }
.mp-tagline{ font-size:0.82rem; font-weight:600; letter-spacing:0.08em; color:var(--mp-sub); margin-bottom:14px; }
.mp-table{ min-width:900px; }  /* replace the old 760px value */

.mp-impact{ text-align:center; margin-bottom:80px; }
.mp-impact .mp-block-title{ margin-bottom:12px; }
.mp-impact-lead{ font-family:'Astrid Regular',serif; font-style:italic; font-size:1.2rem; color:var(--mp-accent); margin-bottom:16px; }
.mp-impact-body{ max-width:860px; margin:0 auto 32px; font-size:18px; line-height:1.8; color:var(--mp-text); }
.mp-impact-cols{ display:grid; grid-template-columns:1fr 1fr; gap:20px; max-width:1000px; margin:0 auto 28px; text-align:left; }
.mp-impact-card{ background:var(--mp-card); border:1.5px solid var(--mp-border); border-radius:20px; padding:28px; box-shadow:var(--mp-shadow); }
.mp-impact-card h4{ font-family:'Astrid Regular',serif; font-size:22px; color:var(--mp-title); margin-bottom:14px; }
.mp-impact-card ul{ list-style:none; display:flex; flex-direction:column; gap:12px; padding:0; }
.mp-impact-card li{ display:flex; gap:10px; align-items:flex-start; font-size:16px; line-height:1.55; color:var(--mp-text); }
.mp-impact-card .mp-list-check{ background:var(--mp-gold); }
.mp-impact-principle{ max-width:860px; margin:0 auto 40px; padding:18px 22px; border-radius:14px; background:rgba(215,178,100,0.12); border-left:3px solid var(--mp-gold); font-size:18px; line-height:1.7; color:var(--mp-title); text-align:left; }
.mp-impact-subhead{ font-family:'Astrid Regular',serif; font-size:1.5rem; color:var(--mp-title); margin-bottom:18px; }
.mp-impact-note{ max-width:860px; margin:22px auto 0; font-size:16px; line-height:1.75; color:var(--mp-text); text-align:left; }
@media (max-width:768px){ .mp-impact-cols{ grid-template-columns:1fr; } }
.mp{
  --mp-card:#ffffff; --mp-soft:#f6f3fa; --mp-border:rgba(124,92,191,0.18);
  --mp-title:#1a0a2e; --mp-text:#554866; --mp-accent:#4B1E56; --mp-eye:#662369; --mp-sub:#8a5a97;
  --mp-gold:#D7B264; --mp-shadow:0 8px 32px rgba(124,92,191,0.10);
  --mp-grad:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 55%,#35143d 100%);
  font-family:'Montserrat',sans-serif;
}
[data-theme="dark"] .mp{
  --mp-card:#1f1330; --mp-soft:#160d22; --mp-border:rgba(155,109,190,0.22);
  --mp-title:#e8e0f8; --mp-text:#d9a8cd; --mp-accent:#c9a3d9; --mp-eye:#c9a3d9; --mp-sub:#c9a3d9;
  --mp-shadow:0 10px 40px rgba(0,0,0,0.45);
  --mp-grad:linear-gradient(135deg,#2a163a 0%,#1f1330 60%,#160d22 100%);
}
.mp *{ box-sizing:border-box; }
.mp-wrap{ max-width:1240px; margin:0 auto; }

/* Header */
.mp-head{ text-align:center; max-width:820px; margin:0 auto 40px; }
.mp-eye{ font-size:14px; font-weight:700; letter-spacing:0.2em; color:var(--mp-eye); margin-bottom:14px; text-transform:uppercase; }
.mp-title{ font-family:'Astrid Regular',serif; font-weight:700; font-size:clamp(36px,5vw,52px); line-height:1.12; color:var(--mp-title); margin-bottom:12px; }
.mp-journey{ display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:8px; margin:6px 0 16px; }
.mp-journey span{ font-size:0.78rem; font-weight:700; letter-spacing:0.08em; padding:7px 16px; border-radius:100px; color:var(--mp-accent); background:rgba(75,30,86,0.08); border:1px solid var(--mp-border); }
[data-theme="dark"] .mp-journey span{ background:rgba(255,255,255,0.06); }
.mp-journey i{ font-style:normal; color:var(--mp-gold); font-weight:700; }
.mp-question{ font-family:'Astrid Regular',serif; font-style:italic; font-size:1.2rem; color:var(--mp-accent); margin-bottom:6px; }

/* Philosophy */
.mp-philo{ background:var(--mp-grad); color:#fff; border-radius:24px; padding:40px 44px; margin:0 auto 56px; max-width:1000px; text-align:left; position:relative; overflow:hidden; box-shadow:var(--mp-shadow); }
.mp-philo::after{ content:""; position:absolute; right:-80px; top:-80px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle, rgba(215,178,100,0.28) 0%, transparent 70%); pointer-events:none; }
.mp-philo h3{ font-family:'Astrid Regular',serif; font-size:1.6rem; margin-bottom:12px; color:#fff; position:relative; }
.mp-philo p{ font-size:18px; line-height:1.8; color:rgba(255,255,255,0.88); margin-bottom:12px; position:relative; }
.mp-philo p:last-child{ margin-bottom:0; }
.mp-philo-tag{ display:inline-block; margin-top:6px; font-size:0.74rem; font-weight:700; letter-spacing:0.08em; color:#35143d; background:var(--mp-gold); padding:7px 16px; border-radius:100px; }

/* ── Plans: selector (left) + details panel (right) — same layout as Ms Ellevation ── */
.mp-plans-head{ max-width:900px; margin:0 auto 44px; text-align:center; }
.mp-block-title{ font-family:'Astrid Regular',serif; font-weight:700; font-size:clamp(32px,4.5vw,52px); color:var(--mp-title); }
.mp-split{ max-width:1180px; margin:0 auto 80px; display:grid; grid-template-columns:minmax(300px,390px) minmax(0,1fr); gap:32px; align-items:start; }

.mp-list-col{ display:flex; flex-direction:column; gap:14px; }
.mp-t-0{ --a1:#6b2f7a; --a2:#8a5a97; --a3:#2d1740; }
.mp-t-1{ --a1:#5a3fb0; --a2:#8b73d6; --a3:#2d1740; }
.mp-t-2{ --a1:#8a6a1f; --a2:#D7B264; --a3:#2d1740; }
.mp-t-3{ --a1:#a03a72; --a2:#d98ab5; --a3:#2d1740; }

.mp-tab{
  display:flex; align-items:center; gap:14px; width:100%; text-align:left;
  padding:16px 18px; border-radius:18px; cursor:pointer;
  background:rgba(255,255,255,0.75); border:1px solid rgba(124,92,191,0.14);
  color:#1a0a2e; font-family:'Montserrat',sans-serif;
  transition:background .25s ease, box-shadow .25s ease, color .25s ease, border-color .25s ease;
}
.mp-tab:hover{ opacity:1; transform:none; filter:none; background:#fff; border-color:rgba(124,92,191,0.35); box-shadow:0 8px 24px rgba(75,30,86,0.10); }
.mp-tab:focus-visible{ outline:3px solid rgba(215,178,100,0.7); outline-offset:2px; }
.mp-tab.active{ background:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 100%); border-color:transparent; color:#fff; box-shadow:0 16px 34px rgba(75,30,86,0.30); }
.mp-tab-avatar{ flex-shrink:0; width:48px; height:48px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background:rgba(75,30,86,0.08); color:var(--a1); transition:background .25s ease, color .25s ease; }
.mp-tab.active .mp-tab-avatar{ background:rgba(255,255,255,0.18); color:#fff; }
.mp-tab-text{ flex:1; min-width:0; display:flex; flex-direction:column; gap:3px; }
.mp-tab-name{ font-size:1rem; font-weight:700; letter-spacing:0.01em; }
.mp-tab-sub{ font-size:0.74rem; font-weight:400; color:#8a5a97; line-height:1.35; }
.mp-tab.active .mp-tab-sub{ color:rgba(255,255,255,0.82); }
.mp-tab-price{ flex-shrink:0; display:flex; flex-direction:column; align-items:flex-end; line-height:1.15; }
.mp-tab-price strong{ font-size:1.12rem; font-weight:700; color:#4B1E56; }
.mp-tab-price small{ font-size:0.66rem; font-weight:500; color:#8a5a97; }
.mp-tab.active .mp-tab-price strong{ color:#fff; }
.mp-tab.active .mp-tab-price small{ color:rgba(255,255,255,0.8); }
.mp-list-note{ font-size:0.78rem; font-style:italic; color:#8a5a97; padding:4px 6px 0; }

.mp-panel{ position:relative; overflow:hidden; background:var(--mp-card); border:1px solid rgba(124,92,191,0.16); border-radius:28px; padding:40px 40px 36px; box-shadow:0 20px 60px rgba(75,30,86,0.12); animation:mpPanelIn .45s cubic-bezier(.22,1,.36,1) both; }
@keyframes mpPanelIn{ from{ opacity:0; transform:translateX(18px); } to{ opacity:1; transform:translateX(0); } }
.mp-panel-glow{ position:absolute; top:-80px; right:-80px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle, var(--a2) 0%, transparent 70%); opacity:.16; pointer-events:none; }
.mp-panel-top{ position:relative; z-index:1; display:grid; grid-template-columns:220px minmax(0,1fr); gap:36px; align-items:center; }

.mp-arch{ width:220px; height:290px; padding:6px; box-sizing:border-box; border-radius:110px 110px 26px 26px; background:var(--a2); box-shadow:0 16px 36px rgba(75,30,86,0.22); }
.mp-arch-inner{ width:100%; height:100%; border-radius:104px 104px 20px 20px; background:linear-gradient(165deg, var(--a1) 0%, var(--a3) 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; padding:24px 12px 20px; text-align:center; color:#fff; }
.mp-arch-icon{ width:52px; height:52px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.14); color:#EFBF68; margin-bottom:8px; }
.mp-arch-name{ font-family:'Astrid Regular',serif; font-size:1.2rem; font-weight:600; letter-spacing:0.02em; }
.mp-arch-price{ font-family:'Astrid Regular',serif; font-size:2.7rem; font-weight:700; line-height:1.05; margin-top:6px; }
.mp-arch-unit{ font-size:0.76rem; font-weight:500; color:rgba(255,255,255,0.8); }
.mp-arch-alt{ font-size:0.78rem; font-weight:600; color:#EFBF68; margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.22); width:78%; }

.mp-panel-body{ min-width:0; }
.mp-pill{ display:inline-block; font-size:0.68rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#4B1E56; background:rgba(75,30,86,0.07); border:1px solid rgba(75,30,86,0.14); padding:5px 14px; border-radius:100px; }
.mp-rule{ display:block; width:34px; height:2px; background:#D7B264; margin:16px 0 12px; }
.mp-panel-title{ font-family:'Astrid Regular',serif; font-size:clamp(1.7rem,3vw,2.2rem); font-weight:700; line-height:1.15; color:var(--mp-accent); margin-bottom:10px; }
.mp-panel-quote{ font-family:'Astrid Regular',serif; font-size:1.08rem; font-style:italic; color:var(--mp-text); line-height:1.55; margin-bottom:20px; }
.mp-card-label{ font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#8a5a97; margin-bottom:12px; }
.mp-chips{ list-style:none; display:flex; flex-wrap:wrap; gap:8px; margin-bottom:4px; padding:0; }
.mp-chips li{ font-size:0.76rem; font-weight:500; color:#4B1E56; background:rgba(75,30,86,0.07); border:1px solid rgba(75,30,86,0.12); padding:6px 13px; border-radius:100px; }

.mp-btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; margin-top:24px; font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.14em; padding:14px 30px; border-radius:100px; border:none; background:#D7B264; color:#fff; cursor:pointer; box-shadow:0 8px 22px rgba(75,30,86,0.28); transition:transform .25s ease, box-shadow .25s ease, opacity .2s ease; }
.mp-btn:hover{ transform:translateY(-2px); box-shadow:0 12px 30px rgba(75,30,86,0.36); opacity:1; }
.mp-btn svg{ transition:transform .25s ease; }
.mp-btn:hover svg{ transform:translateX(3px); }

.mp-panel-bottom{ position:relative; z-index:1; margin-top:32px; padding-top:28px; border-top:1px solid rgba(124,92,191,0.16); }
.mp-list{ list-style:none; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px 32px; margin:0 0 26px; padding:0; }
.mp-list-item{ display:flex; align-items:flex-start; gap:10px; font-size:18px; font-weight:400; line-height:1.5; color:#3d2e47; }
.mp-list-item-lead{ grid-column:1 / -1; font-weight:700; color:#1a0a2e; }
.mp-list-check{ flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; margin-top:1px; border-radius:50%; background:var(--a1); color:#fff; }
.mp-list-check svg{ width:11px; height:11px; }
.mp-outcome{ padding:16px 20px; border-radius:14px; background:rgba(215,178,100,0.12); border-left:3px solid #D7B264; }
.mp-outcome-label{ display:block; font-size:0.66rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#8a5a97; margin-bottom:6px; }
.mp-outcome-text{ font-size:18px; font-weight:500; color:#1a0a2e; line-height:1.55; }

/* ── Comparison table — same look as Ms Ellevation ── */
.mp-compare{ text-align:center; margin-bottom:80px; }
.mp-compare .mp-block-title{ margin-bottom:32px; }
.mp-table-wrap{ overflow-x:auto; -webkit-overflow-scrolling:touch; text-align:left; background:var(--mp-card); border:1px solid rgba(124,92,191,0.16); border-radius:20px; box-shadow:0 8px 40px rgba(75,30,86,0.10); max-width:1180px; margin:0 auto; }
.mp-table{ width:100%; border-collapse:separate; border-spacing:0; min-width:940px; }
.mp-table-wrap:focus-visible{ outline:3px solid rgba(75,30,86,0.35); outline-offset:2px; }
.mp-table thead th{ background:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 100%); color:#fff; font-family:'Astrid Regular',serif; font-size:22px; font-weight:600; letter-spacing:0.02em; text-align:center; padding:22px 18px; white-space:nowrap; }
.mp-table thead th.mp-th-feature{ text-align:left; font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; padding-left:24px; position:sticky; left:0; z-index:2; }
.mp-table tbody th, .mp-table tbody td{ padding:18px 18px; border-bottom:1px solid rgba(124,92,191,0.12); font-size:18px; color:#3d2e47; vertical-align:middle; line-height:1.45; }
.mp-table tbody th{ text-align:left; font-weight:600; color:#1a0a2e; padding-left:24px; background:#fff; position:sticky; left:0; z-index:1; min-width:250px; }
.mp-table tbody td{ text-align:center; font-weight:400; }
.mp-table tbody tr:nth-child(even) th, .mp-table tbody tr:nth-child(even) td{ background:#faf7fd; }
.mp-table tbody tr:last-child th, .mp-table tbody tr:last-child td{ border-bottom:none; }
.mp-row-strong td{ font-weight:700; color:#4B1E56; }
.mp-yes{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:rgba(75,30,86,0.10); color:#4B1E56; }
.mp-yes svg{ width:17px; height:17px; }
.mp-hint{ display:none; font-size:14px; font-style:italic; color:#8a5a97; margin-top:14px; }.mp-no{ color:#b09fc0; font-weight:400; }
.mp-text{ display:inline-block; }

/* Bridge */
.mp-bridge{ margin-bottom:72px; text-align:center; }
.mp-bridge .mp-block-head{ text-align:center; margin-bottom:28px; }
.mp-bridge-grid{ display:grid; grid-template-columns:1fr auto 1fr; gap:18px; align-items:stretch; max-width:1000px; margin:0 auto 24px; text-align:left; }
.mp-bridge-card{ background:var(--mp-card); border:1.5px solid var(--mp-border); border-radius:20px; padding:28px; box-shadow:var(--mp-shadow); }
.mp-bridge-card h4{ font-family:'Astrid Regular',serif; font-size:22px; color:var(--mp-title); margin-bottom:8px; }
.mp-bridge-card p{ font-size:18px; line-height:1.7; color:var(--mp-text); }
.mp-bridge-card .tag{ display:inline-block; font-size:0.66rem; font-weight:700; letter-spacing:0.16em; color:var(--mp-eye); margin-bottom:10px; }
.mp-bridge-plus{ align-self:center; width:48px; height:48px; border-radius:50%; background:var(--mp-gold); color:#fff; font-size:1.5rem; font-weight:700; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 18px rgba(215,178,100,0.5); }
.mp-bridge-note{ max-width:820px; margin:0 auto; font-size:18px; line-height:1.8; color:var(--mp-text); }

/* Form area */
.mp-form-wrap{ width:100%; max-width:960px; margin:0 auto; scroll-margin-top:calc(var(--nav-height, 96px) + 16px); }
.mp-summary{ display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding:14px 18px; border-radius:16px; background:var(--mp-soft); border:1px solid var(--mp-border); margin-bottom:22px; }
.mp-summary b{ font-family:'Astrid Regular',serif; font-size:1.1rem; color:var(--mp-title); }
.mp-summary span{ font-size:0.82rem; color:var(--mp-text); }
.mp-select-billing{ display:inline-flex; gap:6px; }
.mp-select-billing button{ font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.06em; padding:7px 14px; border-radius:100px; border:1.5px solid var(--mp-border); background:transparent; color:var(--mp-text); cursor:pointer; }
.mp-select-billing button.on{ background:var(--mp-gold); border-color:var(--mp-gold); color:#fff; }

/* ── Dark mode: plans + table ── */
[data-theme="dark"] .mp-tab{ background:rgba(31,19,48,0.75); border-color:rgba(155,109,190,0.18); color:#e8ddf5; }
[data-theme="dark"] .mp-tab:hover{ background:#251838; border-color:rgba(155,109,190,0.4); box-shadow:0 8px 24px rgba(0,0,0,0.4); }
[data-theme="dark"] .mp-tab.active{ background:linear-gradient(135deg,#7a3a8c 0%,#4B1E56 100%); border-color:transparent; color:#fff; box-shadow:0 16px 34px rgba(0,0,0,0.5); }
[data-theme="dark"] .mp-tab-avatar{ background:rgba(217,168,205,0.12); color:#e8b8f0; }
[data-theme="dark"] .mp-tab.active .mp-tab-avatar{ background:rgba(255,255,255,0.18); color:#fff; }
[data-theme="dark"] .mp-tab-sub, [data-theme="dark"] .mp-tab-price small, [data-theme="dark"] .mp-list-note{ color:#c9a3d9; }
[data-theme="dark"] .mp-tab-price strong{ color:#f3ecff; }
[data-theme="dark"] .mp-tab.active .mp-tab-sub, [data-theme="dark"] .mp-tab.active .mp-tab-price small{ color:rgba(255,255,255,0.85); }
[data-theme="dark"] .mp-panel{ background:#1f1330; border-color:rgba(155,109,190,0.2); box-shadow:0 20px 60px rgba(0,0,0,0.55); }
[data-theme="dark"] .mp-panel-title{ color:#f3ecff; }
[data-theme="dark"] .mp-panel-quote{ color:#e8b8f0; }
[data-theme="dark"] .mp-pill{ color:#e8b8f0; background:rgba(217,168,205,0.08); border-color:rgba(217,168,205,0.22); }
[data-theme="dark"] .mp-card-label, [data-theme="dark"] .mp-outcome-label{ color:#c9a3d9; }
[data-theme="dark"] .mp-chips li{ color:#e8b8f0; background:rgba(217,168,205,0.08); border-color:rgba(217,168,205,0.2); }
[data-theme="dark"] .mp-panel-bottom{ border-top-color:rgba(155,109,190,0.25); }
[data-theme="dark"] .mp-list-item{ color:#e8ddf5; }
[data-theme="dark"] .mp-list-item-lead{ color:#fff; }
[data-theme="dark"] .mp-outcome{ background:rgba(215,178,100,0.10); }
[data-theme="dark"] .mp-outcome-text{ color:#f3ecff; }
[data-theme="dark"] .mp-table-wrap{ background:#1f1330; border-color:rgba(155,109,190,0.2); box-shadow:0 8px 48px rgba(0,0,0,0.5); }
[data-theme="dark"] .mp-table thead th{ background:linear-gradient(135deg,#3a1a48 0%,#2d1740 100%); color:#fff; }
[data-theme="dark"] .mp-table tbody th{ background:#1f1330; color:#f3ecff; }
[data-theme="dark"] .mp-table tbody td{ color:#e8ddf5; }
[data-theme="dark"] .mp-table tbody tr:nth-child(even) th, [data-theme="dark"] .mp-table tbody tr:nth-child(even) td{ background:#251838; }
[data-theme="dark"] .mp-table tbody th, [data-theme="dark"] .mp-table tbody td{ border-bottom-color:rgba(155,109,190,0.16); }
[data-theme="dark"] .mp-row-strong td{ color:#e8b8f0; }
[data-theme="dark"] .mp-yes{ background:rgba(232,184,240,0.14); color:#e8b8f0; }
[data-theme="dark"] .mp-no{ color:rgba(217,168,205,0.45); }
[data-theme="dark"] .mp-hint{ color:#c9a3d9; }

/* Responsive */
@media (max-width:1000px){
  .mp-split{ grid-template-columns:1fr; gap:24px; }
  .mp-list-col{ flex-direction:row; overflow-x:auto; scroll-snap-type:x mandatory; padding:4px 2px 12px; -webkit-overflow-scrolling:touch; }
  .mp-tab{ min-width:250px; flex-shrink:0; scroll-snap-align:start; }
  .mp-list-note{ display:none; }
}
@media (max-width:768px){
  .mp-philo{ padding:28px 22px; }
  .mp-panel{ padding:30px 22px 28px; border-radius:22px; }
  .mp-panel-top{ grid-template-columns:1fr; gap:26px; }
  .mp-arch{ margin:0 auto; }
  .mp-panel-body{ text-align:center; }
  .mp-rule{ margin-left:auto; margin-right:auto; }
  .mp-chips{ justify-content:center; }
  .mp-bridge-grid{ grid-template-columns:1fr; }
  .mp-bridge-plus{ margin:0 auto; }
  .mp-hint{ display:block; }
}
@media (max-width:560px){
  .mp-list{ grid-template-columns:1fr; }
  .mp-tab{ min-width:225px; padding:14px; }
  .mp-tab-avatar{ width:42px; height:42px; }
  .mp-btn{ width:100%; }

  .mp-table tbody th{ min-width:180px; font-size:16px; }
.mp-table tbody td{ font-size:16px; }
}
@media (prefers-reduced-motion:reduce){
  .mp-tab, .mp-btn{ transition:none; }
  .mp-panel{ animation:none; }

}
  /* ── Unified type scale: body 18px · secondary 16px · labels never below 14px ── */
.mp-journey span, .mp-philo-tag, .mp-tab-sub, .mp-tab-price small, .mp-list-note,
.mp-arch-unit, .mp-arch-alt, .mp-pill, .mp-card-label, .mp-outcome-label,
.mp-bridge-card .tag{ font-size:14px; }

.mp-tagline, .mp-summary span, .mp-chips li, .mp-select-billing button{ font-size:16px; }

.mp-tab-name, .mp-impact-card li, .mp-impact-note{ font-size:18px; }
.mp-summary b{ font-size:20px; }

/* ── FAQ-style accordion ── */
.mp-acc{ max-width:1000px; margin:0 auto 80px; }
.mp-acc-head{ text-align:center; margin-bottom:24px; }
.mp-acc-item{ background:var(--mp-card); border:1.5px solid var(--mp-border); border-radius:18px; margin-bottom:14px; box-shadow:var(--mp-shadow); overflow:hidden; transition:border-color .25s ease; }
.mp-acc-item.open{ border-color:var(--mp-eye); }
.mp-acc-h{ margin:0; font-size:inherit; }
.mp-acc-btn{ display:flex; align-items:center; justify-content:space-between; gap:20px; width:100%; text-align:left; padding:24px 28px; background:transparent; border:none; cursor:pointer; font-family:'Astrid Regular',serif; font-size:22px; font-weight:700; line-height:1.3; color:var(--mp-title); }
.mp-acc-btn:hover{ opacity:1; transform:none; background:rgba(124,92,191,0.06); }
.mp-acc-btn:focus-visible{ outline:3px solid rgba(215,178,100,0.7); outline-offset:-3px; }
.mp-acc-icon{ position:relative; flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--mp-gold); }
.mp-acc-icon::before, .mp-acc-icon::after{ content:""; position:absolute; top:50%; left:50%; width:14px; height:2px; border-radius:2px; background:#fff; transform:translate(-50%,-50%); transition:transform .3s ease; }
.mp-acc-icon::after{ transform:translate(-50%,-50%) rotate(90deg); }
.mp-acc-item.open .mp-acc-icon::after{ transform:translate(-50%,-50%) rotate(0deg); }

.mp-acc-panel{ display:grid; grid-template-rows:0fr; visibility:hidden; transition:grid-template-rows .4s cubic-bezier(.25,1,.5,1), visibility 0s linear .4s; }
.mp-acc-item.open .mp-acc-panel{ grid-template-rows:1fr; visibility:visible; transition:grid-template-rows .4s cubic-bezier(.25,1,.5,1), visibility 0s; }
.mp-acc-inner{ overflow:hidden; min-height:0; }
.mp-acc-body{ padding:4px 28px 32px; text-align:left; }

/* content inside the accordion: left aligned, full width */
.mp-acc-body .mp-impact-lead{ margin-bottom:12px; }
.mp-acc-body .mp-impact-body{ max-width:none; margin:0 0 28px; }
.mp-acc-body .mp-impact-cols{ max-width:none; margin:0 0 24px; }
.mp-acc-body .mp-impact-principle{ max-width:none; margin:0 0 32px; }
.mp-acc-body .mp-impact-note{ max-width:none; margin:20px 0 0; }
.mp-acc-body .mp-bridge-grid{ max-width:none; margin:0 0 24px; }
.mp-acc-body .mp-bridge-note{ max-width:none; margin:0; }
.mp-acc-body .mp-table-wrap{ max-width:none; margin:0; }

@media (max-width:560px){
  .mp-acc-btn{ padding:20px 18px; }
  .mp-acc-body{ padding:4px 18px 26px; }
}
@media (prefers-reduced-motion:reduce){
  .mp-acc-panel, .mp-acc-icon::before, .mp-acc-icon::after{ transition:none; }
}
`;

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComparisonCell({ value }: { value: string }) {
  if (value === "✓") return <span className="mp-yes" aria-label="Included"><CheckIcon /></span>;
  if (value === "—") return <span className="mp-no" aria-label="Not included">—</span>;
  return <span className="mp-text">{value}</span>;
}

function PlanGlyph({ index, size = 22 }: { index: number; size?: number }) {
  // 0 = Belong (heart), 1 = Grow (arrow up), 2 = Influence (star),
  // 3 = Partner (linked circles), 4 = Legacy Partner (diamond)
  if (index === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="currentColor" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 20V5M5.5 11.5L12 5l6.5 6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.8l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 2.8z" fill="currentColor" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="12" r="5.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="15" cy="12" r="5.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  // 4 = Legacy Partner (diamond)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5l8.5 9.5L12 21.5 3.5 12 12 2.5z" fill="currentColor" />
    </svg>
  );
}

function MembershipSection() {
  const [activeTier, setActiveTier] = useState<HubTier>("BELONG");
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");
  const [purpose, setPurpose] = useState<typeof MEMBERSHIP_PURPOSES[number]["id"]>("enquiry");
  const [submitted, setSubmitted] = useState(false);
const [sending, setSending] = useState(false);
const [openAcc, setOpenAcc] = useState<string | null>(null); // only one panel open at a time
  const meta = HUB_TIER_META[activeTier];
  const activeIdx = HUB_TIERS.indexOf(activeTier);

  // controlled fields so we can read + send them
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [industry, setIndustry]   = useState("");
  const [notes, setNotes]         = useState("");
  const [agreed, setAgreed]       = useState(true);

  const money = (n: number) => `$${n.toLocaleString("en-AU")}`;
  const billingLabel = billing === "annual" ? "Annual" : "Monthly";

  const selectPlan = (t: HubTier) => {
    setActiveTier(t);
    setSubmitted(false);
  };

  const choosePlan = (t: HubTier) => {
    selectPlan(t);
    // wait one tick so the form has updated, then scroll to it
    setTimeout(() => {
      document.getElementById("membership-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert("Please fill in your name and email before submitting.");
      return;
    }

    if (!agreed) {
      alert("Please agree to the Privacy Policy and Terms & Conditions.");
      return;
    }

    // ALL variables referenced anywhere in the shared EmailJS template are
    // always sent — "" for unused ones — so nothing renders as "undefined".
    const templateParams = {
      form_source: "Ellevation Hub — Membership Expression of Interest",
      logo_url: "https://ellvation-ecosystem.web.app/assets/Ellevation-darkmode-logo.png",

      // e.g. "Grow — Growth Member (Annual $550)"
      membership_tier: `${meta.label} — ${meta.name} (${billingLabel} ${money(billing === "annual" ? meta.annual : meta.monthly)})`,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone || "",

      // Ms. Ellevation-only fields — blank, since this is the Hub form
      location: "",
      profession: "",
      referral: "",
      goals: "",

      // Hub Membership fields
      purpose: MEMBERSHIP_PURPOSES.find(p => p.id === purpose)?.label || "",
      industry: industry,
      notes: notes,

      // Hub Connect / enquiry-only fields — blank, since this is Membership
      enquiry_type: "",
      organization: "",
      message: "",
    };

    console.log("Sending to EmailJS:", templateParams);
    setSending(true);
    try {
      const response = await emailjs.send(
        "service_ux9vfej",
        "template_i4p3erl",
        templateParams,
        { publicKey: "Pu2wZN2ERnHjdboLI" }
      );
      console.log("EmailJS SUCCESS:", response);
      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS FAILED:", error);
      alert("Your request could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="hub-membership-section mp"
      style={{ padding: "100px 24px", background: "#fff" }}
    >
      <style>{MEMBERSHIP_CSS}</style>

      <div className="mp-wrap">
        {/* ── 1. HEADER ── */}
        <div className="mp-head">
          <p className="mp-eye">Ellevation Hub · Membership Program</p>
          <h2 className="mp-title">Choose Your Pathway Into the Hub</h2>
          <div className="mp-journey" aria-label="Membership journey">
  <span>Belong</span><i>→</i><span>Grow</span><i>→</i><span>Influence</span><i>→</i><span>Partner</span><i>→</i><span>Legacy Partner</span>
          </div>
<p className="mp-tagline">Visibility • Opportunities • Partnerships • Influence • Community Impact</p>
<p className="mp-question">How do I create opportunities and impact?</p>
        </div>

        {/* ── 2. PHILOSOPHY ── */}
        <div className="mp-philo">
          <h3>Membership Philosophy</h3>
          <p>
            Ellevation Hub membership is more than a membership. It is a pathway to belonging, opportunities, visibility, partnerships, leadership and community impact. Members join a growing ecosystem designed to support CALD communities, professionals, entrepreneurs, businesses, organisations and emerging leaders.
          </p>
         <p>
  All membership packages offer Flexible Monthly Payment Plans Available. Each tier retains the Ellevation Hub principle of business growth creating wider community impact.
</p>
<span className="mp-philo-tag">Flexible Monthly Payment Plans Available on all packages</span>
 </div>

        {/* ── 3. PLANS (selector left, details right) ── */}
        <div className="mp-plans-head">
          <p className="mp-eye">Choose Your Path</p>
          <h3 className="mp-block-title">Find the Membership That Fits Where You Are</h3>
        </div>

        <div className="mp-split">
          {/* LEFT — plan selector */}
          <div className="mp-list-col" role="tablist" aria-label="Membership plans" aria-orientation="vertical">
            {HUB_TIERS.map((t, idx) => {
              const m = HUB_TIER_META[t];
              return (
                <button
                  key={t}
                  role="tab"
                  id={`mp-tab-${t}`}
                  aria-selected={t === activeTier}
                  aria-controls="mp-panel"
                  className={`mp-tab mp-t-${idx} ${t === activeTier ? "active" : ""}`}
                  onClick={() => selectPlan(t)}
                >
                  <span className="mp-tab-avatar"><PlanGlyph index={idx} /></span>
                  <span className="mp-tab-text">
                    <span className="mp-tab-name">{m.label}</span>
                    <span className="mp-tab-sub">{m.purpose}</span>
                  </span>
                  <span className="mp-tab-price">
                    <strong>{money(m.annual)}</strong>
                    <small>per year</small>
                  </span>
                </button>
              );
            })}
            <p className="mp-list-note">Prefer to pay monthly? Every plan has a monthly option.</p>
          </div>

          {/* RIGHT — selected plan details */}
          <article
            key={activeTier}
            id="mp-panel"
            role="tabpanel"
            aria-labelledby={`mp-tab-${activeTier}`}
            className={`mp-panel mp-t-${activeIdx}`}
          >
            <div className="mp-panel-glow" />

            <div className="mp-panel-top">
              <div className="mp-arch">
                <div className="mp-arch-inner">
                  <span className="mp-arch-icon"><PlanGlyph index={activeIdx} size={26} /></span>
                  <span className="mp-arch-name">{meta.label}</span>
                  <span className="mp-arch-price">{money(meta.annual)}</span>
                  <span className="mp-arch-unit">per year</span>
                  <span className="mp-arch-alt">or {money(meta.monthly)} per month</span>
                </div>
              </div>

              <div className="mp-panel-body">
                <span className="mp-pill">{meta.purpose}</span>
                <span className="mp-rule" />
                <h3 className="mp-panel-title">{meta.name}</h3>
                <p className="mp-panel-quote">"{meta.quote}"</p>

                <p className="mp-card-label">Popular With</p>
                <ul className="mp-chips">
                  {meta.popular.map(p => <li key={p}>{p}</li>)}
                </ul>

               <button className="mp-btn" onClick={() => choosePlan(activeTier)}>
  JOIN {meta.label.toUpperCase()}
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</button>
              </div>
            </div>

            <div className="mp-panel-bottom">
              <p className="mp-card-label">What's Included</p>
              <ul className="mp-list">
                {meta.included.map(item => (
                  <li key={item} className={`mp-list-item ${item.startsWith("Everything in") ? "mp-list-item-lead" : ""}`}>
                    <span className="mp-list-check"><CheckIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mp-outcome">
                <span className="mp-outcome-label">Outcome</span>
                <p className="mp-outcome-text">{meta.outcome}</p>
              </div>
            </div>
          </article>
        </div>

        {/* ── 4. COMPARISON TABLE ── */}
        <div className="mp-compare">
          <p className="mp-eye">Compare Packages</p>
          <h3 className="mp-block-title">Annual &amp; Monthly Membership Comparison</h3>

          <div className="mp-table-wrap" role="region" aria-label="Membership comparison table" tabIndex={0}>
            <table className="mp-table">
              <thead>
                <tr>
                  <th scope="col" className="mp-th-feature">Category</th>
                  {HUB_TIERS.map(t => <th key={t} scope="col">{HUB_TIER_META[t].label}</th>)}
                </tr>
              </thead>
              <tbody>
                {MEMBERSHIP_COMPARISON.map(row => (
                  <tr key={row.label} className={MEMBERSHIP_STRONG_ROWS.has(row.label) ? "mp-row-strong" : ""}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i}><ComparisonCell value={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mp-hint">Swipe sideways to see every plan on smaller screens.</p>
        </div>

   {/* ── 4b + 5. MORE INFORMATION (FAQ-style accordion) ── */}
<div className="mp-acc">
  <div className="mp-acc-head">
    <p className="mp-eye">More Information</p>
  </div>

  {/* Community Impact Contribution */}
  <MpAccordionItem
    id="impact"
    title="Why the Community Impact Contribution Matters"
    open={openAcc === "impact"}
    onToggle={() => setOpenAcc(openAcc === "impact" ? null : "impact")}
  >
    <p className="mp-impact-lead">Business growth that helps create the next opportunity.</p>
    <p className="mp-impact-body">
      The Community Impact Contribution is a give-back mechanism attached only to successful business referrals generated through the Ellevation Hub ecosystem. When the Hub introduces a member to a new client and that referral becomes paid business, a small percentage of the first referral-generated invoice is reinvested into initiatives that create opportunities for other people, businesses and community ideas.
    </p>

    <div className="mp-impact-cols">
      <div className="mp-impact-card">
        <h4>What it means for the member</h4>
        <ul>{IMPACT_CONTRIBUTION_MEMBER.map(t => <li key={t}><span className="mp-list-check"><CheckIcon /></span>{t}</li>)}</ul>
      </div>
      <div className="mp-impact-card">
        <h4>Why it matters to the ecosystem</h4>
        <ul>{IMPACT_CONTRIBUTION_ECOSYSTEM.map(t => <li key={t}><span className="mp-list-check"><CheckIcon /></span>{t}</li>)}</ul>
      </div>
    </div>

    <p className="mp-impact-principle">
      <strong>The principle:</strong> When Ellevation Hub helps generate a new paying opportunity, a small part of that first successful transaction helps create opportunities for others.
    </p>

    <h4 className="mp-impact-subhead">Community Impact Contribution rates</h4>
    <div className="mp-table-wrap" role="region" aria-label="Contribution rates" tabIndex={0}>
      <table className="mp-table" style={{ minWidth: 560 }}>
        <thead>
          <tr><th className="mp-th-feature">Tier</th><th>Contribution</th><th>Applies To</th></tr>
        </thead>
        <tbody>
          {IMPACT_CONTRIBUTION_RATES.map(r => (
            <tr key={r.tier}>
              <th scope="row">{r.tier}</th>
              <td><strong>{r.rate}</strong></td>
              <td>{r.applies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="mp-impact-note">
      <strong>Where the contribution can help:</strong> future small-business grants or support programs, emerging entrepreneurs, community initiatives, women-led ventures, business ideas needing connections or investment pathways, and other opportunity programs aligned with the ecosystem's purpose.
    </p>
    <p className="mp-impact-note">
      <strong>Priority Business Service List:</strong> Legacy Partners receive priority visibility and referral consideration when community members, businesses or organisations seek trusted services. Consideration is based on relevance, availability, location and community needs. Membership or listing does not guarantee referrals or paid work. It means the business is considered first where the service request is relevant and appropriate.
    </p>
  </MpAccordionItem>

  {/* Hub + Ms Ellevation (Hub left, Ms Ellevation right) */}
  <MpAccordionItem
    id="together"
    title="How Ellevation Hub and Ms Ellevation Work Together"
    open={openAcc === "together"}
    onToggle={() => setOpenAcc(openAcc === "together" ? null : "together")}
  >
    <div className="mp-bridge-grid">
      <div className="mp-bridge-card">
        <span className="tag">BUILDING OPPORTUNITY</span>
        <h4>Ellevation Hub</h4>
        <p>Opportunities, business visibility, employment, partnerships and community impact.</p>
      </div>
      <div className="mp-bridge-plus" aria-hidden="true">+</div>
      <div className="mp-bridge-card">
        <span className="tag">BUILDING THE WOMAN</span>
        <h4>Ms Ellevation</h4>
        <p>Identity, confidence, wellbeing and leadership.</p>
      </div>
    </div>
    <p className="mp-bridge-note">
      The Ellevation Membership creates a bridge between both ecosystems, allowing women to grow personally and then access wider opportunities through Ellevation Hub.
    </p>
  </MpAccordionItem>
</div>

        {/* ── 6. FORM ── */}
        <div id="membership-form" className="mp-form-wrap">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p className="hub-form-eye" style={mb.pageEye}>EXPRESSION OF INTEREST</p>
            <h2 className="hub-form-title" style={{ ...jp.formTitle, fontSize: "clamp(36px,5vw,52px)" }}>Ready to Join? Reach Out</h2>
            <p className="hub-form-sub" style={{ ...jp.formSub, maxWidth: 520, margin: "8px auto 0" }}>
              Pick your package, then submit an Expression of Interest below. Our team will follow up shortly.
            </p>
          </div>

          <div style={mb.tabsRow}>
            {HUB_TIERS.map(t => (
              <button
                key={t}
                className={`hub-tier-tab${activeTier === t ? " active" : ""}`}
                style={{ ...mb.tabBtn, ...(activeTier === t ? { ...mb.tabActive, background: "#D7B264" } : {}) }}
                onClick={() => { setActiveTier(t); setSubmitted(false); }}
              >
                {HUB_TIER_META[t].label}
              </button>
            ))}
          </div>

          <div className="hub-form-card" style={{ ...jp.card, borderTop: `3px solid ${meta.color}` }}>
            <div style={jp.formHeader}>
              <h2 className="hub-form-title" style={jp.formTitle}>{meta.label} · {meta.name}</h2>
              <p className="hub-form-sub" style={jp.formSub}>“{meta.quote}”</p>
            </div>

            <div className="mp-summary">
              <div>
                <b>{money(billing === "annual" ? meta.annual : meta.monthly)}</b>{" "}
                <span>/ {billing === "annual" ? "year" : "month"} · {meta.purpose}</span>
              </div>
              <div className="mp-select-billing">
                <button type="button" className={billing === "annual" ? "on" : ""} onClick={() => setBilling("annual")}>ANNUAL</button>
                <button type="button" className={billing === "monthly" ? "on" : ""} onClick={() => setBilling("monthly")}>MONTHLY</button>
              </div>
            </div>

            <div className="hub-divider" style={mb.divider} />

            {submitted ? (
              <div style={{ textAlign: "center", padding: "12px 0 8px" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
                <h3 className="hub-form-title" style={{ ...jp.formTitle, fontSize: "1.4rem" }}>Expression of Interest Received</h3>
                <p className="hub-form-sub" style={jp.formSub}>
                  Thank you for your interest in {meta.label} Membership. Our team will follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="hub-form-label" style={mb.formLabel}>Membership Expression of Interest</p>
                <div style={mb.purposeRow}>
                  {MEMBERSHIP_PURPOSES.map(p => (
                    <label
                      key={p.id}
                      className="hub-purpose-tile"
                      style={{
                        ...mb.purposeTile,
                        borderColor: purpose === p.id ? meta.color : "#ded4ee",
                        background: purpose === p.id ? `${meta.color}14` : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="membershipPurpose"
                        value={p.id}
                        checked={purpose === p.id}
                        onChange={() => setPurpose(p.id)}
style={{ accentColor: meta.color, cursor: "pointer", width: 20, height: 20, marginTop: 2, flexShrink: 0 }}
                      />
                      <span>
                        <span className="hub-purpose-label" style={mb.purposeLabel}>{p.label}</span>
                        <span className="hub-purpose-desc" style={mb.purposeDesc}>{p.desc}</span>
                      </span>
                    </label>
                  ))}
                </div>

                <div className="hub-form-row" style={{ ...jp.row, marginTop: 20 }}>
                  <input className="hub-input" style={jp.input} placeholder="First Name" required
                    value={firstName} onChange={e => setFirstName(e.target.value)} />
                  <input className="hub-input" style={jp.input} placeholder="Last Name" required
                    value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <input className="hub-input" style={{ ...jp.input, marginTop: 16 }} type="email" placeholder="Professional Email" required
                  value={email} onChange={e => setEmail(e.target.value)} />
                <input className="hub-input" style={{ ...jp.input, marginTop: 16 }} type="tel" placeholder="Phone Number (optional)"
                  value={phone} onChange={e => setPhone(e.target.value)} />
                <select className="hub-input hub-select" style={{ ...jp.input, ...jp.select, marginTop: 16 }}
                  value={industry} onChange={e => setIndustry(e.target.value)}>
                  <option value="">Select Your Industry</option>
                  <option>Technology</option>
                  <option>Education</option>
                  <option>Leadership</option>
                  <option>Other</option>
                </select>
                <textarea
                  className="hub-input"
                  style={{ ...jp.input, marginTop: 16, resize: "vertical" as const }}
             rows={5}
placeholder="Anything you'd like us to know? (optional)"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />

                {/* Privacy Policy & Terms agreement */}
                <label
                  className="hub-form-sub"
                 style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 24, fontSize: "16px", cursor: "pointer" }}
>
  <input
    type="checkbox"
    checked={agreed}
    onChange={e => setAgreed(e.target.checked)}
    required
    style={{ accentColor: "#4B1E56", marginTop: 3, width: 20, height: 20, cursor: "pointer", flexShrink: 0 }}
  />
                  <span>
                    I agree to the{" "}
                    <a href="/privacy-policy" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Privacy Policy</a>
                    {" "}and{" "}
                    <a href="/terms" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Terms &amp; Conditions</a>
                  </span>
                </label>

                <button type="submit" disabled={sending} style={{ ...jp.submitBtn, background: "#D7B264", opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}>
                  {sending ? "SENDING..." : "SUBMIT EXPRESSION OF INTEREST"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MpAccordionItem({
  id, title, open, onToggle, children,
}: { id: string; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className={`mp-acc-item${open ? " open" : ""}`}>
      <h3 className="mp-acc-h">
        <button
          type="button"
          id={`mp-acc-btn-${id}`}
          className="mp-acc-btn"
          aria-expanded={open}
          aria-controls={`mp-acc-panel-${id}`}
          onClick={onToggle}
        >
          <span>{title}</span>
          <span className="mp-acc-icon" aria-hidden="true" />
        </button>
      </h3>
      <div id={`mp-acc-panel-${id}`} role="region" aria-labelledby={`mp-acc-btn-${id}`} className="mp-acc-panel">
        <div className="mp-acc-inner">
          <div className="mp-acc-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

function DirectorySection({ nav }: { nav: NavFn }) {
  return (
    <section className="hub-directory-section" style={dr.section}>
      <div style={dr.container}>
        <p className="hub-directory-eye" style={dr.eye}>THE DIRECTORY</p>
        <h2 className="hub-directory-title" style={dr.title}>Discover Businesses Built by Our Community</h2>
        <p className="hub-directory-sub" style={dr.sub}>Browse verified listings across categories, or add your own business to the directory.</p>
        <div className="hub-directory-grid" style={dr.grid}>
          {DIRECTORY_CATEGORIES.map(c => (
            <div key={c.title} className="hub-directory-card" style={dr.card}>
              <div style={dr.icon}>{c.icon}</div>
              <h3 className="hub-directory-card-title" style={dr.cardTitle}>{c.title}</h3>
              <p className="hub-directory-card-count" style={dr.cardCount}>{c.count}</p>
            </div>
          ))}
        </div>
        <button style={dr.ctaBtn} onClick={() => nav("connect")}>LIST YOUR BUSINESS</button>
      </div>
    </section>
  );
}

function ProgramsSection({ nav }: { nav: NavFn }) {
  const path = useInView(0.08);
  const who = useInView(0.1);
  const part = useInView(0.1);
  const eco = useInView(0.1);
  const cta = useInView(0.12);

  return (
    <div>
      {/* 1 ── HEADER */}
      <section className="hub-programs-section" style={{ ...pg.section, paddingBottom: 60 }}>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <p className="hub-programs-eye" style={pg.eye}>OUR PROGRAMS</p>
          <h2 className="hub-programs-title" style={{ ...pg.title, marginBottom: 20 }}>
            Development Pathways for Growth, Leadership and Opportunity
          </h2>
        <p className="hub-programs-card-text" style={pg.lead}>
  Creating pathways for individuals, businesses, and communities to build confidence, strengthen leadership, and access new opportunities.
</p>
          <p className="hub-programs-card-title" style={pg.tagline}>
            From childhood to leadership. From ideas to opportunity.
          </p>
          <button style={pg.ctaBtn} onClick={() => nav("register")}>REGISTER OR REQUEST SUPPORT</button>
        </div>
      </section>

      {/* 2 ── OUR PATHWAYS (each card has a "Register Now!" button) */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
        <div ref={path.ref} style={{ ...ab.container, ...fade(path.inView, 0) }}>
          <h2 className="hub-about-title" style={ab.title}>Our Pathways</h2>
          <div className="hub-programs-grid" style={pg.pathGrid}>
            {PROGRAM_PATHWAYS.map((p, i) => (
              <div key={p.title} className="hub-about-card" style={{ ...ab.card, ...fade(path.inView, 100 + i * 80) }}>
                <div style={ab.icon}>{p.icon}</div>
                <h3 className="hub-about-card-title" style={ab.cardTitle}>{p.title}</h3>
                {p.desc && <p className="hub-about-card-text" style={ab.cardText}>{p.desc}</p>}
                {p.focus && (
                  <>
                    <p className="hub-about-eye" style={{ ...ab.eyeLeft, marginTop: 18 }}>FOCUS AREAS</p>
                    <ul style={pg.focusList}>
                      {p.focus.map(f => (
                        <li key={f} className="hub-about-card-text" style={pg.focusItem}>
                          <span style={pg.focusDot}>✓</span>{f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {p.tag && <span className="hub-programs-chip" style={pg.chip}>{p.tag}</span>}
<button style={pg.registerBtn} onClick={() => nav("register", p.title)}>REGISTER NOW</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 ── WHO WE SUPPORT */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={who.ref} style={{ ...ab.container, ...fade(who.inView, 0) }}>
<p className="hub-about-eye" style={ab.eye}>WHO WE SUPPORT</p>
<h2 className="hub-about-title" style={ab.title}>Every Community. Every Pathway.</h2>          <div style={pg.chipRow}>
            {PROGRAMS_WHO_WE_SUPPORT.map(w => (
              <span key={w} className="hub-programs-chip" style={pg.chip}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── PARTNERS & COLLABORATORS */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
        <div ref={part.ref} style={{ ...ab.containerNarrow, ...fade(part.inView, 0) }}>
          <h2 className="hub-about-title" style={{ ...ab.title, marginBottom: 24 }}>Partners &amp; Collaborators</h2>
<p className="hub-about-sub" style={ab.para}>
  We work alongside community organisations, businesses, educators, government, and supporters to create opportunities that strengthen communities and create lasting impact.
</p>
          <p className="hub-about-sub" style={{ ...ab.para, fontWeight: 600, color: "#4B1E56" }}>
            We welcome partnerships with:
          </p>
          <div style={pg.chipRow}>
           {PROGRAMS_PARTNERS.map(w => (
  <span key={w} className="hub-programs-chip" style={pg.chip}>{w}</span>
))}
</div>
          <div style={{ marginTop: 36 }}>
            <button style={pg.ctaBtn} onClick={() => nav("connect")}>PARTNER WITH US</button>
          </div>
        </div>
      </section>

      {/* 5 ── THE ELLEVATION ECOSYSTEM (Hub left, Ms Ellevation right) */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={eco.ref} style={{ ...ab.container, ...fade(eco.inView, 0) }}>
<p className="hub-about-eye" style={ab.eye}>THE ELLEVATION ECOSYSTEM</p>
<h2 className="hub-about-title" style={ab.title}>Two Pathways. One Connected Journey.</h2>          <div style={ab.gridAuto}>
            {PROGRAMS_ECOSYSTEM.map((item, i) => (
              <div key={item.title} className="hub-about-card" style={{ ...ab.card, ...fade(eco.inView, 100 + i * 100) }}>
                <p className="hub-about-eye" style={ab.eyeLeft}>{item.eyebrow}</p>
                <h3 className="hub-about-card-title" style={{ ...ab.cardTitle, fontSize: "22px" }}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.line}</p>
              </div>
            ))}
            <div className="hub-about-card" style={{ ...ab.card, ...ab.cardHighlight, ...fade(eco.inView, 300) }}>
<p style={{ ...ab.eyeLeft, color: "#D7B264" }}>TOGETHER</p>
<p style={{ ...ab.cardText, color: "rgba(255,255,255,0.9)" }}>
  Creating pathways that help people, businesses, and communities grow, connect, lead, and create lasting impact.
</p>        
            </div>
          </div>
        </div>
      </section>

      {/* 6 ── FINAL CTA */}
      <section className="hub-about-section hub-about-cta" style={ab.ctaSection}>
        <div ref={cta.ref} style={{ ...ab.containerNarrow, ...fade(cta.inView, 0) }}>
          <h2 style={{ ...ab.title, color: "#fff", marginBottom: 20 }}>Opportunity Starts with Access.</h2>
<p style={{ ...ab.para, color: "rgba(255,255,255,0.85)" }}>
  Whether you're looking to learn, lead, grow a business, support your community, or collaborate with others, there's a place for you within the Ellevation ecosystem.
</p>
          <div style={ab.ctaRow}>
            <button style={ab.ctaPrimary} onClick={() => nav("membership")}>JOIN MEMBERSHIP</button>
            <button style={ab.ctaSecondary} onClick={() => nav("connect")}>PARTNER WITH US</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Opportunity listing card + quick-apply flow ── */
function OpportunityListingCard({ o, onApply }: { o: OpportunityListing; onApply: (o: OpportunityListing) => void })
 {
  
  return (
    <div className="hub-opportunities-list-card" style={op.listCard}>
      <div style={op.listBadgeRow}>
        <span style={op.typeBadge}>{o.type}</span>
        <span style={op.categoryPill}>{o.category}</span>
      </div>
      <p style={op.listMeta}>{o.org} · {o.location}</p>
      <h3 className="hub-opportunities-list-title" style={op.listTitle}>{o.title}</h3>
      <p className="hub-opportunities-list-text" style={op.listText}>{o.desc}</p>
      <div style={op.listFooterRow}>
        <span style={op.deadline}>Deadline: {o.deadline}</span>
        <button style={op.applyBtn} onClick={() => onApply(o)}>APPLY NOW</button>
      </div>
    </div>
  );
}

/* Quick-apply modal — lightweight interest-capture step for the demo
   opportunity board (hands off to the listing's own applyUrl). Not wired to
   EmailJS; wire it like MembershipSection if you want these in your inbox. */
function QuickApplicationModal({ listing, onClose }: { listing: OpportunityListing; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitRegistration({
        brand: "hub",
        formTitle: "Opportunity Application",
        itemLabel: "Opportunity",
        itemName: listing.title,
        formSource: "Ellevation Hub — Opportunity Application",
        fields: {
          "Full Name": name,
          "Email": email,
          "Phone": phone,
          "Message": message,
          "Organisation": listing.org,
          "Type": listing.type,
          "Location": listing.location,
          "Deadline": listing.deadline,
        },
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Hub opportunity error:", err);
      alert(`Your application could not be sent. Please try again.\n\nError: ${err?.text || err?.message || "Unknown error"}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={op.modalOverlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="hub-opportunities-modal" style={op.modalCard}>
        <button aria-label="Close" onClick={onClose} style={op.modalClose}>✕</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 8px 8px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <h3 style={op.modalTitle}>Application Received</h3>
            <p style={op.modalSub}>
              Your expression of interest for <strong>{listing.title}</strong> has been received. Continue below to complete your full application.
            </p>
            <a
              href={listing.applyUrl}
              target="_blank"
              rel="noreferrer"
              style={{ ...op.applyBtn, display: "inline-block", marginTop: 20, textDecoration: "none", textAlign: "center" as const }}
            >
              CONTINUE TO FULL APPLICATION →
            </a>
          </div>
        ) : (
          <>
            <span style={op.modalEyebrow}>{listing.type} · {listing.location}</span>
            <h3 className="hub-opportunities-list-title" style={op.modalTitle}>{listing.title}</h3>
            <p style={op.modalSub}>Quick expression of interest — we'll follow up with next steps for this opportunity.</p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
              <input
                className="form-input"
                required
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                className="form-input"
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                className="form-input"
                type="tel"
                placeholder="Phone Number (optional)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <textarea
                className="form-input"
                rows={3}
                style={{ resize: "vertical" }}
                placeholder="Anything you'd like to share? (optional)"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button type="submit" disabled={sending} style={op.modalSubmitBtn}>
                {sending ? "SENDING..." : "SUBMIT EXPRESSION OF INTEREST"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function OpportunitiesSection({ nav }: { nav: NavFn }) {
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory>("All Openings");
  const [applying, setApplying] = useState<OpportunityListing | null>(null);

  const filteredListings = activeCategory === "All Openings"
    ? OPPORTUNITY_LISTINGS
    : OPPORTUNITY_LISTINGS.filter(o => o.category === activeCategory);

  return (
    <section className="hub-opportunities-section" style={op.section}>
      {/* Decorative ambient blurs, matching Events section styling */}
      <div style={{ position: "absolute", top: "-10%", right: "-6%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(75,30,86,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-8%", left: "-6%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,191,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={op.container}>
        <p className="hub-opportunities-eye" style={op.eye}>OPPORTUNITY BOARD</p>
        <h2 className="hub-opportunities-title" style={op.title}>Real Pathways. Real Access.</h2>
        <p className="hub-opportunities-sub" style={op.sub}>
          From jobs and collaborations to grants, professional development, and member-only openings — the Hub connects members to opportunities that move their goals forward.
        </p>

        {/* Compact overview of opportunity types */}
        <div className="hub-opportunities-grid" style={op.grid}>
          {OPPORTUNITY_TYPES.map(o => (
            <div key={o.title} className="hub-opportunities-card" style={op.card}>
              <div style={op.icon}>{o.icon}</div>
              <h3 className="hub-opportunities-card-title" style={op.cardTitle}>{o.title}</h3>
              <p className="hub-opportunities-card-text" style={op.cardText}>{o.desc}</p>
            </div>
          ))}
        </div>

        <div style={op.divider} />

        {/* Live, filterable openings board */}
        <p className="hub-opportunities-eye" style={op.boardEye}>CURRENT OPENINGS</p>
        <h3 className="hub-opportunities-title" style={op.boardTitle}>Browse What's Open Right Now</h3>

        <div className="hub-opportunities-filter-row" style={op.filterRow}>
          {OPPORTUNITY_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`hub-opportunities-filter${activeCategory === cat ? " active" : ""}`}
              style={{ ...op.filterBtn, ...(activeCategory === cat ? op.filterBtnActive : {}) }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredListings.length === 0 ? (
          <p className="hub-opportunities-empty" style={{ fontFamily: "'Montserrat',sans-serif", color: "#662369", padding: "24px 0" }}>
            No open listings in this category right now — check back soon.
          </p>
        ) : (
          <div className="hub-opportunities-listing-grid" style={op.listGrid}>
            {filteredListings.map((o, i) => (
              <OpportunityListingCard key={o.title || i} o={o} onApply={setApplying} />
            ))}
          </div>
        )}

        <div style={{ marginTop: 48 }}>
          <button style={op.ctaBtn} onClick={() => nav("membership")}>BECOME A MEMBER FOR FULL ACCESS</button>
        </div>
      </div>

      {applying && (
        <QuickApplicationModal listing={applying} onClose={() => setApplying(null)} />
      )}
    </section>
  );
}

// ── Event card + quick registration flow ──
type EventItem = {
  day: string;
  month: string;
  tag: string;
  category: Exclude<EventCategory, "All Events">;
  title: string;
  desc: string;
  location: string;
  price: string;
  registrationUrl: string;
};

function HubEventCard({ e, onRegister }: { e: EventItem; index: number; onRegister: (e: EventItem) => void }) {
  return (
    <div className="hub-events-card" style={evs.card}>
      <span style={evs.dateBadge}>{e.day} {e.month}</span>
      <span style={evs.categoryPill}>{e.category}</span>
      <span style={evs.category}>{e.tag} · {e.location} · {e.price}</span>
      <h3 className="hub-events-card-title" style={evs.cardTitle}>{e.title}</h3>
      <p className="hub-events-card-text" style={evs.cardText}>{e.desc}</p>
      <button style={evs.rsvpBtn} onClick={() => onRegister(e)}>REGISTER NOW</button>
    </div>
  );
}

/* Quick Registration modal — demo-only interest capture, not wired to EmailJS. */
function QuickRegistrationModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendees, setAttendees] = useState("1");

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSending(true);
    try {
      await submitRegistration({
        brand: "hub",
        formTitle: "Event Registration",
        itemLabel: "Event",
        itemName: event.title,
        formSource: "Ellevation Hub — Event Registration",
        fields: {
          "Full Name": name,
          "Email": email,
          "Phone": phone,
          "Attendees": attendees,
          "Date": `${event.day} ${event.month}`,
          "Location": event.location,
          "Price": event.price,
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Your registration could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };
   

  return (
    <div
      style={evs.modalOverlay}
      onClick={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}
    >
      <div className="hub-events-modal" style={evs.modalCard}>
        <button aria-label="Close" onClick={onClose} style={evs.modalClose}>✕</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 8px 8px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <h3 style={evs.modalTitle}>You're on the list</h3>
            <p style={evs.modalSub}>
              Your quick registration for <strong>{event.title}</strong> has been received. Continue below to complete your official spot on the event's registration page.
            </p>
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              style={evs.modalCtaLink}
            >
              CONTINUE TO FULL REGISTRATION →
            </a>
          </div>
        ) : (
          <>
            <span style={evs.modalDateBadge}>{event.day} {event.month} · {event.location}</span>
            <h3 className="hub-events-card-title" style={evs.modalTitle}>{event.title}</h3>
            <p style={evs.modalSub}>Quick registration — we'll confirm your spot and send you the full event details.</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
  <input className="form-input" required placeholder="Full Name"
    value={name} onChange={e => setName(e.target.value)} />
  <input className="form-input" type="email" required placeholder="Email Address"
    value={email} onChange={e => setEmail(e.target.value)} />
  <input className="form-input" type="tel" placeholder="Phone Number (optional)"
    value={phone} onChange={e => setPhone(e.target.value)} />
  <select className="form-input" value={attendees} onChange={e => setAttendees(e.target.value)}>
    <option value="1">1 attendee</option>
    <option value="2">2 attendees</option>
    <option value="3">3 attendees</option>
    <option value="4+">4+ attendees</option>
  </select>
  <button type="submit" disabled={sending} style={evs.modalSubmitBtn}>
    {sending ? "SENDING..." : "SUBMIT QUICK REGISTRATION"}
  </button>
</form>
          </>
        )}
      </div>
    </div>
  );
}

function EventsSection({ events = [] }: { nav: NavFn; events?: EventItem[] }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All Events");
  const [registering, setRegistering] = useState<EventItem | null>(null);

  const filteredEvents = activeCategory === "All Events"
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section className="hub-events-section" style={{ ...evs.section, position: "relative", overflow: "hidden" }}>
      {/* Decorative ambient blurs */}
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(75,30,86,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,191,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ ...evs.container, position: "relative", zIndex: 1 }}>
        <p className="hub-events-eye" style={evs.eye}>UPCOMING EVENTS · PERTH</p>
        <h2 className="hub-events-title" style={evs.title}>Gather Across the Ecosystem</h2>
        <p className="hub-events-sub" style={evs.sub}>
          Community celebrations, sport and youth activities, business networking, workshops, and corporate events — all in one calendar. Listings below are demo events pending final confirmation.
        </p>

        <div className="hub-events-filter-row" style={evs.filterRow}>
          {EVENT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`hub-events-filter${activeCategory === cat ? " active" : ""}`}
              style={{ ...evs.filterBtn, ...(activeCategory === cat ? evs.filterBtnActive : {}) }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <p className="hub-events-empty" style={{ fontFamily: "'Montserrat',sans-serif", color: "#662369", padding: "24px 0" }}>
            No events in this category yet — check back soon.
          </p>
        ) : (
          <div className="hub-events-grid" style={evs.grid}>
            {filteredEvents.map((e, i) => (
              <HubEventCard key={e.title || i} e={e} index={i} onRegister={setRegistering} />
            ))}
          </div>
        )}
      </div>

      {registering && (
        <QuickRegistrationModal event={registering} onClose={() => setRegistering(null)} />
      )}
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="hub-impact-section" style={st.section}>

      {/* Community impact — who is being supported */}
      <p className="hub-impact-eye" style={st.sectionEye}>COMMUNITY IMPACT</p>
      <h2 className="hub-impact-title" style={st.bannerTitle}>Real Outcomes, Across Every Group We Support</h2>
     <p className="hub-impact-lead" style={st.lead}>
  From grassroots community initiatives to growing businesses, emerging leaders, young people, and families, here's how Ellevation Hub is creating pathways for confidence, connection, leadership, opportunity, and community impact.
</p>

      <div className="hub-impact-stats" style={st.statsGrid}>
        {IMPACT_STATS.map(s => (
          <div key={s.l} className="hub-impact-stat" style={st.statCard}>
            <p className="hub-impact-stat-num" style={st.statNum}>{s.n}</p>
            <p className="hub-impact-stat-label" style={st.statLabel}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Children & Youth (previously missing) */}
      <div className="hub-impact-subsection" style={st.subSection}>
        <p className="hub-impact-eye" style={st.sectionEye}>CHILDREN &amp; YOUTH</p>
        <h3 className="hub-impact-subtitle" style={st.subtitle}>Building Confidence, Skills and Future Opportunities</h3>
        <div className="hub-impact-cald-grid" style={st.caldGrid}>
          {CHILDREN_YOUTH_OUTCOMES.map(c => (
            <div key={c.title} className="hub-impact-cald-card" style={st.caldCard}>
              <div style={st.caldIcon}>{c.icon}</div>
              <h4 className="hub-impact-cald-title" style={st.caldTitle}>{c.title}</h4>
              <p className="hub-impact-cald-text" style={st.caldText}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CALD community outcomes */}
      <div className="hub-impact-subsection" style={st.subSection}>
        <p className="hub-impact-eye" style={st.sectionEye}>CALD COMMUNITY OUTCOMES</p>
        <h3 className="hub-impact-subtitle" style={st.subtitle}>Built With Perth's Diverse Communities in Mind</h3>
        <div className="hub-impact-cald-grid" style={st.caldGrid}>
          {CALD_OUTCOMES.map(c => (
            <div key={c.title} className="hub-impact-cald-card" style={st.caldCard}>
              <div style={st.caldIcon}>{c.icon}</div>
              <h4 className="hub-impact-cald-title" style={st.caldTitle}>{c.title}</h4>
              <p className="hub-impact-cald-text" style={st.caldText}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business growth and visibility results */}
      <div className="hub-impact-subsection" style={st.subSection}>
        <p className="hub-impact-eye" style={st.sectionEye}>BUSINESS GROWTH &amp; VISIBILITY</p>
<h3 className="hub-impact-subtitle" style={st.subtitle}>Real Outcomes for Directory Members</h3>        <div className="hub-impact-stats" style={st.statsGrid}>
          {BUSINESS_GROWTH_STATS.map(s => (
            <div key={s.l} className="hub-impact-stat" style={st.statCard}>
              <p className="hub-impact-stat-num" style={st.statNum}>{s.n}</p>
              <p className="hub-impact-stat-label" style={st.statLabel}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real stories and testimonials */}
      <div className="hub-impact-subsection" style={st.subSection}>
        <p className="hub-impact-eye" style={st.sectionEye}>REAL STORIES</p>
        <h3 className="hub-impact-subtitle" style={st.subtitle}>In Their Own Words</h3>
        <div className="hub-impact-grid" style={st.grid}>
          {[
            { q: "The Hub directory turned a casual connection into a six-figure corporate partnership.", n: "Elena R.", role: "Directory Member, Consulting" },
            { q: "The level of professional discourse within this ecosystem is simply unparalleled.", n: "Sarah W.", role: "Community Member" },
          ].map((s, i) => (
            <div key={i} className="hub-impact-card" style={st.card}>
              <p className="hub-impact-quote" style={st.quote}>"{s.q}"</p>
              <p className="hub-impact-name" style={st.name}>— {s.n}</p>
              <p className="hub-impact-role" style={st.role}>{s.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Programs in action */}
      <div className="hub-impact-subsection" style={st.subSection}>
        <p className="hub-impact-eye" style={st.sectionEye}>PROGRAMS IN ACTION</p>
<h3 className="hub-impact-subtitle" style={st.subtitle}>Where Opportunity Turns Into Action</h3>        <div className="hub-impact-programs-grid" style={st.programsGrid}>
          {PROGRAMS_IN_ACTION.map(p => (
            <div key={p.title} className="hub-impact-program-card" style={st.programCard}>
              <div style={st.programIcon}>{p.icon}</div>
              <h4 className="hub-impact-program-title" style={st.programTitle}>{p.title}</h4>
              <p className="hub-impact-program-text" style={st.programText}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future impact vision */}
      <div className="hub-impact-vision" style={st.visionBox}>
        <p className="hub-impact-vision-eye" style={st.visionEye}>FUTURE VISION</p>
<p className="hub-impact-vision-text" style={st.visionText}>We're building toward a future where every member of our community, regardless of background, has access to connection, opportunity, visibility, leadership pathways, and the support needed to create lasting impact.</p>      </div>
    </section>
  );
}

/* ── Connect: Hero Banner (reusable — also used by the Register page) ── */
function ConnectHero({
  eyebrow = "Connect With Us",
  title = "Ecosystem Hub Enquiry",
  text = "Whether you are looking to collaborate, seek programmatic guidance, or establish community connections, let us build pathways together.",
}: { eyebrow?: string; title?: string; text?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="events-hero"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(${banner2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "120px 24px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          ...fade(mounted, 0),
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, marginBottom: 24,
        }}>
          <div className={mounted ? "line-draw" : ""} style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)", transformOrigin: "right center" }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff" }}>
            {eyebrow}
          </span>
          <div className={mounted ? "line-draw" : ""} style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)", transformOrigin: "left center" }} />
        </div>

        <h1 style={{
          ...fade(mounted, 130),
          fontFamily: "'Astrid Regular', serif",
          fontSize: "clamp(36px,5vw,56px)",
          fontWeight: 700,
          color: "#fff", margin: "0 0 20px", lineHeight: 1.1,
        }}>
          {title}
        </h1>

        <p style={{
          ...fade(mounted, 260),
          fontFamily: "'Montserrat',sans-serif",
          fontSize: 18,
          color: "rgba(255,255,255,0.9)", maxWidth: 580, margin: "0 auto", lineHeight: 1.75,
        }}>
          {text}
        </p>

        <div style={{ ...fade(mounted, 380), marginTop: 40 }}>
          <div className="bounce-arrow">↓</div>
        </div>
      </div>
    </section>
  );
}

/* ── Connect: Unified Enquiry Form (wired to EmailJS) ── */
function CommonEnquiryForm() {
  const { ref, inView } = useInView(0.1);
  const [enquiryType, setEnquiryType] = useState("general");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitHov, setSubmitHov] = useState(false);

  // Controlled fields so we can build EmailJS params directly
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [agreed, setAgreed] = useState(true);

  const ENQUIRY_STREAM_LABELS: Record<string, string> = {
    general: "General Enquiry",
    partnership: "Partnership Engagement",
    connection: "Community Connection",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !emailAddress.trim() || !messageBody.trim()) {
      alert("Please fill in your name, email, and message before submitting.");
      return;
    }

    if (!agreed) {
      alert("Please agree to the Privacy Policy and Terms & Conditions.");
      return;
    }

    // Split "Full Name" into first/last so it maps onto the shared template's
    // {{first_name}} / {{last_name}} variables.
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const templateParams = {
      form_title: "New Ellevation Hub - Enquiry",
      ms_display: "none",
      hub_display: "block",
      subject_detail: ENQUIRY_STREAM_LABELS[enquiryType] || enquiryType,
      form_source: "Ellevation Hub — Enquiry",
      logo_url: "https://ellvation-ecosystem.web.app/assets/Ellevation-darkmode-logo.png",

      membership_tier: "",
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      phone: phoneNumber || "",

      // Ms. Ellevation-only fields — blank
      location: "",
      profession: "",
      referral: "",
      goals: "",

      // Hub Membership-only fields — blank
      purpose: "",
      industry: "",
      notes: "",

      // Hub Connect / enquiry fields
      enquiry_type: ENQUIRY_STREAM_LABELS[enquiryType] || enquiryType,
      organization: organizationName || "",
      message: messageBody,
    };

    console.log("Sending to EmailJS:", templateParams);
    setSending(true);

    try {
      const response = await emailjs.send(
        "service_ux9vfej",
        "template_i4p3erl",
        templateParams,
        { publicKey: "Pu2wZN2ERnHjdboLI" }
      );
      console.log("EmailJS SUCCESS:", response);
      setFormSubmitted(true);
    } catch (error) {
      console.error("EmailJS FAILED:", error);
      alert("Your request could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="enquiry-form-section" style={{ background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding: "80px 24px 100px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <div ref={ref} style={{ ...fade(inView, 0), textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#4B1E56", margin: "0 0 12px" }}>
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "'Astrid Regular', serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#4B1E56", margin: 0 }}>
            Unified Request Portal
          </h2>
        </div>

        <div style={{
          ...fade(inView, 120),
          background: "#fff",
          border: "1.5px solid rgba(124, 92, 191, 0.18)",
          borderRadius: 24,
          padding: "48px 40px",
          boxShadow: "0 16px 48px rgba(124,92,191,0.10)",
          position: "relative"
        }} className="form-wrapper-card">

          {formSubmitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <h3 style={{ fontFamily: "'Astrid Regular',serif", fontSize: 32, color: "#1a0a2e", marginBottom: 12 }}>Thank You</h3>
              <p style={{ fontFamily: "'Montserrat',sans-serif", color: "#554866", fontSize: 18, lineHeight: 1.6, maxWidth: 445, margin: "0 auto" }}>
                Your request has been successfully synchronized with our leadership network. We will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              <div>
                <label style={{ display: "block", fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4B1E56", marginBottom: 12 }}>
                  Enquiry Stream
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                  {[
                    { id: "general", label: "General Enquiry" },
                    { id: "partnership", label: "Partnership Engagement" },
                    { id: "connection", label: "Community Connection" }
                  ].map((stream) => (
                    <label
                      key={stream.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 16px",
                        borderRadius: 14,
                        border: "1.5px solid",
                        borderColor: enquiryType === stream.id ? "#4B1E56" : "rgba(124, 92, 191, 0.25)",
                        background: enquiryType === stream.id ? "rgba(75,30,86,0.06)" : "transparent",
                        cursor: "pointer",
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: 14,
                        fontWeight: enquiryType === stream.id ? 600 : 400,
                        color: "#1a0a2e",
                        transition: "all 0.2s ease"
                      }}
                      className="radio-tile"
                    >
                      <input
                        type="radio"
                        name="enquiryType"
                        value={stream.id}
                        checked={enquiryType === stream.id}
                        onChange={(e) => setEnquiryType(e.target.value)}
                        style={{ accentColor: "#4B1E56", cursor: "pointer" }}
                      />
                      {stream.label}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                <div>
                  <label htmlFor="fullName" className="field-label">Full Name *</label>
                  <input type="text" id="fullName" required className="form-input" placeholder="Your name"
                    value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="emailAddress" className="field-label">Email Address *</label>
                  <input type="email" id="emailAddress" required className="form-input" placeholder="name@domain.com"
                    value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                <div>
                  <label htmlFor="phoneNumber" className="field-label">Phone Number</label>
                  <input type="tel" id="phoneNumber" className="form-input" placeholder="Optional"
                    value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="organizationName" className="field-label">Organization / Community Group</label>
                  <input type="text" id="organizationName" className="form-input" placeholder="If applicable"
                    value={organizationName} onChange={e => setOrganizationName(e.target.value)} />
                </div>
              </div>

              <div>
                <label htmlFor="messageBody" className="field-label">
                  {enquiryType === "general" && "How can we support you today? *"}
                  {enquiryType === "partnership" && "Detail your partnership proposal objectives *"}
                  {enquiryType === "connection" && "Describe your community connection request details *"}
                </label>
                <textarea
                  id="messageBody"
                  required
                  rows={5}
                  className="form-input"
                  style={{ resize: "vertical" }}
                  placeholder="Provide comprehensive details here..."
                  value={messageBody}
                  onChange={e => setMessageBody(e.target.value)}
                />
              </div>

              {/* Privacy Policy & Terms agreement */}
              <label
                className="field-label"
                style={{ display: "flex", alignItems: "flex-start", gap: 10, fontWeight: 500, cursor: "pointer", marginBottom: 0 }}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  required
                  style={{ accentColor: "#4B1E56", marginTop: 3, cursor: "pointer", flexShrink: 0 }}
                />
                <span>
                  I agree to the{" "}
                  <a href="/privacy-policy" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Terms &amp; Conditions</a>
                </span>
              </label>

              <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={sending}
                  onMouseEnter={() => setSubmitHov(true)}
                  onMouseLeave={() => setSubmitHov(false)}
                  style={{
                    padding: "14px 36px",
                    borderRadius: 999,
                    border: "none",
                    background: "#D7B264",
                    color: "#fff",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: sending ? "not-allowed" : "pointer",
                    opacity: sending ? 0.7 : 1,
                    boxShadow: submitHov ? "0 8px 24px rgba(215,35,143,0.45)" : "0 4px 14px rgba(215,35,143,0.28)",
                    transform: submitHov ? "translateY(-2px)" : "translateY(0)",
                    transition: "all 0.25s ease",
                    width: "100%",
                    maxWidth: 260,
                  }}
                >
                  {sending ? "Sending..." : "Submit Form"}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}

function ConnectSection() {
  return (
    <div className="hub-connect-section">
      <ConnectHero />
      <CommonEnquiryForm />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   REGISTER PAGE — "Register Now!" from the Programs page lands here.
   One form for (a) registering for the next program and (b) asking for
   support (e.g. business coaching).
   ══════════════════════════════════════════════════════════════════════════ */
const SUPPORT_AREAS = [
  "Business coaching / support",
  "Mentoring",
  "Leadership development",
  "Wellbeing & personal growth",
  "Children & youth support",
  "Community project support",
  "Something else",
];

function RegisterSection() {
  const [searchParams] = useSearchParams();
  const programParam = searchParams.get("program") || "";
  const programTitles = PROGRAM_PATHWAYS.map(p => p.title);
  const initialProgram = programTitles.includes(programParam) ? programParam : "";

  const { ref, inView } = useInView(0.1);
  const [requestType, setRequestType] = useState<"register" | "support">("register");
  const [program, setProgram] = useState(initialProgram);
  const [supportArea, setSupportArea] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => { setProgram(initialProgram); setSubmitted(false); }, [initialProgram]);

  const REQUEST_LABELS = {
    register: "Program Registration",
    support: "Support Request",
  } as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !emailAddress.trim()) {
      alert("Please fill in your name and email before submitting.");
      return;
    }
    if (!program) {
      alert("Please choose a program.");
      return;
    }
    if (requestType === "support" && !supportArea) {
      alert("Please tell us what kind of support you need.");
      return;
    }
    if (!agreed) {
      alert("Please agree to the Privacy Policy and Terms & Conditions.");
      return;
    }
    setSending(true);
    try {
      await submitRegistration({
        brand: "hub",
        formTitle: requestType === "register" ? "Program Registration" : "Support Request",
        itemLabel: "Program",
        itemName: program,
        formSource: `Ellevation Hub — ${REQUEST_LABELS[requestType]}`,
        fields: {
          "Full Name": fullName,
          "Email": emailAddress,
          "Phone": phoneNumber,
          "Organization": organizationName,
          "Support Type": requestType === "support" ? supportArea : "",
          "Message": messageBody,
        },
      });
      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS FAILED:", error);
      alert("Your request could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };
  

  const tiles: { id: "register" | "support"; label: string; desc: string }[] = [
    { id: "register", label: "Register for a Program", desc: "Put my name down for the next upcoming program." },
    { id: "support",  label: "Request Support",        desc: "I need help, e.g. business coaching or mentoring." },
  ];

  return (
    <div className="hub-connect-section">
      <ConnectHero
        eyebrow="Join In"
        title="Register Now"
        text="Don't just read about it. Join the next program, or tell us what support you need and we'll point you in the right direction."
      />

      <section className="enquiry-form-section" style={{ background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div ref={ref} style={{ ...fade(inView, 0), background: "#fff", border: "1.5px solid rgba(124, 92, 191, 0.18)", borderRadius: 24, padding: "48px 40px", boxShadow: "0 16px 48px rgba(124,92,191,0.10)" }} className="form-wrapper-card">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h3 style={{ fontFamily: "'Astrid Regular',serif", fontSize: 32, color: "#1a0a2e", marginBottom: 12 }}>Thank You</h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", color: "#554866", fontSize: 18, lineHeight: 1.6, maxWidth: 445, margin: "0 auto" }}>
                  {requestType === "register"
                    ? <>Your registration for <strong>{program}</strong> has been received. Our team will be in touch with the next steps.</>
                    : <>Your support request has been received. Our team will be in touch shortly.</>}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <label className="field-label" style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4B1E56", fontSize: 12, fontWeight: 700 }}>
                    What would you like to do?
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12 }}>
                    {tiles.map(t => (
                      <label
                        key={t.id}
                        className="radio-tile"
                        style={{
                          display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 14, border: "1.5px solid",
                          borderColor: requestType === t.id ? "#4B1E56" : "rgba(124, 92, 191, 0.25)",
                          background: requestType === t.id ? "rgba(75,30,86,0.06)" : "transparent",
                          cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "#1a0a2e",
                        }}
                      >
                        <input type="radio" name="requestType" checked={requestType === t.id} onChange={() => setRequestType(t.id)} style={{ accentColor: "#4B1E56", marginTop: 3 }} />
                        <span>
                          <span style={{ display: "block", fontWeight: 600 }}>{t.label}</span>
                          <span style={{ display: "block", fontSize: 12, opacity: 0.8, marginTop: 2 }}>{t.desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="program" className="field-label">Program / Pathway *</label>
                  <select id="program" className="form-input" value={program} onChange={e => setProgram(e.target.value)} required>
                    <option value="" disabled>Select a program</option>
                    {programTitles.map(t => <option key={t} value={t}>{t}</option>)}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                {requestType === "support" && (
                  <div>
                    <label htmlFor="supportArea" className="field-label">What kind of support do you need? *</label>
                    <select id="supportArea" className="form-input" value={supportArea} onChange={e => setSupportArea(e.target.value)} required>
                      <option value="" disabled>Select support type</option>
                      {SUPPORT_AREAS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                  <div>
                    <label htmlFor="regName" className="field-label">Full Name *</label>
                    <input id="regName" type="text" required className="form-input" placeholder="Your name" value={fullName} onChange={e => setFullName(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="regEmail" className="field-label">Email Address *</label>
                    <input id="regEmail" type="email" required className="form-input" placeholder="name@domain.com" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                  <div>
                    <label htmlFor="regPhone" className="field-label">Phone Number</label>
                    <input id="regPhone" type="tel" className="form-input" placeholder="Optional" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="regOrg" className="field-label">Business / Organization</label>
                    <input id="regOrg" type="text" className="form-input" placeholder="If applicable" value={organizationName} onChange={e => setOrganizationName(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label htmlFor="regMsg" className="field-label">
                    {requestType === "register" ? "Anything we should know? (optional)" : "Tell us a bit about what you need (optional)"}
                  </label>
                  <textarea id="regMsg" rows={4} className="form-input" style={{ resize: "vertical" }} placeholder="Preferred days/times, questions, or details…" value={messageBody} onChange={e => setMessageBody(e.target.value)} />
                </div>

                <label className="field-label" style={{ display: "flex", alignItems: "flex-start", gap: 10, fontWeight: 500, cursor: "pointer", marginBottom: 0 }}>
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required style={{ accentColor: "#4B1E56", marginTop: 3, cursor: "pointer", flexShrink: 0 }} />
                  <span>
                    I agree to the{" "}
                    <a href="/privacy-policy" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Privacy Policy</a>
                    {" "}and{" "}
                    <a href="/terms" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Terms &amp; Conditions</a>
                  </span>
                </label>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" disabled={sending} style={{ padding: "14px 36px", borderRadius: 999, border: "none", background: "#D7B264", color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1, width: "100%", maxWidth: 260 }}>
                    {sending ? "Sending..." : requestType === "register" ? "Register Now" : "Request Support"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const hp: Record<string, React.CSSProperties> = {
  page: { position: "relative", overflow: "hidden", minHeight: "85vh", display: "flex", alignItems: "center", padding: "60px 48px" },
  bgGrad: {
    position: "absolute", inset: 0,
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner6})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
  blobTL: { position: "absolute", top: -120, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(102,35,105,0.18) 0%,transparent 70%)", animation: "floatBlob 10s ease-in-out infinite", zIndex: 1 },
  blobBR: { position: "absolute", bottom: -100, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,10,46,0.1) 0%,transparent 70%)", animation: "floatBlob 13s ease-in-out infinite reverse", zIndex: 1 },
  grid: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center", maxWidth: 1200, margin: "0 auto", width: "100%", animation: "fadeSlideUp 0.9s ease both" },
  left: { display: "flex", flexDirection: "column", gap: 24 },
  eyebrow: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.22em", color: "#ffffff" },
  headline: { fontFamily: "'Astrid Regular', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0, letterSpacing: "-0.01em" },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 400, color: "#ffffff", lineHeight: 1.7, maxWidth: 480 },
  btnRow: { display: "flex", gap: 14, flexWrap: "wrap" as const },
  btnPrimary: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 28px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(215,35,143,0.35)" },
  btnSecondary: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 28px", borderRadius: 100, border: "none", background: "#D7B264", color: "#ffffff", cursor: "pointer", transition: "all 0.2s ease" },
  card: { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "32px", boxShadow: "0 8px 48px rgba(26,10,46,0.08)", border: "1px solid rgba(255,255,255,0.7)" },
  cardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  cardIcon: { width: 48, height: 48, borderRadius: "50%", background: "#662369", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" },
  cardBadge: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#1a0a2e", background: "rgba(75,30,86,0.10)", padding: "5px 14px", borderRadius: 100 },
  cardDesc: { fontFamily: "'Astrid Regular',serif", fontSize: "18px", fontWeight: 500, color: "#1a0a2e", lineHeight: 1.4, marginBottom: 20 },
  cardFeatures: { display: "flex", flexDirection: "column", gap: 10 },
  feat: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", display: "flex", alignItems: "center", gap: 10 },
  check: { color: "#4B1E56", fontWeight: 700 },
};

/* ── About (client-final) — also reused by the Home page sections ── */
const ab: Record<string, React.CSSProperties> = {
  /* Hero */
  hero: {
    position: "relative", overflow: "hidden", textAlign: "center",
    padding: "130px 48px 110px",
    background: `linear-gradient(rgba(26,10,46,0.72), rgba(26,10,46,0.82)), url(${banner2})`,
    backgroundSize: "cover", backgroundPosition: "center",
  },
  heroInner: { maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 },
  heroEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.25em", color: "#D7B264", marginBottom: 20 },
  heroTitle: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,56px)", color: "#fff", lineHeight: 1.1, marginBottom: 28 },
  heroText: {
    fontFamily: "'Montserrat',sans-serif",
    fontSize: "18px",
    color: "rgba(255,255,255,0.9)",
    lineHeight: 1.8,
    maxWidth: 860,
    margin: "0 auto"
  },
  /* Section shells */
  sectionLight: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)" },
  sectionWhite: { padding: "100px 48px", background: "#fff" },
  sectionDark: { padding: "100px 48px", background: "#1a0a2e", textAlign: "center" },
  ctaSection: { padding: "100px 48px", textAlign: "center", background: "linear-gradient(135deg, #6b2f7a 0%, #4B1E56 55%, #35143d 100%)" },
  container: { maxWidth: 1180, margin: "0 auto", textAlign: "center" },
  containerNarrow: { maxWidth: 780, margin: "0 auto", textAlign: "center" },

  /* Typography */
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  eyeLeft: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#8a5a97", letterSpacing: "0.2em", marginBottom: 10 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,52px)", color: "#4B1E56", marginBottom: 40, lineHeight: 1.15 },
  para: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.85, marginBottom: 18 },
  cardHeading: { fontFamily: "'Astrid Regular', serif", fontSize: "1.8rem", color: "#1a0a2e", marginBottom: 14 },
  bodyText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.8 },

  /* Vision / mission */
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, textAlign: "left" },
  visionCard: { padding: "40px 36px", background: "#fff", borderRadius: 22, border: "1px solid rgba(124,92,191,0.15)", boxShadow: "0 8px 32px rgba(124,92,191,0.08)", borderTop: "3px solid #D7B264" },

  /* Generic card grids */
  gridAuto: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 20, textAlign: "left" },
  gridThree: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, textAlign: "left" },
  card: { padding: 28, background: "#fff", borderRadius: 20, border: "1px solid rgba(124,92,191,0.15)", boxShadow: "0 4px 16px rgba(124,92,191,0.06)" },
  cardHighlight: { background: "linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%)", border: "1px solid transparent" },
  icon: { fontSize: "1.7rem", color: "#4B1E56", marginBottom: 14 },
  cardTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "22px", color: "#1a0a2e", marginBottom: 10 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.65 },
  accessCard: { textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", font: "inherit" },
  cardLink: { marginTop: "auto", paddingTop: 16, fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", color: "#8a5a97" },

  /* Commitment */
  commitGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, textAlign: "left", maxWidth: 960, margin: "0 auto" },
  commitItem: { display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", borderRadius: 16, background: "#f6f3fa", border: "1px solid rgba(124,92,191,0.15)", fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 500, color: "#1a0a2e" },
  commitDot: { flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#D7B264", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 },

  /* CTA */
  ctaRow: { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" as const, marginTop: 32 },
  ctaPrimary: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "15px 34px", borderRadius: 100, border: "2px solid #D7B264", background: "#D7B264", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" },
  ctaSecondary: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "15px 34px", borderRadius: 100, border: "2px solid rgba(255,255,255,0.7)", background: "transparent", color: "#fff", cursor: "pointer" },
  positioning: { marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.18)", fontFamily: "'Astrid Regular', serif", fontStyle: "italic", fontSize: "18px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 },
};

const mb: Record<string, React.CSSProperties> = {
  tabsRow: { display: "flex", justifyContent: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" as const },
tabBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", padding: "12px 26px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "transparent", color: "#662369", cursor: "pointer", transition: "all 0.25s ease" },
  tabActive: { color: "#fff", border: "1.5px solid transparent", boxShadow: "0 4px 20px rgba(102,35,105,0.30)" },
  benefitsList: { display: "flex", flexDirection: "column", gap: 10, margin: "0 0 8px" },
  benefitItem: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", color: "#554866", display: "flex", alignItems: "center", gap: 10 },
  benefitDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  pageEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 12 },
  divider: { height: 1, background: "#ede7f5", margin: "24px 0" },
 formLabel: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#4B1E56", marginBottom: 16 },
purposeRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 },
purposeTile: { display: "flex", alignItems: "flex-start", gap: 12, padding: "20px 22px", borderRadius: 16, border: "1.5px solid #ded4ee", cursor: "pointer", transition: "all 0.2s ease" },
purposeLabel: { display: "block", fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 600, color: "#1a0a2e" },
purposeDesc: { display: "block", fontFamily: "'Montserrat',sans-serif", fontSize: "16px", color: "#554866", marginTop: 4, lineHeight: 1.5 },
};

const dr: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,52px)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 48 },
  card: { padding: 28, background: "#fff", borderRadius: 18, textAlign: "left", border: "1px solid rgba(124, 92, 191, 0.15)" },
  icon: { fontSize: "1.5rem", color: "#4B1E56", marginBottom: 12 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#1a0a2e", marginBottom: 6 },
  cardCount: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", color: "#8a5a97" },
  ctaBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(215,35,143,0.30)" },
};

const pg: Record<string, React.CSSProperties> = {
  section: { position: "relative", padding: "100px 48px", overflow: "hidden", textAlign: "center", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16, position: "relative", zIndex: 1 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,52px)", color: "#4B1E56", lineHeight: 1.25, maxWidth: 760, margin: "0 auto 48px", position: "relative", zIndex: 1 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto 40px" },
  card: { padding: 32, background: "#fff", borderRadius: 16, border: "1px solid rgba(124, 92, 191, 0.15)", textAlign: "left", boxShadow: "0 4px 16px rgba(124,92,191,0.06)" },
  icon: { fontSize: "1.6rem", color: "#4B1E56", marginBottom: 14 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#1a0a2e", marginBottom: 10 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.6 },
  ctaBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", position: "relative", zIndex: 1, boxShadow: "0 4px 20px rgba(215,35,143,0.30)" },
  registerBtn: { marginTop: "auto", alignSelf: "stretch", fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em", padding: "13px 18px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", boxShadow: "0 4px 16px rgba(215,35,143,0.25)" },
  lead: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 12px", position: "relative", zIndex: 1 },
  tagline: { fontFamily: "'Astrid Regular',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#4B1E56", margin: "0 auto 32px", position: "relative", zIndex: 1 },
pathGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, textAlign: "left", alignItems: "stretch" },  focusItem: { display: "flex", alignItems: "center", gap: 10, fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866" },
  focusDot: { flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "#D7B264", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 },
  chipRow: { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" as const },
  chip: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.03em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "10px 20px", borderRadius: 100, marginTop: 16, width: "fit-content" },
};

/* ── Opportunities: compact type cards + live filterable board ── */
const op: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", position: "relative", overflow: "hidden" },
  container: { maxWidth: 1140, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,52px)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 40px" },

  // Compact "type" overview cards
  grid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 60 },
  card: { padding: "18px 16px", background: "#fff", borderRadius: 14, textAlign: "left", border: "1px solid rgba(124, 92, 191, 0.15)", transition: "all 0.2s ease" },
  icon: { fontSize: "1.15rem", color: "#4B1E56", marginBottom: 8 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#1a0a2e", marginBottom: 4 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.5 },

  divider: { height: 1, background: "rgba(75,30,86,0.14)", margin: "0 0 40px", maxWidth: 1100, marginLeft: "auto", marginRight: "auto" },

  boardEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 12 },
  boardTitle: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", color: "#4B1E56", marginBottom: 32 },

  filterRow: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" as const, marginBottom: 40 },
  filterBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", padding: "10px 18px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "#fff", color: "#554866", cursor: "pointer", transition: "all 0.2s ease" },
  filterBtnActive: { background: "#D7B264", borderColor: "#D7B264", color: "#fff", boxShadow: "0 4px 16px rgba(215,35,143,0.30)" },

  // Live opportunity listing cards
  listGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, textAlign: "left" },
  listCard: { padding: "24px 24px", background: "#fff", borderRadius: 18, border: "1px solid rgba(124, 92, 191, 0.15)", display: "flex", flexDirection: "column", boxShadow: "0 4px 16px rgba(124,92,191,0.05)", transition: "all 0.2s ease" },
  listBadgeRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const, marginBottom: 12 },
  typeBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#fff", background: "#1a0a2e", padding: "5px 12px", borderRadius: 100 },
  categoryPill: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.04em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "4px 11px", borderRadius: 100 },
  listMeta: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#8a5a97", marginBottom: 6 },
  listTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#1a0a2e", marginBottom: 8 },
  listText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.6, marginBottom: 18, flexGrow: 1 },
  listFooterRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: "auto", flexWrap: "wrap" as const },
  deadline: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#8a5a97" },
  applyBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", padding: "11px 20px", borderRadius: 100, border: "2px solid #D7B264", background: "#D7B264", color: "#fff", cursor: "pointer", whiteSpace: "nowrap" as const },

  ctaBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(215,35,143,0.30)" },

  // Quick-apply modal
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(26,10,46,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 },
  modalCard: { background: "#fff", borderRadius: 22, padding: "36px 32px", maxWidth: 440, width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(26,10,46,0.35)" },
  modalClose: { position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: "50%", border: "none", background: "#f6f3fa", color: "#554866", fontSize: "0.85rem", cursor: "pointer" },
  modalEyebrow: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "#8a5a97", marginBottom: 10 },
  modalTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.5rem", color: "#1a0a2e", marginBottom: 10, textAlign: "left" },
  modalSub: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#554866", lineHeight: 1.6, textAlign: "left" },
  modalSubmitBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "14px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", marginTop: 4 },
};

const evs: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,52px)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, textAlign: "left" },
  card: { padding: "28px 26px", background: "#f6f3fa", borderRadius: 18, border: "1px solid rgba(124, 92, 191, 0.15)", display: "flex", flexDirection: "column", gap: 0 },
  dateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: "#1a0a2e", padding: "5px 12px", borderRadius: 100, marginBottom: 12, width: "fit-content" },
  categoryPill: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "4px 11px", borderRadius: 100, marginBottom: 10, width: "fit-content" },
  category: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "#8a5a97", marginBottom: 8 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#1a0a2e", marginBottom: 8 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.6, marginBottom: 20, flexGrow: 1 },
  rsvpBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "12px", borderRadius: 100, border: "2px solid #D7B264", background: "#D7B264", color: "#fff", cursor: "pointer", marginTop: "auto" },
  filterRow: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" as const, marginBottom: 40 },
  filterBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", padding: "10px 18px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "#fff", color: "#554866", cursor: "pointer", transition: "all 0.2s ease" },
  filterBtnActive: { background: "#D7B264", borderColor: "#D7B264", color: "#fff", boxShadow: "0 4px 16px rgba(215,35,143,0.30)" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(26,10,46,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 },
  modalCard: { background: "#fff", borderRadius: 22, padding: "36px 32px", maxWidth: 440, width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(26,10,46,0.35)" },
  modalClose: { position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: "50%", border: "none", background: "#f6f3fa", color: "#554866", fontSize: "0.85rem", cursor: "pointer" },
  modalDateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "#8a5a97", marginBottom: 10 },
  modalTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.5rem", color: "#1a0a2e", marginBottom: 10, textAlign: "left" },
  modalSub: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#554866", lineHeight: 1.6, textAlign: "left" },
  modalSubmitBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", padding: "14px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", marginTop: 4 },
  modalCtaLink: { display: "inline-block", marginTop: 20, fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: "#D7B264", padding: "14px 24px", borderRadius: 100, textDecoration: "none" },
};

const jp: Record<string, React.CSSProperties> = {
  formSection: { padding: "100px 24px", background: "#fff", display: "flex", justifyContent: "center" },
card: { background: "#fff", padding: "56px", borderRadius: 24, boxShadow: "0 10px 40px rgba(102,35,105,0.08)", border: "1px solid rgba(124, 92, 191, 0.12)", width: "100%" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
input: { width: "100%", padding: "18px 22px", borderRadius: 14, border: "1.5px solid #ded4ee", background: "#fdf9fc", fontFamily: "'Montserrat', sans-serif", fontSize: "18px", outline: "none" },
  formTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "2rem", color: "#1a0a2e", marginBottom: 8 },
  formSub: { fontFamily: "'Montserrat', sans-serif", fontSize: "18px", color: "#554866" },
   select: { appearance: "none" as const, cursor: "pointer" },
submitBtn: { width: "100%", marginTop: 28, padding: "20px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", fontWeight: 700, fontSize: "16px", cursor: "pointer", letterSpacing: "0.1em" },
};

const st: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", textAlign: "center" },
  sectionEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 14 },
  bannerTitle: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,52px)", color: "#4B1E56", marginBottom: 16, maxWidth: 780, marginLeft: "auto", marginRight: "auto", lineHeight: 1.15 },
  lead: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 48px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 900, margin: "0 auto 56px" },
  statCard: { padding: "24px 16px", background: "#fff", borderRadius: 16, border: "1px solid rgba(124, 92, 191, 0.15)" },
  statNum: { fontFamily: "'Astrid Regular',serif", fontSize: "2rem", fontWeight: 600, color: "#1a0a2e", marginBottom: 6 },
  statLabel: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", color: "#554866", letterSpacing: "0.02em" },
  subSection: { maxWidth: 1100, margin: "0 auto 72px" },
  subtitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.9rem", color: "#1a0a2e", marginBottom: 32, lineHeight: 1.2 },
  caldGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  caldCard: { padding: "24px 20px", background: "#fff", borderRadius: 16, border: "1px solid rgba(124, 92, 191, 0.15)", textAlign: "left" },
  caldIcon: { fontSize: "1.4rem", color: "#4B1E56", marginBottom: 10 },
  caldTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#1a0a2e", marginBottom: 6 },
  caldText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.55 },
  programsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  programCard: { padding: "24px 20px", background: "#1a0a2e", borderRadius: 16, textAlign: "left" },
  programIcon: { fontSize: "1.4rem", color: "#fff", marginBottom: 10 },
  programTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#fff", marginBottom: 6 },
  programText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" },
  card: { padding: 40, border: "1px solid rgba(124, 92, 191, 0.15)", borderRadius: 24, textAlign: "left", background: "#fff" },
  quote: { fontFamily: "'Astrid Regular', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#554866", lineHeight: 1.6, marginBottom: 20 },
  name: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#1a0a2e" },
  role: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#8a5a97", marginTop: 2 },
  visionBox: { maxWidth: 700, margin: "0 auto", padding: "32px 28px", background: "#1a0a2e", borderRadius: 20 },
  visionEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.2em", color: "#c9a3d9", marginBottom: 12 },
  visionText: { fontFamily: "'Astrid Regular',serif", fontSize: "1.2rem", fontStyle: "italic", color: "#fff", lineHeight: 1.6 },
};

// ─── ROOT HUB PAGE ───────────────────────────────────────────────────────────
export default function EllevationHub() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read the active page from the URL (?page=about); falls back to "home".
  const page = (searchParams.get("page") as Page) || "home";

  // Sync with the theme saved elsewhere (e.g. a global toggle) on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", saved ?? "light");
  }, []);

  // Set page title & meta description — per page, whenever `page` changes
  useEffect(() => {
    const meta = PAGE_META[page] || PAGE_META.home;
    

    document.title = meta.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", meta.description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", meta.description);
      document.head.appendChild(metaDescription);
    }
  }, [page]);

  // Scroll to the top whenever the active section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // `param` is the program title when going to the Register page
  const nav: NavFn = (p, param) => {
    if (p === "home") {
      setSearchParams({});
    } else if (p === "register" && param) {
      setSearchParams({ page: p, program: param });
    } else {
      setSearchParams({ page: p });
    }
  };

  return (
    <div className="hub-root" style={{ fontFamily: "'Montserrat',sans-serif", background: "#fdf9fc", minHeight: "100vh", color: "#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        /* Astrid Regular is a licensed/custom display font (not on Google Fonts).
           Replace the src url below with the path to your actual font file. */
        @font-face {
          font-family: 'Astrid Regular';
          src: url('/fonts/AstridRegular.woff2') format('woff2'),
               url('/fonts/AstridRegular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        *{box-sizing:border-box;margin:0;padding:0;}
        img{max-width:100%;}
        input::placeholder,textarea::placeholder{color:#b09fc0;}
        input:focus, select:focus, textarea:focus { outline:none; border-color: #662369!important; box-shadow: 0 0 0 3px rgba(75,30,86,0.12); }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatBlob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-15px) scale(1.04); } 66% { transform: translate(-10px,10px) scale(0.97); } }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        button:active { transform: translateY(0); }

        [data-theme="dark"] .hub-programs-chip {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(155,109,190,0.3) !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-programs-section .hub-programs-card-text { color: rgba(255,255,255,0.75) !important; }
        [data-theme="dark"] .hub-programs-section .hub-programs-card-title { color: #e8e0f8 !important; }

        /* ═══════════════ NAVBAR — matches Ms Ellevation ═══════════════
           Every rule is scoped under .hub-root so it beats any other
           .ms-nav rule coming from another stylesheet. */
        .hub-root .ms-nav-row{
          position:fixed; top:0; left:0; right:0; z-index:100;
          display:flex; flex-direction:column; align-items:center;
          padding:22px 24px 0;
        }
        .hub-root .ms-nav{
          width:100%;
          max-width:1620px !important;      /* centred, same side space as Ms Ellevation */
          margin:0 auto !important;
          display:flex; align-items:center;
          gap:28px;
          min-height:124px;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(102,35,105,0.08);
          border-radius:100px;
          padding:0 20px 0 12px;
          box-shadow:0 2px 16px rgba(102,35,105,0.08);
          transition:box-shadow 0.3s ease;
        }
        .hub-root .ms-nav.ms-nav-scrolled{ box-shadow:0 4px 32px rgba(102,35,105,0.18); }

        .hub-root .ns-back-home{
          display:flex; align-items:center; gap:8px;
          font-family:'Montserrat',sans-serif;
          font-size:0.95rem; font-weight:600;
          color:#662369;
          background:rgba(102,35,105,0.06);
          border:1px solid rgba(102,35,105,0.12);
          border-radius:100px;
          padding:11px 22px;
          cursor:pointer; white-space:nowrap; flex-shrink:0;
          transition:all 0.2s ease;
        }
        .hub-root .ns-back-home:hover{ background:rgba(102,35,105,0.12); opacity:1; }

        /* Bigger logo. Net height stays 124px thanks to the negative margins. */
        .hub-root .ns-logo{
          height:150px !important;
          width:auto !important;
          max-width:none !important;
          margin:-13px 0 !important;
          object-fit:contain;
          cursor:pointer; flex-shrink:0;
          position:relative; z-index:5;
        }

.ns-links-desktop{
  display:flex; align-items:center; gap:2px;
  flex:1;
  justify-content:center;
  flex-wrap:nowrap;      /* was: wrap */
  min-width:0;
}
        .ns-link{
          font-family:'Montserrat', sans-serif;
          font-size:0.95rem; font-weight:500;
          color:#662369; background:transparent;
          border:none; cursor:pointer;
          padding:11px 16px; border-radius:100px;
          transition:all 0.2s ease; white-space:nowrap;
        }
        .ns-link:hover{ background:rgba(102,35,105,0.06); opacity:1; }
        .ns-link.active{
          background:linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%);
          color:#fff; font-weight:600;
          box-shadow:0 2px 12px rgba(26,10,46,0.25);
        }
        .hub-root .ns-link.active:hover{ opacity:1; }

        .hub-root .ns-menu-toggle{
          display:none; flex-direction:column; justify-content:center; align-items:center;
          gap:5px; width:42px; height:42px; border-radius:50%; border:none;
          background:rgba(102,35,105,0.06); cursor:pointer; flex-shrink:0;
          margin-left:auto;
        }
        .hub-root .ns-menu-toggle span{ display:block; width:18px; height:2px; background:#662369; border-radius:2px; transition:all 0.25s ease; }
        .hub-root .ns-menu-toggle.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
        .hub-root .ns-menu-toggle.open span:nth-child(2){ opacity:0; }
        .hub-root .ns-menu-toggle.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }

        .hub-root .ns-mobile-menu{
          max-height:0; overflow:hidden; width:100%; max-width:1620px; opacity:0;
          transition:max-height 0.3s ease, opacity 0.25s ease, margin 0.3s ease;
        }
        .hub-root .ns-mobile-menu.open{
          opacity:1; margin-top:10px;
          display:flex; flex-direction:column; gap:4px;
          background:rgba(255,255,255,0.97);
          backdrop-filter:blur(16px);
          border-radius:22px; padding:10px;
          box-shadow:0 12px 40px rgba(102,35,105,0.16);
          border:1px solid rgba(102,35,105,0.08);
          overflow-y:auto; max-height:calc(100vh - 100px);
        }
        .hub-root .ns-mobile-link{
          display:block; width:100%; text-align:left;
          font-family:'Montserrat',sans-serif; font-size:1.05rem; font-weight:500;
          color:#662369; background:transparent; border:none; cursor:pointer;
          padding:13px 18px; border-radius:14px; transition:all 0.2s ease;
        }
        .hub-root .ns-mobile-link:hover{ background:rgba(102,35,105,0.06); opacity:1; }
        .hub-root .ns-mobile-link.active{
          background:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 100%) !important; color:#fff !important;
        }

        /* Smaller laptops: tighten so all 9 links fit */
      /* Smaller laptops: tighten so all 9 links fit on ONE row */
@media (max-width:1560px){
  .hub-root .ms-nav{ gap:14px; min-height:104px; padding:0 16px 0 10px; }
  .hub-root .ns-logo{ height:116px !important; margin:-6px 0 !important; }
  .hub-root .ns-link{ padding:10px 12px; font-size:1rem; }      /* was 0.88rem */
  .hub-root .ns-links-desktop{ gap:0; }
  .hub-root .ns-back-home{ padding:9px 14px; font-size:0.82rem; }
}

@media (max-width:1420px){
  .hub-root .ms-nav{ gap:12px; }
  .hub-root .ns-logo{ height:100px !important; margin:-4px 0 !important; }
  .hub-root .ns-link{ padding:10px 11px; font-size:0.98rem; }   /* was 0.82rem */
  .hub-root .ns-back-home{ padding:8px 12px; font-size:0.78rem; }
  .hub-root .ns-back-home span{ display:none; }
}
        /* Tablet + mobile: hamburger */
        @media (max-width:1240px){
          .hub-root .ms-nav-row{ padding:16px 16px 0; }
          .hub-root .ms-nav{ min-height:76px; gap:12px; padding:0 12px 0 10px; }
          .hub-root .ns-links-desktop{ display:none; }
          .hub-root .ns-menu-toggle{ display:flex; }
          .hub-root .ns-logo{ height:110px !important; margin:-17px 0 !important; }
        }
        @media (max-width:560px){
          .hub-root .ms-nav{ min-height:60px; }
          .hub-root .ns-back-home span{ display:none; }
          .hub-root .ns-back-home{ padding:9px 12px; }
          .hub-root .ns-logo{ height:88px !important; margin:-14px 0 !important; }
        }

        /* Hide Google Translate's default top banner / tooltip so the page doesn't shift */
        body > .skiptranslate, .goog-te-banner-frame{ display:none !important; }
        body{ top:0 !important; }
        #goog-gt-tt, .goog-tooltip, .goog-text-highlight{ display:none !important; background:none !important; box-shadow:none !important; }

        /* ═══════════════════════════════════════
           RESPONSIVE — section grids collapse
           on tablet / mobile so nothing overflows
           ═══════════════════════════════════════ */
        @media (max-width: 900px){
          .hub-home-grid{ grid-template-columns:1fr !important; text-align:center; }
          .hub-home-btn-row{ justify-content:center !important; }
          .hub-about-two-col{ grid-template-columns:1fr !important; }
          .hub-directory-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-opportunities-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-opportunities-listing-grid{ grid-template-columns:1fr !important; }
          .hub-events-grid{ grid-template-columns:1fr !important; }
          .hub-impact-stats{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-impact-cald-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-impact-programs-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-impact-grid{ grid-template-columns:1fr !important; }
          .hub-form-row{ grid-template-columns:1fr !important; }
        }

        /* Programs: 4 pathway cards in one row on desktop */
        .hub-programs-grid .hub-about-card{
          display:flex;
          flex-direction:column;
          padding:24px 20px !important;
        }
        .hub-programs-grid .hub-about-card .hub-programs-chip{
          margin-top:auto !important;
        }
       @media (max-width: 1240px){
  .hub-programs-grid{ grid-template-columns:minmax(0, 420px) !important; }
}
        @media (max-width: 600px){
          .hub-directory-grid{ grid-template-columns:1fr !important; }
          .hub-opportunities-grid{ grid-template-columns:1fr !important; }
          .hub-impact-stats{ grid-template-columns:1fr 1fr !important; }
          .hub-impact-cald-grid{ grid-template-columns:1fr !important; }
          .hub-impact-programs-grid{ grid-template-columns:1fr !important; }
        }
        @media (max-width: 768px){
          .hub-home-page{ padding:100px 24px 60px !important; min-height:auto !important; }
          .hub-about-hero{ padding:96px 24px 72px !important; }
          .hub-about-section{ padding:56px 24px !important; }
          .hub-membership-section{ padding:56px 24px !important; }
          .hub-directory-section{ padding:56px 24px !important; }
          .hub-programs-section{ padding:56px 24px !important; }
          .hub-opportunities-section{ padding:56px 24px !important; }
          .hub-events-section{ padding:56px 24px !important; }
          .hub-impact-section{ padding:56px 24px !important; }
          .hub-form-card{ padding:32px 24px !important; }
        }
        @media (max-width: 560px){
          .hub-home-headline{ font-size:2rem !important; }
          .hub-card{ padding:24px !important; }
          .hub-form-title{ font-size:1.5rem !important; }
          .hub-about-commit{ padding:14px 16px !important; }
        }

        /* ── About page: hover + commitment grid safety on narrow screens ── */
        .hub-about-access:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(124,92,191,0.16) !important; opacity: 1; }
        @media (max-width: 400px){
          .hub-about-page [style*="minmax(320px"]{ grid-template-columns:1fr !important; }
        }

        /* Who We Support: 6 cards in one row on desktop */
.hub-about-support-grid .hub-about-card{ padding:22px 18px !important; }
.hub-about-support-grid .hub-about-card-title{ font-size:20px !important; }
.hub-about-support-grid .hub-about-card-text{ font-size:15px !important; line-height:1.55 !important; }

@media (max-width:1180px){
  .hub-about-support-grid{ grid-template-columns:repeat(3, 1fr) !important; }
}
@media (max-width:640px){
  .hub-about-support-grid{ grid-template-columns:repeat(2, 1fr) !important; }
}
@media (max-width:420px){
  .hub-about-support-grid{ grid-template-columns:1fr !important; }
}

        /* ── Dark Mode Overrides ── */

        /* Navbar (pill background + logo; sizes are set in the scoped block above) */
        [data-theme="dark"] .hub-root .ms-nav{ background:rgba(22,13,34,0.92) !important; border-color:rgba(155,109,190,0.15) !important; }
        [data-theme="dark"] .hub-root .ms-nav.ms-nav-scrolled{ box-shadow:0 4px 32px rgba(0,0,0,0.35) !important; }
        [data-theme="dark"] .hub-root .ns-logo{ filter:none; }

        /* Root background must follow the theme, otherwise a light strip shows
           behind/around the fixed navbar in dark mode */
        [data-theme="dark"] .hub-root {
          background: #0d0614 !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .ns-link {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .ns-link:hover {
          background: rgba(217, 168, 205, 0.1) !important;
        }
        [data-theme="dark"] .ns-back-home {
          color: #d9a8cd !important;
          background: rgba(217, 168, 205, 0.1) !important;
          border-color: rgba(217, 168, 205, 0.25) !important;
        }
        [data-theme="dark"] .ns-menu-toggle {
          background: rgba(217, 168, 205, 0.1) !important;
        }
        [data-theme="dark"] .ns-menu-toggle span {
          background: #d9a8cd !important;
        }
        [data-theme="dark"] .ns-mobile-menu.open {
          background: rgba(22, 13, 34, 0.97) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .ns-mobile-link {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .ns-mobile-link:hover {
          background: rgba(217, 168, 205, 0.1) !important;
        }

        /* Home section */
        [data-theme="dark"] .hub-home-bg {
          background: linear-gradient(rgba(13, 6, 20, 0.75), rgba(13, 6, 20, 0.75)), url(${banner6}) !important;
          background-size: cover !important;
          background-position: center !important;
        }
        [data-theme="dark"] .hub-card {
          background: rgba(22, 13, 34, 0.9) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
          box-shadow: 0 8px 48px rgba(0,0,0,0.5) !important;
        }
        [data-theme="dark"] .hub-card-desc {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-feat {
          color: #d9a8cd !important;
        }

        /* About page + Home page sections (client-final) */
        [data-theme="dark"] .hub-about-alt   { background: #160d22 !important; }
        [data-theme="dark"] .hub-about-plain { background: #0d0614 !important; }
        [data-theme="dark"] .hub-about-eye   { color: #c9a3d9 !important; }
        [data-theme="dark"] .hub-about-title { color: #e8e0f8 !important; }
        [data-theme="dark"] .hub-about-sub   { color: #d9a8cd !important; }
        [data-theme="dark"] .hub-about-card  { background: #1f1330 !important; border-color: rgba(155,109,190,0.15) !important; box-shadow: none !important; }
        [data-theme="dark"] .hub-about-card-title { color: #e8e0f8 !important; }
        [data-theme="dark"] .hub-about-card-text  { color: #d9a8cd !important; }
        [data-theme="dark"] .hub-about-link  { color: #c9a3d9 !important; }
        [data-theme="dark"] .hub-about-commit{ background: #1f1330 !important; border-color: rgba(155,109,190,0.15) !important; color: #e8e0f8 !important; }
        [data-theme="dark"] .hub-about-cta   { background: linear-gradient(135deg, #2a163a 0%, #160d22 100%) !important; }

        /* Membership section */
        [data-theme="dark"] .hub-membership-section {
          background: #160d22 !important;
        }
        [data-theme="dark"] .hub-form-eye {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-form-card {
          background: #1f1330 !important;
          box-shadow: 0 10px 48px rgba(0,0,0,0.5) !important;
        }
        [data-theme="dark"] .hub-form-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-form-sub {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-form-sub a {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-form-label {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-benefit-item {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-divider {
          background: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-tier-tab {
          border-color: rgba(155, 109, 190, 0.3) !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-tier-tab.active {
          color: #fff !important;
        }
        [data-theme="dark"] .hub-input {
          background: #0d0614 !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-input::placeholder {
          color: #ffffff !important;
          opacity: 1 !important;
        }
        [data-theme="dark"] .hub-purpose-tile {
          border-color: rgba(155, 109, 190, 0.3) !important;
        }
        [data-theme="dark"] .hub-purpose-label {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-purpose-desc {
          color: #d9a8cd !important;
        }

        /* Directory section */
        [data-theme="dark"] .hub-directory-section {
          background: #160d22 !important;
        }
        [data-theme="dark"] .hub-directory-eye {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-directory-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-directory-sub {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-directory-card {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-directory-card-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-directory-card-count {
          color: #d9a8cd !important;
        }

        /* Programs section — light by default, supports dark mode */
        [data-theme="dark"] .hub-programs-section {
          background: linear-gradient(180deg, #2a163a 0%, #160d22 100%) !important;
        }
        [data-theme="dark"] .hub-programs-eye {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-programs-title {
          color: #ffffff !important;
        }
        [data-theme="dark"] .hub-programs-card {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.12) !important;
          box-shadow: none !important;
        }
        [data-theme="dark"] .hub-programs-card-title {
          color: #fff !important;
        }
        [data-theme="dark"] .hub-programs-card-text {
          color: rgba(255,255,255,0.7) !important;
        }
        [data-theme="dark"] .hub-programs-icon,
        [data-theme="dark"] .hub-programs-card svg {
          color: #fff !important;
        }

        /* Opportunities section */
        [data-theme="dark"] .hub-opportunities-section {
          background: #160d22 !important;
        }
        [data-theme="dark"] .hub-opportunities-eye {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-opportunities-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-opportunities-sub {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-opportunities-card {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-opportunities-card-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-opportunities-card-text {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-opportunities-empty {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-opportunities-list-card {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-opportunities-list-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-opportunities-list-text {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-opportunities-filter {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-opportunities-filter.active {
          background: #D7B264 !important;
          border-color: #D7B264 !important;
          color: #fff !important;
        }
        [data-theme="dark"] .hub-opportunities-modal {
          background: #1f1330 !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55) !important;
        }
        [data-theme="dark"] .hub-opportunities-modal h3 {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-opportunities-modal p {
          color: #d9a8cd !important;
        }

        /* Events section */
        [data-theme="dark"] .hub-events-section {
          background: #160d22 !important;
        }
        [data-theme="dark"] .hub-events-eye {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-events-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-events-sub {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-empty {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-card {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-events-card-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-events-card-text {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-filter {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-filter.active {
          background: #D7B264 !important;
          border-color: #D7B264 !important;
          color: #fff !important;
        }
        [data-theme="dark"] .hub-events-modal {
          background: #1f1330 !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55) !important;
        }
        [data-theme="dark"] .hub-events-modal h3 {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-events-modal p {
          color: #d9a8cd !important;
        }

        /* Impact section */
        [data-theme="dark"] .hub-impact-section {
          background: #160d22 !important;
        }
        [data-theme="dark"] .hub-impact-eye {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-impact-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-stat {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-impact-stat-num {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-stat-label {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-impact-card {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-impact-quote {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-impact-name {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-role {
          color: #a8789a !important;
        }
        [data-theme="dark"] .hub-impact-lead {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-impact-subtitle {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-cald-card {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .hub-impact-cald-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-cald-text {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-impact-program-card {
          background: rgba(255,255,255,0.06) !important;
        }
        [data-theme="dark"] .hub-impact-vision {
          background: #1f1330 !important;
        }
        [data-theme="dark"] .hub-impact-vision-eye {
          color: #c9a3d9 !important;
        }
        [data-theme="dark"] .hub-impact-vision-text {
          color: #e8e0f8 !important;
        }

        /* ── Connect + Register: hero + enquiry form ── */
        .blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .blob-1 { top: -100px; left: -80px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(75,30,86,0.35) 0%, transparent 68%); animation: floatA 9s ease-in-out infinite; }
        .blob-2 { bottom: -80px; right: -60px; width: 420px; height: 420px; background: radial-gradient(circle, rgba(102,35,105,0.30) 0%, transparent 68%); animation: floatB 11s ease-in-out infinite 2s; }
        .blob-3 { top: 30%; left: 55%; width: 260px; height: 260px; background: radial-gradient(circle, rgba(224,40,160,0.22) 0%, transparent 68%); animation: floatA 13s ease-in-out infinite 4s; }

        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(18px,-14px) scale(1.02); }
          66%      { transform: translate(-10px,10px) scale(0.98); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-16px,12px) scale(1.03); }
          70%      { transform: translate(12px,-8px) scale(0.97); }
        }

        .line-draw { animation: lineDraw 0.7s ease 0.2s both; }
        @keyframes lineDraw {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .bounce-arrow { display: inline-block; font-size: 20px; color: #fff; animation: bounceDown 2s ease-in-out infinite; }
        @keyframes bounceDown {
          0%,100% { transform: translateY(0); opacity: 0.7; }
          50%      { transform: translateY(8px); opacity: 1; }
        }

        .field-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 13px 18px;
          border-radius: 12px;
          border: 1.5px solid rgba(124,92,191,0.25);
          background: #fdfbfe;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #1a0a2e;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input:focus {
          border-color: #4B1E56;
          background: #fff;
          box-shadow: 0 4px 12px rgba(75,30,86,0.08);
        }

        @media (max-width: 640px) {
          .events-hero { padding: 90px 20px 70px !important; }
          .enquiry-form-section { padding: 56px 20px 72px !important; }
          .form-wrapper-card { padding: 32px 24px !important; }
        }

        [data-theme="dark"] .hub-connect-section { background: #0f0a1a !important; }
        [data-theme="dark"] .events-hero { background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${banner2}) !important; background-size: cover !important; }
        [data-theme="dark"] .enquiry-form-section { background: #160d22 !important; }
        [data-theme="dark"] .enquiry-form-section h2 { color: #f3ebff !important; }
        [data-theme="dark"] .form-wrapper-card { background: #1f1330 !important; border-color: rgba(75, 30, 86, 0.2) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important; }
        [data-theme="dark"] .field-label { color: #d9a8cd !important; }
        [data-theme="dark"] .field-label a { color: #c9a3d9 !important; }
        [data-theme="dark"] .radio-tile { color: #f3ebff !important; border-color: rgba(75,30,86,0.2) !important; }
        [data-theme="dark"] .form-input { background: #1f172e !important; border-color: rgba(75,30,86,0.2) !important; color: #f3ebff !important; }
        [data-theme="dark"] .form-input:focus { border-color: #6b2f7a !important; background: #231933 !important; }
        [data-theme="dark"] .form-wrapper-card h3 { color: #f3ebff !important; }
        [data-theme="dark"] .form-wrapper-card p { color: #d9a8cd !important; }
        [data-theme="dark"] .bounce-arrow { color: #6b2f7a !important; }
      `}</style>

      <Navbar current={page} nav={nav} />

      {/* Navbar is `position: fixed`, so push content down by its measured
          height (--nav-height). 96px is the fallback for first paint. */}
      <div style={{ paddingTop: "var(--nav-height, 96px)" }}>
        {page === "home"          && <HomeSection nav={nav} />}
        {page === "about"         && <AboutSection nav={nav} />}
        {page === "membership"    && <MembershipSection />}
        {page === "directory"     && <DirectorySection nav={nav} />}
        {page === "programs"      && <ProgramsSection nav={nav} />}
        {page === "opportunities" && <OpportunitiesSection nav={nav} />}
        {page === "events"        && <EventsSection nav={nav} events={EVENTS} />}
        {page === "impact"        && <ImpactSection />}
        {page === "connect"       && <ConnectSection />}
        {page === "register"      && <RegisterSection />}
      </div>
    </div>
  );
}