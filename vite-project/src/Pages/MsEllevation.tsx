import { useState, useRef, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "about" | "services" | "stories" | "join";
type MembershipTier = "FOUNDATION" | "ELLEVATE" | "LUMINARY";

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  location: string; profession: string; referral: string; goals: string; agree: boolean;
}
interface FormErrors {
  firstName?: string; lastName?: string; email?: string; phone?: string;
  location?: string; profession?: string; referral?: string; goals?: string; agree?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Services", page: "services" },
  { label: "Transformational Stories", page: "stories" },
  { label: "Start Your Journey", page: "join" },
];

const TIERS: MembershipTier[] = ["FOUNDATION", "ELLEVATE", "LUMINARY"];
const TIER_META: Record<MembershipTier, { label: string; tagline: string; color: string }> = {
  FOUNDATION: { label: "Foundation", tagline: "Begin your journey with Ellevation's core community.", color: "#b89c6e" },
  ELLEVATE:   { label: "Ellevate",   tagline: "Step into an elevated circle of ambitious women.",    color: "#b07fb4" },
  LUMINARY:   { label: "Luminary",   tagline: "Lead, inspire, and illuminate from the pinnacle.",    color: "#e87db0" },
};
const REFERRAL_OPTIONS = ["Social Media","Friend or Colleague","Event","Search Engine","Press / Media","Other"];
const emptyForm = (): FormData => ({ firstName:"",lastName:"",email:"",phone:"",location:"",profession:"",referral:"",goals:"",agree:false });

