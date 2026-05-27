import { useEffect, useRef, useState, CSSProperties } from "react";

const features = [
  {
    id: 1,
    title: "Campaign moments",
    description:
      "This section is intentionally static now and structured to support richer content later.",
  },
  {
    id: 2,
    title: "Community prompts",
    description:
      "This section is intentionally static now and structured to support richer content later.",
  },
  {
    id: 3,
    title: "Shareable member spotlights",
    description:
      "This section is intentionally static now and structured to support richer content later.",
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

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)",
        transform: checked ? "scale(1.18) rotate(-8deg)" : "scale(1) rotate(0deg)",
      }}
    >
      <circle cx="11" cy="11" r="10" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
      <path
        d="M7 11.2l2.8 2.8 5-5"
        stroke="#7c3aed"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="12"
        strokeDashoffset={checked ? "0" : "12"}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.1s" }}
      />
    </svg>
  );
}

function FeatureCard({ item, delay }: { item: (typeof features)[0]; delay: number }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  const cardStyle: CSSProperties = {
    background: "#ffffff",
    borderRadius: 18,
    padding: "32px 28px 36px",
    flex: "1 1 260px",
    maxWidth: 380,
    minWidth: 240,
    border: "1px solid rgba(124,58,237,0.08)",
    boxShadow: hovered
      ? "0 20px 52px rgba(124,58,237,0.13), 0 2px 8px rgba(124,58,237,0.07)"
      : "0 4px 20px rgba(124,58,237,0.06), 0 1px 3px rgba(0,0,0,0.03)",
    opacity: inView ? 1 : 0,
    transform: !inView
      ? "translateY(44px) scale(0.97)"
      : hovered
      ? "translateY(-7px) scale(1.015)"
      : "translateY(0) scale(1)",
    transition:
      "transform 0.45s cubic-bezier(.34,1.56,.64,1), box-shadow 0.4s ease, opacity 0.65s ease, border-color 0.3s ease, background 0.3s ease",
    transitionDelay: inView ? `${delay}ms` : "0ms",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    gap: 0,
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
      {/* Animated left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: hovered ? 3 : 0,
          borderRadius: "18px 0 0 18px",
          background: "linear-gradient(180deg, #7c3aed, #c084fc)",
          transition: "width 0.35s ease",
        }}
      />

      {/* Soft glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: hovered
            ? "linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(192,132,252,0.06) 100%)"
            : "transparent",
          transition: "background 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Check icon */}
      <div style={{ marginBottom: 20 }}>
        <CheckCircle checked={hovered} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#1a0a3c",
    fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1.3,
          marginBottom: 14,
          margin: "0 0 14px 0",
          transition: "color 0.3s ease",
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: "#9ca3af",
          margin: 0,
          fontFamily: "'Segoe UI', sans-serif",
          transition: "color 0.3s ease",
        }}
      >
        {item.description}
      </p>
    </div>
  );
}

export default function StorytellingSection() {
  const { ref: heroRef, inView: heroIn } = useInView(0.1);
  const { ref: eyebrowRef, inView: eyebrowIn } = useInView(0.1);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeWord {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseArrow {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(4px); }
        }
      `}</style>

      <section
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "'Segoe UI', sans-serif",
          background: "linear-gradient(160deg, #fce4ec 0%, #f3e8ff 35%, #ede9fe 60%, #fce7f3 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 12s ease infinite",
        }}
      >
        {/* ── HERO TEXT BLOCK ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "90px 24px 80px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <div ref={eyebrowRef}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "#7c3aed",
                textTransform: "uppercase",
                marginBottom: 24,
                opacity: eyebrowIn ? 1 : 0,
                transform: eyebrowIn ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
Social Media Pages

            </p>
          </div>

          {/* Main heading */}
          <div ref={heroRef}>
            <h1
              style={{
                fontSize: "clamp(36px, 5.5vw, 68px)",
                fontWeight: 700,
                color: "#1a0a3c",
    fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.15,
                margin: "0 0 28px 0",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s",
              }}
            >
A polished content presence for daily inspiration and community momentum.
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "#4b3a6e",
                maxWidth: 560,
                margin: "0 auto 40px",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.75s ease 0.25s, transform 0.75s ease 0.25s",
              }}
            >
             Create a connected social ecosystem across short-form teachings, member wins, campaigns, impact updates, and upcoming opportunities.
            </p>

            {/* CTA Button */}
            <div
              style={{
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.75s ease 0.4s, transform 0.75s ease 0.4s",
              }}
            >
              <button
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 30px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'Segoe UI', sans-serif",
                  color: "#fff",
                  background: btnHovered
                    ? "linear-gradient(135deg, #6d28d9, #a855f7)"
                    : "linear-gradient(135deg, #7c3aed, #c084fc)",
                  boxShadow: btnHovered
                    ? "0 8px 28px rgba(124,58,237,0.38)"
                    : "0 4px 16px rgba(124,58,237,0.25)",
                  transform: btnHovered ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
                }}
              >
Connect with Us                <span
                  style={{
                    display: "inline-block",
                    animation: btnHovered ? "pulseArrow 0.6s ease infinite" : "none",
                  }}
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ── FEATURE CARDS BLOCK ── */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(245,240,255,0.6) 0%, #f5f0ff 100%)",
            padding: "64px 24px 80px",
          }}
        >
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
            {features.map((item, i) => (
              <FeatureCard key={item.id} item={item} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}