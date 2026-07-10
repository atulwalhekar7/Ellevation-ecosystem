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
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
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

/* ── Core Model data (new) ── */
const coreModel = [
  {
    label: "Ms. Ellevation",
    title: "Builds the Woman",
    body: "Her Voice, Identity, Confidence, Healing, and Leadership.",
    tags: ["Voice", "Identity", "Confidence", "Healing", "Leadership"],
    accent: "#c0609a",
    bg: "linear-gradient(135deg,#fdf1f7 0%,#f7e6f0 100%)",
  },
  {
    label: "Ellevation Hub",
    title: "Builds the Ecosystem",
    body: "Pathways, systems, impact, and opportunities around her and the wider community.",
    tags: ["Pathways", "Systems", "Impact", "Opportunity", "Community"],
    accent: "#7a5ea0",
    bg: "linear-gradient(135deg,#f3eefc 0%,#ece3f7 100%)",
  },
];

/* ── Who We Serve data (new) ── */
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
  {
    title: "Children & Youth (5–16)",
    body: "Early mentorship and development programs that build a strong foundation for the future.",
    icon: "❖",
  },
];

const team = [
  { name: "Victoria Rhodes", role: "Founder & CEO",        initials: "VR", grad: "linear-gradient(135deg,#c9a8d4 0%,#a882be 100%)" },
  { name: "Aisha Okafor",    role: "Director of Programs", initials: "AO", grad: "linear-gradient(135deg,#d4a8c0 0%,#b882a0 100%)" },
  { name: "Carmen Santos",   role: "Head of Community",    initials: "CS", grad: "linear-gradient(135deg,#c0a8d8 0%,#9882c0 100%)" },
];

/* ── Ticker items (same as home) ── */


/* ── Carousel slides (same as home) ── */
const slides = [
  { src: img1, title: "", sub: "Where women connect, grow & lead" },
  { src: img2, title: "", sub: "Women in Leadership · Sydney" },
  { src: img3, title: "", sub: "Personal transformation · Blue Mountains" },
  { src: img4, title: "", sub: "Celebrating community · Melbourne" },
];



const CrownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 19h20M3 9l4 5 5-8 5 8 4-5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"
      stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Carousel (same as home) ── */
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

      {/* Main carousel */}
      <div style={{
        borderRadius: 26, overflow: "hidden",
        aspectRatio: "4/3.2",
        background: "#f2e8f5",
        boxShadow: "0 20px 60px rgba(155,109,190,0.2)",
        position: "relative",
        width: "100%",
      }}>
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
            <div key={i} style={{ width: `${100 / slides.length}%`, height: "100%", position: "relative", flexShrink: 0, overflow: "hidden" }}>
              {slide.src && (
                <img src={slide.src} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,10,46,0.04) 0%, rgba(26,10,46,0.42) 100%)" }} />
              <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", padding: "0 24px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.25)", marginBottom: 6 }}>{slide.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans',sans-serif", marginLeft: 130 }}>{slide.sub}</div>
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
          width: 165, borderRadius: 16,
          background: "#1a0a2e", padding: "8px 12px",
          boxShadow: "0 8px 24px rgba(26,10,46,0.22)",
          border: "1px solid rgba(255,255,255,0.06)",
          zIndex: 20,
        }}
      >
        <div style={{ marginBottom: 4 }}><CrownIcon /></div>
        <p style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", fontFamily: "'DM Sans',sans-serif", margin: 0 }}>
          Premium spaces for coaching, memberships, alliances, and events.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   HERO  ← replaced with home banner style
══════════════════════════════════════ */
function Hero() {
  const [visible, setVisible] = useState(false);
  const [goldHov, setGoldHov] = useState(false);
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
      background: "linear-gradient(150deg,#fdf6f9 0%,#f5eaf4 35%,#ede8f5 65%,#f0e8f0 100%)",
      minHeight: "100vh", display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      {/* Background blobs */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(220,180,240,0.22) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 60, left: -100, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(240,200,215,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Main content grid */}
      <div style={{
        flex: 1,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "40px 48px 52px 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: 48,
        alignItems: "center",
      }}>
        {/* LEFT */}
        <div style={{ opacity: visible ? 1 : 0 }}>
         

          <h1 className={visible ? "elv-animate-2" : ""} style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(31px,4.2vw,54px)",
            fontWeight: 700, lineHeight: 1.02,
            color: "#1a0a2e", marginBottom: 22, letterSpacing: "-0.01em",
          }}>
            Born from a belief <br />every woman deserves <br />a space to rise.
          </h1>

          <p className={visible ? "elv-animate-3" : ""} style={{ fontSize: 15, lineHeight: 1.72, color: "rgba(42,18,60,0.72)", maxWidth: 460, marginBottom: 32 }}>
            Ellevation is a luxury feminine, community-driven ecosystem uniting personal
            transformation, professional visibility, impact pathways, events, and membership.
          </p>

        <div
  className={visible ? "elv-animate-4" : ""}
  style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}
