import { useEffect, useRef, useState, CSSProperties } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Ellevation gave me the community I never knew I needed. I've grown not just professionally but as a whole woman.",
    name: "Amara J.",
    role: "Business Coach",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    quote:
      "The ecosystem here is unlike anything else — authentic, premium, and deeply empowering at every level.",
    name: "Priya S.",
    role: "Educator & Mentor",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    quote:
      "Ms. Ellevation changed the way I see my own potential. Every woman deserves this experience.",
    name: "Danielle M.",
    role: "Corporate Leader",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

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
    background: hovered ? "#ffffff" : "#faf8f4",
    borderRadius: 16,
    padding: "36px 32px 32px",
    flex: "1 1 280px",
    maxWidth: 360,
    minWidth: 260,
    boxShadow: hovered
      ? "0 16px 48px rgba(180,140,80,0.16), 0 2px 8px rgba(0,0,0,0.05)"
      : "0 2px 16px rgba(0,0,0,0.06)",
    transition:
      "opacity 0.65s ease, transform 0.5s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, background 0.3s ease",
    transform: !inView
      ? "translateY(32px)"
      : hovered
      ? "translateY(-8px) scale(1.015)"
      : "translateY(0) scale(1)",
    opacity: inView ? 1 : 0,
    transitionDelay: inView && !hovered ? `${delay}ms` : "0ms",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    cursor: "default",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div
      ref={ref}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gold bottom border sweep on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          borderRadius: "0 0 16px 16px",
          background: "linear-gradient(90deg, rgb(var(--gold)/0.9), rgb(var(--gold)/0.3))",
          width: hovered ? "100%" : "0%",
          transition: "width 0.45s cubic-bezier(.4,0,.2,1)",
        }}
      />

      {/* Gold quotation mark */}
      <div
        style={{
          fontSize: 40,
          lineHeight: 1,
          color: "rgb(var(--gold) / 0.75)",
          fontFamily: "Georgia, serif",
          marginBottom: 16,
          textAlign: "center",
          userSelect: "none",
          transition: "transform 0.35s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        "
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.75,
          color: "#5a4070",
          fontFamily: "'DM Sans', sans-serif",
          
          textAlign: "center",
          margin: "0 0 28px 0",
          flex: 1,
        }}
      >
        {t.quote}
      </p>

      {/* Author row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderTop: "1px solid #ede8df",
          paddingTop: 20,
          transition: "transform 0.35s ease",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Avatar */}
        <img
  src={t.image}
  alt={t.name}
  style={{
    width: 48,
    height: 48,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
    border: "2px solid rgba(184, 94, 164, 0.18)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  }}
/>
        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 700,
              color: "#5a4070",
              fontFamily: "'DM Sans', Georgia, sans-serif",
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 10,
              fontWeight: 600,
              color: "#a89880",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CommunityVoices() {
  const { ref: headerRef, inView: headerIn } = useInView(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Cormorant+Garamond:wght@500;600&display=swap');
      `}</style>

      <section
        style={{
          width: "100%",
          background: "#f5f0e8",
          padding: "80px 24px 96px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: 48,
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: " rgb(124, 92, 191)",
              textTransform: "uppercase",
              marginBottom: 14,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Stories of Transformation
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4.5vw, 50px)",
              fontWeight: 600,
              color: "rgb(26, 10, 46)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            A premium space with real warmth.
          </h2>
        </div>

        {/* Cards */}
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