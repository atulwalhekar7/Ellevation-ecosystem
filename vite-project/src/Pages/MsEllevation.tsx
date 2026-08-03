import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import banner2 from "../assets/banner2.avif";
import LogoDark from "../assets/ms-ellevation-darkmode-logo.png";
import LogoLight from "../assets/Ms-Ellevation-whitemode-logo.png";
import emailjs from "@emailjs/browser";


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
//service Id :service_ux9vfej
//Template ID : template_oczchp4
//Public Key: Pu2wZN2ERnHjdboLI

// ✅ Toggle for the "She Did It. So Can You." transformational-stories teaser
// that lives at the bottom of the About page. Content + markup are left in
// place exactly as they were — this just keeps it out of the rendered page
// until we decide together whether/where to bring it back.
const SHOW_STORIES_TEASER = false;

// ─── Banner background images ────────────────────────────────────────────────
// Free-to-use Unsplash photos, one per page, chosen to match that page's theme.
// A dark gradient overlay is layered on top of every banner (see each page's
// `bannerBg` style below) so headline/body text stays readable no matter how
// bright or busy the underlying photo is.
const BANNER_IMAGES = {
  home: "https://images.unsplash.com/photo-1495837174058-628aafc7d610?auto=format&fit=crop&w=1920&q=80",       // women rising, hands up at sunset
  about: "https://images.unsplash.com/photo-1636986905406-758b0e280f49?auto=format&fit=crop&w=1920&q=80",      // circle of hands — community & sisterhood
  journey: "https://images.unsplash.com/photo-1607748838605-ebcbe8f15772?auto=format&fit=crop&w=1920&q=80",    // group on steps — path & progression
  programs: "https://images.unsplash.com/photo-1707409066859-a90674383d19?auto=format&fit=crop&w=1920&q=80",   // women together — programs & growth
  events: "https://images.unsplash.com/photo-1636987050384-9b079c700f63?auto=format&fit=crop&w=1920&q=80",     // hands joined — gathering & connection
  stories: "https://images.unsplash.com/photo-1621973856220-29115d9b5d29?auto=format&fit=crop&w=1920&q=80",    // women sitting together — intimate storytelling
  join: "https://images.unsplash.com/photo-1637072103875-1b29a09d9c91?auto=format&fit=crop&w=1920&q=80",       // group of women — joining the community
};

