import { useState, useEffect, useRef } from "react";

import img1 from "../assets/banner7.avif";
import img2 from "../assets/banner1.avif";
import img3 from "../assets/banner3.avif";
import img4 from "../assets/banner4.avif";

const slides = [
  { src: img1 },
  { src: img2 },
  { src: img3 },
  { src: img4 },
];

export default function EllevationHero() {
  const [cur, setCur] = useState(0);
  const timerRef = useRef<number | null>(null);

  const goTo = (n: number) => {
    const next = (n + slides.length) % slides.length;
    setCur(next);
    if (timerRef.current !== null) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setCur((c) => (c + 1) % slides.length), 3800);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(() => setCur((c) => (c + 1) % slides.length), 3800);
    return () => { if (timerRef.current !== null) clearInterval(timerRef.current); };
  }, []);

  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "82vh",
      overflow: "hidden",
    }}>
      {/* Sliding images */}
      <div style={{
        display: "flex",
        height: "100%",
        width: `${slides.length * 100}%`,
        transform: `translateX(-${cur * (100 / slides.length)}%)`,
        transition: "transform 0.9s cubic-bezier(.45,.05,.35,.95)",
      }}>
        {slides.map((slide, i) => (
          <div key={i} style={{
            width: `${100 / slides.length}%`,
            height: "100%",
            flexShrink: 0,
            overflow: "hidden",
          }}>
            <img
              src={slide.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Subtle dark overlay for depth */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(26,10,46,0.08) 0%, rgba(26,10,46,0.28) 100%)",
        pointerEvents: "none",
      }} />

      {/* Prev button */}
      <button onClick={() => goTo(cur - 1)} style={{
        position: "absolute", top: "50%", left: 20, transform: "translateY(-50%)",
        width: 42, height: 42, borderRadius: "50%",
        background: "rgba(255,255,255,0.72)", border: "none", cursor: "pointer",
        fontSize: 22, color: "#1a0a2e",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10, backdropFilter: "blur(8px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        transition: "background 0.2s, transform 0.2s",
      }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.95)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.72)")}
      >‹</button>

      {/* Next button */}
      <button onClick={() => goTo(cur + 1)} style={{
        position: "absolute", top: "50%", right: 20, transform: "translateY(-50%)",
        width: 42, height: 42, borderRadius: "50%",
        background: "rgba(255,255,255,0.72)", border: "none", cursor: "pointer",
        fontSize: 22, color: "#1a0a2e",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10, backdropFilter: "blur(8px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        transition: "background 0.2s",
      }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.95)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.72)")}
      >›</button>

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 10,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === cur ? 22 : 8,
            height: 8, borderRadius: 999,
            border: "none", cursor: "pointer", padding: 0,
            background: i === cur ? "#fff" : "rgba(255,255,255,0.45)",
            transition: "width 0.35s cubic-bezier(.45,.05,.35,.95), background 0.3s",
          }} />
        ))}
      </div>
    </section>
  );
}