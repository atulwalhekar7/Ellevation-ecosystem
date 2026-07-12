import { useState, useRef, useEffect } from "react";
import banner4 from "../assets/banner4.avif";
import banner5 from "../assets/banner5.avif";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "about" | "journey" | "programs" | "events" | "stories" | "join";
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
  { label: "Your Journey", page: "journey" },
  { label: "Programs", page: "programs" },
  { label: "Events", page: "events" },
  { label: "Stories", page: "stories" },
  { label: "Start Your Journey", page: "join" },
];

const TIERS: MembershipTier[] = ["FOUNDATION", "ELLEVATE", "LUMINARY"];
const TIER_META: Record<MembershipTier, { label: string; tagline: string; color: string }> = {
  FOUNDATION: { label: "Foundation", tagline: "Begin your journey with Ellevation's core community.", color: "#662369" },
  ELLEVATE:   { label: "Ellevate",   tagline: "Step into an elevated circle of ambitious women.",    color: "#b51279" },
  LUMINARY:   { label: "Luminary",   tagline: "Lead, inspire, and illuminate from the pinnacle.",    color: "#e028a0" },
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
    <nav className="ms-nav" style={{ ...ns.nav, boxShadow: scrolled ? "0 4px 32px rgba(102,35,105,0.18)" : "0 2px 16px rgba(102,35,105,0.08)" }}>
      <div className="ns-inner" style={ns.inner}>
        {NAV_LINKS.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => nav(page)}
            className={`ns-link ${current === page ? 'active' : ''}`}
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
    position: "sticky", top: 79, zIndex: 100,
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
    boxShadow: "0 2px 24px rgba(102,35,105,0.12)",
    flexWrap: "wrap" as const,
  },
  link: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.86rem", fontWeight: 400,
    color: "#662369", background: "transparent",
    border: "none", cursor: "pointer",
    padding: "8px 16px", borderRadius: 100,
    transition: "all 0.2s ease", whiteSpace: "nowrap" as const,
  },
  active: {
    background: "#d11a8e", color: "#fff",
    fontWeight: 500,
    boxShadow: "0 2px 12px rgba(26,10,46,0.25)",
  },
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="hp-page" style={hp.page}>
      <div className="hp-bg-grad" style={hp.bgGrad} />
      <div style={hp.blobTL} />
      <div style={hp.blobBR} />

      <div style={hp.grid}>
        <div style={hp.left}>
          <p style={hp.eyebrow}>MS. ELLEVATION</p>
          <h1 className="hp-headline" style={hp.headline}>
            A beautiful becoming for women ready to rise with softness and strength.
          </h1>
          <p className="hp-sub" style={hp.sub}>
            A deeply personal, exquisitely curated transformation journey for women 17–25. Coaching, clarity, courage — and the community to hold you through it all.
          </p>
          <div style={hp.btnRow}>
            <button style={hp.btnPrimary} onClick={() => nav("join")}>START YOUR JOURNEY</button>
            <button style={hp.btnSecondary} onClick={() => nav("about")}>EXPLORE MORE</button>
          </div>
        </div>

        <div className="hp-card" style={hp.card}>
          <div style={hp.cardTop}>
            {/* <div style={hp.cardIcon}>☆</div> */}
            <span style={hp.cardBadge}>Ms. Ellevation</span>
          </div>
          <p className="hp-card-desc" style={hp.cardDesc}>
            Designed as a premium internal journey within the Ellevation website.
          </p>
          <div style={hp.cardFeatures}>
            {["Signature coaching journeys","Personal transformation roadmap","Elite community sisterhood","World-class facilitators"].map(f => (
              <div key={f} className="hp-feat" style={hp.feat}><span style={hp.check}>✓</span>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const hp: Record<string, React.CSSProperties> = {
  page: { position:"relative", overflow:"hidden", minHeight:"90vh", display:"flex", alignItems:"center", padding:"60px 48px 80px" },
  bgGrad: {
    position:"absolute", inset:0,
    background:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner4})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex:0
  },
  blobTL: { position:"absolute", top:-120, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(102,35,105,0.18) 0%,transparent 70%)", animation:"floatBlob 10s ease-in-out infinite", zIndex:1 },
  blobBR: { position:"absolute", bottom:-100, right:-80, width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(26,10,46,0.1) 0%,transparent 70%)", animation:"floatBlob 13s ease-in-out infinite reverse", zIndex:1 },
  grid: { position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", maxWidth:1200, margin:"0 auto", width:"100%", animation:"fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) both" },
  left: { display:"flex", flexDirection:"column", gap:24 },
  eyebrow: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.22em", color:"#ffffff" },
  headline: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,4vw,3.6rem)", fontWeight:600, color:"#ffffff", lineHeight:1.12, margin:0 },
  sub: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:300, color:"#ffffff", lineHeight:1.75, maxWidth:460 },
  btnRow: { display:"flex", gap:14, flexWrap:"wrap" as const },
  btnPrimary: { fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"linear-gradient(135deg, #e028a0 0%, #d11a8e 100%)", color:"#fff", cursor:"pointer", transition:"all 0.2s ease", boxShadow:"0 4px 20px rgba(209,26,142,0.35)" },
  btnSecondary: { fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"2px solid #ffffff", background:"transparent", color:"#ffffff", cursor:"pointer", transition:"all 0.2s ease" },
  card: { background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)", borderRadius:24, padding:"32px", boxShadow:"0 8px 48px rgba(26,10,46,0.08)", border:"1px solid rgba(255,255,255,0.7)" },
  cardTop: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 },
  cardIcon: { width:48, height:48, borderRadius:"50%", background:"#662369", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" },
  cardBadge: { fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", fontWeight:500, color:"#1a0a2e", background:"rgba(209,26,142,0.10)", padding:"5px 14px", borderRadius:100 },
  cardDesc: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:500, color:"#1a0a2e", lineHeight:1.5, marginBottom:20 },
  cardFeatures: { display:"flex", flexDirection:"column", gap:10 },
  feat: { fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", color:"#554866", display:"flex", alignItems:"center", gap:10 },
  check: { color:"#d11a8e", fontWeight:700, fontSize:"0.9rem" },
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="ab-page-root">
      <section className="ab-banner" style={ab.banner}>
        <div className="ab-banner-bg" style={ab.bannerBg} />
        <div style={ab.bannerBlob1} />
        <div style={ab.bannerBlob2} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p style={ab.bannerEye}>MS. ELLEVATION · FOR WOMEN 17–25</p>
          <h1 className="ab-banner-title" style={ab.bannerTitle}>Become the Woman<br />You Were Born to Be</h1>
          <p className="ab-banner-sub" style={ab.bannerSub}>A deeply personal, exquisitely curated transformation journey for young women finding their voice.<br/>Coaching, clarity, courage — and the community to hold you through it all.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:32 }}>
            <button style={ab.btnD} onClick={() => nav("join")}>START YOUR JOURNEY</button>
            <button style={ab.btnL} onClick={() => nav("journey")}>EXPLORE MORE</button>
          </div>
        </div>
      </section>

      <section className="ab-feat-section" style={ab.featSection}>
        {[
          { icon:"✦", title:"Personal Transformation", desc:"Guided programs designed to unlock your unique potential." },
          { icon:"◈", title:"1-on-1 Coaching",         desc:"Intimate, tailored support from world-class coaches." },
          { icon:"✿", title:"Community Sisterhood",     desc:"A sacred circle of women walking this journey together." },
        ].map((c) => (
          <div key={c.title} className="ab-feat-card" style={ab.featCard}>
            <div style={ab.featIcon}>{c.icon}</div>
            <h3 className="ab-feat-title" style={ab.featTitle}>{c.title}</h3>
            <p className="ab-feat-desc" style={ab.featDesc}>{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="ab-stories-teaser" style={ab.storiesTeaser}>
        <div className="ab-stories-teaser-bg" style={ab.storiesTeaserBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
          <p style={ab.tEye}>— TRANSFORMATIONAL STORIES —</p>
          <h2 className="ab-t-title" style={ab.tTitle}>She Did It. So Can You.</h2>
          <p className="ab-t-sub" style={ab.tSub}>Real women, real transformations. Discover how Ms. Ellevation has changed lives.</p>
          <button style={ab.tBtn} onClick={() => nav("stories")}>READ THEIR STORIES</button>
        </div>
      </section>
    </div>
  );
}

const ab: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", minHeight:520, display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 48px" },
  bannerBg: {
    position:"absolute", inset:0,
    background:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner5})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex:0
  },
  bannerBlob1: { position:"absolute", top:-80, right:-60, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(209,26,142,0.30) 0%,transparent 70%)", animation:"floatBlob 9s ease-in-out infinite", zIndex:1 },
  bannerBlob2: { position:"absolute", bottom:-60, left:-40, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(102,35,105,0.28) 0%,transparent 70%)", animation:"floatBlob 12s ease-in-out infinite reverse", zIndex:1 },
  bannerEye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#e0a8d6", marginBottom:16, textShadow: "0 1px 4px rgba(0,0,0,0.3)" },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:600, color:"#fdf0f5", lineHeight:1.15, marginBottom:20, textShadow: "0 2px 12px rgba(0,0,0,0.4)" },
  bannerSub: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:300, color:"rgba(253,240,245,0.75)", lineHeight:1.7, maxWidth:560, margin:"0 auto", textShadow: "0 1px 8px rgba(0,0,0,0.3)" },
  btnD: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#d11a8e", color:"#fff", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(209,26,142,0.35)" },
  btnL: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"2px solid rgba(253,240,245,0.5)", background:"transparent", color:"#fdf0f5", cursor:"pointer" },
  featSection: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, maxWidth:1100, margin:"0 auto", padding:"80px 48px" },
  featCard: { background:"#fff", borderRadius:20, padding:"36px 28px", boxShadow:"0 4px 32px rgba(102,35,105,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)", transition:"transform 0.2s ease" },
  featIcon: { fontSize:"1.6rem", color:"#d11a8e", marginBottom:16 },
  featTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:600, color:"#1a0a2e", marginBottom:10 },
  featDesc: { fontFamily:"'Jost',sans-serif", fontSize:"0.9rem", fontWeight:300, color:"#554866", lineHeight:1.65 },
  storiesTeaser: { position:"relative", overflow:"hidden", padding:"80px 48px", textAlign:"center" },
  storiesTeaserBg: { position:"absolute", inset:0, background:"#f6f3fa", zIndex:0 },
  tEye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  tTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:600, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  tSub: { fontFamily:"'Jost',sans-serif", fontSize:"0.95rem", fontWeight:300, color:"#554866", lineHeight:1.7, maxWidth:520, margin:"0 auto 32px", position:"relative", zIndex:1 },
  tBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"13px 32px", borderRadius:100, border:"2px solid #d11a8e", background:"#d11a8e", color:"#1a0a2e", cursor:"pointer", position:"relative", zIndex:1 },
};