>
  <a
    href="/ms-ellevation"
    onMouseEnter={() => setGoldHov(true)}
    onMouseLeave={() => setGoldHov(false)}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 22px",
      borderRadius: 100,
      background: "linear-gradient(135deg,#d4a96a,#c9906a)",
      color: "#fff",
      fontFamily: "'DM Sans',sans-serif",
      fontWeight: 600,
      fontSize: 13,
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 18px rgba(201,144,106,0.38)",
      opacity: goldHov ? 0.88 : 1,
      transform: goldHov ? "scale(1.02)" : "scale(1)",
      transition: "opacity 0.15s, transform 0.15s",
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
      padding: "12px 22px",
      borderRadius: 100,
      background: "#1a0a2e",
      color: "#fff",
      fontFamily: "'DM Sans',sans-serif",
      fontWeight: 600,
      fontSize: 13,
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 18px rgba(26,10,46,0.22)",
      opacity: darkHov ? 0.88 : 1,
      transform: darkHov ? "scale(1.02)" : "scale(1)",
      transition: "opacity 0.15s, transform 0.15s",
    }}
  >
    Enter Ellevation Hub →
  </a>

</div>
         
        </div>

        {/* RIGHT: Carousel */}
        <div className={visible ? "elv-carousel-entry" : ""} style={{
          opacity: visible ? 1 : 0,
          paddingTop: 28, paddingBottom: 32, paddingRight: 28,
        }}>
          <Carousel />
        </div>
      </div>

      {/* Ticker */}
          </section>
  );
}