function validateForm(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (!data.firstName.trim()) e.firstName = "First name is required.";
  if (!data.lastName.trim())  e.lastName  = "Last name is required.";
  if (!data.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email address.";
  if (data.phone && !/^\+?[\d\s\-().]{7,}$/.test(data.phone)) e.phone = "Enter a valid phone number.";
  if (!data.location.trim())   e.location   = "City, State, Country is required.";
  if (!data.profession.trim()) e.profession = "Profession / Industry is required.";
  if (!data.referral) e.referral = "Please select how you heard about us.";
  if (!data.goals.trim()) e.goals = "Please share what you hope to gain.";
  if (!data.agree) e.agree = "You must agree to the Community Guidelines and Terms.";
  return e;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ current, nav }: { current: Page; nav: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ ...ns.nav, boxShadow: scrolled ? "0 4px 32px rgba(180,120,200,0.13)" : "0 2px 16px rgba(180,120,200,0.07)" }}>
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
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(16px)",
    borderRadius: 100,
    padding: "8px 12px",
    boxShadow: "0 2px 24px rgba(180,120,200,0.10)",
    flexWrap: "wrap" as const,
  },
  link: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.88rem", fontWeight: 400,
    color: "#4a3060", background: "transparent",
    border: "none", cursor: "pointer",
    padding: "8px 18px", borderRadius: 100,
    transition: "all 0.2s ease", whiteSpace: "nowrap" as const,
  },
  active: {
    background: "#2d1f3d", color: "#fff",
    fontWeight: 500,
    boxShadow: "0 2px 12px rgba(45,31,61,0.25)",
  },
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div style={hp.page}>
      {/* Pink-lavender gradient bg */}
      <div style={hp.bgGrad} />
      <div style={hp.blobTL} />
      <div style={hp.blobBR} />

      <div style={hp.grid}>
        {/* LEFT */}
        <div style={hp.left}>
          <p style={hp.eyebrow}>MS. ELLEVATION</p>
          <h1 style={hp.headline}>
            A beautiful becoming for women ready to rise with softness and strength.
          </h1>
          <p style={hp.sub}>
            A deeply personal, exquisitely curated transformation journey. Coaching, clarity, courage — and the community to hold you through it all.
          </p>
          <div style={hp.btnRow}>
            <button style={hp.btnPrimary} onClick={() => nav("join")}>START YOUR JOURNEY</button>
            <button style={hp.btnSecondary} onClick={() => nav("about")}>EXPLORE MORE</button>
          </div>
        </div>

        {/* RIGHT – card */}
        <div style={hp.card}>
          <div style={hp.cardTop}>
            <div style={hp.cardIcon}>☆</div>
            <span style={hp.cardBadge}>Ms. Ellevation</span>
          </div>
          <p style={hp.cardDesc}>
            Designed as a premium internal journey within the Ellevation website.
          </p>
          <div style={hp.cardFeatures}>
            {["Signature coaching journeys","Personal transformation roadmap","Elite community sisterhood","World-class facilitators"].map(f => (
              <div key={f} style={hp.feat}><span style={hp.check}>✓</span>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const hp: Record<string, React.CSSProperties> = {
  page: { position:"relative", overflow:"hidden", minHeight:"90vh", display:"flex", alignItems:"center", padding:"60px 48px 80px" },
  bgGrad: { position:"absolute", inset:0, background:"linear-gradient(135deg,#fce8f0 0%,#f0d6f5 40%,#e4d0f8 70%,#fce8f0 100%)", zIndex:0 },
  blobTL: { position:"absolute", top:-120, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,200,220,0.5) 0%,transparent 70%)", animation:"floatBlob 10s ease-in-out infinite", zIndex:1 },
  blobBR: { position:"absolute", bottom:-100, right:-80, width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(200,170,240,0.45) 0%,transparent 70%)", animation:"floatBlob 13s ease-in-out infinite reverse", zIndex:1 },
  grid: { position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", maxWidth:1200, margin:"0 auto", width:"100%", animation:"fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) both" },
  left: { display:"flex", flexDirection:"column", gap:24 },
  eyebrow: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.22em", color:"#9060b0" },
  headline: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,4vw,3.6rem)", fontWeight:600, color:"#2d1f3d", lineHeight:1.12, margin:0 },
  sub: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:300, color:"#5a3a7a", lineHeight:1.75, maxWidth:460 },
  btnRow: { display:"flex", gap:14, flexWrap:"wrap" as const },
  btnPrimary: { fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#2d1f3d", color:"#fff", cursor:"pointer", transition:"all 0.2s ease", boxShadow:"0 4px 20px rgba(45,31,61,0.3)" },
  btnSecondary: { fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"2px solid #2d1f3d", background:"transparent", color:"#2d1f3d", cursor:"pointer", transition:"all 0.2s ease" },
  card: { background:"rgba(255,255,255,0.82)", backdropFilter:"blur(20px)", borderRadius:24, padding:"32px", boxShadow:"0 8px 48px rgba(120,80,180,0.14)", border:"1px solid rgba(255,255,255,0.7)" },
  cardTop: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 },
  cardIcon: { width:48, height:48, borderRadius:"50%", background:"#2d1f3d", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" },
  cardBadge: { fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", fontWeight:500, color:"#9060b0", background:"rgba(180,130,220,0.15)", padding:"5px 14px", borderRadius:100 },
  cardDesc: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:500, color:"#2d1f3d", lineHeight:1.5, marginBottom:20 },
  cardFeatures: { display:"flex", flexDirection:"column", gap:10 },
  feat: { fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", color:"#5a3a6a", display:"flex", alignItems:"center", gap:10 },
  check: { color:"#9060b0", fontWeight:700, fontSize:"0.9rem" },
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div>
      {/* Banner */}
      <section style={ab.banner}>
        <div style={ab.bannerBg} />
        <div style={ab.bannerBlob1} />
        <div style={ab.bannerBlob2} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p style={ab.bannerEye}>MS. ELLEVATION</p>
          <h1 style={ab.bannerTitle}>Become the Woman<br />You Were Born to Be</h1>
          <p style={ab.bannerSub}>A deeply personal, exquisitely curated transformation journey.<br/>Coaching, clarity, courage — and the community to hold you through it all.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:32 }}>
            <button style={ab.btnD} onClick={() => nav("join")}>START YOUR JOURNEY</button>
            <button style={ab.btnL} onClick={() => nav("services")}>EXPLORE MORE</button>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section style={ab.featSection}>
        {[
          { icon:"✦", title:"Personal Transformation", desc:"Guided programs designed to unlock your unique potential." },
          { icon:"◈", title:"1-on-1 Coaching",         desc:"Intimate, tailored support from world-class coaches." },
          { icon:"✿", title:"Community Sisterhood",     desc:"A sacred circle of women walking this journey together." },
        ].map((c) => (
          <div key={c.title} style={ab.featCard}>
            <div style={ab.featIcon}>{c.icon}</div>
            <h3 style={ab.featTitle}>{c.title}</h3>
            <p style={ab.featDesc}>{c.desc}</p>
          </div>
        ))}
      </section>

      {/* Stories teaser */}
      <section style={ab.storiesTeaser}>
        <div style={ab.storiesTeaserBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
          <p style={ab.tEye}>— TRANSFORMATIONAL STORIES —</p>
          <h2 style={ab.tTitle}>She Did It. So Can You.</h2>
          <p style={ab.tSub}>Real women, real transformations. Discover how Ms. Ellevation has changed lives.</p>
          <button style={ab.tBtn} onClick={() => nav("stories")}>READ THEIR STORIES</button>
        </div>
      </section>
    </div>
  );
}

