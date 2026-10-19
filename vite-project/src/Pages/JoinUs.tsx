import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Data — the real memberships for both parts of Ellevation            */
/* ------------------------------------------------------------------ */

type PathKey = "ms-ellevation" | "hub";
type Billing = "annual" | "monthly";

interface Membership {
  key: string;
  name: string; // e.g. "Discover"
  subtitle: string; // e.g. "Confidence & Connection"
  annual: number;
  monthly: number;
  quote: string;
  popularWith: string[];
  included: string[];
  outcome: string;
  color: string;
}

interface PathInfo {
  key: PathKey;
  title: string;
  blurb: string;
  intro?: string;
  memberships: Membership[];
}

const PATHS: PathInfo[] = [
  {
    key: "hub",
    title: "Ellevation Hub",
    blurb:
      "For individuals, professionals, businesses and organisations who want belonging, visibility and partnerships.",
    intro:
      "Ellevation Hub membership is more than a membership. It is a pathway to belonging, opportunities, visibility, partnerships, leadership and community impact. All packages offer flexible monthly payment plans.",
    memberships: [
      {
        key: "belong",
        name: "Belong",
        subtitle: "Community Member",
        annual: 250,
        monthly: 25,
        quote: "I want to belong to a supportive community.",
        popularWith: [
          "Individuals",
          "Community members",
          "Students",
          "Job seekers",
          "Volunteers",
          "New migrants",
          "Emerging leaders",
        ],
        included: [
          "Community Hub access",
          "Member networking events",
          "Member newsletter",
          "Early access to opportunities",
          "Event discounts",
          "Collaboration opportunities",
        ],
        outcome: "Belong to a supportive community.",
        color: "#b89c6e",
      },
      {
        key: "grow",
        name: "Grow",
        subtitle: "Growth Member",
        annual: 550,
        monthly: 55,
        quote: "I want to grow my business, career or professional network.",
        popularWith: [
          "Professionals",
          "Entrepreneurs",
          "Freelancers",
          "Consultants",
          "Small business owners",
          "Creatives",
          "Start-ups",
        ],
        included: [
          "Everything in Belong",
          "Directory listing",
          "2 business listings annually",
          "2 job listings annually",
          "2 internship listings annually",
          "2 event listings annually",
          "Business promotion opportunities",
          "One business support session",
          "One complimentary networking event ticket",
        ],
        outcome: "Increase visibility and grow opportunities.",
        color: "#a8823f",
      },
      {
        key: "influence",
        name: "Influence",
        subtitle: "Impact Member",
        annual: 990,
        monthly: 89,
        quote: "I want visibility, credibility and influence.",
        popularWith: [
          "Established businesses",
          "Community leaders",
          "NDIS providers",
          "Social enterprises",
          "Not-for-profits",
          "Coaches and consultants",
        ],
        included: [
          "Everything in Grow",
          "Featured directory listing",
          "Unlimited event listings",
          "6 job listings annually",
          "6 internship listings annually",
          "Business or Community Spotlight feature",
          "Referral opportunities",
          "Opportunity to host workshops and events",
          "Community Champion Recognition",
          "Two complimentary event tickets",
          "Exclusive Impact Network Session (quarterly)",
          "20% discount on Ms Ellevation Membership",
        ],
        outcome: "Build influence, credibility and community presence.",
        color: "#7a5a8a",
      },
      {
        key: "partner",
        name: "Partner",
        subtitle: "Ecosystem Partner",
        annual: 1500,
        monthly: 135,
        quote: "I want strategic partnerships and community impact.",
        popularWith: [
          "Sponsors",
          "Strategic partners",
          "Local government",
          "Universities and training providers",
          "Community organisations",
          "Peak bodies",
          "Medium to large businesses",
        ],
        included: [
          "Everything in Influence",
          "Featured Partner Recognition",
          "Unlimited priority listings",
          "Guest speaking opportunities",
          "VIP event access",
          "Sponsor recognition at selected events",
          "Strategic partnership opportunities",
          "Advisory and leadership opportunities",
          "Five complimentary event passes",
          "Quarterly Ecosystem Leadership Roundtables",
          "Complimentary Ms Ellevation Membership",
          "Visibility across both Ellevation Hub and Ms Ellevation",
        ],
        outcome: "Drive partnerships, leadership and community impact.",
        color: "#4B1E56",
      },
    ],
  },
  {
    key: "ms-ellevation",
    title: "Ms Ellevation",
    blurb:
      "For women and young women who want confidence, connection, leadership and growth.",
    memberships: [
      {
        key: "discover",
        name: "Discover",
        subtitle: "Confidence & Connection",
        annual: 350,
        monthly: 35,
        quote: "I want to invest in myself.",
        popularWith: [
          "Young women",
          "CALD women",
          "Migrant women",
          "Women rebuilding confidence",
          "Women navigating life transitions",
        ],
        included: [
          "Ms Ellevation community access",
          "Quarterly connection sessions",
          "Member newsletter",
          "Priority event registration",
          "Member event discounts",
          "Selected workshops and masterclasses",
          "Personal development resources",
          "Connection with like-minded women",
        ],
        outcome: "Build confidence, connection and clarity.",
        color: "#b07fb4",
      },
      {
        key: "rise",
        name: "Rise",
        subtitle: "Leadership & Growth",
        annual: 650,
        monthly: 60,
        quote: "I want to grow, contribute and create impact.",
        popularWith: [
          "Community-minded women",
          "Emerging leaders",
          "Professionals",
          "Women in business",
          "Women seeking leadership opportunities",
        ],
        included: [
          "Everything in Discover",
          "Leadership development sessions",
          "Member spotlight opportunities",
          "Women's leadership networking events",
          "Volunteer opportunities",
          "Collaboration opportunities",
          "One complimentary event ticket annually",
          "Quarterly members-only networking sessions",
        ],
        outcome: "Develop leadership, visibility and influence.",
        color: "#9b5fa8",
      },
      {
        key: "elevate",
        name: "Elevate",
        subtitle: "Influence & Legacy",
        annual: 1000,
        monthly: 89,
        quote: "I want to lead, influence and create lasting impact.",
        popularWith: [
          "Established business owners",
          "Coaches and consultants",
          "Community leaders",
          "Industry professionals",
          "Women creating social impact",
        ],
        included: [
          "Everything in Rise",
          "Referral opportunities through Ellevation Hub",
          "Free business listing on Ellevation Hub (up to 3 annually)",
          "Speaker opportunities",
          "Business and community spotlight opportunities",
          "Access to mentors and trainers",
          "Opportunity to become a mentor or facilitator",
          "VIP access to Ms Ellevation events",
          "20% discount on selected Ellevation Hub VIP events",
          "Quarterly impact networking sessions",
          "Annual Ms Ellevation member gift",
          "Collaboration and sponsorship opportunities",
          "Selected Ellevation Hub Growth Member benefits",
        ],
        outcome:
          "Increase visibility, strengthen leadership and create lasting impact across both ecosystems.",
        color: "#4B1E56",
      },
    ],
  },
];

const REFERRAL_OPTIONS = [
  "Social Media",
  "Friend or Colleague",
  "Event",
  "Search Engine",
  "Press / Media",
  "Other",
];

/* ------------------------------------------------------------------ */
/* Form types + validation                                             */
/* ------------------------------------------------------------------ */

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  organisation: string;
  billing: Billing;
  referral: string;
  goals: string;
  agree: boolean;
}

type FormErrors = Partial<Record<keyof FormData | "membership", string>>;

const emptyForm = (): FormData => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  profession: "",
  organisation: "",
  billing: "annual",
  referral: "",
  goals: "",
  agree: false,
});

function validateForm(data: FormData, hasMembership: boolean): FormErrors {
  const e: FormErrors = {};
  if (!hasMembership) e.membership = "Please choose a membership above.";
  if (!data.firstName.trim()) e.firstName = "First name is required.";
  if (!data.lastName.trim()) e.lastName = "Last name is required.";
  if (!data.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    e.email = "Enter a valid email address.";
  if (data.phone && !/^\+?[\d\s\-().]{7,}$/.test(data.phone))
    e.phone = "Enter a valid phone number.";
  if (!data.location.trim()) e.location = "City, State, Country is required.";
  if (!data.profession.trim()) e.profession = "Profession / Industry is required.";
  if (!data.referral) e.referral = "Please select how you heard about us.";
  if (!data.goals.trim()) e.goals = "Please share what you hope to gain.";
  if (!data.agree) e.agree = "You must agree to the Community Guidelines and Terms.";
  return e;
}

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

// Fonts + colours match the Ellevation Paths section:
// headings = 'Astrid Regular', body = 'Montserrat', plum #4B1E56, gold #D7B264
const DISPLAY_FONT = "'Astrid Regular', serif";
const BODY_FONT = "'Montserrat', sans-serif";

export default function JoinPage() {
  // Optional deep links: /get-involved/join?path=hub&membership=grow
  const [searchParams] = useSearchParams();

  const [pathKey, setPathKey] = useState<PathKey | null>(null);
  const [membershipKey, setMembershipKey] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<FormData>(emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const membershipsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = searchParams.get("path");
    const m = searchParams.get("membership");
    const found = PATHS.find((x) => x.key === p);
    if (found) {
      setPathKey(found.key);
      if (m && found.memberships.some((x) => x.key === m)) setMembershipKey(m);
    }
  }, [searchParams]);

  const path = PATHS.find((p) => p.key === pathKey) || null;
  const membership = path?.memberships.find((m) => m.key === membershipKey) || null;
  const accent = membership?.color || "#4B1E56";

  const choosePath = (key: PathKey) => {
    if (key !== pathKey) {
      setPathKey(key);
      setMembershipKey(null);
    }
    setTimeout(
      () => membershipsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60
    );
  };

  const toggleDetails = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const chooseMembership = (key: string) => {
    setMembershipKey(key);
    setErrors((prev) => ({ ...prev, membership: undefined }));
    setTimeout(
      () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60
    );
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const errs = validateForm(form, !!membership);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        const el = document.querySelector("[data-error]");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 30);
      return;
    }
    // TODO: send to your backend / Firebase. Payload shape:
    // { path: pathKey, membership: membershipKey, billing: form.billing, ...form }
    setSubmitted(true);
  };

  const resetAll = () => {
    setSubmitted(false);
    setForm(emptyForm());
    setErrors({});
    setPathKey(null);
    setMembershipKey(null);
    setExpanded({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const price = membership
    ? form.billing === "annual"
      ? membership.annual
      : membership.monthly
    : 0;
  const priceLabel = membership
    ? `${money(price)} ${form.billing === "annual" ? "per year" : "per month"}`
    : "";

  const field = (name: keyof FormData, placeholder: string, opts: { type?: string } = {}) => (
    <div className="join-field">
      <input
        className={`join-input${errors[name] ? " join-input-error" : ""}`}
        placeholder={placeholder}
        type={opts.type || "text"}
        value={form[name] as string}
        onChange={(e) => handleChange(name, e.target.value)}
        data-error={errors[name] ? "true" : undefined}
      />
      {errors[name] && <span className="join-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="join-page-root">
      {/* ===== Header ===== */}
      <section className="join-header">
        <p className="join-eyebrow">Membership</p>
        <h1 className="join-main-title">Join Ellevation</h1>
        <p className="join-header-sub">
          Choose your path, pick the membership that fits you, and tell us a little about
          yourself.
        </p>
      </section>

      <div className="join-container">
        {/* ===== Step 1: path ===== */}
        <section className="join-step">
          <h2 className="join-step-title">1. Choose your path</h2>
          <p className="join-hint">Click a card to see its memberships.</p>
          <div className="join-grid-2">
            {PATHS.map((p) => {
              const selected = p.key === pathKey;
              return (
                <button
                  key={p.key}
                  className={`join-card join-path-card${selected ? " is-selected" : ""}`}
                  onClick={() => choosePath(p.key)}
                  aria-pressed={selected}
                >
                  <span className="join-card-eyebrow">
                    {p.memberships.length} memberships from{" "}
                    {money(Math.min(...p.memberships.map((m) => m.annual)))} per year
                  </span>
                  <span className="join-card-title">{p.title}</span>
                  <span className="join-desc">{p.blurb}</span>
                  <span className="join-link-text">
                    {selected ? "Selected ✓ – see memberships below" : "Click to see memberships ▾"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ===== Step 2: membership ===== */}
        {path && (
          <section className="join-step" ref={membershipsRef}>
            <h2 className="join-step-title">2. Choose your {path.title} membership</h2>
            {path.intro && <p className="join-desc join-intro">{path.intro}</p>}
            <p className="join-hint">
              Click “Click to read more” on any card to see what's included.
            </p>
            {errors.membership && (
              <p className="join-error" data-error="true" style={{ marginBottom: 12 }}>
                {errors.membership}
              </p>
            )}
            <div className={path.memberships.length === 4 ? "join-grid-4" : "join-grid-3"}>
              {path.memberships.map((m) => {
                const selected = m.key === membershipKey;
                const open = !!expanded[`${path.key}-${m.key}`];
                return (
                  <div
                    key={m.key}
                    className={`join-card join-mem-card${selected ? " is-selected" : ""}`}
                    style={{ ["--accent" as any]: m.color }}
                  >
                    <p className="join-card-eyebrow">{m.subtitle}</p>
                    <h3 className="join-card-title">{m.name}</h3>

                    <p className="join-price">
                      {money(m.annual)} <span>per year</span>
                    </p>
                    <p className="join-price-alt">or {money(m.monthly)} per month</p>

                    <p className="join-desc join-quote">“{m.quote}”</p>

                    <button
                      className="join-more-btn"
                      onClick={() => toggleDetails(`${path.key}-${m.key}`)}
                      aria-expanded={open}
                    >
                      {open ? "Hide details" : "Click to read more"}
                      <span className={`join-chevron${open ? " open" : ""}`}>▾</span>
                    </button>

                    <div className={`join-drawer${open ? " open" : ""}`}>
                      <div className="join-drawer-inner">
                        <p className="join-sub-label">What's included</p>
                        <div className="join-features">
                          {m.included.map((i) => (
                            <div key={i} className="join-feature">
                              <span className="join-bullet" />
                              {i}
                            </div>
                          ))}
                        </div>

                        <p className="join-sub-label">Popular with</p>
                        <div className="join-features">
                          {m.popularWith.map((i) => (
                            <div key={i} className="join-feature">
                              <span className="join-bullet" />
                              {i}
                            </div>
                          ))}
                        </div>

                        <p className="join-desc join-outcome">
                          <strong>Outcome:</strong> {m.outcome}
                        </p>
                      </div>
                    </div>

                    <button className="join-cta" onClick={() => chooseMembership(m.key)}>
                      {selected ? "Selected ✓" : `Choose ${m.name}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== Step 3: form ===== */}
        {path && (
          <section className="join-step" ref={formRef}>
            <h2 className="join-step-title">3. Your details</h2>

            <div className="join-form-card" style={{ borderTop: `4px solid ${accent}` }}>
              {submitted ? (
                <div className="join-success">
                  <h2 className="join-success-title" style={{ color: accent }}>
                    Application submitted
                  </h2>
                  <p className="join-desc">
                    Thank you for applying for{" "}
                    <strong>
                      {path.title} – {membership?.name}
                    </strong>
                    . Our team will be in touch within 48 hours.
                  </p>
                  <button className="join-cta" onClick={resetAll}>
                    Submit another
                  </button>
                </div>
              ) : (
                <>
                  <div className="join-summary">
                    {membership ? (
                      <>
                        <div>
                          <div className="join-summary-label">Your selection</div>
                          <div className="join-summary-value" style={{ color: accent }}>
                            {path.title} – {membership.name} ({membership.subtitle})
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div className="join-summary-label">Payment</div>
                          <div className="join-summary-value">{priceLabel}</div>
                        </div>
                      </>
                    ) : (
                      <div className="join-summary-label">
                        Choose a membership above to continue.
                      </div>
                    )}
                  </div>

                  <div className="join-row">
                    {field("firstName", "First Name *")}
                    {field("lastName", "Last Name *")}
                  </div>
                  {field("email", "Email Address *", { type: "email" })}
                  {field("phone", "Phone Number", { type: "tel" })}
                  {field("location", "City, State, Country *")}
                  {field("profession", "Profession / Industry *")}
                  {path.key === "hub" &&
                    field("organisation", "Business / Organisation name (if applicable)")}

                  {/* Billing */}
                  <div className="join-field">
                    <div className="join-billing">
                      {(["annual", "monthly"] as Billing[]).map((b) => {
                        const on = form.billing === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            className={`join-billing-btn${on ? " on" : ""}`}
                            onClick={() => handleChange("billing", b)}
                          >
                            {b === "annual" ? "Pay annually" : "Pay monthly"}
                            {membership &&
                              ` (${money(b === "annual" ? membership.annual : membership.monthly)})`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Referral */}
                  <div className="join-field">
                    <select
                      className={`join-input join-select${errors.referral ? " join-input-error" : ""}${
                        form.referral ? "" : " is-empty"
                      }`}
                      value={form.referral}
                      onChange={(e) => handleChange("referral", e.target.value)}
                      data-error={errors.referral ? "true" : undefined}
                    >
                      <option value="" disabled>
                        How did you hear about us? *
                      </option>
                      {REFERRAL_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.referral && <span className="join-error">{errors.referral}</span>}
                  </div>

                  {/* Goals */}
                  <div className="join-field">
                    <textarea
                      className={`join-input join-textarea${errors.goals ? " join-input-error" : ""}`}
                      placeholder="What are you hoping to gain from your Ellevation membership? *"
                      value={form.goals}
                      onChange={(e) => handleChange("goals", e.target.value)}
                      data-error={errors.goals ? "true" : undefined}
                    />
                    {errors.goals && <span className="join-error">{errors.goals}</span>}
                  </div>

                  {/* Agree */}
                  <div className="join-agree" data-error={errors.agree ? "true" : undefined}>
                    <label>
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => handleChange("agree", e.target.checked)}
                      />
                                      <span>
                    I agree to the{" "}
                    <a href="/privacy-policy" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Privacy Policy</a>
                    {" "}and{" "}
                    <a href="/terms" target="_blank" rel="noreferrer" style={{ color: "#4B1E56", fontWeight: 600 }}>Terms &amp; Conditions</a>
                  </span>
                    </label>
                    {errors.agree && <span className="join-error">{errors.agree}</span>}
                  </div>

                  <button className="join-cta join-cta-full" onClick={handleSubmit}>
                    Submit application
                  </button>
                </>
              )}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        /* Astrid Regular is a licensed/custom display font (not on Google Fonts).
           Same file paths as the Ellevation Paths section. */
        @font-face {
          font-family: 'Astrid Regular';
          src: url('/fonts/AstridRegular.woff2') format('woff2'),
               url('/fonts/AstridRegular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .join-page-root, .join-page-root *, .join-page-root *::before, .join-page-root *::after {
          box-sizing: border-box;
        }
        .join-page-root {
          font-family: ${BODY_FONT};
          background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%);
          color: #403452;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Header ── */
        .join-header { text-align: center; padding: 96px 24px 40px; max-width: 760px; margin: 0 auto; }
        .join-eyebrow {
          font-family: ${BODY_FONT}; font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: #662369; margin: 0 0 12px;
        }
        .join-main-title {
          font-family: ${DISPLAY_FONT}; font-size: 52px; font-weight: 700; color: #4B1E56;
          margin: 0 0 20px; line-height: 1.15; letter-spacing: -0.01em;
        }
        .join-header-sub { font-size: 15px; line-height: 1.6; color: #554866; margin: 0; }

        .join-container { max-width: 1240px; margin: 0 auto; padding: 24px 24px 96px; }
        .join-step { margin-bottom: 56px; scroll-margin-top: 100px; }
        .join-step-title {
          font-family: ${DISPLAY_FONT}; font-size: 38px; font-weight: 700; color: #4B1E56;
          margin: 0 0 8px; line-height: 1.2;
        }
        .join-hint { font-size: 14.5px; color: #662369; margin: 0 0 20px; font-weight: 500; }
        .join-intro { max-width: 780px; margin: 12px 0 8px; }

        /* ── Shared text styles (same as Paths cards) ── */
        .join-card-eyebrow {
          font-family: ${BODY_FONT}; font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #662369; margin: 0 0 8px;
        }
        .join-card-title {
          font-family: ${DISPLAY_FONT}; font-size: 38px; font-weight: 700; color: #1a0a2e;
          margin: 0; line-height: 1.2; transition: color 0.3s ease;
        }
        .join-desc { font-size: 15px; line-height: 1.6; color: #554866; margin: 0; }

        /* ── Cards (same look as Paths cards) ── */
        .join-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: stretch; }
        .join-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; align-items: stretch; }
        .join-grid-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; align-items: stretch; }
        @media (min-width: 1200px) { .join-grid-4 { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

        .join-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(124, 92, 191, 0.15);
          border-radius: 28px;
          padding: 32px;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          box-shadow: 0 10px 30px rgba(124, 92, 191, 0.04);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      background-color 0.3s ease, border-color 0.3s ease;
        }
        .join-card:hover {
          transform: translateY(-6px); background: #ffffff;
          border-color: rgba(124, 92, 191, 0.4);
          box-shadow: 0 30px 60px rgba(124, 92, 191, 0.12), 0 12px 24px rgba(124, 92, 191, 0.04);
        }
        .join-card:hover .join-card-title { color: #4B1E56; }
        .join-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: var(--accent, linear-gradient(90deg, #662369, #4B1E56));
          opacity: 0; transition: opacity 0.3s ease;
        }
        .join-card:hover::before, .join-card.is-selected::before { opacity: 1; }
        .join-card.is-selected { border-color: #4B1E56; background: #ffffff; }

        .join-path-card { text-align: left; cursor: pointer; font-family: ${BODY_FONT}; gap: 0; }
        .join-path-card .join-desc { margin: 16px 0 20px; }
        .join-link-text { font-size: 14px; font-weight: 600; color: #662369; }

        .join-mem-card .join-card-title { font-size: 34px; }
        .join-price { font-size: 20px; font-weight: 700; color: #1a0a2e; margin: 18px 0 0; }
        .join-price span { font-size: 14px; font-weight: 400; color: #554866; }
        .join-price-alt { font-size: 14.5px; color: #554866; margin: 4px 0 16px; }
        .join-quote { font-style: italic; margin-bottom: 18px; min-height: 6.4em; }
        .join-grid-3 .join-quote { min-height: 4.8em; }
        .join-mem-card, .join-path-card { height: 100%; }

        /* "Read more" button — clearly looks clickable */
        .join-more-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
          font-family: ${BODY_FONT}; font-size: 14px; font-weight: 600; color: #4B1E56;
          background: transparent; border: 1.5px solid rgba(75, 30, 86, 0.35);
          border-radius: 14px; padding: 11px 18px; cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .join-more-btn:hover { background: rgba(75, 30, 86, 0.06); border-color: #4B1E56; }
        .join-chevron { display: inline-block; transition: transform 0.25s ease; }
        .join-chevron.open { transform: rotate(180deg); }

        /* Drawer (same grid-rows mechanism as Paths cards) */
        .join-drawer {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .join-drawer.open { grid-template-rows: 1fr; }
        .join-drawer-inner { overflow: hidden; }
        .join-sub-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: #662369; margin: 22px 0 12px;
        }
        .join-features { display: flex; flex-direction: column; gap: 10px; }
        .join-feature {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14.5px; line-height: 1.5; color: #403452;
        }
        .join-bullet {
          width: 6px; height: 6px; border-radius: 50%; background: #4B1E56;
          flex-shrink: 0; margin-top: 8px;
        }
        .join-outcome { margin: 22px 0 4px; }

        /* CTA — same gold button as Paths */
        .join-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          font-family: ${BODY_FONT}; font-size: 13px; font-weight: 600; letter-spacing: 0.05em;
          color: #ffffff; background: #D7B264; border: none; border-radius: 14px;
          padding: 14px 28px; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 14px rgba(90, 63, 160, 0.2);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .join-mem-card .join-cta { margin-top: auto; }
        .join-mem-card .join-drawer { margin-bottom: 24px; }
        .join-cta:hover { background: #35143d; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(75, 30, 86, 0.3); }
        .join-cta-full { width: 100%; }

        /* ── Form ── */
        .join-form-card {
          background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(124, 92, 191, 0.15);
          border-radius: 28px; padding: 44px 48px 48px; max-width: 780px; margin: 0 auto;
          box-shadow: 0 10px 30px rgba(124, 92, 191, 0.08);
        }
        .join-summary {
          display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
          background: #f6f3fa; border: 1px solid rgba(124, 92, 191, 0.2);
          border-radius: 14px; padding: 16px 18px; margin-bottom: 28px;
        }
        .join-summary-label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #662369; }
        .join-summary-value { font-size: 15px; font-weight: 600; color: #1a0a2e; margin-top: 4px; }
        .join-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .join-field { display: flex; flex-direction: column; margin-bottom: 16px; }
        .join-input {
          font-family: ${BODY_FONT}; font-size: 15px; color: #403452;
          padding: 14px 16px; border-radius: 12px; border: 1.5px solid rgba(124, 92, 191, 0.25);
          background: #ffffff; width: 100%;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .join-input::placeholder { color: #8c7f9c; }
        .join-input:focus { outline: none; border-color: #4B1E56; box-shadow: 0 0 0 3px rgba(75, 30, 86, 0.12); }
        .join-input-error { border-color: #c0426c; }
        .join-select {
          appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 40px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234B1E56' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 16px center;
        }
        .join-select.is-empty { color: #8c7f9c; }
        .join-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }
        .join-error { font-size: 13px; color: #c0426c; margin-top: 5px; padding-left: 4px; }

        .join-billing { display: flex; gap: 10px; flex-wrap: wrap; }
        .join-billing-btn {
          flex: 1; min-width: 180px; font-family: ${BODY_FONT}; font-size: 14px; font-weight: 500;
          color: #4B1E56; background: transparent; padding: 12px 16px; border-radius: 12px;
          border: 1.5px solid rgba(75, 30, 86, 0.3); cursor: pointer; transition: all 0.2s ease;
        }
        .join-billing-btn.on { background: #4B1E56; color: #ffffff; border-color: #4B1E56; }

        .join-agree { margin: 4px 0 28px; }
        .join-agree label { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 14.5px; line-height: 1.5; color: #403452; }
        .join-agree input { margin-top: 3px; accent-color: #4B1E56; width: 16px; height: 16px; flex-shrink: 0; }
        .join-agree a { color: #4B1E56; text-decoration: underline; text-underline-offset: 2px; }

        .join-success { text-align: center; padding: 32px 16px; }
        .join-success-title { font-family: ${DISPLAY_FONT}; font-size: 38px; font-weight: 700; margin: 0 0 14px; }
        .join-success .join-desc { margin-bottom: 28px; }

        .join-page-root button:focus-visible { outline: 3px solid #D7B264; outline-offset: 2px; }

        /* ── Responsive ── */
        @media (max-width: 900px) { .join-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 868px) {
          .join-grid-2 { grid-template-columns: 1fr; gap: 24px; }
          .join-main-title { font-size: 38px; }
          .join-step-title { font-size: 30px; }
        }
        @media (max-width: 700px) {
          .join-grid-4 { grid-template-columns: 1fr; }
          .join-row { grid-template-columns: 1fr; gap: 0; }
          .join-form-card { padding: 32px 22px; }
          .join-card { padding: 26px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .join-card, .join-drawer, .join-chevron { transition: none; }
          .join-card:hover { transform: none; }
        }

        /* ── Dark Mode (same palette as Paths) ── */
        [data-theme="dark"] .join-page-root { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%); color: #e2e8f0; }
        [data-theme="dark"] .join-main-title,
        [data-theme="dark"] .join-step-title { color: #ffffff; }
        [data-theme="dark"] .join-header-sub,
        [data-theme="dark"] .join-desc,
        [data-theme="dark"] .join-price span,
        [data-theme="dark"] .join-price-alt { color: #cbd5e1; }
        [data-theme="dark"] .join-eyebrow,
        [data-theme="dark"] .join-hint,
        [data-theme="dark"] .join-card-eyebrow,
        [data-theme="dark"] .join-sub-label,
        [data-theme="dark"] .join-link-text,
        [data-theme="dark"] .join-summary-label { color: #c9a3d9; }
        [data-theme="dark"] .join-card-title,
        [data-theme="dark"] .join-price,
        [data-theme="dark"] .join-summary-value { color: #ffffff; }
        [data-theme="dark"] .join-card:hover .join-card-title { color: #d9b8e8; }
        [data-theme="dark"] .join-feature,
        [data-theme="dark"] .join-agree label { color: #e2e8f0; }
        [data-theme="dark"] .join-bullet { background: #c9a3d9; }
        [data-theme="dark"] .join-card,
        [data-theme="dark"] .join-form-card {
          background: rgba(75, 30, 86, 0.35); border-color: rgba(255, 255, 255, 0.12);
        }
        [data-theme="dark"] .join-card:hover,
        [data-theme="dark"] .join-card.is-selected {
          background: rgba(75, 30, 86, 0.55); border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        [data-theme="dark"] .join-more-btn { color: #ffffff; border-color: rgba(255,255,255,0.3); }
        [data-theme="dark"] .join-more-btn:hover { background: rgba(255,255,255,0.08); border-color: #ffffff; }
        [data-theme="dark"] .join-summary { background: rgba(13, 6, 20, 0.6); border-color: rgba(255,255,255,0.15); }
        [data-theme="dark"] .join-input { background: #0d0614; border-color: rgba(255,255,255,0.2); color: #ffffff; }
        [data-theme="dark"] .join-input::placeholder,
        [data-theme="dark"] .join-select.is-empty { color: rgba(255,255,255,0.5); }
        [data-theme="dark"] .join-billing-btn { color: #ffffff; border-color: rgba(255,255,255,0.3); }
        [data-theme="dark"] .join-billing-btn.on { background: #6B3179; border-color: #6B3179; }
        [data-theme="dark"] .join-agree a { color: #d9b8e8; }
        [data-theme="dark"] .join-cta:hover { background: #6B3179; }
      `}</style>
    </div>
  );
}