/* ══════════════════════════════════════
   FOUNDER SECTION  (unchanged)
══════════════════════════════════════ */
function FounderSection() {
  const left  = useInView(0.15);
  const right = useInView(0.15);

  return (
    <section 
      className="about-founder"
      style={{
      background: "#fff",
      padding: "80px 24px",
      borderBottom: "1px solid rgba(180,160,210,0.15)",
    }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", gap: "56px 72px", justifyContent: "center",
      }}>
        {/* LEFT: photo */}
        <div ref={left.ref} style={{
          ...fade(left.inView, 0),
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20, flexShrink: 0,
        }}>
          <div style={{ position: "relative", width: 320, height: 320 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", padding: 6 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#fff", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                      fallback.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#f2dff0 0%,#ddd0f0 100%);font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:600;color:#9b7db8;";
                      fallback.textContent = "HG";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: "#c0609a", margin: "0 0 4px" }}>Ms Hannah Gongar</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#6b5880", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>Founder</p>
          </div>
        </div>

        {/* RIGHT: text */}
      <div ref={right.ref} style={{ flex: "1 1 380px", maxWidth: 620 }}>
  <p style={{ ...fade(right.inView, 60), fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c0609a", margin: "0 0 14px" }}>
    Ecosystem Pathway
  </p>
  <h2 style={{ ...fade(right.inView, 130), fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 500, color: "#1c1630", lineHeight: 1.2, margin: "0 0 28px" }}>
    Building Confidence, Wellbeing, and{" "}
    <span style={{ color: "#9b7db8" }}>Accessible Opportunities</span>
  </h2>
  
  {[
    { delay: 200, text: "Ellevation is a community-led ecosystem dedicated to nurturing wellbeing, leadership, and accessible pathways into opportunity across every stage of life." },
    { delay: 280, text: "We exist to support culturally and linguistically diverse (CALD) communities to grow, lead, and thrive without losing their unique identities, rich cultures, or lived experiences." },
    { delay: 360, text: "By connecting community safety networks, personal growth frameworks, and strategic economic channels, we transform distinct milestones into a single, integrated lifecycle matrix." },
  ].map((p, i) => (
    <p key={i} style={{ ...fade(right.inView, p.delay), fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px,1.6vw,15.5px)", color: "#3a2e50", lineHeight: 1.82, margin: "0 0 18px" }}>
      {p.text}
    </p>
  ))}

  {/* ── Integrated Ecosystem Lifecycle Pipeline ── */}
  <div 
    style={{ 
      ...fade(right.inView, 420), 
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

  <div style={{ ...fade(right.inView, 480), display: "flex", alignItems: "center", gap: 10 }}>
   
  </div>
</div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VISION TEXT  (unchanged)
══════════════════════════════════════ */
function VisionSection() {
  const h  = useInView(0.15);
  const p1 = useInView(0.15);
  const p2 = useInView(0.15);
  const p3 = useInView(0.15);

  return (
    <section 
      className="about-vision"
      style={{ 
        background: "radial-gradient(circle at 50% 0%, #fefbfe 0%, #fdf9fc 100%)",
        padding: "120px 24px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div ref={h.ref} style={{ textAlign: "center", marginBottom: "80px" }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#9b7db8",
            display: "block",
            marginBottom: "16px"
          }}>
            Our Purpose
          </span>
          <h2 style={{ 
            ...fade(h.inView, 0), 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: "clamp(32px, 4.5vw, 54px)", 
            fontWeight: 400, 
            lineHeight: 1.15, 
            color: "#1c1630",
            maxWidth: "850px",
            margin: "0 auto"
          }}>
            A Vision for Every Woman,{" "}
            <span style={{ color: "#9b7db8", fontStyle: "italic" }}>
              A Platform for the Collective
            </span>
          </h2>
        </div>

        {/* Narrative Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          paddingTop: "16px"
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
                borderTop: "1px solid rgba(155, 125, 184, 0.3)",
                paddingTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "24px",
                fontStyle: "italic",
                color: "#9b7db8",
                fontWeight: 500
              }}>
                {item.num}
              </span>
              <p style={{ 
                fontFamily: "'DM Sans', sans-serif", 
                fontSize: "16px", 
                color: "#3a2e50", 
                lineHeight: 1.8, 
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
/* ══════════════════════════════════════
   VMV CARDS  (unchanged)
══════════════════════════════════════ */
function VMVCard({ item, index }: { item: typeof vmv[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 280px", maxWidth: 320, minWidth: 240,
        background: hov ? "#fff" : "#fdfaff",
        border: "1.5px solid",
        borderColor: hov ? "rgba(155,125,184,0.5)" : "rgba(180,160,210,0.22)",
        borderRadius: 20, padding: "40px 28px 36px", textAlign: "center",
        boxShadow: hov ? "0 20px 52px rgba(140,110,180,0.18)" : "0 2px 16px rgba(140,110,180,0.06)",
        transition: "all 0.45s cubic-bezier(.34,1.56,.64,1)",
        transform: !inView ? "translateY(40px) scale(0.97)" : hov ? "translateY(-10px) scale(1.025)" : "translateY(0) scale(1)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 130}ms` : "0ms",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, height: 3, borderRadius: "20px 20px 0 0", background: "linear-gradient(90deg,#c9a8d4,#9b7db8,#d4a8c0)", width: hov ? "100%" : "0%", transition: "width 0.45s cubic-bezier(.4,0,.2,1)" }} />
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 500, color: "#9b7db8", margin: "0 0 18px", transition: "transform 0.35s ease", transform: hov ? "scale(1.06)" : "scale(1)", display: "inline-block" }}>{item.title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.76, color: "#3a2e50", margin: 0 }}>{item.body}</p>
    </div>
  );
}

function VMVSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section 
      className="about-vmv"
      style={{ background: "#f5eef8", padding: "72px 24px 88px" }}>
      <div ref={ref} style={{ ...fade(inView, 0), textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8" }}>What We Stand For</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, maxWidth: 1060, margin: "0 auto", justifyContent: "center" }}>
        {vmv.map((item, i) => <VMVCard key={i} item={item} index={i} />)}
      </div>
    </section>
  );
}

// Note: VMVSection is currently not rendered on the page.
// Keep it for future use, but avoid TS6133 unused-local errors.
void VMVSection;


/* ══════════════════════════════════════
   CORE MODEL  (new)
══════════════════════════════════════ */
function CoreModelCard({ item, index }: { item: typeof coreModel[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 340px", maxWidth: 440, minWidth: 260,
        background: item.bg,
        border: "1.5px solid",
        borderColor: hov ? `${item.accent}80` : "rgba(180,160,210,0.22)",
        borderRadius: 22, padding: "36px 34px 32px",
        boxShadow: hov ? "0 22px 54px rgba(140,110,180,0.2)" : "0 2px 16px rgba(140,110,180,0.07)",
        transition: "all 0.45s cubic-bezier(.34,1.56,.64,1)",
        transform: !inView ? "translateY(40px) scale(0.97)" : hov ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 150}ms` : "0ms",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, height: 3, borderRadius: "22px 22px 0 0", background: item.accent, width: hov ? "100%" : "0%", transition: "width 0.45s cubic-bezier(.4,0,.2,1)" }} />
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase", color: item.accent,
        margin: "0 0 10px",
      }}>
        {item.label}
      </p>
      <h3 style={{
        fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600,
        color: "#1c1630", margin: "0 0 14px", lineHeight: 1.2,
      }}>
        {item.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.76,
        color: "#3a2e50", margin: "0 0 22px",
      }}>
        {item.body}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {item.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 600,
            color: item.accent, background: "rgba(255,255,255,0.7)",
            border: `1px solid ${item.accent}33`,
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
      style={{ background: "#fdf9fc", padding: "0 24px 88px" }}
    >
      <div
  ref={head.ref}
  style={{
    ...fade(head.inView, 0),
    textAlign: "center",
    marginTop: "70px",   // 👈 Increase this value as needed
    marginBottom: "44px",
  }}
>
  <p
    style={{
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "#9b7db8",
      margin: "10px 0 12px",
    }}
  >
    Core Model
  </p>

  <h2
    style={{
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: "clamp(28px,5vw,46px)",
      fontWeight: 500,
      color: "#1c1630",
      margin: 0,
    }}
  >
One mission. Two pathways.
  </h2>
</div>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: 20, maxWidth: 1000, margin: "0 auto",
        justifyContent: "center", alignItems: "stretch",
      }}>
        <CoreModelCard item={coreModel[0]} index={0} />

        <div
          ref={arrow.ref}
          style={{
            ...fade(arrow.inView, 260),
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(155,125,184,0.12)", color: "#9b7db8",
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

/* ══════════════════════════════════════
   WHO WE SERVE  (new)
══════════════════════════════════════ */
function WhoWeServeCard({ item, index }: { item: typeof whoWeServe[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 220px", maxWidth: 250, minWidth: 200,
        background: hov ? "#fff" : "#fdfaff",
        border: "1.5px solid",
        borderColor: hov ? "rgba(155,125,184,0.5)" : "rgba(180,160,210,0.22)",
        borderRadius: 20, padding: "32px 24px 28px", textAlign: "left",
        boxShadow: hov ? "0 18px 46px rgba(140,110,180,0.16)" : "0 2px 16px rgba(140,110,180,0.06)",
        transition: "all 0.45s cubic-bezier(.34,1.56,.64,1)",
        transform: !inView ? "translateY(36px) scale(0.97)" : hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 110}ms` : "0ms",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "rgba(155,125,184,0.12)", color: "#9b7db8",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 18,
        transition: "transform 0.35s ease",
        transform: hov ? "scale(1.08)" : "scale(1)",
      }}>
        {item.icon}
      </div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600,
        color: "#1c1630", margin: "0 0 10px", lineHeight: 1.25,
      }}>
        {item.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.7,
        color: "#3a2e50", margin: 0,
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
      style={{ background: "#f5eef8", padding: "20px 24px 88px" }}
    >
      <div ref={ref} style={{ ...fade(inView, 0), textAlign: "center", marginBottom: 44 }}>
      <p
  style={{
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#9b7db8",
    margin: "20px 0 12px", // Top Right/Left Bottom
  }}
>
  Who We Serve
</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,46px)", fontWeight: 500, color: "#1c1630", margin: 0 }}>
          A Community That Spans Every Generation
        </h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, maxWidth: 1180, margin: "0 auto", justifyContent: "center" }}>
        {whoWeServe.map((item, i) => <WhoWeServeCard key={item.title} item={item} index={i} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   TEAM  (unchanged)
══════════════════════════════════════ */
function TeamMember({ m, index }: { m: typeof team[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${index * 160}ms, transform 0.7s ease ${index * 160}ms`, cursor: "default" }}
    >
      <div style={{ width: 110, height: 110, borderRadius: 24, background: m.grad, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, boxShadow: hov ? "0 18px 44px rgba(140,110,180,0.32)" : "0 4px 20px rgba(140,110,180,0.14)", transform: hov ? "scale(1.08) translateY(-5px) rotate(-2deg)" : "scale(1) rotate(0deg)", transition: "transform 0.45s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease" }}>{m.initials}</div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#1c1630", margin: "0 0 5px", transition: "color 0.25s ease", ...(hov ? { color: "#7a5ea0" } : {}) }}>{m.name}</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9b7db8", margin: 0 }}>{m.role}</p>
      </div>
    </div>
  );
}

function TeamSection() {
  const h = useInView(0.2);
  return (
    <section 
      className="about-team"
      style={{ background: "#fdf9fc", padding: "80px 24px 88px", textAlign: "center" }}>
      <div ref={h.ref}>
        <div style={{ ...fade(h.inView, 0), display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 18 }}>
          <div style={{ width: h.inView ? 36 : 0, height: 1, background: "rgba(155,125,184,0.6)", transition: "width 0.6s ease 200ms" }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8" }}>Leadership</span>
          <div style={{ width: h.inView ? 36 : 0, height: 1, background: "rgba(155,125,184,0.6)", transition: "width 0.6s ease 200ms" }} />
        </div>
        <h2 style={{ ...fade(h.inView, 120), fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,6vw,60px)", fontWeight: 500, color: "#1c1630", margin: "0 0 56px" }}>Meet Our Team</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 44, maxWidth: 860, margin: "0 auto", justifyContent: "center" }}>
        {team.map((m, i) => <TeamMember key={i} m={m} index={i} />)}
      </div>
    </section>
  );
}

// Note: TeamSection is currently not rendered on the page.
void TeamSection;

/* Make TS6133 happy even if the code above changes/gets optimized */




/* ══════════════════════════════════════
   CTA  (unchanged)
══════════════════════════════════════ */
function CTABtn({ label, primary }: { label: string; primary: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "14px 32px", borderRadius: 999, border: primary ? "none" : "1.5px solid rgba(28,22,48,0.7)", background: primary ? hov ? "#7a5ea0" : "#9b7db8" : hov ? "rgba(28,22,48,0.07)" : "transparent", color: primary ? "#fff" : "#1c1630", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, cursor: "pointer", boxShadow: primary && hov ? "0 10px 30px rgba(140,110,180,0.4)" : "none", transform: hov ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)", transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)" }}
    >{label}</button>
  );
}

function CTASection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section 
      className="about-cta"
      style={{ background: "linear-gradient(150deg,#f0d8ee 0%,#e2d0f0 40%,#d4c8f8 75%,#e0d4f8 100%)", padding: "88px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div className="blob cta-blob-1" />
      <div className="blob cta-blob-2" />
      <div className="cta-shimmer" />
      <div ref={ref} style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ ...fade(inView, 0), fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px,6vw,66px)", fontWeight: 500, color: "#1c1630", margin: "0 0 42px" }}>Join Our Ecosystem</h2>
     <div
  style={{
    ...fade(inView, 160),
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  }}
>
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

/* ══════════════════════════════════════
   PAGE  (unchanged, Core Model inserted below VMV)
══════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdf9fc; }

        /* ── Home banner animations (needed by Hero) ── */
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
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .elv-animate-1 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.1s; }
        .elv-animate-2 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.25s; }
        .elv-animate-3 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.4s; }
        .elv-animate-4 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.55s; }
        .elv-animate-5 { animation: fadeUp 1s cubic-bezier(0.25,1,0.5,1) both; animation-delay: 0.7s; }

        .elv-carousel-entry {
          animation: fadeUp 1.2s cubic-bezier(0.25,1,0.5,1) both;
          animation-delay: 0.35s;
        }
        .elv-stat:hover {
          transform: translateY(-4px) !important;
          background: rgba(255,255,255,0.86) !important;
          box-shadow: 0 10px 20px rgba(155,109,190,0.08);
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

        /* ── About page original animations ── */
        .blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .blob-1 { top: -100px; left: -80px; width: 500px; height: 500px; background: radial-gradient(circle,rgba(255,210,230,0.52) 0%,transparent 68%); animation: floatA 9s ease-in-out infinite; }
        .blob-2 { bottom: -80px; right: -60px; width: 420px; height: 420px; background: radial-gradient(circle,rgba(190,170,240,0.44) 0%,transparent 68%); animation: floatB 11s ease-in-out infinite 2s; }
        .blob-3 { top: 30%; left: 55%; width: 280px; height: 280px; background: radial-gradient(circle,rgba(210,190,255,0.28) 0%,transparent 68%); animation: floatA 13s ease-in-out infinite 4s; }
        .cta-blob-1 { top: -80px; right: -60px; width: 380px; height: 380px; background: radial-gradient(circle,rgba(220,200,255,0.45) 0%,transparent 70%); animation: floatB 10s ease-in-out infinite; }
        .cta-blob-2 { bottom: -60px; left: -40px; width: 320px; height: 320px; background: radial-gradient(circle,rgba(255,210,235,0.38) 0%,transparent 70%); animation: floatA 12s ease-in-out infinite 3s; }

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
        .line-draw { animation: lineDraw 0.7s ease 0.2s both; }
        @keyframes lineDraw {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        .bounce-arrow { display: inline-block; font-size: 20px; color: #fff; animation: bounceDown 2s ease-in-out infinite; }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%       { transform: translateY(8px); opacity: 1; }
        }
        .cta-shimmer { position: absolute; inset: 0; background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%); background-size: 200% 100%; animation: shimmerSweep 5s linear infinite; pointer-events: none; z-index: 0; }
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @media (max-width: 640px) {
          .founder-layout { flex-direction: column !important; }
          .about-core-model > div:last-child { flex-direction: column; }
          .about-core-model > div:last-child > div:nth-child(2) { transform: rotate(90deg); }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] body {
          background: #0f0a1a !important;
        }
        [data-theme="dark"] .about-hero {
          background: linear-gradient(150deg, #1a0f1f 0%, #140a1a 40%, #0f0a1a 100%) !important;
        }
        [data-theme="dark"] .about-hero h1,
        [data-theme="dark"] .about-founder h2,
        [data-theme="dark"] .about-vision h2,
        [data-theme="dark"] .about-team h2,
        [data-theme="dark"] .about-cta h2,
        [data-theme="dark"] .about-core-model h2,
        [data-theme="dark"] .about-core-model h3,
        [data-theme="dark"] .about-who-we-serve h2,
        [data-theme="dark"] .about-who-we-serve h3,
        [data-theme="dark"] .team-member p:first-of-type {
          color: #f3ebff !important;
        }
        [data-theme="dark"] .about-hero p,
        [data-theme="dark"] .about-founder p,
        [data-theme="dark"] .about-vision p,
        [data-theme="dark"] .about-vmv p:last-child,
        [data-theme="dark"] .about-core-model p,
        [data-theme="dark"] .about-who-we-serve p {
          color: #b8a8c8 !important;
        }
        [data-theme="dark"] .about-founder,
        [data-theme="dark"] .about-team {
          background: #140a1a !important;
          border-bottom-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .about-vision {
          background: #0f0a1a !important;
        }
        [data-theme="dark"] .about-vmv {
          background: #1a1226 !important;
        }
        [data-theme="dark"] .about-core-model {
          background: #0f0a1a !important;
        }
        [data-theme="dark"] .about-core-model > div:last-child > div:not([style*="border-radius: 50%"]) {
          background: rgba(30, 20, 45, 0.6) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
        }
        [data-theme="dark"] .about-who-we-serve {
          background: #1a1226 !important;
        }
        [data-theme="dark"] .about-who-we-serve > div:last-child > div {
          background: rgba(30, 20, 45, 0.6) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
        }
        [data-theme="dark"] .about-cta {
          background: linear-gradient(150deg, #2d1a4e 0%, #1a0a2e 100%) !important;
        }
        /* Floating Cards in Hero */
        [data-theme="dark"] .elv-float-card-top {
          background: rgba(30, 20, 45, 0.9) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        [data-theme="dark"] .elv-float-card-top p:last-of-type {
          color: #d8ccf4 !important;
        }
        [data-theme="dark"] .elv-float-card-top div > div {
          background: rgba(124, 92, 191, 0.2) !important;
          color: #c4b5fd !important;
        }
        /* VMV Cards */
        [data-theme="dark"] .about-vmv > div + div > div {
          background: rgba(30, 20, 45, 0.5) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
        }
        [data-theme="dark"] .about-vmv h3 {
          color: #a78bfa !important;
        }
        /* Buttons */
        [data-theme="dark"] button[style*="transparent"] {
          color: #f3ebff !important;
          border-color: #f3ebff !important;
        }
        [data-theme="dark"] .about-cta button:last-child {
          border-color: rgba(243, 235, 255, 0.5) !important;
          color: #f3ebff !important;
        }
        [data-theme="dark"] .about-founder a {
          border-color: #a78bfa !important;
          color: #a78bfa !important;
        }
      `}</style>

      <Hero />
       <WhoWeServeSection />
        <CoreModelSection />
      <FounderSection />
      <VisionSection />
      {/* <VMVSection /> */}
     
     
      {/* <TeamSection /> */}
      <CTASection />
    </>
  );
}