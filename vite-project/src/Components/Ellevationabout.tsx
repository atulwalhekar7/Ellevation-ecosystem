import React, { useState, useEffect, useRef } from "react";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Shared branding",
    description: "Designed as a production-ready frontend foundation with reusable visual patterns.",
  },
  {
    title: "Unified navigation",
    description: "Designed as a production-ready frontend foundation with reusable visual patterns.",
  },
  {
    title: "Expandable membership",
    description: "Designed as a production-ready frontend foundation with reusable visual patterns.",
  },
  {
    title: "CMS-ready structure",
    description: "Designed as a production-ready frontend foundation with reusable visual patterns.",
  },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#9b6dbe" strokeWidth="1.5" />
    <path
      d="M8 12.5l3 3 5-5"
      stroke="#9b6dbe"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function EllevationAbout() {
  const [visible, setVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
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
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ab-card {
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(200,190,220,0.5);
          border-radius: 20px;
          padding: 28px 26px 30px;
          cursor: default;
          box-sizing: border-box;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.32s ease,
                      background 0.2s,
                      border-color 0.2s;
        }
        .ab-card:hover {
          transform: translateY(-7px) scale(1.02);
          background: rgba(255,255,255,0.97);
          box-shadow: 0 16px 40px rgba(124,92,191,0.18);
          border-color: rgba(155,109,190,0.5);
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#f0ebf8",
          padding: "64px 56px",
          boxSizing: "border-box",
          fontFamily: "'DM Sans', sans-serif",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* Left column */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            animation: visible
              ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards"
              : "none",
          }}
        >
          {/* Eyebrow — centered */}
          <p
            style={{
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "#7c5cbf",
              margin: "0 0 16px",
              textAlign: "center",
            }}
          >
            About Ellevation
          </p>

          {/* Heading — centered */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#1a0a2e",
              margin: "0 0 24px",
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            One main website. Two connected journeys. One elevated community.
          </h2>

          {/* Body — left aligned */}
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#5a4070",
              margin: 0,
              fontWeight: 400,
              textAlign: "left",
            }}
          >
            The main Ellevation site holds the brand, navigation, footer,
            design system, content, events, and directories while guiding
            visitors into either the Ms. Ellevation transformation flow or
            the Ellevation Hub membership flow.
          </p>
        </div>

        {/* Right column — 2×2 card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {features.map((f: Feature, i: number) => (
            <div
              key={f.title}
              className="ab-card"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards"
                  : "none",
                animationDelay: `${0.2 + i * 0.1}s`,
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <CheckIcon />
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1a0a2e",
                  margin: "0 0 10px",
                  lineHeight: 1.2,
                }}
              >
                {f.title}
              </p>

              <p
                style={{
                  fontSize: "13.5px",
                  lineHeight: 1.65,
                  color: "#7a6890",
                  margin: 0,
                }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}