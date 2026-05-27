import { useEffect, useRef, useState, CSSProperties } from "react";
import aboutBg from "../assets/about1-image.jpg";
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

      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{
          ...fade(mounted, 0),
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:12, marginBottom:28,
        }}>
          <div className={mounted ? "line-draw" : ""} style={{
            width: 40, height: 1,
            background: "rgba(155,125,184,0.6)",
            transformOrigin: "right center",
          }} />
          <span style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
            letterSpacing:"0.22em", textTransform:"uppercase", color:"#9b7db8",
          }}>About Us</span>
          <div className={mounted ? "line-draw" : ""} style={{
            width: 40, height: 1,
            background: "rgba(155,125,184,0.6)",
            transformOrigin: "left center",
          }} />
        </div>

        <h1 style={{
          ...fade(mounted, 130),
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: "clamp(58px,9vw,100px)",
          fontWeight: 500,
          color: "#1c1630", margin: "0 0 22px", lineHeight: 1.08,
        }}>Our Story</h1>

        <p style={{
          ...fade(mounted, 260),
          fontFamily:"'DM Sans',sans-serif",
          fontSize: "clamp(15px,2vw,18px)",
          color: "#4a3860", maxWidth: 560, margin: "0 auto", lineHeight: 1.75,
        }}>
          Born from a belief that every woman deserves a space to rise — fully, beautifully, and together.
        </p>

        <div style={{ ...fade(mounted, 400), marginTop: 48 }}>
          <div className="bounce-arrow">↓</div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   FOUNDER SECTION  (new)
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
        maxWidth: 1080,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "56px 72px",
        justifyContent: "center",
      }}>

        {/* ── LEFT: photo + name ── */}
        <div ref={left.ref} style={{
          ...fade(left.inView, 0),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          flexShrink: 0,
        }}>
          {/* circular photo frame with pink/lavender ring */}
          <div style={{
            position: "relative",
            width: 320,
            height: 320,
          }}>
            {/* outer ring gradient */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
             
              padding: 6,
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "#fff",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {/* ✅ Replace the src below with your actual image path */}
                <img
                  src={aboutBg}
                  alt="Ms Hannah Gongar"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  onError={(e) => {
                    // fallback to initials if image not found
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

            {/* small sparkle badge */}
           
          </div>

          {/* name + title */}
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color: "#c0609a",
              margin: "0 0 4px",
            }}>Ms Hannah Gongar</p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "#6b5880",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}>Founder</p>
          </div>
        </div>

        {/* ── RIGHT: text content ── */}
        <div ref={right.ref} style={{
          flex: "1 1 380px",
          maxWidth: 620,
        }}>
          {/* eyebrow label */}
          <p style={{
            ...fade(right.inView, 60),
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c0609a",
            margin: "0 0 14px",
          }}>MS ELLEVATION</p>

          {/* headline */}
          <h2 style={{
            ...fade(right.inView, 130),
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px,4.5vw,46px)",
            fontWeight: 500,
            color: "#1c1630",
            lineHeight: 1.2,
            margin: "0 0 28px",
          }}>
             Empowering Women to Rise,{" "}
            <span style={{ color: "#9b7db8" }}>Shine and Thrive</span>
          </h2>

          {/* body paragraphs */}
          {[
            { delay: 200, text: "Ms Ellevation is a community-driven organisation supporting CALD women in Australia to integrate, thrive, and achieve financial independence." },
            { delay: 280, text: "Founded by Hannah Gongar, whose journey through war, migration, and adversity shaped her resilience, Ms Ellevation offers women from diverse backgrounds guidance in finance, education, and navigating Australian society." },
            { delay: 360, text: "Through programs in micro-finance, business development, and community support, we empower women to regain confidence, build stability, and step fully into their potential." },
          ].map((p, i) => (
            <p key={i} style={{
              ...fade(right.inView, p.delay),
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px,1.6vw,15.5px)",
              color: "#3a2e50",
              lineHeight: 1.82,
              margin: i < 2 ? "0 0 18px" : "0 0 24px",
            }}>{p.text}</p>
          ))}

          {/* closing belief line */}
          <div style={{
            ...fade(right.inView, 440),
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
           
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#6b5880",
              
              margin: 0,
              lineHeight: 1.6,
            }}>At Ms Ellevation, we believe that when women rise, communities rise.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VISION TEXT
