import aboutBg from "../assets/about1-image.jpg";

import { Link } from "react-router-dom";


export default function FounderSection() {
  return (
    <section
      style={{
        background: "#fff",
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
       
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            flexShrink: 0,
          }}
        >
          {/* IMAGE */}
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
                background: "#fff",
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
              color: "#1c1630",
              lineHeight: 1.2,
              margin: "0 0 28px",
            }}
          >
            Empowering Women to Rise,{" "}
            <span style={{ color: "#9b7db8" }}>Shine and Thrive</span>
          </h2>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#3a2e50" }}>
            Ms Ellevation is a community-driven organisation supporting CALD
            women in Australia to integrate, thrive, and achieve financial
            independence.
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#3a2e50" }}>
            Founded by Hannah Gongar, whose journey through war, migration, and
            adversity shaped her resilience, we support women through finance,
            education, and empowerment programs.
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#3a2e50" }}>
            Through micro-finance, business development, and community support,
            we help women regain confidence and build stability.
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#6b5880" }}>
            At Ms Ellevation, we believe that when women rise, communities rise.
          </p>

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