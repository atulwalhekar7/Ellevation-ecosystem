import { useEffect, useRef, useState, type CSSProperties } from "react";

import heroBg from "../assets/banner6.avif"; // Single banner background image

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
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
}

function scrollToStoryForm() {
  document.getElementById("submit-story")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Ellevation Conversations data ── */
const conversationContent = [
  {
    title: "Media",
    body: "Share your journey through video, audio recordings, digital art, or photography — accompanied by a short written explanation of your experience.",
  },
  {
    title: "Stories",
    body: "Every woman's journey is unique, important, and worth sharing. Submit your written reflections or letters to inspire other women on a similar path.",
  },
  {
    title: "Community Voice",
    body: "Choose to be named or remain anonymous. Your voice contributes to a growing circle of support and connection for CALD women across Australia.",
  },
];

/* ── Social channels ── */
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/msellevation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/msellevation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@msellevation?_r=1&_t=ZS-97pLDiCJEYs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 2c.3 2.1 1.8 3.8 4 4.2v3a7.1 7.1 0 0 1-4-1.2v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.1a2.8 2.8 0 1 0 2 2.7V2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/msellevation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5.98 5.98 0 0 1 16 8z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@EllevationOfficial",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

/* ── Submission Formats grid ── */
const submissionFormats = [
  {
    title: "Written Reflections & Letters",
    body: "Share diary-style reflections or direct letters mapping your transition, your challenges, and your personal growth.",
    icon: "",
  },
  {
    title: "Audio & Video Recordings",
    body: "Spoken or filmed accounts capturing your journey, struggles, or insights in your own voice.",
    icon: "",
  },
  {
    title: "Digital Art & Photography",
    body: "Creative visuals, artwork, or photography paired with a short written explanation of your story.",
    icon: "",
  },
];

const storyFormatOptions = [
  "Written Reflection or Letter",
  "Audio Recording",
  "Video Recording",
  "Digital Art or Photography",
  "Link to Hosted Media",
];

/* ══════════════════════════════════════
   HERO / BANNER
══════════════════════════════════════ */
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
        minHeight: "100vh", display: "flex", alignItems: "center",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <img
        src={heroBg}
        alt="Women connecting and supporting each other"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          zIndex: 0,
        }}
      />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(100deg, rgba(22,10,34,0.8) 0%, rgba(22,10,34,0.45) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "80px 24px",
      }}>
        <div style={{ opacity: visible ? 1 : 0, maxWidth: 650 }}>
          <h1 className={visible ? "elv-animate-2" : ""} style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(36px,5vw,56px)",
            fontWeight: 700, lineHeight: 1.15,
            color: "#fff", marginBottom: 24, letterSpacing: "-0.01em",
          }}>
            When women connect, <br />share, and support, <br /><span style={{ color: "#d11a8e" }}>communities transform.</span>
          </h1>

          <p className={visible ? "elv-animate-3" : ""} style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", maxWidth: 520, marginBottom: 36 }}>
            This new initiative provides a platform for women in the community to share their personal and professional journeys. Submit your story through video, audio, a written letter, or digital art and photography with an accompanying written explanation — and help inspire other women living in Australia.
          </p>

          <div className={visible ? "elv-animate-4" : ""} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={scrollToStoryForm}
              onMouseEnter={() => setPinkHov(true)}
              onMouseLeave={() => setPinkHov(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 14,
                background: "linear-gradient(135deg, #e028a0 0%, #d11a8e 100%)",
                color: "#fff", fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(209, 26, 142, 0.25)",
                transform: pinkHov ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              Submit Your Story →
            </button>
            <button
              onMouseEnter={() => setDarkHov(true)}
              onMouseLeave={() => setDarkHov(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 14,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff", fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
                transform: darkHov ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 0.2s",
              }}
            >
              Explore Conversations →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VISION SECTION
══════════════════════════════════════ */
function VisionSection() {
  const h = useInView(0.15);

  return (
    <section className="about-vision" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6f3fa 100%)", padding: "40px 24px 100px", textAlign: "center" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <div ref={h.ref} style={fade(h.inView, 0)}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#662369", display: "block", marginBottom: "12px" }}>
            Our Purpose
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "32px", color: "#1a0a2e" }}>
            A Blueprint of Inspiration For <span style={{ color: "#d11a8e", fontStyle: "italic" }}>CALD Backgrounds</span>
          </h2>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15.5px", color: "#554866", lineHeight: 1.65, marginBottom: "24px" }}>
          By sharing your story, you're giving Ms. Ellevation permission to share your experiences on our platform — not only contributing to a growing community of strength, but also helping create a circle of support where women can feel seen, heard, and connected.
        </p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15.5px", color: "#554866", lineHeight: 1.65, margin: 0 }}>
          Your journey could be the spark of encouragement someone else needs. Together, these stories weave a powerful tapestry of resilience, courage, and possibility — showing every CALD woman in Australia that she is not alone, and that success, belonging, and confidence are within reach.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CONTENT CATEGORIES