const ab: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", minHeight:520, display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 48px" },
  bannerBg: { position:"absolute", inset:0, background:"linear-gradient(160deg,#3a2040 0%,#5a3050 40%,#7a4060 70%,#4a2848 100%)", zIndex:0 },
  bannerBlob1: { position:"absolute", top:-80, right:-60, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(220,140,160,0.35) 0%,transparent 70%)", animation:"floatBlob 9s ease-in-out infinite", zIndex:1 },
  bannerBlob2: { position:"absolute", bottom:-60, left:-40, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(180,100,140,0.3) 0%,transparent 70%)", animation:"floatBlob 12s ease-in-out infinite reverse", zIndex:1 },
  bannerEye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.25em", color:"#e8b0a0", marginBottom:16 },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:600, color:"#fdf0f5", lineHeight:1.15, marginBottom:20 },
  bannerSub: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:300, color:"rgba(253,240,245,0.75)", lineHeight:1.7, maxWidth:540, margin:"0 auto" },
  btnD: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#c0705a", color:"#fff", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(192,112,90,0.35)" },
  btnL: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"2px solid rgba(253,240,245,0.5)", background:"transparent", color:"#fdf0f5", cursor:"pointer" },
  featSection: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, maxWidth:1100, margin:"0 auto", padding:"80px 48px" },
  featCard: { background:"#fff", borderRadius:20, padding:"36px 28px", boxShadow:"0 4px 32px rgba(120,60,120,0.08)", border:"1px solid #f0e0f0", transition:"transform 0.2s ease" },
  featIcon: { fontSize:"1.6rem", color:"#b07fb4", marginBottom:16 },
  featTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:600, color:"#2d1f3d", marginBottom:10 },
  featDesc: { fontFamily:"'Jost',sans-serif", fontSize:"0.9rem", fontWeight:300, color:"#7a5a8a", lineHeight:1.65 },
  storiesTeaser: { position:"relative", overflow:"hidden", padding:"80px 48px", textAlign:"center" },
  storiesTeaserBg: { position:"absolute", inset:0, background:"#f8f4f0", zIndex:0 },
  tEye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#b89c6e", marginBottom:16, position:"relative", zIndex:1 },
  tTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:600, color:"#2d1f3d", marginBottom:16, position:"relative", zIndex:1 },
  tSub: { fontFamily:"'Jost',sans-serif", fontSize:"0.95rem", fontWeight:300, color:"#7a6a5a", lineHeight:1.7, maxWidth:520, margin:"0 auto 32px", position:"relative", zIndex:1 },
  tBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"13px 32px", borderRadius:100, border:"2px solid #2d1f3d", background:"transparent", color:"#2d1f3d", cursor:"pointer", position:"relative", zIndex:1 },
};

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ nav }: { nav: (p: Page) => void }) {
  const plans = [
    { title:"Transformation Coaching", price:"From $299/mo", popular:false, features:["Weekly 1:1 sessions","Personalised growth plan","Email support","Resource library"] },
    { title:"Intensive Retreat",        price:"From $1,499",   popular:true,  features:["3-day immersive experience","Group & private sessions","Luxury venue","Post-retreat support"] },
    { title:"Group Circles",            price:"From $97/mo",   popular:false, features:["Monthly group sessions","Community forum access","Guided journaling","Accountability partners"] },
  ];
  return (
    <div>
      {/* Banner */}
      <section style={sv.banner}>
        <div style={sv.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p style={sv.eye}>— OUR SERVICES —</p>
          <h1 style={sv.title}>Curated for Your Elevation</h1>
          <p style={sv.sub}>Choose the path that speaks to where you are and where you're meant to go.</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={sv.section}>
        <div style={sv.grid}>
          {plans.map((p) => (
            <div key={p.title} style={{ ...sv.card, ...(p.popular ? sv.cardPopular : {}) }}>
              {p.popular && <div style={sv.popularBadge}>MOST POPULAR</div>}
              <h3 style={{ ...sv.cardTitle, ...(p.popular ? { color:"#fff" } : {}) }}>{p.title}</h3>
              <p style={{ ...sv.cardPrice, ...(p.popular ? { color:"#f0b0a0" } : {}) }}>{p.price}</p>
              <ul style={sv.list}>
                {p.features.map(f => (
                  <li key={f} style={{ ...sv.listItem, ...(p.popular ? { color:"rgba(253,240,245,0.85)" } : {}) }}>
                    <span style={sv.bullet}>•</span>{f}
                  </li>
                ))}
              </ul>
              <button
                style={{ ...sv.bookBtn, ...(p.popular ? sv.bookBtnDark : {}) }}
                onClick={() => nav("join")}
              >BOOK NOW</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const sv: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center" },
  bannerBg: { position:"absolute", inset:0, background:"linear-gradient(135deg,#fdf6f0 0%,#f5ece8 100%)", zIndex:0 },
  eye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#b89c6e", marginBottom:16, position:"relative", zIndex:1 },
  title: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:600, color:"#2d1f3d", marginBottom:16, position:"relative", zIndex:1 },
  sub: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:300, color:"#7a5a4a", lineHeight:1.7, position:"relative", zIndex:1, maxWidth:500, margin:"0 auto" },
  section: { padding:"60px 48px 96px", background:"#f8f4f0" },
  grid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1100, margin:"0 auto" },
  card: { background:"#fff", borderRadius:20, padding:"40px 32px 36px", boxShadow:"0 4px 32px rgba(100,60,60,0.08)", border:"1px solid #ede0d8", position:"relative", display:"flex", flexDirection:"column", gap:0 },
  cardPopular: { background:"#3a2040", border:"none", boxShadow:"0 8px 48px rgba(58,32,64,0.30)" },
  popularBadge: { position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", background:"#c0705a", color:"#fff", padding:"5px 18px", borderRadius:100 },
  cardTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:600, color:"#2d1f3d", marginBottom:8 },
  cardPrice: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:500, color:"#b89c6e", marginBottom:24 },
  list: { listStyle:"none", display:"flex", flexDirection:"column", gap:12, marginBottom:32, padding:0 },
  listItem: { fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", color:"#5a3a3a", display:"flex", alignItems:"center", gap:10 },
  bullet: { color:"#b89c6e", fontWeight:700 },
  bookBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"13px", borderRadius:100, border:"2px solid #2d1f3d", background:"transparent", color:"#2d1f3d", cursor:"pointer", transition:"all 0.2s ease", marginTop:"auto" },
  bookBtnDark: { border:"none", background:"#c0705a", color:"#fff", boxShadow:"0 4px 20px rgba(192,112,90,0.35)" },
};

// ─── STORIES PAGE ─────────────────────────────────────────────────────────────
const STORIES = [
  { quote:"After 18 years in a career that no longer lit me up, Ms. Ellevation gave me the courage to walk away and build something of my own. I've never looked back.", name:"Michelle T.", role:"Former Corporate Executive" },
  { quote:"I came in broken and overwhelmed. I left whole. Ms. Ellevation gave me tools, community, and the belief that I was worth investing in.", name:"Kezia O.", role:"Mother & Entrepreneur" },
  { quote:"The coaching was extraordinary. But more than that, it was finding my tribe — women who hold each other to a higher standard with so much love.", name:"Sasha R.", role:"Nonprofit Director" },
  { quote:"I had everything the world said I should want and still felt empty. This journey reconnected me to what truly matters and who I truly am.", name:"Yemi A.", role:"Healthcare Professional" },
];

function StoriesPage() {
  return (
    <div>
      {/* Banner */}
      <section style={st.banner}>
        <div style={st.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <h1 style={st.bannerTitle}>Transformational Stories</h1>
          <p style={st.bannerSub}>Real women. Real journeys. Real transformation.</p>
        </div>
      </section>

      {/* Stories grid */}
      <section style={st.section}>
        <div style={st.grid}>
          {STORIES.map((s) => (
            <div key={s.name} style={st.card}>
              <div style={st.quoteIcon}>"</div>
              <p style={st.quote}>{s.quote}</p>
              <div style={st.author}>
                <p style={st.name}>{s.name}</p>
                <p style={st.role}>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const st: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center" },
  bannerBg: { position:"absolute", inset:0, background:"linear-gradient(160deg,#2e1f22 0%,#3d2828 50%,#2e1f22 100%)", zIndex:0 },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:600, color:"#fdf0f5", marginBottom:16, position:"relative", zIndex:1 },
  bannerSub: { fontFamily:"'Jost',sans-serif", fontSize:"0.95rem", fontWeight:300, color:"rgba(253,240,245,0.7)", position:"relative", zIndex:1 },
  section: { background:"#f8f4f0", padding:"72px 48px 96px" },
  grid: { display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24, maxWidth:1000, margin:"0 auto" },
  card: { background:"#fff", borderRadius:20, padding:"40px 36px 36px", boxShadow:"0 4px 32px rgba(100,60,60,0.07)", border:"1px solid #ede0d8", display:"flex", flexDirection:"column", gap:20 },
  quoteIcon: { fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", color:"#d4b896", lineHeight:1, height:32, display:"block" },
  quote: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontStyle:"italic", color:"#2d1f3d", lineHeight:1.75, flexGrow:1 },
  author: { borderTop:"1px solid #f0e0d0", paddingTop:20 },
  name: { fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", fontWeight:600, color:"#2d1f3d", marginBottom:4 },
  role: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.14em", color:"#9a8a7a" },
};

// ─── JOIN PAGE (Membership Form) ──────────────────────────────────────────────
function JoinPage() {
  const [activeTier, setActiveTier] = useState<MembershipTier>("FOUNDATION");
  const [forms, setForms] = useState<Record<MembershipTier, FormData>>({ FOUNDATION: emptyForm(), ELLEVATE: emptyForm(), LUMINARY: emptyForm() });
  const [errors, setErrors] = useState<Record<MembershipTier, FormErrors>>({ FOUNDATION: {}, ELLEVATE: {}, LUMINARY: {} });
  const [submitted, setSubmitted] = useState<Record<MembershipTier, boolean>>({ FOUNDATION: false, ELLEVATE: false, LUMINARY: false });
  const [formVisible, setFormVisible] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  const handleTierChange = (tier: MembershipTier) => {
    if (tier === activeTier) return;
    setFormVisible(false);
    setTimeout(() => { setActiveTier(tier); setFormVisible(true); }, 350);
  };
  const handleChange = (tier: MembershipTier, field: keyof FormData, value: string | boolean) => {
    setForms(prev => ({ ...prev, [tier]: { ...prev[tier], [field]: value } }));
    if (errors[tier][field as keyof FormErrors]) setErrors(prev => ({ ...prev, [tier]: { ...prev[tier], [field]: undefined } }));
  };
  const handleSubmit = (tier: MembershipTier) => {
    const errs = validateForm(forms[tier]);
    if (Object.keys(errs).length > 0) {
      setErrors(prev => ({ ...prev, [tier]: errs }));
      formRef.current?.querySelector("[data-error]")?.scrollIntoView({ behavior:"smooth", block:"center" });
      return;
    }
    setSubmitted(prev => ({ ...prev, [tier]: true }));
  };

  const meta = TIER_META[activeTier];
  const form = forms[activeTier];
  const errs = errors[activeTier];
  const isSubmitted = submitted[activeTier];

  return (
    <div>
      {/* Banner */}
      <section style={jp.banner}>
        <div style={jp.bannerBg} />
        <div style={jp.blobL} />
        <div style={jp.blobR} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <div style={jp.eyebrowRow}><span style={jp.line}/><span style={jp.eyebrowTxt}>MEMBERSHIP</span><span style={jp.line}/></div>
          <h1 style={jp.bannerTitle}>Join Ellevation</h1>
        </div>
      </section>

      {/* Form section */}
      <section style={jp.formSection}>
        <div style={jp.tabsRow}>
          {TIERS.map(tier => (
            <button key={tier} style={{ ...jp.tabBtn, ...(activeTier === tier ? { ...jp.tabActive, background: TIER_META[tier].color } : {}) }} onClick={() => handleTierChange(tier)}>{tier}</button>
          ))}
        </div>

        <div ref={formRef} style={{ ...jp.card, opacity: formVisible?1:0, transform: formVisible?"translateY(0)":"translateY(24px)", transition:"opacity 0.35s ease,transform 0.35s ease", borderTop:`3px solid ${meta.color}` }}>
          {isSubmitted ? (
            <div style={jp.successBox}>
              <div style={{ ...jp.successIcon, color: meta.color }}>✦</div>
              <h2 style={{ ...jp.successTitle, color: meta.color }}>Application Submitted!</h2>
              <p style={jp.successText}>Thank you for applying for <strong>{meta.label} Membership</strong>. Our team will be in touch within 48 hours.</p>
              <button style={{ ...jp.submitBtn, background: meta.color }} onClick={() => setSubmitted(prev => ({ ...prev, [activeTier]: false }))}>SUBMIT ANOTHER</button>
            </div>
          ) : (
            <>
              <div style={jp.formHeader}>
                <h2 style={jp.formTitle}>Apply for {meta.label} Membership</h2>
                <p style={jp.formSub}>Complete this form and our team will be in touch within 48 hours.</p>
                <p style={{ ...jp.tagline, color: meta.color }}>{meta.tagline}</p>
              </div>
              <div style={jp.row}>
                <Field label="First Name *" value={form.firstName} error={errs.firstName} onChange={v => handleChange(activeTier,"firstName",v)} />
                <Field label="Last Name *"  value={form.lastName}  error={errs.lastName}  onChange={v => handleChange(activeTier,"lastName",v)} />
              </div>
              <Field label="Email Address *" type="email" value={form.email} error={errs.email} onChange={v => handleChange(activeTier,"email",v)} />
              <Field label="Phone Number" type="tel" value={form.phone} error={errs.phone} onChange={v => handleChange(activeTier,"phone",v)} />
              <Field label="City, State, Country *" value={form.location} error={errs.location} onChange={v => handleChange(activeTier,"location",v)} />
              <Field label="Profession / Industry *" value={form.profession} error={errs.profession} onChange={v => handleChange(activeTier,"profession",v)} />
              {/* Referral select */}
              <div style={jp.fieldWrap} data-error={errs.referral?"true":undefined}>
                <select style={{ ...jp.input, ...jp.select, color: form.referral?"#2d1f3d":"#b89fae" }} value={form.referral} onChange={e => handleChange(activeTier,"referral",e.target.value)}>
                  <option value="" disabled>How did you hear about us? *</option>
                  {REFERRAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {errs.referral && <span style={jp.errMsg}>{errs.referral}</span>}
              </div>
              {/* Goals textarea */}
              <div style={jp.fieldWrap} data-error={errs.goals?"true":undefined}>
                <textarea style={{ ...jp.input, ...jp.textarea, ...(errs.goals?jp.inputErr:{}) }} placeholder="What are you hoping to gain from your Ellevation membership? *" value={form.goals} onChange={e => handleChange(activeTier,"goals",e.target.value)} />
                {errs.goals && <span style={jp.errMsg}>{errs.goals}</span>}
              </div>
              {/* Agree */}
              <div style={jp.agreeRow} data-error={errs.agree?"true":undefined}>
                <label style={jp.agreeLabel}>
                  <input type="checkbox" checked={form.agree} onChange={e => handleChange(activeTier,"agree",e.target.checked)} style={jp.checkbox} />
                  <span style={jp.agreeText}>I agree to the Ellevation <a href="#" style={{ ...jp.agreeLink, color: meta.color }}>Community Guidelines</a> and <a href="#" style={{ ...jp.agreeLink, color: meta.color }}>Terms of Membership</a>.</span>
                </label>
                {errs.agree && <span style={jp.errMsg}>{errs.agree}</span>}
              </div>
              <button style={{ ...jp.submitBtn, background: meta.color }} onClick={() => handleSubmit(activeTier)}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity="0.88"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity="1"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; }}>
                SUBMIT APPLICATION
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, error, onChange, type="text" }: { label:string; value:string; error?:string; onChange:(v:string)=>void; type?:string }) {
  return (
    <div style={jp.fieldWrap} data-error={error?"true":undefined}>
      <input style={{ ...jp.input, ...(error?jp.inputErr:{}) }} placeholder={label} type={type} value={value} onChange={e => onChange(e.target.value)} />
      {error && <span style={jp.errMsg}>{error}</span>}
    </div>
  );
}

const jp: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 24px 72px", textAlign:"center", minHeight:260, display:"flex", alignItems:"center", justifyContent:"center" },
  bannerBg: { position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 80% at 50% 50%,#f0d6f5 0%,#e8d0f0 30%,#d8c0ee 60%,#c8b0e8 100%)", zIndex:0 },
  blobL: { position:"absolute", top:-60, left:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,182,210,0.45) 0%,transparent 70%)", animation:"floatBlob 8s ease-in-out infinite", zIndex:1 },
  blobR: { position:"absolute", bottom:-80, right:-60, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(182,140,210,0.38) 0%,transparent 70%)", animation:"floatBlob 11s ease-in-out infinite reverse", zIndex:1 },
  eyebrowRow: { display:"flex", alignItems:"center", gap:12, justifyContent:"center", marginBottom:16 },
  line: { display:"inline-block", width:40, height:1, background:"#7a5a8a" },
  eyebrowTxt: { fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.28em", color:"#7a5a8a" },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:600, color:"#2d1f3d" },
  formSection: { maxWidth:780, margin:"0 auto", padding:"64px 24px 96px", animation:"fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) 0.1s both" },
  tabsRow: { display:"flex", justifyContent:"center", gap:12, marginBottom:36, flexWrap:"wrap" as const },
  tabBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"10px 28px", borderRadius:100, border:"1.5px solid #d4bcd0", background:"transparent", color:"#8a6a8a", cursor:"pointer", transition:"all 0.25s ease" },
  tabActive: { color:"#fff", border:"1.5px solid transparent", boxShadow:"0 4px 20px rgba(180,100,160,0.28)", transform:"translateY(-1px)" },
  card: { background:"#fff", borderRadius:20, padding:"48px 52px 52px", boxShadow:"0 8px 60px rgba(100,60,120,0.10),0 2px 16px rgba(100,60,120,0.06)" },
  formHeader: { textAlign:"center", marginBottom:40 },
  formTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:600, color:"#2d1f3d", marginBottom:8 },
  formSub: { fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", color:"#9a8aaa", fontWeight:300, marginBottom:8 },
  tagline: { fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", fontWeight:500, letterSpacing:"0.05em", marginTop:6 },
  row: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 },
  fieldWrap: { display:"flex", flexDirection:"column", marginBottom:16 },
  input: { fontFamily:"'Jost',sans-serif", fontSize:"0.9rem", fontWeight:400, padding:"13px 16px", borderRadius:10, border:"1.5px solid #e8d8e8", background:"#fdf8fc", color:"#2d1f3d", transition:"border-color 0.2s,box-shadow 0.2s", width:"100%" },
  inputErr: { borderColor:"#e06090", background:"#fff8f9" },
  select: { appearance:"none", WebkitAppearance:"none", cursor:"pointer", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239a7ab0' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center", paddingRight:40 },
  textarea: { resize:"vertical", minHeight:110, lineHeight:1.6 },
  errMsg: { fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", color:"#d0507a", marginTop:5, paddingLeft:4 },
  agreeRow: { marginBottom:28, marginTop:4 },
  agreeLabel: { display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer" },
  checkbox: { marginTop:3, accentColor:"#c07090", width:15, height:15, flexShrink:0 },
  agreeText: { fontFamily:"'Jost',sans-serif", fontSize:"0.83rem", color:"#7a6a8a", lineHeight:1.5 },
  agreeLink: { textDecoration:"underline", textUnderlineOffset:"2px" },
  submitBtn: { width:"100%", fontFamily:"'Jost',sans-serif", fontSize:"0.78rem", fontWeight:600, letterSpacing:"0.18em", color:"#fff", border:"none", borderRadius:10, padding:"15px 24px", cursor:"pointer", transition:"opacity 0.2s,transform 0.2s,box-shadow 0.2s", boxShadow:"0 6px 24px rgba(180,100,150,0.30)" },
  successBox: { textAlign:"center", padding:"40px 24px" },
  successIcon: { fontSize:"2.5rem", marginBottom:16, display:"block" },
  successTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:600, marginBottom:12 },
  successText: { fontFamily:"'Jost',sans-serif", fontSize:"0.95rem", color:"#7a6a8a", lineHeight:1.7, marginBottom:32 },
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function EllevationPage() {
  const [page, setPage] = useState<Page>("home");

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily:"'Jost',sans-serif", background:"#fdf6f9", minHeight:"100vh", color:"#2d1f3d" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input::placeholder,textarea::placeholder{color:#b89fae;}
        select option{color:#2d1f3d;}
        input:focus,textarea:focus,select:focus{outline:none;border-color:#d4a0c0!important;box-shadow:0 0 0 3px rgba(212,160,192,0.15);}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
        @keyframes floatBlob{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(20px,-15px) scale(1.04);}66%{transform:translate(-10px,10px) scale(0.97);}}
        button:hover{opacity:0.88;}
      `}</style>

      <Navbar current={page} nav={nav} />

      {page === "home"     && <HomePage     nav={nav} />}
      {page === "about"    && <AboutPage    nav={nav} />}
      {page === "services" && <ServicesPage nav={nav} />}
      {page === "stories"  && <StoriesPage />}
      {page === "join"     && <JoinPage />}
    </div>
  );
}