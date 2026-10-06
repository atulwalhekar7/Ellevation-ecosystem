import { useState, useEffect, useRef, type CSSProperties } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import banner6 from "../assets/banner6.avif";
import banner2 from "../assets/banner2.avif";
import hubLogoLight from "../assets/hub-logo.png";
import hubLogoDark from "../assets/Ellevation-darkmode-logo.png";
import emailjs from "@emailjs/browser";


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
type Page = "home" | "about" | "membership" | "directory" | "programs" | "opportunities" | "events" | "impact" | "connect";
type HubTier = "CONNECT" | "GROW" | "VISIBILITY" | "IMPACT";
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
      "Connecting culturally and linguistically diverse (CALD) communities, businesses, organisations and collaborators through opportunity, connection and impact.",
  },
  about: {
    title: "About the Hub | Ellevation Hub",
    description:
      "Ellevation Hub is a purpose-led Australian social enterprise and leadership ecosystem creating pathways into wellbeing, leadership, visibility and economic participation for CALD communities.",
  },
  membership: {
    title: "Membership Tiers & Benefits | Ellevation Hub",
    description:
      "Explore Ellevation Hub's four membership tiers — Connect, Grow, Visibility, and Impact — and submit an expression of interest to join.",
  },
  directory: {
    title: "Business Directory | Ellevation Hub",
    description:
      "Discover verified businesses built by our community, browse listings by category, or add your own business to the Ellevation Hub directory.",
  },
  programs: {
    title: "Our Programs | Ellevation Hub",
    description:
      "Development pathways for every corner of the community — youth mentorship, men's pathway programs, and grassroots community development.",
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
      "Real outcomes across every group we support — community reach, CALD community outcomes, business growth, and stories from our members.",
  },
  connect: {
    title: "Connect With Us | Ellevation Hub",
    description:
      "Reach out to Ellevation Hub for partnerships, programmatic guidance, or community connections — submit an enquiry through our unified request portal.",
  },
};

/* ── Home page content (client-final) ── */
const HOME_OPPORTUNITIES: { title: string; desc: string; page: Page; link?: string }[] = [
  { title: "Directory",     desc: "Find businesses, services, organisations and community leaders.", page: "directory" },
  { title: "Opportunities", desc: "Access jobs, grants, partnerships and collaborations.",           page: "opportunities" },
  { title: "Events",        desc: "Connect through networking, learning and community experiences.", page: "events" },
  { title: "Programs",      desc: "Wellbeing, mentoring, leadership development, business support and community learning designed to help people, entrepreneurs and communities grow, connect and thrive.", page: "programs", link: "Read More.." },
];

const HOME_FOR_EVERYONE = [
  { title: "Individuals",             desc: "Find connection, opportunities and support." },
  { title: "Businesses",              desc: "Increase visibility and build meaningful partnerships." },
  { title: "Community Organisations", desc: "Collaborate and strengthen community impact." },
  { title: "Supporters & Partners",   desc: "Help create opportunities that transform lives." },
];

const HOME_ECOSYSTEM = [
  { eyebrow: "Building the Woman",   title: "Ms Ellevation" },
  { eyebrow: "Building Opportunity", title: "Ellevation Hub" },
];

/* ── About page content (client-final) ── */
const ABOUT_ECOSYSTEM_APPROACH = [
  { title: "Community Development", desc: "Creating stronger communities through connection, collaboration and grassroots engagement.", icon: "✿" },
  { title: "Leadership Development", desc: "Supporting emerging and established leaders to create positive impact.", icon: "◑" },
  { title: "Youth Development", desc: "Empowering young people through mentoring, pathways and leadership opportunities.", icon: "✦" },
  { title: "Business Support", desc: "Providing visibility, collaboration, mentoring, enterprise development and growth opportunities.", icon: "◈" },
  { title: "Strategic Partnerships", desc: "Connecting organisations, businesses and community leaders to create shared impact.", icon: "❖" },
];

const ABOUT_WHO_WE_SUPPORT = [
  { title: "Community", desc: "Grassroots networks, community organisations and initiatives helping communities thrive.", icon: "✿" },
  { title: "Business", desc: "Entrepreneurs, professionals, enterprises and business owners seeking visibility, growth and collaboration.", icon: "◈" },
  { title: "Youth", desc: "Young people requiring leadership development, mentoring and opportunities for future success.", icon: "✦" },
  { title: "Men", desc: "Allyship, personal development and leadership pathways that contribute to healthier communities and stronger outcomes.", icon: "◎" },
  { title: "Women", desc: "Women seeking leadership opportunities, business support, mentoring, visibility, partnerships, community and pathways to economic participation.", icon: "❋" },
];

const ABOUT_ACCESS: { title: string; desc: string; page: Page }[] = [
  { title: "Directory", desc: "Discover businesses, services, organisations and community leaders.", page: "directory" },
  { title: "Programs", desc: "Access wellbeing initiatives, mentoring, leadership development, business support and community learning for women, young people, entrepreneurs and communities.", page: "programs" },
  { title: "Opportunities", desc: "Explore jobs, grants, partnerships and collaboration opportunities.", page: "opportunities" },
  { title: "Events", desc: "Connect through networking, learning and community experiences.", page: "events" },
  { title: "Impact", desc: "Support and contribute to initiatives creating positive social and economic outcomes.", page: "impact" },
];

const ABOUT_COMMITMENTS = [
  "We believe diversity is a strength.",
  "We believe lived experience matters.",
  "We believe leadership exists in every community.",
  "We believe collaboration creates greater impact.",
  "We believe opportunity should be accessible to everyone.",
  "We believe strong communities create stronger futures.",
];

const ABOUT_ECOSYSTEM_CONNECTION = [
  { title: "Ms Ellevation", desc: "Supporting women to honour their stories, strengthen their identity, build confidence and grow into leadership." },
  { title: "Ellevation Hub", desc: "Creating pathways into opportunity through business support, mentoring, partnerships, leadership development, visibility and economic participation." },
  { title: "Together", desc: "Women, young people, businesses, organisations and communities can access the support, networks and opportunities they need to grow, lead and thrive." },
];

