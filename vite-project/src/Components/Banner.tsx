import { useState, useEffect } from "react";
import bgImage from "../assets/banner-page image.png";

const CrownIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 19h20M3 9l4 5 5-8 5 8 4-5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"
      stroke="#C9A96E"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = ({ color = "#fff" }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const stats = [
  { top: "Curated", bottom: "EVENTS" },
  { top: "Static", bottom: "DIRECTORY UI" },
  { top: "Shared", bottom: "BRAND SYSTEM" },
];

const tickerItems = ["MS. ELLEVATION", "MEMBERSHIP", "EVENTS", "DIRECTORIES", "IMPACT"];

function HeroVisual() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "460px",
        aspectRatio: "4/5",
        margin: "0 auto",
        animation: "float 6s ease-in-out infinite",
      }}
    >
      {/* Card background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "36px",
          background: "linear-gradient(135deg, #fff 0%, rgba(245,224,230,0.75) 55%, rgba(240,218,195,0.35) 100%)",
          boxShadow: "0 24px 80px rgba(180,120,140,0.18), 0 4px 24px rgba(0,0,0,0.06)",
        }}
      />

      {/* Hero image */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          right: "16px",
          height: "52%",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(160,90,110,0.25)",
          background: "linear-gradient(135deg, #f2c4ce 0%, #e8a5b5 50%, #c98ea0 100%)",
        }}
      >
        <img
          src={bgImage}
          
          alt="Ellevation community"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Middle card */}
      <div
        style={{
          position: "absolute",
          left: "16px",
          right: "16px",
          top: "44%",
          borderRadius: "28px",
          border: "1px solid rgba(255,255,255,0.85)",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(16px)",
          padding: "20px 22px",
        }}
      >
        <p style={{
          fontSize: "9px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#C9A96E",
          marginBottom: "10px",
        }}>
          Signature Ecosystem
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "22px",
          fontWeight: 600,
          lineHeight: 1.25,
          color: "#1a0a1e",
          marginBottom: "14px",
        }}>
          Women rising, communities connecting, futures opening.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {["Growth", "Access", "Impact", "Belonging"].map((item) => (
            <div key={item} style={{
              borderRadius: "14px",
              background: "rgba(245,240,255,0.75)",
              padding: "10px 14px",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              color: "#3d1f5c",
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-left dark card */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "-20px",
          width: "200px",
          borderRadius: "28px",
          background: "#1a0a2e",
          padding: "18px 20px",
          boxShadow: "0 12px 40px rgba(26,10,46,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <CrownIcon />
        <p style={{
          marginTop: "12px",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.72)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Premium spaces for coaching, membership, directories, alliances, and events.
        </p>
      </div>

      {/* Bottom-right pill removed */}
    </div>
  );
}

export default function EllevationHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .hero-rise {
          animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-rise-delay {
          opacity: 0;
          animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
        }
        .hero-rise-delay2 {
          opacity: 0;
          animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }
        .hero-rise-delay3 {
          opacity: 0;
          animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.85) !important;
        }
        .btn-gold:hover { opacity: 0.88; }
        .btn-dark:hover { opacity: 0.88; }
      `}</style>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(150deg, #fdf6f9 0%, #f5eaf4 35%, #ede8f5 65%, #f0e8f0 100%)",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top fade */}
        <div style={{
          position: "absolute", inset: "0 0 auto 0", height: "120px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)",
          pointerEvents: "none",
        }} />

        {/* Decorative background blobs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,180,240,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "80px", left: "-120px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,200,215,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            padding: "20px 32px 10px",
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Left: Text */}
          <div className={visible ? "hero-rise" : ""} style={{ opacity: visible ? undefined : 0 }}>
            <p style={{
              fontSize: "15px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9b6dbe",
              marginBottom: "20px",
            }}>
              Ellevation Community Ecosystem
            </p>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "60px",
              fontWeight: 600,
              lineHeight: 0.96,
              color: "#1a0a2e",
              marginBottom: "28px",
              letterSpacing: "-0.01em",
            }}>
              Rise into the room built for<br />your becoming.
            </h1>

            <p style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "rgba(42,18,60,0.72)",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: "520px",
              marginBottom: "36px",
            }}>
              Ellevation is a luxury feminine, community-driven ecosystem uniting personal
              transformation, professional visibility, impact pathways, events, and membership.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
              <a
                href="#"
                className="btn-gold"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 24px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #d4a96a 0%, #c9906a 100%)",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(201,144,106,0.4)",
                  transition: "opacity 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                Enter Ms. Ellevation <ArrowRight />
              </a>
              <a
                href="#"
                className="btn-dark"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 24px",
                  borderRadius: "100px",
                  background: "#1a0a2e",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(26,10,46,0.25)",
                  transition: "opacity 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                Join Membership <ArrowRight />
              </a>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", maxWidth: "480px" }}>
              {stats.map(({ top, bottom }) => (
                <div
                  key={top}
                  className="stat-card"
                  style={{
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.8)",
                    background: "rgba(255,255,255,0.45)",
                    backdropFilter: "blur(12px)",
                    padding: "16px",
                    transition: "transform 0.2s, background 0.2s",
                    cursor: "default",
                  }}
                >
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#1a0a2e",
                    lineHeight: 1.1,
                    marginBottom: "4px",
                  }}>{top}</p>
                  <p style={{
                    fontSize: "9px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C9A96E",
                  }}>{bottom}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className={visible ? "hero-rise-delay2" : ""} style={{ opacity: visible ? undefined : 0 }}>
            <HeroVisual />
          </div>
        </div>

        {/* Bottom ticker bar */}
        <div style={{
          borderTop: "1px solid rgba(220,190,230,0.4)",
          background: "linear-gradient(90deg, #fdf0f5 0%, #f8e8f5 50%, #fdf0f5 100%)",
          padding: "13px 0",
          overflow: "hidden",
          position: "relative",
        }}>
          {/* Fade edges */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "80px",
            background: "linear-gradient(to right, #fdf0f5, transparent)",
            zIndex: 2, pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "80px",
            background: "linear-gradient(to left, #fdf0f5, transparent)",
            zIndex: 2, pointerEvents: "none",
          }} />
          <div style={{
            display: "flex",
            animation: "ticker 22s linear infinite",
            width: "max-content",
          }}>
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "32px",
                fontSize: "10px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#9b6dbe",
                padding: "0 40px",
                whiteSpace: "nowrap",
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}