══════════════════════════════════════ */
function ConversationCard({ item, index }: { item: typeof conversationContent[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 280px", maxWidth: 320, minWidth: 240,
        background: hov ? "#fff" : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: hov ? "rgba(209, 26, 142, 0.3)" : "rgba(124, 92, 191, 0.15)",
        borderRadius: 24, padding: "40px 28px 36px", textAlign: "center",
        boxShadow: hov ? "0 22px 54px rgba(124, 92, 191, 0.12)" : "0 10px 30px rgba(124, 92, 191, 0.02)",
        transition: "transform 0.4s cubic-bezier(.25,1,.5,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: hov ? "#d11a8e" : "transparent", transition: "background 0.3s" }} />
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: "#662369", margin: "0 0 18px" }}>{item.title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.65, color: "#554866", margin: 0 }}>{item.body}</p>
    </div>
  );
}

function SocialFollowRow() {
  const { ref, inView } = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        marginTop: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        ...fade(inView, 0),
      }}
    >
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600,
        letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: 0
      }}>
        Follow the Conversation
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="social-icon-link"
            style={{
              width: 42, height: 42, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#fff", border: "1.5px solid rgba(124, 92, 191, 0.15)",
              color: "#662369", transition: "all 0.2s ease",
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function ConversationSection() {
  return (
    <section className="about-vmv" style={{ background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding: "40px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>Ellevation Conversations</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 1040, margin: "0 auto", justifyContent: "center" }}>
        {conversationContent.map((item, i) => <ConversationCard key={i} item={item} index={i} />)}
      </div>
      <SocialFollowRow />
    </section>
  );
}

/* ══════════════════════════════════════
   SUBMISSION FORMATS SECTION
══════════════════════════════════════ */
function FormatCard({ item, index }: { item: typeof submissionFormats[0]; index: number }) {
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
      {/* <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: "rgba(209, 26, 142, 0.08)", color: "#d11a8e",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 20,
      }}>
        {item.icon}
      </div> */}
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#1a0a2e", margin: "0 0 10px", lineHeight: 1.2 }}>{item.title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.6, color: "#554866", margin: 0 }}>{item.body}</p>
    </div>
  );
}

function FormatsSection() {
  return (
    <section className="about-who-we-serve" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6f3fa 100%)", padding: "40px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>Submission Modalities</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#d11a8e", margin: 0 }}>We Welcome Stories in Many Forms</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 1140, margin: "0 auto", justifyContent: "center" }}>
        {submissionFormats.map((item, i) => <FormatCard key={item.title} item={item} index={i} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   STORY SUBMISSION FORM SECTION
══════════════════════════════════════ */
type StoryFormState = {
  name: string;
  anonymous: boolean;
  email: string;
  format: string;
  title: string;
  story: string;
  file: File | null;
  link: string;
  consent: boolean;
};

const initialStoryForm: StoryFormState = {
  name: "",
  anonymous: false,
  email: "",
  format: storyFormatOptions[0],
  title: "",
  story: "",
  file: null,
  link: "",
  consent: false,
};

function inputStyle(hasError: boolean): CSSProperties {
  return {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 14,
    border: `1.5px solid ${hasError ? "#e11d48" : "rgba(124, 92, 191, 0.15)"}`,
    background: "#fff",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 14.5,
    color: "#1a0a2e",
    outline: "none",
    transition: "border-color 0.2s",
  };
}

function labelStyle(): CSSProperties {
  return {
    display: "block",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#662369",
    marginBottom: 8,
  };
}

function StorySubmissionSection() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState<StoryFormState>(initialStoryForm);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);

  const isLinkFormat = form.format === "Link to Hosted Media";

  const update = <K extends keyof StoryFormState>(key: K, value: StoryFormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, boolean> = {};
    if (!form.anonymous && !form.name.trim()) nextErrors.name = true;
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = true;
    if (!form.title.trim()) nextErrors.title = true;
    if (!form.story.trim()) nextErrors.story = true;
    if (isLinkFormat && !form.link.trim()) nextErrors.link = true;
    if (!form.consent) nextErrors.consent = true;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialStoryForm);
    setErrors({});
    setSubmitted(false);
  };

  const borderFocus = (field: string): CSSProperties =>
    focusField === field ? { borderColor: "#d11a8e", boxShadow: "0 0 0 4px rgba(209, 26, 142, 0.1)" } : {};

  return (
    <section
      id="submit-story"
      className="about-submit"
      ref={ref}
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6f3fa 100%)", padding: "40px 24px 100px", scrollMarginTop: 24 }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44, opacity: inView ? 1 : 0, transition: "opacity 0.7s ease" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>
            Share Your Journey
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#d11a8e", margin: "0 0 16px" }}>
            Submit Your Story
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15.5, color: "#554866", lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>
            Fill in the details below and attach your written reflection, audio, video, or artwork — or paste a link if it's already hosted somewhere. By submitting, you're giving Ms. Ellevation permission to share your experience across our platform.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(124, 92, 191, 0.15)",
            borderRadius: 28,
            padding: "40px 32px",
            boxShadow: "0 10px 30px rgba(124, 92, 191, 0.02)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 8px" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🌸</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#1a0a2e", margin: "0 0 12px" }}>
                Thank you for sharing.
              </h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#554866", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 28px" }}>
                Your story has been received. Our team will be in touch before anything is shared publicly.
              </p>
              <button
                onClick={resetForm}
                style={{
                  padding: "14px 28px", borderRadius: 14, border: "1.5px solid rgba(124, 92, 191, 0.3)",
                  background: "transparent", color: "#5a3fa0", fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600, fontSize: 13, letterSpacing: "0.05em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all 0.2s ease"
                }}
              >
                Submit Another Story
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={form.anonymous}
                  onChange={(e) => update("anonymous", e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "#d11a8e", cursor: "pointer" }}
                />
                <label htmlFor="anonymous" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#554866", cursor: "pointer" }}>
                  I'd like to share my story anonymously
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 22 }}>
                <div style={{ opacity: form.anonymous ? 0.5 : 1 }}>
                  <label style={labelStyle()}>Full Name {form.anonymous && "(optional)"}</label>
                  <input
                    type="text"
                    value={form.name}
                    disabled={form.anonymous}
                    onFocus={() => setFocusField("name")}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    style={{ ...inputStyle(!!errors.name), ...borderFocus("name") }}
                  />
                  {errors.name && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please enter your name, or choose to submit anonymously.</p>}
                </div>
                <div>
                  <label style={labelStyle()}>Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onFocus={() => setFocusField("email")}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    style={{ ...inputStyle(!!errors.email), ...borderFocus("email") }}
                  />
                  {errors.email && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please enter a valid email address.</p>}
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle()}>How would you like to share your story?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {storyFormatOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => update("format", opt)}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 100,
                        border: `1.5px solid ${form.format === opt ? "#d11a8e" : "rgba(124, 92, 191, 0.15)"}`,
                        background: form.format === opt ? "#d11a8e" : "#fff",
                        color: form.format === opt ? "#fff" : "#554866",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle()}>Story Title</label>
                <input
                  type="text"
                  value={form.title}
                  onFocus={() => setFocusField("title")}
                  onBlur={() => setFocusField(null)}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Give your story a title"
                  style={{ ...inputStyle(!!errors.title), ...borderFocus("title") }}
                />
                {errors.title && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please add a title for your story.</p>}
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle()}>Your Story</label>
                <textarea
                  value={form.story}
                  onFocus={() => setFocusField("story")}
                  onBlur={() => setFocusField(null)}
                  onChange={(e) => update("story", e.target.value)}
                  placeholder="Share your journey, challenges, or triumphs — or add a short written explanation to go with your media."
                  rows={6}
                  style={{ ...inputStyle(!!errors.story), ...borderFocus("story"), resize: "vertical", lineHeight: 1.6 }}
                />
                {errors.story && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please share a little about your story.</p>}
              </div>

              {isLinkFormat && (
                <div style={{ marginBottom: 22 }}>
                  <label style={labelStyle()}>Link to Your Media</label>
                  <input
                    type="url"
                    value={form.link}
                    onFocus={() => setFocusField("link")}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => update("link", e.target.value)}
                    placeholder="Paste a YouTube, Google Drive, Dropbox, or other link"
                    style={{ ...inputStyle(!!errors.link), ...borderFocus("link") }}
                  />
                  {errors.link && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please add a link so we can access your media.</p>}
                </div>
              )}

              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle()}>Attach Audio, Video, Art, or Photo (optional)</label>
                <label
                  htmlFor="story-file"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "22px 16px", borderRadius: 14,
                    border: "1.5px dashed rgba(124, 92, 191, 0.3)",
                    background: "rgba(124, 92, 191, 0.04)",
                    fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#554866",
                    cursor: "pointer", textAlign: "center",
                  }}
                >
                  {form.file ? `📎 ${form.file.name}` : "Click to upload a file"}
                </label>
                <input
                  id="story-file"
                  type="file"
                  accept="image/*,audio/*,video/*"
                  onChange={(e) => update("file", e.target.files?.[0] ?? null)}
                  style={{ display: "none" }}
                />
              </div>

              {!isLinkFormat && (
                <div style={{ marginBottom: 30 }}>
                  <label style={labelStyle()}>Or Share a Link (optional)</label>
                  <input
                    type="url"
                    value={form.link}
                    onFocus={() => setFocusField("link-optional")}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => update("link", e.target.value)}
                    placeholder="YouTube, Google Drive, Dropbox, or other link"
                    style={{ ...inputStyle(false), ...borderFocus("link-optional") }}
                  />
                </div>
              )}
              {isLinkFormat && <div style={{ marginBottom: 30 }} />}

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 30 }}>
                <input
                  type="checkbox"
                  id="consent"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: "#d11a8e", cursor: "pointer" }}
                />
                <label htmlFor="consent" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#554866", lineHeight: 1.6, cursor: "pointer" }}>