══════════════════════════════════════ */
function VisionSection() {
  const h  = useInView(0.15);
  const p1 = useInView(0.15);
  const p2 = useInView(0.15);
  const p3 = useInView(0.15);

  return (
    <section style={{ background:"#fdf9fc", padding:"88px 24px 72px", textAlign:"center" }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <div ref={h.ref}>
          <h2 style={{
            ...fade(h.inView, 0),
            fontFamily:"'Cormorant Garamond',serif",
            fontSize: "clamp(28px,5vw,50px)",
            fontWeight: 500,
            lineHeight: 1.22, margin: "0 0 48px", color: "#1c1630",
          }}>
            A Vision for Every Woman,{" "}
            <span style={{ color:"#9b7db8" }}>A Platform for the Collective</span>
          </h2>
        </div>

        {[
          { r: p1, d: 0,   t: "Ellevation was founded on a simple but profound truth: women thrive when they are seen, supported, and connected to a community that believes in their power." },
          { r: p2, d: 110, t: "From the boardroom to the community hall, from personal healing to professional mastery — Ellevation exists to serve every dimension of a woman's life and ambition." },
          { r: p3, d: 220, t: "Through Ms. Ellevation and Ellevation Hub — we create a living ecosystem where transformation is not a destination, but a way of being." },
        ].map((item, i) => (
          <div ref={item.r.ref} key={i} style={{ marginBottom: i < 2 ? 26 : 0 }}>
            <p style={{
              ...fade(item.r.inView, item.d),
              fontFamily:"'DM Sans',sans-serif",
              fontSize: "clamp(15px,1.8vw,17px)",
              color: "#3a2e50", lineHeight: 1.82, margin: 0,
            }}>{item.t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VMV CARDS
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
        flex:"1 1 280px", maxWidth:320, minWidth:240,
        background: hov ? "#fff" : "#fdfaff",
        border: "1.5px solid",
        borderColor: hov ? "rgba(155,125,184,0.5)" : "rgba(180,160,210,0.22)",
        borderRadius: 20,
        padding: "40px 28px 36px",
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
        transitionDelay: inView ? `${index * 130}ms` : "0ms",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0,
        height: 3, borderRadius: "20px 20px 0 0",
        background: "linear-gradient(90deg,#c9a8d4,#9b7db8,#d4a8c0)",
        width: hov ? "100%" : "0%",
        transition: "width 0.45s cubic-bezier(.4,0,.2,1)",
      }} />

      <h3 style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize: 38, fontWeight: 500,
        color: "#9b7db8", margin: "0 0 18px",
        transition: "transform 0.35s ease",
        transform: hov ? "scale(1.06)" : "scale(1)",
        display: "inline-block",
      }}>{item.title}</h3>

      <p style={{
        fontFamily:"'DM Sans',sans-serif",
        fontSize: 14.5, lineHeight: 1.76,
        color: "#3a2e50", margin: 0,
      }}>{item.body}</p>
    </div>
  );
}

function VMVSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section style={{ background:"#f5eef8", padding:"72px 24px 88px" }}>
      <div ref={ref} style={{
        ...fade(inView, 0),
        textAlign: "center", marginBottom: 44,
      }}>
        <p style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
          letterSpacing:"0.22em", textTransform:"uppercase", color:"#9b7db8",
        }}>What We Stand For</p>
      </div>

      <div style={{
        display:"flex", flexWrap:"wrap", gap:20,
        maxWidth:1060, margin:"0 auto", justifyContent:"center",
      }}>
        {vmv.map((item, i) => <VMVCard key={i} item={item} index={i} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   TEAM
══════════════════════════════════════ */
function TeamMember({ m, index }: { m: typeof team[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center", gap:16,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${index*160}ms, transform 0.7s ease ${index*160}ms`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 110, height: 110, borderRadius: 24,
        background: m.grad,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff",
        fontFamily:"'Cormorant Garamond',serif",
        fontSize: 26, fontWeight: 600,
        boxShadow: hov
          ? "0 18px 44px rgba(140,110,180,0.32)"
          : "0 4px 20px rgba(140,110,180,0.14)",
        transform: hov ? "scale(1.08) translateY(-5px) rotate(-2deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.45s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease",
      }}>{m.initials}</div>

      <div style={{ textAlign:"center" }}>
        <p style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
          color:"#1c1630", margin:"0 0 5px",
          transition: "color 0.25s ease",
          ...(hov ? { color:"#7a5ea0" } : {}),
        }}>{m.name}</p>
        <p style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:10.5, fontWeight:600,
          letterSpacing:"0.14em", textTransform:"uppercase",
          color:"#9b7db8", margin:0,
        }}>{m.role}</p>
      </div>
    </div>
  );
}

