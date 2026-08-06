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
        fontFamily: "'Montserrat',sans-serif",
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
      <div
        className="hero-overlay"
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(100deg, rgba(22,10,34,0.8) 0%, rgba(22,10,34,0.45) 100%)",
        }}
      />

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "80px 24px",
      }}>
        <div style={{ opacity: visible ? 1 : 0, maxWidth: 650 }}>
          <h1 className={visible ? "elv-animate-2" : ""} style={{
            fontFamily: "'Astrid Regular', serif",
            fontSize: "clamp(36px,5vw,56px)",
            fontWeight: 700, lineHeight: 1.15,
            color: "#fff", marginBottom: 24, letterSpacing: "-0.01em",
          }}>
            When women connect, <br />share, and support, <br /> <span style={{ color: "#EFBF68" }}>communities transform.</span>
          </h1>

          <p className={visible ? "elv-animate-3" : ""} style={{ fontSize: 16, fontFamily: "'Montserrat', serif", lineHeight: 1.7, color: "rgba(255,255,255,0.9)", maxWidth: 520, marginBottom: 36 }}>
Share your personal or professional journey through video, audio, writing, or digital art to inspire women across Australia.          </p>

          <div className={visible ? "elv-animate-4" : ""} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={scrollToStoryForm}
              onMouseEnter={() => setPinkHov(true)}
              onMouseLeave={() => setPinkHov(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 14,
                background: "#D7B264",
                color: "#fff", fontFamily: "'Montserrat',sans-serif",
                fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(75, 30, 86, 0.25)",
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
                background: "#D7B264",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff", fontFamily: "'Montserrat',sans-serif",
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
    <section className="about-vision" style={{ background: "#linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding: "40px 24px 100px", textAlign: "center" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <div ref={h.ref} style={fade(h.inView, 0)}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#662369", display: "block", marginBottom: "12px" }}>
            Our Purpose
          </span>
          <h2 style={{ fontFamily: "'Astrid Regular', serif", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "32px", color: "#1a0a2e" }}>
            A Blueprint of Inspiration For  CALD Backgrounds
          </h2>
        </div>
        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "15.5px", color: "#554866", lineHeight: 1.65, marginBottom: "24px" }}>
          By sharing your story, you're giving Ms. Ellevation permission to share your experiences on our platform — not only contributing to a growing community of strength, but also helping create a circle of support where women can feel seen, heard, and connected.
        </p>
        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "15.5px", color: "#554866", lineHeight: 1.65, margin: 0 }}>
          Your journey could be the spark of encouragement someone else needs. Together, these stories weave a powerful tapestry of resilience, courage, and possibility — showing every CALD woman in Australia that she is not alone, and that success, belonging, and confidence are within reach.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CONTENT CATEGORIES
══════════════════════════════════════ */
function ConversationCard({ item }: { item: typeof conversationContent[0] }) {
  const { ref } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      className="conversation-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 280px", maxWidth: 320, minWidth: 240,
        background: hov ? "#fff" : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: hov ? "rgba(75, 30, 86, 0.3)" : "rgba(124, 92, 191, 0.15)",
        borderRadius: 24, padding: "40px 28px 36px", textAlign: "center",
        boxShadow: hov ? "0 22px 54px rgba(124, 92, 191, 0.12)" : "0 10px 30px rgba(124, 92, 191, 0.02)",
        transition: "transform 0.4s cubic-bezier(.25,1,.5,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: hov ? "#4B1E56" : "transparent", transition: "background 0.3s" }} />
      <h3 className="conversation-card-title" style={{ fontFamily: "'Astrid Regular',serif", fontSize: 32, fontWeight: 700, color: "#662369", margin: "0 0 18px" }}>{item.title}</h3>
      <p className="conversation-card-body" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14.5, lineHeight: 1.65, color: "#554866", margin: 0 }}>{item.body}</p>
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
      <p className="social-follow-label" style={{
        fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 600,
        letterSpacing: "0.08em", textTransform: "uppercase", color: "#4B1E56", margin: 0
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
              color: "#4B1E56", transition: "all 0.2s ease",
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
    <section className="about-vmv" style={{ background: "#ffffff", padding: "40px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p className="section-eyebrow" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4B1E56", margin: "0 0 12px" }}>Ellevation Conversations</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 1040, margin: "0 auto", justifyContent: "center" }}>
{conversationContent.map((item, i) => <ConversationCard key={i} item={item} />)}

      </div>
      <SocialFollowRow />
    </section>
  );
}

