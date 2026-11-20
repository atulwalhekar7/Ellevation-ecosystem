import { useState, useEffect } from "react";
import type { ReactElement } from "react";

/* ------------------------------------------------------------------ */
/* Ellevation Hub — Business Profile (QR / link-in-bio page)           */
/* Route: /ellevationhub-business-profile                              */
/* ------------------------------------------------------------------ */

/* ── 1. LOGOS: apni downloaded files yahan import karo (path/naam apne hisaab se badlo) ── */
import logoEllevation from "../../assets/dark-mode-logo.png";
import logoHub from "../../assets/Ellevation-darkmode-logo.png";
import logoMs from "../../assets/ms-ellevation-darkmode-logo.png";

const LOGOS = [
  { src: logoEllevation, alt: "Ellevation logo" },
  { src: logoHub, alt: "Ellevation Hub logo" },
  { src: logoMs, alt: "Ms Ellevation logo" },
];

/* ── Background images (6) ── */
import bg1 from "../../assets/Ms Ellevation/_74A8938.jpg";
import bg2 from "../../assets/Ellevation Hub/Home - Banner.jpeg";
import bg3 from "../../assets/Ellevation Hub/Home-Banner.jpeg";
import bg4 from "../../assets/Ms Ellevation/_74A8938.jpg";
import bg5 from "../../assets/about3.jpeg";
import bg6 from "../../assets/Home-Banner 1.jpeg";

const BG_IMAGES = [bg1, bg2, bg3, bg4, bg5, bg6];

/* ── 2. LINKS ── */
const WEBSITE = "https://ellevationhub.com.au"; // TODO: confirm real website link
const GOOGLE_BUSINESS = "#"; // TODO: Google Business Profile link milne par yahan paste karo
const MS_ELLEVATION_INSTAGRAM = "https://www.instagram.com/ms_ellevation";
const HUB_INSTAGRAM = "https://www.instagram.com/ellevation.hub";
const YOUTUBE = "https://www.youtube.com/@EllevationOfficial";
const TIKTOK = "https://www.tiktok.com/@msellevation?_r=1&_t=ZS-97pLDiCJEYs";
const EMAIL = "mailto:hello@ellevationhub.com.au";
/* ── Brand tokens ── */
const PURPLE = "#4B1E56";
const PURPLE_DEEP = "#2d1038";
const GOLD = "#D7B264";
const CREAM = "#F9F4FB";

/* ── Icons (inline SVG) ── */
const ico = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: GOLD,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GlobeIcon = () => (
  <svg {...ico}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
  </svg>
);
const GoogleBusinessIcon = () => (
  <svg {...ico}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);
const InstagramIcon = () => (  <svg {...ico}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill={GOLD} stroke="none" />
  </svg>
);
const YoutubeIcon = () => (
  <svg {...ico}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.5v5l4.5-2.5z" fill={GOLD} />
  </svg>
);
const TiktokIcon = () => (
  <svg {...ico}>
    <path d="M14 4v10.2a3.2 3.2 0 11-3.2-3.2M14 4c.4 2.4 2 3.9 4.5 4.1" />
  </svg>
);
const MailIcon = () => (
  <svg {...ico}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
);

type ProfileLink = { label: string; caption?: string; href: string; icon: ReactElement; external?: boolean };

const profileLinks: ProfileLink[] = [
    { label: "Google Business", href: GOOGLE_BUSINESS, icon: <GoogleBusinessIcon />, external: true },
  { label: "Website", href: WEBSITE, icon: <GlobeIcon />, external: true },
  { label: "Instagram", caption: "Ms Ellevation", href: MS_ELLEVATION_INSTAGRAM, icon: <InstagramIcon />, external: true },
  { label: "Instagram", caption: "Ellevation Hub", href: HUB_INSTAGRAM, icon: <InstagramIcon />, external: true },
  { label: "YouTube", href: YOUTUBE, icon: <YoutubeIcon />, external: true },
  { label: "TikTok", href: TIKTOK, icon: <TiktokIcon />, external: true },
  { label: "Email", href: EMAIL, icon: <MailIcon /> },
];

