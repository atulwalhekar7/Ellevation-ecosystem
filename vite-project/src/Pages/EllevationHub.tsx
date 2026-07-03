import { useState, useEffect, useRef, type CSSProperties } from "react";
import banner6 from "../assets/banner6.avif";
import banner2 from "../assets/banner2.avif";

/* ── Animation Helpers (used by the Connect form) ── */
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

const WHO_WE_SUPPORT = [
  { title: "Community", desc: "Grassroots networks and support systems that hold neighborhoods together.", icon: "✿" },
  { title: "Business", desc: "Directories, alliances, and growth pathways for enterprising women.", icon: "◈" },
  { title: "Youth", desc: "Mentorship and development programs for the next generation.", icon: "✦" },
  { title: "Men", desc: "Allyship and development pathways for men walking alongside the mission.", icon: "◎" },
];

const HUB_TIERS: HubTier[] = ["CONNECT", "GROW", "VISIBILITY", "IMPACT"];
const HUB_TIER_META: Record<HubTier, { label: string; tagline: string; benefits: string[]; color: string }> = {
  CONNECT:    { label: "Connect",    tagline: "Get plugged into the community and directory.",                     benefits: ["Directory listing", "Community forum access", "Monthly newsletter", "Event invitations"], color: "#7a5ea0" },
  GROW:       { label: "Grow",       tagline: "Access programs, mentorship, and development pathways.",           benefits: ["Program enrollment priority", "Mentorship matching", "Skills workshops", "Peer accountability circles"], color: "#b07fb4" },
  VISIBILITY: { label: "Visibility", tagline: "Amplify your business or work through the directory and features.", benefits: ["Featured directory placement", "Spotlight features", "Referral network access", "Media opportunities"], color: "#c0705a" },
  IMPACT:     { label: "Impact",     tagline: "Partner at the highest level to shape community outcomes.",         benefits: ["Strategic partner briefings", "Grant & funding access", "Advisory council seat", "Co-branded initiatives"], color: "#5a4070" },
};

const DIRECTORY_CATEGORIES = [
  { title: "Retail & E-commerce",     count: "120+ listings", icon: "◈" },
  { title: "Consulting & Coaching",   count: "95+ listings",  icon: "✦" },
  { title: "Creative & Design",       count: "80+ listings",  icon: "✿" },
  { title: "Health & Wellness",       count: "65+ listings",  icon: "❖" },
  { title: "Technology",              count: "50+ listings",  icon: "◎" },
  { title: "Education & Training",    count: "40+ listings",  icon: "☖" },
];

const HUB_PROGRAMS = [
  { title: "Youth Development",       desc: "Mentorship, skills-building, and leadership pathways for the next generation.", icon: "✦" },
  { title: "Men's Pathway",           desc: "Allyship, personal growth, and development programs for men in the community.", icon: "◎" },
  { title: "Community Development",   desc: "Grassroots initiatives building safer, stronger, more connected neighborhoods.", icon: "✿" },
];

