import  { useState } from "react";

interface Card {
  title: string;
  description: string;
  accent: string;
  glow: string;
  border: string;
  imageUrl: string;
  bg: string;
  shade: string;
}

const cards: Card[] = [
  {
    title: "Weekly Room",
    description: "A devotional-style rhythm for reflection, courage, and leadership.",
    accent: "#38bdf8", // Sky blue accent
    glow: "rgba(56,189,248,0.45)",
    border: "rgba(56,189,248,0.6)",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=700&q=80",
    bg: "linear-gradient(145deg, #0f172a, #1e293b)", // Dark Blue Shade
    shade: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
  },
  {
    title: "Community TV",
    description: "Video-led stories, teachings, member highlights, and cultural conversations.",
    accent: "#60a5fa", // Royal blue accent
    glow: "rgba(96,165,250,0.45)",
    border: "rgba(96,165,250,0.6)",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80",
    bg: "linear-gradient(145deg, #1e3a8a, #0f172a)", // Deep Royal Blue Shade
    shade: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
  },
  {
    title: "Signature Events",
    description: "Conference-style rooms, salons, dinners, retreats, and digital gatherings.",
    accent: "#818cf8", // Indigo-blue accent
    glow: "rgba(129,140,248,0.45)",
    border: "rgba(129,140,248,0.6)",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
    bg: "linear-gradient(145deg, #172554, #1e293b)", // Navy Dark Blue Shade
    shade: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
  },
  {
    title: "Professional Paths",
    description: "Directory visibility, alliances, referrals, and membership access.",
    accent: "#22d3ee", // Cyan blue accent
    glow: "rgba(34,211,238,0.45)",
    border: "rgba(34,211,238,0.6)",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80",
    bg: "linear-gradient(145deg, #0369a1, #0f172a)", // Steel Blue Shade
    shade: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
  },
];

export default function EllevationCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        /* ── Card — Height structured to accommodate description initially ── */
        .elv-card {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          height: 220px; /* Base height increased so description looks clean */
          transition:
            height 0.52s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.4s ease,
            transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .elv-card:hover {
          height: 340px;
          transform: translateY(-6px);
        }

        /* ── Background image ── */
        .elv-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0;
          transform: scale(1.08);
          transition:
            opacity 0.5s ease 0.18s,
            transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s;
          z-index: 0;
        }
        .elv-card:hover .elv-img {
          opacity: 1;
          transform: scale(1);
        }

       
        .elv-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(7, 16, 43, 0.96) 0%,
            rgba(12, 24, 56, 0.7) 45%,
            rgba(15, 23, 42, 0.2) 100%
          );
          opacity: 0;
          transition: opacity 0.45s ease 0.15s;
          z-index: 1;
          pointer-events: none;
          border-radius: 20px;
        }
        .elv-card:hover .elv-dark {
          opacity: 1;
        }

        .elv-shade {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .elv-card:hover .elv-shade {
          opacity: 0;
        }

    
        .elv-arrow {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 4;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.22s, border-color 0.22s, transform 0.25s ease;
        }
        .elv-card:hover .elv-arrow {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.2);
          transform: translate(2px,-2px);
        }

       
        .elv-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 20px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .elv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -0.01em;
          margin: 0;
          color: #f8fafc; /* light color for dark background */
          transition: color 0.35s ease, margin-bottom 0.35s ease;
          margin-bottom: 8px; /* Fixed spacing since it is always visible */
        }

      
        .elv-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.65;
          margin: 0;
          opacity: 0.85; /* Clearly visible initially */
          color: #cbd5e1; /* Smooth slate-blue/grey color */
          transition: color 0.35s ease, opacity 0.35s ease;
        }
        .elv-card:hover .elv-desc {
          opacity: 1;
          color: #e2e8f0;
        }

       
        .elv-line {
          height: 2px;
          border-radius: 2px;
          margin-top: 0;
          width: 0;
          transition:
            width 0.42s cubic-bezier(0.22,1,0.36,1) 0.3s,
            margin-top 0.3s ease 0.25s;
        }
        .elv-card:hover .elv-line {
          width: 100%;
          margin-top: 14px;
        }

        @media (max-width: 860px) {
          .elv-grid { grid-template-columns: repeat(2,1fr) !important; }
          .elv-card { height: 200px; }
          .elv-card:hover { height: 320px; }
        }
        @media (max-width: 500px) {
          .elv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
       style={{
  background: "rgb(240, 235, 248)",
  padding: "52px 40px 80px",
  fontFamily: "'DM Sans', sans-serif",
}}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
          style={{
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "clamp(34px,4vw,52px)",
  fontWeight: 700,
  color: "rgb(26, 10, 46)",
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  margin: 0,
}}
          >
            Everything you need to rise.
          </h2>
        </div>

        <div
          className="elv-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            alignItems: "start",
            gap: "16px",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="elv-card"
              style={{
                background: card.bg,
                boxShadow:
                  hovered === i
                    ? `0 24px 60px ${card.glow}, 0 0 0 1.5px ${card.border}`
                    : `0 4px 20px rgba(0, 0, 0, 0.4)`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img className="elv-img" src={card.imageUrl} alt={card.title} loading="lazy" />

              <div className="elv-dark" />

              <div className="elv-shade" style={{ background: card.shade }} />

              <div className="elv-arrow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7v10"
                    stroke={card.accent}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="elv-body">
                <h2 className="elv-title">{card.title}</h2>
                <p className="elv-desc">{card.description}</p>
                <div className="elv-line" style={{ background: card.accent }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}