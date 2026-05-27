const footerLinks = [
  {
    heading: "Ellevation",
    headingColor: "#c9a96e",
    links: ["About", "Events", "Contact", "Professional Directories"],
  },
  {
    heading: "Ms. Ellevation",
    headingColor: "#c9a96e",
    links: ["Home", "Services", "Stories", "Start Your Journey"],
  },
  {
    heading: "Ellevation Hub",
    headingColor: "#c9a96e",
    links: ["Ecosystem", "Membership", "Impact", "Connect"],
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

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6L12 2z" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const socialIcons = [
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <YoutubeIcon />, label: "YouTube" },
  { icon: <MailIcon />, label: "Email" },
  { icon: <SparkleIcon />, label: "More" },
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
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          display: block;
          padding: 5px 0;
          transition: color 0.18s;
          cursor: pointer;
        }
        .footer-link:hover { color: #fff; }
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
      `}</style>

      <footer
        style={{
          background: "linear-gradient(135deg, #140826 0%, #1e0d38 25%, #2a1250 50%, #341868 70%, #3d1f7a 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Subtle background glow */}
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
            padding: "56px 48px 40px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Left: Logo + description + buttons */}
          <div style={{ maxWidth: "480px" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: "20px", color: "#1e0a3c",
                flexShrink: 0,
              }}>
                E
              </div>
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#fff",
                  letterSpacing: "0.01em",
                  lineHeight: 1.1,
                }}>
                  Ellevation
                </div>
                <div style={{
                  fontSize: "9px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  marginTop: "2px",
                }}>
                  Rise In Community
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.72)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              marginBottom: "32px",
              maxWidth: "420px",
            }}>
              A premium community ecosystem for personal transformation, professional
              pathways, strategic alliances, and impact-centered belonging.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
                  fontFamily: "'DM Sans', sans-serif",
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
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background 0.18s",
                  whiteSpace: "nowrap",
                }}
              >
                Get Listed <ArrowRight />
              </button>
            </div>
          </div>

          {/* Right: Nav columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "56px",
          }}>
            {footerLinks.map(({ heading, links }) => (
              <div key={heading}>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#c9a96e",
                  marginBottom: "20px",
                  letterSpacing: "0.01em",
                }}>
                  {heading}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px",
        }}>
          <div style={{
            height: "1px",
            background: "rgba(255,255,255,0.12)",
          }} />
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "20px 48px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
          }}>
            © 2026 Ellevation. Designed as a scalable frontend concept.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socialIcons.map(({ icon, label }) => (
              <button key={label} className="social-btn" aria-label={label} title={label}>
                {icon}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}