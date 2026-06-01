import { useState } from "react";

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
    description: "",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.45)",
    border: "rgba(56,189,248,0.6)",
    imageUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=700&q=80",
    bg: "linear-gradient(145deg, #0f172a, #1e293b)",
    shade:
      "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
  },
  {
    title: "Community TV",
    description: "",
    accent: "#60a5fa",
    glow: "rgba(96,165,250,0.45)",
    border: "rgba(96,165,250,0.6)",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80",
    bg: "linear-gradient(145deg, #1e3a8a, #0f172a)",
    shade:
      "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
  },
  {
    title: "Signature Events",
    description: "",
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.45)",
    border: "rgba(129,140,248,0.6)",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
    bg: "linear-gradient(145deg, #172554, #1e293b)",
    shade:
      "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
  },
  {
    title: "Professional Paths",
    description: "",
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.45)",
    border: "rgba(34,211,238,0.6)",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80",
    bg: "linear-gradient(145deg, #0369a1, #0f172a)",
    shade:
      "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 100%)",
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
        .elv-card {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          height: 220px;
          transition:
            height 0.52s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.4s ease,
            transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .elv-card:hover {
          height: 340px;
          transform: translateY(-6px);
        }

        .elv-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          z-index: 0;
        }

        .elv-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(7, 16, 43, 0.88) 0%,
            rgba(12, 24, 56, 0.55) 45%,
            rgba(15, 23, 42, 0.25) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .elv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          color: #f8fafc;
        }

        .elv-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          opacity: 0.85;
          color: #cbd5e1;
          margin: 0;
        }

        /* =========================
           LIGHT MODE ONLY ADDITION
        ========================== */

        html[data-theme="light"] .elv-title {
#ffffff
        }

        html[data-theme="light"] .elv-desc {
          color: #374151;
        }
      `}</style>

      <section
        style={{
          background: "var(--bg-color)",
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
              color: "var(--text-color)",
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
                    : `0 4px 20px rgba(0,0,0,0.4)`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img className="elv-img" src={card.imageUrl} />

              <div className="elv-dark" />

              <div style={{ position: "absolute", bottom: 0, zIndex: 3, padding: "20px 22px 24px" }}>
                <h2 className="elv-title">{card.title}</h2>
                <p className="elv-desc">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}