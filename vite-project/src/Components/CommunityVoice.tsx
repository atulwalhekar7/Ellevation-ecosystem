import { useEffect, useRef, useState, CSSProperties } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Ellevation gave me the community I never knew I needed. I've grown not just professionally but as a whole woman.",
    name: "Amara J.",
    role: "Business Coach",
    initials: "AJ",
  },
  {
    id: 2,
    quote:
      "The ecosystem here is unlike anything else — authentic, premium, and deeply empowering at every level.",
    name: "Priya S.",
    role: "Educator & Mentor",
    initials: "PS",
  },
  {
    id: 3,
    quote:
      "Ms. Ellevation changed the way I see my own potential. Every woman deserves this experience.",
    name: "Danielle M.",
    role: "Corporate Leader",
    initials: "DM",
  },
];

function Sparkle({ animate }: { animate: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.5s ease",
        transform: animate ? "rotate(20deg) scale(1.2)" : "rotate(0deg) scale(1)",
      }}
    >
      <path
        d="M14 2C14 2 14.8 8.5 17.5 11C20.2 13.5 26 14 26 14C26 14 20.2 14.5 17.5 17C14.8 19.5 14 26 14 26C14 26 13.2 19.5 10.5 17C7.8 14.5 2 14 2 14C2 14 7.8 13.5 10.5 11C13.2 8.5 14 2 14 2Z"
        fill="#7c3aed"
        opacity="0.85"
      />
      <path
        d="M5 5C5 5 5.4 7.2 6.5 8.2C7.6 9.2 10 9.5 10 9.5C10 9.5 7.6 9.8 6.5 10.8C5.4 11.8 5 14 5 14C5 14 4.6 11.8 3.5 10.8C2.4 9.8 0 9.5 0 9.5C0 9.5 2.4 9.2 3.5 8.2C4.6 7.2 5 5 5 5Z"
        fill="#7c3aed"
        opacity="0.5"
      />
    </svg>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function TestimonialCard({
  t,
  delay,
}: {
  t: (typeof testimonials)[0];
  delay: number;
}) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  const cardStyle: CSSProperties = {
    background: "#ffffff",
    borderRadius: 20,
    padding: "32px 28px 28px",
    flex: "1 1 280px",
    maxWidth: 380,
    minWidth: 260,
    boxShadow: hovered
      ? "0 24px 60px rgba(124,58,237,0.18), 0 2px 8px rgba(124,58,237,0.10)"
      : "0 4px 24px rgba(124,58,237,0.07), 0 1px 4px rgba(124,58,237,0.04)",
    transition:
      "transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow 0.4s ease, opacity 0.65s ease, background 0.3s ease",
    transform: !inView
      ? "translateY(48px) scale(0.97)"
      : hovered
      ? "translateY(-8px) scale(1.02)"
      : "translateY(0) scale(1)",
    opacity: inView ? 1 : 0,
    transitionDelay: inView ? `${delay}ms` : "0ms",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    position: "relative",
    overflow: "hidden",
    background: hovered
      ? "linear-gradient(160deg, #fff 60%, #f5f0ff 100%)"
      : "#ffffff",
  };

  return (
    <div
      ref={ref}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated top border line on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 3,
          borderRadius: "20px 20px 0 0",
          background: "linear-gradient(90deg, #7c3aed, #a855f7, #e879f9)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.45s cubic-bezier(.4,0,.2,1)",
        }}
      />

      {/* Sparkle icon — spins on hover */}
      <div style={{ marginBottom: 18 }}>
        <Sparkle animate={hovered} />
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.72,
          color: "#1a0a3c",
          fontFamily: "'DM Sans', serif",
          marginBottom: 28,
          flex: 1,
          transition: "color 0.3s ease",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div
        style={{
          borderTop: "1px solid #ede9f8",
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.35s ease",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#1a0a3c",
            margin: 0,
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          {t.name}
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#9ca3af",
            margin: 0,
            fontFamily: "'Segoe UI', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {t.role}
        </p>
      </div>

      {/* Subtle glow blob on hover */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function CommunityVoices() {
  const { ref: headerRef, inView: headerIn } = useInView(0.2);

  return (
    <>
      <style>{`
        @keyframes floatSparkle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
          50%       { transform: translateY(-12px) rotate(15deg); opacity: 0.28; }
        }
        @keyframes floatSparkle2 {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.12; }
          50%       { transform: translateY(-8px) rotate(-10deg); opacity: 0.22; }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          background: "#f5f0ff",
          padding: "80px 24px 96px",
          boxSizing: "border-box",
          fontFamily: "'Segoe UI', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient floating sparkles in background */}
        <div style={{ position: "absolute", top: 40, left: "8%", animation: "floatSparkle 5s ease-in-out infinite", pointerEvents: "none" }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><path d="M14 2C14 2 14.8 8.5 17.5 11C20.2 13.5 26 14 26 14C26 14 20.2 14.5 17.5 17C14.8 19.5 14 26 14 26C14 26 13.2 19.5 10.5 17C7.8 14.5 2 14 2 14C2 14 7.8 13.5 10.5 11C13.2 8.5 14 2 14 2Z" fill="#7c3aed"/></svg>
        </div>
        <div style={{ position: "absolute", top: 80, right: "10%", animation: "floatSparkle2 6.5s ease-in-out infinite 1s", pointerEvents: "none" }}>
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none"><path d="M14 2C14 2 14.8 8.5 17.5 11C20.2 13.5 26 14 26 14C26 14 20.2 14.5 17.5 17C14.8 19.5 14 26 14 26C14 26 13.2 19.5 10.5 17C7.8 14.5 2 14 2 14C2 14 7.8 13.5 10.5 11C13.2 8.5 14 2 14 2Z" fill="#a855f7"/></svg>
        </div>
        <div style={{ position: "absolute", bottom: 60, left: "15%", animation: "floatSparkle 7s ease-in-out infinite 2s", pointerEvents: "none" }}>
          <svg width="12" height="12" viewBox="0 0 28 28" fill="none"><path d="M14 2C14 2 14.8 8.5 17.5 11C20.2 13.5 26 14 26 14C26 14 20.2 14.5 17.5 17C14.8 19.5 14 26 14 26C14 26 13.2 19.5 10.5 17C7.8 14.5 2 14 2 14C2 14 7.8 13.5 10.5 11C13.2 8.5 14 2 14 2Z" fill="#7c3aed"/></svg>
        </div>
        <div style={{ position: "absolute", bottom: 40, right: "18%", animation: "floatSparkle2 5.5s ease-in-out infinite 0.5s", pointerEvents: "none" }}>
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none"><path d="M14 2C14 2 14.8 8.5 17.5 11C20.2 13.5 26 14 26 14C26 14 20.2 14.5 17.5 17C14.8 19.5 14 26 14 26C14 26 13.2 19.5 10.5 17C7.8 14.5 2 14 2 14C2 14 7.8 13.5 10.5 11C13.2 8.5 14 2 14 2Z" fill="#c084fc"/></svg>
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: 56,
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#7c3aed",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
Stories of Transformation
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 700,
              color: "#1a0a3c",
              fontFamily: "'Cormorant Garamond', serif",
              lineHeight: 1.18,
              margin: 0,
            }}
          >
            A premium space with real warmth.
          </h2>
        </div>

        {/* Cards row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            maxWidth: 1140,
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} delay={i * 150} />
          ))}
        </div>
      </section>
    </>
  );
}