// ─── YOUR JOURNEY PAGE (new) ───────────────────────────────────────────────────
const STAGES = [
  { num: "01", title: "Identity", desc: "Rediscover who you are beneath the noise — your values, your voice, your story." },
  { num: "02", title: "Confidence", desc: "Build the inner steadiness to trust your decisions and take up space unapologetically." },
  { num: "03", title: "Leadership", desc: "Step into influence — leading yourself first, then your community and career." },
];

function JourneyPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="jn-page-root">
      <section className="jn-banner" style={jn.banner}>
        <div className="jn-banner-bg" style={jn.bannerBg} />
        <div style={jn.blob1} />
        <div style={jn.blob2} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p style={jn.eye}>— YOUR JOURNEY —</p>
          <h1 className="jn-banner-title" style={jn.bannerTitle}>Every Rise Has a Path</h1>
          <p className="jn-banner-sub" style={jn.bannerSub}>A guided journey through identity, confidence, and leadership — built for women 17–25 ready to grow.</p>
        </div>
      </section>

      <section className="jn-stages" style={jn.stagesSection}>
        <div style={jn.stagesGrid}>
          {STAGES.map((s) => (
            <div key={s.title} className="jn-stage-card" style={jn.stageCard}>
              <span style={jn.stageNum}>{s.num}</span>
              <h3 className="jn-stage-title" style={jn.stageTitle}>{s.title}</h3>
              <p className="jn-stage-desc" style={jn.stageDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="jn-cta" style={jn.ctaSection}>
        <h2 className="jn-cta-title" style={jn.ctaTitle}>Ready to Begin Your Rise?</h2>
        <button style={jn.ctaBtn} onClick={() => nav("join")}>START YOUR JOURNEY</button>
      </section>
    </div>
  );
}

const jn: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center", minHeight:340, display:"flex", alignItems:"center", justifyContent:"center" },
  bannerBg: { position:"absolute", inset:0, background:"linear-gradient(150deg,#fdf9fc 0%,#f6f3fa 50%,#ede7f5 100%)", zIndex:0 },
  blob1: { position:"absolute", top:-80, left:-60, width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle,rgba(209,26,142,0.22) 0%,transparent 70%)", animation:"floatBlob 9s ease-in-out infinite", zIndex:1 },
  blob2: { position:"absolute", bottom:-70, right:-50, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(102,35,105,0.20) 0%,transparent 70%)", animation:"floatBlob 12s ease-in-out infinite reverse", zIndex:1 },
  eye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.25em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4.5vw,3.6rem)", fontWeight:600, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  bannerSub: { fontFamily:"'Jost',sans-serif", fontSize:"0.98rem", fontWeight:300, color:"#554866", lineHeight:1.75, maxWidth:520, margin:"0 auto", position:"relative", zIndex:1 },
  stagesSection: { padding:"72px 48px 80px", background:"#fdf9fc" },
  stagesGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, maxWidth:1080, margin:"0 auto" },
  stageCard: { position:"relative", background:"#fff", borderRadius:20, padding:"36px 28px", boxShadow:"0 4px 32px rgba(102,35,105,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)" },
  stageNum: { fontFamily:"'Cormorant Garamond',serif", fontSize:"2.4rem", fontWeight:600, color:"#e0a8d6", display:"block", marginBottom:12 },
  stageTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:600, color:"#1a0a2e", marginBottom:10 },
  stageDesc: { fontFamily:"'Jost',sans-serif", fontSize:"0.9rem", fontWeight:300, color:"#554866", lineHeight:1.7 },
  ctaSection: { position:"relative", overflow:"hidden", padding:"72px 48px", textAlign:"center", background:"linear-gradient(150deg,#1a0a2e 0%,#662369 100%)" },
  ctaTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:600, color:"#fdf0f5", marginBottom:28 },
  ctaBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"14px 34px", borderRadius:100, border:"none", background:"#d11a8e", color:"#fff", cursor:"pointer", boxShadow:"0 4px 20px rgba(209,26,142,0.4)" },
};