const OPPORTUNITY_TYPES = [
  { title: "Jobs & Work",              desc: "Curated roles from partner organizations and community businesses.",           icon: "◈" },
  { title: "Collaborations",           desc: "Project-based partnerships between members, businesses, and organizations.",   icon: "✿" },
  { title: "Referrals & Connections",  desc: "Warm introductions across our verified professional network.",                 icon: "✦" },
  { title: "Speaking & Visibility",    desc: "Panels, features, and media opportunities to raise your profile.",             icon: "◎" },
  { title: "Grants & Funding",         desc: "Funding pathways for community initiatives and growing businesses.",           icon: "❖" },
  { title: "Member-Only Opportunities",desc: "Early access and exclusive openings shared first with Hub members.",           icon: "☖" },
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
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className="hub-nav"
      style={{
        ...ns.nav,
        boxShadow: scrolled ? "0 4px 32px rgba(90,64,112,0.15)" : "0 2px 16px rgba(90,64,112,0.08)",
      }}
    >
      <div className="hub-nav-inner" style={ns.inner}>
        {NAV_LINKS.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => nav(page)}
            className={`hub-nav-link${current === page ? " active" : ""}`}
            style={{ ...ns.link, ...(current === page ? ns.active : {}) }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

const ns: Record<string, React.CSSProperties> = {
  nav: {
    position: "sticky", top: 79, zIndex: 100,
    display: "flex", justifyContent: "center",
    padding: "0 24px", margin: "16px auto 0",
    transition: "box-shadow 0.3s ease",
  },
  inner: {
    display: "flex", alignItems: "center", gap: 4,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px)",
    borderRadius: 100,
    padding: "8px 10px",
    boxShadow: "0 2px 24px rgba(90,64,112,0.10)",
    flexWrap: "wrap" as const,
  },
  link: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.8rem", fontWeight: 500,
    color: "#5a4070", background: "transparent",
    border: "none", cursor: "pointer",
    padding: "8px 15px", borderRadius: 100,
    transition: "all 0.2s ease", whiteSpace: "nowrap" as const,
  },
  active: {
    background: "#1a0a2e", color: "#fff",
    boxShadow: "0 2px 12px rgba(26,10,46,0.25)",
  },
};

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function HomeSection({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="hub-home-page" style={hp.page}>
      <div className="hub-home-bg" style={hp.bgGrad} />
      <div style={hp.blobTL} />
      <div style={hp.blobBR} />
      <div style={hp.grid}>
        <div style={hp.left}>
          <p style={hp.eyebrow}>ELLEVATION HUB</p>
          <h1 className="hub-home-headline" style={hp.headline}>Every Pathway Into Opportunity, In One Ecosystem.</h1>
          <p className="hub-home-sub" style={hp.sub}>
            A unified platform for community, business, youth, and men — connecting real opportunity to real people, right where they are.
          </p>
          <div style={hp.btnRow}>
            <button style={hp.btnPrimary} onClick={() => nav("membership")}>JOIN THE HUB</button>
            <button style={hp.btnSecondary} onClick={() => nav("directory")}>EXPLORE DIRECTORY</button>
          </div>
        </div>
        <div className="hub-card" style={hp.card}>
          <div style={hp.cardTop}>
            <div style={hp.cardIcon}>❖</div>
            <span style={hp.cardBadge}>Professional Tier</span>
          </div>
          <p className="hub-card-desc" style={hp.cardDesc}>One ecosystem connecting directory, programs, and opportunity — built for the whole community.</p>
          <div style={hp.cardFeatures}>
            {["Business directory & categories", "Youth and men's development programs", "Jobs, grants & collaboration board", "Community events calendar"].map(f => (
              <div key={f} className="hub-feat" style={hp.feat}><span style={hp.check}>✓</span>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="hub-about-section" style={ab.section}>
      <div style={ab.container}>
        <p style={ab.eye}>— WHO WE SUPPORT —</p>
        <h2 className="hub-about-title" style={ab.title}>One Ecosystem.<br />Every Pathway to Opportunity.</h2>
        <p className="hub-about-sub" style={ab.sub}>
          Ellevation Hub is the professional and community backbone of our ecosystem — supporting grassroots community networks, growing businesses, rising youth, and men committed to allyship and growth.
        </p>
        <div style={ab.grid}>
          {WHO_WE_SUPPORT.map((item, i) => (
            <div key={i} className="hub-about-card" style={ab.card}>
              <div style={ab.icon}>{item.icon}</div>
              <h3 className="hub-about-card-title" style={ab.cardTitle}>{item.title}</h3>
              <p className="hub-about-card-text" style={ab.cardText}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
  const meta = HUB_TIER_META[activeTier];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="hub-membership-section" style={jp.formSection}>
      <div style={{ width: "100%", maxWidth: 720 }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={mb.pageEye}>MEMBERSHIP · TIERS &amp; BENEFITS</p>
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
              style={{ ...mb.tabBtn, ...(activeTier === t ? { ...mb.tabActive, background: HUB_TIER_META[t].color } : {}) }}
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

          <div style={mb.divider} />

          {submitted ? (
            <div style={{ textAlign: "center", padding: "12px 0 8px" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
              <h3 className="hub-form-title" style={{ ...jp.formTitle, fontSize: "1.4rem" }}>Expression of Interest Received</h3>
              <p className="hub-form-sub" style={jp.formSub}>
                Thank you for your interest in {meta.label} Membership. Our team will follow up on your {MEMBERSHIP_PURPOSES.find(p => p.id === purpose)?.label.toLowerCase()} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={mb.formLabel}>Membership Expression of Interest</p>
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
                      <span style={mb.purposeLabel}>{p.label}</span>
                      <span style={mb.purposeDesc}>{p.desc}</span>
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ ...jp.row, marginTop: 20 }}>
                <input className="hub-input" style={jp.input} placeholder="First Name" required />
                <input className="hub-input" style={jp.input} placeholder="Last Name" required />
              </div>
              <input className="hub-input" style={{ ...jp.input, marginTop: 16 }} type="email" placeholder="Professional Email" required />
              <input className="hub-input" style={{ ...jp.input, marginTop: 16 }} type="tel" placeholder="Phone Number (optional)" />
              <select className="hub-input hub-select" style={{ ...jp.input, ...jp.select, marginTop: 16 }}>
                <option>Select Your Industry</option>
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
              />
              <button type="submit" style={{ ...jp.submitBtn, background: meta.color }}>SUBMIT EXPRESSION OF INTEREST</button>
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
        <p style={dr.eye}>THE DIRECTORY</p>
        <h2 className="hub-directory-title" style={dr.title}>Discover Businesses Built by Our Community</h2>
        <p className="hub-directory-sub" style={dr.sub}>Browse verified listings across categories, or add your own business to the directory.</p>
        <div style={dr.grid}>
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
  return (
    <section className="hub-programs-section" style={pg.section}>
      <div className="hub-programs-bg" style={pg.bg} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <p style={pg.eye}>OUR PROGRAMS</p>
        <h2 className="hub-programs-title" style={pg.title}>Development Pathways for Every Corner of the Community</h2>
        <div style={pg.grid}>
          {HUB_PROGRAMS.map(p => (
            <div key={p.title} className="hub-programs-card" style={pg.card}>
              <div style={pg.icon}>{p.icon}</div>
              <h3 className="hub-programs-card-title" style={pg.cardTitle}>{p.title}</h3>
              <p className="hub-programs-card-text" style={pg.cardText}>{p.desc}</p>
            </div>
          ))}
        </div>
        <button style={pg.ctaBtn} onClick={() => nav("connect")}>ENQUIRE ABOUT A PROGRAM</button>
      </div>
    </section>
  );
}

function OpportunitiesSection({ nav }: { nav: (p: Page) => void }) {
  return (
    <section className="hub-opportunities-section" style={op.section}>
      <div style={op.container}>
        <p style={op.eye}>OPPORTUNITY BOARD</p>
        <h2 className="hub-opportunities-title" style={op.title}>Real Pathways. Real Access.</h2>
        <p className="hub-opportunities-sub" style={op.sub}>From jobs and collaborations to grants and member-only openings, the Hub connects members to opportunities that move their goals forward.</p>
        <div style={op.grid}>
          {OPPORTUNITY_TYPES.map(o => (
            <div key={o.title} className="hub-opportunities-card" style={op.card}>
              <div style={op.icon}>{o.icon}</div>
              <h3 className="hub-opportunities-card-title" style={op.cardTitle}>{o.title}</h3>
              <p className="hub-opportunities-card-text" style={op.cardText}>{o.desc}</p>
            </div>
          ))}
        </div>
        <button style={op.ctaBtn} onClick={() => nav("membership")}>ACCESS THE BOARD</button>
      </div>
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

/* Quick Registration modal: collects the essentials, then hands off to the
   event's own registration page/form. */
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
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,212,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(155,125,184,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ ...evs.container, position: "relative", zIndex: 1 }}>
        <p style={evs.eye}>UPCOMING EVENTS · PERTH</p>
        <h2 className="hub-events-title" style={evs.title}>Gather Across the Ecosystem</h2>
        <p className="hub-events-sub" style={evs.sub}>
          Community celebrations, sport and youth activities, business networking, workshops, and corporate events — all in one calendar. Listings below are demo events pending final confirmation.
        </p>

        <div style={evs.filterRow}>
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
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a4070", padding: "24px 0" }}>
            No events in this category yet — check back soon.
          </p>
        ) : (
          <div style={evs.grid}>
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
      <p style={st.sectionEye}>COMMUNITY IMPACT</p>
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
      <div style={st.subSection}>
        <p style={st.sectionEye}>CALD COMMUNITY OUTCOMES</p>
        <h3 className="hub-impact-subtitle" style={st.subtitle}>Built With Perth's Diverse Communities in Mind</h3>
        <div style={st.caldGrid}>
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
      <div style={st.subSection}>
        <p style={st.sectionEye}>BUSINESS GROWTH &amp; VISIBILITY</p>
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
      <div style={st.subSection}>
        <p style={st.sectionEye}>REAL STORIES</p>
        <h3 className="hub-impact-subtitle" style={st.subtitle}>In Their Own Words</h3>
        <div style={st.grid}>
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
      <div style={st.subSection}>
        <p style={st.sectionEye}>PROGRAMS IN ACTION</p>
        <h3 className="hub-impact-subtitle" style={st.subtitle}>Where the Work Happens Day to Day</h3>
        <div style={st.programsGrid}>
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
        <p style={st.visionEye}>FUTURE VISION</p>
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
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff" }}>
            Connect With Us
          </span>
          <div className={mounted ? "line-draw" : ""} style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)", transformOrigin: "left center" }} />
        </div>

        <h1 style={{
          ...fade(mounted, 130),
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(44px,7.5vw,82px)",
          fontWeight: 500,
          color: "#fff", margin: "0 0 20px", lineHeight: 1.1,
        }}>
          Ecosystem Hub Enquiry
        </h1>

        <p style={{
          ...fade(mounted, 260),
          fontFamily: "'DM Sans',sans-serif",
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

/* ── Connect: Unified Enquiry Form ── */
function CommonEnquiryForm() {
  const { ref, inView } = useInView(0.1);
  const [enquiryType, setEnquiryType] = useState("general");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitHov, setSubmitHov] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="enquiry-form-section" style={{ background: "#f5eef8", padding: "80px 24px 100px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <div ref={ref} style={{ ...fade(inView, 0), textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8", margin: "0 0 12px" }}>
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,4.5vw,44px)", fontWeight: 500, color: "#1c1630", margin: 0 }}>
            Unified Request Portal
          </h2>
        </div>

        <div style={{
          ...fade(inView, 120),
          background: "#fff",
          border: "1.5px solid rgba(180,160,210,0.18)",
          borderRadius: 24,
          padding: "48px 40px",
          boxShadow: "0 16px 48px rgba(140,110,180,0.08)",
          position: "relative"
        }} className="form-wrapper-card">

          {formSubmitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: "#1c1630", marginBottom: 12 }}>Thank You</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a4a6a", fontSize: 15, lineHeight: 1.6, maxWidth: 445, margin: "0 auto" }}>
                Your request has been successfully synchronized with our leadership network. We will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9b7db8", marginBottom: 12 }}>
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
                        borderColor: enquiryType === stream.id ? "#9b7db8" : "rgba(180,160,210,0.25)",
                        background: enquiryType === stream.id ? "rgba(155,125,184,0.06)" : "transparent",
                        cursor: "pointer",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 14,
                        fontWeight: enquiryType === stream.id ? 600 : 400,
                        color: "#1c1630",
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
                        style={{ accentColor: "#9b7db8", cursor: "pointer" }}
                      />
                      {stream.label}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                <div>
                  <label htmlFor="fullName" className="field-label">Full Name *</label>
                  <input type="text" id="fullName" required className="form-input" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="emailAddress" className="field-label">Email Address *</label>
                  <input type="email" id="emailAddress" required className="form-input" placeholder="name@domain.com" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                <div>
                  <label htmlFor="phoneNumber" className="field-label">Phone Number</label>
                  <input type="tel" id="phoneNumber" className="form-input" placeholder="Optional" />
                </div>
                <div>
                  <label htmlFor="organizationName" className="field-label">Organization / Community Group</label>
                  <input type="text" id="organizationName" className="form-input" placeholder="If applicable" />
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
                />
              </div>

              <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  onMouseEnter={() => setSubmitHov(true)}
                  onMouseLeave={() => setSubmitHov(false)}
                  style={{
                    padding: "14px 36px",
                    borderRadius: 999,
                    border: "none",
                    background: submitHov ? "#7a5ea0" : "#9b7db8",
                    color: "#fff",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: submitHov ? "0 8px 24px rgba(140,110,180,0.35)" : "0 4px 14px rgba(140,110,180,0.18)",
                    transform: submitHov ? "translateY(-2px)" : "translateY(0)",
                    transition: "all 0.25s ease",
                  }}
                >
                  Submit Form
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
  blobTL: { position: "absolute", top: -120, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(90,64,112,0.15) 0%,transparent 70%)", animation: "floatBlob 10s ease-in-out infinite", zIndex: 1 },
  blobBR: { position: "absolute", bottom: -100, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,10,46,0.1) 0%,transparent 70%)", animation: "floatBlob 13s ease-in-out infinite reverse", zIndex: 1 },
  grid: { position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center", maxWidth: 1200, margin: "0 auto", width: "100%", animation: "fadeSlideUp 0.9s ease both" },
  left: { display: "flex", flexDirection: "column", gap: 24 },
  eyebrow: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", color: "#ffffff" },
  headline: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,4vw,3.6rem)", fontWeight: 600, color: "#ffffff", lineHeight: 1.1, margin: 0 },
  sub: { fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 400, color: "#ffffff", lineHeight: 1.7, maxWidth: 480 },
  btnRow: { display: "flex", gap: 14, flexWrap: "wrap" as const },
  btnPrimary: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 28px", borderRadius: 100, border: "none", background: "#1a0a2e", color: "#fff", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(253,253,253,0.3)" },
  btnSecondary: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 28px", borderRadius: 100, border: "2px solid #ffffff", background: "transparent", color: "#ffffff", cursor: "pointer", transition: "all 0.2s ease" },
  card: { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "32px", boxShadow: "0 8px 48px rgba(26,10,46,0.08)", border: "1px solid rgba(255,255,255,0.7)" },
  cardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  cardIcon: { width: 48, height: 48, borderRadius: "50%", background: "#5a4070", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" },
  cardBadge: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#1a0a2e", background: "rgba(90,64,112,0.1)", padding: "5px 14px", borderRadius: 100 },
  cardDesc: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 500, color: "#1a0a2e", lineHeight: 1.4, marginBottom: 20 },
  cardFeatures: { display: "flex", flexDirection: "column", gap: 10 },
  feat: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#5a4070", display: "flex", alignItems: "center", gap: 10 },
  check: { color: "#5a4070", fontWeight: 700 },
};

const ab: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "#1a0a2e", marginBottom: 24, lineHeight: 1.1 },
  sub: { fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#5a4070", lineHeight: 1.8, maxWidth: 700, margin: "0 auto 60px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 },
  card: { padding: 28, background: "#f8f6fc", borderRadius: 20, textAlign: "left", border: "1px solid #ede8f5" },
  icon: { fontSize: "1.7rem", color: "#1a0a2e", marginBottom: 14 },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#1a0a2e", marginBottom: 8 },
  cardText: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#5a4070", lineHeight: 1.6 },
};

const mb: Record<string, React.CSSProperties> = {
  tabsRow: { display: "flex", justifyContent: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" as const },
  tabBtn: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "10px 22px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "transparent", color: "#5a4070", cursor: "pointer", transition: "all 0.25s ease" },
  tabActive: { color: "#fff", border: "1.5px solid transparent", boxShadow: "0 4px 20px rgba(90,64,112,0.28)" },
  benefitsList: { display: "flex", flexDirection: "column", gap: 10, margin: "0 0 8px" },
  benefitItem: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#5a4070", display: "flex", alignItems: "center", gap: 10 },
  benefitDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  pageEye: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 12 },
  divider: { height: 1, background: "#ede8f5", margin: "24px 0" },
  formLabel: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#9b7db8", marginBottom: 12 },
  purposeRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 },
  purposeTile: { display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 14, border: "1.5px solid #ded4ee", cursor: "pointer", transition: "all 0.2s ease" },
  purposeLabel: { display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#1a0a2e" },
  purposeDesc: { display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#5a4070", marginTop: 2 },
};

const dr: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#1a0a2e", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#5a4070", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 48 },
  card: { padding: 28, background: "#f8f6fc", borderRadius: 18, textAlign: "left", border: "1px solid #ede8f5" },
  icon: { fontSize: "1.5rem", color: "#1a0a2e", marginBottom: 12 },
  cardTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", color: "#1a0a2e", marginBottom: 6 },
  cardCount: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", color: "#b4a0d0" },
  ctaBtn: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#1a0a2e", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(26,10,46,0.25)" },
};

const pg: Record<string, React.CSSProperties> = {
  section: { position: "relative", padding: "100px 48px", overflow: "hidden", textAlign: "center" },
  bg: { position: "absolute", inset: 0, background: "#1a0a2e", zIndex: 0 },
  eye: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 16, position: "relative", zIndex: 1 },
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,2.8rem)", color: "#fff", lineHeight: 1.25, maxWidth: 760, margin: "0 auto 48px", position: "relative", zIndex: 1 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1000, margin: "0 auto 40px" },
  card: { padding: 32, background: "rgba(255,255,255,0.05)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", textAlign: "left" },
  icon: { fontSize: "1.6rem", color: "#fff", marginBottom: 14 },
  cardTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: "#fff", marginBottom: 10 },
  cardText: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 },
  ctaBtn: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "2px solid #fff", background: "transparent", color: "#fff", cursor: "pointer", position: "relative", zIndex: 1 },
};

const op: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#f8f6fc" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#1a0a2e", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#5a4070", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 48 },
  card: { padding: "26px 22px", background: "#fff", borderRadius: 16, textAlign: "left", border: "1px solid #ede8f5" },
  icon: { fontSize: "1.4rem", color: "#1a0a2e", marginBottom: 10 },
  cardTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: "#1a0a2e", marginBottom: 6 },
  cardText: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#5a4070", lineHeight: 1.55 },
  ctaBtn: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px 32px", borderRadius: 100, border: "none", background: "#1a0a2e", color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(26,10,46,0.25)" },
};

