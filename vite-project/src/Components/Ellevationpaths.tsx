import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";
import img6 from "../assets/image6.jpg";
// TODO: apni asli image yahan daalo (jaisa AboutPage.tsx mein aboutBg use hua hai)

// ── Path card logos — swap these four filenames/paths for your real assets ──
import msEllevationLogoLight from "../assets/Ms-Ellevation-whitemode-logo.png";
import msEllevationLogoDark from "../assets/ms-ellevation-darkmode-logo.png";
import ellevationHubLogoLight from "../assets/Ellevation-whitemode-logo.png";
import ellevationHubLogoDark from "../assets/Ellevation-darkmode-logo.png";



interface Path {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  route: string;
  logoLight: string;
  logoDark: string;
}

const paths: Path[] = [
  {
    eyebrow: "Women & Young Women Focus (17–25)",
    title: "Ms. Ellevation",
    description:
      "Dedicated to building the modern woman. A focused space designed to cultivate authentic identity, deep character, unshakeable confidence, and strategic leadership.",
    features: [
      "Leadership Workshops",
      "Mentorship (Identity, Confidence, Healing)",
      "Women Speaking Events",
      "Curated Community Events",
    ],
    cta: "Explore Programs",
    route: "/ms-ellevation",
    logoLight: msEllevationLogoLight,
    logoDark: msEllevationLogoDark,
  },
  {
    eyebrow: "Community Ecosystem & Pathways",
    title: "Ellevation Hub",
    description:
      "A dynamic membership network offering interconnected opportunity, professional alignment, and holistic wellbeing initiatives designed for the entire family unit.",
    features: [
      "1:1 Consultation and Coaching",
      "Children, Youth (5–16) & Men Programs",
      "Community Wellbeing & Shared Spaces",
      "Professional & Business Development",
    ],
    cta: "Become a Member",
    route: "/hub",
    logoLight: ellevationHubLogoLight,
    logoDark: ellevationHubLogoDark,
  },
];

/* ══════════════════════════════════════════════
   NEW SECTION — Inclusive parent-site hero
   "One community, built by everyone who shows up."
   Sits above the Paths grid. Gender-neutral, premium,
   welcoming to individuals, families, professionals,
   businesses, and community organisations.
   ══════════════════════════════════════════════ */

const HERO_PLUM_800 = "#4B1E56";
const HERO_MAGENTA_500 = "#C81E6B";

const HERO_CREAM_50 = "#FBF7F1";
const HERO_INK_900 = "#231226";
const HERO_INK_600 = "#5B4A61";
const HERO_DISPLAY_FONT = "'Astrid Regular', serif";
const HERO_BODY_FONT =
  "'Montserrat', sans-serif";

type Audience = {
  id: string;
  label: string;
  copy: string;
  icon: React.ReactElement;
};