/* ══════════════════════════════════════
   SUBMISSION FORMATS SECTION
══════════════════════════════════════ */
function FormatCard({ item }: { item: typeof submissionFormats[0] }) {
  const { ref } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      className="format-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 240px", maxWidth: 260, minWidth: 220,
        background: hov ? "#fff" : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: hov ? "rgba(75, 30, 86, 0.3)" : "rgba(124, 92, 191, 0.15)",
        borderRadius: 24, padding: "32px 24px", textAlign: "left",
        boxShadow: hov ? "0 22px 54px rgba(124, 92, 191, 0.1)" : "0 10px 30px rgba(124, 92, 191, 0.02)",
        transition: "transform 0.4s cubic-bezier(.25,1,.5,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <h3 className="format-card-title" style={{ fontFamily: "'Astrid Regular',serif", fontSize: 22, fontWeight: 700, color: "#4B1E56", margin: "0 0 10px", lineHeight: 1.2 }}>{item.title}</h3>
      <p className="format-card-body" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14.5, lineHeight: 1.6, color: "#4B1E56", margin: 0 }}>{item.body}</p>
    </div>
  );
}

function FormatsSection() {
  return (
    <section className="about-who-we-serve" style={{ background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding: "40px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p className="section-eyebrow" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>Submission Modalities</p>
        <h2 style={{ fontFamily: "'Astrid Regular', serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#4B1E56", margin: 0 }}>We Welcome Stories in Many Forms</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 1140, margin: "0 auto", justifyContent: "center" }}>
{submissionFormats.map((item) => <FormatCard key={item.title} item={item} />)}

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
    fontFamily: "'Montserrat',sans-serif",
    fontSize: 14.5,
    color: "#4B1E56",
    outline: "none",
    transition: "border-color 0.2s",
  };
}

