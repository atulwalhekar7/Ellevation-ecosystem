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
    eyebrow: "Executive Leadership Track",
    title: "Ms. Ellevation",
    description:
      "A high-touch leadership experience designed for women founders, executives, and changemakers ready to scale influence, confidence, and strategic impact.",
    features: [
      "Executive Mentorship",
      "Leadership Intensives",
      "Private Mastermind Access",
      "Quarterly Strategy Retreats",
    ],
    cta: "Apply Now",
route: "/ms-ellevation",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9L12 3z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Community & Networking",
    title: "Ellevation Hub",
    description:
      "A curated membership network connecting ambitious women through collaboration, meaningful relationships, curated events, and growth opportunities.",
    features: [
      "Monthly Networking Events",
      "Industry Peer Groups",
      "Business Collaboration",
      "Member Resource Library",
    ],
    cta: "Become a Member",
 route: "/hub",
     icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3" stroke="white" strokeWidth="1.5" />
        <path
          d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
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
        @keyframes dotSlide {
          from { transform: translateX(-4px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }

        .path-card {
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(200,190,225,0.55);
          border-radius: 24px;
          padding: 36px 32px 40px;
          box-sizing: border-box;
          cursor: default;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition:
            transform 0.38s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.38s ease,
            border-color 0.28s ease,
            background 0.28s ease;
        }

        /* Soft purple shimmer at top on hover */
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

        .path-card:hover {
          transform: translateY(-12px) scale(1.025);
          background: rgba(255,255,255,0.99);
          box-shadow:
            0 24px 60px rgba(124,92,191,0.2),
            0 4px 16px rgba(124,92,191,0.08);
          border-color: rgba(155,109,190,0.6);
        }

        .path-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1a0a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .path-card:hover .path-icon-wrap {
          background: #3d1f6e;
          box-shadow: 0 0 0 6px rgba(155,109,190,0.15);
          animation: iconPop 0.5s ease forwards;
        }

        .path-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 700;
          color: #1a0a2e;
          margin: 0 0 16px;
          line-height: 1.1;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .path-card:hover .path-title { color: #3d1f6e; }

        .path-desc {
          font-size: 14.5px;
          line-height: 1.7;
          color: #5a4070;
          margin: 0 0 24px;
          transition: color 0.25s ease;
        }
        .path-card:hover .path-desc { color: #3d2a5a; }

        .path-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #5a4070;
          line-height: 1.5;
          transition: color 0.2s, transform 0.2s;
        }
        .path-card:hover .path-feature {
          color: #3d2a5a;
        }
        .path-card:hover .path-feature:nth-child(1) { transform: translateX(4px); transition-delay: 0.00s; }
        .path-card:hover .path-feature:nth-child(2) { transform: translateX(4px); transition-delay: 0.05s; }
        .path-card:hover .path-feature:nth-child(3) { transform: translateX(4px); transition-delay: 0.10s; }
        .path-card:hover .path-feature:nth-child(4) { transform: translateX(4px); transition-delay: 0.15s; }

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
          transition: background 0.22s, border-color 0.22s, color 0.22s, gap 0.22s, transform 0.22s;
        }
        .path-card:hover .cta-btn {
          background: rgba(155,109,190,0.09);
          border-color: rgba(155,109,190,0.85);
          color: #5a3fa0;
          gap: 12px;
        }
        .cta-btn:hover {
          transform: scale(1.04);
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#f0ebf8",
          padding: "72px 56px 80px",
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
          <p style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7c5cbf",
            margin: "0 0 16px",
                      fontFamily: "'DM Sans', serif",

          }}>
            Choose Your Path
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#1a0a2e",
            margin: "0 0 18px",
            letterSpacing: "-0.01em",
          }}>
  Choose the experience that matches your current season of growth.
          </h2>
          <p style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#5a4070",
            margin: 0,
          }}>
            Whether you're seeking personal transformation through coaching and healing,
  or professional expansion through community, mentorship, and collaboration —
  both paths are designed to support ambitious women rising with purpose.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          maxWidth: "980px",
          margin: "0 auto",
        }}>
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
              {/* Top row */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}>
                <p style={{
                  fontSize: "15px",
                  fontWeight: 500,
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
              <p className="path-desc">{p.description}</p>

              {/* Features */}
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

              {/* CTA */}
              <div>
  <Link
    to={p.route}
    className="cta-btn"
    style={{ textDecoration: "none" }}
  >
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
          ))}
        </div>
      </section>
    </>
  );
}