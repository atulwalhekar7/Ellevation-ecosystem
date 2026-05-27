import { useState, useRef } from "react";

type MembershipTier = "FOUNDATION" | "ELLEVATE" | "LUMINARY";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  referral: string;
  goals: string;
  agree: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  profession?: string;
  referral?: string;
  goals?: string;
  agree?: string;
}

const TIERS: MembershipTier[] = ["FOUNDATION", "ELLEVATE", "LUMINARY"];

const TIER_META: Record<MembershipTier, { label: string; tagline: string; color: string }> = {
  FOUNDATION: {
    label: "Foundation",
    tagline: "Begin your journey with Ellevation's core community.",
    color: "#b89c6e",
  },
  ELLEVATE: {
    label: "Ellevate",
    tagline: "Step into an elevated circle of ambitious women.",
    color: "#b07fb4",
  },
  LUMINARY: {
    label: "Luminary",
    tagline: "Lead, inspire, and illuminate from the pinnacle.",
    color: "#e87db0",
  },
};

const REFERRAL_OPTIONS = [
  "Social Media",
  "Friend or Colleague",
  "Event",
  "Search Engine",
  "Press / Media",
  "Other",
];

const emptyForm = (): FormData => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  profession: "",
  referral: "",
  goals: "",
  agree: false,
});

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (data.phone && !/^\+?[\d\s\-().]{7,}$/.test(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!data.location.trim()) errors.location = "City, State, Country is required.";
  if (!data.profession.trim()) errors.profession = "Profession / Industry is required.";
  if (!data.referral) errors.referral = "Please select how you heard about us.";
  if (!data.goals.trim()) errors.goals = "Please share what you hope to gain.";
  if (!data.agree) errors.agree = "You must agree to the Community Guidelines and Terms.";
  return errors;
}