function labelStyle(): CSSProperties {
  return {
    display: "block",
    fontFamily: "'Montserrat',sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#4B1E56",
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
    focusField === field ? { borderColor: "#4B1E56", boxShadow: "0 0 0 4px rgba(75, 30, 86, 0.1)" } : {};

  return (
    <section
      id="submit-story"
      className="about-submit"
      ref={ref}
      style={{ background: "#ffffff", padding: "40px 24px 100px", scrollMarginTop: 24 }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44, opacity: inView ? 1 : 0, transition: "opacity 0.7s ease" }}>
          <p className="section-eyebrow" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>
            Share Your Journey
          </p>
          <h2 style={{ fontFamily: "'Astrid Regular', serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#4B1E56", margin: "0 0 16px" }}>
            Submit Your Story
          </h2>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15.5, color: "#554866", lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>
            Fill in the details below and attach your written reflection, audio, video, or artwork — or paste a link if it's already hosted somewhere. By submitting, you're giving Ms. Ellevation permission to share your experience across our platform.
          </p>
        </div>

        <div
          className="story-form-wrapper"
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
              <h3 className="story-thankyou-title" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#1a0a2e", margin: "0 0 12px" }}>
                Thank you for sharing.
              </h3>
              <p className="story-thankyou-body" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, color: "#554866", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 28px" }}>
                Your story has been received. Our team will be in touch before anything is shared publicly.
              </p>
              <button
                onClick={resetForm}
                className="story-reset-btn"
                style={{
                  padding: "14px 28px", borderRadius: 14, border: "1.5px solid rgba(124, 92, 191, 0.3)",
                  background: "transparent", color: "#4B1E56", fontFamily: "'Montserrat',sans-serif",
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
                  style={{ width: 18, height: 18, accentColor: "#4B1E56", cursor: "pointer" }}
                />
                <label htmlFor="anonymous" className="story-check-label" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14.5, color: "#554866", cursor: "pointer" }}>
                  I'd like to share my story anonymously
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 22 }}>
                <div style={{ opacity: form.anonymous ? 0.5 : 1 }}>
                  <label className="story-field-label" style={labelStyle()}>Full Name {form.anonymous && "(optional)"}</label>
                  <input
                    type="text"
                    className="story-form-input"
                    value={form.name}
                    disabled={form.anonymous}
                    onFocus={() => setFocusField("name")}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    style={{ ...inputStyle(!!errors.name), ...borderFocus("name") }}
                  />
                  {errors.name && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'Montserrat',sans-serif" }}>Please enter your name, or choose to submit anonymously.</p>}
                </div>
                <div>
                  <label className="story-field-label" style={labelStyle()}>Email Address</label>
                  <input
                    type="email"
                    className="story-form-input"
                    value={form.email}
                    onFocus={() => setFocusField("email")}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    style={{ ...inputStyle(!!errors.email), ...borderFocus("email") }}
                  />
                  {errors.email && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'Montserrat',sans-serif" }}>Please enter a valid email address.</p>}
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label className="story-field-label" style={labelStyle()}>How would you like to share your story?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {storyFormatOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className="story-format-pill"
                      onClick={() => update("format", opt)}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 100,
                        border: `1.5px solid ${form.format === opt ? "#4B1E56" : "rgba(124, 92, 191, 0.15)"}`,
                        background: form.format === opt ? "#4B1E56" : "#fff",
                        color: form.format === opt ? "#fff" : "#554866",
                        fontFamily: "'Montserrat',sans-serif",
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
                <label className="story-field-label" style={labelStyle()}>Story Title</label>
                <input
                  type="text"
                  className="story-form-input"
                  value={form.title}
                  onFocus={() => setFocusField("title")}
                  onBlur={() => setFocusField(null)}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Give your story a title"
                  style={{ ...inputStyle(!!errors.title), ...borderFocus("title") }}
                />
                {errors.title && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'Montserrat',sans-serif" }}>Please add a title for your story.</p>}
              </div>

              <div style={{ marginBottom: 22 }}>
                <label className="story-field-label" style={labelStyle()}>Your Story</label>
                <textarea
                  className="story-form-input"
                  value={form.story}
                  onFocus={() => setFocusField("story")}
                  onBlur={() => setFocusField(null)}
                  onChange={(e) => update("story", e.target.value)}
                  placeholder="Share your journey, challenges, or triumphs — or add a short written explanation to go with your media."
                  rows={6}
                  style={{ ...inputStyle(!!errors.story), ...borderFocus("story"), resize: "vertical", lineHeight: 1.6 }}
                />
                {errors.story && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'Montserrat',sans-serif" }}>Please share a little about your story.</p>}
              </div>

              {isLinkFormat && (
                <div style={{ marginBottom: 22 }}>
                  <label className="story-field-label" style={labelStyle()}>Link to Your Media</label>
                  <input
                    type="url"
                    className="story-form-input"
                    value={form.link}
                    onFocus={() => setFocusField("link")}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => update("link", e.target.value)}
                    placeholder="Paste a YouTube, Google Drive, Dropbox, or other link"
                    style={{ ...inputStyle(!!errors.link), ...borderFocus("link") }}
                  />
                  {errors.link && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontFamily: "'Montserrat',sans-serif" }}>Please add a link so we can access your media.</p>}
                </div>
              )}

              <div style={{ marginBottom: 12 }}>
                <label className="story-field-label" style={labelStyle()}>Attach Audio, Video, Art, or Photo (optional)</label>
                <label
                  htmlFor="story-file"
                  className="story-file-drop"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "22px 16px", borderRadius: 14,
                    border: "1.5px dashed rgba(124, 92, 191, 0.3)",
                    background: "rgba(124, 92, 191, 0.04)",
                    fontFamily: "'Montserrat',sans-serif", fontSize: 13.5, color: "#554866",
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
                  <label className="story-field-label" style={labelStyle()}>Or Share a Link (optional)</label>
                  <input
                    type="url"
                    className="story-form-input"
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
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: "#4B1E56", cursor: "pointer" }}
                />
                <label htmlFor="consent" className="story-check-label" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13.5, color: "#554866", lineHeight: 1.6, cursor: "pointer" }}>
