import React, { useState } from "react";

interface Card {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  bg: string;
  glow: string;
  border: string;
}

const cards: Card[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" />
      </svg>
    ),
    title: "Weekly Room",
    description: "A devotional-style rhythm for reflection, courage, and leadership.",
    accent: "#9b6dbe",
    bg: "linear-gradient(145deg, #f8f4ff 0%, #f0eaff 100%)",
    glow: "rgba(155,109,190,0.35)",
    border: "rgba(155,109,190,0.6)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "Community TV",
    description: "Video-led stories, teachings, member highlights, and cultural conversations.",
    accent: "#7c5cbf",
    bg: "linear-gradient(145deg, #f5f0ff 0%, #ece4ff 100%)",
    glow: "rgba(124,92,191,0.35)",
    border: "rgba(124,92,191,0.6)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="15" r="1" fill="currentColor" />
        <circle cx="12" cy="15" r="1" fill="currentColor" />
        <circle cx="16" cy="15" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Signature Events",
    description: "Conference-style rooms, salons, dinners, retreats, and digital gatherings.",
    accent: "#8b5cf6",
    bg: "linear-gradient(145deg, #f6f2ff 0%, #ede5ff 100%)",
    glow: "rgba(139,92,246,0.35)",
    border: "rgba(139,92,246,0.6)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Professional Paths",
    description: "Directory visibility, alliances, referrals, and membership access.",
    accent: "#6d4fc2",
    bg: "linear-gradient(145deg, #f4f0ff 0%, #ebe3ff 100%)",
    glow: "rgba(109,79,194,0.35)",
    border: "rgba(109,79,194,0.6)",
  },
];

export default function EllevationCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes iconPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.18) rotate(-6deg); }
          70%  { transform: scale(0.96) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .card-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .card-inner {
          position: relative;
          z-index: 1;
          border-radius: 24px;
          padding: 28px 28px 32px;
          cursor: pointer;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.9);
          transition:
            transform 0.35s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s ease;
        }
        .card-wrap:hover .card-inner {
          transform: translateY(-10px) scale(1.025);
        }

        .icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s;
        }
        .card-wrap:hover .icon-wrap {
          animation: iconPop 0.5s ease forwards;
        }

        .arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(155,109,190,0.25);
          background: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .card-wrap:hover .arrow-btn {
          background: rgba(155,109,190,0.12);
          border-color: rgba(155,109,190,0.5);
          transform: translate(2px, -2px);
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.15;
          color: #1a0a2e;
          margin: 28px 0 14px;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .card-wrap:hover .card-title { color: #3d1f6e; }

        .card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.65;
          color: rgba(79, 31, 115, 0.92);
          transition: color 0.2s;
        }
        .card-wrap:hover .card-desc { color: rgba(42,18,60,0.78); }
      `}</style>

      <section
        style={{
          background: "linear-gradient(150deg, #fdf6f9 0%, #f5eaf4 40%, #ede8f5 100%)",
          padding: "10px 40px 80px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 700,
            color: "#1a0a2e",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}>
            Everything you need to rise.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            alignItems: "stretch",
            gap: "20px",
          }}
        >
        {cards.map((card: Card, i: number) => (
            <div
              key={card.title}
              className="card-wrap"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="card-inner"
                style={{
                  background: card.bg,
                  boxShadow: hovered === i
                    ? `0 24px 64px ${card.glow}, 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1.5px ${card.border}`
                    : `0 4px 24px rgba(160,120,200,0.08), 0 1px 4px rgba(0,0,0,0.04)`,
                }}
              >
                {/* Top row: icon + arrow */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div
                    className="icon-wrap"
                    style={{
                      background: hovered === i
                        ? `rgba(155,109,190,0.15)`
                        : `rgba(155,109,190,0.09)`,
                      color: card.accent,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div className="arrow-btn">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H7M17 7v10"
                        stroke={card.accent}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <p className="card-title">{card.title}</p>
                <p className="card-desc">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}