export default function EllevationPage() {
  const [activeTier, setActiveTier] = useState<MembershipTier>("FOUNDATION");
  const [forms, setForms] = useState<Record<MembershipTier, FormData>>({
    FOUNDATION: emptyForm(),
    ELLEVATE: emptyForm(),
    LUMINARY: emptyForm(),
  });
  const [errors, setErrors] = useState<Record<MembershipTier, FormErrors>>({
    FOUNDATION: {},
    ELLEVATE: {},
    LUMINARY: {},
  });
  const [submitted, setSubmitted] = useState<Record<MembershipTier, boolean>>({
    FOUNDATION: false,
    ELLEVATE: false,
    LUMINARY: false,
  });
  const [transitioning, setTransitioning] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  const handleTierChange = (tier: MembershipTier) => {
    if (tier === activeTier) return;
    setTransitioning(true);
    setFormVisible(false);
    setTimeout(() => {
      setActiveTier(tier);
      setTransitioning(false);
      setFormVisible(true);
    }, 350);
  };

  const handleChange = (
    tier: MembershipTier,
    field: keyof FormData,
    value: string | boolean
  ) => {
    setForms((prev) => ({ ...prev, [tier]: { ...prev[tier], [field]: value } }));
    if (errors[tier][field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [tier]: { ...prev[tier], [field]: undefined },
      }));
    }
  };

  const handleSubmit = (tier: MembershipTier) => {
    const errs = validateForm(forms[tier]);
    if (Object.keys(errs).length > 0) {
      setErrors((prev) => ({ ...prev, [tier]: errs }));
      // Scroll to first error
      const firstErrorEl = formRef.current?.querySelector("[data-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted((prev) => ({ ...prev, [tier]: true }));
  };

  const meta = TIER_META[activeTier];
  const form = forms[activeTier];
  const errs = errors[activeTier];
  const isSubmitted = submitted[activeTier];

  return (
    <div style={styles.page}>
      {/* === COMBINED BANNER === */}
      <section style={styles.eventsSection}>
        <div style={styles.eventsGradient} />
        <div style={styles.eventsBlobLeft} />
        <div style={styles.eventsBlobRight} />
        <div style={styles.eventsContent}>
          {/* MEMBERSHIP row */}
          <div style={styles.membershipEyebrow}>
            <span style={styles.membershipLine} />
            <span style={styles.membershipEyebrowText}>MEMBERSHIP</span>
            <span style={styles.membershipLine} />
          </div>
          <h1 style={styles.membershipTitle}>Join Ellevation</h1>


        </div>
      </section>

      {/* === MEMBERSHIP FORM SECTION === */}
      <section style={styles.formSection}>
        {/* Tabs */}
        <div style={styles.tabsRow}>
          {TIERS.map((tier) => (
            <button
              key={tier}
              style={{
                ...styles.tabBtn,
                ...(activeTier === tier ? { ...styles.tabBtnActive, background: TIER_META[tier].color } : {}),
              }}
              onClick={() => handleTierChange(tier)}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div
          ref={formRef}
          style={{
            ...styles.formCard,
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            borderTop: `3px solid ${meta.color}`,
          }}
        >
          {isSubmitted ? (
            <div style={styles.successBox}>
              <div style={{ ...styles.successIcon, color: meta.color }}>✦</div>
              <h2 style={{ ...styles.successTitle, color: meta.color }}>
                Application Submitted!
              </h2>
              <p style={styles.successText}>
                Thank you for applying for <strong>{meta.label} Membership</strong>. Our team
                will be in touch within 48 hours.
              </p>
              <button
                style={{ ...styles.submitBtn, background: meta.color }}
                onClick={() =>
                  setSubmitted((prev) => ({ ...prev, [activeTier]: false }))
                }
              >
                SUBMIT ANOTHER
              </button>
            </div>
          ) : (
            <>
              <div style={styles.formHeader}>
                <h2 style={styles.formTitle}>Apply for {meta.label} Membership</h2>
                <p style={styles.formSubtitle}>
                  Complete this form and our team will be in touch within 48 hours.
                </p>
                <p style={{ ...styles.tierTagline, color: meta.color }}>{meta.tagline}</p>
              </div>

              {/* Row: First + Last */}
              <div style={styles.row}>
                <div style={styles.fieldWrap}>
                  <input
                    style={{ ...styles.input, ...(errs.firstName ? styles.inputError : {}) }}
                    placeholder="First Name *"
                    value={form.firstName}
                    onChange={(e) => handleChange(activeTier, "firstName", e.target.value)}
                    data-error={errs.firstName ? "true" : undefined}
                  />
                  {errs.firstName && <span style={styles.errorMsg}>{errs.firstName}</span>}
                </div>
                <div style={styles.fieldWrap}>
                  <input
                    style={{ ...styles.input, ...(errs.lastName ? styles.inputError : {}) }}
                    placeholder="Last Name *"
                    value={form.lastName}
                    onChange={(e) => handleChange(activeTier, "lastName", e.target.value)}
                    data-error={errs.lastName ? "true" : undefined}
                  />
                  {errs.lastName && <span style={styles.errorMsg}>{errs.lastName}</span>}
                </div>
              </div>

              {/* Email */}
              <div style={styles.fieldWrap}>
                <input
                  style={{ ...styles.input, ...(errs.email ? styles.inputError : {}) }}
                  placeholder="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange(activeTier, "email", e.target.value)}
                  data-error={errs.email ? "true" : undefined}
                />
                {errs.email && <span style={styles.errorMsg}>{errs.email}</span>}
              </div>

              {/* Phone */}
              <div style={styles.fieldWrap}>
                <input
                  style={{ ...styles.input, ...(errs.phone ? styles.inputError : {}) }}
                  placeholder="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange(activeTier, "phone", e.target.value)}
                />
                {errs.phone && <span style={styles.errorMsg}>{errs.phone}</span>}
              </div>

              {/* Location */}
              <div style={styles.fieldWrap}>
                <input
                  style={{ ...styles.input, ...(errs.location ? styles.inputError : {}) }}
                  placeholder="City, State, Country *"
                  value={form.location}
                  onChange={(e) => handleChange(activeTier, "location", e.target.value)}
                  data-error={errs.location ? "true" : undefined}
                />
                {errs.location && <span style={styles.errorMsg}>{errs.location}</span>}
              </div>

              {/* Profession */}
              <div style={styles.fieldWrap}>
                <input
                  style={{ ...styles.input, ...(errs.profession ? styles.inputError : {}) }}
                  placeholder="Profession / Industry *"
                  value={form.profession}
                  onChange={(e) => handleChange(activeTier, "profession", e.target.value)}
                  data-error={errs.profession ? "true" : undefined}
                />
                {errs.profession && <span style={styles.errorMsg}>{errs.profession}</span>}
              </div>

              {/* Referral */}
              <div style={styles.fieldWrap}>
                <select
                  style={{
                    ...styles.input,
                    ...styles.select,
                    ...(errs.referral ? styles.inputError : {}),
                    color: form.referral ? "#2d1f3d" : "#9e8a8a",
                  }}
                  value={form.referral}
                  onChange={(e) => handleChange(activeTier, "referral", e.target.value)}
                  data-error={errs.referral ? "true" : undefined}
                >
                  <option value="" disabled>
                    How did you hear about us? *
                  </option>
                  {REFERRAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errs.referral && <span style={styles.errorMsg}>{errs.referral}</span>}
              </div>

              {/* Goals */}
              <div style={styles.fieldWrap}>
                <textarea
                  style={{
                    ...styles.input,
                    ...styles.textarea,
                    ...(errs.goals ? styles.inputError : {}),
                  }}
                  placeholder="What are you hoping to gain from your Ellevation membership? *"
                  value={form.goals}
                  onChange={(e) => handleChange(activeTier, "goals", e.target.value)}
                  data-error={errs.goals ? "true" : undefined}
                />
                {errs.goals && <span style={styles.errorMsg}>{errs.goals}</span>}
              </div>

              {/* Agree */}
              <div style={styles.agreeRow} data-error={errs.agree ? "true" : undefined}>
                <label style={styles.agreeLabel}>
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => handleChange(activeTier, "agree", e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span style={styles.agreeText}>
                    I agree to the Ellevation{" "}
                    <a href="#" style={{ ...styles.agreeLink, color: meta.color }}>
                      Community Guidelines
                    </a>{" "}
                    and{" "}
                    <a href="#" style={{ ...styles.agreeLink, color: meta.color }}>
                      Terms of Membership
                    </a>
                    .
                  </span>
                </label>
                {errs.agree && <span style={styles.errorMsg}>{errs.agree}</span>}
              </div>

              {/* Submit */}
              <button
                style={{ ...styles.submitBtn, background: meta.color }}
                onClick={() => handleSubmit(activeTier)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                SUBMIT APPLICATION
              </button>
            </>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdf6f9; }
        input::placeholder, textarea::placeholder { color: #b89fae; }
        select option { color: #2d1f3d; }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #d4a0c0 !important;
          box-shadow: 0 0 0 3px rgba(212,160,192,0.15);
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.04); }
          66% { transform: translate(-10px, 10px) scale(0.97); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-title-anim {
          animation: fadeSlideUp 1s cubic-bezier(.22,1,.36,1) 0.3s both;
        }
        .events-content-anim {
          animation: fadeSlideUp 1s cubic-bezier(.22,1,.36,1) 0.2s both;
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Jost', sans-serif",
    background: "#fdf6f9",
    minHeight: "100vh",
    color: "#2d1f3d",
    overflowX: "hidden",
  },

  // COMBINED BANNER
  membershipEyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    marginBottom: 16,
  },
  membershipLine: {
    display: "inline-block",
    width: 40,
    height: 1,
    background: "#7a5a8a",
  },
  membershipEyebrowText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.28em",
    color: "#7a5a8a",
  },
  membershipTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
    fontWeight: 400,
    color: "#2d1f3d",
    letterSpacing: "-0.01em",
    lineHeight: 1.1,
    marginBottom: 0,
  },
  bannerDivider: {
    width: 1,
    height: 52,
    background: "linear-gradient(to bottom, transparent, #b09ac0, transparent)",
    margin: "36px auto",
  },

  // EVENTS
  eventsSection: {
    position: "relative",
    overflow: "hidden",
    padding: "110px 48px 96px",
    textAlign: "center",
    minHeight: 260,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  eventsGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(150deg,#f9e4ec 0%,#f0d8ee 25%,#e2d0f0 55%,#d8ccf4 80%,#e8d8f8 100%)",
    zIndex: 0,
  },
  eventsBlobLeft: {
    position: "absolute",
    top: -60,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,182,210,0.45) 0%, transparent 70%)",
    animation: "floatBlob 8s ease-in-out infinite",
    zIndex: 1,
  },
  eventsBlobRight: {
    position: "absolute",
    bottom: -80,
    right: -60,
    width: 380,
    height: 380,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(182,140,210,0.38) 0%, transparent 70%)",
    animation: "floatBlob 11s ease-in-out infinite reverse",
    zIndex: 1,
  },
  eventsContent: {
    position: "relative",
    zIndex: 2,
    animation: "fadeSlideUp 1s cubic-bezier(.22,1,.36,1) 0.2s both",
  },
  eventsEyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    marginBottom: 20,
  },
  eventsLine: {
    display: "inline-block",
    width: 44,
    height: 1,
    background: "#7a5a8a",
  },
  eventsEyebrowText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.28em",
    color: "#7a5a8a",
  },
  eventsTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.8rem, 6vw, 5rem)",
    fontWeight: 500,
    color: "#2d1f3d",
    lineHeight: 1.05,
    marginBottom: 24,
    letterSpacing: "-0.02em",
  },
  eventsSubtitle: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "1.05rem",
    fontWeight: 300,
    color: "#4a3060",
    lineHeight: 1.7,
    maxWidth: 520,
    margin: "0 auto",
  },
  eventsArrow: {
    marginTop: 36,
    fontSize: "1.2rem",
    color: "#9a7ab0",
    animation: "floatBlob 2.5s ease-in-out infinite",
  },

  // FORM SECTION
  formSection: {
    maxWidth: 780,
    margin: "0 auto",
    padding: "64px 24px 96px",
    animation: "fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) 0.1s both",
  },

  // TABS
  tabsRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 36,
    flexWrap: "wrap",
  },
  tabBtn: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    padding: "10px 28px",
    borderRadius: 100,
    border: "1.5px solid #d4bcd0",
    background: "transparent",
    color: "#8a6a8a",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  tabBtnActive: {
    color: "#fff",
    border: "1.5px solid transparent",
    boxShadow: "0 4px 20px rgba(180,100,160,0.28)",
    transform: "translateY(-1px)",
  },

  // FORM CARD
  formCard: {
    background: "#fff",
    borderRadius: 20,
    padding: "48px 52px 52px",
    boxShadow: "0 8px 60px rgba(100,60,120,0.10), 0 2px 16px rgba(100,60,120,0.06)",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: 40,
  },
  formTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2rem",
    fontWeight: 500,
    color: "#2d1f3d",
    marginBottom: 8,
  },
  formSubtitle: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.88rem",
    color: "#9a8aaa",
    fontWeight: 300,
    marginBottom: 8,
  },
  tierTagline: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.82rem",
    fontWeight: 500,
    letterSpacing: "0.05em",
    marginTop: 6,
  },

  // FIELDS
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 0,
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
  },
  input: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 400,
    padding: "13px 16px",
    borderRadius: 10,
    border: "1.5px solid #e8d8e8",
    background: "#fdf8fc",
    color: "#2d1f3d",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    width: "100%",
  },
  inputError: {
    borderColor: "#e06090 !important" as any,
    background: "#fff8f9",
  },
  select: {
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239a7ab0' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    paddingRight: 40,
  },
  textarea: {
    resize: "vertical",
    minHeight: 110,
    lineHeight: 1.6,
  },
  errorMsg: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    color: "#d0507a",
    marginTop: 5,
    paddingLeft: 4,
  },

  // AGREE
  agreeRow: {
    marginBottom: 28,
    marginTop: 4,
  },
  agreeLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    cursor: "pointer",
  },
  checkbox: {
    marginTop: 3,
    accentColor: "#c07090",
    width: 15,
    height: 15,
    flexShrink: 0,
  },
  agreeText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.83rem",
    color: "#7a6a8a",
    lineHeight: 1.5,
  },
  agreeLink: {
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },

  // SUBMIT
  submitBtn: {
    width: "100%",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.78rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "15px 24px",
    cursor: "pointer",
    transition: "opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 6px 24px rgba(180,100,150,0.30)",
  },

  // SUCCESS
  successBox: {
    textAlign: "center",
    padding: "40px 24px",
  },
  successIcon: {
    fontSize: "2.5rem",
    marginBottom: 16,
    display: "block",
  },
  successTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2rem",
    fontWeight: 500,
    marginBottom: 12,
  },
  successText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.95rem",
    color: "#7a6a8a",
    lineHeight: 1.7,
    marginBottom: 32,
  },
};