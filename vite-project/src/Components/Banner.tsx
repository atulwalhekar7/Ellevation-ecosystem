import { useState, useEffect, useRef } from "react";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const stats = [
  { top: "Curated", bottom: "EVENTS" },
  { top: "Premium", bottom: "DIRECTORY UI" },
  { top: "Shared", bottom: "BRAND SYSTEM" },
];

const tickerItems = ["MS. ELLEVATION", "MEMBERSHIP", "EVENTS", "DIRECTORIES", "IMPACT"];

const slides = [
  {
    src: img1,
    bg: "linear-gradient(135deg,#f2c4ce,#e8a5b5,#c98ea0)",
    title: "",
    sub: "Where women connect, grow & lead",
  },
  {
    src: img2,
    bg: "linear-gradient(135deg,#ddd4f0,#c8b8e8,#a898d8)",
    title: "",
    sub: "Women in Leadership · Sydney",
  },
  {
    src: img3,
    bg: "linear-gradient(135deg,#f0d4c8,#e8c0a8,#d4a080)",
    title: "",
    sub: "Personal transformation · Blue Mountains",
  },
  {
    src: img4,
    bg: "linear-gradient(135deg,#d4e8f0,#a8c8e0,#80a8c8)",
    title: "",
    sub: "Celebrating community · Melbourne",
  },
];

const CrownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 19h20M3 9l4 5 5-8 5 8 4-5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"
      stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Carousel() {
  const [cur, setCur] = useState(0);
  const timerRef = useRef<number | null>(null);

  const goTo = (n: number) => {
    const next = (n + slides.length) % slides.length;
    setCur(next);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setCur((c) => (c + 1) % slides.length), 3800);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(() => setCur((c) => (c + 1) % slides.length), 3800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", paddingTop: 24, paddingBottom: 28 }}>

      {/* Signature card — top right (Animation class added via className) */}
      <div 
        className="elv-float-card-top"
        style={{
          position: "absolute", top: 0, right: 0,
          width: 188, borderRadius: 18,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.95)",
          padding: "13px 15px", zIndex: 20,
          boxShadow: "0 8px 28px rgba(155,109,190,0.15)",
        }}
      >
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>
          Signature Ecosystem
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontWeight: 600, color: "#1a0a2e", lineHeight: 1.35, marginBottom: 10 }}>
          Women rising, communities connecting.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {["Growth", "Access", "Impact", "Belonging"].map((item) => (
            <div key={item} style={{ borderRadius: 9, background: "rgba(245,240,255,0.9)", padding: "6px 9px", fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, color: "#3d1f5c" }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main carousel box */}
      <div style={{
        borderRadius: 26, overflow: "hidden",
        aspectRatio: "4/3.2",
        background: "#f2e8f5",
        boxShadow: "0 20px 60px rgba(155,109,190,0.2)",
        position: "relative",
        width: "100%",
      }}>
        {/* Sliding track */}
        <div
          style={{
            display: "flex",
            height: "100%",
            width: `${slides.length * 100}%`,
            transform: `translateX(-${cur * (100 / slides.length)}%)`,
            transition: "transform 0.7s cubic-bezier(.45,.05,.35,.95)",
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                width: `${100 / slides.length}%`,
                height: "100%",
                position: "relative",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {slide.src && (
                <img
                  src={slide.src}
                  alt={slide.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              )}
              {/* Overlay gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(26,10,46,0.04) 0%, rgba(26,10,46,0.42) 100%)",
              }} />
              {/* Text */}
              <div style={{
                position: "absolute", bottom: 28, left: 0, right: 0,
                textAlign: "center", padding: "0 24px",
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.25)", marginBottom: 6 }}>
                  {slide.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'DM Sans',sans-serif",
                    marginLeft: 130,
                  }}
                >
                  {slide.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button onClick={() => goTo(cur - 1)} style={{
          position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)",
          width: 34, height: 34, borderRadius: "50%",
          background: "rgba(255,255,255,0.78)", border: "none", cursor: "pointer",
          fontSize: 18, color: "#1a0a2e", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, backdropFilter: "blur(6px)", boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        }}>‹</button>

        {/* Right arrow */}
        <button onClick={() => goTo(cur + 1)} style={{
          position: "absolute", top: "50%", right: 12, transform: "translateY(-50%)",
          width: 34, height: 34, borderRadius: "50%",
          background: "rgba(255,255,255,0.78)", border: "none", cursor: "pointer",
          fontSize: 18, color: "#1a0a2e", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, backdropFilter: "blur(6px)", boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        }}>›</button>

        {/* Dots */}
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: 7, height: 7, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
              background: i === cur ? "#fff" : "rgba(255,255,255,0.4)",
              transform: i === cur ? "scale(1.3)" : "scale(1)",
              transition: "background 0.3s, transform 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Dark float card — bottom left (Animation class added via className) */}
      <div 
        className="elv-float-card-bottom"
        style={{
          position: "absolute", bottom: 0, left: -24,
          width: 205, borderRadius: 20,
          background: "#1a0a2e", padding: "15px 17px",
          boxShadow: "0 12px 36px rgba(26,10,46,0.35)",
          border: "1px solid rgba(255,255,255,0.08)", zIndex: 20,
        }}
      >
        <div style={{ marginBottom: 10 }}><CrownIcon /></div>
        <p style={{ fontSize: 12, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", fontFamily: "'DM Sans',sans-serif" }}>
          Premium spaces for coaching, membership, directories, alliances, and events.
        </p>
      </div>
    </div>
  );
}

export default function EllevationHero() {
  const [visible, setVisible] = useState(false);
  const [goldHov, setGoldHov] = useState(false);
  const [darkHov, setDarkHov] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideInTop {
          from { opacity: 0; transform: translate(15px, -15px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes fadeSlideInBottom {
          from { opacity: 0; transform: translate(-15px, 15px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .elv-stat:hover {
          transform: translateY(-3px) !important;
          background: rgba(255,255,255,0.86) !important;
        }
        .elv-float-card-top {
          opacity: 0;
          animation: fadeSlideInTop 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }
        .elv-float-card-bottom {
          opacity: 0;
          animation: fadeSlideInBottom 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.9s;
        }
      `}</style>

      <section style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(150deg,#fdf6f9 0%,#f5eaf4 35%,#ede8f5 65%,#f0e8f0 100%)",
        minHeight: "100vh", display: "flex", flexDirection: "column",
        fontFamily: "'DM Sans',sans-serif",
      }}>
        {/* Background blobs */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(220,180,240,0.22) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 60, left: -100, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(240,200,215,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />

        {/* ── MAIN GRID ── */}
        <div style={{
          flex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "40px 48px 52px 48px",   // equal 48px L & R
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: 48,
          alignItems: "center",
        }}>

          {/* LEFT */}
          <div style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both" : "none",
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b6dbe", marginBottom: 18 }}>
              Ellevation Community Ecosystem
            </p>

            <h1 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(31px,4.2vw,54px)",
              fontWeight: 700, lineHeight: 1.02,
              color: "#1a0a2e", marginBottom: 22, letterSpacing: "-0.01em",
            }}>
              Rise into the room built <br />for your becoming.
            </h1>

            <p style={{ fontSize: 15, lineHeight: 1.72, color: "rgba(42,18,60,0.72)", maxWidth: 460, marginBottom: 32 }}>
              Ellevation is a luxury feminine, community-driven ecosystem uniting personal
              transformation, professional visibility, impact pathways, events, and membership.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <button
                onMouseEnter={() => setGoldHov(true)}
                onMouseLeave={() => setGoldHov(false)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 22px", borderRadius: 100,
                  background: "linear-gradient(135deg,#d4a96a,#c9906a)",
                  color: "#fff", fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(201,144,106,0.38)",
                  opacity: goldHov ? 0.88 : 1,
                  transform: goldHov ? "scale(1.02)" : "scale(1)",
                  transition: "opacity 0.15s, transform 0.15s",
                }}
              >
                Enter Ms. Ellevation →
              </button>
              <button
                onMouseEnter={() => setDarkHov(true)}
                onMouseLeave={() => setDarkHov(false)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 22px", borderRadius: 100,
                  background: "#1a0a2e",
                  color: "#fff", fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(26,10,46,0.22)",
                  opacity: darkHov ? 0.88 : 1,
                  transform: darkHov ? "scale(1.02)" : "scale(1)",
                  transition: "opacity 0.15s, transform 0.15s",
                }}
              >
                Join Membership →
              </button>
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, maxWidth: 420 }}>
              {stats.map(({ top, bottom }) => (
                <div key={top} className="elv-stat" style={{
                  borderRadius: 16, border: "1px solid rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.48)", backdropFilter: "blur(10px)",
                  padding: "13px 14px", transition: "transform 0.2s, background 0.2s", cursor: "default",
                }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 600, color: "#1a0a2e", lineHeight: 1.1, marginBottom: 3 }}>{top}</p>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E" }}>{bottom}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.22s both" : "none",
            paddingTop: 28, paddingBottom: 32, paddingRight: 28,
          }}>
            <Carousel />
          </div>
        </div>

        {/* ── TICKER ── */}
        <div style={{
          borderTop: "1px solid rgba(220,190,230,0.4)",
          background: "linear-gradient(90deg,#fdf0f5,#f8e8f5 50%,#fdf0f5)",
          padding: "12px 0", overflow: "hidden", position: "relative",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 72, background: "linear-gradient(to right,#fdf0f5,transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 72, background: "linear-gradient(to left,#fdf0f5,transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ display: "flex", animation: "ticker 22s linear infinite", width: "max-content" }}>
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 28,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#9b6dbe",
                padding: "0 36px", whiteSpace: "nowrap",
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