I give Ms. Ellevation permission to share my story and any attached media or linked content across the full Ms. Ellevation and Ellevation Ecosystem— including this website, Ellevation Hub, our social media channels, newsletters, and community events.
                </label>
              </div>
              {errors.consent && <p style={{ color: "#e11d48", fontSize: 12, marginTop: -20, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}>Please confirm your consent before submitting.</p>}

              <button
                type="submit"
                style={{
                  width: "100%", padding: "15px 26px", borderRadius: 14, border: "none",
                  background: "linear-gradient(135deg, #e028a0 0%, #d11a8e 100%)",
                  color: "#fff", fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(209, 26, 142, 0.25)",
                }}
              >
                Submit Your Story →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CTA SECTION
══════════════════════════════════════ */
function CTABtn({ label, primary }: { label: string; primary: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "14px 28px",
        borderRadius: 14,
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

/* ══════════════════════════════════════
   MAIN INTERFACE COMPONENT EXPORT
══════════════════════════════════════ */
export default function ConversationsPage() {
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

        .blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .cta-blob-1 { top: -80px; right: -60px; width: 380px; height: 380px; background: radial-gradient(circle,rgba(209,26,142,0.1) 0%,transparent 70%); }
        .cta-blob-2 { bottom: -60px; left: -40px; width: 320px; height: 320px; background: radial-gradient(circle,rgba(124,92,191,0.08) 0%,transparent 70%); }

        .cta-shimmer { position: absolute; inset: 0; background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%); background-size: 200% 100%; animation: shimmerSweep 5s linear infinite; pointer-events: none; z-index: 0; }
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .social-icon-link:hover {
          background: #d11a8e !important;
          border-color: #d11a8e !important;
          color: #fff !important;
          transform: translateY(-3px);
        }

        @media (max-width: 640px) {
          .about-hero h1 { font-size: 34px !important; }
          .about-submit form > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }

        /* ── Dark Mode Matrix Overrides ── */
        [data-theme="dark"] body { background: #0d0614 !important; }
        [data-theme="dark"] .about-founder h2,
        [data-theme="dark"] .about-vision h2,
        [data-theme="dark"] .about-cta h2,
        [data-theme="dark"] .about-submit h2,
        [data-theme="dark"] .about-who-we-serve h2,
        [data-theme="dark"] .about-who-we-serve h3 { color: #ffffff !important; }
        [data-theme="dark"] .about-founder p,
        [data-theme="dark"] .about-vision p,
        [data-theme="dark"] .about-submit p,
        [data-theme="dark"] .about-who-we-serve p { color: #cbd5e1 !important; }
        [data-theme="dark"] .about-founder { background: #160d22 !important; border-bottom-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] .about-vision { background: #0d0614 !important; }
        [data-theme="dark"] .about-submit { background: #0d0614 !important; }
        [data-theme="dark"] .about-submit > div > div:last-child { background: #160d22 !important; border-color: rgba(155, 109, 190, 0.2) !important; }
        [data-theme="dark"] .about-vmv { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important; }
        [data-theme="dark"] .about-who-we-serve { background: linear-gradient(180deg, #160d22 0%, #0d0614 100%) !important; }
        [data-theme="dark"] .about-who-we-serve > div:last-child > div { background: rgba(25, 16, 38, 0.6) !important; border-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] .about-cta { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important; }
        [data-theme="dark"] .about-vmv > div + div > div { background: rgba(25, 16, 38, 0.6) !important; border-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] button[style*="transparent"] { color: #ffffff !important; border-color: #ffffff !important; }
        [data-theme="dark"] .social-icon-link { background: #160d22 !important; border-color: rgba(155,109,190,0.3) !important; color: #cbd5e1 !important; }
      `}</style>

      <Hero />
      <VisionSection />
      {/* <RepublicanSection /> */}
      <ConversationSection />
      <FormatsSection />
      <StorySubmissionSection />
      <CTASection />
    </>
  );
}