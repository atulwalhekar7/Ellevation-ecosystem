import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface Path {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  route: string;
  icon: React.ReactNode;
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3L14.8 8.5L21 9.4L16.5 13.8L17.6 20L12 17L6.4 20L7.5 13.8L3 9.4L9.2 8.5L12 3Z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2T12 3l9 18z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function EllevationPaths() {
  const [visible, setVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconPop {
          0%   { transform: scale(1) rotate(0deg); }
          40%  { transform: scale(1.2) rotate(-8deg); }
          70%  { transform: scale(0.95) rotate(4deg); }
          100% { transform: scale(1.08) rotate(0deg); }
        }

        .paths-section {
          background: #f0ebf8;
          transition: background 0.4s ease;
        }

        /* ── Card: collapsed by default ── */
        .path-card {
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(200,190,225,0.55);
          border-radius: 24px;
          padding: 32px;
          cursor: default;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          /* Fixed collapsed height — just enough for eyebrow + title + icon */
          height: 160px;
          transition:
            height 0.52s cubic-bezier(0.22,1,0.36,1),
            transform 0.38s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.38s ease,
            border-color 0.3s ease,
            background 0.4s ease;
        }

        /* Expanded on hover */
        .path-card:hover {
          height: 480px; /* Slight adjust for text length padding */
          transform: translateY(-8px);
          background: rgba(255,255,255,0.99);
          box-shadow:
            0 24px 60px rgba(124,92,191,0.2),
            0 4px 16px rgba(124,92,191,0.08);
          border-color: rgba(155,109,190,0.6);
        }

        /* Purple shimmer top bar */
        .path-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c4b5fd, #9b6dbe, #c4b5fd);
          border-radius: 24px 24px 0 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .path-card:hover::before { opacity: 1; }

        /* ── Hidden content: invisible + no height until hover ── */
        .path-hidden {
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 0.35s ease 0.18s,
            transform 0.38s cubic-bezier(0.22,1,0.36,1) 0.15s;
          pointer-events: none;
        }
        .path-card:hover .path-hidden {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* ── Icon ── */
        .path-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1a0a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .path-card:hover .path-icon-wrap {
          background: #3d1f6e;
          box-shadow: 0 0 0 6px rgba(155,109,190,0.15);
          animation: iconPop 0.5s ease forwards;
        }

        /* ── Title ── */
        .path-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 700;
          color: #1a0a2e;
          margin: 12px 0 0;
          line-height: 1.1;
          letter-spacing: -0.01em;
          transition: color 0.3s ease, margin-bottom 0.3s ease;
        }
        .path-card:hover .path-title {
          color: #3d1f6e;
          margin-bottom: 16px;
        }

        .paths-header-eyebrow {
          color: #7c5cbf;
          transition: color 0.3s ease;
        }

        .path-desc {
          font-size: 14.5px;
          line-height: 1.7;
          color: #5a4070;
          margin: 0 0 24px;
          transition: color 0.25s ease;
        }
        .path-card:hover .path-desc { color: #3d2a5a; }

        /* ── Features ── */
        .path-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #5a4070;
          line-height: 1.5;
          transition: color 0.2s, transform 0.2s;
        }
        .path-card:hover .path-feature { color: #3d2a5a; }
        .path-card:hover .path-feature:nth-child(1) { transform: translateX(4px); transition-delay: 0.22s; }
        .path-card:hover .path-feature:nth-child(2) { transform: translateX(4px); transition-delay: 0.27s; }
        .path-card:hover .path-feature:nth-child(3) { transform: translateX(4px); transition-delay: 0.32s; }
        .path-card:hover .path-feature:nth-child(4) { transform: translateX(4px); transition-delay: 0.37s; }

        .path-feature::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #9b6dbe;
          flex-shrink: 0;
          transition: transform 0.2s, background 0.2s;
        }
        .path-card:hover .path-feature::before {
          background: #7c5cbf;
          transform: scale(1.4);
        }

        /* ── CTA button ── */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #7c5cbf;
          background: transparent;
          border: 1.5px solid rgba(155,109,190,0.5);
          border-radius: 999px;
          padding: 12px 28px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.22s, border-color 0.22s, color 0.22s, gap 0.22s, transform 0.22s;
        }
        .path-card:hover .cta-btn {
          background: rgba(155,109,190,0.09);
          border-color: rgba(155,109,190,0.85);
          color: #5a3fa0;
          gap: 12px;
        }
        .cta-btn:hover { transform: scale(1.04); }

        @media (max-width: 768px) {
          .paths-grid { grid-template-columns: 1fr !important; }
          .path-card { height: auto !important; }
          .path-card:hover { height: auto !important; transform: none !important; }
          .path-hidden { opacity: 1 !important; transform: none !important; pointer-events: auto !important; }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .paths-section {
          background: #0f0a1a;
        }
        [data-theme="dark"] .path-card {
          background: rgba(30, 20, 45, 0.7);
          border-color: rgba(155, 109, 190, 0.25);
        }
        [data-theme="dark"] .path-card:hover {
          background: rgba(45, 30, 65, 0.98);
          border-color: rgba(196, 181, 253, 0.4);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }
        [data-theme="dark"] .path-title {
          color: #f3ebff;
        }
        [data-theme="dark"] .path-card:hover .path-title {
          color: #d8ccf4;
        }
        [data-theme="dark"] .path-desc,
        [data-theme="dark"] .path-feature {
          color: #b8a8c8;
        }
        [data-theme="dark"] .paths-header-eyebrow {
          color: #a78bfa !important;
        }
        [data-theme="dark"] .cta-btn {
          color: #d8ccf4;
          border-color: rgba(155, 109, 190, 0.4);
        }
        [data-theme="dark"] .path-card:hover .cta-btn {
          color: #ffffff;
          background: rgba(155, 109, 190, 0.15);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="paths-section"
        style={{
          padding: "60px 24px 100px",
          boxSizing: "border-box",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "620px",
            margin: "0 auto 56px",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
          }}
        >
          <p 
            className="paths-header-eyebrow"
            style={{
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Choose Your Ecosystem Path
          </p>
        </div>

        {/* Cards */}
        <div
          className="paths-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            maxWidth: "1040px",
            margin: "0 auto",
          }}
        >
          {paths.map((p: Path, i: number) => (
            <div
              key={p.title}
              className="path-card"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                animationDelay: `${0.2 + i * 0.15}s`,
              }}
            >
              {/* Always visible header tier */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}>
                <p style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#9b6dbe",
                  margin: 0,
                }}>
                  {p.eyebrow}
                </p>
                <div className="path-icon-wrap">{p.icon}</div>
              </div>

              <h3 className="path-title">{p.title}</h3>

              {/* Hidden structural body until hover */}
              <div className="path-hidden" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <p className="path-desc">{p.description}</p>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "32px",
                  flex: 1,
                }}>
                  {p.features.map((feat) => (
                    <div key={feat} className="path-feature">{feat}</div>
                  ))}
                </div>

                <div>
                  <Link to={p.route} className="cta-btn">
                    {p.cta}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}