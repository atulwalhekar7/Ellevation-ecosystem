import ellevationHubLogo from "../assets/Ellevation-darkmode-logo.png";
import msEllevationLogo from "../assets/ms-ellevation-darkmode-logo.png";
import { Link, useLocation } from "react-router-dom";


const JOIN_ROUTE = "/get-involved/join";
const ONBOARDING_ROUTE = "/onboarding-form";

// Order: Main Website – Ellevation Hub – Ms Ellevation
const footerLinks = [
  {
    heading: "Main Website",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Ellevation Hub", href: "/hub" },
      { label: "Ms Ellevation", href: "/ms-ellevation" },
      { label: "Conversations", href: "/Conversations" },
      { label: "Events", href: "/Event" },
      { label: "Connect", href: "/Connect" },
    ],
  },
  {
    heading: "Ellevation Hub",
    links: [
      { label: "Home", href: "/hub" },
      { label: "About", href: "/hub?page=about" },
      { label: "Membership", href: "/hub?page=membership" },
      { label: "Directory", href: "/hub?page=directory" },
      { label: "Programs", href: "/hub?page=programs" },
      { label: "Opportunities", href: "/hub?page=opportunities" },
      { label: "Events", href: "/hub?page=events" },
      { label: "Impact", href: "/hub?page=impact" },
      { label: "Connect", href: "/hub?page=connect" },
    ],
  },
  {
    heading: "Ms Ellevation",
    links: [
      { label: "Home", href: "/ms-ellevation" },
      { label: "About", href: "/ms-ellevation?page=about" },
      { label: "Journey", href: "/ms-ellevation?page=journey" },
      { label: "Programs", href: "/ms-ellevation?page=programs" },
      { label: "Membership", href: "/ms-ellevation?page=membership" },
      { label: "Events", href: "/ms-ellevation?page=events" },
      { label: "Stories", href: "/ms-ellevation?page=stories" },
      // One shared Join page for the whole ecosystem
      { label: "Join", href: `${JOIN_ROUTE}?path=ms-ellevation` },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

const TiktokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 2c.3 2.1 1.8 3.8 4 4.2v3a7.1 7.1 0 0 1-4-1.2v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.1a2.8 2.8 0 1 0 2 2.7V2z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const MS_ELLEVATION_INSTAGRAM = "https://www.instagram.com/ms_ellevation/";
const HUB_INSTAGRAM =
  "https://www.instagram.com/ellevation.hub?vrfl=MTVtbTdkMTlrenFxaw%3D%3D&utm_source=qr";

const getSocialIcons = (instagramHref: string) => [
  { icon: <InstagramIcon />, label: "Instagram", href: instagramHref },
  { icon: <YoutubeIcon />, label: "YouTube", href: "https://www.youtube.com/@EllevationOfficial" },
  { icon: <TiktokIcon />, label: "TikTok", href: "https://www.tiktok.com/@msellevation?_r=1&_t=ZS-97pLDiCJEYs" },
  { icon: <MailIcon />, label: "Email", href: "mailto:hello@ellevationhub.com.au" },
];

/* ------------------------------------------------------------------ */
/* Flags (inline SVG, so no extra image files are needed)              */
/* NOTE: simplified artwork. For official reproduction, swap these     */
/* for the official flag files.                                        */
/* ------------------------------------------------------------------ */

/** Points for an n-pointed star centred at (cx, cy). */
function starPoints(cx: number, cy: number, outer: number, inner: number, n: number): string {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

const AboriginalFlag = () => (
  <svg viewBox="0 0 300 200" role="img" aria-label="Aboriginal flag">
    <rect width="300" height="100" fill="#000000" />
    <rect y="100" width="300" height="100" fill="#CC0000" />
    <circle cx="150" cy="100" r="50" fill="#FFCD00" />
  </svg>
);

const TorresStraitIslanderFlag = () => (
  <svg viewBox="0 0 300 200" role="img" aria-label="Torres Strait Islander flag">
    <rect width="300" height="200" fill="#009739" />
    <rect y="50" width="300" height="100" fill="#000000" />
    <rect y="54" width="300" height="92" fill="#0033A0" />
    {/* Dhari (headdress) – simplified */}
    <polygon points={starPoints(150, 92, 32, 20, 12)} fill="#FFFFFF" />
    <circle cx="150" cy="92" r="11" fill="#0033A0" />
    {/* Five-pointed star */}
    <polygon points={starPoints(150, 130, 11, 4.6, 5)} fill="#FFFFFF" />
  </svg>
);

const AustralianFlag = () => (
  <svg viewBox="0 0 1000 500" role="img" aria-label="Australian flag" preserveAspectRatio="xMidYMid slice">
    <defs>
      <clipPath id="au-uj-clip">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
    </defs>
    <rect width="1000" height="500" fill="#00247D" />
    {/* Union Jack: top-left quarter of the flag */}
    <g transform="scale(8.3333)">
      <path d="M0,0 v30 h60 v-30 z" fill="#00247D" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#au-uj-clip)" stroke="#CF142B" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#CF142B" strokeWidth="6" />
    </g>
    {/* Commonwealth Star (7 points) */}
    <polygon points={starPoints(250, 375, 85, 36, 7)} fill="#FFFFFF" />
    {/* Southern Cross */}
    <polygon points={starPoints(750, 75, 42, 18, 7)} fill="#FFFFFF" />
    <polygon points={starPoints(625, 200, 42, 18, 7)} fill="#FFFFFF" />
    <polygon points={starPoints(875, 175, 42, 18, 7)} fill="#FFFFFF" />
    <polygon points={starPoints(750, 425, 42, 18, 7)} fill="#FFFFFF" />
    <polygon points={starPoints(812, 288, 24, 10, 5)} fill="#FFFFFF" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export default function EllevationFooter() {
  const { pathname } = useLocation();
  const isHubPage = pathname === "/hub" || pathname.startsWith("/hub/");
  const socialIcons = getSocialIcons(
    isHubPage ? HUB_INSTAGRAM : MS_ELLEVATION_INSTAGRAM
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        /* Same display font as the rest of the site */
        @font-face {
          font-family: 'Astrid Regular';
          src: url('/fonts/AstridRegular.woff2') format('woff2'),
               url('/fonts/AstridRegular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        /* ---------------------------------------------------------
           ALIGNMENT: one shared logo height drives both the logo row
           (left) and the yellow headings' offset (right), so the
           headings always sit on the logos' vertical centre line.
           --------------------------------------------------------- */
        .footer-grid {
          --logo-h: 100px;         /* height of the logo row (original size) */
          --heading-lh: 15px;      /* line-height of the yellow headings */
        }

        .footer-link {
          color: #cbd5e1;
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 500;
          text-decoration: none;
          display: block;
          padding: 6px 0;
          transition: color 0.18s, transform 0.18s;
          cursor: pointer;
        }
        .footer-link:hover { color: #c9a3d9; transform: translateX(2px); }

        .footer-utility-link {
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.18s;
        }
        .footer-utility-link:hover { color: #c9a3d9; }

        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .social-btn:hover {
          background: #D7B264;
          border-color: #6B3179;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 8px 18px rgba(75, 30, 86, 0.45);
        }

        /* Buttons are real links (no <button> nested inside <a>),
           so clicking them always navigates. */
        .btn-purple, .btn-ghost {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 14px;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.05em;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-purple {
          background: #D7B264;
          border: none;
          box-shadow: 0 4px 14px rgba(209, 26, 142, 0.25);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-purple:hover {
          background: #3A1744;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(209, 26, 142, 0.35);
        }
        .btn-ghost {
          background: #D7B264;
          border: 1px solid rgba(255, 255, 255, 0.18);
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }

        /* ---------- Logo row (left) ---------- */
        .footer-logos {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .footer-logo-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 190px;
          height: var(--logo-h);
          overflow: hidden;
        }
        .footer-logo-link img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.35));
        }
        .footer-logo-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
        }

        .footer-tagline {
          font-family: 'Astrid Regular', serif;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.3;
          color: #ffffff;
          margin: 0 0 16px 0;
          letter-spacing: -0.01em;
        }

        /* ---------- Link columns (right) ---------- */
        .links-matrix {
          display: grid;
          grid-template-columns: repeat(3, 180px);
          gap: 40px;
          /* centre the heading text on the logo row's centre line */
          padding-top: calc((var(--logo-h) - var(--heading-lh)) / 2);
        }
        .footer-column-heading {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 14px;
          line-height: var(--heading-lh);
          color: #D7B264;
          margin: 0 0 24px 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .footer-flags {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }
        .footer-flag {
          width: 66px;
          height: 44px;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }
        .footer-flag-wide { width: 88px; }
        .footer-flag svg { width: 100%; height: 100%; display: block; }

        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 48px !important;
          }
          .links-matrix {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            width: 100%;
            padding-top: 0;   /* stacked layout: no offset needed */
          }
        }
        @media (max-width: 600px) {
          .footer-grid { --logo-h: 80px; }
          .footer-brand-actions {
            flex-direction: column;
            gap: 14px;
            width: 100%;
          }
          .btn-purple, .btn-ghost {
            width: 100%;
            padding: 14px 20px;
            white-space: normal;
          }
          .footer-logo-divider { display: none; }
          .footer-logo-link { width: 150px; }
          .footer-tagline { font-size: 18px; }
          .footer-ack { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>

      <footer
        style={{
          background: "#2D0B36",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "5%",
            width: "500px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(209,26,142,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="footer-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px 48px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "100px",
            alignItems: "start",
          }}
        >
          {/* Left Block: Brand Signature */}
          <div style={{ maxWidth: "500px" }}>
            {/* Both brand logos: Ellevation Hub first, then Ms Ellevation */}
            <div className="footer-logos">
              <Link to="/hub" className="footer-logo-link" aria-label="Ellevation Hub">
                <img src={ellevationHubLogo} alt="Ellevation Hub logo" />
              </Link>
              <span className="footer-logo-divider" aria-hidden="true" />
              <Link to="/ms-ellevation" className="footer-logo-link" aria-label="Ms Ellevation">
                <img src={msEllevationLogo} alt="Ms Ellevation logo" />
              </Link>
            </div>

            <h2 className="footer-tagline">One Ecosystem. Two Pathways. Shared Impact.</h2>

            <p
              className="footer-description"
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "#cbd5e1",
                fontWeight: 400,
                margin: "0 0 36px 0",
              }}
            >
              Ellevation Hub and Ms Ellevation are part of a community-led ecosystem creating
              pathways into confidence, wellbeing, leadership, opportunity and community impact.
              We empower culturally and linguistically diverse (CALD) communities, women, families
              and future leaders to grow, lead and thrive while staying connected to their
              identity, culture and lived experience.
            </p>

            <div className="footer-brand-actions" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link to={JOIN_ROUTE} className="btn-purple">
                Join Membership <ArrowRight />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Contact Us <ArrowRight />
              </Link>
            </div>
          </div>

          {/* Right Block: Main Website – Ellevation Hub – Ms Ellevation */}
          <div className="links-matrix">
            {footerLinks.map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="footer-column-heading">{heading}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Structural Section Break */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div className="footer-divider" style={{ height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />
        </div>

        {/* Acknowledgement of Country + flags */}
        <div
          className="footer-ack"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "32px 24px 0",
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <div className="footer-flags">
            <div className="footer-flag" title="Aboriginal flag">
              <AboriginalFlag />
            </div>
            <div className="footer-flag" title="Torres Strait Islander flag">
              <TorresStraitIslanderFlag />
            </div>
            <div className="footer-flag footer-flag-wide" title="Australian flag">
              <AustralianFlag />
            </div>
          </div>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#cbd5e1",
              fontWeight: 400,
              margin: 0,
              maxWidth: "820px",
            }}
          >
            We acknowledge Aboriginal and Torres Strait Islander peoples as the Traditional
            Custodians of Country and pay our respects to Elders past and present.
          </p>
        </div>

        {/* Utility / Compliance row */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "32px 24px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              flexWrap: "wrap",
            }}
          >
            <p
              className="footer-bottom-text"
              style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 500,
                margin: 0,
              }}
            >
              © 2026 Ellevation. All rights reserved.
            </p>

            <Link to="/privacy-policy" className="footer-utility-link">
              Privacy Policy
            </Link>

            <Link to="/terms-condition" className="footer-utility-link">
              Terms & Conditions
            </Link>
            <Link to={ONBOARDING_ROUTE} className="footer-utility-link">
  Onboarding Form
</Link>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {socialIcons.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="social-btn"
                aria-label={label}
                title={label}
                style={{ textDecoration: "none" }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}