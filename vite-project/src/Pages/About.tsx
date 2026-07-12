import { useEffect, useRef, useState, type CSSProperties } from "react";
import aboutBg from "../assets/about1-image.jpg";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

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
    transform: inView ? "translateY(30px)" : "translateY(0)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
}

/* ── data ── */
const vmv = [
  {
    title: "Vision",
    body: "To build accessible, culturally grounded pathways that support CALD communities to grow in confidence, develop leadership, and access real opportunities for long-term economic participation.",
  },
  {
    title: "Mission",
    body: "A future where individuals and communities thrive with confidence, identity, and opportunity — without leaving culture or lived experience behind.",
  },
  {
    title: "Values",
    body: "Authenticity. Excellence. Compassion. Community. Courage. These are not just words — they are the foundation of everything we do.",
  },
];

/* ── Core Model data ── */
const coreModel = [
  {
    label: "Ms. Ellevation",
    title: "Builds the Woman",
    body: "Her Voice, Identity, Confidence, Healing, and Leadership.",
    tags: ["Voice", "Identity", "Confidence", "Healing", "Leadership"],
    accent: "#d11a8e",
    bg: "rgba(255, 255, 255, 0.75)",
  },
  {
    label: "Ellevation Hub",
    title: "Builds the Ecosystem",
    body: "Pathways, systems, impact, and opportunities around her and the wider community.",
    tags: ["Pathways", "Systems", "Impact", "Opportunity", "Community"],
    accent: "#d11a8e",
    bg: "rgba(255, 255, 255, 0.75)",
  },
];

/* ── Who We Serve data ── */
const whoWeServe = [
  {
    title: "CALD Communities",
    body: "Culturally and linguistically diverse communities building belonging, identity, and connection.",
    icon: "✿",
  },
  {
    title: "Migrants & International Students",
    body: "New arrivals navigating settlement, study, and pathways into everyday Australian life.",
    icon: "◈",
  },
  {
    title: "Women & Young Women (17–25)",
    body: "Rising leaders building confidence, voice, and access to opportunity.",
    icon: "✦",
  },
  {
    title: "Men & Families",
    body: "Allyship, development, and support pathways for men and the families around them.",
    icon: "◎",
  },
  
];

const team = [
  { name: "Victoria Rhodes", role: "Founder & CEO",        initials: "VR", grad: "linear-gradient(135deg,#662369 0%,#5a3fa0 100%)" },
  { name: "Aisha Okafor",    role: "Director of Programs", initials: "AO", grad: "linear-gradient(135deg,#d11a8e 0%,#662369 100%)" },
  { name: "Carmen Santos",   role: "Head of Community",    initials: "CS", grad: "linear-gradient(135deg,#5a3fa0 0%,#4c2882 100%)" },
];

const slides = [
  { src: img1, title: "", sub: "Where women connect, grow & lead" },
  { src: img2, title: "", sub: "Women in Leadership · Sydney" },
  { src: img3, title: "", sub: "Personal transformation · Blue Mountains" },
  { src: img4, title: "", sub: "Celebrating community · Melbourne" },
];

const CrownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 19h20M3 9l4 5 5-8 5 8 4-5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"
      stroke="#d11a8e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Carousel() {
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
    <div style={{ position: "relative", width: "100%", paddingTop: 24, paddingBottom: 28 }}>
      {/* Top float card */}
      <div
        className="elv-float-card-top"
        style={{
          position: "absolute", top: 0, right: 0,
          width: 188, borderRadius: 18,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(124, 92, 191, 0.15)",
          padding: "13px 15px", zIndex: 20,
          boxShadow: "0 10px 30px rgba(124, 92, 191, 0.04)",
        }}
      >
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d11a8e", marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>
          Signature Ecosystem
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontWeight: 600, color: "#1a0a2e", lineHeight: 1.35, marginBottom: 10 }}>
          Women rising, communities connecting.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {["Growth", "Access", "Impact", "Belonging"].map((item) => (
            <div key={item} style={{ borderRadius: 9, background: "rgba(245,240,255,0.9)", padding: "6px 9px", fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, color: "#5a3fa0" }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main carousel */}
      <div style={{
        borderRadius: 26, overflow: "hidden",
        aspectRatio: "4/3.2",
        background: "#ede7f5",
        boxShadow: "0 20px 60px rgba(124,92,191,0.12)",
        position: "relative",
        width: "100%",
      }}>
        <div
          style={{
            display: "flex",
            height: "100%",
            width: `${slides.length * 100}%`,
            transform: `translateX(-${cur * (100 / slides.length)}%)`,
            transition: "transform 0.7s cubic-bezier(.25,1,.5,1)",
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} style={{ width: `${100 / slides.length}%`, height: "100%", position: "relative", flexShrink: 0, overflow: "hidden" }}>
              {slide.src && (
                <img src={slide.src} alt={slide.sub} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,10,46,0.04) 0%, rgba(26,10,46,0.42) 100%)" }} />
              <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", padding: "0 24px" }}>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.95)", fontFamily: "'DM Sans',sans-serif" }}>{slide.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => goTo(cur - 1)} style={{ position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.78)", border: "none", cursor: "pointer", fontSize: 18, color: "#1a0a2e", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, backdropFilter: "blur(6px)", boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>‹</button>
        <button onClick={() => goTo(cur + 1)} style={{ position: "absolute", top: "50%", right: 12, transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.78)", border: "none", cursor: "pointer", fontSize: 18, color: "#1a0a2e", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, backdropFilter: "blur(6px)", boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>›</button>

        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: 7, height: 4, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0, background: i === cur ? "#fff" : "rgba(255,255,255,0.4)", transform: i === cur ? "scale(1.3)" : "scale(1)", transition: "background 0.3s, transform 0.3s" }} />
          ))}
        </div>
      </div>

      {/* Bottom float card */}
      <div
        className="elv-float-card-bottom"
        style={{
          position: "absolute", bottom: 0, left: -12,
          width: 175, borderRadius: 16,
          background: "#1a0a2e", padding: "12px 16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.06)",
          zIndex: 20,
        }}
      >
        <div style={{ marginBottom: 6 }}><CrownIcon /></div>
        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", margin: 0 }}>
          Premium spaces for coaching, memberships, alliances, and events.
        </p>
      </div>
    </div>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);
  const [pinkHov, setPinkHov] = useState(false);
  const [darkHov, setDarkHov] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section 
      className="about-hero"
      style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)",
        minHeight: "100vh", display: "flex", flexDirection: "column",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: -60, right: -60, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,92,191,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 60, left: -100, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(209,26,142,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{
        flex: 1,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "80px 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: 48,
        alignItems: "center",
      }}>
        <div style={{ opacity: visible ? 1 : 0 }}>
          <h1 className={visible ? "elv-animate-2" : ""} style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(36px,4.5vw,56px)",
            fontWeight: 700, lineHeight: 1.15,
            color: "#1a0a2e", marginBottom: 22, letterSpacing: "-0.01em",
          }}>
            Born from a belief <br />every woman deserves <br /><span style={{color: "#d11a8e"}}>a space to rise.</span>
          </h1>

          <p className={visible ? "elv-animate-3" : ""} style={{ fontSize: 15.5, lineHeight: 1.7, color: "#554866", maxWidth: 480, marginBottom: 36 }}>
            Ellevation is a luxury feminine, community-driven ecosystem uniting personal
            transformation, professional visibility, impact pathways, events, and membership.
          </p>

          <div className={visible ? "elv-animate-4" : ""} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="/ms-ellevation"
              onMouseEnter={() => setPinkHov(true)}
              onMouseLeave={() => setPinkHov(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #e028a0 0%, #d11a8e 100%)",
                color: "#fff",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(209, 26, 142, 0.25)",
                transform: pinkHov ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              Enter Ms. Ellevation →
            </a>

            <a
              href="/hub"
              onMouseEnter={() => setDarkHov(true)}
              onMouseLeave={() => setDarkHov(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #e028a0 0%, #d11a8e 100%)",
                color: "#fff",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(90, 63, 160, 0.2)",
                transform: darkHov ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              Enter Ellevation Hub →
            </a>
          </div>
        </div>

        <div className={visible ? "elv-carousel-entry" : ""} style={{ opacity: visible ? 1 : 0 }}>
          <Carousel />
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  const left  = useInView(0.15);
  const right = useInView(0.15);

  return (
    <section 
      className="about-founder"
      style={{
        background: "#fff",
        padding: "100px 24px",
        borderBottom: "1px solid #f2ecf9",
      }}
    >
      <div style={{
        maxWidth: 1140, margin: "0 auto",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", gap: "56px 80px", justifyContent: "center",
      }}>
        {/* LEFT: photo */}
        <div ref={left.ref} style={{
          ...fade(left.inView, 0),
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20, flexShrink: 0,
        }}>
          <div style={{ position: "relative", width: 300, height: 320 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 28, overflow: "hidden", border: "1px solid rgba(124, 92, 191, 0.15)" }}>
              <img
                src={aboutBg}
                alt="Ms Hannah Gongar"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector(".initials-fallback")) {
                    const fallback = document.createElement("div");
                    fallback.className = "initials-fallback";
                    fallback.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f6f3fa 0%,#ede7f5 100%);font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:600;color:#662369;";
                    fallback.textContent = "HG";
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16.5, fontWeight: 700, color: "#1a0a2e", margin: "0 0 4px" }}>Ms Hannah Gongar</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#662369", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>Founder</p>
          </div>
        </div>

        {/* RIGHT: text */}
        <div ref={right.ref} style={{ flex: "1 1 380px", maxWidth: 640 }}>
          <p style={{ ...fade(right.inView, 60), fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>
            Ecosystem Pathway
          </p>
          <h2 style={{ ...fade(right.inView, 130), fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4.5vw,46px)", fontWeight: 700, color: "#1a0a2e", lineHeight: 1.2, margin: "0 0 24px" }}>
            Building Confidence, Wellbeing, and{" "}
            <span style={{ color: "#d11a8e" }}>Accessible Opportunities</span>
          </h2>
          
          {[
            { delay: 200, text: "Ellevation is a community-led ecosystem dedicated to nurturing wellbeing, leadership, and accessible pathways into opportunity across every stage of life." },
            { delay: 280, text: "We exist to support culturally and linguistically diverse (CALD) communities to grow, lead, and thrive without losing their unique identities, rich cultures, or lived experiences." },
            { delay: 360, text: "By connecting community safety networks, personal growth frameworks, and strategic economic channels, we transform distinct milestones into a single, integrated lifecycle matrix." },
          ].map((p, i) => (
            <p key={i} style={{ ...fade(right.inView, p.delay), fontFamily: "'DM Sans', sans-serif", fontSize: "15.5px", color: "#554866", lineHeight: 1.65, margin: "0 0 18px" }}>
              {p.text}
            </p>
          ))}

          {/* Pipeline matrix tier */}
          <div 
            style={{ 
              ...fade(right.inView, 420), 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              flexWrap: "wrap",
              background: "rgba(124, 92, 191, 0.04)",
              padding: "14px 20px",
              borderRadius: "14px",
              border: "1px solid rgba(124, 92, 191, 0.12)",
              margin: "28px 0",
              color: "#d11a8e",
            }}
          >
            {["Children", "Youth", "Women", "Men", "Community", "Economy"].map((stage, idx, arr) => (
              <div key={stage} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", fontWeight: 600, color: idx === 5 ? "#d11a8e" : "#1a0a2e" }}>
                  {stage}
                </span>
                {idx < arr.length - 1 && (
                  <span style={{ color: "rgba(124, 92, 191, 0.4)", fontSize: "12px", fontWeight: 700 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  const h  = useInView(0.15);
  const p1 = useInView(0.15);
  const p2 = useInView(0.15);
  const p3 = useInView(0.15);

  return (
    <section 
      className="about-vision"
      style={{ 
        background: "linear-gradient(180deg, #ffffff 0%, #f6f3fa 100%)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Section Header */}
        <div ref={h.ref} style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#662369",
            display: "block",
            marginBottom: "12px"
          }}>
            Our Purpose
          </span>
          <h2 style={{ 
            ...fade(h.inView, 0), 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: "clamp(36px, 4.5vw, 52px)", 
            fontWeight: 700, 
            lineHeight: 1.2, 
            color: "#1a0a2e",
            maxWidth: "850px",
            margin: "0 auto"
          }}>
            A Vision for Every Woman,{" "}
            <span style={{ color: "#d11a8e", fontStyle: "italic" }}>
              A Platform for the Collective
            </span>
          </h2>
        </div>

        {/* Narrative Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
        }}>
          {[
            { 
              r: p1, 
              d: 0,   
              num: "01",
              t: "Ellevation was founded on a simple but profound truth: women thrive when they are seen, supported, and connected to a community that believes in their power." 
            },
            { 
              r: p2, 
              d: 110, 
              num: "02",
              t: "From the boardroom to the community hall, from personal healing to professional mastery — Ellevation exists to serve every dimension of a woman's life and ambition." 
            },
            { 
              r: p3, 
              d: 220, 
              num: "03",
              t: "Through Ms. Ellevation and Ellevation Hub — we create a living ecosystem where transformation is not a destination, but a way of being." 
            },
          ].map((item, i) => (
            <div 
              ref={item.r.ref} 
              key={i} 
              style={{ 
                ...fade(item.r.inView, item.d),
                borderTop: "1px solid rgba(124, 92, 191, 0.2)",
                paddingTop: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "24px",
                fontStyle: "italic",
                color: "#d11a8e",
                fontWeight: 700
              }}>
                {item.num}
              </span>
              <p style={{ 
                fontFamily: "'DM Sans', sans-serif", 
                fontSize: "15.5px", 
                color: "#554866", 
                lineHeight: 1.65, 
                margin: 0,
                fontWeight: 400
              }}>
                {item.t}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CORE MODEL SECTION ── */
function CoreModelCard({ item, index }: { item: typeof coreModel[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 340px", maxWidth: 440, minWidth: 280,
        background: item.bg,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: hov ? `${item.accent}60` : "rgba(124, 92, 191, 0.15)",
        borderRadius: 28, padding: "40px 36px",
        boxShadow: hov ? "0 30px 60px rgba(124, 92, 191, 0.12)" : "0 10px 30px rgba(124, 92, 191, 0.02)",
        transition: "transform 0.4s cubic-bezier(.25,1,.5,1), box-shadow 0.4s ease, border-color 0.3s ease",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: hov ? item.accent : "transparent", transition: "background 0.3s" }} />
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600,
        letterSpacing: "0.08em", textTransform: "uppercase", color: item.accent,
        margin: "0 0 10px",
      }}>
        {item.label}
      </p>
      <h3 style={{
        fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700,
        color: "#1a0a2e", margin: "0 0 14px", lineHeight: 1.2,
      }}>
        {item.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 15, lineHeight: 1.65,
        color: "#554866", margin: "0 0 24px",
      }}>
        {item.body}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {item.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 600,
            color: item.accent, background: "#ffffff",
            border: `1px solid rgba(124, 92, 191, 0.15)`,
            borderRadius: 999, padding: "6px 14px",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CoreModelSection() {
  const head = useInView(0.1);
  const arrow = useInView(0.1);

  return (
    <section
      className="about-core-model"
      style={{ background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding: "100px 24px" }}
    >
      <div
        ref={head.ref}
        style={{
          ...fade(head.inView, 0),
          textAlign: "center",
          marginBottom: "56px",
        }}
      >
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>
          Core Model
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#d11a8e", margin: 0 }}>
          One mission. Two pathways.
        </h2>
      </div>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 1040, margin: "0 auto",
        justifyContent: "center", alignItems: "stretch",
      }}>
        <CoreModelCard item={coreModel[0]} index={0} />

        <div
          ref={arrow.ref}
          style={{
            ...fade(arrow.inView, 260),
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(124, 92, 191, 0.1)", color: "#662369",
            fontSize: 18, fontWeight: 700, flexShrink: 0, alignSelf: "center",
          }}
        >
          →
        </div>

        <CoreModelCard item={coreModel[1]} index={1} />
      </div>
    </section>
  );
}

/* ── WHO WE SERVE SECTION ── */
function WhoWeServeCard({ item, index }: { item: typeof whoWeServe[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 240px", maxWidth: 260, minWidth: 220,
        background: hov ? "#fff" : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: hov ? "rgba(209, 26, 142, 0.3)" : "rgba(124, 92, 191, 0.15)",
        borderRadius: 24, padding: "32px 24px", textAlign: "left",
        boxShadow: hov ? "0 22px 54px rgba(124, 92, 191, 0.1)" : "0 10px 30px rgba(124, 92, 191, 0.02)",
        transition: "transform 0.4s cubic-bezier(.25,1,.5,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: "rgba(209, 26, 142, 0.08)", color: "#d11a8e",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 20,
        transition: "transform 0.35s ease",
        transform: hov ? "scale(1.05)" : "scale(1)",
      }}>
        {item.icon}
      </div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700,
        color: "#1a0a2e", margin: "0 0 10px", lineHeight: 1.2,
      }}>
        {item.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.6,
        color: "#554866", margin: 0,
      }}>
        {item.body}
      </p>
    </div>
  );
}

function WhoWeServeSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      className="about-who-we-serve"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6f3fa 100%)", padding: "100px 24px" }}
    >
      <div ref={ref} style={{ ...fade(inView, 0), textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>
          Who We Serve
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#d11a8e", margin: 0 }}>
          A Community That Spans Every Generation
        </h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 1140, margin: "0 auto", justifyContent: "center" }}>
        {whoWeServe.map((item, i) => <WhoWeServeCard key={item.title} item={item} index={i} />)}
      </div>
    </section>
  );
}

/* ── CTA SECTION ── */


function CTABtn({ label, primary }: { label: string; primary: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "14px 28px",
        borderRadius: 14,
        // Configured borders to look beautiful on dark background spaces
        border: primary ? "none" : "1.5px solid rgba(255, 255, 255, 0.3)",
        background: primary 
          ? (hov ? "#b51279" : "#d11a8e") 
          : (hov ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.05)"),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "#ffffff",
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.05em",
        cursor: "pointer",
        boxShadow: primary && hov ? "0 6px 20px rgba(209, 26, 142, 0.45)" : "none",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
}

function CTASection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section 
      className="about-cta"
      style={{ 
        // Deepened to a premium dark background setup
        background: "linear-gradient(180deg, #2a163a 0%, #160d22 100%)", 
        padding: "100px 24px", 
        textAlign: "center", 
        position: "relative", 
        overflow: "hidden" 
      }}
    >
      <div className="blob cta-blob-1" />
      <div className="blob cta-blob-2" />
      <div className="cta-shimmer" />
      <div ref={ref} style={{ position: "relative", zIndex: 1 }}>
        <h2 
          style={{ 
            ...fade(inView, 0), 
            fontFamily: "'Cormorant Garamond',serif", 
            fontSize: "clamp(38px,6vw,60px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            margin: "0 0 40px" 
          }}
        >
          Join Our <span style={{ color: "#d11a8e" }}>Ecosystem</span>
        </h2>
        <div style={{ ...fade(inView, 160), display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <a href="/ms-ellevation" style={{ textDecoration: "none" }}>
            <CTABtn label="Enter Ms. Ellevation" primary />
          </a>
          <a href="/hub" style={{ textDecoration: "none" }}>
            <CTABtn label="Join Ellevation Hub" primary={false} />
          </a>
        </div>
      </div>
    </section>
  );
}
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdf9fc; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideInTop {
          from { opacity: 0; transform: translate(25px, -25px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes fadeSlideInBottom {
          from { opacity: 0; transform: translate(-25px, 25px); }
          to   { opacity: 1; transform: translate(0, 0); }
        }

        .elv-animate-2 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.25s; }
        .elv-animate-3 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.4s; }
        .elv-animate-4 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.55s; }

        .elv-carousel-entry {
          animation: fadeUp 1.2s cubic-bezier(0.25,1,0.5,1) both;
          animation-delay: 0.35s;
        }
        .elv-float-card-top {
          opacity: 0;
          animation: fadeSlideInTop 1.2s cubic-bezier(0.25,1,0.5,1) forwards;
          animation-delay: 0.9s;
        }
        .elv-float-card-bottom {
          opacity: 0;
          animation: fadeSlideInBottom 1.2s cubic-bezier(0.25,1,0.5,1) forwards;
          animation-delay: 1.1s;
        }

        .blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .cta-blob-1 { top: -80px; right: -60px; width: 380px; height: 380px; background: radial-gradient(circle,rgba(209,26,142,0.1) 0%,transparent 70%); animation: floatB 10s ease-in-out infinite; }
        .cta-blob-2 { bottom: -60px; left: -40px; width: 320px; height: 320px; background: radial-gradient(circle,rgba(124,92,191,0.08) 0%,transparent 70%); animation: floatA 12s ease-in-out infinite 3s; }

        @keyframes floatA {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(18px,-14px) scale(1.04); }
          66%       { transform: translate(-10px,10px) scale(0.97); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0,0) scale(1); }
          40%       { transform: translate(-16px,12px) scale(1.05); }
          70%       { transform: translate(12px,-8px) scale(0.96); }
        }

        .cta-shimmer { position: absolute; inset: 0; background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%); background-size: 200% 100%; animation: shimmerSweep 5s linear infinite; pointer-events: none; z-index: 0; }
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @media (max-width: 640px) {
          .about-core-model > div:last-child { flex-direction: column; }
          .about-core-model > div:last-child > div:nth-child(2) { transform: rotate(90deg); }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] body { background: #0d0614 !important; }
        [data-theme="dark"] .about-hero { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important; }
        [data-theme="dark"] .about-hero h1,
        [data-theme="dark"] .about-founder h2,
        [data-theme="dark"] .about-vision h2,
        [data-theme="dark"] .about-core-model h2,
        [data-theme="dark"] .about-who-we-serve h2,
        [data-theme="dark"] .about-cta h2 { color: #ffffff !important; }
        
        [data-theme="dark"] .about-hero p,
        [data-theme="dark"] .about-founder p,
        [data-theme="dark"] .about-vision p,
        [data-theme="dark"] .about-core-model p,
        [data-theme="dark"] .about-who-we-serve p { color: #cbd5e1 !important; }

        [data-theme="dark"] .about-founder { background: #160d22 !important; border-bottom-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] .about-vision { background: #0d0614 !important; }
        [data-theme="dark"] .about-core-model { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important; }
        [data-theme="dark"] .about-who-we-serve { background: linear-gradient(180deg, #160d22 0%, #0d0614 100%) !important; }
        [data-theme="dark"] .about-cta { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important; }

        [data-theme="dark"] .about-core-model h3,
        [data-theme="dark"] .about-who-we-serve h3 { color: #ffffff !important; }

        [data-theme="dark"] .about-core-model > div:last-child > div:not([style*="border-radius: 50%"]),
        [data-theme="dark"] .about-who-we-serve > div:last-child > div {
          background: rgba(25, 16, 38, 0.6) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }

        [data-theme="dark"] .elv-float-card-top { background: rgba(25, 16, 38, 0.9) !important; border-color: rgba(255, 255, 255, 0.08) !important; }
        [data-theme="dark"] .elv-float-card-top div > div { background: rgba(90, 63, 160, 0.2) !important; color: #cbd5e1 !important; }
      `}</style>

      <Hero />
      <WhoWeServeSection />
      <CoreModelSection />
      <FounderSection />
      <VisionSection />
      <CTASection />
    </>
  );
}