import React, { useEffect, useRef, useState, type CSSProperties } from "react";

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
  {
    id: 4,
    quote:
      "Aligned partnerships, actionable wisdom, and a true safe space to scale your leadership vision sustainably.",
    name: "Khadijah R.",
    role: "Tech Founder",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 5,
    quote:
      "Finding spaces that cater beautifully to both family integration and high-tier personal growth is ultra rare.",
    name: "Elena V.",
    role: "Creative Director",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
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

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  const [hovered, setHovered] = useState(false);

  const cardStyle: CSSProperties = {
    background: hovered ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: hovered ? "1px solid rgba(124, 92, 191, 0.3)" : "1px solid rgba(124, 92, 191, 0.12)",
    borderRadius: 24,
    padding: "36px 32px",
    width: "340px",
    flexShrink: 0,
    boxShadow: hovered
      ? "0 25px 50px rgba(124, 92, 191, 0.1)"
      : "0 10px 30px rgba(124, 92, 191, 0.02)",
    transition:
      "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease, background 0.3s ease, border-color 0.3s ease",
    transform: hovered ? "translateY(-6px)" : "translateY(0)",
    display: "flex",
    flexDirection: "column",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div
      className="testimonial-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Premium accent border indicator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #662369, #d11a8e)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      <div
        style={{
          fontSize: 48,
          lineHeight: 1,
          color: "#d11a8e",
          opacity: 0.15,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          marginBottom: -5,
          marginTop: -10,
          userSelect: "none",
        }}
      >
        “
      </div>

      <p
        className="testimonial-quote"
        style={{
          fontSize: "15px",
          lineHeight: 1.65,
          color: "#403452",
          fontFamily: "'DM Sans', sans-serif",
          margin: "0 0 28px 0",
          flex: 1,
        }}
      >
        {t.quote}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderTop: "1px solid rgba(124, 92, 191, 0.12)",
          paddingTop: 20,
        }}
      >
        <img
          src={t.image}
          alt={t.name}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            border: "2px solid rgba(209, 26, 142, 0.15)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <p
            className="testimonial-name"
            style={{
              margin: 0,
              fontSize: "14.5px",
              fontWeight: 700,
              color: "#1a0a2e",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {t.name}
          </p>
          <p
            className="testimonial-role"
            style={{
              margin: 0,
              fontSize: "10.5px",
              fontWeight: 600,
              color: "#705294",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
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
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .community-section {
          background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%);
        }

        .community-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 700;
          color: #d11a8e;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        /* Infinite Slider Animation Engine */
        .slider-viewport {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
        }

        /* Creating a masking gradient overlay to softly blend left and right edges */
        .slider-viewport::before,
        .slider-viewport::after {
          content: "";
          height: 100%;
          width: 150px;
          position: absolute;
          zIndex: 4;
          top: 0;
          pointer-events: none;
        }
        .slider-viewport::before {
          left: 0;
          background: linear-gradient(90deg, #f6f3fa 0%, transparent 100%);
        }
        .slider-viewport::after {
          right: 0;
          background: linear-gradient(-90deg, #ede7f5 0%, transparent 100%);
        }

        .slider-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: loopInfinite 35s linear infinite;
        }

        /* Pause sliding translation safely when user interacts */
        .slider-track:hover {
          animation-play-state: paused;
        }

        @keyframes loopInfinite {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Safely translates precisely halfway through the duplicated array */
            transform: translateX(calc(-50% - 16px)); 
          }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .community-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }
        [data-theme="dark"] .slider-viewport::before {
          background: linear-gradient(90deg, #0d0614 0%, transparent 100%);
        }
        [data-theme="dark"] .slider-viewport::after {
          background: linear-gradient(-90deg, #160d22 0%, transparent 100%);
        }
        [data-theme="dark"] .testimonial-card {
          background: rgba(25, 16, 38, 0.6) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .testimonial-card:hover {
          background: #1f142e !important;
          border-color: rgba(155, 109, 190, 0.35) !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4) !important;
        }
        [data-theme="dark"] .testimonial-quote {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .testimonial-name {
          color: #ffffff !important;
        }
        [data-theme="dark"] .testimonial-role {
          color: #a78bfa !important;
        }
        [data-theme="dark"] .testimonial-card > div:last-child {
          border-top-color: rgba(155, 109, 190, 0.2) !important;
        }
        
        @media (max-width: 868px) {
          .community-header-title { font-size: 38px !important; }
          .slider-viewport::before, .slider-viewport::after { width: 50px; }
        }
      `}</style>

      <section
        className="community-section"
        style={{
          width: "100%",
          padding: "100px 0",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Synced Header Section */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 48px",
            padding: "0 24px",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="community-header-title">Stories of Transformation</h2>
        </div>

        {/* Carousel Viewport Wrapper */}
        <div className="slider-viewport">
          {/* Double mapped array ensures visual gapless snapping */}
          <div className="slider-track">
            {Object.freeze([...testimonials, ...testimonials]).map((t, idx) => (
              <TestimonialCard key={`${t.id}-${idx}`} t={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}