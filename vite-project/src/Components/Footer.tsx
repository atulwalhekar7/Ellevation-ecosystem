import logo from "../assets/dark-mode-logo.png";
import { Link } from "react-router-dom";


const footerLinks = [
  {
    heading: "Main Website",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Ms Ellevation", href: "/ms-ellevation" },
      { label: "Ellevation Hub", href: "/hub" },
      { label: "Conversations", href: "/Conversations" },
      { label: "Event", href: "/Event" },
      { label: "Connect", href: "/Connect" },
    ],
  },
  {
    heading: "Ms. Ellevation",
    links: [
      { label: "Home", href: "/ms-ellevation" },
      { label: "About", href: "/ms-ellevation?page=about" },
      { label: "Journey", href: "/ms-ellevation?page=journey" },
      { label: "Programs", href: "/ms-ellevation?page=programs" },
      { label: "Events", href: "/ms-ellevation?page=events" },
      { label: "Stories", href: "/ms-ellevation?page=stories" },
      { label: "Join", href: "/ms-ellevation?page=join" },
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
];

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

const socialIcons = [
  { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/ms_ellevation/" },
  { icon: <YoutubeIcon />, label: "YouTube", href: "https://www.youtube.com/@EllevationOfficial" },
  { icon: <TiktokIcon />, label: "TikTok", href: "https://www.tiktok.com/@msellevation?_r=1&_t=ZS-97pLDiCJEYs" },
  { icon: <MailIcon />, label: "Email", href: "/contact" },
];

export default function EllevationFooter() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .footer-link {
          color: #cbd5e1;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          display: block;
          padding: 6px 0;
          transition: color 0.18s, transform 0.18s;
          cursor: pointer;
        }
        .footer-link:hover { 
          color: #c9a3d9;
          transform: translateX(2px);
        }
        
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

        .btn-purple {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 14px;
          background: #D7B264;
          border: none;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.05em;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(209, 26, 142, 0.25);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .btn-purple:hover {
          background: #3A1744;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(209, 26, 142, 0.35);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 14px;
          background: #D7B264;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }

        /* Footer text colors are set for a permanently dark background below;
           no [data-theme="dark"] switching needed for the footer itself. */

        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .links-matrix {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
            width: 100% !important;
          }
        }
        @media (max-width: 600px) {
          .footer-brand-actions {
            flex-direction: column;
            gap: 14px;
            width: 100%;
          }
          .btn-purple, .btn-ghost {
            width: 100%;
            justify-content: center;
          }
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
        <div style={{
          position: "absolute", top: "-100px", right: "5%",
          width: "500px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(209,26,142,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

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
          <div style={{ maxWidth: "440px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
              <div
  style={{
    width: "280px",   // Increased from 200px
    height: "140px",  // Increased from 100px
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}
>
  <img
    src={logo}
    alt="Ellevation Logo"
    className="footer-logo-img"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      filter:
        "drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.35))",
    }}
  />
</div>
            </div>

            <p 
              className="footer-description"
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "#cbd5e1",
                fontWeight: 400,
                marginBottom: "36px",
              }}
            >
             Ellevation is a community-led ecosystem creating pathways into wellbeing, leadership and opportunity. We empower culturally and linguistically diverse (CALD) communities to grow, lead and thrive while staying connected to their identity, culture and lived experience.
            </p>

            <div className="footer-brand-actions" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/get-involved/join" style={{ textDecoration: "none" }}>
                <button className="btn-purple">
                  Join Membership <ArrowRight />
                </button>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <button className="btn-ghost">
                  Contact Us <ArrowRight />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Block: Categorized Matrix */}
          <div className="links-matrix" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 180px)",
            gap: "40px",
          }}>
            {footerLinks.map(({ heading, links }) => (
              <div key={heading}>
                <h4 
                  className="footer-column-heading"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#D7B264",
                    marginBottom: "24px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                  }}
                >
                  {heading}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="footer-link"
                      >
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
            gap: "24px"
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