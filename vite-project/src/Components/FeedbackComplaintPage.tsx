import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

/* ------------------------------------------------------------------ */
/* Ellevation Feedback & Complaint Form (site-wide)                    */
/* Sends through the same EmailJS service / template as the Join forms */
/* ------------------------------------------------------------------ */

const DISPLAY_FONT = "'Astrid Regular', serif";
const BODY_FONT = "'Montserrat', sans-serif";

const FEEDBACK_TYPES = ["Compliment", "Suggestion", "Feedback", "Complaint", "Other"];
const RELATED_TO = [
  "Ms Ellevation",
  "Ellevation Hub",
  "Event",
  "Program",
  "Partnership",
  "Website",
  "Other",
];
const CONTACT_METHODS = ["Email", "Phone", "No follow-up required"];

interface FeedbackData {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  type: string;
  relatedTo: string[];
  details: string;
  outcome: string;
  contactMethod: string;
  agree: boolean;
}
type FeedbackErrors = Partial<Record<keyof FeedbackData, string>>;

const emptyFeedback = (): FeedbackData => ({
  name: "",
  email: "",
  phone: "",
  organisation: "",
  type: "",
  relatedTo: [],
  details: "",
  outcome: "",
  contactMethod: "",
  agree: false,
});

function validate(d: FeedbackData): FeedbackErrors {
  const e: FeedbackErrors = {};
  if (!d.name.trim()) e.name = "Name is required.";

  if (d.contactMethod === "Email" && !d.email.trim())
    e.email = "Please provide your email so we can follow up.";
  else if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "Enter a valid email address.";

  if (d.contactMethod === "Phone" && !d.phone.trim())
    e.phone = "Please provide your phone number so we can follow up.";
  else if (d.phone.trim() && !/^\+?[\d\s\-().]{7,}$/.test(d.phone))
    e.phone = "Enter a valid phone number.";

  if (!d.type) e.type = "Please select a type of feedback.";
  if (d.relatedTo.length === 0) e.relatedTo = "Please select what this relates to.";
  if (!d.details.trim()) e.details = "Please tell us about your experience, feedback, concern or suggestion.";
  if (!d.contactMethod) e.contactMethod = "Please choose a preferred contact method.";
  if (!d.agree) e.agree = "You must agree to the Privacy Policy and Terms.";
  return e;
}

