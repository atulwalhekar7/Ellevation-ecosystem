import logo from "../assets/Ms-Ellevation-removebg-preview.png";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    heading: "Main Website",
    links: [
      { label: "Home", href: "/" },
      { label: "About Ellevation", href: "/about" },
      { label: "YouTube Content", href: "/content/youtube" },
      { label: "Social Media Pages", href: "/content/social-media" },
      { label: "Join Us Ellevation", href: "/get-involved/join" },
      { label: "Alliances", href: "/get-involved/alliances" },
      { label: "Professional Membership Directories", href: "/get-involved/directories" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Ms. Ellevation",
    links: [
      { label: "Home", href: "/ms-ellevation" },
      { label: "About", href: "/ms-ellevation#about" },
      { label: "Services", href: "/ms-ellevation#services" },
      { label: "Transformational Stories", href: "/ms-ellevation#stories" },
      { label: "Start Your Journey", href: "/ms-ellevation#join" },
    ],
  },
  {
    heading: "Ellevation Hub",
    links: [
      { label: "Home", href: "/hub" },
      { label: "About", href: "/hub#about" },
      { label: "Community", href: "/hub#ecosystem" },
      { label: "Membership", href: "/hub#membership" },
      { label: "Professional", href: "/hub#impact" },
      { label: "Connect", href: "/hub#connect" },
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
  { icon: <YoutubeIcon />, label: "YouTube", href: "/content/youtube" },
  { icon: <MailIcon />, label: "Email", href: "/contact" },
];

export default function EllevationFooter() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .footer-link {
          color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          text-decoration: none;
          display: block;
          padding: 6px 0;
          transition: color 0.18s;
          cursor: pointer;
        }
        .footer-link:hover { color: #fff; }
        
        .footer-utility-link {
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          text-decoration: none;
          transition: color 0.18s;
        }
        .footer-utility-link:hover { color: #fff; }

        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .social-btn:hover {
          background: rgba(192,132,252,0.2);
          border-color: rgba(192,132,252,0.5);
          color: #fff;
        }
        .btn-purple:hover { opacity: 0.88; }
        .btn-ghost:hover { background: rgba(255,255,255,0.18) !important; }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] footer {
          background: #080510 !important;
          transition: background 0.4s ease;
        }
        [data-theme="dark"] .footer-logo-img {
          background: transparent !important;
          filter: brightness(1.2);
        }
        [data-theme="dark"] .footer-description {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        [data-theme="dark"] .footer-column-heading {
          color: #a78bfa !important;
        }
        [data-theme="dark"] .footer-bottom-text {
          color: rgba(255, 255, 255, 0.3) !important;
        }
        [data-theme="dark"] .footer-divider {
          background: rgba(255, 255, 255, 0.08) !important;
        }
      `}</style>

      <footer
        style={{
          background: "linear-gradient(135deg, #140826 0%, #1e0d38 25%, #2a1250 50%, #341868 70%, #3d1f7a 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Decorative background gradients */}
        <div style={{
          position: "absolute", top: "-80px", right: "10%",
          width: "500px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,60,180,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "0", left: "20%",
          width: "400px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,40,160,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 48px 48px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left Column: Brand profile info */}
          <div style={{ maxWidth: "420px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
              <div style={{ width: "150px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={logo} alt="Ellevation Logo" className="footer-logo-img" style={{ width: "100%", height: "100%", objectFit: "contain", background: "white" }} />
              </div>
            </div>

            <p 
              className="footer-description"
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.72)",
                fontWeight: 400,
                marginBottom: "32px",
              }}
            >
              A premium community ecosystem for personal transformation, professional
              pathways, strategic alliances, and impact-centered belonging.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/get-involved/join" style={{ textDecoration: "none" }}>
                <button
                  className="btn-purple"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 22px",
                    borderRadius: "100px",
                    background: "linear-gradient(135deg, #a87bc8 0%, #8b5bb5 100%)",
                    border: "none",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(100,50,160,0.35)",
                    transition: "opacity 0.18s",
                    whiteSpace: "nowrap",
                  }}
                >
                  Join Membership <ArrowRight />
                </button>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <button
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 22px",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background 0.18s",
                    whiteSpace: "nowrap",
                  }}
                >
                  Contact Us <ArrowRight />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section Matrix: Generated from custom routing schema */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 200px)",
            gap: "40px",
          }}>
            {footerLinks.map(({ heading, links }) => (
              <div key={heading}>
                <h4 
                  className="footer-column-heading"
                  style={{
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#c9a96e",
                    marginBottom: "20px",
                    letterSpacing: "0.05em",
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

        {/* Divider rule line */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <div className="footer-divider" style={{ height: "1px", background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* Utility footer bar */}
       <div
  style={{
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "24px 48px 36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px"
  }}
>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <p className="footer-bottom-text" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", fontWeight: 400, margin: 0 }}>
              © 2026 Ellevation. All rights reserved.
            </p>
            <Link to="/privacy" className="footer-utility-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-utility-link">Terms & Conditions</Link>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
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