const HUB_TIERS: HubTier[] = ["CONNECT", "GROW", "VISIBILITY", "IMPACT"];
const HUB_TIER_META: Record<HubTier, { label: string; tagline: string; benefits: string[]; color: string }> = {
  CONNECT:    { label: "Connect",    tagline: "Get plugged into the community and directory.",                     benefits: ["Directory listing", "Community forum access", "Monthly newsletter", "Event invitations"], color: "#8a5a97" },
  GROW:       { label: "Grow",       tagline: "Access programs, mentorship, and development pathways.",           benefits: ["Program enrollment priority", "Mentorship matching", "Skills workshops", "Peer accountability circles"], color: "#6b2f7a" },
  VISIBILITY: { label: "Visibility", tagline: "Amplify your business or work through the directory and features.", benefits: ["Featured directory placement", "Spotlight features", "Referral network access", "Media opportunities"], color: "#4B1E56" },
  IMPACT:     { label: "Impact",     tagline: "Partner at the highest level to shape community outcomes.",         benefits: ["Strategic partner briefings", "Grant & funding access", "Advisory council seat", "Co-branded initiatives"], color: "#35143d" },
};

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
    desc: "Building confidence, skills, leadership and future opportunities for children and young people.",
    focus: ["Mentoring & Development", "Leadership & Life Skills", "Confidence Building", "Future Pathways"],
    icon: "✦",
  },
  {
    title: "Wellbeing & Leadership",
    desc: "Supporting individuals to strengthen wellbeing, develop leadership capabilities and create positive impact.",
    focus: ["Wellbeing & Personal Growth", "Confidence & Resilience", "Leadership Development", "Community Leadership", "Personal & Professional Growth"],
    icon: "◑",
  },
  {
    title: "Business & Enterprise",
    desc: "Supporting entrepreneurs, professionals and businesses through visibility, mentoring, networking and growth opportunities.",
    icon: "◈",
  },
  {
    title: "Community & Impact",
    desc: "Creating stronger, more connected communities through collaboration, partnerships and community-led initiatives.",
    focus: ["Community Development", "Partnership Initiatives", "Social Impact Projects", "Community Collaboration"],
    icon: "✿",
  },
];

const PROGRAMS_WHO_WE_SUPPORT = [
  "Children & Families", "Young People", "Women", "Men",
  "Entrepreneurs", "Businesses", "Community Organisations", "Partners & Collaborators",
];

const PROGRAMS_PARTNERS = [
  "Community Organisations", "Businesses & Industry", "Educational Institutions",
  "Government Agencies", "Sponsors & Supporters",
];

const PROGRAMS_ECOSYSTEM = [
  { eyebrow: "Building the Woman",   title: "Ms Ellevation", line: "Identity. Confidence. Leadership." },
  { eyebrow: "Building Opportunity", title: "Ellevation Hub", line: "Wellbeing. Business. Community. Impact." },
];