// Renamed from evsStyles to evs for consistency across the file (this was the source of the crash: EventsSection referenced `evsStyles`, which was never defined).
const evs: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#1a0a2e", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#5a4070", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, textAlign: "left" },
  card: { padding: "28px 26px", background: "#f8f6fc", borderRadius: 18, border: "1px solid #ede8f5", display: "flex", flexDirection: "column", gap: 0 },
  dateBadge: { display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: "#1a0a2e", padding: "5px 12px", borderRadius: 100, marginBottom: 12, width: "fit-content" },
  categoryPill: { display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#5a4070", background: "rgba(90,64,112,0.08)", border: "1px solid rgba(90,64,112,0.18)", padding: "4px 11px", borderRadius: 100, marginBottom: 10, width: "fit-content" },
  category: { display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "#b4a0d0", marginBottom: 8 },
  cardTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", color: "#1a0a2e", marginBottom: 8 },
  cardText: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#5a4070", lineHeight: 1.6, marginBottom: 20, flexGrow: 1 },
  rsvpBtn: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", padding: "12px", borderRadius: 100, border: "2px solid #1a0a2e", background: "transparent", color: "#1a0a2e", cursor: "pointer", marginTop: "auto" },
  filterRow: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" as const, marginBottom: 40 },
  filterBtn: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.04em", padding: "10px 18px", borderRadius: 100, border: "1.5px solid #ded4ee", background: "#fff", color: "#5a4070", cursor: "pointer", transition: "all 0.2s ease" },
  filterBtnActive: { background: "#1a0a2e", borderColor: "#1a0a2e", color: "#fff", boxShadow: "0 4px 16px rgba(26,10,46,0.25)" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(20,10,34,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 },
  modalCard: { background: "#fff", borderRadius: 22, padding: "36px 32px", maxWidth: 440, width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(26,10,46,0.35)" },
  modalClose: { position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: "50%", border: "none", background: "#f8f6fc", color: "#5a4070", fontSize: "0.85rem", cursor: "pointer" },
  modalDateBadge: { display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "#b4a0d0", marginBottom: 10 },
  modalTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: "#1a0a2e", marginBottom: 10, textAlign: "left" },
  modalSub: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#5a4070", lineHeight: 1.6, textAlign: "left" },
  modalSubmitBtn: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px", borderRadius: 100, border: "none", background: "#1a0a2e", color: "#fff", cursor: "pointer", marginTop: 4 },
  modalCtaLink: { display: "inline-block", marginTop: 20, fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: "#1a0a2e", padding: "14px 24px", borderRadius: 100, textDecoration: "none" },
};

const jp: Record<string, React.CSSProperties> = {
  formSection: { padding: "100px 24px", background: "#f8f6fc", display: "flex", justifyContent: "center" },
  card: { background: "#fff", padding: "48px", borderRadius: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.05)", width: "100%"},
  formHeader: { textAlign: "center", marginBottom: 32 },
  formTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#1a0a2e", marginBottom: 8 },
  formSub: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#5a4070" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  input: { width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid #ede8f5", background: "#fcfaff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" },
  select: { appearance: "none" as const, cursor: "pointer" },
  submitBtn: { width: "100%", marginTop: 24, padding: "16px", borderRadius: 100, border: "none", background: "#1a0a2e", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", letterSpacing: "0.1em" },
};

const st: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff", textAlign: "center" },
  sectionEye: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 14 },
  bannerTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", color: "#1a0a2e", marginBottom: 16, maxWidth: 780, marginLeft: "auto", marginRight: "auto", lineHeight: 1.15 },
  lead: { fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#5a4070", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 48px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 900, margin: "0 auto 56px" },
  statCard: { padding: "24px 16px", background: "#f8f6fc", borderRadius: 16, border: "1px solid #ede8f5" },
  statNum: { fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 600, color: "#1a0a2e", marginBottom: 6 },
  statLabel: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#5a4070", letterSpacing: "0.02em" },
  subSection: { maxWidth: 1100, margin: "0 auto 72px" },
  subtitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", color: "#1a0a2e", marginBottom: 32, lineHeight: 1.2 },
  caldGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  caldCard: { padding: "24px 20px", background: "#f8f6fc", borderRadius: 16, border: "1px solid #ede8f5", textAlign: "left" },
  caldIcon: { fontSize: "1.4rem", color: "#1a0a2e", marginBottom: 10 },
  caldTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", color: "#1a0a2e", marginBottom: 6 },
  caldText: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#5a4070", lineHeight: 1.55 },
  programsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  programCard: { padding: "24px 20px", background: "#1a0a2e", borderRadius: 16, textAlign: "left" },
  programIcon: { fontSize: "1.4rem", color: "#fff", marginBottom: 10 },
  programTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", color: "#fff", marginBottom: 6 },
  programText: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" },
  card: { padding: 40, border: "1px solid #ede8f5", borderRadius: 24, textAlign: "left" },
  quote: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#5a4070", lineHeight: 1.6, marginBottom: 20 },
  name: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#1a0a2e" },
  role: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#b4a0d0", marginTop: 2 },
  visionBox: { maxWidth: 700, margin: "0 auto", padding: "32px 28px", background: "#1a0a2e", borderRadius: 20 },
  visionEye: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", color: "#b4a0d0", marginBottom: 12 },
  visionText: { fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontStyle: "italic", color: "#fff", lineHeight: 1.6 },
};

// ─── ROOT HUB PAGE ───────────────────────────────────────────────────────────
export default function EllevationHub() {
  const [page, setPage] = useState<Page>("home");

  // ✅ Sync with the theme saved by EllevationNavbar on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", saved ?? "light");
  }, []);

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hub-root" style={{ fontFamily: "'DM Sans',sans-serif", background: "#fdfaff", minHeight: "100vh", color: "#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus, select:focus, textarea:focus { border-color: #5a4070!important; box-shadow: 0 0 0 3px rgba(90,64,112,0.1); }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatBlob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-15px) scale(1.04); } 66% { transform: translate(-10px,10px) scale(0.97); } }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        button:active { transform: translateY(0); }

        /* ── Dark Mode Overrides ── */

        /* Root background & text */
        [data-theme="dark"] .hub-root {
          background: #0a0614 !important;
          color: #e8e0f8 !important;
        }

        /* Navbar */
        [data-theme="dark"] .hub-nav {
          background: transparent !important;
        }
        [data-theme="dark"] .hub-nav-inner {
          background: rgba(20, 12, 36, 0.92) !important;
          box-shadow: 0 4px 32px rgba(0,0,0,0.35) !important;
        }
        [data-theme="dark"] .hub-nav-link {
          color: #c4b0e8 !important;
        }
        [data-theme="dark"] .hub-nav-link.active {
          background: #5a4070 !important;
          color: #fff !important;
        }

        /* Home section */
        [data-theme="dark"] .hub-home-bg {
          background: linear-gradient(rgba(10, 6, 20, 0.75), rgba(10, 6, 20, 0.75)), url(${banner6}) !important;
          background-size: cover !important;
          background-position: center !important;
        }
        [data-theme="dark"] .hub-card {
          background: rgba(26, 14, 50, 0.9) !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
          box-shadow: 0 8px 48px rgba(0,0,0,0.5) !important;
        }
        [data-theme="dark"] .hub-card-desc {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-feat {
          color: #c4b0e8 !important;
        }

        /* About section */
        [data-theme="dark"] .hub-about-section {
          background: #0e0820 !important;
        }
        [data-theme="dark"] .hub-about-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-about-sub {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-about-card {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
        }
        [data-theme="dark"] .hub-about-card-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-about-card-text {
          color: #b4a0d0 !important;
        }

        /* Membership section */
        [data-theme="dark"] .hub-membership-section {
          background: #0e0820 !important;
        }
        [data-theme="dark"] .hub-form-card {
          background: #1a1030 !important;
          box-shadow: 0 10px 48px rgba(0,0,0,0.5) !important;
        }
        [data-theme="dark"] .hub-form-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-form-sub {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-benefit-item {
          color: #c4b0e8 !important;
        }
        [data-theme="dark"] .hub-tier-tab {
          border-color: rgba(180, 160, 208, 0.3) !important;
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-input {
          background: #0a0614 !important;
          border-color: rgba(180, 160, 208, 0.25) !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-input::placeholder {
          color: rgba(232, 224, 248, 0.35) !important;
        }
        [data-theme="dark"] .hub-purpose-tile {
          border-color: rgba(180, 160, 208, 0.3) !important;
        }
        [data-theme="dark"] .hub-purpose-tile span span:first-child {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-purpose-tile span span:last-child {
          color: #b4a0d0 !important;
        }

        /* Directory section */
        [data-theme="dark"] .hub-directory-section {
          background: #0e0820 !important;
        }
        [data-theme="dark"] .hub-directory-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-directory-sub {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-directory-card {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
        }
        [data-theme="dark"] .hub-directory-card-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-directory-card-count {
          color: #b4a0d0 !important;
        }

        /* Programs section — already dark bg, deepen further */
        [data-theme="dark"] .hub-programs-bg {
          background: #0a0614 !important;
        }
        [data-theme="dark"] .hub-programs-card {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }

        /* Opportunities section */
        [data-theme="dark"] .hub-opportunities-section {
          background: #0e0820 !important;
        }
        [data-theme="dark"] .hub-opportunities-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-opportunities-sub {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-opportunities-card {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
        }
        [data-theme="dark"] .hub-opportunities-card-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-opportunities-card-text {
          color: #b4a0d0 !important;
        }

        /* Events section */
        [data-theme="dark"] .hub-events-section {
          background: #0e0820 !important;
        }
        [data-theme="dark"] .hub-events-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-events-sub {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-events-card {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
        }
        [data-theme="dark"] .hub-events-card-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-events-card-text {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-events-filter {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.25) !important;
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-events-filter.active {
          background: #5a4070 !important;
          border-color: #5a4070 !important;
          color: #fff !important;
        }
        [data-theme="dark"] .hub-events-modal {
          background: #1a1030 !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55) !important;
        }
        [data-theme="dark"] .hub-events-modal h3 {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-events-modal p {
          color: #b4a0d0 !important;
        }

        /* Impact section */
        [data-theme="dark"] .hub-impact-section {
          background: #0e0820 !important;
        }
        [data-theme="dark"] .hub-impact-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-stat {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
        }
        [data-theme="dark"] .hub-impact-stat-num {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-stat-label {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-impact-card {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
        }
        [data-theme="dark"] .hub-impact-quote {
          color: #c4b0e8 !important;
        }
        [data-theme="dark"] .hub-impact-name {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-role {
          color: #8f79ad !important;
        }
        [data-theme="dark"] .hub-impact-lead {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-impact-subtitle {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-cald-card {
          background: #1a1030 !important;
          border-color: rgba(180, 160, 208, 0.15) !important;
        }
        [data-theme="dark"] .hub-impact-cald-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-impact-cald-text {
          color: #b4a0d0 !important;
        }
        [data-theme="dark"] .hub-impact-program-card {
          background: rgba(255,255,255,0.06) !important;
        }
        [data-theme="dark"] .hub-impact-vision {
          background: #1a1030 !important;
        }
        [data-theme="dark"] .hub-impact-vision-text {
          color: #e8e0f8 !important;
        }

        /* ── Connect section: hero + enquiry form ── */
        .blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .blob-1 { top: -100px; left: -80px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,210,230,0.45) 0%, transparent 68%); animation: floatA 9s ease-in-out infinite; }
        .blob-2 { bottom: -80px; right: -60px; width: 420px; height: 420px; background: radial-gradient(circle, rgba(190,170,240,0.35) 0%, transparent 68%); animation: floatB 11s ease-in-out infinite 2s; }
        .blob-3 { top: 30%; left: 55%; width: 260px; height: 260px; background: radial-gradient(circle, rgba(210,190,255,0.22) 0%, transparent 68%); animation: floatA 13s ease-in-out infinite 4s; }

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
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #2a183a;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 13px 18px;
          border-radius: 12px;
          border: 1.5px solid rgba(180,160,210,0.25);
          background: #fdfbfe;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1c1630;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input:focus {
          border-color: #9b7db8;
          background: #fff;
          box-shadow: 0 4px 12px rgba(155,125,184,0.06);
        }

        [data-theme="dark"] .hub-connect-section { background: #0f0a1a !important; }
        [data-theme="dark"] .events-hero { background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${banner2}) !important; background-size: cover !important; }
        [data-theme="dark"] .enquiry-form-section { background: #140a1a !important; }
        [data-theme="dark"] .enquiry-form-section h2 { color: #f3ebff !important; }
        [data-theme="dark"] .form-wrapper-card { background: #1a1226 !important; border-color: rgba(155, 109, 190, 0.2) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important; }
        [data-theme="dark"] .field-label { color: #d8ccf4 !important; }
        [data-theme="dark"] .radio-tile { color: #f3ebff !important; border-color: rgba(155,109,190,0.2) !important; }
        [data-theme="dark"] .form-input { background: #1f172e !important; border-color: rgba(155,109,190,0.2) !important; color: #f3ebff !important; }
        [data-theme="dark"] .form-input:focus { border-color: #a78bfa !important; background: #231933 !important; }
        [data-theme="dark"] .form-wrapper-card h3 { color: #f3ebff !important; }
        [data-theme="dark"] .form-wrapper-card p { color: #b8a8c8 !important; }
        [data-theme="dark"] .bounce-arrow { color: #a78bfa !important; }
      `}</style>

      <Navbar current={page} nav={nav} />

      {page === "home"          && <HomeSection nav={nav} />}
      {page === "about"         && <AboutSection />}
      {page === "membership"    && <MembershipSection />}
      {page === "directory"     && <DirectorySection nav={nav} />}
      {page === "programs"      && <ProgramsSection nav={nav} />}
      {page === "opportunities" && <OpportunitiesSection nav={nav} />}
      {page === "events"        && <EventsSection nav={nav} events={EVENTS} />}
      {page === "impact"        && <ImpactSection />}
      {page === "connect"       && <ConnectSection />}
    </div>
  );
}