export default function FeedbackComplaintPage() {
  const [form, setForm] = useState<FeedbackData>(emptyFeedback());
  const [errs, setErrs] = useState<FeedbackErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof FeedbackData, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errs[field]) setErrs((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleRelated = (option: string) => {
    const next = form.relatedTo.includes(option)
      ? form.relatedTo.filter((o) => o !== option)
      : [...form.relatedTo, option];
    handleChange("relatedTo", next);
  };

  const handleSubmit = async () => {
    const e = validate(form);
    if (Object.keys(e).length > 0) {
      setErrs(e);
      setTimeout(
        () =>
          formRef.current
            ?.querySelector("[data-error]")
            ?.scrollIntoView({ behavior: "smooth", block: "center" }),
        30
      );
      return;
    }

    const related = form.relatedTo.join(", ");
    const message =
      `Type: ${form.type}\n` +
      `Related to: ${related}\n` +
      `Preferred contact: ${form.contactMethod}\n\n` +
      `Details:\n${form.details}\n\n` +
      `Desired outcome:\n${form.outcome || "—"}`;

    // The existing email template has first/last name fields; send the full name as first_name.
    const templateParams = {
      form_title: `New Ellevation ${form.type}`,
      ms_display: "block",
      hub_display: "none",
      subject_detail: `${form.type} — ${related}`,
      form_source: "Ellevation — Feedback & Complaint Form",
      logo_url:
        "https://ellvation-ecosystem.web.app/assets/ms-ellevation-darkmode-logo-DqRDfzgt.png",

      membership_tier: `${form.type} — ${related}`,
      first_name: form.name,
      last_name: "",
      email: form.email || "",
      phone: form.phone || "",

      location: "",
      profession: form.organisation || "",
      referral: `Preferred contact: ${form.contactMethod}`,
      goals: message,

      purpose: form.type,
      industry: "",
      notes: form.outcome || "",

      enquiry_type: `${form.type} — ${related}`,
      organization: form.organisation || "",
      message,
    };

    setSending(true);
    try {
      await emailjs.send("service_ux9vfej", "template_i4p3erl", templateParams, {
        publicKey: "Pu2wZN2ERnHjdboLI",
      });
      setSubmitted(true);
      setForm(emptyFeedback());
    } catch (error) {
      console.error("EmailJS FAILED:", error);
      alert("Your submission could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const input = (
    name: "name" | "email" | "phone" | "organisation",
    label: string,
    type = "text"
  ) => (
    <div className="fb-field" data-error={errs[name] ? "true" : undefined}>
      <label className="fb-label" htmlFor={`fb-${name}`}>
        {label}
      </label>
      <input
        id={`fb-${name}`}
        className={`fb-input${errs[name] ? " fb-input-error" : ""}`}
        type={type}
        value={form[name]}
        onChange={(e) => handleChange(name, e.target.value)}
      />
      {errs[name] && <span className="fb-error">{errs[name]}</span>}
    </div>
  );

  const radioGroup = (
    name: "type" | "contactMethod",
    options: string[]
  ) => (
    <div className="fb-field" data-error={errs[name] ? "true" : undefined}>
      <div className="fb-options" role="radiogroup">
        {options.map((o) => {
          const on = form[name] === o;
          return (
            <label key={o} className={`fb-option${on ? " on" : ""}`}>
              <input
                type="radio"
                name={name}
                checked={on}
                onChange={() => handleChange(name, o)}
              />
              <span>{o}</span>
            </label>
          );
        })}
      </div>
      {errs[name] && <span className="fb-error">{errs[name]}</span>}
    </div>
  );

  return (
    <div className="fb-page-root">
      <section className="fb-banner">
        <div className="fb-banner-inner">
          <p className="fb-eyebrow">We’re Listening</p>
          <h1 className="fb-title">Ellevation Feedback &amp; Complaint Form</h1>
          <p className="fb-sub">
            We value your feedback. Your feedback, suggestions, compliments, or complaints
            help us improve our programs, services, events, and partnerships across Ellevation
            Hub and Ms Ellevation.
          </p>
        </div>
      </section>

      <section className="fb-section">
        <div ref={formRef} className="fb-card">
          {submitted ? (
            <div className="fb-success">
              <h2 className="fb-success-title">Thank You</h2>
              <p className="fb-success-text">
                Thank you for helping us build stronger communities, partnerships, and
                opportunities through Ellevation. We’ve received your submission and our team
                will review it carefully.
              </p>
              <button className="fb-btn" onClick={() => setSubmitted(false)}>
                Submit another
              </button>
            </div>
          ) : (
            <>
              {/* Your Details */}
              <h2 className="fb-section-title">Your Details</h2>
              {input("name", "Name *")}
              {input("email", "Email", "email")}
              {input("phone", "Phone", "tel")}
              {input("organisation", "Organisation (if applicable)")}

              {/* Type of Feedback */}
              <h2 className="fb-section-title">Type of Feedback</h2>
              {radioGroup("type", FEEDBACK_TYPES)}

              <p className="fb-label fb-label-spaced">Related to</p>
              <div className="fb-field" data-error={errs.relatedTo ? "true" : undefined}>
                <div className="fb-options">
                  {RELATED_TO.map((o) => {
                    const on = form.relatedTo.includes(o);
                    return (
                      <label key={o} className={`fb-option${on ? " on" : ""}`}>
                        <input type="checkbox" checked={on} onChange={() => toggleRelated(o)} />
                        <span>{o}</span>
                      </label>
                    );
                  })}
                </div>
                {errs.relatedTo && <span className="fb-error">{errs.relatedTo}</span>}
              </div>

              {/* Details */}
              <h2 className="fb-section-title">Details</h2>
              <div className="fb-field" data-error={errs.details ? "true" : undefined}>
                <label className="fb-label" htmlFor="fb-details">
                  Please tell us about your experience, feedback, concern, or suggestion: *
                </label>
                <textarea
                  id="fb-details"
                  className={`fb-input fb-textarea${errs.details ? " fb-input-error" : ""}`}
                  value={form.details}
                  onChange={(e) => handleChange("details", e.target.value)}
                />
                {errs.details && <span className="fb-error">{errs.details}</span>}
              </div>

              {/* Resolution and Follow-Up */}
              <h2 className="fb-section-title">Resolution and Follow-Up</h2>
              <div className="fb-field">
                <label className="fb-label" htmlFor="fb-outcome">
                  What outcome would you like to see, if applicable?
                </label>
                <textarea
                  id="fb-outcome"
                  className="fb-input fb-textarea fb-textarea-sm"
                  value={form.outcome}
                  onChange={(e) => handleChange("outcome", e.target.value)}
                />
              </div>

              <p className="fb-label fb-label-spaced">Preferred contact method *</p>
              {radioGroup("contactMethod", CONTACT_METHODS)}

              {/* Agree */}
              <div className="fb-agree" data-error={errs.agree ? "true" : undefined}>
                <label className="fb-check">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => handleChange("agree", e.target.checked)}
                  />
                  <span>
                    I agree to the{" "}
                    <a href="/privacy-policy" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms-condition" target="_blank" rel="noreferrer">
                      Terms &amp; Conditions
                    </a>
                  </span>
                </label>
                {errs.agree && <span className="fb-error">{errs.agree}</span>}
              </div>

              <button
                className="fb-btn fb-btn-full"
                disabled={sending}
                onClick={handleSubmit}
                style={{ opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
              >
                {sending ? "SENDING..." : "SUBMIT"}
              </button>

              <p className="fb-thanks">
                Thank you for helping us build stronger communities, partnerships, and
                opportunities through Ellevation.
              </p>
            </>
          )}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        @font-face {
          font-family: 'Astrid Regular';
          src: url('/fonts/AstridRegular.woff2') format('woff2'),
               url('/fonts/AstridRegular.otf') format('opentype');
          font-weight: 400; font-style: normal; font-display: swap;
        }

        .fb-page-root, .fb-page-root *, .fb-page-root *::before, .fb-page-root *::after { box-sizing: border-box; }
        .fb-page-root {
          font-family: ${BODY_FONT};
          background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%);
          color: #403452; min-height: 100vh; overflow-x: hidden;
        }

        .fb-banner { padding: 96px 24px 40px; text-align: center; }
        .fb-banner-inner { max-width: 760px; margin: 0 auto; animation: fbUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fbUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .fb-eyebrow { font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #662369; margin: 0 0 14px; }
        .fb-title { font-family: ${DISPLAY_FONT}; font-size: clamp(34px, 5vw, 52px); font-weight: 700; line-height: 1.15; color: #4B1E56; margin: 0 0 18px; }
        .fb-sub { font-size: 18px; line-height: 1.7; color: #554866; margin: 0; }

        .fb-section { max-width: 780px; margin: 0 auto; padding: 24px 24px 96px; }
        .fb-card {
          background: #ffffff; border-radius: 20px; border-top: 3px solid #4B1E56;
          padding: 48px 52px 52px;
          box-shadow: 0 8px 60px rgba(75,30,86,0.10), 0 2px 16px rgba(75,30,86,0.06);
        }
        .fb-section-title {
          font-family: ${DISPLAY_FONT}; font-size: 1.6rem; font-weight: 600; color: #1a0a2e;
          margin: 36px 0 18px; padding-bottom: 10px; border-bottom: 1px solid #ede7f5;
        }
        .fb-section-title:first-child { margin-top: 0; }

        .fb-field { display: flex; flex-direction: column; margin-bottom: 16px; }
        .fb-label { font-size: 14px; font-weight: 600; color: #4B1E56; margin: 0 0 8px; }
        .fb-label-spaced { margin-top: 8px; }
        .fb-input {
          font-family: ${BODY_FONT}; font-size: 0.95rem; color: #1a0a2e;
          padding: 13px 16px; border-radius: 10px; border: 1.5px solid #ede7f5;
          background: #fdf9fc; width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .fb-input:focus { outline: none; border-color: #4B1E56; box-shadow: 0 0 0 3px rgba(75,30,86,0.12); }
        .fb-input-error { border-color: #a04a70; background: #fff8f9; }
        .fb-textarea { resize: vertical; min-height: 150px; line-height: 1.6; }
        .fb-textarea-sm { min-height: 100px; }
        .fb-error { font-size: 0.75rem; color: #a04a70; margin-top: 5px; padding-left: 4px; }

        /* Radio / checkbox "pills" */
        .fb-options { display: flex; flex-wrap: wrap; gap: 10px; }
        .fb-option {
          display: inline-flex; align-items: center; gap: 9px; cursor: pointer;
          font-size: 14px; font-weight: 500; color: #4B1E56;
          padding: 10px 16px; border-radius: 100px; border: 1.5px solid #ded4ee; background: #fdf9fc;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .fb-option input { accent-color: #4B1E56; width: 15px; height: 15px; margin: 0; }
        .fb-option:hover { border-color: #4B1E56; }
        .fb-option.on { background: #4B1E56; border-color: #4B1E56; color: #ffffff; }
        .fb-option.on input { accent-color: #D7B264; }

        .fb-check { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 14px; line-height: 1.5; color: #554866; }
        .fb-check input { margin-top: 3px; accent-color: #4B1E56; width: 15px; height: 15px; flex-shrink: 0; }
        .fb-check a { color: #4B1E56; font-weight: 600; }
        .fb-agree { margin: 28px 0 26px; }

        .fb-btn {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: ${BODY_FONT}; font-size: 14px; font-weight: 700; letter-spacing: 0.1em;
          color: #ffffff; background: #D7B264; border: none; border-radius: 10px;
          padding: 15px 28px; cursor: pointer;
          box-shadow: 0 6px 24px rgba(75,30,86,0.30);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .fb-btn:hover:not(:disabled) { background: #35143d; transform: translateY(-2px); }
        .fb-btn-full { width: 100%; }
        .fb-page-root button:focus-visible { outline: 3px solid #D7B264; outline-offset: 2px; }
        .fb-option:focus-within { outline: 3px solid rgba(215,178,100,0.7); outline-offset: 2px; }

        .fb-thanks { text-align: center; font-size: 15px; line-height: 1.6; color: #8a5a97; margin: 26px 0 0; font-style: italic; }

        .fb-success { text-align: center; padding: 40px 16px; }
        .fb-success-title { font-family: ${DISPLAY_FONT}; font-size: 2rem; font-weight: 600; color: #4B1E56; margin: 0 0 12px; }
        .fb-success-text { font-size: 18px; line-height: 1.7; color: #554866; margin: 0 0 28px; }

        @media (max-width: 700px) {
          .fb-banner { padding: 72px 20px 28px; }
          .fb-card { padding: 32px 22px 36px; }
        }
        @media (prefers-reduced-motion: reduce) { .fb-banner-inner { animation: none; } }

        /* ── Dark mode ── */
        [data-theme="dark"] .fb-page-root { background: linear-gradient(180deg, #0d0614 0%, #160d22 100%); color: #e2e8f0; }
        [data-theme="dark"] .fb-title, [data-theme="dark"] .fb-section-title { color: #ffffff; }
        [data-theme="dark"] .fb-sub, [data-theme="dark"] .fb-success-text, [data-theme="dark"] .fb-check { color: #d9a8cd; }
        [data-theme="dark"] .fb-eyebrow, [data-theme="dark"] .fb-label, [data-theme="dark"] .fb-thanks { color: #c9a3d9; }
        [data-theme="dark"] .fb-card { background: #1f1330; box-shadow: 0 8px 48px rgba(0,0,0,0.5); }
        [data-theme="dark"] .fb-section-title { border-bottom-color: rgba(155,109,190,0.25); }
        [data-theme="dark"] .fb-input { background: #0d0614; border-color: rgba(155,109,190,0.3); color: #e8e0f8; }
        [data-theme="dark"] .fb-option { background: #0d0614; border-color: rgba(155,109,190,0.3); color: #e8b8f0; }
        [data-theme="dark"] .fb-option:hover { border-color: #c9a3d9; }
        [data-theme="dark"] .fb-option.on { background: #6B3179; border-color: #6B3179; color: #ffffff; }
        [data-theme="dark"] .fb-check a { color: #e8b8f0; }
        [data-theme="dark"] .fb-success-title { color: #e8b8f0; }
        [data-theme="dark"] .fb-btn:hover:not(:disabled) { background: #6B3179; }
      `}</style>
    </div>
  );
}