/* ── Opportunity "type" overview cards (compact) ── */
const OPPORTUNITY_TYPES = [
  { title: "Jobs & Work",               desc: "Curated roles from partner organizations and community businesses.",           icon: "◈" },
  { title: "Collaborations",            desc: "Project-based partnerships between members, businesses, and organizations.",   icon: "✿" },
  { title: "Professional Development",  desc: "Workshops, certifications, and skill-building sessions to sharpen your edge.", icon: "◑" },
  { title: "Referrals & Connections",   desc: "Warm introductions across our verified professional network.",                 icon: "✦" },
  { title: "Speaking & Visibility",     desc: "Panels, features, and media opportunities to raise your profile.",             icon: "◎" },
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

const CALD_OUTCOMES = [
  { title: "Language-Inclusive Programming",  desc: "Sessions and resources delivered with interpreter and multilingual support across our core programs.", icon: "✦" },
  { title: "Culturally Responsive Mentorship", desc: "Mentors matched with an understanding of cultural context, not just industry or skill.",                icon: "✿" },
  { title: "Multilingual Directory Access",    desc: "Directory support that helps CALD-owned businesses get discovered and understood by new customers.",   icon: "◈" },
  { title: "Pathways for Newly Arrived Families", desc: "Orientation, referrals, and community connection for families settling into life in Perth.",         icon: "❖" },
];

const BUSINESS_GROWTH_STATS = [
  { n: "68%",  l: "Directory members reporting increased enquiries" },
  { n: "120+", l: "Businesses featured or spotlighted" },
  { n: "45+",  l: "Referral partnerships formed" },
  { n: "3x",   l: "Average visibility growth after listing" },
];

const PROGRAMS_IN_ACTION = [
  { title: "Youth Development",     desc: "Mentorship circles and leadership days helping young people build confidence and direction.", icon: "✦" },
  { title: "Men's Pathway",         desc: "Allyship and growth programs supporting men to show up for their families and communities.",   icon: "◎" },
  { title: "Community Development", desc: "Grassroots initiatives strengthening connection across Perth's diverse neighbourhoods.",       icon: "✿" },
  { title: "Business Directory",    desc: "Visibility and referral pathways helping member businesses grow sustainably.",                 icon: "◈" },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ current, nav }: { current: Page; nav: (p: Page) => void }) {
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

        {/* Logo — larger, slow pop-up animation, swaps automatically between light/dark variants */}
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
function HomeSection({ nav }: { nav: (p: Page) => void }) {
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
            {/* <p style={hp.eyebrow}>ELLEVATION HUB</p> */}
            <h1 className="hub-home-headline" style={hp.headline}>Every Pathway Into Opportunity, In One Ecosystem.</h1>
            <p className="hub-home-sub" style={hp.sub}>
              Connecting culturally and linguistically diverse (CALD) communities, businesses, organisations and collaborators through opportunity, connection and impact.
            </p>
            <p className="hub-home-sub" style={hp.sub}>
              Whether you are looking to belong, grow, partner, support or create change, there is a place for you here.
            </p>
            <div className="hub-home-btn-row" style={hp.btnRow}>
              <button style={hp.btnPrimary} onClick={() => nav("membership")}>JOIN THE HUB</button>
              <button style={hp.btnSecondary} onClick={() => nav("opportunities")}>EXPLORE OPPORTUNITIES</button>
            </div>
          </div>
          <div className="hub-card" style={hp.card}>
            {/* <div style={hp.cardTop}>
              <span style={hp.cardBadge}>Professional Tier</span>
            </div> */}
            <p className="hub-card-desc" style={hp.cardDesc}>One ecosystem connecting directory, programs, and opportunity — built for the whole community.</p>
            <div style={hp.cardFeatures}>
              {["Business directory & categories", "Youth and men's development programs", "Jobs, grants & collaboration board", "Community events calendar"].map(feat => (
                <div key={feat} className="hub-feat" style={hp.feat}><span style={hp.check}>✓</span>{feat}</div>
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
          <p className="hub-about-eye" style={ab.eye}>FOR EVERYONE</p>
          <div style={ab.gridAuto}>
            {HOME_FOR_EVERYONE.map((item, i) => (
              <div key={item.title} className="hub-about-card" style={{ ...ab.card, ...fade(every.inView, 100 + i * 80) }}>
                <h3 className="hub-about-card-title" style={ab.cardTitle}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── THE ECOSYSTEM */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={eco.ref} style={{ ...ab.container, ...fade(eco.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>THE ECOSYSTEM</p>
          <div style={ab.gridAuto}>
            {HOME_ECOSYSTEM.map((item, i) => (
              <div key={item.title} className="hub-about-card" style={{ ...ab.card, ...fade(eco.inView, 100 + i * 100) }}>
                <p className="hub-about-eye" style={ab.eyeLeft}>{item.eyebrow}</p>
                <h3 className="hub-about-card-title" style={{ ...ab.cardTitle, fontSize: "1.4rem" }}>{item.title}</h3>
              </div>
            ))}
          </div>
          <p className="hub-about-sub" style={{ ...ab.para, marginTop: 32, fontWeight: 600, color: "#4B1E56" }}>
            Together creating pathways for thriving communities.
          </p>
        </div>
      </section>

      {/* 5 ── FINAL CTA */}
      <section className="hub-about-section hub-about-cta" style={ab.ctaSection}>
        <div ref={cta.ref} style={{ ...ab.containerNarrow, ...fade(cta.inView, 0) }}>
          <h2 style={{ ...ab.title, color: "#fff", marginBottom: 20 }}>Opportunity Starts With Connection.</h2>
          <p style={{ ...ab.para, color: "rgba(255,255,255,0.85)" }}>
            Join a growing ecosystem creating pathways for stronger communities.
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
function AboutSection({ nav }: { nav: (p: Page) => void }) {
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
            Ellevation Hub Pty Ltd is a purpose-led Australian social enterprise and leadership ecosystem creating pathways into wellbeing, leadership, visibility and economic participation.
          </p>
          <p style={{ ...ab.heroText, ...fade(mounted, 340), marginTop: 16 }}>
            Built with and for culturally and linguistically diverse (CALD) communities, Ellevation Hub connects people, businesses, organisations and opportunities into one integrated ecosystem where growth, belonging and impact can thrive.
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
                An Australia where culturally and linguistically diverse communities have equitable access to leadership, opportunity, visibility and economic participation.
              </p>
            </div>
            <div className="hub-about-card" style={ab.visionCard}>
              <p className="hub-about-eye" style={ab.eyeLeft}>OUR MISSION</p>
              <h2 className="hub-about-card-title" style={ab.cardHeading}>Our Mission</h2>
              <p className="hub-about-card-text" style={ab.bodyText}>
                To create connected pathways that empower individuals, businesses and communities through leadership, collaboration, business support, mentoring and opportunity.
              </p>
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
            Ellevation Hub functions as a lifecycle ecosystem supporting individuals from early childhood through to leadership, entrepreneurship and economic participation.
          </p>
          <p className="hub-about-sub" style={ab.para}>
            We bring together community development, youth pathways, leadership programs, business networks and strategic partnerships into one connected impact model.
          </p>
          <p className="hub-about-sub" style={{ ...ab.para, fontWeight: 600, color: "#4B1E56" }}>
            Our goal is simple: to ensure people and communities have access to the networks, resources, visibility and opportunities needed to thrive.
          </p>
        </div>
      </section>

      {/* 4 ── WHY ELLEVATION HUB MATTERS */}
      <section className="hub-about-section" style={ab.sectionDark}>
        <div ref={y.ref} style={{ ...ab.containerNarrow, ...fade(y.inView, 0) }}>
          <p style={{ ...ab.eye, color: "#c9a3d9" }}>WHY ELLEVATION HUB MATTERS</p>
          <h2 style={{ ...ab.title, color: "#fff", fontSize: "clamp(1.7rem,4vw,2.5rem)", fontStyle: "italic" }}>
            For many people and communities, opportunity is not always the challenge. Access is.
          </h2>
          <p style={{ ...ab.para, color: "rgba(255,255,255,0.82)" }}>
            Access to networks, mentors, visibility, industry connections, leadership pathways, business support and opportunities.
          </p>
          <p style={{ ...ab.para, color: "rgba(255,255,255,0.82)" }}>
            Ellevation Hub exists to bridge these gaps by connecting people, organisations and opportunities through one integrated ecosystem.
          </p>
        </div>
      </section>

      {/* 5 ── OUR ECOSYSTEM APPROACH */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={a.ref} style={{ ...ab.container, ...fade(a.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>OUR ECOSYSTEM APPROACH</p>
          <h2 className="hub-about-title" style={ab.title}>More Than a Network. More Than a Directory.</h2>
          <div style={ab.gridAuto}>
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

      {/* 6 ── WHO WE SUPPORT */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
        <div ref={s.ref} style={{ ...ab.container, ...fade(s.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>WHO WE SUPPORT</p>
          <h2 className="hub-about-title" style={ab.title}>Every Community. Every Pathway.</h2>
          <div style={ab.gridAuto}>
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

      {/* 8 ── OUR COMMITMENT */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
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

      {/* 9 ── THE ELLEVATION ECOSYSTEM */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={e.ref} style={{ ...ab.container, ...fade(e.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>THE ELLEVATION ECOSYSTEM</p>
          <h2 className="hub-about-title" style={ab.title}>Two Brands. One Connected Journey.</h2>
          <div style={ab.gridThree}>
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
                  style={{ ...ab.cardTitle, fontSize: "1.4rem", ...(item.title === "Together" ? { color: "#fff" } : {}) }}
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

const MEMBERSHIP_PURPOSES = [
  { id: "enquiry",      label: "Membership Enquiry",       desc: "I have questions before deciding." },
  { id: "application",  label: "Membership Application",   desc: "I'm ready to apply now." },
  { id: "future",       label: "Future Registration",      desc: "Notify me when registrations open." },
] as const;

function MembershipSection() {
  const [activeTier, setActiveTier] = useState<HubTier>("CONNECT");
  const [purpose, setPurpose] = useState<typeof MEMBERSHIP_PURPOSES[number]["id"]>("enquiry");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const meta = HUB_TIER_META[activeTier];

  // controlled fields so we can read + send them
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [industry, setIndustry]   = useState("");
  const [notes, setNotes]         = useState("");
  const [agreed, setAgreed]       = useState(false);

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

      membership_tier: HUB_TIER_META[activeTier].label,
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
//service Id :service_ux9vfej
//Template ID : template_oczchp4
//Public Key: Pu2wZN2ERnHjdboLI
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
    <section className="hub-membership-section" style={jp.formSection}>
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p className="hub-form-eye" style={mb.pageEye}>MEMBERSHIP · TIERS &amp; BENEFITS</p>
          <h2 className="hub-form-title" style={{ ...jp.formTitle, fontSize: "2.2rem" }}>Find Your Tier, Then Reach Out</h2>
          <p className="hub-form-sub" style={{ ...jp.formSub, maxWidth: 520, margin: "8px auto 0" }}>
            Ellevation Hub membership runs across four tiers — Connect, Grow, Visibility, and Impact. Explore what each offers, then submit an Expression of Interest below.
          </p>
        </div>

        <div style={mb.tabsRow}>
          {HUB_TIERS.map(t => (
            <button
              key={t}
              className={`hub-tier-tab${activeTier === t ? " active" : ""}`}
              style={{ ...mb.tabBtn, ...(activeTier === t ? { ...mb.tabActive, background: "#D7B264" } : {}) }}
              onClick={() => setActiveTier(t)}
            >
              {HUB_TIER_META[t].label}
            </button>
          ))}
        </div>

        <div className="hub-form-card" style={{ ...jp.card, borderTop: `3px solid ${meta.color}` }}>
          <div style={jp.formHeader}>
            <h2 className="hub-form-title" style={jp.formTitle}>{meta.label} Membership</h2>
            <p className="hub-form-sub" style={jp.formSub}>{meta.tagline}</p>
          </div>

          <div style={mb.benefitsList}>
            {meta.benefits.map(b => (
              <div key={b} className="hub-benefit-item" style={mb.benefitItem}>
                <span style={{ ...mb.benefitDot, background: meta.color }} />{b}
              </div>
            ))}
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
                      style={{ accentColor: meta.color, cursor: "pointer" }}
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
                rows={3}
                placeholder="Anything you'd like us to know? (optional)"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />

              {/* Privacy Policy & Terms agreement */}
              <label
                className="hub-form-sub"
                style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 20, fontSize: "0.82rem", cursor: "pointer" }}
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

              <button type="submit" disabled={sending} style={{ ...jp.submitBtn, background: "#D7B264", opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}>
                {sending ? "SENDING..." : "SUBMIT EXPRESSION OF INTEREST"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function DirectorySection({ nav }: { nav: (p: Page) => void }) {
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

function ProgramsSection({ nav }: { nav: (p: Page) => void }) {
  const path = useInView(0.08);
  const who = useInView(0.1);
  const part = useInView(0.1);
  const eco = useInView(0.1);
  const cta = useInView(0.12);

  return (
<div ref={path.ref} style={{ ...ab.container, maxWidth: 1320, ...fade(path.inView, 0) }}>      {/* 1 ── HEADER */}
      <section className="hub-programs-section" style={{ ...pg.section, paddingBottom: 60 }}>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <p className="hub-programs-eye" style={pg.eye}>OUR PROGRAMS</p>
          <h2 className="hub-programs-title" style={{ ...pg.title, marginBottom: 20 }}>
            Development Pathways for Growth, Leadership and Opportunity
          </h2>
          <p className="hub-programs-card-text" style={pg.lead}>
            Creating opportunities for individuals, businesses and communities to grow, connect and thrive.
          </p>
          <p className="hub-programs-card-title" style={pg.tagline}>
            From childhood to leadership. From ideas to opportunity.
          </p>
          <button style={pg.ctaBtn} onClick={() => nav("connect")}>ENQUIRE ABOUT A PROGRAM</button>
        </div>
      </section>

      {/* 2 ── OUR PATHWAYS */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
        <div ref={path.ref} style={{ ...ab.container, ...fade(path.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>OUR PATHWAYS</p>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 ── WHO WE SUPPORT */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={who.ref} style={{ ...ab.container, ...fade(who.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>WHO WE SUPPORT</p>
          <div style={pg.chipRow}>
            {PROGRAMS_WHO_WE_SUPPORT.map(w => (
              <span key={w} className="hub-programs-chip" style={pg.chip}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── PARTNERS & COLLABORATORS */}
      <section className="hub-about-section hub-about-plain" style={ab.sectionWhite}>
        <div ref={part.ref} style={{ ...ab.containerNarrow, ...fade(part.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>PARTNERS &amp; COLLABORATORS</p>
          <p className="hub-about-sub" style={ab.para}>
            We work alongside community organisations, businesses, educators, government and supporters to create opportunities that strengthen communities and create lasting impact.
          </p>
          <p className="hub-about-sub" style={{ ...ab.para, fontWeight: 600, color: "#4B1E56" }}>
            We welcome partnerships with:
          </p>
          <div style={pg.chipRow}>
            {PROGRAMS_PARTNERS.map(w => (
              <span key={w} className="hub-programs-chip" style={pg.chip}>{w}</span>
            ))}
            <span className="hub-programs-chip" style={pg.chip}>Community Leaders</span>
          </div>
          <div style={{ marginTop: 36 }}>
            <button style={pg.ctaBtn} onClick={() => nav("connect")}>PARTNER WITH US</button>
          </div>
        </div>
      </section>

      {/* 5 ── THE ELLEVATION ECOSYSTEM */}
      <section className="hub-about-section hub-about-alt" style={ab.sectionLight}>
        <div ref={eco.ref} style={{ ...ab.container, ...fade(eco.inView, 0) }}>
          <p className="hub-about-eye" style={ab.eye}>THE ELLEVATION ECOSYSTEM</p>
          <div style={ab.gridAuto}>
            {PROGRAMS_ECOSYSTEM.map((item, i) => (
              <div key={item.title} className="hub-about-card" style={{ ...ab.card, ...fade(eco.inView, 100 + i * 100) }}>
                <p className="hub-about-eye" style={ab.eyeLeft}>{item.eyebrow}</p>
                <h3 className="hub-about-card-title" style={{ ...ab.cardTitle, fontSize: "1.4rem" }}>{item.title}</h3>
                <p className="hub-about-card-text" style={ab.cardText}>{item.line}</p>
              </div>
            ))}
            <div className="hub-about-card" style={{ ...ab.card, ...ab.cardHighlight, ...fade(eco.inView, 300) }}>
              <p style={{ ...ab.eyeLeft, color: "#D7B264" }}>TOGETHER</p>
              <h3 style={{ ...ab.cardTitle, fontSize: "1.2rem", color: "#fff" }}>Creating pathways for thriving communities.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6 ── FINAL CTA */}
      <section className="hub-about-section hub-about-cta" style={ab.ctaSection}>
        <div ref={cta.ref} style={{ ...ab.containerNarrow, ...fade(cta.inView, 0) }}>
          <h2 style={{ ...ab.title, color: "#fff", marginBottom: 20 }}>Opportunity Starts With Access.</h2>
          <p style={{ ...ab.para, color: "rgba(255,255,255,0.85)" }}>
            Whether you're looking to learn, lead, grow a business, support your community or collaborate with others, there's a place for you at Ellevation Hub.
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
function OpportunityListingCard({ o, onApply }: { o: OpportunityListing; onApply: (o: OpportunityListing) => void }) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              <input className="form-input" required placeholder="Full Name" />
              <input className="form-input" type="email" required placeholder="Email Address" />
              <input className="form-input" type="tel" placeholder="Phone Number (optional)" />
              <textarea className="form-input" rows={3} style={{ resize: "vertical" }} placeholder="Anything you'd like to share? (optional)" />
              <button type="submit" style={op.modalSubmitBtn}>SUBMIT EXPRESSION OF INTEREST</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function OpportunitiesSection({ nav }: { nav: (p: Page) => void }) {
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

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
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
              <input className="form-input" required placeholder="Full Name" />
              <input className="form-input" type="email" required placeholder="Email Address" />
              <input className="form-input" type="tel" placeholder="Phone Number (optional)" />
              <select className="form-input" defaultValue="1">
                <option value="1">1 attendee</option>
                <option value="2">2 attendees</option>
                <option value="3">3 attendees</option>
                <option value="4">4+ attendees</option>
              </select>
              <button type="submit" style={evs.modalSubmitBtn}>SUBMIT QUICK REGISTRATION</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function EventsSection({ events = [] }: { nav: (p: Page) => void; events?: EventItem[] }) {
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
        From grassroots community networks to growing businesses, rising youth, and men committed to allyship — here's where the Hub is making a measurable difference.
      </p>

      <div className="hub-impact-stats" style={st.statsGrid}>
        {IMPACT_STATS.map(s => (
          <div key={s.l} className="hub-impact-stat" style={st.statCard}>
            <p className="hub-impact-stat-num" style={st.statNum}>{s.n}</p>
            <p className="hub-impact-stat-label" style={st.statLabel}>{s.l}</p>
          </div>
        ))}
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
        <h3 className="hub-impact-subtitle" style={st.subtitle}>Results for Our Directory Members</h3>
        <div className="hub-impact-stats" style={st.statsGrid}>
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
        <h3 className="hub-impact-subtitle" style={st.subtitle}>Where the Work Happens Day to Day</h3>
        <div className="hub-impact-programs-grid" style={st.programsGrid}>
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
        <p className="hub-impact-vision-text" style={st.visionText}>We're building toward a future where every member of our community — regardless of background — has direct access to opportunity, capital, and belonging.</p>
      </div>
    </section>
  );
}

/* ── Connect: Hero Banner ── */
function ConnectHero() {
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
            Connect With Us
          </span>
          <div className={mounted ? "line-draw" : ""} style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)", transformOrigin: "left center" }} />
        </div>

        <h1 style={{
          ...fade(mounted, 130),
          fontFamily: "'Astrid Regular', serif",
          fontSize: "clamp(38px,7.5vw,82px)",
          fontWeight: 700,
          color: "#fff", margin: "0 0 20px", lineHeight: 1.1,
        }}>
          Ecosystem Hub Enquiry
        </h1>

        <p style={{
          ...fade(mounted, 260),
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "clamp(15px,1.8vw,17px)",
          color: "rgba(255,255,255,0.9)", maxWidth: 580, margin: "0 auto", lineHeight: 1.75,
        }}>
          Whether you are looking to collaborate, seek programmatic guidance, or establish community connections, let us build pathways together.
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
  const [agreed, setAgreed] = useState(false);

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
          <h2 style={{ fontFamily: "'Astrid Regular', serif", fontSize: "clamp(30px,4.5vw,44px)", fontWeight: 700, color: "#4B1E56", margin: 0 }}>
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
              <p style={{ fontFamily: "'Montserrat',sans-serif", color: "#554866", fontSize: 15, lineHeight: 1.6, maxWidth: 445, margin: "0 auto" }}>
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
                    fontSize: 13,
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
  eyebrow: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", color: "#ffffff" },
  headline: { fontFamily: "'Astrid Regular', serif", fontSize: "clamp(2.4rem,4vw,3.6rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0, letterSpacing: "-0.01em" },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", fontWeight: 400, color: "#ffffff", lineHeight: 1.7, maxWidth: 480 },
  btnRow: { display: "flex", gap: 14, flexWrap: "wrap" as const },
  btnPrimary: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 28px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(215,35,143,0.35)" },
  btnSecondary: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 28px", borderRadius: 100, border: "none", background: "#D7B264", color: "#ffffff", cursor: "pointer", transition: "all 0.2s ease" },
  card: { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "32px", boxShadow: "0 8px 48px rgba(26,10,46,0.08)", border: "1px solid rgba(255,255,255,0.7)" },
  cardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  cardIcon: { width: 48, height: 48, borderRadius: "50%", background: "#662369", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" },
  cardBadge: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#1a0a2e", background: "rgba(75,30,86,0.10)", padding: "5px 14px", borderRadius: 100 },
  cardDesc: { fontFamily: "'Astrid Regular',serif", fontSize: "1.25rem", fontWeight: 500, color: "#1a0a2e", lineHeight: 1.4, marginBottom: 20 },
  cardFeatures: { display: "flex", flexDirection: "column", gap: 10 },
  feat: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#554866", display: "flex", alignItems: "center", gap: 10 },
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
  heroEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.25em", color: "#D7B264", marginBottom: 20 },
  heroTitle: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(2.4rem,6vw,4.2rem)", color: "#fff", lineHeight: 1.1, marginBottom: 28 },
  heroText: { fontFamily: "'Montserrat',sans-serif", fontSize: "1.02rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.8, maxWidth: 740, margin: "0 auto" },

  /* Section shells */
  sectionLight: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)" },
  sectionWhite: { padding: "100px 48px", background: "#fff" },
  sectionDark: { padding: "100px 48px", background: "#1a0a2e", textAlign: "center" },
  ctaSection: { padding: "100px 48px", textAlign: "center", background: "linear-gradient(135deg, #6b2f7a 0%, #4B1E56 55%, #35143d 100%)" },
  container: { maxWidth: 1180, margin: "0 auto", textAlign: "center" },
  containerNarrow: { maxWidth: 780, margin: "0 auto", textAlign: "center" },

  /* Typography */
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  eyeLeft: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#8a5a97", letterSpacing: "0.2em", marginBottom: 10 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3rem)", color: "#4B1E56", marginBottom: 40, lineHeight: 1.15 },
  para: { fontFamily: "'Montserrat',sans-serif", fontSize: "1.02rem", color: "#554866", lineHeight: 1.85, marginBottom: 18 },
  cardHeading: { fontFamily: "'Astrid Regular', serif", fontSize: "1.8rem", color: "#1a0a2e", marginBottom: 14 },
  bodyText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.98rem", color: "#554866", lineHeight: 1.8 },

  /* Vision / mission */
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, textAlign: "left" },
  visionCard: { padding: "40px 36px", background: "#fff", borderRadius: 22, border: "1px solid rgba(124,92,191,0.15)", boxShadow: "0 8px 32px rgba(124,92,191,0.08)", borderTop: "3px solid #D7B264" },

  /* Generic card grids */
  gridAuto: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 20, textAlign: "left" },
  gridThree: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, textAlign: "left" },
  card: { padding: 28, background: "#fff", borderRadius: 20, border: "1px solid rgba(124,92,191,0.15)", boxShadow: "0 4px 16px rgba(124,92,191,0.06)" },
  cardHighlight: { background: "linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%)", border: "1px solid transparent" },
  icon: { fontSize: "1.7rem", color: "#4B1E56", marginBottom: 14 },
  cardTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "1.2rem", color: "#1a0a2e", marginBottom: 10 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.86rem", color: "#554866", lineHeight: 1.65 },
  accessCard: { textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", font: "inherit" },
  cardLink: { marginTop: "auto", paddingTop: 16, fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "#8a5a97" },

  /* Commitment */
  commitGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, textAlign: "left", maxWidth: 960, margin: "0 auto" },
  commitItem: { display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", borderRadius: 16, background: "#f6f3fa", border: "1px solid rgba(124,92,191,0.15)", fontFamily: "'Montserrat',sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#1a0a2e" },
  commitDot: { flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#D7B264", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 },

  /* CTA */
  ctaRow: { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" as const, marginTop: 32 },
  ctaPrimary: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", padding: "15px 34px", borderRadius: 100, border: "2px solid #D7B264", background: "#D7B264", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" },
  ctaSecondary: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", padding: "15px 34px", borderRadius: 100, border: "2px solid rgba(255,255,255,0.7)", background: "transparent", color: "#fff", cursor: "pointer" },
  positioning: { marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.18)", fontFamily: "'Astrid Regular', serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 },
};

const mb: Record<string, React.CSSProperties> = {
  tabsRow: { display: "flex", justifyContent: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" as const },
  tabBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "10px 22px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "transparent", color: "#662369", cursor: "pointer", transition: "all 0.25s ease" },
  tabActive: { color: "#fff", border: "1.5px solid transparent", boxShadow: "0 4px 20px rgba(102,35,105,0.30)" },
  benefitsList: { display: "flex", flexDirection: "column", gap: 10, margin: "0 0 8px" },
  benefitItem: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", color: "#554866", display: "flex", alignItems: "center", gap: 10 },
  benefitDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  pageEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 12 },
  divider: { height: 1, background: "#ede7f5", margin: "24px 0" },
  formLabel: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#4B1E56", marginBottom: 12 },
  purposeRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 },
  purposeTile: { display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 14, border: "1.5px solid #ded4ee", cursor: "pointer", transition: "all 0.2s ease" },
  purposeLabel: { display: "block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#1a0a2e" },
  purposeDesc: { display: "block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", color: "#554866", marginTop: 2 },
};

const dr: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 48 },
  card: { padding: 28, background: "#fff", borderRadius: 18, textAlign: "left", border: "1px solid rgba(124, 92, 191, 0.15)" },
  icon: { fontSize: "1.5rem", color: "#4B1E56", marginBottom: 12 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.15rem", color: "#1a0a2e", marginBottom: 6 },
  cardCount: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", color: "#8a5a97" },
  ctaBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(215,35,143,0.30)" },
};

const pg: Record<string, React.CSSProperties> = {
  section: { position: "relative", padding: "100px 48px", overflow: "hidden", textAlign: "center", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16, position: "relative", zIndex: 1 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,2.8rem)", color: "#4B1E56", lineHeight: 1.25, maxWidth: 760, margin: "0 auto 48px", position: "relative", zIndex: 1 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto 40px" },
  card: { padding: 32, background: "#fff", borderRadius: 16, border: "1px solid rgba(124, 92, 191, 0.15)", textAlign: "left", boxShadow: "0 4px 16px rgba(124,92,191,0.06)" },
  icon: { fontSize: "1.6rem", color: "#4B1E56", marginBottom: 14 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.3rem", color: "#1a0a2e", marginBottom: 10 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", color: "#554866", lineHeight: 1.6 },
  ctaBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", position: "relative", zIndex: 1, boxShadow: "0 4px 20px rgba(215,35,143,0.30)" },
  lead: { fontFamily: "'Montserrat',sans-serif", fontSize: "1.02rem", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 12px", position: "relative", zIndex: 1 },
  tagline: { fontFamily: "'Astrid Regular',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#4B1E56", margin: "0 auto 32px", position: "relative", zIndex: 1 },
  pathGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, textAlign: "left", alignItems: "stretch" },  focusList: { listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginTop: 10 },
  focusItem: { display: "flex", alignItems: "center", gap: 10, fontFamily: "'Montserrat',sans-serif", fontSize: "0.86rem", color: "#554866" },
  focusDot: { flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "#D7B264", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 },
  chipRow: { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" as const },
  chip: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.03em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "10px 20px", borderRadius: 100, marginTop: 16, width: "fit-content" },
};

/* ── Opportunities: compact type cards + live filterable board ── */
const op: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", position: "relative", overflow: "hidden" },
  container: { maxWidth: 1140, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 40px" },

  // Compact "type" overview cards
  grid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 60 },
  card: { padding: "18px 16px", background: "#fff", borderRadius: 14, textAlign: "left", border: "1px solid rgba(124, 92, 191, 0.15)", transition: "all 0.2s ease" },
  icon: { fontSize: "1.15rem", color: "#4B1E56", marginBottom: 8 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "0.96rem", color: "#1a0a2e", marginBottom: 4 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.76rem", color: "#554866", lineHeight: 1.5 },

  divider: { height: 1, background: "rgba(75,30,86,0.14)", margin: "0 0 40px", maxWidth: 1100, marginLeft: "auto", marginRight: "auto" },

  boardEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 12 },
  boardTitle: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#4B1E56", marginBottom: 32 },

  filterRow: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" as const, marginBottom: 40 },
  filterBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.04em", padding: "10px 18px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "#fff", color: "#554866", cursor: "pointer", transition: "all 0.2s ease" },
  filterBtnActive: { background: "#D7B264", borderColor: "#D7B264", color: "#fff", boxShadow: "0 4px 16px rgba(215,35,143,0.30)" },

  // Live opportunity listing cards
  listGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, textAlign: "left" },
  listCard: { padding: "24px 24px", background: "#fff", borderRadius: 18, border: "1px solid rgba(124, 92, 191, 0.15)", display: "flex", flexDirection: "column", boxShadow: "0 4px 16px rgba(124,92,191,0.05)", transition: "all 0.2s ease" },
  listBadgeRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const, marginBottom: 12 },
  typeBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#fff", background: "#1a0a2e", padding: "5px 12px", borderRadius: 100 },
  categoryPill: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.04em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "4px 11px", borderRadius: 100 },
  listMeta: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#8a5a97", marginBottom: 6 },
  listTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.2rem", color: "#1a0a2e", marginBottom: 8 },
  listText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#554866", lineHeight: 1.6, marginBottom: 18, flexGrow: 1 },
  listFooterRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: "auto", flexWrap: "wrap" as const },
  deadline: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#8a5a97" },
  applyBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", padding: "11px 20px", borderRadius: 100, border: "2px solid #D7B264", background: "#D7B264", color: "#fff", cursor: "pointer", whiteSpace: "nowrap" as const },

  ctaBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(215,35,143,0.30)" },

  // Quick-apply modal
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(26,10,46,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 },
  modalCard: { background: "#fff", borderRadius: 22, padding: "36px 32px", maxWidth: 440, width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(26,10,46,0.35)" },
  modalClose: { position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: "50%", border: "none", background: "#f6f3fa", color: "#554866", fontSize: "0.85rem", cursor: "pointer" },
  modalEyebrow: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "#8a5a97", marginBottom: 10 },
  modalTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.5rem", color: "#1a0a2e", marginBottom: 10, textAlign: "left" },
  modalSub: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#554866", lineHeight: 1.6, textAlign: "left" },
  modalSubmitBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", marginTop: 4 },
};

const evs: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, textAlign: "left" },
  card: { padding: "28px 26px", background: "#f6f3fa", borderRadius: 18, border: "1px solid rgba(124, 92, 191, 0.15)", display: "flex", flexDirection: "column", gap: 0 },
  dateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: "#1a0a2e", padding: "5px 12px", borderRadius: 100, marginBottom: 12, width: "fit-content" },
  categoryPill: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "4px 11px", borderRadius: 100, marginBottom: 10, width: "fit-content" },
  category: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "#8a5a97", marginBottom: 8 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.25rem", color: "#1a0a2e", marginBottom: 8 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", color: "#554866", lineHeight: 1.6, marginBottom: 20, flexGrow: 1 },
  rsvpBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", padding: "12px", borderRadius: 100, border: "2px solid #D7B264", background: "#D7B264", color: "#fff", cursor: "pointer", marginTop: "auto" },
  filterRow: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" as const, marginBottom: 40 },
  filterBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.04em", padding: "10px 18px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "#fff", color: "#554866", cursor: "pointer", transition: "all 0.2s ease" },
  filterBtnActive: { background: "#D7B264", borderColor: "#D7B264", color: "#fff", boxShadow: "0 4px 16px rgba(215,35,143,0.30)" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(26,10,46,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 },
  modalCard: { background: "#fff", borderRadius: 22, padding: "36px 32px", maxWidth: 440, width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(26,10,46,0.35)" },
  modalClose: { position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: "50%", border: "none", background: "#f6f3fa", color: "#554866", fontSize: "0.85rem", cursor: "pointer" },
  modalDateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "#8a5a97", marginBottom: 10 },
  modalTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.5rem", color: "#1a0a2e", marginBottom: 10, textAlign: "left" },
  modalSub: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#554866", lineHeight: 1.6, textAlign: "left" },
  modalSubmitBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", cursor: "pointer", marginTop: 4 },
  modalCtaLink: { display: "inline-block", marginTop: 20, fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: "#D7B264", padding: "14px 24px", borderRadius: 100, textDecoration: "none" },
};

const jp: Record<string, React.CSSProperties> = {
  formSection: { padding: "100px 24px", background: "#fff", display: "flex", justifyContent: "center" },
  card: { background: "#fff", padding: "48px", borderRadius: 24, boxShadow: "0 10px 40px rgba(102,35,105,0.08)", border: "1px solid rgba(124, 92, 191, 0.12)", width: "100%" },
  formHeader: { textAlign: "center", marginBottom: 32 },
  formTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "2rem", color: "#1a0a2e", marginBottom: 8 },
  formSub: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", color: "#554866" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  input: { width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid #ede7f5", background: "#fdf9fc", fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", outline: "none" },
  select: { appearance: "none" as const, cursor: "pointer" },
  submitBtn: { width: "100%", marginTop: 24, padding: "16px", borderRadius: 100, border: "none", background: "#D7B264", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", letterSpacing: "0.1em" },
};

const st: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", textAlign: "center" },
  sectionEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 14 },
  bannerTitle: { fontFamily: "'Astrid Regular', serif", fontWeight: 700, fontSize: "2.8rem", color: "#4B1E56", marginBottom: 16, maxWidth: 780, marginLeft: "auto", marginRight: "auto", lineHeight: 1.15 },
  lead: { fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", color: "#554866", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 48px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 900, margin: "0 auto 56px" },
  statCard: { padding: "24px 16px", background: "#fff", borderRadius: 16, border: "1px solid rgba(124, 92, 191, 0.15)" },
  statNum: { fontFamily: "'Astrid Regular',serif", fontSize: "2rem", fontWeight: 600, color: "#1a0a2e", marginBottom: 6 },
  statLabel: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", color: "#554866", letterSpacing: "0.02em" },
  subSection: { maxWidth: 1100, margin: "0 auto 72px" },
  subtitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.9rem", color: "#1a0a2e", marginBottom: 32, lineHeight: 1.2 },
  caldGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  caldCard: { padding: "24px 20px", background: "#fff", borderRadius: 16, border: "1px solid rgba(124, 92, 191, 0.15)", textAlign: "left" },
  caldIcon: { fontSize: "1.4rem", color: "#4B1E56", marginBottom: 10 },
  caldTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.05rem", color: "#1a0a2e", marginBottom: 6 },
  caldText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem", color: "#554866", lineHeight: 1.55 },
  programsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  programCard: { padding: "24px 20px", background: "#1a0a2e", borderRadius: 16, textAlign: "left" },
  programIcon: { fontSize: "1.4rem", color: "#fff", marginBottom: 10 },
  programTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.05rem", color: "#fff", marginBottom: 6 },
  programText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" },
  card: { padding: 40, border: "1px solid rgba(124, 92, 191, 0.15)", borderRadius: 24, textAlign: "left", background: "#fff" },
  quote: { fontFamily: "'Astrid Regular', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#554866", lineHeight: 1.6, marginBottom: 20 },
  name: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#1a0a2e" },
  role: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#8a5a97", marginTop: 2 },
  visionBox: { maxWidth: 700, margin: "0 auto", padding: "32px 28px", background: "#1a0a2e", borderRadius: 20 },
  visionEye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", color: "#c9a3d9", marginBottom: 12 },
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

  const nav = (p: Page) => {
    if (p === "home") {
      setSearchParams({});
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

        /* ═══════════════════════════════════════
           NAVBAR — single centered pill row,
           FIXED to the viewport at all times
           ═══════════════════════════════════════ */

[data-theme="dark"] .hub-programs-chip {
  background: rgba(255,255,255,0.07) !important;
  border-color: rgba(155,109,190,0.3) !important;
  color: #d9a8cd !important;
}
[data-theme="dark"] .hub-programs-section .hub-programs-card-text { color: rgba(255,255,255,0.75) !important; }
[data-theme="dark"] .hub-programs-section .hub-programs-card-title { color: #e8e0f8 !important; }


       .ms-nav-row{
  position:fixed; top:0; left:0; right:0; z-index:100;
  display:flex; flex-direction:column; align-items:center;
  padding:10px 20px 0;   /* was 16px */
}
        .ms-nav{
          width:100%;
          max-width:1240px;
          display:flex;
          align-items:center;
          gap:14px;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(102,35,105,0.08);
          border-radius:100px;
padding:3px 10px 3px 8px;          box-shadow:0 2px 16px rgba(102,35,105,0.08);
          transition:box-shadow 0.3s ease;
        }
        .ms-nav.ms-nav-scrolled{
          box-shadow:0 4px 32px rgba(102,35,105,0.18);
        }
        .ns-back-home{
          display:flex; align-items:center; gap:6px;
          font-family:'Montserrat', sans-serif;
          font-size:0.78rem; font-weight:600;
          color:#662369;
          background:rgba(102,35,105,0.06);
          border:1px solid rgba(102,35,105,0.12);
          border-radius:100px;
          padding:9px 16px;
          cursor:pointer;
          white-space:nowrap;
          transition:all 0.2s ease;
          flex-shrink:0;
        }
        .ns-back-home:hover{ background:rgba(102,35,105,0.12); opacity:1; }

        /* ── Logo: larger + slow "pop-up" entrance so it stands out ── */
       .ns-logo{
  width:190px;              /* unchanged, same logo size */
  height:auto;
  margin:-12px 0;           /* NEW: shrinks the navbar height, logo size stays the same */
  object-fit:contain;
  cursor:pointer;
  flex-shrink:0;
  transform-origin:center;
  animation:logoPopIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both, logoPulse 3s ease-in-out 1.4s infinite;
  transition:transform 0.3s ease, filter 0.3s ease;
}
        .ns-logo:hover{
          animation:none;
          transform:scale(1.1);
          filter:drop-shadow(0 0 18px rgba(215,178,100,0.95));
        }
        @keyframes logoPopIn{
          0%   { opacity:0; transform:scale(0.4); filter:drop-shadow(0 0 0 rgba(215,178,100,0)); }
          55%  { opacity:1; transform:scale(1.18); filter:drop-shadow(0 0 22px rgba(215,178,100,0.95)); }
          78%  { transform:scale(0.97); }
          100% { opacity:1; transform:scale(1); filter:drop-shadow(0 0 6px rgba(215,178,100,0.55)); }
        }
        @keyframes logoPulse{
          0%, 100% { transform:scale(1);    filter:drop-shadow(0 0 6px rgba(215,178,100,0.55)); }
          50%      { transform:scale(1.05); filter:drop-shadow(0 0 20px rgba(215,178,100,0.95)); }
        }
        @media (prefers-reduced-motion: reduce){
          .ns-logo{ animation:none; }
        }

        .ns-links-desktop{
          display:flex; align-items:center; gap:2px;
          flex:1;
          justify-content:center;
          flex-wrap:wrap;
        }
        .ns-link{
          font-family:'Montserrat', sans-serif;
          font-size:0.8rem; font-weight:500;
          color:#662369; background:transparent;
          border:none; cursor:pointer;
          padding:9px 13px; border-radius:100px;
          transition:all 0.2s ease; white-space:nowrap;
        }
        .ns-link:hover{ background:rgba(102,35,105,0.06); opacity:1; }
        .ns-link.active{
          background:linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%);
          color:#fff; font-weight:600;
          box-shadow:0 2px 12px rgba(26,10,46,0.25);
        }
        .ns-link.active:hover{ opacity:1; }
        .ns-menu-toggle{
          display:none;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          gap:5px;
          width:38px; height:38px;
          border-radius:50%;
          border:none;
          background:rgba(102,35,105,0.06);
          cursor:pointer;
          flex-shrink:0;
        }
        .ns-menu-toggle span{
          display:block; width:18px; height:2px;
          background:#662369; border-radius:2px;
          transition:all 0.25s ease;
        }
        .ns-menu-toggle.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
        .ns-menu-toggle.open span:nth-child(2){ opacity:0; }
        .ns-menu-toggle.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
        .ns-mobile-menu{
          max-height:0;
          overflow:hidden;
          width:100%;
          max-width:1240px;
          opacity:0;
          transition:max-height 0.3s ease, opacity 0.25s ease, margin 0.3s ease;
        }
        .ns-mobile-menu.open{
          max-height:520px;
          opacity:1;
          margin-top:10px;
          display:flex; flex-direction:column; gap:4px;
          background:rgba(255,255,255,0.97);
          backdrop-filter:blur(16px);
          border-radius:22px;
          padding:10px;
          box-shadow:0 12px 40px rgba(102,35,105,0.16);
          border:1px solid rgba(102,35,105,0.08);
          overflow-y:auto;
          max-height:calc(100vh - 100px);
        }
        .ns-mobile-menu .ns-mobile-link{
          display:block;
          width:100%;
          text-align:left;
          font-family:'Montserrat', sans-serif;
          font-size:0.92rem; font-weight:500;
          color:#662369; background:transparent;
          border:none; cursor:pointer;
          padding:13px 18px; border-radius:14px;
          transition:all 0.2s ease;
        }
        .ns-mobile-link:hover{ background:rgba(102,35,105,0.06); opacity:1; }
        .ns-mobile-link.active{
          background:linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%) !important;
          color:#fff !important;
        }

        /* Hub has more nav items than Ms. Ellevation, and the logo is now larger,
           so the hamburger kicks in earlier to avoid link wrapping/overflow. */
        @media (max-width: 1280px){
          .ns-links-desktop{ display:none; }
          .ns-menu-toggle{ display:flex; }
        }
       @media (max-width: 560px){
  .ns-back-home span{ display:none; }
  .ns-back-home{ padding:9px 12px; }
  .ns-logo{ width:135px; margin:-8px 0; }
  .ms-nav{ padding:3px 8px; gap:10px; }
}

        /* ═══════════════════════════════════════
           RESPONSIVE — section grids collapse
           on tablet / mobile so nothing overflows
           ═══════════════════════════════════════ */
        @media (max-width: 900px){
          .hub-home-grid{ grid-template-columns:1fr !important; text-align:center; }
          .hub-home-btn-row{ justify-content:center !important; }
          .hub-about-two-col{ grid-template-columns:1fr !important; }
          .hub-directory-grid{ grid-template-columns:repeat(2,1fr) !important; }
/* Programs: 4 pathway cards in one row on desktop */
.hub-programs-grid .hub-about-card{
  display:flex;
  flex-direction:column;
  padding:24px 20px !important;
}
.hub-programs-grid .hub-about-card .hub-programs-chip{
  margin-top:auto !important;
}
@media (max-width: 1100px){
  .hub-programs-grid{ grid-template-columns:repeat(2, 1fr) !important; }
}
@media (max-width: 640px){
  .hub-programs-grid{ grid-template-columns:1fr !important; }
}
            .hub-opportunities-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-opportunities-listing-grid{ grid-template-columns:1fr !important; }
          .hub-events-grid{ grid-template-columns:1fr !important; }
          .hub-impact-stats{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-impact-cald-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-impact-programs-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .hub-impact-grid{ grid-template-columns:1fr !important; }
          .hub-form-row{ grid-template-columns:1fr !important; }
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

        /* ── Dark Mode Overrides ── */

        /* Root background & text */
        [data-theme="dark"] .hub-root {
          background: #0d0614 !important;
          color: #e8e0f8 !important;
        }

        /* Navbar */
        [data-theme="dark"] .ms-nav {
          background: rgba(22, 13, 34, 0.92) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .ms-nav.ms-nav-scrolled {
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35) !important;
        }
        [data-theme="dark"] .ns-logo {
          filter: drop-shadow(0 0 6px rgba(215,178,100,0.55));
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
        [data-theme="dark"] .hub-input {
          background: #0d0614 !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-input::placeholder {
          color: rgba(232, 224, 248, 0.35) !important;
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

        /* ── Connect section: hero + enquiry form ── */
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
      </div>
    </div>
  );
}