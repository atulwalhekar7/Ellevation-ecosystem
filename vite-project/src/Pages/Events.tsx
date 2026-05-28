import { useEffect, useRef, useState, CSSProperties } from "react";

import banner2 from "../assets/banner2.avif";
/* ── helpers ── */
function useInView(threshold = 0.12) {
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
    transform: inView ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}

/* ── data ── */
const events = [
  { day:"14", month:"JUN 2025", tag:"Conference", title:"Rise Summit: Women in Leadership",      desc:"A full-day summit for leaders, innovators, and changemakers.",           location:"Sydney, NSW",       price:"$149"  },
  { day:"22", month:"JUL 2025", tag:"Retreat",    title:"Ms. Ellevation Intensive Retreat",      desc:"3 days of immersive personal transformation in a luxury setting.",     location:"Blue Mountains, NSW",price:"$1,499"},
  { day:"08", month:"AUG 2025", tag:"Gala",       title:"Ellevation Hub Annual Gala",            desc:"An elegant evening celebrating community and forging connections.",     location:"Melbourne, VIC",    price:"$199"  },
  { day:"15", month:"SEP 2025", tag:"Workshop",   title:"Young Futures Forum",                   desc:"Empowering the next generation of leaders aged 13–18.",               location:"Brisbane, QLD",     price:"Free"  },
  { day:"20", month:"OCT 2025", tag:"Expo",       title:"Professional Pathways Expo",            desc:"Connect with employers, mentors, and professional development resources.",location:"Perth, WA",        price:"$49"   },
  { day:"08", month:"NOV 2025", tag:"Celebration",title:"Year-End Community Celebration",        desc:"Reflecting on the year's impact and setting intentions ahead.",        location:"Adelaide, SA",      price:"$79"   },
];

/* ── Event Card ── */
function EventCard({ ev, index }: { ev: typeof events[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#fff" : "#fefcfa",
        border: "1.5px solid",
        borderColor: hov ? "rgba(155,125,184,0.4)" : "rgba(180,160,210,0.18)",
        borderRadius: 20,
        padding: "32px 36px",
        display: "flex",
        alignItems: "center",
        gap: 0,
        position: "relative",
        overflow: "hidden",
        boxShadow: hov
          ? "0 18px 52px rgba(140,110,180,0.16)"
          : "0 2px 18px rgba(140,110,180,0.06)",
        transition: "all 0.45s cubic-bezier(.34,1.56,.64,1)",
        transform: !inView
          ? "translateY(40px) scale(0.97)"
          : hov ? "translateY(-6px) scale(1.01)"
          : "translateY(0) scale(1)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 80}ms` : "0ms",
        cursor: "default",
      }}
    >
      {/* top accent bar sweeps on hover */}
      <div style={{
        position:"absolute", top:0, left:0,
        height:3, borderRadius:"20px 20px 0 0",
        background:"linear-gradient(90deg,#c9a8d4,#9b7db8,#d4a8c0)",
        width: hov ? "100%" : "0%",
        transition:"width 0.45s cubic-bezier(.4,0,.2,1)",
      }} />

      {/* DATE */}
      <div style={{
        minWidth: 90, textAlign:"center",
        flexShrink: 0,
        transform: hov ? "scale(1.05)" : "scale(1)",
        transition:"transform 0.35s ease",
      }}>
        <div style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: 52, fontWeight:500, lineHeight:1,
          color:"#9b7db8",
        }}>{ev.day}</div>
        <div style={{
          fontFamily:"'DM Sans',sans-serif",
          fontSize:10, fontWeight:700,
          letterSpacing:"0.14em", textTransform:"uppercase",
          color:"#b8a8c8", marginTop:4,
        }}>{ev.month}</div>
      </div>

      {/* vertical divider */}
      <div style={{
        width:1, alignSelf:"stretch",
        background: hov ? "rgba(155,125,184,0.4)" : "rgba(180,160,210,0.25)",
        margin:"0 32px",
        flexShrink:0,
        transition:"background 0.3s ease",
      }} />

      {/* CONTENT */}
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{
          fontFamily:"'DM Sans',sans-serif",
          fontSize:14, fontWeight:700,
          letterSpacing:"0.2em", textTransform:"uppercase",
          color:"#9b7db8", margin:"0 0 8px",
        }}>{ev.tag}</p>
        <h3 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(20px,2.8vw,26px)",
          fontWeight:500, 
          color:"#1c1630", margin:"0 0 8px", lineHeight:1.2,
        }}>{ev.title}</h3>
        <p style={{
          fontFamily:"'DM Sans',sans-serif",
          fontSize:14, color:"#5a4a6a",
          lineHeight:1.6, margin:"0 0 12px",
        }}>{ev.desc}</p>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:14 }}>📍</span>
          <span style={{
            fontFamily:"'DM Sans',sans-serif",
            fontSize:13, color:"#9b7db8", fontWeight:500,
          }}>{ev.location}</span>
        </div>
      </div>

      {/* PRICE + CTA */}
      <div style={{
        display:"flex", flexDirection:"column",
        alignItems:"flex-end", gap:14,
        marginLeft:32, flexShrink:0,
      }}>
        <span style={{
          fontFamily:"'DM Sans',sans-serif",
          fontSize: ev.price === "Free" ? 18 : 22,
          fontWeight:700,
          color: ev.price === "Free" ? "#9b7db8" : "#1c1630",
         
        }}>{ev.price}</span>

        <RegisterBtn hov={hov} />
      </div>
    </div>
  );
}

