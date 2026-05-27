import { useEffect, useRef, useState, CSSProperties } from "react";

/* ── helpers ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function fade(inView: boolean, delay = 0): CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  };
}

/* ── data ── */
const partnerCategories = [
  "Corporate Partners",
  "Nonprofit Alliances",
  "Academic Partners",
  "Government Bodies",
  "Community Organisations",
  "International Partners",
];

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section style={{
      background: "linear-gradient(150deg,#f9e4ec 0%,#f0d8ee 25%,#e2d0f0 55%,#d8ccf4 80%,#e8d8f8 100%)",
      padding: "110px 24px 96px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* eyebrow */}
        <div style={{
          ...fade(mounted, 0),
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, marginBottom: 28,
        }}>
          <div className={mounted ? "line-draw" : ""} style={{
            width: 40, height: 1,
            background: "rgba(155,125,184,0.6)",
            transformOrigin: "right center",
          }} />
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8",
          }}>Partnerships</span>
          <div className={mounted ? "line-draw" : ""} style={{
            width: 40, height: 1,
            background: "rgba(155,125,184,0.6)",
            transformOrigin: "left center",
          }} />
        </div>

        {/* heading */}
        <h1 style={{
          ...fade(mounted, 130),
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(58px,9vw,100px)",
          fontWeight: 500,
          fontStyle: "italic",
          color: "#1c1630", margin: "0 0 22px", lineHeight: 1.08,
        }}>Alliances</h1>

        {/* subtitle */}
        <p style={{
          ...fade(mounted, 260),
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(15px,2vw,18px)",
          color: "#4a3860", maxWidth: 560, margin: "0 auto", lineHeight: 1.75,
        }}>
          Strategic partnerships for greater collective impact.
        </p>

        {/* scroll hint */}
        <div style={{ ...fade(mounted, 400), marginTop: 48 }}>
          <div className="bounce-arrow">↓</div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   INTRO + CTA
══════════════════════════════════════ */
function IntroSection() {
  const { ref, inView } = useInView(0.15);
  const btn = useInView(0.15);
  const [hov, setHov] = useState(false);

  return (
    <section style={{
      background: "#fdf9fc",
      padding: "88px 24px 80px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* subtle background shimmer */}
      <div className="intro-shimmer" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
        <div ref={ref}>
          <p style={{
            ...fade(inView, 0),
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(20px,3vw,28px)",
            fontWeight: 400,
            color: "#3a2e50",
            lineHeight: 1.7,
            margin: "0 0 44px",
          }}>
            Ellevation partners with organisations, institutions, and businesses who share our commitment to{" "}
            <span style={{ color: "#9b7db8", fontStyle: "italic" }}>empowering women and communities.</span>
          </p>
        </div>

        <div ref={btn.ref}>
          <button
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
              ...fade(btn.inView, 120),
              display: "inline-block",
              padding: "16px 40px",
              borderRadius: 999,
              border: "none",
              background: hov
                ? "linear-gradient(135deg,#b882a0,#9b7db8)"
                : "linear-gradient(135deg,#c9a8d4,#9b7db8)",
              color: "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase" as const,
              cursor: "pointer",
              boxShadow: hov
                ? "0 14px 36px rgba(140,110,180,0.45)"
                : "0 6px 22px rgba(140,110,180,0.25)",
              transform: hov ? "translateY(-4px) scale(1.04)" : "translateY(0) scale(1)",
              transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)",
            }}
          >
            Become an Alliance Partner
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PARTNER CATEGORY CARD
══════════════════════════════════════ */
function PartnerCard({ label, index }: { label: string; index: number }) {
  const { ref, inView } = useInView(0.1);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 280px",
        maxWidth: 340,
        minWidth: 220,
        background: hov ? "#fff" : "#fdfaff",
        border: "1.5px solid",
        borderColor: hov ? "rgba(155,125,184,0.5)" : "rgba(180,160,210,0.22)",
        borderRadius: 20,
        padding: "36px 28px",
        textAlign: "center",
        boxShadow: hov
          ? "0 20px 52px rgba(140,110,180,0.18)"
          : "0 2px 16px rgba(140,110,180,0.06)",
        transition: "all 0.45s cubic-bezier(.34,1.56,.64,1)",
        transform: !inView
          ? "translateY(40px) scale(0.97)"
          : hov ? "translateY(-10px) scale(1.025)"
          : "translateY(0) scale(1)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 90}ms` : "0ms",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* top accent bar sweeps on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        height: 3, borderRadius: "20px 20px 0 0",
        background: "linear-gradient(90deg,#c9a8d4,#9b7db8,#d4a8c0)",
        width: hov ? "100%" : "0%",
        transition: "width 0.45s cubic-bezier(.4,0,.2,1)",
      }} />

      <p style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "clamp(20px,2.5vw,24px)",
        fontWeight: 400,
        fontStyle: "italic",
        color: hov ? "#7a5ea0" : "#3a2e50",
        margin: 0,
        transition: "color 0.3s ease, transform 0.35s ease",
        transform: hov ? "scale(1.04)" : "scale(1)",
        display: "inline-block",
      }}>{label}</p>
    </div>
  );
}