// ─── PROGRAMS PAGE (renamed from Services) ─────────────────────────────────────
function ProgramsPage({ nav }: { nav: (p: Page) => void }) {
  const plans = [
    { title:"Workshops",              price:"From $49/session", popular:false, features:["Interactive group sessions","Practical growth tools","Guided community discussion","Take-home resources"] },
    { title:"Mentorship",             price:"From $299/mo",     popular:true,  features:["1:1 mentor matching","Personalised growth plan","Monthly check-ins","Ongoing support"] },
    { title:"Leadership Development", price:"From $1,499",       popular:false, features:["Immersive leadership intensive","Group & individual coaching","Capstone project","Alumnae network access"] },
  ];
  return (
    <div className="pr-page-root">
      <section className="pr-banner" style={pr.banner}>
        <div className="pr-banner-bg" style={pr.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p style={pr.eye}>— OUR PROGRAMS —</p>
          <h1 className="pr-title" style={pr.title}>Curated for Your Elevation</h1>
          <p className="pr-sub" style={pr.sub}>Workshops, mentorship, and leadership development — choose the path that speaks to where you are and where you're meant to go.</p>
        </div>
      </section>

      <section className="pr-section" style={pr.section}>
        <div style={pr.grid}>
          {plans.map((p) => (
            <div key={p.title} className="pr-card" style={{ ...pr.card, ...(p.popular ? pr.cardPopular : {}) }}>
              {p.popular && <div style={pr.popularBadge}>MOST POPULAR</div>}
              <h3 className="pr-card-title" style={{ ...pr.cardTitle, ...(p.popular ? { color:"#fff" } : {}) }}>{p.title}</h3>
              <p style={{ ...pr.cardPrice, ...(p.popular ? { color:"#e0a8d6" } : {}) }}>{p.price}</p>
              <ul style={pr.list}>
                {p.features.map(f => (
                  <li key={f} className="pr-list-item" style={{ ...pr.listItem, ...(p.popular ? { color:"rgba(253,240,245,0.85)" } : {}) }}>
                    <span style={pr.bullet}>•</span>{f}
                  </li>
                ))}
              </ul>
              <button
                style={{ ...pr.bookBtn, ...(p.popular ? pr.bookBtnDark : {}) }}
                onClick={() => nav("join")}
              >BOOK NOW</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const pr: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center" },
  bannerBg: { position:"absolute", inset:0, background:"linear-gradient(135deg,#fdf9fc 0%,#f6f3fa 100%)", zIndex:0 },
  eye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  title: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:600, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  sub: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:300, color:"#554866", lineHeight:1.7, position:"relative", zIndex:1, maxWidth:560, margin:"0 auto" },
  section: { padding:"60px 48px 96px", background:"#f6f3fa" },
  grid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1100, margin:"0 auto" },
  card: { background:"#fff", borderRadius:20, padding:"40px 32px 36px", boxShadow:"0 4px 32px rgba(102,35,105,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)", position:"relative", display:"flex", flexDirection:"column", gap:0 },
  cardPopular: { background:"#1a0a2e", border:"none", boxShadow:"0 8px 48px rgba(26,10,46,0.30)" },
  popularBadge: { position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", background:"#d11a8e", color:"#fff", padding:"5px 18px", borderRadius:100 },
  cardTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:600, color:"#1a0a2e", marginBottom:8 },
  cardPrice: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:500, color:"#8a5a97", marginBottom:24 },
  list: { listStyle:"none", display:"flex", flexDirection:"column", gap:12, marginBottom:32, padding:0 },
  listItem: { fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", color:"#554866", display:"flex", alignItems:"center", gap:10 },
  bullet: { color:"#d11a8e", fontWeight:700 },
  bookBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"13px", borderRadius:100, border:"2px solid #1a0a2e", background:"transparent", color:"#1a0a2e", cursor:"pointer", transition:"all 0.2s ease", marginTop:"auto" },
  bookBtnDark: { border:"none", background:"#d11a8e", color:"#fff", boxShadow:"0 4px 20px rgba(209,26,142,0.35)" },
};

// ─── EVENTS PAGE (new) ──────────────────────────────────────────────────────────
const EVENTS = [
  { date: "AUG 14", title: "Rise & Lead: Leadership Circle", location: "Sydney, NSW", desc: "An evening of connection and leadership coaching for young women." },
  { date: "SEP 02", title: "Confidence Workshop",             location: "Online",     desc: "Interactive session on building unshakeable self-belief." },
  { date: "OCT 18", title: "Ellevation Summit",                location: "Melbourne, VIC", desc: "Our flagship annual gathering for the Ellevation community." },
];

function EventsPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="ev-page-root">
      <section className="ev-banner" style={ev.banner}>
        <div className="ev-banner-bg" style={ev.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p style={ev.eye}>— EVENTS —</p>
          <h1 className="ev-title" style={ev.title}>Gather. Grow. Rise Together.</h1>
          <p className="ev-sub" style={ev.sub}>Join us at upcoming events and sessions designed for connection and growth.</p>
        </div>
      </section>

      <section className="ev-section" style={ev.section}>
        <div style={ev.grid}>
          {EVENTS.map(e => (
            <div key={e.title} className="ev-card" style={ev.card}>
              <div style={ev.dateBadge}>{e.date}</div>
              <h3 className="ev-card-title" style={ev.cardTitle}>{e.title}</h3>
              <p style={ev.cardLoc}>{e.location}</p>
              <p className="ev-card-desc" style={ev.cardDesc}>{e.desc}</p>
              <button style={ev.rsvpBtn} onClick={() => nav("join")}>RESERVE YOUR SPOT</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const ev: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center" },
  bannerBg: { position:"absolute", inset:0, background:"linear-gradient(135deg,#fdf9fc 0%,#f6f3fa 100%)", zIndex:0 },
  eye: { fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  title: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:600, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  sub: { fontFamily:"'Jost',sans-serif", fontSize:"1rem", fontWeight:300, color:"#554866", lineHeight:1.7, position:"relative", zIndex:1, maxWidth:500, margin:"0 auto" },
  section: { padding:"60px 48px 96px", background:"#f6f3fa" },
  grid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1100, margin:"0 auto" },
  card: { background:"#fff", borderRadius:20, padding:"32px 28px 28px", boxShadow:"0 4px 32px rgba(102,35,105,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)", display:"flex", flexDirection:"column", gap:0 },
  dateBadge: { display:"inline-block", fontFamily:"'Jost',sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em", color:"#fff", background:"#d11a8e", padding:"6px 14px", borderRadius:100, marginBottom:16, width:"fit-content" },
  cardTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:600, color:"#1a0a2e", marginBottom:6 },
  cardLoc: { fontFamily:"'Jost',sans-serif", fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.08em", color:"#8a5a97", marginBottom:14 },
  cardDesc: { fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", fontWeight:300, color:"#554866", lineHeight:1.65, marginBottom:22, flexGrow:1 },
  rsvpBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"12px", borderRadius:100, border:"2px solid #1a0a2e", background:"transparent", color:"#1a0a2e", cursor:"pointer", transition:"all 0.2s ease", marginTop:"auto" },
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
    <div className="st-page-root">
      <section className="st-banner" style={st.banner}>
        <div className="st-banner-bg" style={st.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <h1 className="st-banner-title" style={st.bannerTitle}>Transformational Stories</h1>
          <p className="st-banner-sub" style={st.bannerSub}>Real women. Real journeys. Real transformation.</p>
        </div>
      </section>

      <section className="st-section" style={st.section}>
        <div style={st.grid}>
          {STORIES.map((s) => (
            <div key={s.name} className="st-card" style={st.card}>
              <div style={st.quoteIcon}>"</div>
              <p className="st-quote" style={st.quote}>{s.quote}</p>
              <div style={st.author}>
                <p className="st-name" style={st.name}>{s.name}</p>
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
  bannerBg: { position:"absolute", inset:0, background:"linear-gradient(160deg,#1a0a2e 0%,#662369 50%,#1a0a2e 100%)", zIndex:0 },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:600, color:"#fdf0f5", marginBottom:16, position:"relative", zIndex:1 },
  bannerSub: { fontFamily:"'Jost',sans-serif", fontSize:"0.95rem", fontWeight:300, color:"rgba(253,240,245,0.7)", position:"relative", zIndex:1 },
  section: { background:"#f6f3fa", padding:"72px 48px 96px" },
  grid: { display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24, maxWidth:1000, margin:"0 auto" },
  card: { background:"#fff", borderRadius:20, padding:"40px 36px 36px", boxShadow:"0 4px 32px rgba(102,35,105,0.07)", border:"1px solid rgba(124, 92, 191, 0.15)", display:"flex", flexDirection:"column", gap:20 },
  quoteIcon: { fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", color:"#e0a8d6", lineHeight:1, height:32, display:"block" },
  quote: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontStyle:"italic", color:"#1a0a2e", lineHeight:1.75, flexGrow:1 },
  author: { borderTop:"1px solid #ede7f5", paddingTop:20 },
  name: { fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", fontWeight:600, color:"#1a0a2e", marginBottom:4 },
  role: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.14em", color:"#8a5a97" },
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
    <div className="jp-page-root">
      <section className="jp-banner" style={jp.banner}>
        <div className="jp-banner-bg" style={jp.bannerBg} />
        <div style={jp.blobL} />
        <div style={jp.blobR} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <div style={jp.eyebrowRow}><span style={jp.line}/><span style={jp.eyebrowTxt}>MEMBERSHIP</span><span style={jp.line}/></div>
          <h1 className="jp-banner-title" style={jp.bannerTitle}>Join Ellevation</h1>
        </div>
      </section>

      <section className="jp-form-section" style={jp.formSection}>
        <div style={jp.tabsRow}>
          {TIERS.map(tier => (
            <button key={tier} className={`jp-tabBtn ${activeTier === tier ? 'active' : ''}`} style={{ ...jp.tabBtn, ...(activeTier === tier ? { ...jp.tabActive, background: TIER_META[tier].color } : {}) }} onClick={() => handleTierChange(tier)}>{tier}</button>
          ))}
        </div>

        <div ref={formRef} className="jp-card" style={{ ...jp.card, opacity: formVisible?1:0, transform: formVisible?"translateY(0)":"translateY(24px)", transition:"opacity 0.35s ease,transform 0.35s ease", borderTop:`3px solid ${meta.color}` }}>
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
                <h2 className="jp-form-title" style={jp.formTitle}>Apply for {meta.label} Membership</h2>
                <p className="jp-form-sub" style={jp.formSub}>Complete this form and our team will be in touch within 48 hours.</p>
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
              <div className="jp-field-wrap" style={jp.fieldWrap} data-error={errs.referral?"true":undefined}>
                <select className="jp-select" style={{ ...jp.input, ...jp.select, color: form.referral?"#1a0a2e":"#b09fc0" }} value={form.referral} onChange={e => handleChange(activeTier,"referral",e.target.value)}>
                  <option value="" disabled>How did you hear about us? *</option>
                  {REFERRAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {errs.referral && <span style={jp.errMsg}>{errs.referral}</span>}
              </div>
              <div className="jp-field-wrap" style={jp.fieldWrap} data-error={errs.goals?"true":undefined}>
                <textarea className="jp-textarea" style={{ ...jp.input, ...jp.textarea, ...(errs.goals?jp.inputErr:{}) }} placeholder="What are you hoping to gain from your Ellevation membership? *" value={form.goals} onChange={e => handleChange(activeTier,"goals",e.target.value)} />
                {errs.goals && <span style={jp.errMsg}>{errs.goals}</span>}
              </div>
              <div style={jp.agreeRow} data-error={errs.agree?"true":undefined}>
                <label style={jp.agreeLabel}>
                  <input type="checkbox" checked={form.agree} onChange={e => handleChange(activeTier,"agree",e.target.checked)} style={jp.checkbox} />
                  <span className="jp-agree-text" style={jp.agreeText}>I agree to the Ellevation <a href="#" style={{ ...jp.agreeLink, color: meta.color }}>Community Guidelines</a> and <a href="#" style={{ ...jp.agreeLink, color: meta.color }}>Terms of Membership</a>.</span>
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
    <div className="jp-field-wrap" style={jp.fieldWrap} data-error={error?"true":undefined}>
      <input className="jp-input" style={{ ...jp.input, ...(error?jp.inputErr:{}) }} placeholder={label} type={type} value={value} onChange={e => onChange(e.target.value)} />
      {error && <span style={jp.errMsg}>{error}</span>}
    </div>
  );
}

const jp: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 24px 72px", textAlign:"center", minHeight:260, display:"flex", alignItems:"center", justifyContent:"center" },
  bannerBg: { position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 80% at 50% 50%,#fbe4f2 0%,#f3dcef 30%,#e6d0ec 60%,#d3b3e0 100%)", zIndex:0 },
  blobL: { position:"absolute", top:-60, left:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(209,26,142,0.28) 0%,transparent 70%)", animation:"floatBlob 8s ease-in-out infinite", zIndex:1 },
  blobR: { position:"absolute", bottom:-80, right:-60, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(102,35,105,0.25) 0%,transparent 70%)", animation:"floatBlob 11s ease-in-out infinite reverse", zIndex:1 },
  eyebrowRow: { display:"flex", alignItems:"center", gap:12, justifyContent:"center", marginBottom:16 },
  line: { display:"inline-block", width:40, height:1, background:"#662369" },
  eyebrowTxt: { fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.28em", color:"#662369" },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:600, color:"#1a0a2e" },
  formSection: { maxWidth:780, margin:"0 auto", padding:"64px 24px 96px", animation:"fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) 0.1s both" },
  tabsRow: { display:"flex", justifyContent:"center", gap:12, marginBottom:36, flexWrap:"wrap" as const },
  tabBtn: { fontFamily:"'Jost',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"10px 28px", borderRadius:100, border:"1.5px solid #ded4ee", background:"transparent", color:"#662369", cursor:"pointer", transition:"all 0.25s ease" },
  tabActive: { color:"#fff", border:"1.5px solid transparent", boxShadow:"0 4px 20px rgba(102,35,105,0.28)", transform:"translateY(-1px)" },
  card: { background:"#fff", borderRadius:20, padding:"48px 52px 52px", boxShadow:"0 8px 60px rgba(102,35,105,0.10),0 2px 16px rgba(102,35,105,0.06)" },
  formHeader: { textAlign:"center", marginBottom:40 },
  formTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:600, color:"#1a0a2e", marginBottom:8 },
  formSub: { fontFamily:"'Jost',sans-serif", fontSize:"0.88rem", color:"#8a5a97", fontWeight:300, marginBottom:8 },
  tagline: { fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", fontWeight:500, letterSpacing:"0.05em", marginTop:6 },
  row: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 },
  fieldWrap: { display:"flex", flexDirection:"column", marginBottom:16 },
  input: { fontFamily:"'Jost',sans-serif", fontSize:"0.9rem", fontWeight:400, padding:"13px 16px", borderRadius:10, border:"1.5px solid #ede7f5", background:"#fdf9fc", color:"#1a0a2e", transition:"border-color 0.2s,box-shadow 0.2s", width:"100%" },
  inputErr: { borderColor:"#e0609a", background:"#fff8f9" },
  select: { appearance:"none", WebkitAppearance:"none", cursor:"pointer", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23662369' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center", paddingRight:40 },
  textarea: { resize:"vertical", minHeight:110, lineHeight:1.6 },
  errMsg: { fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", color:"#d1108e", marginTop:5, paddingLeft:4 },
  agreeRow: { marginBottom:28, marginTop:4 },
  agreeLabel: { display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer" },
  checkbox: { marginTop:3, accentColor:"#d11a8e", width:15, height:15, flexShrink:0 },
  agreeText: { fontFamily:"'Jost',sans-serif", fontSize:"0.83rem", color:"#554866", lineHeight:1.5 },
  agreeLink: { textDecoration:"underline", textUnderlineOffset:"2px" },
  submitBtn: { width:"100%", fontFamily:"'Jost',sans-serif", fontSize:"0.78rem", fontWeight:600, letterSpacing:"0.18em", color:"#fff", border:"none", borderRadius:10, padding:"15px 24px", cursor:"pointer", transition:"opacity 0.2s,transform 0.2s,box-shadow 0.2s", boxShadow:"0 6px 24px rgba(102,35,105,0.30)" },
  successBox: { textAlign:"center", padding:"40px 24px" },
  successIcon: { fontSize:"2.5rem", marginBottom:16, display:"block" },
  successTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:600, marginBottom:12 },
  successText: { fontFamily:"'Jost',sans-serif", fontSize:"0.95rem", color:"#554866", lineHeight:1.7, marginBottom:32 },
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function EllevationPage() {
  const [page, setPage] = useState<Page>("home");

  // ✅ Sync React state with whatever theme the navbar has already set
  // This runs once on mount so the page reflects the saved theme immediately
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ms-ellevation-root" style={{ fontFamily:"'Jost',sans-serif", background:"#fdf9fc", minHeight:"100vh", color:"#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input::placeholder,textarea::placeholder{color:#b09fc0;}
        select option{color:#1a0a2e;}
        input:focus,textarea:focus,select:focus{outline:none;border-color:#662369!important;box-shadow:0 0 0 3px rgba(209,26,142,0.12);}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
        @keyframes floatBlob{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(20px,-15px) scale(1.04);}66%{transform:translate(-10px,10px) scale(0.97);}}
        button:hover{opacity:0.88;}

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .ms-ellevation-root {
          background: #0d0614 !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .ms-nav {
          background: transparent !important;
        }
        [data-theme="dark"] .ns-inner {
          background: rgba(22, 13, 34, 0.92) !important;
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35) !important;
        }
        [data-theme="dark"] .ns-link {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hp-bg-grad {
          background: linear-gradient(rgba(13, 6, 20, 0.75), rgba(13, 6, 20, 0.75)), url(${banner4}) !important;
          background-size: cover !important;
        }
        [data-theme="dark"] .hp-headline,
        [data-theme="dark"] .ab-banner-title,
        [data-theme="dark"] .jn-banner-title,
        [data-theme="dark"] .pr-title,
        [data-theme="dark"] .ev-title,
        [data-theme="dark"] .st-banner-title,
        [data-theme="dark"] .jp-banner-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hp-sub,
        [data-theme="dark"] .ab-banner-sub,
        [data-theme="dark"] .jn-banner-sub,
        [data-theme="dark"] .pr-sub,
        [data-theme="dark"] .ev-sub,
        [data-theme="dark"] .st-banner-sub {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hp-card,
        [data-theme="dark"] .ab-feat-card,
        [data-theme="dark"] .jn-stage-card,
        [data-theme="dark"] .pr-card,
        [data-theme="dark"] .ev-card,
        [data-theme="dark"] .st-card,
        [data-theme="dark"] .jp-card {
          background: #1f1330 !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
          box-shadow: 0 8px 48px rgba(0, 0, 0, 0.5) !important;
        }
        [data-theme="dark"] .hp-feat,
        [data-theme="dark"] .ab-feat-desc,
        [data-theme="dark"] .jn-stage-desc,
        [data-theme="dark"] .pr-list-item,
        [data-theme="dark"] .ev-card-desc,
        [data-theme="dark"] .st-quote,
        [data-theme="dark"] .jp-form-sub,
        [data-theme="dark"] .jp-agree-text {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hp-card-desc,
        [data-theme="dark"] .ab-feat-title,
        [data-theme="dark"] .ab-t-title,
        [data-theme="dark"] .jn-stage-title,
        [data-theme="dark"] .jn-cta-title,
        [data-theme="dark"] .pr-card-title:not([style*="color:#fff"]),
        [data-theme="dark"] .ev-card-title,
        [data-theme="dark"] .st-name,
        [data-theme="dark"] .jp-form-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .ab-stories-teaser-bg,
        [data-theme="dark"] .pr-section,
        [data-theme="dark"] .ev-section,
        [data-theme="dark"] .st-section,
        [data-theme="dark"] .jn-stages,
        [data-theme="dark"] .jp-form-section {
          background: #160d22 !important;
        }
        [data-theme="dark"] .ab-t-sub {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .jn-banner-bg {
          background: linear-gradient(150deg, #160d22 0%, #1a0a2e 50%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .pr-banner-bg {
          background: linear-gradient(135deg, #160d22 0%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .ev-banner-bg {
          background: linear-gradient(135deg, #160d22 0%, #140a1c 100%) !important;
        }
        [data-theme="dark"] .st-banner-bg {
          background: linear-gradient(160deg, #1a0a2e 0%, #662369 50%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .jp-banner-bg {
          background: radial-gradient(ellipse 80% 80% at 50% 50%, #2d1740 0%, #1a0a2e 100%) !important;
        }
        [data-theme="dark"] .jp-input,
        [data-theme="dark"] .jp-select,
        [data-theme="dark"] .jp-textarea {
          background: #0d0614 !important;
          border-color: rgba(155, 109, 190, 0.3) !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .jp-input::placeholder,
        [data-theme="dark"] .jp-textarea::placeholder {
          color: rgba(232, 224, 248, 0.35) !important;
        }
        [data-theme="dark"] .jp-tabBtn {
          border-color: rgba(155, 109, 190, 0.3) !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .ab-banner-bg {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner5}) !important;
          background-size: cover !important;
        }
      `}</style>

      <Navbar current={page} nav={nav} />

      {page === "home"     && <HomePage     nav={nav} />}
      {page === "about"    && <AboutPage    nav={nav} />}
      {page === "journey"  && <JourneyPage  nav={nav} />}
      {page === "programs" && <ProgramsPage nav={nav} />}
      {page === "events"   && <EventsPage   nav={nav} />}
      {page === "stories"  && <StoriesPage />}
      {page === "join"     && <JoinPage />}
    </div>
  );
}