function RegisterBtn({ hov }: { hov: boolean }) {
  const [btnHov, setBtnHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setBtnHov(true)}
      onMouseLeave={() => setBtnHov(false)}
      style={{
        padding:"11px 22px",
        borderRadius:999,
        border:"none",
        background: btnHov ? "#7a5ea0" : "#9b7db8",
        color:"#fff",
        fontFamily:"'DM Sans',sans-serif",
        fontSize:11, fontWeight:700,
        letterSpacing:"0.14em", textTransform:"uppercase" as const,
        cursor:"pointer",
        boxShadow: btnHov
          ? "0 8px 24px rgba(140,110,180,0.42)"
          : "0 3px 10px rgba(140,110,180,0.22)",
        transform: btnHov ? "translateY(-2px) scale(1.04)" : "translateY(0) scale(1)",
        transition:"all 0.3s cubic-bezier(.34,1.56,.64,1)",
        whiteSpace:"nowrap" as const,
      }}
    >Register Now</button>
  );
}

/* ── Hero ── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section style={{ // Changed background to use banner2 image with a black shadow
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner2})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding:"110px 24px 96px",
      textAlign:"center",
      position:"relative",
      overflow:"hidden",
    }}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div style={{ position:"relative", zIndex:1 }}>
        {/* eyebrow */}
        <div style={{
          ...fade(mounted, 0),
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:12, marginBottom:28,
        }}>
          <div className={mounted ? "line-draw" : ""} style={{ // Changed line background to white
            width:40, height:1, background:"rgba(255,255,255,0.6)",
            transformOrigin:"right center",
          }} />
          <span style={{ // Changed text color to white
            fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
            letterSpacing:"0.22em", textTransform:"uppercase", color:"#fff",
          }}>Events</span>
          <div className={mounted ? "line-draw" : ""} style={{ // Changed line background to white
            width:40, height:1, background:"rgba(255,255,255,0.6)",
            transformOrigin:"left center",
          }} />
        </div>

        <h1 style={{
          ...fade(mounted, 130),
          fontFamily:"'Cormorant Garamond',serif", // Changed text color to white
          fontSize:"clamp(54px,9vw,96px)",
          fontWeight:500,
          color:"#fff", margin:"0 0 22px", lineHeight:1.08,
        }}>Where We Gather</h1>

        <p style={{
          ...fade(mounted, 260),
          fontFamily:"'DM Sans',sans-serif",
          fontSize:"clamp(15px,2vw,18px)",
          color:"rgba(255,255,255,0.9)", maxWidth:520, margin:"0 auto", lineHeight:1.75,
        }}>
          In-person and virtual gatherings designed to inspire, connect, and elevate.
        </p>

        <div style={{ ...fade(mounted, 380), marginTop:44 }}>
          <div className="bounce-arrow">↓</div> {/* Changed arrow color to white */}
        </div>
      </div>
    </section>
  );
}

/* ── Events List ── */
function EventsList() {
  const { ref, inView } = useInView(0.1);
  return (
    <section style={{ background:"#f5eef8", padding:"72px 24px 96px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>

        {/* section label */}
        <div ref={ref} style={{
          ...fade(inView, 0),
          textAlign:"center", marginBottom:48,
        }}>
          <p style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
            letterSpacing:"0.22em", textTransform:"uppercase", color:"#9b7db8",
            margin:"0 0 12px",
          }}>Upcoming Events</p>
          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(28px,4.5vw,46px)",
            fontWeight:500, 
            color:"#1c1630", margin:0,
          }}>Moments Worth Showing Up For</h2>
        </div>

        {/* cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {events.map((ev, i) => (
            <EventCard key={i} ev={ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function EventsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5eef8; }

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
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(210,190,255,0.28) 0%, transparent 68%);
          animation: floatA 13s ease-in-out infinite 4s;
        }

        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(18px,-14px) scale(1.04); }
          66%      { transform: translate(-10px,10px) scale(0.97); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-16px,12px) scale(1.05); }
          70%      { transform: translate(12px,-8px) scale(0.96); }
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
          0%,100% { transform: translateY(0);   opacity: 0.7; }
          50%      { transform: translateY(8px); opacity: 1;   }
        }
      `}</style>

      <Hero />
      <EventsList />
    </>
  );
}