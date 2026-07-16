import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner4 from "../assets/banner4.avif";
import banner5 from "../assets/banner5.avif";
import banner2 from "../assets/banner2.avif";
import logo from "../assets/Ellevation-whitemode-logo.png";

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
  FOUNDATION: { label: "Foundation", tagline: "Begin your journey with Ellevation's core community.", color: "#4B1E56" },
  ELLEVATE:   { label: "Ellevate",   tagline: "Step into an elevated circle of ambitious women.",    color: "#662369" },
  LUMINARY:   { label: "Luminary",   tagline: "Lead, inspire, and illuminate from the pinnacle.",    color: "#6b2f7a" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const routerNavigate = useNavigate(); // ✅ react-router navigation (same tab)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // close mobile menu whenever the active page changes
  useEffect(() => { setMenuOpen(false); }, [current]);

  const goHome = () => { routerNavigate("/"); setMenuOpen(false); };
  const goPage = (p: Page) => { nav(p); setMenuOpen(false); };

  return (
    <div className="ms-nav-row">
      <nav className={`ms-nav ${scrolled ? "ms-nav-scrolled" : ""}`}>
        {/* Back to Home */}
        <button onClick={goHome} className="ns-back-home" aria-label="Back to home">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back to Home</span>
        </button>

        {/* Logo */}
        <img
          src={logo}
          alt="Ellevation Logo"
          onClick={() => goPage("home")}
          className="ns-logo"
        />

        {/* Desktop nav links */}
        <div className="ns-links-desktop">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => goPage(page)}
              className={`ns-link ${current === page ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger toggle */}
        <button
          className={`ns-menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`ns-mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => goPage(page)}
            className={`ns-mobile-link ${current === page ? "active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="hp-page" style={hp.page}>
      <div className="hp-bg-grad" style={hp.bgGrad} />
      <div style={hp.blobTL} />
      <div style={hp.blobBR} />

      <div className="hp-grid" style={hp.grid}>
        <div style={hp.left}>
          <h1 className="hp-headline" style={hp.headline}>
            A beautiful becoming for women ready to rise with  <span style={{ color: "#EFBF68" }}>softness and strength. </span>
          </h1>
        
          <div className="hp-btn-row" style={hp.btnRow}>
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
    background:`linear-gradient(rgba(26, 10, 46, 0.55), rgba(26, 10, 46, 0.55)), url(${banner4})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex:0
  },
  blobTL: { position:"absolute", top:-120, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(75,30,86,0.18) 0%,transparent 70%)", animation:"floatBlob 10s ease-in-out infinite", zIndex:1 },
  blobBR: { position:"absolute", bottom:-100, right:-80, width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(26,10,46,0.1) 0%,transparent 70%)", animation:"floatBlob 13s ease-in-out infinite reverse", zIndex:1 },
  grid: { position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", maxWidth:1200, margin:"0 auto", width:"100%", animation:"fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) both" },
  left: { display:"flex", flexDirection:"column", gap:24 },
  eyebrow: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.22em", color:"#ffffff" },
  headline: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.4rem,4vw,3.6rem)", fontWeight:700, color:"#ffffff", lineHeight:1.12, margin:0 },
  sub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"#ffffff", lineHeight:1.75, maxWidth:460 },
  btnRow: { display:"flex", gap:14, flexWrap:"wrap" as const },
  btnPrimary: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7238F", color:"#fff", cursor:"pointer", transition:"all 0.2s ease", boxShadow:"0 4px 20px rgba(75,30,86,0.35)" },
  btnSecondary: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7238F", color:"#ffffff", cursor:"pointer", transition:"all 0.2s ease" },
  card: { background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)", borderRadius:24, padding:"32px", boxShadow:"0 8px 48px rgba(26,10,46,0.08)", border:"1px solid rgba(255,255,255,0.7)" },
  cardTop: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 },
  cardIcon: { width:48, height:48, borderRadius:"50%", background:"#4B1E56", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" },
  cardBadge: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.8rem", fontWeight:500, color:"#1a0a2e", background:"rgba(75,30,86,0.10)", padding:"5px 14px", borderRadius:100 },
  cardDesc: { fontFamily:"'Astrid Regular',serif", fontSize:"1.25rem", fontWeight:500, color:"#1a0a2e", lineHeight:1.5, marginBottom:20 },
  cardFeatures: { display:"flex", flexDirection:"column", gap:10 },
  feat: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.85rem", color:"#554866", display:"flex", alignItems:"center", gap:10 },
  check: { color:"#4B1E56", fontWeight:700, fontSize:"0.9rem" },
};

/* ══════════════════════════════════════════════
   HOME PAGE — EXTRA SECTION 1 — "Her Potential. Her Impact."
   Sits directly below the Home page hero banner.
   ══════════════════════════════════════════════ */
function ImpactStatementSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="impact-section">
      {/* ambient blobs, consistent with rest of site */}
      <div className="impact-blob impact-blob-1" />
      <div className="impact-blob impact-blob-2" />

      <div className="impact-inner">
        <p
          className="impact-eyebrow"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Why We Exist
        </p>

        <h2 className="impact-title">
          Her Potential. Her Impact.
        </h2>

        {/* Floating glass statement card */}
        <div
          className="impact-glass-card"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
          }}
        >
          <h3 className="impact-card-title">
            Building Holistic Success for Women in Australia.
          </h3>
          <p className="impact-card-desc">
            Beyond every obstacle and uncertainty, Ms. Ellevation empowers her to claim her space,
            amplify her voice, and truly flourish.
          </p>

          <div className="impact-tags">
            {[
              { n: "Voice", i: "◈" },
              { n: "Identity", i: "✦" },
              { n: "Confidence", i: "❀" },
            ].map((tag) => (
              <div key={tag.n} className="impact-tag">
                <span className="impact-tag-icon">{tag.i}</span>
                <span className="impact-tag-name">{tag.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   HOME PAGE — EXTRA SECTION 2 — "Your Harbour of Empowerment"
   Sits directly below the Impact statement section.
   ══════════════════════════════════════════════ */
function WelcomeSection({ nav }: { nav: (p: Page) => void }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="welcome-section">
      <div className="welcome-grid">
        {/* LEFT — text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="welcome-eyebrow">A Space For Women, By Women</p>
          <h2 className="welcome-title">
            Welcome to Your{" "}
           Harbour of Empowerment
          </h2>
          <p className="welcome-desc">
            Welcome to Ms. Ellevation — for new beginnings, bold journeys, and dreams taking
            flight. Find your place. Lift your voice. Shine. Flourish in every part of your life.
          </p>

          <button onClick={() => nav("join")} className="welcome-cta">
            Find Your Place
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* RIGHT — image with floating brand badge */}
        <div
          className="welcome-image-wrap"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <div className="welcome-image-frame">
            <img
              src={banner2}
              alt="Welcome to Ms. Ellevation"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".welcome-fallback")) {
                  const fb = document.createElement("div");
                  fb.className = "welcome-fallback";
                  fb.style.cssText =
                    "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ede7f5 0%,#f6f3fa 100%);font-family:'Astrid Regular',serif;font-size:26px;font-weight:600;color:#662369;text-align:center;padding:24px;";
                  fb.textContent = "Ms. Ellevation";
                  parent.appendChild(fb);
                }
              }}
            />
          </div>

          {/* Floating brand badge — same language as other floating cards */}
          <div className="welcome-badge">
            <div className="welcome-badge-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l1.8 5.6H20l-4.6 3.4 1.8 5.6L12 13.2 6.8 16.6l1.8-5.6L4 8h6.2z" fill="#4B1E56" />
              </svg>
            </div>
            <div>
              <p className="welcome-badge-title">Ms. Ellevation</p>
              <p className="welcome-badge-sub">A space for women, by women</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          <h1 className="ab-banner-title" style={ab.bannerTitle}>Become the Woman<br />You Were  <span style={{ color: "#EFBF68" }}>Born to Be </span></h1>
          <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:32, flexWrap:"wrap" as const }}>
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
    background:`linear-gradient(rgba(26, 10, 46, 0.6), rgba(26, 10, 46, 0.6)), url(${banner5})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex:0
  },
  bannerBlob1: { position:"absolute", top:-80, right:-60, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(75,30,86,0.30) 0%,transparent 70%)", animation:"floatBlob 9s ease-in-out infinite", zIndex:1 },
  bannerBlob2: { position:"absolute", bottom:-60, left:-40, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(102,35,105,0.28) 0%,transparent 70%)", animation:"floatBlob 12s ease-in-out infinite reverse", zIndex:1 },
  bannerEye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#d9c3e0", marginBottom:16, textShadow: "0 1px 4px rgba(0,0,0,0.3)" },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:700, color:"#fdf0f5", lineHeight:1.15, marginBottom:20, textShadow: "0 2px 12px rgba(0,0,0,0.4)" },
  bannerSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"rgba(253,240,245,0.75)", lineHeight:1.7, maxWidth:560, margin:"0 auto", textShadow: "0 1px 8px rgba(0,0,0,0.3)" },
  btnD: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7238F", color:"#fff", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(75,30,86,0.35)" },
  btnL: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7238F", color:"#fdf0f5", cursor:"pointer" },
  featSection: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, maxWidth:1100, margin:"0 auto", padding:"80px 48px" },
  featCard: { background:"rgba(255, 255, 255, 0.75)", backdropFilter:"blur(10px)", borderRadius:20, padding:"36px 28px", boxShadow:"0 4px 32px rgba(75,30,86,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)", transition:"transform 0.2s ease" },
  featIcon: { fontSize:"1.6rem", color:"#4B1E56", marginBottom:16 },
  featTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"1.3rem", fontWeight:600, color:"#1a0a2e", marginBottom:10 },
  featDesc: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.9rem", fontWeight:300, color:"#554866", lineHeight:1.65 },
  storiesTeaser: { position:"relative", overflow:"hidden", padding:"80px 48px", textAlign:"center" },
  storiesTeaserBg: { position:"absolute", inset:0, background:"#AEAAD5", zIndex:0 },
  tEye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  tTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  tSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.95rem", fontWeight:300, color:"#443355", lineHeight:1.7, maxWidth:520, margin:"0 auto 32px", position:"relative", zIndex:1 },
  tBtn: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"13px 32px", borderRadius:100, border:"2px solid #D7238F", background:"#D7238F", color:"#ffffff", cursor:"pointer", position:"relative", zIndex:1 },
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
        <div className="jn-stages-grid" style={jn.stagesGrid}>
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
  blob1: { position:"absolute", top:-80, left:-60, width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle,rgba(75,30,86,0.22) 0%,transparent 70%)", animation:"floatBlob 9s ease-in-out infinite", zIndex:1 },
  blob2: { position:"absolute", bottom:-70, right:-50, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(102,35,105,0.20) 0%,transparent 70%)", animation:"floatBlob 12s ease-in-out infinite reverse", zIndex:1 },
  eye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.25em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.2rem,4.5vw,3.6rem)", fontWeight:700, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  bannerSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.98rem", fontWeight:300, color:"#554866", lineHeight:1.75, maxWidth:520, margin:"0 auto", position:"relative", zIndex:1 },
  stagesSection: { padding:"72px 48px 80px", background:"#AEAAD5" },
  stagesGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, maxWidth:1080, margin:"0 auto" },
  stageCard: { position:"relative", background:"rgba(255, 255, 255, 0.8)", backdropFilter:"blur(10px)", borderRadius:20, padding:"36px 28px", boxShadow:"0 4px 32px rgba(75,30,86,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)" },
  stageNum: { fontFamily:"'Astrid Regular', serif", fontSize:"2.4rem", fontWeight:600, color:"#8a5a97", display:"block", marginBottom:12 },
  stageTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"1.4rem", fontWeight:600, color:"#1a0a2e", marginBottom:10 },
  stageDesc: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.9rem", fontWeight:300, color:"#554866", lineHeight:1.7 },
  ctaSection: { position:"relative", overflow:"hidden", padding:"72px 48px", textAlign:"center", background:"linear-gradient(180deg, #2a163a 0%, #160d22 100%)" },
  ctaTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:700, color:"#fdf0f5", marginBottom:28 },
  ctaBtn: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"14px 34px", borderRadius:100, border:"none", background:"#D7238F", color:"#fff", cursor:"pointer", boxShadow:"0 4px 20px rgba(75,30,86,0.4)" },
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
        <div className="pr-grid" style={pr.grid}>
          {plans.map((p) => (
            <div key={p.title} className="pr-card" style={{ ...pr.card, ...(p.popular ? pr.cardPopular : {}) }}>
              {p.popular && <div style={pr.popularBadge}>MOST POPULAR</div>}
              <h3 className="pr-card-title" style={{ ...pr.cardTitle, ...(p.popular ? { color:"#fff" } : {}) }}>{p.title}</h3>
              <p style={{ ...pr.cardPrice, ...(p.popular ? { color:"#d9c3e0" } : {}) }}>{p.price}</p>
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
  eye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  title: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:700, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  sub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"#554866", lineHeight:1.7, position:"relative", zIndex:1, maxWidth:560, margin:"0 auto" },
  section: { padding:"60px 48px 96px", background:"#AEAAD5" },
  grid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1100, margin:"0 auto" },
  card: { background:"rgba(255, 255, 255, 0.85)", backdropFilter:"blur(10px)", borderRadius:20, padding:"40px 32px 36px", boxShadow:"0 4px 32px rgba(75,30,86,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)", position:"relative", display:"flex", flexDirection:"column", gap:0 },
  cardPopular: { background:"#1a0a2e", border:"none", boxShadow:"0 8px 48px rgba(26,10,46,0.30)" },
  popularBadge: { position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", fontFamily:"'Montserrat', sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", background:"linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%)", color:"#fff", padding:"5px 18px", borderRadius:100 },
  cardTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"1.4rem", fontWeight:600, color:"#1a0a2e", marginBottom:8 },
  cardPrice: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:500, color:"#8a5a97", marginBottom:24 },
  list: { listStyle:"none", display:"flex", flexDirection:"column", gap:12, marginBottom:32, padding:0 },
  listItem: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.88rem", color:"#554866", display:"flex", alignItems:"center", gap:10 },
  bullet: { color:"#4B1E56", fontWeight:700 },
  bookBtn: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"13px", borderRadius:100, border:"none", background:"#D7238F", color:"#fff", cursor:"pointer", transition:"all 0.2s ease", marginTop:"auto" },
  bookBtnDark: { border:"none", background:"#D7238F", color:"#fff", boxShadow:"0 4px 20px rgba(75,30,86,0.35)" },
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
        <div className="ev-grid" style={ev.grid}>
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
  eye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  title: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:700, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  sub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"#554866", lineHeight:1.7, position:"relative", zIndex:1, maxWidth:500, margin:"0 auto" },
  section: { padding:"60px 48px 96px", background:"#AEAAD5" },
  grid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1100, margin:"0 auto" },
  card: { background:"rgba(255, 255, 255, 0.85)", backdropFilter:"blur(10px)", borderRadius:20, padding:"32px 28px 28px", boxShadow:"0 4px 32px rgba(75,30,86,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)", display:"flex", flexDirection:"column", gap:0 },
  dateBadge: { display:"inline-block", fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em", color:"#fff", background:"linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%)", padding:"6px 14px", borderRadius:100, marginBottom:16, width:"fit-content" },
  cardTitle: { fontFamily:"'Astrid Regular',serif", fontSize:"1.25rem", fontWeight:600, color:"#1a0a2e", marginBottom:6 },
  cardLoc: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.08em", color:"#8a5a97", marginBottom:14 },
  cardDesc: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.88rem", fontWeight:300, color:"#554866", lineHeight:1.65, marginBottom:22, flexGrow:1 },
  rsvpBtn: {
    fontFamily: "'Montserrat',sans-serif",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "12px",
    borderRadius: 100,
    border: "2px solid #662369",
    background: "#D7238F",
    color: "#ffff",
    cursor: "pointer",
    marginTop: "auto",
    transition: "all 0.2s ease",
  },
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
        <div className="st-grid" style={st.grid}>
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
  bannerBg: { position:"absolute", inset:0, background:"#fff", zIndex:0 },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:700, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  bannerSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.95rem", fontWeight:300, color:"rgba(253,240,245,0.7)", position:"relative", zIndex:1 },
  section: { background:"#AEAAD5", padding:"72px 48px 96px" },
  grid: { display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24, maxWidth:1000, margin:"0 auto" },
  card: { background:"rgba(255, 255, 255, 0.85)", backdropFilter:"blur(10px)", borderRadius:20, padding:"40px 36px 36px", boxShadow:"0 4px 32px rgba(75,30,86,0.07)", border:"1px solid rgba(124, 92, 191, 0.15)", display:"flex", flexDirection:"column", gap:20 },
  quoteIcon: { fontFamily:"'Astrid Regular',serif", fontSize:"3rem", color:"#8a5a97", lineHeight:1, height:32, display:"block" },
  quote: { fontFamily:"'Astrid Regular',serif", fontSize:"1.15rem", fontStyle:"italic", color:"#1a0a2e", lineHeight:1.75, flexGrow:1 },
  author: { borderTop:"1px solid #ede7f5", paddingTop:20 },
  name: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.88rem", fontWeight:600, color:"#1a0a2e", marginBottom:4 },
  role: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.14em", color:"#8a5a97" },
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
            <button key={tier} className={`jp-tabBtn ${activeTier === tier ? 'active' : ''}`} style={{ ...jp.tabBtn, ...(activeTier === tier ? { ...jp.tabActive, background: "#D7238F" } : {}) }} onClick={() => handleTierChange(tier)}>{tier}</button>
          ))}
        </div>

        <div ref={formRef} className="jp-card" style={{ ...jp.card, opacity: formVisible?1:0, transform: formVisible?"translateY(0)":"translateY(24px)", transition:"opacity 0.35s ease,transform 0.35s ease", borderTop:`3px solid ${meta.color}` }}>
          {isSubmitted ? (
            <div style={jp.successBox}>
              <div style={{ ...jp.successIcon, color: meta.color }}>✦</div>
              <h2 style={{ ...jp.successTitle, color: meta.color }}>Application Submitted!</h2>
              <p style={jp.successText}>Thank you for applying for <strong>{meta.label} Membership</strong>. Our team will be in touch within 48 hours.</p>
              <button style={{ ...jp.submitBtn }} onClick={() => setSubmitted(prev => ({ ...prev, [activeTier]: false }))}>SUBMIT ANOTHER</button>
            </div>
          ) : (
            <>
              <div style={jp.formHeader}>
                <h2 className="jp-form-title" style={jp.formTitle}>Apply for {meta.label} Membership</h2>
                <p className="jp-form-sub" style={jp.formSub}>Complete this form and our team will be in touch within 48 hours.</p>
                <p style={{ ...jp.tagline, color: meta.color }}>{meta.tagline}</p>
              </div>
              <div className="jp-row" style={jp.row}>
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
              <button style={{ ...jp.submitBtn }} onClick={() => handleSubmit(activeTier)}
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
  bannerBg: { position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 80% at 50% 50%,#ede7f5 0%,#ddd0ea 30%,#c9b8dd 60%,#AEAAD5 100%)", zIndex:0 },
  blobL: { position:"absolute", top:-60, left:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(75,30,86,0.28) 0%,transparent 70%)", animation:"floatBlob 8s ease-in-out infinite", zIndex:1 },
  blobR: { position:"absolute", bottom:-80, right:-60, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(102,35,105,0.25) 0%,transparent 70%)", animation:"floatBlob 11s ease-in-out infinite reverse", zIndex:1 },
  eyebrowRow: { display:"flex", alignItems:"center", gap:12, justifyContent:"center", marginBottom:16 },
  line: { display:"inline-block", width:40, height:1, background:"#4B1E56" },
  eyebrowTxt: { fontFamily:"'Montserrat', sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.28em", color:"#4B1E56" },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:700, color:"#1a0a2e" },
  formSection: { maxWidth:780, margin:"0 auto", padding:"64px 24px 96px", animation:"fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) 0.1s both" },
  tabsRow: { display:"flex", justifyContent:"center", gap:12, marginBottom:36, flexWrap:"wrap" as const },
  tabBtn: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"10px 28px", borderRadius:100, border:"1.5px solid #ded4ee", background:"transparent", color:"#1a0a2e", cursor:"pointer", transition:"all 0.25s ease" },
  tabActive: { color:"#fff", border:"1.5px solid transparent", boxShadow:"0 4px 20px rgba(75,30,86,0.28)", transform:"translateY(-1px)" },
  card: { background:"#fff", borderRadius:20, padding:"48px 52px 52px", boxShadow:"0 8px 60px rgba(75,30,86,0.10),0 2px 16px rgba(75,30,86,0.06)" },
  formHeader: { textAlign:"center", marginBottom:40 },
  formTitle: { fontFamily:"'Astrid Regular',serif", fontSize:"2rem", fontWeight:600, color:"#1a0a2e", marginBottom:8 },
  formSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.88rem", color:"#8a5a97", fontWeight:300, marginBottom:8 },
  tagline: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.82rem", fontWeight:500, letterSpacing:"0.05em", marginTop:6 },
  row: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 },
  fieldWrap: { display:"flex", flexDirection:"column", marginBottom:16 },
  input: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.9rem", fontWeight:400, padding:"13px 16px", borderRadius:10, border:"1.5px solid #ede7f5", background:"#fdf9fc", color:"#1a0a2e", transition:"border-color 0.2s,box-shadow 0.2s", width:"100%" },
  inputErr: { borderColor:"#a04a70", background:"#fff8f9" },
  select: { appearance:"none", WebkitAppearance:"none", cursor:"pointer", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12  8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234B1E56' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center", paddingRight:40 },
  textarea: { resize:"vertical", minHeight:110, lineHeight:1.6 },
  errMsg: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", color:"#a04a70", marginTop:5, paddingLeft:4 },
  agreeRow: { marginBottom:28, marginTop:4 },
  agreeLabel: { display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer" },
  checkbox: { marginTop:3, accentColor:"#4B1E56", width:15, height:15, flexShrink:0 },
  agreeText: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.83rem", color:"#554866", lineHeight:1.5 },
  agreeLink: { textDecoration:"underline", textUnderlineOffset:"2px" },
  submitBtn: { width:"100%", fontFamily:"'Montserrat', sans-serif", fontSize:"0.78rem",background: "#D7238F" ,fontWeight:600, letterSpacing:"0.18em", color:"#fff", border:"none", borderRadius:10, padding:"15px 24px", cursor:"pointer", transition:"opacity 0.2s,transform 0.2s,box-shadow 0.2s", boxShadow:"0 6px 24px rgba(75,30,86,0.30)" },
  successBox: { textAlign:"center", padding:"40px 24px" },
  successIcon: { fontSize:"2.5rem", marginBottom:16, display:"block" },
  successTitle: { fontFamily:"'Astrid Regular',serif", fontSize:"2rem", fontWeight:600, marginBottom:12 },
  successText: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.95rem", color:"#554866", lineHeight:1.7, marginBottom:32 },
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
    <div className="ms-ellevation-root" style={{ fontFamily:"'Montserrat', sans-serif", background:"#fdf9fc", minHeight:"100vh", color:"#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        /* Astrid Regular is a licensed/custom display font (not on Google Fonts).
           Replace the src url below with the path to your actual font file. */
        @font-face {
          font-family: 'Astrid Regular';
          src: url('/fonts/AstridRegular.woff2') format('woff2'),
               url('/fonts/AstridRegular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        html{-webkit-text-size-adjust:100%;}
        *{box-sizing:border-box;margin:0;padding:0;}
        img{max-width:100%;}
        input::placeholder,textarea::placeholder{color:#b09fc0;}
        select option{color:#1a0a2e;}
        input:focus,textarea:focus,select:focus{outline:none;border-color:#4B1E56!important;box-shadow:0 0 0 3px rgba(75,30,86,0.12);}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
        @keyframes floatBlob{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(20px,-15px) scale(1.04);}66%{transform:translate(-10px,10px) scale(0.97);}}
        button:hover{opacity:0.88;}

        /* ═══════════════════════════════════════
           NAVBAR — one single centered pill row
           (no separate white box behind it anymore)
           ═══════════════════════════════════════ */
        .ms-nav-row{
          position:sticky; top:0; z-index:100;
          display:flex; flex-direction:column; align-items:center;
          padding:16px 20px 0;
        }
        .ms-nav{
          width:100%;
          max-width:1180px;
          display:flex;
          align-items:center;
          gap:14px;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(75,30,86,0.08);
          border-radius:100px;
          padding:8px 10px 8px 8px;
          box-shadow:0 2px 16px rgba(75,30,86,0.08);
          transition:box-shadow 0.3s ease;
        }
        .ms-nav.ms-nav-scrolled{
          box-shadow:0 4px 32px rgba(75,30,86,0.18);
        }
        .ns-back-home{
          display:flex; align-items:center; gap:6px;
          font-family:'Montserrat', sans-serif;
          font-size:0.78rem; font-weight:600;
          color:#4B1E56;
          background:rgba(75,30,86,0.06);
          border:1px solid rgba(75,30,86,0.12);
          border-radius:100px;
          padding:9px 16px;
          cursor:pointer;
          white-space:nowrap;
          transition:all 0.2s ease;
          flex-shrink:0;
        }
        .ns-back-home:hover{ background:rgba(75,30,86,0.12); opacity:1; }
        .ns-logo{
          width:110px;
          height:auto;
          object-fit:contain;
          cursor:pointer;
          flex-shrink:0;
        }
        .ns-links-desktop{
          display:flex; align-items:center; gap:2px;
          flex:1;
          justify-content:center;
          flex-wrap:wrap;
        }
        .ns-link{
          font-family:'Montserrat', sans-serif;
          font-size:0.84rem; font-weight:500;
          color:#4B1E56; background:transparent;
          border:none; cursor:pointer;
          padding:9px 15px; border-radius:100px;
          transition:all 0.2s ease; white-space:nowrap;
        }
        .ns-link:hover{ background:rgba(75,30,86,0.06); opacity:1; }
        .ns-link.active{
          background:linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%);
          color:#fff; font-weight:600;
          box-shadow:0 2px 12px rgba(26,10,46,0.25);
        }
        .ns-link.active:hover{ opacity:1; }
        .ns-menu-toggle{
          display:none;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          gap:5px;
          width:38px; height:38px;
          border-radius:50%;
          border:none;
          background:rgba(75,30,86,0.06);
          cursor:pointer;
          flex-shrink:0;
        }
        .ns-menu-toggle span{
          display:block; width:18px; height:2px;
          background:#4B1E56; border-radius:2px;
          transition:all 0.25s ease;
        }
        .ns-menu-toggle.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
        .ns-menu-toggle.open span:nth-child(2){ opacity:0; }
        .ns-menu-toggle.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
        .ns-mobile-menu{
          max-height:0;
          overflow:hidden;
          width:100%;
          max-width:1180px;
          opacity:0;
          transition:max-height 0.3s ease, opacity 0.25s ease, margin 0.3s ease;
        }
        .ns-mobile-menu.open{
          max-height:420px;
          opacity:1;
          margin-top:10px;
        }
        .ns-mobile-menu .ns-mobile-link{
          display:block;
          width:100%;
          text-align:left;
          font-family:'Montserrat', sans-serif;
          font-size:0.92rem; font-weight:500;
          color:#4B1E56; background:transparent;
          border:none; cursor:pointer;
          padding:13px 18px; border-radius:14px;
          transition:all 0.2s ease;
        }
        .ns-mobile-menu.open{
          display:flex; flex-direction:column; gap:4px;
          background:rgba(255,255,255,0.97);
          backdrop-filter:blur(16px);
          border-radius:22px;
          padding:10px;
          box-shadow:0 12px 40px rgba(75,30,86,0.16);
          border:1px solid rgba(75,30,86,0.08);
        }
        .ns-mobile-link:hover{ background:rgba(75,30,86,0.06); opacity:1; }
        .ns-mobile-link.active{
          background:linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%) !important;
          color:#fff !important;
        }

        @media (max-width: 1024px){
          .ns-links-desktop{ display:none; }
          .ns-menu-toggle{ display:flex; }
        }
        @media (max-width: 560px){
          .ns-back-home span{ display:none; }
          .ns-back-home{ padding:9px 12px; }
          .ns-logo{ width:92px; }
          .ms-nav{ padding:7px 8px; gap:10px; }
        }

        /* ═══════════════════════════════════════
           RESPONSIVE — section grids collapse on
           tablet / mobile so nothing overflows
           ═══════════════════════════════════════ */
        @media (max-width: 900px){
          .hp-grid{ grid-template-columns:1fr !important; text-align:center; }
          .hp-grid .hp-btn-row{ justify-content:center !important; }
          .ab-feat-section{ grid-template-columns:1fr !important; }
          .jn-stages-grid{ grid-template-columns:1fr !important; }
          .pr-grid{ grid-template-columns:1fr !important; }
          .ev-grid{ grid-template-columns:1fr !important; }
          .st-grid{ grid-template-columns:1fr !important; }
          .jp-row{ grid-template-columns:1fr !important; }
        }
        @media (max-width: 768px){
          .hp-page{ padding:100px 24px 60px !important; min-height:auto !important; }
          .ab-banner{ padding:60px 24px !important; min-height:auto !important; }
          .ab-feat-section{ padding:56px 24px !important; }
          .ab-stories-teaser{ padding:56px 24px !important; }
          .jn-banner{ padding:56px 24px 48px !important; }
          .jn-stages{ padding:48px 24px 56px !important; }
          .jn-cta{ padding:48px 24px !important; }
          .pr-banner{ padding:56px 24px 48px !important; }
          .pr-section{ padding:40px 24px 64px !important; }
          .ev-banner{ padding:56px 24px 48px !important; }
          .ev-section{ padding:40px 24px 64px !important; }
          .st-banner{ padding:56px 24px 48px !important; }
          .st-section{ padding:48px 24px 64px !important; }
          .jp-card{ padding:36px 24px 40px !important; }
        }
        @media (max-width: 560px){
          .hp-headline{ font-size:2rem !important; }
          .hp-card{ padding:24px !important; }
          .jp-form-title{ font-size:1.5rem !important; }
        }

        /* ═══════════════════════════════════════
           Home page extra section 1: Impact Statement
           ═══════════════════════════════════════ */
        .impact-section {
          position: relative;
          overflow: hidden;
          background: #fffaed;
          padding: 110px 24px 130px;
        }
        .impact-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .impact-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .impact-blob-1 {
          top: -100px; right: -80px; width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(75,30,86,0.08) 0%, transparent 70%);
        }
        .impact-blob-2 {
          bottom: -60px; left: -100px; width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(124,92,191,0.1) 0%, transparent 70%);
        }
        .impact-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #662369;
          margin-bottom: 18px;
        }
        .impact-title {
          font-family: 'Astrid Regular', serif;
          font-size: 52px;
          font-weight: 700;
          line-height: 1.1;
          color: #4B1E56;
          margin: 0 0 40px;
        }
        .impact-glass-card {
          display: inline-block;
          max-width: 640px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(124, 92, 191, 0.15);
          border-radius: 28px;
          padding: 40px 44px;
          box-shadow: 0 20px 50px rgba(124, 92, 191, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease, background-color 0.3s ease, border-color 0.3s ease;
        }
        .impact-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 60px rgba(124, 92, 191, 0.16);
        }
        .impact-card-title {
          font-family: 'Montserrat', sans-serif;
          color: #662369;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 16px;
          line-height: 1.3;
        }
        .impact-card-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15.5px;
          line-height: 1.7;
          color: #554866;
          margin: 0;
        }
        .impact-tags {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        .impact-tag { display: flex; align-items: center; gap: 8px; }
        .impact-tag-icon { color: #662369; font-size: 15px; }
        .impact-tag-name {
          font-family: 'Astrid Regular', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a0a2e;
        }

        /* ═══════════════════════════════════════
           Home page extra section 2: Welcome
           Alternate section background → #AEAAD5
           ═══════════════════════════════════════ */
        .welcome-section {
          background: #AEAAD5;
          padding: 50px 24px;
        }
        .welcome-grid {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .welcome-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #662369;
          margin: 0 0 14px;
        }
        .welcome-title {
          font-family: 'Astrid Regular', serif;
          font-size: clamp(34px, 4.5vw, 50px);
          font-weight: 700;
          line-height: 1.18;
          color: #1a0a2e;
          margin: 0 0 22px;
        }
        .welcome-title-accent { color: #4B1E56; }
        .welcome-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15.5px;
          line-height: 1.75;
          color: #554866;
          margin: 0 0 32px;
          max-width: 460px;
        }
        .welcome-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 14px;
          border: none;
          background: #D7238F;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(75, 30, 86, 0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .welcome-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(75, 30, 86, 0.35);
        }
        .welcome-image-wrap { position: relative; }
        .welcome-image-frame {
          border-radius: 28px;
          overflow: hidden;
          aspect-ratio: 4 / 3.4;
          box-shadow: 0 24px 60px rgba(75, 30, 86, 0.18);
          border: 1px solid rgba(124, 92, 191, 0.2);
        }
        .welcome-badge {
          position: absolute;
          bottom: -22px;
          left: -22px;
          background: #1a0a2e;
          border-radius: 18px;
          padding: 16px 22px;
          box-shadow: 0 14px 34px rgba(0,0,0,0.22);
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .welcome-badge-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(75, 30, 86, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .welcome-badge-title {
          font-family: 'Astrid Regular', serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }
        .welcome-badge-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }

        @media (max-width: 868px) {
          .welcome-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .welcome-badge { left: 12px !important; bottom: -18px !important; }
        }
        @media (max-width: 640px) {
          .impact-section { padding: 80px 20px 100px !important; }
          .welcome-section { padding: 70px 20px !important; }
          .impact-glass-card { padding: 28px 24px !important; }
          .ns-back-home span { display: none; }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .ms-ellevation-root {
          background: #0d0614 !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .ms-nav {
          background: rgba(22, 13, 34, 0.92) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35) !important;
        }
        [data-theme="dark"] .ns-link {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .ns-link:hover {
          background: rgba(217, 168, 205, 0.1) !important;
        }
        [data-theme="dark"] .ns-back-home {
          color: #d9a8cd !important;
          background: rgba(217, 168, 205, 0.1) !important;
          border-color: rgba(217, 168, 205, 0.25) !important;
        }
        [data-theme="dark"] .ns-menu-toggle {
          background: rgba(217, 168, 205, 0.1) !important;
        }
        [data-theme="dark"] .ns-menu-toggle span {
          background: #d9a8cd !important;
        }
        [data-theme="dark"] .ns-mobile-menu.open {
          background: rgba(22, 13, 34, 0.97) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .ns-mobile-link {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .ns-mobile-link:hover {
          background: rgba(217, 168, 205, 0.1) !important;
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
          background: linear-gradient(160deg, #1a0a2e 0%, #4B1E56 50%, #0d0614 100%) !important;
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
        [data-theme="dark"] .ab-stories-teaser-bg {
          background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .jn-stages {
          background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .pr-section {
          background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .ev-section {
          background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .st-section {
          background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important;
        }

        /* ── Dark Mode for the new Home-page sections ── */
        [data-theme="dark"] .impact-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important;
        }
        [data-theme="dark"] .impact-eyebrow { color: #c9a3d9 !important; }
        [data-theme="dark"] .impact-title { color: #ffffff !important; }
        [data-theme="dark"] .impact-glass-card {
          background: rgba(25, 16, 38, 0.7) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .impact-card-title { color: #d9b8e8 !important; }
        [data-theme="dark"] .impact-card-desc { color: #cbd5e1 !important; }
        [data-theme="dark"] .impact-tag-icon { color: #c9a3d9 !important; }
        [data-theme="dark"] .impact-tag-name { color: #ffffff !important; }

        [data-theme="dark"] .welcome-section {
          background: linear-gradient(180deg, #160d22 0%, #0d0614 100%) !important;
        }
        [data-theme="dark"] .welcome-eyebrow { color: #c9a3d9 !important; }
        [data-theme="dark"] .welcome-title { color: #ffffff !important; }
        [data-theme="dark"] .welcome-title-accent { color: #d9b8e8 !important; }
        [data-theme="dark"] .welcome-desc { color: #cbd5e1 !important; }
        [data-theme="dark"] .welcome-image-frame { border-color: rgba(155, 109, 190, 0.25) !important; }
      `}</style>

      <Navbar current={page} nav={nav} />

      {page === "home" && (
        <>
          <HomePage nav={nav} />
          <ImpactStatementSection />
          <WelcomeSection nav={nav} />
        </>
      )}
      {page === "about"    && <AboutPage    nav={nav} />}
      {page === "journey"  && <JourneyPage  nav={nav} />}
      {page === "programs" && <ProgramsPage nav={nav} />}
      {page === "events"   && <EventsPage   nav={nav} />}
      {page === "stories"  && <StoriesPage />}
      {page === "join"     && <JoinPage />}
    </div>
  );
}