const audiences: Audience[] = [
  {
    id: "families",
    label: "Individuals & Families",
    copy: "A welcoming front door for anyone starting their journey with Ellevation.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="27" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M6 33c0-6 4-10 8-10s8 4 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 33c0-4.5 2.8-8 5.5-8s5.5 3.5 5.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "professionals",
    label: "Professionals & Leaders",
    copy: "Tools, conversations and connections that grow with your career.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="15" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M15 15v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" stroke="currentColor" strokeWidth="2" />
        <path d="M7 22h26" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "businesses",
    label: "Businesses & Brands",
    copy: "Partnership and visibility across a network built on trust.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 33V11l11-5 11 5v22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 33h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 33v-7h8v7" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="17" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "community",
    label: "Community Organisations",
    copy: "Shared infrastructure for the groups doing the work on the ground.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="9" r="3.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="24" r="3.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="31" cy="24" r="3.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="33" r="3.2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 12.2V29.8M11.6 22.4l6.8 4.4M28.4 22.4l-6.8 4.4M12 22l6-9M28 22l-6-9"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

// ── Hero gallery photos — these are free placeholder photo URLs (Lorem
// Picsum) so the layout renders immediately. Swap each one for your real
// community/family/professional photos when ready — just replace the URL
// string, no import changes needed.
const heroGalleryImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

/** Two columns of images auto-scrolling in opposite directions — replaces
 * the old orbit graphic with real photography of the community. */
function HeroImageScroller() {
  // Split images across two columns so they can scroll opposite directions
  const colA = heroGalleryImages.filter((_, i) => i % 2 === 0);
  const colB = heroGalleryImages.filter((_, i) => i % 2 === 1);

  return (
    <div className="hero-scroller">
      <div className="hero-scroller-col hero-scroller-col-up">
        <div className="hero-scroller-track">
          {[...colA, ...colA].map((src, i) => (
            <div className="hero-scroller-item" key={`a-${i}`}>
              <img src={src} alt="Ellevation community" />
            </div>
          ))}
        </div>
      </div>
      <div className="hero-scroller-col hero-scroller-col-down">
        <div className="hero-scroller-track">
          {[...colB, ...colB].map((src, i) => (
            <div className="hero-scroller-item" key={`b-${i}`}>
              <img src={src} alt="Ellevation community" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EllevationHeroSection() {
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setVisible(true);
    const readTheme = () =>
      setDarkMode(document.documentElement.getAttribute("data-theme") === "dark");
    readTheme();
    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: darkMode ? "linear-gradient(180deg, #0d0614 0%, #160d22 100%)" : HERO_CREAM_50,
        fontFamily: HERO_BODY_FONT,
        overflow: "hidden",
        transition: "background 0.25s ease",
      }}
    >
      <style>{`
        [data-theme="dark"] .ellevation-hero-eyebrow-text { color: #c9a3d9 !important; }
        [data-theme="dark"] .ellevation-hero-title { color: #ffffff !important; }
        [data-theme="dark"] .ellevation-hero-title em { color: #d9b8e8 !important; }
        [data-theme="dark"] .ellevation-hero-desc { color: #cbd5e1 !important; }
        [data-theme="dark"] .ellevation-cta-secondary {
          color: #ffffff !important;
          border-color: rgba(255,255,255,0.3) !important;
        }
        [data-theme="dark"] .ellevation-audience-card {
          background: rgba(75, 30, 86, 0.35) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
        [data-theme="dark"] .ellevation-audience-card-label { color: #ffffff !important; }
        [data-theme="dark"] .ellevation-audience-card-copy { color: #cbd5e1 !important; }
        [data-theme="dark"] .ellevation-audience-icon { color: #d9b8e8 !important; }

        .ellevation-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 48px;
          max-width: 1240px;
          margin: 0 auto;
          padding: 96px 32px 64px;
        }
        .ellevation-hero-copy {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ellevation-hero-copy.visible { opacity: 1; transform: translateY(0); }
        .ellevation-hero-visual {
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s;
          display: flex;
          justify-content: center;
        }
        .ellevation-hero-visual.visible { opacity: 1; transform: scale(1); }
        .hero-scroller {
          display: flex;
          gap: 16px;
          height: 460px;
          width: 100%;
          max-width: 420px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
        }
        .hero-scroller-col {
          flex: 1;
          overflow: hidden;
        }
        .hero-scroller-track {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .hero-scroller-col-up .hero-scroller-track {
          animation: scroll-up 26s linear infinite;
        }
        .hero-scroller-col-down .hero-scroller-track {
          animation: scroll-down 26s linear infinite;
          transform: translateY(-50%);
        }
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .hero-scroller-item {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(45, 11, 54, 0.14);
        }
        .hero-scroller-item img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }
        .hero-scroller-col-down .hero-scroller-item img { height: 220px; }
        @media (max-width: 920px) {
          .hero-scroller { max-width: 340px; height: 360px; margin: 0 auto; }
        }
        .ellevation-cta-primary { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .ellevation-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(75, 30, 86, 0.25);
        }
        .ellevation-cta-secondary { transition: background 0.18s ease, border-color 0.18s ease; }
        .ellevation-cta-secondary:hover {
          background: rgba(75, 30, 86, 0.06);
          border-color: ${HERO_PLUM_800};
        }
        .ellevation-audience-strip {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px 96px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .ellevation-audience-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ellevation-audience-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(45, 11, 54, 0.1);
          border-color: rgba(75, 30, 86, 0.25);
        }
        @media (max-width: 920px) {
          .ellevation-hero-grid { grid-template-columns: 1fr; padding: 64px 24px 40px; text-align: center; }
          .ellevation-hero-visual { order: -1; }
          .ellevation-hero-actions { justify-content: center; }
          .ellevation-audience-strip { grid-template-columns: 1fr 1fr; padding: 0 24px 64px; }
        }
        @media (max-width: 560px) {
          .ellevation-audience-strip { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ellevation-hero-copy, .ellevation-hero-visual {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .hero-scroller-track { animation: none !important; }
        }
      `}</style>

      <div className="ellevation-hero-grid">
        <div className={`ellevation-hero-copy${visible ? " visible" : ""}`}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(75, 30, 86, 0.2)",
              marginBottom: "24px",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: HERO_MAGENTA_500, display: "inline-block" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: HERO_INK_600 }} className="ellevation-hero-eyebrow-text">
              The Ellevation Ecosystem
            </span>
          </div>

          <h1
  className="ellevation-hero-title"
  style={{
    fontFamily: HERO_DISPLAY_FONT,
    fontSize: "52px",
    lineHeight: 1.15,
    color: "#4B1E56",
    margin: 0,
    fontWeight: 700,
    letterSpacing: "-0.01em",
  }}
>
            One community,
            <br />
            built by <em style={{ color: HERO_PLUM_800, fontStyle: "italic" }}>everyone</em> who shows up.
          </h1>

          <p className="ellevation-hero-desc" style={{ fontSize: "1.08rem", lineHeight: 1.65, color: HERO_INK_600, maxWidth: "520px", margin: "0 0 36px" }}>
            Ellevation is the shared table behind every part of this network — for parents and kids,
            professionals and founders, businesses and the community organisations doing the work
            on the ground. Wherever you fit in, there's a seat here.
          </p>

          <div className="ellevation-hero-actions" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link
              to="/get-involved/join"
              className="ellevation-cta-primary"
              style={{
                background: "#D7238F",
                color: "#fff",
                textDecoration: "none",
                padding: "14px 30px",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              Join the Ecosystem
            </Link>
            <Link
              to="/hub"
              className="ellevation-cta-secondary"
              style={{
                background: "#D7238F",
                 color: "#fff",
                textDecoration: "none",
                padding: "14px 30px",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1.5px solid rgba(75, 30, 86, 0.35)",
              }}
            >
              Explore the Hub
            </Link>
          </div>
        </div>

        <div className={`ellevation-hero-visual${visible ? " visible" : ""}`}>
          <HeroImageScroller />
        </div>
      </div>

      <div className="ellevation-audience-strip">
        {audiences.map((a) => (
          <div
            key={a.id}
            className="ellevation-audience-card"
            style={{ background: "#fff", border: "1px solid rgba(75, 30, 86, 0.12)", borderRadius: "18px", padding: "26px 22px" }}
          >
            <div style={{ width: 40, height: 40, color: HERO_PLUM_800, marginBottom: "16px" }} className="ellevation-audience-icon">{a.icon}</div>
            <div style={{ fontFamily: HERO_DISPLAY_FONT, fontSize: "1.05rem", color: HERO_INK_900, marginBottom: "8px", fontWeight: "700px"}} className="ellevation-audience-card-label">
              {a.label}
            </div>
            <div style={{ fontSize: "0.9rem", lineHeight: 1.55, color: HERO_INK_600 }} className="ellevation-audience-card-copy">{a.copy}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   EXISTING — Ellevation Paths grid
   ══════════════════════════════════════════════ */
export default function EllevationPaths() {
  const [visible, setVisible] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const readTheme = () =>
      setDarkMode(document.documentElement.getAttribute("data-theme") === "dark");

    readTheme();

    // Keep in sync if the navbar toggles data-theme on <html> after mount
    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
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

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .paths-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }

        .paths-header-title {
          font-family: 'Astrid Regular', serif;
          font-size: 52px;
          font-weight: 700;
          color: #4B1E56;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        /* ── Dynamic Layout Card ── */
        .path-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(124, 92, 191, 0.15);
          border-radius: 28px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(124, 92, 191, 0.04);
          transition: 
            transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1),
            background-color 0.3s ease,
            border-color 0.3s ease;
        }

        .path-card:hover {
          transform: translateY(-6px);
          background: #ffffff;
          border-color: rgba(124, 92, 191, 0.4);
          box-shadow: 
            0 30px 60px rgba(124, 92, 191, 0.12),
            0 12px 24px rgba(124, 92, 191, 0.04);
        }

        /* Ambient gradient border top */
        .path-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #662369, #4B1E56);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .path-card:hover::before { opacity: 1; }

        /* ── Header Row (text + logo side by side) ── */
        .path-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
        }

        .path-card-header-text { flex: 1; min-width: 0; }

        .path-card-logo {
          flex-shrink: 0;
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .path-card-logo img {
          width: 190%;
          height: 120%;
          object-fit: contain;
          display: block;
        }

        .path-card-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #662369;
          margin: 0 0 8px 0;
          transition: opacity 0.3s ease;
        }
        .path-card:hover .path-card-eyebrow {
          color: #662369;
          opacity: 0.95;
        }

        .path-title {
          font-family: 'Astrid Regular', serif;
          font-size: 38px;
          font-weight: 700;
          color: #1a0a2e;
          margin: 0;
          line-height: 1.2;
          transition: color 0.3s ease;
        }
        .path-card:hover .path-title {
          color: #4B1E56;
        }

        /* ── CSS Grid Drawer Mechanism ── */
        .path-drawer-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .path-card:hover .path-drawer-wrapper {
          grid-template-rows: 1fr;
        }

        .path-drawer-content {
          overflow: hidden;
        }

        /* Interior animations when card expands */
        .path-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: #554866;
          margin: 20px 0 24px 0;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .path-card:hover .path-desc {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.1s;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .path-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14.5px;
          color: #403452;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .path-card:hover .path-feature {
          opacity: 1;
          transform: translateX(0);
        }
        .path-card:hover .path-feature:nth-child(1) { transition-delay: 0.16s; }
        .path-card:hover .path-feature:nth-child(2) { transition-delay: 0.22s; }
        .path-card:hover .path-feature:nth-child(3) { transition-delay: 0.28s; }
        .path-card:hover .path-feature:nth-child(4) { transition-delay: 0.34s; }

        .feature-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4B1E56;
          flex-shrink: 0;
        }

        /* ── CTA button ── */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #ffffff;
          background: #4B1E56;
          border: none;
          border-radius: 14px;
          padding: 14px 28px;
          cursor: pointer;
          text-decoration: none;
          opacity: 0;
          transform: translateY(10px);
          box-shadow: 0 4px 14px rgba(90, 63, 160, 0.2);
          transition: 
            background 0.2s, 
            transform 0.2s, 
            box-shadow 0.2s,
            opacity 0.3s ease,
            gap 0.2s;
        }
        .path-card:hover .cta-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.25s;
        }
        .cta-btn:hover {
          background: #35143d;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(75, 30, 86, 0.3);
          gap: 12px;
        }

        /* Responsive Breakpoint handling */
        @media (max-width: 868px) {
          .paths-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .path-drawer-wrapper { grid-template-rows: 1fr !important; }
          .path-desc, .path-feature, .cta-btn { opacity: 1 !important; transform: none !important; }
          .paths-header-title { font-size: 38px !important; }
        }

        @media (max-width: 640px) {
          .path-card-logo { width: 52px; height: 52px; }
        }

        /* ═══════════════════════════════════════
           Dark Mode
           ═══════════════════════════════════════ */
        [data-theme="dark"] .paths-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }
        [data-theme="dark"] .paths-header-title {
          color: #ffffff;
        }
        [data-theme="dark"] .path-card {
          background: rgba(75, 30, 86, 0.35);
          border-color: rgba(255, 255, 255, 0.12);
        }
        [data-theme="dark"] .path-card:hover {
          background: rgba(75, 30, 86, 0.55);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        [data-theme="dark"] .path-title {
          color: #ffffff;
        }
        [data-theme="dark"] .path-card:hover .path-title {
          color: #d9b8e8;
        }
        [data-theme="dark"] .path-card-eyebrow {
          color: #c9a3d9;
        }
        [data-theme="dark"] .path-desc {
          color: #cbd5e1;
        }
        [data-theme="dark"] .path-feature {
          color: #e2e8f0;
        }
        [data-theme="dark"] .cta-btn {
          background: #4B1E56;
        }
        [data-theme="dark"] .cta-btn:hover {
          background: #6B3179;
        }
      `}</style>

      {/* NEW — inclusive parent-site hero, sits above the paths grid */}
      <EllevationHeroSection />

      {/* EXISTING PATHS GRID SECTION */}
      <section
        ref={sectionRef}
        className="paths-section"
        style={{
          padding: "50px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* Main Title Section */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="paths-header-title">Choose Your Ecosystem Path</h2>
        </div>

        {/* Dynamic Cards Grid */}
        <div
          className="paths-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            maxWidth: "1140px",
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {paths.map((p: Path, i: number) => (
            <div
              key={p.title}
              className="path-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.4s ease`,
              }}
            >
              {/* Header row: eyebrow + title on the left, logo on the right */}
              <div className="path-card-header">
                <div className="path-card-header-text">
                  <p className="path-card-eyebrow">{p.eyebrow}</p>
                  <h3 className="path-title">{p.title}</h3>
                </div>
                <div className="path-card-logo">
                  <img src={darkMode ? p.logoDark : p.logoLight} alt={`${p.title} logo`} />
                </div>
              </div>

              {/* Seamless dynamic pure-CSS drawer mechanism */}
              <div className="path-drawer-wrapper">
                <div className="path-drawer-content">
                  <p className="path-desc">{p.description}</p>

                  <div className="features-list">
                    {p.features.map((feat) => (
                      <div key={feat} className="path-feature">
                        <span className="feature-bullet" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: "4px" }}>
                    <Link to={p.route} className="cta-btn">
                      {p.cta}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </>
  );
}