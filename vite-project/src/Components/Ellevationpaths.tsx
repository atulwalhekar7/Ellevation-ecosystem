import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface Path {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  route: string;
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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .paths-section {
          background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%);
        }

        .paths-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 700;
          color: #d11a8e;
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
          background: linear-gradient(90deg, #662369, #d11a8e);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .path-card:hover::before { opacity: 1; }

        /* ── Header Row ── */
        .path-card-eyebrow {
          font-family: 'DM Sans', sans-serif;
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
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 700;
          color: #254636;
          margin: 0;
          line-height: 1.2;
          transition: color 0.3s ease;
        }
        .path-card:hover .path-title {
          color: #4c2882;
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
          font-family: 'DM Sans', sans-serif;
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
          font-family: 'DM Sans', sans-serif;
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
          background: #d11a8e;
          flex-shrink: 0;
        }

        /* ── CTA button ── */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #ffffff;
          background: #d11a8e;
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
          background: #4c2882;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 40, 130, 0.3);
          gap: 12px;
        }

        /* Responsive Breakpoint handling */
        @media (max-width: 868px) {
          .paths-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .path-drawer-wrapper { grid-template-rows: 1fr !important; }
          .path-desc, .path-feature, .cta-btn { opacity: 1 !important; transform: none !important; }
          .paths-header-title { font-size: 38px !important; }
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .paths-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }
        [data-theme="dark"] .paths-header-title {
          color: #d11a8e;
        }
        [data-theme="dark"] .path-card {
          background: rgba(25, 16, 38, 0.6);
          border-color: rgba(155, 109, 190, 0.15);
        }
        [data-theme="dark"] .path-card:hover {
          background: #1f142e;
          border-color: rgba(155, 109, 190, 0.35);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        [data-theme="dark"] .path-title {
          color: #ffffff;
        }
        [data-theme="dark"] .path-card:hover .path-title {
          color: #e9d5ff;
        }
        [data-theme="dark"] .path-card-eyebrow {
          color: #c084fc;
        }
        [data-theme="dark"] .path-desc {
          color: #cbd5e1;
        }
        [data-theme="dark"] .path-feature {
          color: #e2e8f0;
        }
        [data-theme="dark"] .cta-btn {
          background: #a855f7;
        }
        [data-theme="dark"] .cta-btn:hover {
          background: #c084fc;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="paths-section"
        style={{
          padding: "100px 24px",
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
              {/* Flex Header Component Structure */}
              <div style={{ width: "100%" }}>
                <p className="path-card-eyebrow">{p.eyebrow}</p>
                <h3 className="path-title">{p.title}</h3>
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