import aboutBg from "../assets/about1-image.jpg";
import { Link } from "react-router-dom";

export default function FounderSection() {
  return (
    <section
      style={{
        background: "var(--bg-color)",
        padding: "80px 24px",
        borderBottom: "1px solid rgba(180,160,210,0.15)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "56px 72px",
          justifyContent: "center",
        }}
      >
        {/* IMAGE BLOCK */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 320,
              height: 320,
              borderRadius: "50%",
              padding: 6,
              background: "linear-gradient(135deg, #d63384, #9b7db8)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "var(--card-bg, #fff)",
              }}
            >
              <img
                src={aboutBg}
                alt="Ms Hannah Gongar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#c0609a",
                margin: "0 0 4px",
              }}
            >
              Ms Hannah Gongar
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#6b5880",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Founder
            </p>
          </div>
        </div>

        {/* TEXT BLOCK */}
        <div style={{ flex: "1 1 380px", maxWidth: 620 }}>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c0609a",
              margin: "0 0 14px",
            }}
          >
            MS ELLEVATION
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px,4.5vw,46px)",
              fontWeight: 500,
              color: "var(--text-color)",
              lineHeight: 1.2,
              margin: "0 0 28px",
            }}
          >
           Building Confidence, Wellbeing, and{" "}
            <span style={{ color: "#9b7db8" }}>Accessible Opportunities</span>
          </h2>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-color)" }}>
           Ellevation is a community-led ecosystem dedicated to nurturing wellbeing, leadership, and accessible pathways into opportunity across every stage of life.
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-color)" }}>
            We exist to support culturally and linguistically diverse (CALD) communities to grow, lead, and thrive without losing their unique identities, rich cultures, or lived experiences.
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-color)" }}>
          By connecting community safety networks, personal growth frameworks, and strategic economic channels, we transform distinct milestones into a single, integrated lifecycle matrix.
          </p>

          {/* ── Integrated Ecosystem Lifecycle Pipeline ── */}
  <div 
    style={{
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  background: "rgba(155, 125, 184, 0.06)",
  padding: "14px 20px",
  borderRadius: "12px",
  border: "1px solid rgba(155, 125, 184, 0.15)",
  margin: "24px 0"
}}
  >
    {["Children", "Youth", "Women", "Men", "Community", "Economy"].map((stage, idx, arr) => (
      <div key={stage} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span 
          style={{ 
            fontFamily: "'DM Sans', sans-serif", 
            fontSize: "14px", 
            fontWeight: idx === 5 ? 600 : 500, 
            color: idx === 5 ? "#c0609a" : "#1c1630" 
          }}
        >
          {stage}
        </span>
        {idx < arr.length - 1 && (
          <span style={{ color: "rgba(155, 125, 184, 0.6)", fontSize: "12px", fontWeight: 700 }}>→</span>
        )}
      </div>
    ))}
  </div>
          <Link
            to="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 26,
              padding: "12px 20px",
              borderRadius: "999px",
              border: "1px solid #9b7db8",
              color: "#7c5cbf",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 13,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(155,125,184,0.1)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Explore More About Us →
          </Link>
        </div>
      </div>
    </section>
  );
}