I give Ms. Ellevation permission to share my story and any attached media or linked content across the full Ms. Ellevation and Ellevation Ecosystem— including this website, Ellevation Hub, our social media channels, newsletters, and community events.
                </label>
              </div>
              {errors.consent && <p style={{ color: "#e11d48", fontSize: 12, marginTop: -20, marginBottom: 20, fontFamily: "'Montserrat',sans-serif" }}>Please confirm your consent before submitting.</p>}

              <button
                type="submit"
                style={{
                  width: "100%", padding: "15px 26px", borderRadius: 14, border: "none",
                  background: "#D7B264",
                  color: "#fff", fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(75, 30, 86, 0.25)",
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
        background:"#D7B264",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "#ffffff",
        fontFamily: "'Montserrat',sans-serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.05em",
        cursor: "pointer",
        boxShadow: primary && hov ? "0 6px 20px rgba(75, 30, 86, 0.45)" : "none",
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
        background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", 
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
            fontFamily: "'Astrid Regular', serif", 
            fontSize: "clamp(38px,6vw,60px)", 
            fontWeight: 700, 
            color: "#4B1E56", 
            margin: "0 0 40px" 
          }}
        >
          Join Our  <span style={{ color: "#EFBF68" }}>Ecosystem</span>
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

useEffect(() => {
    document.title = "Ellevation Conversations | Share Your Story";

    const description =
      "Share your journey through video, audio, writing, or digital art. Join Ms. Ellevation's growing community of CALD women supporting and inspiring each other across Australia.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

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
        .cta-blob-1 { top: -80px; right: -60px; width: 380px; height: 380px; background: radial-gradient(circle,rgba(75,30,86,0.1) 0%,transparent 70%); }
        .cta-blob-2 { bottom: -60px; left: -40px; width: 320px; height: 320px; background: radial-gradient(circle,rgba(124,92,191,0.08) 0%,transparent 70%); }

        .cta-shimmer { position: absolute; inset: 0; background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%); background-size: 200% 100%; animation: shimmerSweep 5s linear infinite; pointer-events: none; z-index: 0; }
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .social-icon-link:hover {
          background: #4B1E56 !important;
          border-color: #4B1E56 !important;
          color: #fff !important;
          transform: translateY(-3px);
        }

        @media (max-width: 640px) {
          .about-hero h1 { font-size: 34px !important; }
          .about-submit form > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }

        /* ═══════════════════════════════════════════════════
           DARK MODE — matched to Connect page's theme:
           body #0f0a1a · panels #140a1a / #1a1226
           borders rgba(155,109,190,0.2)
           headings #f3ebff · body text #b8a8c8
           labels #d8ccf4 · inputs #1f172e, focus #a78bfa
           ═══════════════════════════════════════════════════ */
        [data-theme="dark"] body { background: #0f0a1a !important; }

        /* Hero overlay deepens like Connect's hero */
        [data-theme="dark"] .about-hero .hero-overlay {
          background: linear-gradient(100deg, rgba(10,5,16,0.88) 0%, rgba(10,5,16,0.6) 100%) !important;
        }

        /* Section backgrounds */
        [data-theme="dark"] .about-vision { background: #0f0a1a !important; }
        [data-theme="dark"] .about-vmv { background: linear-gradient(180deg, #0f0a1a 0%, #140a1a 100%) !important; }
        [data-theme="dark"] .about-who-we-serve { background: linear-gradient(180deg, #140a1a 0%, #0f0a1a 100%) !important; }
        [data-theme="dark"] .about-submit { background: #0f0a1a !important; }
        [data-theme="dark"] .about-cta { background: linear-gradient(180deg, #140a1a 0%, #0f0a1a 100%) !important; }

        /* Headings */
        [data-theme="dark"] .about-vision h2,
        [data-theme="dark"] .about-submit h2,
        [data-theme="dark"] .about-who-we-serve h2,
        [data-theme="dark"] .about-vmv h2,
        [data-theme="dark"] .story-thankyou-title { color: #f3ebff !important; }

        /* Eyebrow labels */
        [data-theme="dark"] .section-eyebrow { color: #d8ccf4 !important; }

        /* Body copy */
        [data-theme="dark"] .about-vision p,
        [data-theme="dark"] .about-submit p,
        [data-theme="dark"] .story-thankyou-body { color: #b8a8c8 !important; }

        /* Conversation cards */
        [data-theme="dark"] .conversation-card {
          background: #1a1226 !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
        }
        [data-theme="dark"] .conversation-card-title { color: #f3ebff !important; }
        [data-theme="dark"] .conversation-card-body { color: #b8a8c8 !important; }

        /* Format cards */
        [data-theme="dark"] .format-card {
          background: #1a1226 !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
        }
        [data-theme="dark"] .format-card-title { color: #f3ebff !important; }
        [data-theme="dark"] .format-card-body { color: #b8a8c8 !important; }

        /* Social row */
        [data-theme="dark"] .social-follow-label { color: #d8ccf4 !important; }
        [data-theme="dark"] .social-icon-link {
          background: #1a1226 !important;
          border-color: rgba(155,109,190,0.2) !important;
          color: #b8a8c8 !important;
        }

        /* Story submission wrapper card */
        [data-theme="dark"] .story-form-wrapper {
          background: #1a1226 !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important;
        }
        [data-theme="dark"] .story-field-label { color: #d8ccf4 !important; }
        [data-theme="dark"] .story-check-label { color: #b8a8c8 !important; }

        [data-theme="dark"] .story-form-input {
          background: #1f172e !important;
          border-color: rgba(155,109,190,0.2) !important;
          color: #f3ebff !important;
        }
        [data-theme="dark"] .story-form-input:focus {
          border-color: #a78bfa !important;
          background: #231933 !important;
        }
        [data-theme="dark"] .story-form-input::placeholder { color: #7a6f94 !important; }

        [data-theme="dark"] .story-file-drop {
          background: rgba(155,109,190,0.08) !important;
          border-color: rgba(155,109,190,0.3) !important;
          color: #b8a8c8 !important;
        }

        [data-theme="dark"] .story-format-pill {
          background: #1f172e !important;
          border-color: rgba(155,109,190,0.2) !important;
          color: #b8a8c8 !important;
        }
        [data-theme="dark"] .story-format-pill[style*="background: rgb(75, 30, 86)"],
        [data-theme="dark"] .story-format-pill[style*="background: #4B1E56"] {
          background: #a78bfa !important;
          border-color: #a78bfa !important;
          color: #160d22 !important;
        }

        [data-theme="dark"] .story-reset-btn {
          color: #f3ebff !important;
          border-color: rgba(155,109,190,0.3) !important;
        }

        /* CTA secondary button */
        [data-theme="dark"] button[style*="transparent"] { color: #ffffff !important; border-color: #ffffff !important; }
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