/* ══════════════════════════════════════
   PARTNER GRID
══════════════════════════════════════ */
function PartnersSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section style={{ background: "#f5eef8", padding: "72px 24px 96px" }}>
      {/* section label */}
      <div ref={ref} style={{
        ...fade(inView, 0),
        textAlign: "center", marginBottom: 48,
      }}>
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8",
        }}>Alliance Categories</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(30px,5vw,50px)",
          fontWeight: 500,
          color: "#1c1630",
          margin: "12px 0 0",
          lineHeight: 1.2,
        }}>
          Who We Partner With
        </h2>
      </div>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: 20,
        maxWidth: 1060, margin: "0 auto", justifyContent: "center",
      }}>
        {partnerCategories.map((label, i) => (
          <PartnerCard key={i} label={label} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CTA BANNER
══════════════════════════════════════ */
function CTASection() {
  const { ref, inView } = useInView(0.2);
  const [hov, setHov] = useState(false);
  const [hov2, setHov2] = useState(false);

  return (
    <section style={{
      background: "linear-gradient(150deg,#f0d8ee 0%,#e2d0f0 40%,#d4c8f8 75%,#e0d4f8 100%)",
      padding: "88px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="blob cta-blob-1" />
      <div className="blob cta-blob-2" />
      <div className="cta-shimmer" />

      <div ref={ref} style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{
          ...fade(inView, 0),
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(38px,6vw,66px)",
          fontWeight: 500,
          color: "#1c1630", margin: "0 0 20px",
        }}>Build Something Together</h2>

        <p style={{
          ...fade(inView, 80),
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(14px,1.8vw,16px)",
          color: "#4a3860",
          maxWidth: 480,
          margin: "0 auto 44px",
          lineHeight: 1.75,
        }}>
          Let's create meaningful impact through strategic alliance. Reach out and let's start the conversation.
        </p>

        <div style={{
          ...fade(inView, 160),
          display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
        }}>
          <button
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
              padding: "14px 32px", borderRadius: 999,
              border: "none",
              background: hov ? "#7a5ea0" : "#9b7db8",
              color: "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase" as const,
              cursor: "pointer",
              boxShadow: hov ? "0 10px 30px rgba(140,110,180,0.4)" : "none",
              transform: hov ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
              transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
            }}
          >Become an Alliance Partner</button>

          <button
            onMouseEnter={() => setHov2(true)}
            onMouseLeave={() => setHov2(false)}
            style={{
              padding: "14px 32px", borderRadius: 999,
              border: "1.5px solid rgba(28,22,48,0.7)",
              background: hov2 ? "rgba(28,22,48,0.07)" : "transparent",
              color: "#1c1630",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase" as const,
              cursor: "pointer",
              transform: hov2 ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
              transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
            }}
          >Learn More</button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function AlliancesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdf9fc; }

        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .blob-1 {
          top: -100px; left: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,210,230,0.52) 0%, transparent 68%);
          animation: floatA 9s ease-in-out infinite;
        }
        .blob-2 {
          bottom: -80px; right: -60px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(190,170,240,0.44) 0%, transparent 68%);
          animation: floatB 11s ease-in-out infinite 2s;
        }
        .blob-3 {
          top: 30%; left: 55%;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(210,190,255,0.28) 0%, transparent 68%);
          animation: floatA 13s ease-in-out infinite 4s;
        }
        .cta-blob-1 {
          top: -80px; right: -60px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(220,200,255,0.45) 0%, transparent 70%);
          animation: floatB 10s ease-in-out infinite;
        }
        .cta-blob-2 {
          bottom: -60px; left: -40px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(255,210,235,0.38) 0%, transparent 70%);
          animation: floatA 12s ease-in-out infinite 3s;
        }

        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(18px, -14px) scale(1.04); }
          66%       { transform: translate(-10px, 10px) scale(0.97); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-16px, 12px) scale(1.05); }
          70%       { transform: translate(12px, -8px) scale(0.96); }
        }

        .line-draw {
          animation: lineDraw 0.7s ease 0.2s both;
        }
        @keyframes lineDraw {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .bounce-arrow {
          display: inline-block;
          font-size: 20px;
          color: rgba(155,125,184,0.7);
          animation: bounceDown 2s ease-in-out infinite;
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0);   opacity: 0.7; }
          50%       { transform: translateY(8px); opacity: 1;   }
        }

        .cta-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.18) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          animation: shimmerSweep 5s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        .intro-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.12) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          animation: shimmerSweep 7s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <Hero />
      <IntroSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}