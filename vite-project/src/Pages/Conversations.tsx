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



function scrollToStoryForm() {
  document.getElementById("submit-story")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Ellevation Conversations data (Media / Stories / Community Voice) ── */
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
];

/* ══════════════════════════════════════
   HERO / BANNER — single background image
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
    <section
      className="about-hero"
      style={{
        position: "relative", overflow: "hidden",
        minHeight: "100vh", display: "flex", alignItems: "center",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      {/* Single background image */}
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
      {/* Readability overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(100deg, rgba(20,10,30,0.72) 0%, rgba(20,10,30,0.5) 42%, rgba(20,10,30,0.22) 68%, rgba(20,10,30,0.1) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "40px 48px",
      }}>
        <div style={{ opacity: visible ? 1 : 0, maxWidth: 620 }}>
          <h1 className={visible ? "elv-animate-2" : ""} style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(34px,5vw,58px)",
            fontWeight: 700, lineHeight: 1.06,
            color: "#fff", marginBottom: 24, letterSpacing: "-0.01em",
            textShadow: "0 4px 24px rgba(0,0,0,0.35)",
          }}>
            When women connect, <br />share, and support, <br />communities transform.
          </h1>

          <p className={visible ? "elv-animate-3" : ""} style={{ fontSize: 16, lineHeight: 1.78, color: "rgba(255,255,255,0.9)", maxWidth: 500, marginBottom: 36, textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
            This new initiative provides a platform for women in the community to share their personal and professional journeys. Submit your story through video, audio, a written letter, or digital art and photography with an accompanying written explanation — and help inspire other women living in Australia.
          </p>

          <div className={visible ? "elv-animate-4" : ""} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={scrollToStoryForm}
              onMouseEnter={() => setGoldHov(true)}
              onMouseLeave={() => setGoldHov(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 26px", borderRadius: 100,
                background: "linear-gradient(135deg,#d4a96a,#c9906a)",
                color: "#fff", fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer",
                boxShadow: "0 4px 18px rgba(201,144,106,0.5)",
                opacity: goldHov ? 0.88 : 1,
                transform: goldHov ? "scale(1.02)" : "scale(1)",
                transition: "opacity 0.15s, transform 0.15s",
              }}
            >
              Submit Your Story →
            </button>
            <button
              onMouseEnter={() => setDarkHov(true)}
              onMouseLeave={() => setDarkHov(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 26px", borderRadius: 100,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(6px)",
                border: "1.5px solid rgba(255,255,255,0.6)",
                color: "#fff", fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600, fontSize: 14, cursor: "pointer",
                opacity: darkHov ? 0.85 : 1,
                transform: darkHov ? "scale(1.02)" : "scale(1)",
                transition: "opacity 0.15s, transform 0.15s",
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
    <section className="about-vision" style={{ background: "#fdf9fc", padding: "88px 24px 72px", textAlign: "center" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div ref={h.ref}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,50px)", fontWeight: 500, lineHeight: 1.22, margin: "0 0 48px", color: "#1c1630" }}>
            A Blueprint of Inspiration For <span style={{ color: "#9b7db8" }}>CALD Backgrounds</span>
          </h2>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(15px,1.8vw,17px)", color: "#3a2e50", lineHeight: 1.82, margin: "0 0 26px" }}>
          By sharing your story, you're giving Ms. Ellevation permission to share your experiences on our platform — not only contributing to a growing community of strength, but also helping create a circle of support where women can feel seen, heard, and connected.
        </p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(15px,1.8vw,17px)", color: "#3a2e50", lineHeight: 1.82, margin: 0 }}>
          Your journey could be the spark of encouragement someone else needs. Together, these stories weave a powerful tapestry of resilience, courage, and possibility — showing every CALD woman in Australia that she is not alone, and that success, belonging, and confidence are within reach.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CONTENT CATEGORIES (Ellevation Conversations Data)
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
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 500, color: "#9b7db8", margin: "0 0 18px", transition: "transform 0.35s ease", transform: hov ? "scale(1.06)" : "scale(1)", display: "inline-block" }}>{item.title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.76, color: "#3a2e50", margin: 0 }}>{item.body}</p>
    </div>
  );
}

function ConversationSection() {
  const { ref } = useInView(0.1);
  return (

    <section className="about-vmv" style={{ background: "#f5eef8", padding: "72px 24px 88px" }}>
      <div ref={ref} style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8" }}>Ellevation Conversations</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, maxWidth: 1060, margin: "0 auto", justifyContent: "center" }}>
        {conversationContent.map((item, i) => <ConversationCard key={i} item={item} index={i} />)}
      </div>
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
        flex: "1 1 220px", maxWidth: 250, minWidth: 200,
        background: hov ? "#fff" : "#fdfaff",
        border: "1.5px solid",
        borderColor: hov ? "rgba(155,125,184,0.5)" : "rgba(180,160,210,0.22)",
        borderRadius: 20, padding: "32px 24px 28px", textAlign: "left",
        boxShadow: hov ? "0 18px 46px rgba(140,110,180,0.16)" : "0 2px 16px rgba(140,110,180,0.06)",
        transition: "all 0.45s cubic-bezier(.34,1.56,.64,1)",
        transform: !inView ? "translateY(36px) scale(0.97)" : hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 110}ms` : "0ms",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      {/* <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "rgba(155,125,184,0.12)", color: "#9b7db8",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 18,
        transition: "transform 0.35s ease",
        transform: hov ? "scale(1.08)" : "scale(1)",
      }}>
        {item.icon}
      </div> */}
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "#1c1630", margin: "0 0 10px", lineHeight: 1.25 }}>{item.title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.7, color: "#3a2e50", margin: 0 }}>{item.body}</p>
    </div>
  );
}

