import { useEffect, useRef, useState, type CSSProperties } from "react";
import aboutBg from "../assets/about1-image.jpg";
import banner1 from "../assets/banner1.avif";

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
    body: "A world where every woman steps fully into her power, surrounded by a community that celebrates and supports her rise.",
  },
  {
    title: "Mission",
    body: "To provide the tools, connections, and community that empower women to transform their lives and elevate their communities.",
  },
  {
    title: "Values",
    body: "Authenticity. Excellence. Compassion. Community. Courage. These are not just words — they are the foundation of everything we do.",
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
    <section style={{
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

          <div className={visible ? "elv-animate-4" : ""} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            <button
              onMouseEnter={() => setGoldHov(true)}
              onMouseLeave={() => setGoldHov(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 22px", borderRadius: 100,
                background: "linear-gradient(135deg,#d4a96a,#c9906a)",
                color: "#fff", fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer",
                boxShadow: "0 4px 18px rgba(201,144,106,0.38)",
                opacity: goldHov ? 0.88 : 1,
                transform: goldHov ? "scale(1.02)" : "scale(1)",
                transition: "opacity 0.15s, transform 0.15s",
              }}
            >
              Enter Ms. Ellevation →
            </button>
            <button
              onMouseEnter={() => setDarkHov(true)}
              onMouseLeave={() => setDarkHov(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 22px", borderRadius: 100,
                background: "#1a0a2e",
                color: "#fff", fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer",
                boxShadow: "0 4px 18px rgba(26,10,46,0.22)",
                opacity: darkHov ? 0.88 : 1,
                transform: darkHov ? "scale(1.02)" : "scale(1)",
                transition: "opacity 0.15s, transform 0.15s",
              }}
            >
              Join Membership →
            </button>
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
    <section style={{
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
          <p style={{ ...fade(right.inView, 60), fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c0609a", margin: "0 0 14px" }}>MS ELLEVATION</p>
          <h2 style={{ ...fade(right.inView, 130), fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 500, color: "#1c1630", lineHeight: 1.2, margin: "0 0 28px" }}>
            Empowering Women to Rise,{" "}
            <span style={{ color: "#9b7db8" }}>Shine and Thrive</span>
          </h2>
          {[
            { delay: 200, text: "Ms Ellevation is a community-driven organisation supporting CALD women in Australia to integrate, thrive, and achieve financial independence." },
            { delay: 280, text: "Founded by Hannah Gongar, whose journey through war, migration, and adversity shaped her resilience, Ms Ellevation offers women from diverse backgrounds guidance in finance, education, and navigating Australian society." },
            { delay: 360, text: "Through programs in micro-finance, business development, and community support, we empower women to regain confidence, build stability, and step fully into their potential." },
          ].map((p, i) => (
            <p key={i} style={{ ...fade(right.inView, p.delay), fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px,1.6vw,15.5px)", color: "#3a2e50", lineHeight: 1.82, margin: i < 2 ? "0 0 18px" : "0 0 24px" }}>{p.text}</p>
          ))}
          <div style={{ ...fade(right.inView, 440), display: "flex", alignItems: "center", gap: 10 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#6b5880", margin: 0, lineHeight: 1.6 }}>At Ms Ellevation, we believe that when women rise, communities rise.</p>
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
    <section style={{ background: "#fdf9fc", padding: "88px 24px 72px", textAlign: "center" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div ref={h.ref}>
          <h2 style={{ ...fade(h.inView, 0), fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,50px)", fontWeight: 500, lineHeight: 1.22, margin: "0 0 48px", color: "#1c1630" }}>
            A Vision for Every Woman,{" "}<span style={{ color: "#9b7db8" }}>A Platform for the Collective</span>
          </h2>
        </div>
        {[
          { r: p1, d: 0,   t: "Ellevation was founded on a simple but profound truth: women thrive when they are seen, supported, and connected to a community that believes in their power." },
          { r: p2, d: 110, t: "From the boardroom to the community hall, from personal healing to professional mastery — Ellevation exists to serve every dimension of a woman's life and ambition." },
          { r: p3, d: 220, t: "Through Ms. Ellevation and Ellevation Hub — we create a living ecosystem where transformation is not a destination, but a way of being." },
        ].map((item, i) => (
          <div ref={item.r.ref} key={i} style={{ marginBottom: i < 2 ? 26 : 0 }}>
            <p style={{ ...fade(item.r.inView, item.d), fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(15px,1.8vw,17px)", color: "#3a2e50", lineHeight: 1.82, margin: 0 }}>{item.t}</p>
          </div>
        ))}
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
    <section style={{ background: "#f5eef8", padding: "72px 24px 88px" }}>
      <div ref={ref} style={{ ...fade(inView, 0), textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8" }}>What We Stand For</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, maxWidth: 1060, margin: "0 auto", justifyContent: "center" }}>
        {vmv.map((item, i) => <VMVCard key={i} item={item} index={i} />)}
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
    <section style={{ background: "#fdf9fc", padding: "80px 24px 88px", textAlign: "center" }}>
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
    <section style={{ background: "linear-gradient(150deg,#f0d8ee 0%,#e2d0f0 40%,#d4c8f8 75%,#e0d4f8 100%)", padding: "88px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div className="blob cta-blob-1" />
      <div className="blob cta-blob-2" />
      <div className="cta-shimmer" />
      <div ref={ref} style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ ...fade(inView, 0), fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px,6vw,66px)", fontWeight: 500, color: "#1c1630", margin: "0 0 42px" }}>Join Our Ecosystem</h2>
        <div style={{ ...fade(inView, 160), display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <CTABtn label="Explore Ms. Ellevation" primary />
          <CTABtn label="Join Ellevation Hub" primary={false} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE  (unchanged)
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
        }
      `}</style>

      <Hero />
      <FounderSection />
      <VisionSection />
      <VMVSection />
      <TeamSection />
      <CTASection />
    </>
  );
}