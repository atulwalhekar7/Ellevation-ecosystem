import { useState, useRef, useEffect } from "react";
import banner6 from "../assets/banner6.avif";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "about" | "ecosystem" | "membership" | "impact" | "connect";

interface FormData {
  firstName: string; lastName: string; email: string; message: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Ecosystem", page: "ecosystem" },
  { label: "Membership", page: "membership" },
  { label: "Impact", page: "impact" },
  { label: "Connect", page: "connect" },
];

const ECOSYSTEM_ITEMS = [
  { title: "Corporate Alliances", desc: "Forging strategic paths between industry leaders and emerging female talent.", icon: "◈" },
  { title: "Resource Library", desc: "Exclusive access to playbooks, masterclasses, and professional toolkits.", icon: "✦" },
  { title: "Global Network", desc: "A boundaryless community of high-impact women across six continents.", icon: "✿" },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ current, nav }: { current: Page; nav: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ ...ns.nav, boxShadow: scrolled ? "0 4px 32px rgba(90,64,112,0.15)" : "0 2px 16px rgba(90,64,112,0.08)" }}>
      <div style={ns.inner}>
        {NAV_LINKS.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => nav(page)}
            style={{
              ...ns.link,
              ...(current === page ? ns.active : {}),
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

const ns: Record<string, React.CSSProperties> = {
  nav: {
    position: "sticky", top: 16, zIndex: 100,
    display: "flex", justifyContent: "center",
    padding: "0 24px", margin: "16px auto 0",
    transition: "box-shadow 0.3s ease",
  },
  inner: {
    display: "flex", alignItems: "center", gap: 4,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px)",
    borderRadius: 100,
    padding: "8px 12px",
    boxShadow: "0 2px 24px rgba(90,64,112,0.10)",
    flexWrap: "wrap" as const,
  },
  link: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.85rem", fontWeight: 500,
    color: "#5a4070", background: "transparent",
    border: "none", cursor: "pointer",
    padding: "8px 18px", borderRadius: 100,
    transition: "all 0.2s ease", whiteSpace: "nowrap" as const,
  },
  active: {
    background: "#1a0a2e", color: "#fff",
    boxShadow: "0 2px 12px rgba(26,10,46,0.25)",
  },
};

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function HomeSection({ nav }: { nav: (p: Page) => void }) {
  return (
    <div style={hp.page}>
      <div style={hp.bgGrad} />
      <div style={hp.blobTL} />
      <div style={hp.blobBR} />
      <div style={hp.grid}>
        <div style={hp.left}>
          <p style={hp.eyebrow}>ELLEVATION HUB</p>
          <h1 style={hp.headline}>The Professional Membership Ecosystem.</h1>
          <p style={hp.sub}>
            A unified platform for leadership, collective growth, and strategic impact. Where professional excellence meets community strength.
          </p>
          <div style={hp.btnRow}>
            <button style={hp.btnPrimary} onClick={() => nav("membership")}>JOIN THE HUB</button>
            <button style={hp.btnSecondary} onClick={() => nav("ecosystem")}>EXPLORE ECOSYSTEM</button>
          </div>
        </div>
        <div style={hp.card}>
          <div style={hp.cardTop}>
            <div style={hp.cardIcon}>❖</div>
            <span style={hp.cardBadge}>Professional Tier</span>
          </div>
          <p style={hp.cardDesc}>Access a world-class infrastructure built for modern leaders.</p>
          <div style={hp.cardFeatures}>
            {["Unified professional directory", "Strategic partner matchmaking", "Proprietary resource access", "Member-only summit invites"].map(f => (
              <div key={f} style={hp.feat}><span style={hp.check}>✓</span>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section style={ab.section}>
      <div style={ab.container}>
        <p style={ab.eye}>— OUR ARCHITECTURE —</p>
        <h2 style={ab.title}>One Main Website.<br/>Two Connected Journeys.</h2>
        <p style={ab.sub}>
          Ellevation Hub serves as the professional backbone of our community. While Ms. Ellevation focuses on personal transformation, the Hub provides the systemic tools, data, and directories that empower professional advancement.
        </p>
        <div style={ab.grid}>
          {ECOSYSTEM_ITEMS.map((item, i) => (
            <div key={i} style={ab.card}>
              <div style={ab.icon}>{item.icon}</div>
              <h3 style={ab.cardTitle}>{item.title}</h3>
              <p style={ab.cardText}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section style={sv.section}>
      <div style={sv.bannerBg} />
      <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
        <p style={sv.eye}>THE HUB ECOSYSTEM</p>
        <h2 style={sv.title}>Designed for Scale</h2>
        <div style={sv.grid}>
          {[
            { t: "Directory", d: "Connecting thousands of verified professionals." },
            { t: "Knowledge", d: "A centralized vault of leadership excellence." },
            { t: "Alliances", d: "Strategic bridges to corporate partners." },
          ].map(item => (
            <div key={item.t} style={sv.card}>
              <h4 style={sv.cardT}>{item.t}</h4>
              <p style={sv.cardD}>{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipSection() {
  return (
    <section style={jp.formSection}>
      <div style={jp.card}>
        <div style={jp.formHeader}>
          <h2 style={jp.formTitle}>Hub Membership</h2>
          <p style={jp.formSub}>Join the professional ecosystem where leaders thrive.</p>
        </div>
        <div style={jp.row}>
          <input style={jp.input} placeholder="First Name" />
          <input style={jp.input} placeholder="Last Name" />
        </div>
        <input style={{ ...jp.input, marginTop: 16 }} placeholder="Professional Email" />
        <select style={{ ...jp.input, ...jp.select, marginTop: 16 }}>
          <option>Select Your Industry</option>
          <option>Technology</option>
          <option>Education</option>
          <option>Leadership</option>
          <option>Other</option>
        </select>
        <button style={jp.submitBtn}>SUBMIT INTEREST</button>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section style={st.section}>
      <h2 style={st.bannerTitle}>Collective Impact</h2>
      <div style={st.grid}>
        {[
          { q: "The Hub directory turned a casual connection into a six-figure corporate partnership.", n: "Elena R." },
          { q: "The level of professional discourse within this ecosystem is simply unparalleled.", n: "Sarah W." }
        ].map((s, i) => (
          <div key={i} style={st.card}>
            <p style={st.quote}>"{s.q}"</p>
            <p style={st.name}>— {s.n}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConnectSection() {
  return (
    <section style={{ ...hp.page, minHeight: "60vh", background: "#fdfaff" }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: 600, margin: "0 auto" }}>
        <h2 style={hp.headline}>Connect with Us</h2>
        <p style={hp.sub}>Have questions about the Hub or interested in an enterprise partnership?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
          <input style={jp.input} placeholder="Email Address" />
          <textarea style={{ ...jp.input, minHeight: 120 }} placeholder="How can we help?" />
          <button style={jp.submitBtn}>SEND MESSAGE</button>
        </div>
      </div>
    </section>
  );
}

// ─── STYLES (Matching MsEllevation pattern) ──────────────────────────────────
const hp: Record<string, React.CSSProperties> = {
  page: { position:"relative", overflow:"hidden", minHeight:"85vh", display:"flex", alignItems:"center", padding:"60px 48px" },
  bgGrad: { 
    position: "absolute", inset: 0, 
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner6})`, 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    zIndex: 0 
  },
  blobTL: { position:"absolute", top:-120, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(90,64,112,0.15) 0%,transparent 70%)", animation:"floatBlob 10s ease-in-out infinite", zIndex:1 },
  blobBR: { position:"absolute", bottom:-100, right:-80, width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(26,10,46,0.1) 0%,transparent 70%)", animation:"floatBlob 13s ease-in-out infinite reverse", zIndex:1 },
  grid: { position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:48, alignItems:"center", maxWidth:1200, margin:"0 auto", width:"100%", animation:"fadeSlideUp 0.9s ease both" },
  left: { display:"flex", flexDirection:"column", gap:24 },
  eyebrow: { fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.22em", color:"#5a4070" },
  headline: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,4vw,3.6rem)", fontWeight:600, color:"#f6f5f8", lineHeight:1.1, margin:0 },
  sub: { fontFamily:"'DM Sans',sans-serif", fontSize:"1rem", fontWeight:400, color:"#f8f8f8", lineHeight:1.7, maxWidth:480 },
  btnRow: { display:"flex", gap:14, flexWrap:"wrap" as const },
  btnPrimary: { fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", padding:"14px 28px", borderRadius:100, border:"none", background:"#1a0a2e", color:"#fff", cursor:"pointer", transition:"all 0.2s ease", boxShadow:"0 4px 20px rgba(253, 253, 253, 0.3)" },
  btnSecondary: { fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", padding:"14px 28px", borderRadius:100, border:"2px solid #1a0a2e", background:"transparent", color:"#1a0a2e", cursor:"pointer", transition:"all 0.2s ease" },
  card: { background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)", borderRadius:24, padding:"32px", boxShadow:"0 8px 48px rgba(26,10,46,0.08)", border:"1px solid rgba(255,255,255,0.7)" },
  cardTop: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 },
  cardIcon: { width:48, height:48, borderRadius:"50%", background:"#5a4070", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" },
  cardBadge: { fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", fontWeight:600, color:"#1a0a2e", background:"rgba(90,64,112,0.1)", padding:"5px 14px", borderRadius:100 },
  cardDesc: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:500, color:"#1a0a2e", lineHeight:1.4, marginBottom:20 },
  cardFeatures: { display:"flex", flexDirection:"column", gap:10 },
  feat: { fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"#5a4070", display:"flex", alignItems:"center", gap:10 },
  check: { color:"#5a4070", fontWeight:700 },
};

const ab: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "#1a0a2e", marginBottom: 24, lineHeight: 1.1 },
  sub: { fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#5a4070", lineHeight: 1.8, maxWidth: 700, margin: "0 auto 60px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 },
  card: { padding: 32, background: "#f8f6fc", borderRadius: 20, textAlign: "left", border: "1px solid #ede8f5" },
  icon: { fontSize: "1.8rem", color: "#1a0a2e", marginBottom: 16 },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#1a0a2e", marginBottom: 10 },
  cardText: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#5a4070", lineHeight: 1.6 },
};

const sv: Record<string, React.CSSProperties> = {
  section: { position: "relative", padding: "100px 48px", overflow: "hidden" },
  bannerBg: { position: "absolute", inset: 0, background: "#1a0a2e", zIndex: 0 },
  eye: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#b4a0d0", letterSpacing: "0.2em", marginBottom: 16 },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#fff", marginBottom: 48 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" },
  card: { padding: 32, background: "rgba(255,255,255,0.05)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", textAlign: "left" },
  cardT: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#fff", marginBottom: 12 },
  cardD: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 },
};

const jp: Record<string, React.CSSProperties> = {
  formSection: { padding: "100px 24px", background: "#f8f6fc", display: "flex", justifyContent: "center" },
  card: { background: "#fff", padding: "48px", borderRadius: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.05)", width: "100%", maxWidth: 600 },
  formHeader: { textAlign: "center", marginBottom: 32 },
  formTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#1a0a2e", marginBottom: 8 },
  formSub: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#5a4070" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  input: { width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid #ede8f5", background: "#fcfaff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" },
  select: { appearance: "none" as const, cursor: "pointer" },
  submitBtn: { width: "100%", marginTop: 24, padding: "16px", borderRadius: 100, border: "none", background: "#1a0a2e", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", letterSpacing: "0.1em" },
};

const st: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff", textAlign: "center" },
  bannerTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", color: "#1a0a2e", marginBottom: 48 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" },
  card: { padding: 40, border: "1px solid #ede8f5", borderRadius: 24, textAlign: "left" },
  quote: { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#5a4070", lineHeight: 1.6, marginBottom: 20 },
  name: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#1a0a2e" },
};

// ─── ROOT HUB PAGE ───────────────────────────────────────────────────────────
export default function EllevationHub() {
  const [page, setPage] = useState<Page>("home");

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#fdfaff", minHeight:"100vh", color:"#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus, select:focus, textarea:focus { border-color: #5a4070!important; box-shadow: 0 0 0 3px rgba(90,64,112,0.1); }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatBlob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-15px) scale(1.04); } 66% { transform: translate(-10px,10px) scale(0.97); } }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        button:active { transform: translateY(0); }
      `}</style>

      <Navbar current={page} nav={nav} />

      {page === "home"       && <HomeSection nav={nav} />}
      {page === "about"      && <AboutSection />}
      {page === "ecosystem"  && <EcosystemSection />}
      {page === "membership" && <MembershipSection />}
      {page === "impact"     && <ImpactSection />}
      {page === "connect"    && <ConnectSection />}
    </div>
  );
}