function FormatsSection() {
  const { ref } = useInView(0.1);
  return (

    <section className="about-who-we-serve" style={{ background: "#f5eef8", padding: "20px 24px 88px" }}>
      <div ref={ref} style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8", margin: "20px 0 12px" }}>Submission Modalities</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,46px)", fontWeight: 500, color: "#1c1630", margin: 0 }}>We Welcome Stories in Many Forms</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, maxWidth: 1180, margin: "0 auto", justifyContent: "center" }}>
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
  consent: false,
};

function inputStyle(hasError: boolean): CSSProperties {
  return {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: `1.5px solid ${hasError ? "#d97a9a" : "rgba(155,125,184,0.28)"}`,
    background: "#fff",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 14.5,
    color: "#1c1630",
    outline: "none",
    transition: "border-color 0.2s",
  };
}

function labelStyle(): CSSProperties {
  return {
    display: "block",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6b5880",
    marginBottom: 8,
  };
}

function StorySubmissionSection() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState<StoryFormState>(initialStoryForm);

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);

  const update = <K extends keyof StoryFormState>(key: K, value: StoryFormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, boolean> = {};
    if (!form.anonymous && !form.name.trim()) nextErrors.name = true;
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = true;
    if (!form.title.trim()) nextErrors.title = true;
    if (!form.story.trim()) nextErrors.story = true;
    if (!form.consent) nextErrors.consent = true;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Hook this up to your backend / form service (e.g. an API route, Formspree, etc.)
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialStoryForm);
    setErrors({});
    setSubmitted(false);
  };

  const borderFocus = (field: string): CSSProperties =>
    focusField === field ? { borderColor: "#9b7db8", boxShadow: "0 0 0 4px rgba(155,125,184,0.12)" } : {};

  return (
    <section
      id="submit-story"
      className="about-submit"
      ref={ref}
      style={{ background: "#fdf9fc", padding: "88px 24px", scrollMarginTop: 24 }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44, opacity: inView ? 1 : 0, transition: "opacity 0.7s ease" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b7db8", margin: "0 0 12px" }}>
            Share Your Journey
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,46px)", fontWeight: 500, color: "#1c1630", margin: "0 0 16px" }}>
            Submit Your Story
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#3a2e50", lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
            Fill in the details below and attach your written reflection, audio, video, or artwork. By submitting, you're giving Ms. Ellevation permission to share your experience on our platform.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1.5px solid rgba(180,160,210,0.22)",
            borderRadius: 24,
            padding: "40px 32px",
            boxShadow: "0 20px 60px rgba(140,110,180,0.1)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 8px" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🌸</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, color: "#1c1630", margin: "0 0 12px" }}>
                Thank you for sharing.
              </h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#3a2e50", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>
                Your story has been received. Our team will be in touch before anything is shared publicly.
              </p>
              <button
                onClick={resetForm}
                style={{
                  padding: "12px 26px", borderRadius: 100, border: "1.5px solid rgba(28,22,48,0.7)",
                  background: "transparent", color: "#1c1630", fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Submit Another Story
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Anonymous toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={form.anonymous}
                  onChange={(e) => update("anonymous", e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: "#9b7db8", cursor: "pointer" }}
                />
                <label htmlFor="anonymous" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#3a2e50", cursor: "pointer" }}>
                  I'd like to share my story anonymously
                </label>
              </div>

              {/* Name + Email */}
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
                  {errors.name && <p style={{ color: "#c0609a", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please enter your name, or choose to submit anonymously.</p>}
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
                  {errors.email && <p style={{ color: "#c0609a", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please enter a valid email address.</p>}
                </div>
              </div>

              {/* Format */}
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
                        border: `1.5px solid ${form.format === opt ? "#9b7db8" : "rgba(155,125,184,0.28)"}`,
                        background: form.format === opt ? "#9b7db8" : "#fff",
                        color: form.format === opt ? "#fff" : "#3a2e50",
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

              {/* Title */}
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
                {errors.title && <p style={{ color: "#c0609a", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please add a title for your story.</p>}
              </div>

              {/* Story text */}
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
                {errors.story && <p style={{ color: "#c0609a", fontSize: 12, marginTop: 6, fontFamily: "'DM Sans',sans-serif" }}>Please share a little about your story.</p>}
              </div>

              {/* File upload */}
              <div style={{ marginBottom: 30 }}>
                <label style={labelStyle()}>Attach Audio, Video, Art, or Photo (optional)</label>
                <label
                  htmlFor="story-file"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "22px 16px", borderRadius: 12,
                    border: "1.5px dashed rgba(155,125,184,0.4)",
                    background: "rgba(155,125,184,0.04)",
                    fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#6b5880",
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

              {/* Consent */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 30 }}>
                <input
                  type="checkbox"
                  id="consent"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: "#9b7db8", cursor: "pointer" }}
                />
                <label htmlFor="consent" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#3a2e50", lineHeight: 1.6, cursor: "pointer" }}>
                  I give Ms. Ellevation permission to share my story and any attached media on this platform.
                </label>
              </div>
              {errors.consent && <p style={{ color: "#c0609a", fontSize: 12, marginTop: -20, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}>Please confirm your consent before submitting.</p>}

              <button
                type="submit"
                style={{
                  width: "100%", padding: "15px 26px", borderRadius: 100, border: "none",
                  background: "linear-gradient(135deg,#d4a96a,#c9906a)",
                  color: "#fff", fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", cursor: "pointer",
                  boxShadow: "0 8px 26px rgba(201,144,106,0.4)",
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
function CTABtn({ label, primary, onClick }: { label: string; primary: boolean; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "14px 32px", borderRadius: 999, border: primary ? "none" : "1.5px solid rgba(28,22,48,0.7)", background: primary ? hov ? "#7a5ea0" : "#9b7db8" : hov ? "rgba(28,22,48,0.07)" : "transparent", color: primary ? "#fff" : "#1c1630", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, cursor: "pointer", boxShadow: primary && hov ? "0 10px 30px rgba(140,110,180,0.4)" : "none", transform: hov ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)", transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)" }}
    >{label}</button>
  );
}

function CTASection() {
  const { ref } = useInView(0.2);
  return (

    <section className="about-cta" style={{ background: "linear-gradient(150deg,#f0d8ee 0%,#e2d0f0 40%,#d4c8f8 75%,#e0d4f8 100%)", padding: "88px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div className="blob cta-blob-1" />
      <div className="blob cta-blob-2" />
      <div className="cta-shimmer" />
      <div ref={ref} style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px,6vw,66px)", fontWeight: 500, color: "#1c1630", margin: "0 0 16px" }}>Ready to share?</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#1c1630", fontSize: 16, marginBottom: 42, maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
          Submit your story today and be part of a movement that uplifts women, honours diversity, and builds community.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <CTABtn label="Submit Your Story" primary onClick={scrollToStoryForm} />
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
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
        .cta-blob-1 { top: -80px; right: -60px; width: 380px; height: 380px; background: radial-gradient(circle,rgba(220,200,255,0.45) 0%,transparent 70%); }
        .cta-blob-2 { bottom: -60px; left: -40px; width: 320px; height: 320px; background: radial-gradient(circle,rgba(255,210,235,0.38) 0%,transparent 70%); }

        .cta-shimmer { position: absolute; inset: 0; background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%); background-size: 200% 100%; animation: shimmerSweep 5s linear infinite; pointer-events: none; z-index: 0; }
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @media (max-width: 640px) {
          .about-hero h1 { font-size: 34px !important; }
          .about-submit form > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }

        /* ── Dark Mode Matrix Overrides ── */
        [data-theme="dark"] body { background: #0f0a1a !important; }
        [data-theme="dark"] .about-founder h2,
        [data-theme="dark"] .about-vision h2,
        [data-theme="dark"] .about-cta h2,
        [data-theme="dark"] .about-submit h2,
        [data-theme="dark"] .about-who-we-serve h2,
        [data-theme="dark"] .about-who-we-serve h3 { color: #f3ebff !important; }
        [data-theme="dark"] .about-founder p,
        [data-theme="dark"] .about-vision p,
        [data-theme="dark"] .about-submit p,
        [data-theme="dark"] .about-who-we-serve p { color: #b8a8c8 !important; }
        [data-theme="dark"] .about-founder { background: #140a1a !important; border-bottom-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] .about-vision { background: #0f0a1a !important; }
        [data-theme="dark"] .about-submit { background: #0f0a1a !important; }
        [data-theme="dark"] .about-submit > div > div:last-child { background: #1a1226 !important; border-color: rgba(155, 109, 190, 0.2) !important; }
        [data-theme="dark"] .about-vmv { background: #1a1226 !important; }
        [data-theme="dark"] .about-who-we-serve { background: #1a1226 !important; }
        [data-theme="dark"] .about-who-we-serve > div:last-child > div { background: rgba(30, 20, 45, 0.6) !important; border-color: rgba(155, 109, 190, 0.2) !important; }
        [data-theme="dark"] .about-cta { background: linear-gradient(150deg, #2d1a4e 0%, #1a0a2e 100%) !important; }
        [data-theme="dark"] .about-vmv > div + div > div { background: rgba(30, 20, 45, 0.5) !important; border-color: rgba(155, 109, 190, 0.2) !important; }
        [data-theme="dark"] button[style*="transparent"] { color: #f3ebff !important; border-color: #f3ebff !important; }
      `}</style>

      <Hero />
      {/* <PhilosophySection /> */}
      <VisionSection />
      <ConversationSection />
      <FormatsSection />
      <StorySubmissionSection />
      <CTASection />
    </>
  );
}