// ─── Home hero carousel images ──────────────────────────────────────────────
// Rotating set of images used behind the Home hero text. Re-uses the same
// vetted Unsplash photos already used elsewhere on the site (About + Programs
// banners) so every image is guaranteed to be a valid, already-in-use asset.
const HOME_CAROUSEL_IMAGES = [
  BANNER_IMAGES.home,
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80", // Women collaborating
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=80", // Woman leader inspiring others
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

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const target = document.documentElement;
    setTheme(target.getAttribute("data-theme") === "dark" ? "dark" : "light");

    const observer = new MutationObserver(() => {
      setTheme(target.getAttribute("data-theme") === "dark" ? "dark" : "light");
    });
    observer.observe(target, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);


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
          src={theme === "dark" ? LogoDark : LogoLight}
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

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SECTION COMPONENTS
// Reused across About / Programs / Your Journey, which all share the same
// Story → Identity → Confidence → Leadership → Impact framework, the same
// "whole woman" focus icons, "who this is for" style lists, and the same
// closing call-to-action treatment. Centralising them keeps copy edits easy.
// ═══════════════════════════════════════════════════════════════════════════

const JOURNEY_FRAMEWORK = [
  { title: "Story",      desc: "Every woman's journey matters." },
  { title: "Identity",   desc: "Know who you are and where you are going." },
  { title: "Confidence", desc: "Believe in your strengths and potential." },
  { title: "Leadership", desc: "Lead yourself and inspire others." },
  { title: "Impact",     desc: "Create positive change in your life and community." },
];

function JourneyFrameworkStrip() {
  return (
    <section className="jf-strip">
      <div className="jf-inner">
        <p className="jf-path">{JOURNEY_FRAMEWORK.map(s => s.title).join(" → ")}</p>
        <div className="jf-grid">
          {JOURNEY_FRAMEWORK.map(s => (
            <div key={s.title} className="jf-card">
              <h4 className="jf-card-title">{s.title}</h4>
              <p className="jf-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconTagsRow({ items }: { items: { icon: string; label: string }[] }) {
  return (
    <div className="icon-tags-row">
      {items.map(t => (
        <div key={t.label} className="icon-tag">
          <span className="icon-tag-icon">{t.icon}</span>
          <span className="icon-tag-label">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function BulletListSection({
  eyebrow, title, items, note,
}: { eyebrow?: string; title: string; items: string[]; note?: string }) {
  return (
    <section className="bullet-section">
      <div className="bullet-inner">
        {eyebrow && <p className="bullet-eyebrow">{eyebrow}</p>}
        <h2 className="bullet-title">{title}</h2>
        <ul className="bullet-list">
          {items.map(i => <li key={i}>{i}</li>)}
        </ul>
        {note && <p className="bullet-note">{note}</p>}
      </div>
    </section>
  );
}

interface CtaButton { label: string; page: Page; variant?: "solid" | "outline"; }
function ClosingCtaSection({
  eyebrow, title, body, buttons, nav,
}: { eyebrow?: string; title: string; body?: string; buttons: CtaButton[]; nav: (p: Page) => void }) {
  return (
    <section className="closing-cta">
      <div className="closing-cta-bg" />
      <div className="closing-cta-inner">
        {eyebrow && <p className="closing-cta-eyebrow">{eyebrow}</p>}
        <h2 className="closing-cta-title">{title}</h2>
        {body && <p className="closing-cta-body">{body}</p>}
        <div className="closing-cta-btns">
          {buttons.map(b => (
            <button
              key={b.label}
              className={b.variant === "outline" ? "closing-btn-outline" : "closing-btn-solid"}
              onClick={() => nav(b.page)}
            >{b.label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav }: { nav: (p: Page) => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance the hero carousel every 5s, unless paused by the user.
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HOME_CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const scrollToCommunity = () => {
    document.getElementById("community-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="hp-page" style={hp.page}>
      {/* Rotating background carousel */}
      <div style={hp.bgCarouselWrap}>
        {HOME_CAROUSEL_IMAGES.map((img, i) => (
          <div
            key={img + i}
            style={{
              ...hp.bgSlide,
              backgroundImage: `url('${img}')`,
              opacity: i === slideIndex ? 1 : 0,
            }}
          />
        ))}
        {/* Dark gradient overlay sits above every slide so text stays readable */}
        <div style={hp.bgOverlay} />
      </div>

      <div style={hp.blobTL} />
      <div style={hp.blobBR} />

      <div className="hp-grid" style={hp.grid}>
        <div style={hp.left}>
          <p className="hp-eyebrow" style={hp.eyebrow}>A Space for Women, By Women</p>
          <h1 className="hp-headline" style={hp.headline}>
            When Women Rise, Communities Rise.
          </h1>
          <p className="hp-sub" style={hp.sub}>
            Supporting women and young women from culturally and linguistically diverse (CALD)
            communities to grow in confidence, strengthen their identity and develop leadership.
          </p>
          <p className="hp-sub" style={hp.sub}>
            Welcome to Ms. Ellevation. A place for new beginnings, bold journeys and dreams taking flight.
          </p>
          <p className="hp-tagline" style={hp.tagline}>Find your place. Lift your voice. Flourish.</p>

          <div className="hp-btn-row" style={hp.btnRow}>
            <button style={hp.btnPrimary} onClick={() => nav("join")}>START YOUR JOURNEY</button>
            <button style={hp.btnSecondary} onClick={scrollToCommunity}>JOIN OUR COMMUNITY</button>
          </div>

          {/* Carousel controls — dot indicators + play/pause, sits under the text */}
          <div className="hp-carousel-controls" style={hp.carouselControls}>
            <button
              className="hp-carousel-toggle"
              style={hp.carouselToggle}
              onClick={() => setIsPaused(p => !p)}
              aria-label={isPaused ? "Play carousel" : "Pause carousel"}
            >
              {isPaused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
              )}
            </button>
            <div className="hp-carousel-dots" style={hp.carouselDots}>
              {HOME_CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className="hp-carousel-dot"
                  style={{ ...hp.carouselDot, ...(i === slideIndex ? hp.carouselDotActive : {}) }}
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const hp: Record<string, React.CSSProperties> = {
  page: { position:"relative", overflow:"hidden", minHeight:"78vh", display:"flex", alignItems:"center", padding:"60px 48px 90px" },
  bgCarouselWrap: { position:"absolute", inset:0, zIndex:0, overflow:"hidden" },
  bgSlide: { position:"absolute", inset:0, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat", transition:"opacity 1.2s ease-in-out" },
  bgOverlay: { position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(26,10,46,0.72) 0%, rgba(75,30,86,0.78) 100%)" },
  blobTL: { position:"absolute", top:-140, left:-120, width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle,rgba(215,178,100,0.18) 0%,transparent 70%)", animation:"floatBlob 10s ease-in-out infinite", zIndex:1 },
  blobBR: { position:"absolute", bottom:-120, right:-100, width:460, height:460, borderRadius:"50%", background:"radial-gradient(circle,rgba(215,178,100,0.16) 0%,transparent 70%)", animation:"floatBlob 13s ease-in-out infinite reverse", zIndex:1 },
  grid: { position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"1fr", gap:48, alignItems:"center", maxWidth:820, margin:"0 auto", width:"100%", textAlign:"center" as const, animation:"fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) both" },
  left: { display:"flex", flexDirection:"column", gap:18, alignItems:"center" },
  eyebrow: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.22em", color:"#EFBF68", textTransform:"uppercase" as const },
  headline: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.4rem,4vw,3.6rem)", fontWeight:700, color:"#ffffff", lineHeight:1.12, margin:0, textShadow:"0 2px 24px rgba(0,0,0,0.35)" },
  sub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"rgba(255,255,255,0.88)", lineHeight:1.75, maxWidth:520, margin:"0 auto" },
  tagline: { fontFamily:"'Astrid Regular', serif", fontSize:"1.1rem", fontStyle:"italic", color:"#EFBF68", margin:0 },
  btnRow: { display:"flex", gap:14, flexWrap:"wrap" as const, justifyContent:"center" as const },
  btnPrimary: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7B264", color:"#fff", cursor:"pointer", transition:"all 0.2s ease", boxShadow:"0 4px 20px rgba(0,0,0,0.35)" },
  btnSecondary: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"1.5px solid rgba(255,255,255,0.6)", background:"transparent", color:"#ffffff", cursor:"pointer", transition:"all 0.2s ease" },
  carouselControls: { display:"flex", alignItems:"center", gap:14, marginTop:8 },
  carouselToggle: { width:32, height:32, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.5)", background:"rgba(255,255,255,0.08)", color:"#ffffff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s ease", flexShrink:0 },
  carouselDots: { display:"flex", alignItems:"center", gap:8 },
  carouselDot: { width:8, height:8, padding:0, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.25)", cursor:"pointer", transition:"all 0.2s ease" },
  carouselDotActive: { background:"#EFBF68", borderColor:"#EFBF68", width:22, borderRadius:100 },
};

/* ══════════════════════════════════════════════
   HOME — SECTION 2 — "Why We Exist"
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
            Beyond every obstacle and uncertainty, Ms. Ellevation empowers women to claim their space,
            amplify their voice and flourish.
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
   HOME — SECTION 3 — "You Don't Have to Walk the
   Journey Alone" (community section, anchored so
   the hero's "Join Our Community" button can jump
   straight to it)
   ══════════════════════════════════════════════ */
function CommunitySection({ nav }: { nav: (p: Page) => void }) {
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
    <section id="community-section" ref={ref} className="welcome-section">
      <div className="welcome-grid">
        {/* LEFT — text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="welcome-eyebrow">Community</p>
          <h2 className="welcome-title">
            You Don't Have to Walk the Journey Alone
          </h2>
          <p className="welcome-desc">
            Become part of a supportive community of women committed to growth, leadership and
            connection. Whether you are finding your voice, rebuilding confidence or pursuing new
            opportunities, there is a place for you here.
          </p>

          <button onClick={() => nav("programs")} className="welcome-cta">
            Explore Our Programs
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
              alt="Ms. Ellevation community"
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

/* ══════════════════════════════════════════════
   HOME — SECTION 4 — "Supporting Every Step of
   the Journey" (pathways)
   ══════════════════════════════════════════════ */
const PATHWAYS = [
  { title: "Leadership Development", desc: "Building confidence, leadership skills and personal growth." },
  { title: "Community & Connection", desc: "Meaningful relationships and a sense of belonging." },
  { title: "Personal Growth",        desc: "Strengthen identity, wellbeing and self-belief." },
  { title: "Events & Experiences",   desc: "Learn, connect and grow alongside other women." },
];

function PathwaysSection() {
  return (
    <section className="pathways-section">
      <div className="pathways-inner">
        <p className="pathways-eyebrow">Pathways</p>
        <h2 className="pathways-title">Supporting Every Step of the Journey</h2>
        <div className="pathways-grid">
          {PATHWAYS.map(p => (
            <div key={p.title} className="pathways-card">
              <h3 className="pathways-card-title">{p.title}</h3>
              <p className="pathways-card-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const OUR_VALUES = [
  { title: "Empowerment", desc: "We equip women with the tools, knowledge, and confidence to take control of their lives and achieve their full potential." },
  { title: "Inclusivity", desc: "We celebrate and embrace the diverse backgrounds, experiences, and voices of all women, ensuring everyone feels valued, seen, and a true sense of belonging." },
  { title: "Resilience", desc: "We foster the strength to navigate challenges, learn from setbacks, and bounce back stronger, transforming adversity into growth and courage." },
  { title: "Integrity", desc: "We act with honesty, transparency, and ethical conduct, building trust and maintaining credibility in all our relationships." },
  { title: "Growth", desc: "We champion continuous personal and professional development, encouraging a lifelong journey of learning, adaptation, and expansion." },
  { title: "Community", desc: "We cultivate a supportive and collaborative sisterhood where women can connect, share, and uplift one another, finding strength, safety, and momentum in collective support." },
];

const FOCUS_ITEMS = [
  { icon: "◈", label: "Voice" },
  { icon: "✦", label: "Identity" },
  { icon: "❀", label: "Confidence" },
  { icon: "✧", label: "Leadership" },
  { icon: "♥", label: "Wellbeing" },
  { icon: "✧", label: "Community" },
];

const WHO_WE_SUPPORT = [
  "Young women (17–25)",
  "Women from culturally and linguistically diverse communities",
  "Migrant and refugee women",
  "Emerging leaders",
  "Women navigating life transitions",
  "Women seeking confidence, connection and growth",
];

function AboutPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="ab-page-root">
      <section className="ab-banner" style={ab.banner}>
        <div className="ab-banner-bg" style={ab.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p className="ab-eye" style={ab.bannerEye}>ABOUT MS. ELLEVATION</p>
          <h1 className="ab-banner-title" style={ab.bannerTitle}>More Than a Program.<br />A Community.</h1>
          <p className="ab-banner-sub" style={ab.bannerSub}>
            Ms. Ellevation is the women's pathway within the Ellevation ecosystem — a space for
            women, by women. We exist to help women and young women strengthen their identity,
            build confidence, develop leadership and create lives filled with purpose, opportunity
            and connection. Because when women rise, communities rise.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:32, flexWrap:"wrap" as const }}>
            <button style={ab.btnD} onClick={() => nav("join")}>START YOUR JOURNEY</button>
            <button className="ab-btn-outline" style={ab.btnL} onClick={() => nav("join")}>JOIN OUR COMMUNITY</button>
          </div>
        </div>
      </section>

      {/* ── Our Story & Heart ── */}
      <section className="story-section">
        <div className="story-inner">
          <p className="story-eyebrow">Our Story &amp; Heart</p>
          <h2 className="story-title">Igniting Her Journey.</h2>
          <p className="story-subtitle">The Ms. Ellevation Difference: A Foundation of Growth and Care.</p>

          <p className="story-p">
            Ms. Ellevation was born out of a profound understanding of the unique journeys women navigate.
          </p>
          <p className="story-p">
            Our story is rooted in four lived experiences: the journey of migration as a child from
            Africa to Australia, experiencing domestic violence and mental health challenges in early
            adulthood, the battle from self-doubt to confidence, and the realities of building a
            business in Australia as a migrant woman.
          </p>
          <p className="story-p">
            These experiences shaped the heart of Ms. Ellevation and continue to fuel our passion and purpose.
          </p>
          <p className="story-p">
            We understand that many women carry invisible challenges while pursuing their dreams,
            rebuilding their confidence, raising families, navigating new cultures, advancing careers
            and creating opportunities for themselves and future generations.
          </p>
          <p className="story-p story-p-strong">This is why Ms. Ellevation exists.</p>
          <p className="story-p">
            We are here to champion women, particularly women from culturally and linguistically
            diverse (CALD) communities and young women shaping their futures, empowering them to
            flourish, lead and elevate their impact.
          </p>
          <p className="story-p">
            We believe in a holistic approach to success that supports not only careers and
            businesses, but also confidence, communication, wellbeing, leadership and financial
            independence.
          </p>
        </div>
      </section>

      {/* ── The Ms. Ellevation Journey ── */}
    
      <JourneyFrameworkStrip />

      {/* ── Vision & Mission ── */}
      <section className="vm-section">
        <div className="vm-grid">
          <div className="vm-card">
            <p className="vm-eyebrow">Our Vision</p>
            <p className="vm-text">
              An Australia where the collective power of women — across all diversities and stages
              of life — flourishing with confidence, leads boldly, and shapes the narratives that
              transform industries and communities.
            </p>
          </div>
          <div className="vm-card">
            <p className="vm-eyebrow">Our Mission</p>
            <p className="vm-text">
              We empower women from diverse backgrounds, especially women from culturally and
              linguistically diverse (CALD) communities and emerging young achievers, to confidently
              flourish, lead and amplify their impact in their careers, businesses, and lives by
              building inner strength and powerful networks.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="values-section">
        <div className="values-inner">
          <p className="values-eyebrow">Our Values</p>
          <div className="values-grid">
            {OUR_VALUES.map(v => (
              <div key={v.title} className="values-card">
                <h3 className="values-card-title">{v.title}</h3>
                <p className="values-card-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Focus ── */}
      <section className="focus-section">
        <div className="focus-inner">
          <p className="focus-eyebrow">Our Focus</p>
          <h2 className="focus-title">Supporting the Whole Woman</h2>
          <IconTagsRow items={FOCUS_ITEMS} />
          <p className="focus-note">
            Because lasting transformation happens when women are supported as whole individuals.
          </p>
        </div>
      </section>

      {/* ── One Mission. Two Pathways. ── */}
      <section className="pathway2-section">
        <div className="pathway2-inner">
          <p className="pathway2-eyebrow">One Mission. Two Pathways.</p>
          <div className="pathway2-grid">
            <div className="pathway2-card">
              <h3 className="pathway2-card-title">Building the Woman</h3>
              <p className="pathway2-card-desc">
                Ms. Ellevation supports women through Identity, Confidence, Leadership and Wellbeing.
              </p>
            </div>
            <div className="pathway2-card pathway2-card-dark">
              <h3 className="pathway2-card-title">Building the Ecosystem</h3>
              <p className="pathway2-card-desc">
                Through Ellevation Hub, women are connected to opportunities, partnerships, networks
                and pathways.
              </p>
            </div>
          </div>
          <p className="pathway2-note">
            Together they form one connected ecosystem where personal growth meets opportunity.
          </p>
        </div>
      </section>

      {/* ── Who We Support ── */}
      <BulletListSection title="Who We Support" items={WHO_WE_SUPPORT} />

      {/* ── (hidden for now) Transformational Stories teaser ──
           Left in place exactly as built — just not rendered until we
           decide together where it belongs on the page. */}
      {SHOW_STORIES_TEASER && (
        <section className="ab-stories-teaser" style={ab.storiesTeaser}>
          <div className="ab-stories-teaser-bg" style={ab.storiesTeaserBg} />
          <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
            <p style={ab.tEye}>— TRANSFORMATIONAL STORIES —</p>
            <h2 className="ab-t-title" style={ab.tTitle}>She Did It. So Can You.</h2>
            <p className="ab-t-sub" style={ab.tSub}>Real women, real transformations. Discover how Ms. Ellevation has changed lives.</p>
            <button style={ab.tBtn} onClick={() => nav("stories")}>READ THEIR STORIES</button>
          </div>
        </section>
      )}

      {/* ── Closing ── */}
      <ClosingCtaSection
        nav={nav}
        title="When Women Rise, Communities Rise."
        body="Whether you are seeking confidence, connection, leadership development or a community that understands your journey, there is a place for you here. Find your place. Lift your voice. Flourish."
        buttons={[
          { label: "START YOUR JOURNEY", page: "join" },
          { label: "JOIN OUR COMMUNITY", page: "join", variant: "outline" },
        ]}
      />
    </div>
  );
}

const ab: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", minHeight:420, display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 48px" },
  bannerBg: {
    position:"absolute", inset:0,
    background:`linear-gradient(180deg, rgba(26,10,46,0.68) 0%, rgba(75,30,86,0.75) 100%), url('${BANNER_IMAGES.about}') center/cover no-repeat`,
    zIndex:0
  },
  bannerEye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#EFBF68", marginBottom:16 },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:700, color:"#ffffff", lineHeight:1.15, marginBottom:20, textShadow:"0 2px 24px rgba(0,0,0,0.35)" },
  bannerSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"rgba(255,255,255,0.9)", lineHeight:1.7, maxWidth:640, margin:"0 auto" },
  btnD: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7B264", color:"#fff", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(0,0,0,0.35)" },
  btnL: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"1.5px solid rgba(255,255,255,0.6)", background:"transparent", color:"#ffffff", cursor:"pointer" },
  storiesTeaser: { position:"relative", overflow:"hidden", padding:"80px 48px", textAlign:"center" },
  storiesTeaserBg: { position:"absolute", inset:0, background:"linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", zIndex:0 },
  tEye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#662369", marginBottom:16, position:"relative", zIndex:1 },
  tTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, color:"#1a0a2e", marginBottom:16, position:"relative", zIndex:1 },
  tSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.95rem", fontWeight:300, color:"#443355", lineHeight:1.7, maxWidth:520, margin:"0 auto 32px", position:"relative", zIndex:1 },
  tBtn: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.18em", padding:"13px 32px", borderRadius:100, border:"2px solid #D7B264", background:"#D7B264", color:"#ffffff", cursor:"pointer", position:"relative", zIndex:1 },
};

// ─── YOUR JOURNEY PAGE ──────────────────────────────────────────────────────
const STAGES = [
  {
    num: "01", title: "Identity", heading: "Discover Who You Are",
    desc: "Every journey begins with identity. Before confidence can grow, women need the space to reconnect with who they are, what they value and what they want for their future.",
    outcomes: ["Clarity", "Self-awareness", "Purpose"],
  },
  {
    num: "02", title: "Confidence", heading: "Believe in Your Potential",
    desc: "Confidence is not about being fearless. It is about trusting yourself enough to take the next step. As confidence grows, women begin speaking up, embracing opportunities and recognising their worth.",
    outcomes: ["Self-belief", "Resilience", "Courage"],
  },
  {
    num: "03", title: "Leadership", heading: "Create Impact",
    desc: "Leadership starts with leading yourself. From there, women create positive change within their families, workplaces, businesses and communities.",
    outcomes: ["Growth", "Contribution", "Impact"],
  },
];

const JOURNEY_FOCUS_ITEMS = [
  { icon: "◈", label: "Identity" },
  { icon: "✦", label: "Confidence" },
  { icon: "❀", label: "Leadership" },
  { icon: "♥", label: "Wellbeing" },
  { icon: "✦", label: "Community" },
];

const JOURNEY_WHO_FOR = [
  "Young women (17–25)",
  "Women from CALD communities",
  "Migrant and refugee women",
  "Emerging leaders",
  "Women navigating life transitions",
  "Women seeking confidence, clarity and connection",
];

function JourneyPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="jn-page-root">
      <section className="jn-banner" style={jn.banner}>
        <div className="jn-banner-bg" style={jn.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p className="jn-eye" style={jn.eye}>— YOUR JOURNEY —</p>
          <h1 className="jn-banner-title" style={jn.bannerTitle}>Every Rise Has a Path.</h1>
          <p className="jn-banner-sub" style={jn.bannerSub}>
            At Ms. Ellevation, we believe every woman has the potential to thrive. Some women are
            discovering who they are. Some are rebuilding confidence. Some are stepping into
            leadership for the first time. Wherever you are in your journey, you do not have to
            walk it alone.
          </p>
          <p className="jn-banner-sub" style={jn.bannerSub}>
            Through identity, confidence and leadership, we create a pathway that helps women grow
            with purpose while remaining connected to their culture, values and lived experience.
          </p>
          <button style={jn.heroBtn} onClick={() => nav("join")}>START YOUR JOURNEY</button>
        </div>
      </section>

      <div className="story-inner story-inner-narrow" style={{ paddingTop: 64 }}>
        <p className="story-framework-lead">
          Transformation does not happen overnight. It happens through reflection, courage,
          community and action. At Ms. Ellevation, we support women through three interconnected
          stages of growth, guided by our five-stage framework.
        </p>
      </div>
      <JourneyFrameworkStrip />

      <section className="jn-stages" style={jn.stagesSection}>
        <div className="jn-stages-grid" style={jn.stagesGrid}>
          {STAGES.map((s) => (
            <div key={s.title} className="jn-stage-card" style={jn.stageCard}>
              <span className="jn-stage-num" style={jn.stageNum}>{s.num}</span>
              <h3 className="jn-stage-title" style={jn.stageTitle}>{s.title}</h3>
              <p className="jn-stage-heading">{s.heading}</p>
              <p className="jn-stage-desc" style={jn.stageDesc}>{s.desc}</p>
              <div className="jn-stage-outcomes">
                <span className="jn-stage-outcomes-label">Outcomes</span>
                <ul>
                  {s.outcomes.map(o => <li key={o}>{o}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="focus-section">
        <div className="focus-inner">
          <p className="focus-eyebrow">What Makes This Journey Different?</p>
          <h2 className="focus-title">We Focus on the Whole Woman</h2>
          <IconTagsRow items={JOURNEY_FOCUS_ITEMS} />
          <p className="focus-note">
            Because lasting change happens when women feel supported, connected and empowered.
          </p>
        </div>
      </section>

      <BulletListSection
        title="Who Is This For?"
        items={JOURNEY_WHO_FOR}
        note="No matter where you begin, there is a place for you here."
      />

      <ClosingCtaSection
        nav={nav}
        title="Your Next Chapter Starts Here."
        body="You already have the potential. This journey helps you discover it, strengthen it and use it to create meaningful impact. Identity → Confidence → Leadership. Find your place. Lift your voice. Flourish."
        buttons={[
          { label: "START YOUR JOURNEY", page: "join" },
          { label: "JOIN OUR COMMUNITY", page: "join", variant: "outline" },
        ]}
      />
    </div>
  );
}

const jn: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center", minHeight:340, display:"flex", alignItems:"center", justifyContent:"center" },
  bannerBg: { position:"absolute", inset:0, background:`linear-gradient(180deg, rgba(26,10,46,0.68) 0%, rgba(75,30,86,0.75) 100%), url('${BANNER_IMAGES.journey}') center/cover no-repeat`, zIndex:0 },
  eye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.25em", color:"#EFBF68", marginBottom:16, position:"relative", zIndex:1 },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.2rem,4.5vw,3.6rem)", fontWeight:700, color:"#ffffff", marginBottom:16, position:"relative", zIndex:1, textShadow:"0 2px 24px rgba(0,0,0,0.35)" },
  bannerSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.98rem", fontWeight:300, color:"rgba(255,255,255,0.9)", lineHeight:1.75, maxWidth:620, margin:"0 auto 12px", position:"relative", zIndex:1 },
  heroBtn: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7B264", color:"#fff", cursor:"pointer", marginTop:24, position:"relative", zIndex:1, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" },
  stagesSection: { padding:"32px 48px 80px", background:"#ffffff" },
  stagesGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, maxWidth:1080, margin:"0 auto" },
  stageCard: { position:"relative", background:"rgba(255, 255, 255, 0.8)", backdropFilter:"blur(10px)", borderRadius:20, padding:"36px 28px", boxShadow:"0 4px 32px rgba(75,30,86,0.08)", border:"1px solid rgba(124, 92, 191, 0.15)" },
  stageNum: { fontFamily:"'Astrid Regular', serif", fontSize:"2.4rem", fontWeight:600, color:"#8a5a97", display:"block", marginBottom:12 },
  stageTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"1.4rem", fontWeight:600, color:"#1a0a2e", marginBottom:6 },
  stageDesc: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.9rem", fontWeight:300, color:"#554866", lineHeight:1.7 },
};

// ─── PROGRAMS PAGE ───────────────────────────────────────────────────────────
const PROGRAM_DIFFERENCE_POINTS = [
  "Honour their story",
  "Strengthen their identity",
  "Build confidence",
  "Develop leadership",
  "Create impact",
];

const PROGRAMS = [
  {
    tag: "Our Signature Program",
    title: "My Journey, My Future",
    desc: "A guided pathway helping women strengthen identity, build confidence and create a vision for their future. This program supports women to navigate life in Australia, build meaningful connections, embrace their lived experiences and move forward with purpose.",
    label: "Focus Areas",
    items: ["Identity & Belonging","Confidence Building","Personal Growth","Goal Setting","Community Connection","Future Pathways"],
    icon: "path",
  },
  {
    tag: "Community Learning Series",
    title: "Empower Growth Workshops",
    desc: "A practical workshop series designed to support women through different stages of their journey.",
    label: "Topics May Include",
    items: ["Confident Communication","Building Confidence","Leadership Foundations","Financial Confidence","Career Confidence","Navigating Life in Australia","Wellbeing & Personal Growth"],
    icon: "spark",
  },
  {
    tag: "The Sisterhood Layer",
    title: "Community & Connection",
    desc: "A welcoming community where women connect, share experiences, build relationships and grow together.",
    label: "Includes",
    items: ["Community Events","Conversations","Sisterhood Circles","Guest Speakers","Networking Opportunities","Peer Support"],
    icon: "circle",
  },
];

const ECOSYSTEM_WOMAN = ["Story","Identity","Confidence","Leadership","Wellbeing","Community"];
const ECOSYSTEM_OPPORTUNITY = ["Employment Pathways","Entrepreneurship","Partnerships","Business Development","Industry Connections","Visibility Opportunities"];

function ProgramIcon({ type }: { type: string }) {
  if (type === "path") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 19c3-1 3-4 6-4s3 3 6 3 3-4 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="19" r="1.6" fill="currentColor" />
        <circle cx="21" cy="13" r="1.6" fill="currentColor" />
      </svg>
    );
  }
  if (type === "spark") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l1.8 5.6L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.4L12 3z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="8.5" cy="9" r="2.6" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="8" r="2.1" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 19c.6-3 2.4-4.6 5-4.6s4.4 1.6 5 4.6M13.6 14.7c2.2.1 3.7 1.6 4.2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProgramsPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="pr-page-root">
      <section className="pr-banner" style={pr.banner}>
        <div className="pr-banner-bg" style={pr.bannerBg} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <p className="pr-eye" style={pr.eye}>— OUR PROGRAMS —</p>
          <h1 className="pr-title" style={pr.title}>Programs Designed for Growth, Connection and Impact.</h1>
          <p className="pr-sub" style={pr.sub}>
            At Ms. Ellevation, we believe every woman has a story worth honouring. Our programs
            create safe and empowering spaces where women can draw strength from their lived
            experiences, strengthen their identity, build confidence and step into leadership.
          </p>
          <p className="pr-sub" style={pr.sub}>
            Through community, learning and meaningful connections, we support women to grow
            personally, professionally and within their communities.
          </p>
          <button style={pr.heroBtn} onClick={() => nav("join")}>START YOUR JOURNEY</button>
        </div>
      </section>

      {/* The Ms. Ellevation Difference */}
      <section className="story-section" style={{ paddingBottom: 24 }}>
        <div className="story-inner">
          <p className="story-eyebrow">The Ms. Ellevation Difference</p>
          <h2 className="story-title" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>We Don't Believe Women Need Fixing.</h2>
          <p className="story-p">
            We believe women already carry strength, resilience and potential within them. Our role
            is to create the environment, community and opportunities that help women recognise
            that strength and use it to create meaningful impact.
          </p>
          <p className="story-p story-p-strong">Every program, workshop and experience is designed to help women:</p>
          <ul className="story-inline-list">
            {PROGRAM_DIFFERENCE_POINTS.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      {/* Our Framework */}
      <div className="story-inner story-inner-narrow">
        <p className="story-framework-lead">Story → Identity → Confidence → Leadership → Impact</p>
      </div>
      <JourneyFrameworkStrip />

      {/* Programs */}
      <section className="pr-section" style={pr.section}>
        <div className="pr-grid" style={pr.grid}>
          {PROGRAMS.map((p, idx) => (
            <div key={p.title} className={`pr-card pr-card-${idx}`}>
              <div className="pr-card-glow" />
              <div className="pr-card-icon"><ProgramIcon type={p.icon} /></div>
              <span className="pr-card-tag">{p.tag}</span>
              <h3 className="pr-card-title">{p.title}</h3>
              <p className="pr-card-body">{p.desc}</p>
              <p className="pr-card-label">{p.label}</p>
              <ul className="pr-list">
                {p.items.map(f => (
                  <li key={f} className="pr-list-item">
                    <svg className="pr-list-check" width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="pr-book-btn" onClick={() => nav("join")}>
                START YOUR JOURNEY
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem */}
      <section className="pathway2-section">
        <div className="pathway2-inner">
          <p className="pathway2-eyebrow">Programs Within the Ellevation Ecosystem</p>
          <div className="pathway2-grid">
            <div className="pathway2-card">
              <h3 className="pathway2-card-title">Building the Woman</h3>
              <p className="pathway2-card-desc" style={{ marginBottom: 14 }}>Ms. Ellevation focuses on:</p>
              <ul className="pathway2-list">
                {ECOSYSTEM_WOMAN.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="pathway2-card pathway2-card-dark">
              <h3 className="pathway2-card-title">Building Opportunity</h3>
              <p className="pathway2-card-desc" style={{ marginBottom: 14 }}>Ellevation Hub focuses on:</p>
              <ul className="pathway2-list">
                {ECOSYSTEM_OPPORTUNITY.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingCtaSection
        nav={nav}
        title="When Women Rise, Communities Rise."
        body="Every program, workshop and community experience is designed to help women honour their stories, strengthen their identity, build confidence and step into leadership. Find your place. Lift your voice. Shine."
        buttons={[
          { label: "START YOUR JOURNEY", page: "join" },
          { label: "JOIN OUR COMMUNITY", page: "join", variant: "outline" },
        ]}
      />
    </div>
  );
}

const pr: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center" },
  bannerBg: { position:"absolute", inset:0, background:`linear-gradient(180deg, rgba(26,10,46,0.68) 0%, rgba(75,30,86,0.75) 100%), url('${BANNER_IMAGES.programs}') center/cover no-repeat`, zIndex:0 },
  eye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#EFBF68", marginBottom:16, position:"relative", zIndex:1 },
  title: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:700, color:"#ffffff", marginBottom:16, position:"relative", zIndex:1, textShadow:"0 2px 24px rgba(0,0,0,0.35)" },
  sub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"rgba(255,255,255,0.9)", lineHeight:1.7, position:"relative", zIndex:1, maxWidth:640, margin:"0 auto 10px" },
  heroBtn: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.16em", padding:"13px 28px", borderRadius:100, border:"none", background:"#D7B264", color:"#fff", cursor:"pointer", marginTop:20, position:"relative", zIndex:1, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" },
  section: { padding:"32px 48px 96px", background:"#ffffff" },
  grid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, maxWidth:1160, margin:"0 auto" },
};

// ─── EVENTS PAGE ────────────────────────────────────────────────────────────
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
          <p className="ev-eye" style={ev.eye}>— EVENTS —</p>
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
              <p className="ev-card-loc" style={ev.cardLoc}>{e.location}</p>
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
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center", minHeight:"clamp(380px, 42vw, 560px)", display:"flex", alignItems:"center", justifyContent:"center" },
  bannerBg: { position:"absolute", inset:0, background:`linear-gradient(180deg, rgba(26,10,46,0.68) 0%, rgba(75,30,86,0.75) 100%), url('${BANNER_IMAGES.events}') center/cover no-repeat`, zIndex:0 },
  eye: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.22em", color:"#EFBF68", marginBottom:16, position:"relative", zIndex:1 },
  title: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:700, color:"#ffffff", marginBottom:16, position:"relative", zIndex:1, textShadow:"0 2px 24px rgba(0,0,0,0.35)" },
  sub: { fontFamily:"'Montserrat', sans-serif", fontSize:"1rem", fontWeight:300, color:"rgba(255,255,255,0.9)", lineHeight:1.7, position:"relative", zIndex:1, maxWidth:500, margin:"0 auto" },
  section: { padding:"60px 48px 96px", background:"#ffffff" },
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
    border: "2px solid #D7B264",
    background: "#D7B264",
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
                <p className="st-role" style={st.role}>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const st: Record<string, React.CSSProperties> = {
  banner: { position:"relative", overflow:"hidden", padding:"80px 48px 72px", textAlign:"center", minHeight:"clamp(380px, 42vw, 560px)", display:"flex", alignItems:"center", justifyContent:"center" },
  bannerBg: { position:"absolute", inset:0, background:`linear-gradient(180deg, rgba(26,10,46,0.68) 0%, rgba(75,30,86,0.75) 100%), url('${BANNER_IMAGES.stories}') center/cover no-repeat`, zIndex:0 },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:700, color:"#ffffff", marginBottom:16, position:"relative", zIndex:1, textShadow:"0 2px 24px rgba(0,0,0,0.35)" },
  bannerSub: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.95rem", fontWeight:300, color:"rgba(255,255,255,0.9)", position:"relative", zIndex:1 },
  section: { background:"linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding:"72px 48px 96px" },
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
  const [sending, setSending] = useState(false);
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
  const handleSubmit = async (tier: MembershipTier) => {
  const currentForm = forms[tier];
  const errs = validateForm(currentForm);

  if (Object.keys(errs).length > 0) {
    setErrors(prev => ({ ...prev, [tier]: errs }));
    formRef.current?.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const templateParams = {
     form_title: "New Ms Ellevation Application - Enquiry",
  ms_display: "block",
  hub_display: "none",
  subject_detail: TIER_META[tier].label,
    form_source: "Ms. Ellevation — Membership Application",
    logo_url: "https://ellvation-ecosystem.web.app/assets/ms-ellevation-darkmode-logo-DqRDfzgt.png",

    membership_tier: TIER_META[tier].label,
    first_name: currentForm.firstName,
    last_name: currentForm.lastName,
    email: currentForm.email,
    phone: currentForm.phone || "",

    location: currentForm.location,
    profession: currentForm.profession,
    referral: currentForm.referral,
    goals: currentForm.goals,

    purpose: "",
    industry: "",
    notes: "",

    enquiry_type: "",
    organization: "",
    message: "",
  };

  console.log("Sending to EmailJS:", templateParams);
  setSending(true);

  try {
    const response = await emailjs.send(
      "service_ux9vfej",
      "template_i4p3erl",
      templateParams,
      { publicKey: "Pu2wZN2ERnHjdboLI" }
    );
    console.log("EmailJS SUCCESS:", response);
    setSubmitted(prev => ({ ...prev, [tier]: true }));
  } catch (error) {
    console.error("EmailJS FAILED:", error);
    alert("Your application could not be sent. Please try again.");
  } finally {
    setSending(false);
  }
};

  const meta = TIER_META[activeTier];
  const form = forms[activeTier];
  const errs = errors[activeTier];
  const isSubmitted = submitted[activeTier];

  return (
    <div className="jp-page-root">
      <section className="jp-banner" style={jp.banner}>
        <div style={{ position:"relative", zIndex:2, textAlign:"center", animation:"fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) both" }}>
          <div style={jp.eyebrowRow}><span className="jp-line" style={jp.line}/><span className="jp-eyebrow-txt" style={jp.eyebrowTxt}>MEMBERSHIP</span><span className="jp-line" style={jp.line}/></div>
          <h1 className="jp-banner-title" style={jp.bannerTitle}>Join Ellevation</h1>
        </div>
      </section>

      <section className="jp-form-section" style={jp.formSection}>
        <div style={jp.tabsRow}>
          {TIERS.map(tier => (
            <button key={tier} className={`jp-tabBtn ${activeTier === tier ? 'active' : ''}`} style={{ ...jp.tabBtn, ...(activeTier === tier ? { ...jp.tabActive, background: "#D7B264" } : {}) }} onClick={() => handleTierChange(tier)}>{tier}</button>
          ))}
        </div>

        <div ref={formRef} className="jp-card" style={{ ...jp.card, opacity: formVisible?1:0, transform: formVisible?"translateY(0)":"translateY(24px)", transition:"opacity 0.35s ease,transform 0.35s ease", borderTop:`3px solid ${meta.color}` }}>
          {isSubmitted ? (
            <div style={jp.successBox}>
              <h2 className="jp-success-title" style={{ ...jp.successTitle, color: meta.color }}>Application Submitted!</h2>
              <p className="jp-success-text" style={jp.successText}>Thank you for applying for <strong>{meta.label} Membership</strong>. Our team will be in touch within 48 hours.</p>
              <button style={{ ...jp.submitBtn }} onClick={() => setSubmitted(prev => ({ ...prev, [activeTier]: false }))}>SUBMIT ANOTHER</button>
            </div>
          ) : (
            <>
              <div style={jp.formHeader}>
                <h2 className="jp-form-title" style={jp.formTitle}>Apply for {meta.label} Membership</h2>
                <p className="jp-form-sub" style={jp.formSub}>Complete this form and our team will be in touch within 48 hours.</p>
                <p className="jp-tagline" style={{ ...jp.tagline, color: meta.color }}>{meta.tagline}</p>
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
                  <span className="jp-agree-text" style={jp.agreeText}>I agree to the Ellevation <a href="#" className="jp-agree-link" style={{ ...jp.agreeLink, color: meta.color }}>Community Guidelines</a> and <a href="#" className="jp-agree-link" style={{ ...jp.agreeLink, color: meta.color }}>Terms of Membership</a>.</span>
                </label>
                {errs.agree && <span style={jp.errMsg}>{errs.agree}</span>}
              </div>
              <button
                disabled={sending}
                style={{ ...jp.submitBtn, opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
                onClick={() => handleSubmit(activeTier)}
                onMouseEnter={e => { if (!sending) { (e.currentTarget as HTMLButtonElement).style.opacity="0.88"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(-2px)"; } }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity= sending ? "0.7" : "1"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; }}>
                {sending ? "SENDING..." : "SUBMIT APPLICATION"}
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
  banner: { position:"relative", overflow:"hidden", padding:"36px 24px 32px", textAlign:"center", minHeight:"clamp(190px, 21vw, 280px)", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg, #4B1E56 0%, #1a0a2e 100%)" },
  eyebrowRow: { display:"flex", alignItems:"center", gap:12, justifyContent:"center", marginBottom:16, position:"relative", zIndex:1 },
  line: { display:"inline-block", width:40, height:1, background:"rgba(255,255,255,0.6)" },
  eyebrowTxt: { fontFamily:"'Montserrat', sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.28em", color:"#EFBF68" },
  bannerTitle: { fontFamily:"'Astrid Regular', serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, color:"#ffffff", position:"relative", zIndex:1, textShadow:"0 2px 24px rgba(0,0,0,0.35)" },
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
  submitBtn: { width:"100%", fontFamily:"'Montserrat', sans-serif", fontSize:"0.78rem",background: "#D7B264" ,fontWeight:600, letterSpacing:"0.18em", color:"#fff", border:"none", borderRadius:10, padding:"15px 24px", cursor:"pointer", transition:"opacity 0.2s,transform 0.2s,box-shadow 0.2s", boxShadow:"0 6px 24px rgba(75,30,86,0.30)" },
  successBox: { textAlign:"center", padding:"40px 24px" },
  successTitle: { fontFamily:"'Astrid Regular',serif", fontSize:"2rem", fontWeight:600, marginBottom:12 },
  successText: { fontFamily:"'Montserrat', sans-serif", fontSize:"0.95rem", color:"#554866", lineHeight:1.7, marginBottom:32 },
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function EllevationPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = (searchParams.get("page") as Page) || "home";

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const nav = (p: Page) => {
    if (p === "home") {
      setSearchParams({});
    } else {
      setSearchParams({ page: p });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ms-ellevation-root" style={{ fontFamily:"'Montserrat', sans-serif", background:"#ffffff", minHeight:"100vh", color:"#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

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

        /* ═══════════════════════════════════════
           Global light hover effect for ALL buttons
           ═══════════════════════════════════════ */
        button{cursor:pointer;transition:opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;}
        button:hover{opacity:0.88;transform:translateY(-2px);filter:brightness(1.04);}
        button:active{transform:translateY(0);}
        button:disabled:hover{opacity:0.7;transform:none;filter:none;}

        .ms-ellevation-root{ padding-top: 96px; }
        .ms-nav-row{
          position:fixed; top:0; left:0; right:0; z-index:100;
          display:flex; flex-direction:column; align-items:center;
          padding:16px 20px 0;
        }
        .ms-nav{
          width:100%; max-width:1180px; display:flex; align-items:center; gap:14px;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(75,30,86,0.08); border-radius:100px;
          padding:8px 10px 8px 8px; box-shadow:0 2px 16px rgba(75,30,86,0.08);
          transition:box-shadow 0.3s ease;
        }
        .ms-nav.ms-nav-scrolled{ box-shadow:0 4px 32px rgba(75,30,86,0.18); }
        .ns-back-home{
          display:flex; align-items:center; gap:6px;
          font-family:'Montserrat', sans-serif; font-size:0.78rem; font-weight:600;
          color:#4B1E56; background:rgba(75,30,86,0.06);
          border:1px solid rgba(75,30,86,0.12); border-radius:100px;
          padding:9px 16px; cursor:pointer; white-space:nowrap; transition:all 0.2s ease; flex-shrink:0;
        }
        .ns-back-home:hover{ background:rgba(75,30,86,0.12); opacity:1; }
        .ns-logo{ width:110px; height:auto; object-fit:contain; cursor:pointer; flex-shrink:0; }
        .ns-links-desktop{ display:flex; align-items:center; gap:2px; flex:1; justify-content:center; flex-wrap:wrap; }
        .ns-link{
          font-family:'Montserrat', sans-serif; font-size:0.84rem; font-weight:500;
          color:#4B1E56; background:transparent; border:none; cursor:pointer;
          padding:9px 15px; border-radius:100px; transition:all 0.2s ease; white-space:nowrap;
        }
        .ns-link:hover{ background:rgba(75,30,86,0.06); opacity:1; transform:none; }
        .ns-link.active{
          background:linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%);
          color:#fff; font-weight:600; box-shadow:0 2px 12px rgba(26,10,46,0.25);
        }
        .ns-link.active:hover{ opacity:1; }
        .ns-menu-toggle{
          display:none; flex-direction:column; justify-content:center; align-items:center; gap:5px;
          width:38px; height:38px; border-radius:50%; border:none; background:rgba(75,30,86,0.06); cursor:pointer; flex-shrink:0;
        }
        .ns-menu-toggle:hover{ background:rgba(75,30,86,0.12); }
        .ns-menu-toggle span{ display:block; width:18px; height:2px; background:#4B1E56; border-radius:2px; transition:all 0.25s ease; }
        .ns-menu-toggle.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
        .ns-menu-toggle.open span:nth-child(2){ opacity:0; }
        .ns-menu-toggle.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
        .ns-mobile-menu{
          max-height:0; overflow:hidden; width:100%; max-width:1180px; opacity:0;
          transition:max-height 0.3s ease, opacity 0.25s ease, margin 0.3s ease;
        }
        .ns-mobile-menu.open{ max-height:420px; opacity:1; margin-top:10px; }
        .ns-mobile-menu .ns-mobile-link{
          display:block; width:100%; text-align:left;
          font-family:'Montserrat', sans-serif; font-size:0.92rem; font-weight:500;
          color:#4B1E56; background:transparent; border:none; cursor:pointer;
          padding:13px 18px; border-radius:14px; transition:all 0.2s ease;
        }
        .ns-mobile-menu.open{
          display:flex; flex-direction:column; gap:4px;
          background:rgba(255,255,255,0.97); backdrop-filter:blur(16px);
          border-radius:22px; padding:10px; box-shadow:0 12px 40px rgba(75,30,86,0.16);
          border:1px solid rgba(75,30,86,0.08);
        }
        .ns-mobile-link:hover{ background:rgba(75,30,86,0.06); opacity:1; transform:none; }
        .ns-mobile-link.active{
          background:linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%) !important; color:#fff !important;
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
          .ms-ellevation-root{ padding-top: 82px; }
        }

        @media (max-width: 900px){
          .hp-grid{ grid-template-columns:1fr !important; text-align:center; }
          .hp-grid .hp-btn-row{ justify-content:center !important; }
          .ab-feat-section{ grid-template-columns:1fr !important; }
          .jn-stages-grid{ grid-template-columns:1fr !important; }
          .pr-grid{ grid-template-columns:1fr !important; }
          .ev-grid{ grid-template-columns:1fr !important; }
          .st-grid{ grid-template-columns:1fr !important; }
          .jp-row{ grid-template-columns:1fr !important; }
          .vm-grid{ grid-template-columns:1fr !important; }
          .values-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .pathway2-grid{ grid-template-columns:1fr !important; }
          .pathways-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .jf-grid{ grid-template-columns:repeat(3,1fr) !important; }
        }
        @media (max-width: 768px){
          .hp-page{ padding:100px 24px 60px !important; min-height:auto !important; }
          .ab-banner{ padding:60px 24px !important; min-height:auto !important; }
          .ab-feat-section{ padding:56px 24px !important; }
          .ab-stories-teaser{ padding:56px 24px !important; }
          .jn-banner{ padding:56px 24px 48px !important; }
          .jn-stages{ padding:48px 24px 56px !important; }
          .pr-banner{ padding:56px 24px 48px !important; }
          .pr-section{ padding:40px 24px 64px !important; }
          .ev-banner{ padding:56px 24px 48px !important; min-height:clamp(320px, 60vw, 420px) !important; }
          .ev-section{ padding:40px 24px 64px !important; }
          .st-banner{ padding:56px 24px 48px !important; min-height:clamp(320px, 60vw, 420px) !important; }
          .st-section{ padding:48px 24px 64px !important; }
          .jp-banner{ padding:28px 24px 24px !important; min-height:clamp(160px, 30vw, 210px) !important; }
          .jp-card{ padding:36px 24px 40px !important; }
          .story-section, .story-inner{ padding-left:24px !important; padding-right:24px !important; }
          .values-grid{ grid-template-columns:1fr !important; }
          .pathways-grid{ grid-template-columns:1fr !important; }
          .jf-grid{ grid-template-columns:1fr !important; }
        }
        @media (max-width: 560px){
          .hp-headline{ font-size:2rem !important; }
          .jp-form-title{ font-size:1.5rem !important; }
          .ev-banner{ min-height:300px !important; }
          .st-banner{ min-height:300px !important; }
          .jp-banner{ min-height:150px !important; }
        }

        /* ═══════════════════════════════════════
           Home page: Impact / Why We Exist
           ═══════════════════════════════════════ */
        .impact-section { position: relative; overflow: hidden; background: #ffffff; padding: 110px 24px 130px; }
        .impact-inner { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; text-align: center; }
        .impact-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .impact-blob-1 { top: -100px; right: -80px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(75,30,86,0.08) 0%, transparent 70%); }
        .impact-blob-2 { bottom: -60px; left: -100px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(124,92,191,0.1) 0%, transparent 70%); }
        .impact-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #662369; margin-bottom: 18px; }
        .impact-title { font-family: 'Astrid Regular', serif; font-size: 52px; font-weight: 700; line-height: 1.1; color: #4B1E56; margin: 0 0 40px; }
        .impact-glass-card {
          display: inline-block; max-width: 640px; margin: 0 auto;
          background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(124, 92, 191, 0.15); border-radius: 28px; padding: 40px 44px;
          box-shadow: 0 20px 50px rgba(124, 92, 191, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease, background-color 0.3s ease, border-color 0.3s ease;
        }
        .impact-glass-card:hover { transform: translateY(-4px); box-shadow: 0 28px 60px rgba(124, 92, 191, 0.16); }
        .impact-card-title { font-family: 'Montserrat', sans-serif; color: #662369; font-size: 20px; font-weight: 700; margin: 0 0 16px; line-height: 1.3; }
        .impact-card-desc { font-family: 'Montserrat', sans-serif; font-size: 15.5px; line-height: 1.7; color: #554866; margin: 0; }
        .impact-tags { display: flex; justify-content: center; gap: 28px; margin-top: 28px; flex-wrap: wrap; }
        .impact-tag { display: flex; align-items: center; gap: 8px; }
        .impact-tag-icon { color: #662369; font-size: 15px; }
        .impact-tag-name { font-family: 'Astrid Regular', serif; font-size: 16px; font-weight: 700; color: #1a0a2e; }

        /* ═══════════════════════════════════════
           Home page: Community section
           ═══════════════════════════════════════ */
        .welcome-section { background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%); padding: 50px 24px; scroll-margin-top: 120px; }
        .welcome-grid { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .welcome-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #662369; margin: 0 0 14px; }
        .welcome-title { font-family: 'Astrid Regular', serif; font-size: clamp(34px, 4.5vw, 50px); font-weight: 700; line-height: 1.18; color: #1a0a2e; margin: 0 0 22px; }
        .welcome-desc { font-family: 'Montserrat', sans-serif; font-size: 15.5px; line-height: 1.75; color: #554866; margin: 0 0 32px; max-width: 460px; }
        .welcome-cta {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 14px; border: none;
          background: #D7B264; color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 13px;
          letter-spacing: 0.03em; text-decoration: none; cursor: pointer; box-shadow: 0 4px 14px rgba(75, 30, 86, 0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .welcome-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(75, 30, 86, 0.35); }
        .welcome-image-wrap { position: relative; }
        .welcome-image-frame { border-radius: 28px; overflow: hidden; aspect-ratio: 4 / 3.4; box-shadow: 0 24px 60px rgba(75, 30, 86, 0.18); border: 1px solid rgba(124, 92, 191, 0.2); }
        .welcome-badge {
          position: absolute; bottom: -22px; left: -22px; background: #1a0a2e; border-radius: 18px; padding: 16px 22px;
          box-shadow: 0 14px 34px rgba(0,0,0,0.22); border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 12px;
        }
        .welcome-badge-icon { width: 38px; height: 38px; border-radius: 50%; background: rgba(75, 30, 86, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .welcome-badge-title { font-family: 'Astrid Regular', serif; font-size: 16px; font-weight: 700; color: #fff; margin: 0; line-height: 1.2; }
        .welcome-badge-sub { font-family: 'Montserrat', sans-serif; font-size: 11px; color: rgba(255,255,255,0.65); margin: 0; }

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

        /* ═══════════════════════════════════════
           Home page: Pathways section
           ═══════════════════════════════════════ */
        .pathways-section { background: #ffffff; padding: 100px 24px 110px; }
        .pathways-inner { max-width: 1080px; margin: 0 auto; text-align: center; }
        .pathways-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #662369; margin-bottom: 16px; }
        .pathways-title { font-family: 'Astrid Regular', serif; font-size: clamp(1.9rem,4vw,2.8rem); font-weight: 700; color: #1a0a2e; margin-bottom: 48px; }
        .pathways-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; }
        .pathways-card { background: rgba(255,255,255,0.85); border: 1px solid rgba(124,92,191,0.15); border-radius: 20px; padding: 30px 24px; box-shadow: 0 4px 32px rgba(75,30,86,0.07); text-align: left; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .pathways-card:hover { transform: translateY(-4px); box-shadow: 0 10px 40px rgba(75,30,86,0.14); }
        .pathways-card-title { font-family: 'Astrid Regular', serif; font-size: 1.15rem; font-weight: 600; color: #4B1E56; margin-bottom: 10px; }
        .pathways-card-desc { font-family: 'Montserrat', sans-serif; font-size: 0.86rem; font-weight: 300; color: #554866; line-height: 1.65; }

        /* ═══════════════════════════════════════
           Home page: Hero carousel controls
           ═══════════════════════════════════════ */
        .hp-carousel-toggle:hover{ background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.8); transform:translateY(-1px); }
        .hp-carousel-dot:hover{ background:rgba(255,255,255,0.55); transform:translateY(-1px); }

        /* ═══════════════════════════════════════
           Shared: Journey Framework strip
           (Story → Identity → Confidence → Leadership → Impact)
           ═══════════════════════════════════════ */
        .jf-strip { background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%); padding: 56px 24px 72px; }
        .jf-inner { max-width: 1120px; margin: 0 auto; }
        .jf-path { text-align: center; font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #662369; margin-bottom: 32px; }
        .jf-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; }
        .jf-card { background: rgba(255,255,255,0.85); border: 1px solid rgba(124,92,191,0.15); border-radius: 16px; padding: 22px 18px; text-align: center; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .jf-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(75,30,86,0.14); border-color: rgba(124, 92, 191, 0.3); }
        .jf-card-title { font-family: 'Astrid Regular', serif; font-size: 1.05rem; font-weight: 600; color: #4B1E56; margin-bottom: 8px; }
        .jf-card-desc { font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 300; color: #554866; line-height: 1.5; }

        /* ═══════════════════════════════════════
           Shared: narrative / story-style text blocks
           ═══════════════════════════════════════ */
        .story-section { background: #ffffff; padding: 96px 24px 80px; }
        .story-inner { max-width: 760px; margin: 0 auto; }
        .story-inner-narrow { max-width: 820px; text-align: center; padding: 0 24px; }
        .story-framework-lead { font-family: 'Montserrat', sans-serif; font-size: 0.98rem; font-weight: 300; color: #554866; line-height: 1.8; }
        .story-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #662369; margin-bottom: 14px; }
        .story-title { font-family: 'Astrid Regular', serif; font-size: clamp(2rem,4vw,2.9rem); font-weight: 700; color: #1a0a2e; margin-bottom: 10px; }
        .story-subtitle { font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 500; color: #8a5a97; margin-bottom: 28px; }
        .story-p { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 300; color: #554866; line-height: 1.85; margin-bottom: 18px; }
        .story-p-strong { font-weight: 600; color: #4B1E56; }
        .story-inline-list { list-style: none; display: flex; flex-wrap: wrap; gap: 12px 22px; margin-top: 8px; }
        .story-inline-list li { font-family: 'Montserrat', sans-serif; font-size: 0.88rem; color: #554866; display: flex; align-items: center; gap: 8px; }
        .story-inline-list li::before { content: "✓"; color: #4B1E56; font-weight: 700; }

        /* ═══════════════════════════════════════
           Shared: Vision & Mission
           ═══════════════════════════════════════ */
        .vm-section { background: #ffffff; padding: 88px 24px; }
        .vm-grid { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .vm-card { background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%); border: 1px solid rgba(124, 92, 191, 0.15); border-top: 3px solid #4B1E56; border-radius: 22px; padding: 40px 36px; box-shadow: 0 4px 32px rgba(75,30,86,0.07); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .vm-card:hover { transform: translateY(-5px); box-shadow: 0 14px 44px rgba(75,30,86,0.14); }
        .vm-card:nth-child(2) { border-top-color: #D7B264; }
        .vm-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #662369; margin-bottom: 16px; }
        .vm-text { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 300; color: #554866; line-height: 1.85; }

        /* ═══════════════════════════════════════
           Shared: Values grid
           ═══════════════════════════════════════ */
        .values-section { background: #ffffff; padding: 96px 24px; }
        .values-inner { max-width: 1120px; margin: 0 auto; text-align: center; }
        .values-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #662369; margin-bottom: 40px; }
        .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .values-card { background: rgba(255,255,255,0.85); border: 1px solid rgba(124,92,191,0.15); border-radius: 20px; padding: 30px 26px; text-align: left; box-shadow: 0 4px 32px rgba(75,30,86,0.07); }
        .values-card-title { font-family: 'Astrid Regular', serif; font-size: 1.2rem; font-weight: 600; color: #4B1E56; margin-bottom: 10px; }
        .values-card-desc { font-family: 'Montserrat', sans-serif; font-size: 0.86rem; font-weight: 300; color: #554866; line-height: 1.7; }

        /* ═══════════════════════════════════════
           Shared: Focus icon row (used in About + Journey)
           ═══════════════════════════════════════ */
        .focus-section { background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%); padding: 96px 24px; }
        .focus-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .focus-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #662369; margin-bottom: 16px; }
        .focus-title { font-family: 'Astrid Regular', serif; font-size: clamp(1.8rem,3.5vw,2.4rem); font-weight: 700; color: #1a0a2e; margin-bottom: 36px; }
        .icon-tags-row { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-bottom: 28px; }
        .icon-tag { display: flex; align-items: center; gap: 8px; }
        .icon-tag-icon { color: #662369; font-size: 16px; }
        .icon-tag-label { font-family: 'Astrid Regular', serif; font-size: 15px; font-weight: 700; color: #1a0a2e; }
        .focus-note { font-family: 'Montserrat', sans-serif; font-size: 0.92rem; font-weight: 300; color: #554866; }

        /* ═══════════════════════════════════════
           Shared: Two Pathways / Ecosystem cards
           ═══════════════════════════════════════ */
        .pathway2-section { background: #ffffff; padding: 96px 24px; }
        .pathway2-inner { max-width: 1000px; margin: 0 auto; text-align: center; }
        .pathway2-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #662369; margin-bottom: 36px; }
        .pathway2-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; text-align: left; }
        .pathway2-card { background: rgba(255,255,255,0.85); border: 1px solid rgba(124,92,191,0.15); border-radius: 22px; padding: 34px 30px; box-shadow: 0 4px 32px rgba(75,30,86,0.07); }
        .pathway2-card-dark { background: #1a0a2e; border: none; color: #fff; box-shadow: 0 8px 48px rgba(26,10,46,0.3); }
        .pathway2-card-title { font-family: 'Astrid Regular', serif; font-size: 1.3rem; font-weight: 600; margin-bottom: 12px; color: #1a0a2e; }
        .pathway2-card-dark .pathway2-card-title { color: #fff; }
        .pathway2-card-desc { font-family: 'Montserrat', sans-serif; font-size: 0.9rem; font-weight: 300; color: #554866; line-height: 1.7; }
        .pathway2-card-dark .pathway2-card-desc { color: rgba(255,255,255,0.8); }
        .pathway2-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .pathway2-list li { font-family: 'Montserrat', sans-serif; font-size: 0.86rem; color: #554866; }
        .pathway2-card-dark .pathway2-list li { color: rgba(255,255,255,0.82); }
        .pathway2-list li::before { content: "• "; color: #4B1E56; font-weight: 700; }
        .pathway2-card-dark .pathway2-list li::before { color: #EFBF68; }
        .pathway2-note { font-family: 'Montserrat', sans-serif; font-size: 0.92rem; font-weight: 300; color: #554866; margin-top: 32px; }

        /* ═══════════════════════════════════════
           Shared: Bullet list section (Who We Support / Who Is This For)
           ═══════════════════════════════════════ */
        .bullet-section { background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%); padding: 90px 24px; }
        .bullet-inner { max-width: 760px; margin: 0 auto; text-align: center; }
        .bullet-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #662369; margin-bottom: 14px; }
        .bullet-title { font-family: 'Astrid Regular', serif; font-size: clamp(1.8rem,3.5vw,2.4rem); font-weight: 700; color: #1a0a2e; margin-bottom: 32px; }
        .bullet-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; text-align: left; margin-bottom: 20px; }
        .bullet-list li { font-family: 'Montserrat', sans-serif; font-size: 0.92rem; color: #554866; display: flex; align-items: center; gap: 10px; }
        .bullet-list li::before { content: "◈"; color: #4B1E56; font-size: 0.8rem; }
        .bullet-note { font-family: 'Montserrat', sans-serif; font-size: 0.92rem; font-style: italic; color: #662369; margin-top: 12px; }
        @media (max-width: 640px) { .bullet-list { grid-template-columns: 1fr !important; } }

        /* ═══════════════════════════════════════
           Shared: Closing CTA
           ═══════════════════════════════════════ */
        .closing-cta { position: relative; overflow: hidden; padding: 96px 24px; text-align: center; }
        .closing-cta-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #1a0a2e 0%, #4B1E56 100%); z-index: 0; }
        .closing-cta-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .closing-cta-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #EFBF68; margin-bottom: 16px; }
        .closing-cta-title { font-family: 'Astrid Regular', serif; font-size: clamp(2rem,4vw,3rem); font-weight: 700; color: #fff; margin-bottom: 18px; }
        .closing-cta-body { font-family: 'Montserrat', sans-serif; font-size: 0.98rem; font-weight: 300; color: rgba(255,255,255,0.85); line-height: 1.8; margin-bottom: 32px; }
        .closing-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .closing-btn-solid, .closing-btn-outline {
          font-family: 'Montserrat', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.16em;
          padding: 13px 30px; border-radius: 100px; cursor: pointer; transition: all 0.2s ease;
        }
        .closing-btn-solid { border: none; background: #D7B264; color: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        .closing-btn-outline { border: 1.5px solid rgba(255,255,255,0.5); background: transparent; color: #fff; }

        /* ═══════════════════════════════════════
           Journey Stages — redesigned cards
           ═══════════════════════════════════════ */
        .jn-stage-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .jn-stage-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(75,30,86,0.16);
          border-color: rgba(124, 92, 191, 0.3);
        }
        .jn-stage-num {
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(75,30,86,0.10) 0%, rgba(215,178,100,0.14) 100%);
          font-size: 1.3rem !important;
          margin-bottom: 18px !important;
        }
        .jn-stage-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #8a5a97;
          margin-bottom: 14px;
        }
        .jn-stage-outcomes {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid rgba(124, 92, 191, 0.14);
        }
        .jn-stage-outcomes-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #662369;
          margin-bottom: 12px;
        }
        .jn-stage-outcomes ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0;
          margin: 0;
        }
        .jn-stage-outcomes li {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: #4B1E56;
          background: rgba(75, 30, 86, 0.07);
          border: 1px solid rgba(75, 30, 86, 0.12);
          padding: 6px 14px;
          border-radius: 100px;
        }

        /* ═══════════════════════════════════════
           Programs Page — redesigned cards
           Distinct accent colour per card, icon badge,
           floating glow, pill-style feature chips and a
           full-width gradient CTA button.
           ═══════════════════════════════════════ */
        .pr-card {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(124, 92, 191, 0.14);
          border-radius: 24px;
          padding: 40px 32px 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 28px rgba(75,30,86,0.07);
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .pr-card::before {
          content: "";
          position: absolute; top: 0; left: 0; right: 0; height: 5px;
          background: linear-gradient(90deg, var(--pr-accent-1, #4B1E56), var(--pr-accent-2, #D7B264));
        }
        .pr-card-0 { --pr-accent-1: #4B1E56; --pr-accent-2: #8a5a97; }
        .pr-card-1 { --pr-accent-1: #662369; --pr-accent-2: #D7B264; }
        .pr-card-2 { --pr-accent-1: #6b2f7a; --pr-accent-2: #b98fd1; }
        .pr-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 26px 60px rgba(75,30,86,0.18);
          border-color: rgba(124, 92, 191, 0.32);
        }
        .pr-card-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--pr-accent-1, #4B1E56) 0%, transparent 70%);
          opacity: 0.10;
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .pr-card:hover .pr-card-glow { opacity: 0.18; transform: scale(1.15); }
        .pr-card-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--pr-accent-1, #4B1E56) 0%, var(--pr-accent-2, #8a5a97) 100%);
          color: #fff;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(75,30,86,0.28);
          position: relative; z-index: 1;
        }
        .pr-card-tag {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--pr-accent-1, #4B1E56);
          margin-bottom: 10px;
          position: relative; z-index: 1;
        }
        .pr-card-title {
          font-family: 'Astrid Regular', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #1a0a2e;
          margin-bottom: 12px;
          line-height: 1.25;
          position: relative; z-index: 1;
        }
        .pr-card-body {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.87rem;
          font-weight: 300;
          color: #554866;
          line-height: 1.7;
          margin-bottom: 22px;
          position: relative; z-index: 1;
        }
        .pr-card-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a5a97;
          margin-bottom: 12px;
          position: relative; z-index: 1;
        }
        .pr-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 28px;
          position: relative; z-index: 1;
        }
        .pr-list-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          color: #3d2e47;
          font-weight: 400;
        }
        .pr-list-check {
          flex-shrink: 0;
          color: #fff;
          background: var(--pr-accent-1, #4B1E56);
          border-radius: 50%;
          padding: 3px;
          box-sizing: content-box;
        }
        .pr-book-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          padding: 15px;
          border-radius: 100px;
          border: none;
          background: #d7b264;
          color: #fff;linear
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease;
          box-shadow: 0 8px 22px rgba(75,30,86,0.28);
          position: relative; z-index: 1;
        }
        .pr-book-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(75,30,86,0.36); opacity: 1; }
        .pr-book-btn svg { transition: transform 0.25s ease; }
        .pr-book-btn:hover svg { transform: translateX(3px); }

        [data-theme="dark"] .pr-card { background: #1f1330 !important; border-color: rgba(155,109,190,0.16) !important; box-shadow: 0 6px 28px rgba(0,0,0,0.35) !important; }
        [data-theme="dark"] .pr-card:hover { box-shadow: 0 26px 60px rgba(0,0,0,0.55) !important; border-color: rgba(155, 109, 190, 0.4) !important; }
        [data-theme="dark"] .pr-card-title { color: #f3ecff !important; }
        [data-theme="dark"] .pr-card-body { color: #d9a8cd !important; }
        [data-theme="dark"] .pr-card-label { color: #c9a3d9 !important; }
        [data-theme="dark"] .pr-list-item { color: #e8ddf5 !important; }
        [data-theme="dark"] .pr-card-tag { filter: brightness(1.4); }

        @media (max-width: 900px) {
          .pr-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .ms-ellevation-root { background: #0d0614 !important; color: #e8e0f8 !important; }
        [data-theme="dark"] .ms-nav { background: rgba(22, 13, 34, 0.92) !important; border-color: rgba(155, 109, 190, 0.15) !important; box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35) !important; }
        [data-theme="dark"] .ns-link { color: #d9a8cd !important; }
        [data-theme="dark"] .ns-link:hover { background: rgba(217, 168, 205, 0.1) !important; }
        [data-theme="dark"] .ns-back-home { color: #d9a8cd !important; background: rgba(217, 168, 205, 0.1) !important; border-color: rgba(217, 168, 205, 0.25) !important; }
        [data-theme="dark"] .ns-menu-toggle { background: rgba(217, 168, 205, 0.1) !important; }
        [data-theme="dark"] .ns-menu-toggle span { background: #d9a8cd !important; }
        [data-theme="dark"] .ns-mobile-menu.open { background: rgba(22, 13, 34, 0.97) !important; border-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] .ns-mobile-link { color: #d9a8cd !important; }
        [data-theme="dark"] .ns-mobile-link:hover { background: rgba(217, 168, 205, 0.1) !important; }
        [data-theme="dark"] .hp-headline, [data-theme="dark"] .ab-banner-title, [data-theme="dark"] .jn-banner-title,
        [data-theme="dark"] .pr-title, [data-theme="dark"] .ev-title, [data-theme="dark"] .st-banner-title, [data-theme="dark"] .jp-banner-title { color: #ffffff !important; }
        [data-theme="dark"] .hp-sub, [data-theme="dark"] .ab-banner-sub, [data-theme="dark"] .jn-banner-sub,
        [data-theme="dark"] .pr-sub, [data-theme="dark"] .ev-sub, [data-theme="dark"] .st-banner-sub { color: rgba(255,255,255,0.9) !important; }
        [data-theme="dark"] .hp-eyebrow, [data-theme="dark"] .ab-eye, [data-theme="dark"] .jn-eye,
        [data-theme="dark"] .pr-eye, [data-theme="dark"] .ev-eye, [data-theme="dark"] .vm-eyebrow { color: #EFBF68 !important; }
        [data-theme="dark"] .jn-stage-card,
        [data-theme="dark"] .ev-card, [data-theme="dark"] .st-card, [data-theme="dark"] .jp-card,
        [data-theme="dark"] .pathways-card, [data-theme="dark"] .jf-card, [data-theme="dark"] .values-card,
        [data-theme="dark"] .pathway2-card, [data-theme="dark"] .vm-card { background: #1f1330 !important; border-color: rgba(155, 109, 190, 0.15) !important; box-shadow: 0 8px 48px rgba(0, 0, 0, 0.5) !important; }
        [data-theme="dark"] .vm-card { border-top-color: rgba(155, 109, 190, 0.35) !important; }
        [data-theme="dark"] .jn-stage-desc,
        [data-theme="dark"] .ev-card-desc, [data-theme="dark"] .st-quote,
        [data-theme="dark"] .jp-form-sub, [data-theme="dark"] .jp-agree-text, [data-theme="dark"] .story-p,
        [data-theme="dark"] .story-framework-lead, [data-theme="dark"] .jf-card-desc, [data-theme="dark"] .values-card-desc,
        [data-theme="dark"] .pathways-card-desc, [data-theme="dark"] .bullet-list li, [data-theme="dark"] .welcome-desc,
        [data-theme="dark"] .focus-note, [data-theme="dark"] .pathway2-card-desc, [data-theme="dark"] .jn-stage-heading,
        [data-theme="dark"] .vm-text, [data-theme="dark"] .ev-card-loc, [data-theme="dark"] .st-role,
        [data-theme="dark"] .jp-success-text, [data-theme="dark"] .pathway2-note,
        [data-theme="dark"] .bullet-note, [data-theme="dark"] .pathway2-list li { color: #d9a8cd !important; }
        [data-theme="dark"] .jp-input, [data-theme="dark"] .jp-select, [data-theme="dark"] .jp-textarea { background: #0d0614 !important; border-color: rgba(155, 109, 190, 0.3) !important; color: #e8e0f8 !important; }
        [data-theme="dark"] .jp-input::placeholder, [data-theme="dark"] .jp-textarea::placeholder { color: rgba(232, 224, 248, 0.35) !important; }
        [data-theme="dark"] .jp-tabBtn { border-color: rgba(155, 109, 190, 0.3) !important; color: #d9a8cd !important; }
        [data-theme="dark"] .jp-tagline, [data-theme="dark"] .jp-success-title, [data-theme="dark"] .jp-agree-link { color: #e8b8f0 !important; }
        [data-theme="dark"] .jp-eyebrow-txt { color: #EFBF68 !important; }
        [data-theme="dark"] .jp-line { background: rgba(217,168,205,0.4) !important; }
        [data-theme="dark"] .ab-btn-outline { border-color: rgba(217,168,205,0.4) !important; color: #ffffff !important; }
        [data-theme="dark"] .ab-stories-teaser-bg { background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important; }
        [data-theme="dark"] .jn-stages { background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important; }
        [data-theme="dark"] .pr-section { background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important; }
        [data-theme="dark"] .ev-section { background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important; }
        [data-theme="dark"] .st-section { background: linear-gradient(135deg, #1c1130 0%, #0d0614 100%) !important; }

        [data-theme="dark"] .impact-section { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important; }
        [data-theme="dark"] .impact-eyebrow, [data-theme="dark"] .welcome-eyebrow, [data-theme="dark"] .pathways-eyebrow,
        [data-theme="dark"] .story-eyebrow, [data-theme="dark"] .values-eyebrow, [data-theme="dark"] .focus-eyebrow,
        [data-theme="dark"] .pathway2-eyebrow, [data-theme="dark"] .bullet-eyebrow, [data-theme="dark"] .jf-path,
        [data-theme="dark"] .icon-tag-icon { color: #c9a3d9 !important; }
        [data-theme="dark"] .icon-tag-label { color: #ffffff !important; }
        [data-theme="dark"] .impact-glass-card { background: rgba(25, 16, 38, 0.7) !important; border-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] .impact-card-title { color: #d9b8e8 !important; }
        [data-theme="dark"] .impact-card-desc { color: #cbd5e1 !important; }
        [data-theme="dark"] .impact-tag-icon { color: #c9a3d9 !important; }
        [data-theme="dark"] .impact-tag-name { color: #ffffff !important; }

        [data-theme="dark"] .welcome-section, [data-theme="dark"] .jf-strip, [data-theme="dark"] .focus-section,
        [data-theme="dark"] .bullet-section { background: linear-gradient(180deg, #160d22 0%, #0d0614 100%) !important; }
        [data-theme="dark"] .welcome-image-frame { border-color: rgba(155, 109, 190, 0.25) !important; }
        [data-theme="dark"] .story-section, [data-theme="dark"] .values-section, [data-theme="dark"] .pathway2-section,
        [data-theme="dark"] .pathways-section { background: #0d0614 !important; }
        [data-theme="dark"] .story-subtitle { color: #d9b8e8 !important; }
        [data-theme="dark"] .story-p-strong { color: #d9b8e8 !important; }
        [data-theme="dark"] .story-inline-list li { color: #d9a8cd !important; }
        [data-theme="dark"] .vm-section { background: linear-gradient(135deg, #0d0614 0%, #2d1740 100%) !important; }
        [data-theme="dark"] .pathway2-card-dark { background: #0d0614 !important; }
        [data-theme="dark"] .closing-cta-bg { background: linear-gradient(135deg, #0d0614 0%, #2d1740 100%) !important; }

        /* ═══════════════════════════════════════
           FIX: force all headings white/light in dark mode
           ═══════════════════════════════════════ */
        [data-theme="dark"] h1,
        [data-theme="dark"] h2,
        [data-theme="dark"] h3,
        [data-theme="dark"] h4 { color: #f3ecff !important; }

        [data-theme="dark"] .story-p,
        [data-theme="dark"] .jn-stage-heading,
        [data-theme="dark"] .jp-form-sub { color: #d9a8cd !important; }
        [data-theme="dark"] .jn-stage-num { background: linear-gradient(135deg, rgba(217,168,205,0.14) 0%, rgba(239,191,104,0.16) 100%) !important; color: #f3ecff !important; }
        [data-theme="dark"] .jn-stage-outcomes { border-top-color: rgba(155, 109, 190, 0.2) !important; }
        [data-theme="dark"] .jn-stage-outcomes li { color: #e8b8f0 !important; background: rgba(217, 168, 205, 0.08) !important; border-color: rgba(217, 168, 205, 0.2) !important; }
        [data-theme="dark"] .jn-stage-outcomes-label { color: #c9a3d9 !important; }

        /* ═══════════════════════════════════════
           Ecosystem lists → pill styling
           ═══════════════════════════════════════ */
        .pathway2-list { flex-direction: row !important; flex-wrap: wrap; gap: 10px !important; }
        .pathway2-list li {
          list-style: none;
          background: rgba(75, 30, 86, 0.07);
          border: 1px solid rgba(75, 30, 86, 0.14);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 0.82rem !important;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .pathway2-list li:hover { transform: translateY(-2px); border-color: rgba(75, 30, 86, 0.3); }
        .pathway2-list li::before { content: none !important; }
        .pathway2-card-dark .pathway2-list li {
          background: rgba(255,255,255,0.08);
          border-color: rgba(239,191,104,0.3);
        }
        .pathway2-card-dark .pathway2-list li:hover { border-color: rgba(239,191,104,0.55); }
        [data-theme="dark"] .pathway2-list li {
          background: rgba(217, 168, 205, 0.08) !important;
          border-color: rgba(217, 168, 205, 0.2) !important;
        }

        /* ═══════════════════════════════════════
           Uniform hover lift for the remaining cards
           ═══════════════════════════════════════ */
        .values-card, .pathway2-card, .ev-card, .st-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .values-card:hover, .pathway2-card:hover, .ev-card:hover, .st-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(75,30,86,0.16);
          border-color: rgba(124, 92, 191, 0.3);
        }
        [data-theme="dark"] .values-card:hover, [data-theme="dark"] .pathway2-card:hover,
        [data-theme="dark"] .ev-card:hover, [data-theme="dark"] .st-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.55) !important;
          border-color: rgba(155, 109, 190, 0.35) !important;
        }
      `}</style>

      <Navbar current={page} nav={nav} />

      {page === "home" && (
        <>
          <HomePage nav={nav} />
          <ImpactStatementSection />
          <CommunitySection nav={nav} />
          <PathwaysSection />
          <ClosingCtaSection
            nav={nav}
            eyebrow="Your Next Chapter"
            title="Your Next Chapter Starts Here"
            body="Join a community where women are empowered to grow, lead and thrive."
            buttons={[
              { label: "JOIN OUR COMMUNITY", page: "join" },
              { label: "EXPLORE OUR PROGRAMS", page: "programs", variant: "outline" },
            ]}
          />
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