function TeamSection() {
  const h = useInView(0.2);
  return (
    <section style={{ background:"#fdf9fc", padding:"80px 24px 88px", textAlign:"center" }}>
      <div ref={h.ref}>
        <div style={{
          ...fade(h.inView, 0),
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:12, marginBottom:18,
        }}>
          <div style={{ width: h.inView ? 36 : 0, height:1, background:"rgba(155,125,184,0.6)",
            transition:"width 0.6s ease 200ms" }} />
          <span style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
            letterSpacing:"0.22em", textTransform:"uppercase", color:"#9b7db8",
          }}>Leadership</span>
          <div style={{ width: h.inView ? 36 : 0, height:1, background:"rgba(155,125,184,0.6)",
            transition:"width 0.6s ease 200ms" }} />
        </div>
        <h2 style={{
          ...fade(h.inView, 120),
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: "clamp(36px,6vw,60px)",
          fontWeight: 500,
          color: "#1c1630", margin: "0 0 56px",
        }}>Meet Our Team</h2>
      </div>

      <div style={{
        display:"flex", flexWrap:"wrap", gap:44,
        maxWidth:860, margin:"0 auto", justifyContent:"center",
      }}>
        {team.map((m, i) => <TeamMember key={i} m={m} index={i} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CTA
══════════════════════════════════════ */
function CTABtn({ label, primary }: { label: string; primary: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "14px 32px", borderRadius: 999,
        border: primary ? "none" : "1.5px solid rgba(28,22,48,0.7)",
        background: primary
          ? hov ? "#7a5ea0" : "#9b7db8"
          : hov ? "rgba(28,22,48,0.07)" : "transparent",
        color: primary ? "#fff" : "#1c1630",
        fontFamily:"'DM Sans',sans-serif",
        fontSize: 12, fontWeight: 700,
        letterSpacing: "0.14em", textTransform:"uppercase" as const,
        cursor: "pointer",
        boxShadow: primary && hov ? "0 10px 30px rgba(140,110,180,0.4)" : "none",
        transform: hov ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
      }}
    >{label}</button>
  );
}

function CTASection() {
  const { ref, inView } = useInView(0.2);
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

      <div ref={ref} style={{ position:"relative", zIndex:1 }}>
        <h2 style={{
          ...fade(inView, 0),
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: "clamp(38px,6vw,66px)",
          fontWeight: 500,
          color: "#1c1630", margin: "0 0 42px",
        }}>Join Our Ecosystem</h2>

        <div style={{
          ...fade(inView, 160),
          display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center",
        }}>
          <CTABtn label="Explore Ms. Ellevation" primary />
          <CTABtn label="Join Ellevation Hub"    primary={false} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function AboutPage() {
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
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* responsive: stack founder section on mobile */
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