/* ── Component ── */
const EllevationHubBusinessProfile = () => {
   const [copied, setCopied] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // har 5 second mein agli image
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((i) => (i + 1) % BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = async () => {
    const shareData = { title: "Ellevation Hub", url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="eh-page">
           <div className="eh-bg" aria-hidden="true">
        {BG_IMAGES.map((src, i) => (
          <img key={i} src={src} alt="" className={i === bgIndex ? "active" : ""} />
        ))}
      </div>
      <main className="eh-card">
        <button className="eh-share" onClick={handleShare} aria-label="Share this page">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" />
          </svg>
        </button>
        {copied && <span className="eh-copied" role="status">Link copied</span>}

        {/* 3 logos */}
        {/* 3 logos: main on top, Hub | Ms Ellevation below */}
        <div className="eh-logos">
          <img className="eh-logo-main" src={LOGOS[0].src} alt={LOGOS[0].alt} />
          <div className="eh-logo-pair">
            <img className="eh-logo-hub" src={LOGOS[1].src} alt={LOGOS[1].alt} />
            <span className="eh-divider" aria-hidden="true" />
            <img className="eh-logo-ms" src={LOGOS[2].src} alt={LOGOS[2].alt} />
          </div>
        </div>

        <h1 className="eh-title">Ellevation Hub</h1>
        <p className="eh-tag">Connect with us online.</p>

        <nav className="eh-links" aria-label="Ellevation Hub links">
          {profileLinks.map((link) => (
            <a
              key={link.label + (link.caption ?? "")}
              href={link.href}
              className="eh-pill"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="eh-icon">{link.icon}</span>
              <span className="eh-text">
                <span className="eh-name">{link.label}</span>
                {link.caption && <span className="eh-caption">{link.caption}</span>}
              </span>
            </a>
          ))}
        </nav>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

        @font-face {
          font-family: 'Astrid Regular';
          src: url('/fonts/AstridRegular.woff2') format('woff2'),
               url('/fonts/AstridRegular.otf') format('opentype');
          font-weight: 400; font-style: normal; font-display: swap;
        }

        .eh-page, .eh-page *, .eh-page *::before, .eh-page *::after { box-sizing: border-box; }
                    .eh-page {
          position: fixed; inset: 0; z-index: 99999; display: flex; flex-direction: column; align-items: center;
          overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;
          padding: 32px 0; font-family: 'Montserrat', sans-serif;
        }
                 .eh-bg { position: fixed; inset: 0; z-index: -1; background: #0d0614; overflow: hidden; }
        .eh-bg img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block;
          opacity: 0; transition: opacity 1.6s ease-in-out;
        }
        .eh-bg img.active { opacity: 0.35; }
        .eh-card {
          position: relative; width: 402px; max-width: calc(100vw - 2rem); flex-shrink: 0; margin: auto 0;          padding: 2.4rem 1.5rem 2rem; border-radius: 32px; overflow: hidden;
          display: flex; flex-direction: column; align-items: center;
          border: 1px solid rgba(215,178,100,0.28);
          background: linear-gradient(170deg, #5a2468 0%, ${PURPLE} 55%, #3a1744 100%);
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
        }

        .eh-share {
          position: absolute; top: 16px; right: 16px; z-index: 5; width: 32px; height: 32px; padding: 0;
          display: flex; align-items: center; justify-content: center; border: none; border-radius: 50%;
          background: transparent; cursor: pointer; transition: background 0.2s;
        }
        .eh-share:hover { background: rgba(215,178,100,0.15); }
        .eh-copied {
          position: absolute; top: 20px; right: 56px; z-index: 5; font-size: 12px; font-weight: 600;
          color: ${PURPLE_DEEP}; background: ${GOLD}; padding: 4px 10px; border-radius: 100px;
        }

        /* Logos row */
                     .eh-logos { display: flex; flex-direction: column; align-items: center; gap: 18px; width: 100%; margin-top: 6px; }
        .eh-logo-main { height: 60px; width: auto; max-width: 80%; object-fit: contain; display: block; }
        .eh-logo-pair {
          display: flex; align-items: center; justify-content: center; gap: 18px; width: 100%;
          padding-top: 18px; border-top: 1px solid rgba(215,178,100,0.25);
        }
        .eh-logo-hub { height: 64px; width: auto; max-width: 42%; object-fit: contain; display: block; }
        .eh-logo-ms { height: 84px; width: auto; max-width: 42%; object-fit: contain; display: block; }
        .eh-divider { width: 1px; height: 56px; background: rgba(215,178,100,0.45); flex-shrink: 0; }
        .eh-title {
          margin: 18px 0 0; font-family: 'Astrid Regular', serif; font-weight: 500; font-size: 30px;
          line-height: 1.2; letter-spacing: -0.3px; color: #fff; text-align: center;
        }
        .eh-tag { margin: 6px 0 0; font-size: 13px; line-height: 1.55; color: #e3d2ea; text-align: center; }

        .eh-links { margin-top: 1.5rem; width: 100%; display: flex; flex-direction: column; gap: 10px; padding: 0 8%; }
        .eh-pill {
          display: flex; align-items: center; gap: 16px; padding: 6px 25px 6px 16px; border-radius: 50px;
          border: 1px solid ${GOLD}; text-decoration: none; cursor: pointer;
          transition: background 0.22s, transform 0.22s;
        }
        .eh-pill:hover { background: rgba(215,178,100,0.12); transform: translateY(-2px); }
        .eh-pill:hover .eh-name { color: ${GOLD}; }
        .eh-pill:focus-visible, .eh-share:focus-visible { outline: 3px solid ${GOLD}; outline-offset: 3px; }
        .eh-icon { width: 34px; height: 34px; min-width: 34px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .eh-text { display: flex; flex-direction: column; justify-content: center; min-height: 28px; }
        .eh-name { font-size: 18px; font-weight: 500; line-height: 24px; color: ${CREAM}; white-space: nowrap; transition: color 0.2s; }
        .eh-caption { font-size: 12px; line-height: 14px; color: #d9c7e3; margin-bottom: 2px; }

        @media (min-width: 481px) and (max-width: 768px) {
          .eh-card { width: 360px; }
          .eh-name { font-size: 16px; }
        }
        @media (max-width: 480px) {
                 .eh-logos { gap: 14px; }
          .eh-logo-main { height: 50px; }
          .eh-logo-pair { gap: 12px; padding-top: 14px; }
          .eh-logo-hub { height: 54px; }
          .eh-logo-ms { height: 70px; }
          .eh-divider { height: 46px; }
/* (delete this line) */          .eh-title { font-size: 26px; }
                    .eh-icon { width: 26px; height: 26px; min-width: 26px; }
          .eh-icon svg { width: 20px; height: 20px; }
          .eh-name { font-size: 15px; }
          .eh-links { padding: 0 4%; }
        }
        /* (deleted) */
        @media (prefers-reduced-motion: reduce) { .eh-pill { transition: none; } .eh-pill:hover { transform: none; } .eh-bg img { transition: none; } }      `}</style>
    </div>
  );
};

export default EllevationHubBusinessProfile;