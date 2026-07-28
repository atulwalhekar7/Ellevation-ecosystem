import { useEffect, useRef, useState } from "react";

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

const FinalInvitationSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .final-invitation-section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%);
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
          box-sizing: border-box;
        }

        .fi-wrapper {
          width: 100%;
          max-width: 1240px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Audience cards strip (moved here from EllevationPaths) ── */
        .ellevation-audience-strip {
          width: 100%;
          margin: 0 0 72px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ellevation-audience-strip.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ellevation-audience-card {
          background: #fff;
          border: 1px solid rgba(75, 30, 86, 0.12);
          border-radius: 18px;
          padding: 26px 22px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ellevation-audience-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(45, 11, 54, 0.1);
          border-color: rgba(75, 30, 86, 0.25);
        }
        .ellevation-audience-icon {
          width: 40px;
          height: 40px;
          color: #4B1E56;
          margin-bottom: 16px;
        }
        .ellevation-audience-card-label {
          font-family: 'Astrid Regular', serif;
          font-size: 1.05rem;
          color: #231226;
          margin-bottom: 8px;
          font-weight: 700;
        }
        .ellevation-audience-card-copy {
          font-size: 0.9rem;
          line-height: 1.55;
          color: #5B4A61;
        }

        [data-theme="dark"] .ellevation-audience-card {
          background: rgba(75, 30, 86, 0.35) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
        [data-theme="dark"] .ellevation-audience-card-label { color: #ffffff !important; }
        [data-theme="dark"] .ellevation-audience-card-copy { color: #cbd5e1 !important; }
        [data-theme="dark"] .ellevation-audience-icon { color: #d9b8e8 !important; }

        @media (max-width: 920px) {
          .ellevation-audience-strip { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ellevation-audience-strip { grid-template-columns: 1fr; }
        }

        .fi-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fi-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fi-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #662369;
          margin: 0 0 12px 0;
        }

        .fi-heading {
          font-family: 'Astrid Regular', serif;
          font-size: 52px;
          font-weight: 700;
          color: #4B1E56;
          margin: 0 0 48px 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
          max-width: 800px;
        }

        .fi-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        /* Primary button */
        .fi-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #D7B264;
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(90, 63, 160, 0.2);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s, gap 0.2s;
          white-space: nowrap;
        }

        .fi-btn-primary:hover {
          background: #4c2882;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 40, 130, 0.3);
          gap: 12px;
        }

        /* Secondary button */
        .fi-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #D7B264;
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(90, 63, 160, 0.2);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s, gap 0.2s;
          white-space: nowrap;
        }

        .fi-btn-secondary:hover {
           background: #4c2882;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 40, 130, 0.3);
          gap: 12px;
        }

        .fi-arrow {
          font-size: 14px;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        @media (max-width: 868px) {
          .fi-heading { font-size: 38px !important; margin-bottom: 36px !important; }
          .final-invitation-section { padding: 80px 24px !important; }
        }

        @media (max-width: 600px) {
          .fi-buttons {
            flex-direction: column;
            gap: 14px;
            width: 100%;
          }
          .fi-btn-primary,
          .fi-btn-secondary {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .final-invitation-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }
        [data-theme="dark"] .fi-eyebrow {
          color: #a78bfa;
        }
        [data-theme="dark"] .fi-heading {
          color: #ffffff;
        }
        [data-theme="dark"] .fi-btn-primary {
           background: #D7B264;
          color: #ffffff;
          border-color: rgba(155, 109, 190, 0.2);
        }
        [data-theme="dark"] .fi-btn-primary:hover {
          background: #1f142e;
          border-color: rgba(155, 109, 190, 0.4);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        [data-theme="dark"] .fi-btn-secondary {
          background: #D7B264;
          color: #ffffff;
          border-color: rgba(155, 109, 190, 0.2);
        }
        [data-theme="dark"] .fi-btn-secondary:hover {
          background: #1f142e;
          border-color: rgba(155, 109, 190, 0.4);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <section className="final-invitation-section" ref={sectionRef}>
        <div className="fi-wrapper">
          {/* ── Audience cards (moved from EllevationPaths hero) ── */}
          <div className={`ellevation-audience-strip${visible ? " visible" : ""}`}>
            {audiences.map((a) => (
              <div key={a.id} className="ellevation-audience-card">
                <div className="ellevation-audience-icon">{a.icon}</div>
                <div className="ellevation-audience-card-label">{a.label}</div>
                <div className="ellevation-audience-card-copy">{a.copy}</div>
              </div>
            ))}
          </div>

          <div className={`fi-content${visible ? " visible" : ""}`}>
            <h2 className="fi-heading">
              Enter the ecosystem. Find your pathway.
            </h2>

            <div className="fi-buttons">
              <a href="/ms-ellevation" className="fi-btn-primary">
                Ms. Ellevation <span className="fi-arrow">→</span>
              </a>
              <a href="/hub" className="fi-btn-secondary">
                Ellevation Hub <span className="fi-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalInvitationSection;