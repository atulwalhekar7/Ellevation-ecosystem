import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

/* ── Config ───────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE = "service_ux9vfej";
const EMAILJS_TEMPLATE = "template_i4p3erl";
const EMAILJS_PUBLIC_KEY = "Pu2wZN2ERnHjdboLI";

const BUSINESS_CATEGORIES = [
  "Retail & E-commerce",
  "Consulting & Coaching",
  "Creative & Design",
  "Health & Wellness",
  "Technology",
  "Education & Training",
  "Food & Hospitality",
  "Professional Services",
  "Community Organisation",
  "Other",
];

const CONTACT_METHODS = ["Email", "Phone", "Email or phone"];

type YesNo = "" | "Yes" | "No";

type FormState = {
  // Business information
  businessName: string;
  abn: string;
  category: string;
  website: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  // Primary contact
  contactPerson: string;
  position: string;
  mobile: string;
  email: string;
  // Business profile
  overview: string;
  offering: string;
  audience: string;
  serviceArea: string;
  yearsInOperation: string;
  // Community impact
  caldSupport: string;
  employment: YesNo;
  internships: YesNo;
  partnerships: YesNo;
  // Listing content
  listingUrl: string;
  contactMethod: string;
  // Founding business opportunities
  spotlight: YesNo;
  promoteEvent: YesNo;
  jobVacancy: YesNo;
  internshipAd: YesNo;
  // Permissions
  permPublish: boolean;
  permImages: boolean;
  permUpdates: boolean;
  // Declaration
  declarationName: string;
  signature: string;
  declarationDate: string;
};

const today = () => new Date().toISOString().slice(0, 10);

const INITIAL: FormState = {
  businessName: "", abn: "", category: "", website: "", instagram: "", linkedin: "", facebook: "",
  contactPerson: "", position: "", mobile: "", email: "",
  overview: "", offering: "", audience: "", serviceArea: "", yearsInOperation: "",
  caldSupport: "", employment: "", internships: "", partnerships: "",
  listingUrl: "", contactMethod: "",
  spotlight: "", promoteEvent: "", jobVacancy: "", internshipAd: "",
  permPublish: false, permImages: false, permUpdates: false,
  declarationName: "", signature: "", declarationDate: today(),
};

const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

/* ── Styles (scoped under .ob so they don't leak into the rest of the site) ── */
const CSS = `
@font-face {
  font-family: 'Astrid Regular';
  src: url('/fonts/AstridRegular.woff2') format('woff2'), url('/fonts/AstridRegular.otf') format('opentype');
  font-weight: 400; font-style: normal; font-display: swap;
}
.ob{
  --ob-bg:#f6f3fa; --ob-card:#ffffff; --ob-border:rgba(124,92,191,0.18);
  --ob-title:#1a0a2e; --ob-text:#554866; --ob-accent:#4B1E56; --ob-sub:#8a5a97;
  --ob-gold:#D7B264; --ob-input:#fdfbfe; --ob-shadow:0 16px 48px rgba(124,92,191,0.10);
  min-height:100vh; padding:0 0 100px; background:linear-gradient(180deg,#f6f3fa 0%,#ede7f5 100%);
  font-family:'Montserrat',sans-serif; color:var(--ob-title);
}
[data-theme="dark"] .ob{
  --ob-bg:#160d22; --ob-card:#1f1330; --ob-border:rgba(155,109,190,0.22);
  --ob-title:#f3ebff; --ob-text:#d9a8cd; --ob-accent:#c9a3d9; --ob-sub:#c9a3d9;
  --ob-input:#1f172e; --ob-shadow:0 16px 48px rgba(0,0,0,0.35);
  background:#0f0a1a;
}
.ob *{ box-sizing:border-box; }

.ob-hero{ background:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 55%,#35143d 100%); color:#fff; text-align:center; padding:170px 24px 90px; }
.ob-back{ display:inline-block; margin-bottom:28px; font-size:0.85rem; font-weight:600; color:rgba(255,255,255,0.85); text-decoration:none; }
.ob-back:hover{ color:#fff; text-decoration:underline; }
.ob-hero h1{ font-family:'Astrid Regular',serif; font-weight:700; font-size:clamp(34px,5vw,52px); line-height:1.12; margin:0 auto 16px; max-width:820px; }
.ob-hero p{ max-width:680px; margin:0 auto; font-size:18px; line-height:1.75; color:rgba(255,255,255,0.88); }

.ob-wrap{ max-width:820px; margin:48px auto 0; padding:0 20px; position:relative; }
.ob-section{ background:var(--ob-card); border:1.5px solid var(--ob-border); border-radius:24px; padding:36px 36px 40px; margin-bottom:24px; box-shadow:var(--ob-shadow); border-top:3px solid var(--ob-gold); }
.ob-section h2{ font-family:'Astrid Regular',serif; font-size:1.7rem; color:var(--ob-accent); margin:0 0 6px; }
.ob-section .ob-hint{ font-size:0.9rem; color:var(--ob-text); margin:0 0 24px; line-height:1.6; }

.ob-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.ob-full{ grid-column:1 / -1; }
.ob-field{ display:flex; flex-direction:column; }
.ob-label{ font-size:13px; font-weight:600; color:var(--ob-title); margin-bottom:8px; line-height:1.4; }
.ob-label i{ font-style:normal; font-weight:500; color:var(--ob-sub); }
.ob-req{ color:#b3261e; margin-left:2px; }

.ob-input{ width:100%; padding:13px 16px; border-radius:12px; border:1.5px solid var(--ob-border); background:var(--ob-input); color:var(--ob-title); font-family:inherit; font-size:15px; transition:border-color .2s, box-shadow .2s; }
.ob-input::placeholder{ color:#b09fc0; }
.ob-input:focus{ outline:none; border-color:var(--ob-accent); box-shadow:0 0 0 3px rgba(75,30,86,0.12); }
textarea.ob-input{ resize:vertical; min-height:110px; line-height:1.6; }
.ob-count{ font-size:12px; margin-top:6px; color:var(--ob-sub); }
.ob-count.bad{ color:#b3261e; font-weight:600; }

.ob-file{ padding:12px 14px; }
.ob-file::file-selector-button{ margin-right:12px; padding:8px 14px; border:none; border-radius:100px; background:var(--ob-gold); color:#fff; font-weight:700; font-family:inherit; cursor:pointer; }

.ob-choice{ display:flex; gap:10px; flex-wrap:wrap; }
.ob-pill{ display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:100px; border:1.5px solid var(--ob-border); background:transparent; color:var(--ob-title); font-size:14px; font-weight:600; cursor:pointer; transition:all .2s; }
.ob-pill input{ position:absolute; opacity:0; pointer-events:none; }
.ob-pill:hover{ border-color:var(--ob-accent); }
.ob-pill.on{ background:var(--ob-accent); border-color:var(--ob-accent); color:#fff; }
[data-theme="dark"] .ob-pill.on{ color:#1a0a2e; }
.ob-pill:focus-within{ outline:3px solid rgba(215,178,100,0.7); outline-offset:2px; }

.ob-check{ display:flex; align-items:flex-start; gap:12px; padding:14px 16px; border-radius:14px; border:1.5px solid var(--ob-border); cursor:pointer; font-size:15px; line-height:1.55; color:var(--ob-title); margin-bottom:12px; }
.ob-check input{ accent-color:#4B1E56; width:18px; height:18px; margin-top:3px; flex-shrink:0; cursor:pointer; }
.ob-check:has(input:checked){ background:rgba(75,30,86,0.06); border-color:var(--ob-accent); }

.ob-declare{ font-size:16px; line-height:1.75; color:var(--ob-text); padding:18px 20px; border-radius:14px; background:rgba(215,178,100,0.12); border-left:3px solid var(--ob-gold); margin:0 0 24px; }
.ob-sign{ font-family:'Astrid Regular',serif; font-style:italic; font-size:1.4rem; }

.ob-submit{ display:block; width:100%; max-width:340px; margin:32px auto 0; padding:16px 28px; border:none; border-radius:100px; background:var(--ob-gold); color:#fff; font-family:inherit; font-size:14px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; box-shadow:0 8px 22px rgba(75,30,86,0.28); transition:transform .2s, box-shadow .2s, opacity .2s; }
.ob-submit:hover:not(:disabled){ transform:translateY(-2px); box-shadow:0 12px 30px rgba(75,30,86,0.36); }
.ob-submit:disabled{ opacity:.7; cursor:not-allowed; }
.ob-error{ margin:20px auto 0; max-width:560px; padding:14px 18px; border-radius:12px; background:rgba(179,38,30,0.08); border:1px solid rgba(179,38,30,0.4); color:#b3261e; font-size:14px; line-height:1.6; }
[data-theme="dark"] .ob-error{ color:#ffb4ab; border-color:rgba(255,180,171,0.5); background:rgba(255,180,171,0.08); }

.ob-done{ text-align:center; padding:56px 28px; }
.ob-done h2{ font-family:'Astrid Regular',serif; font-size:2rem; color:var(--ob-accent); margin:0 0 12px; }
.ob-done p{ font-size:18px; line-height:1.7; color:var(--ob-text); max-width:520px; margin:0 auto 28px; }
.ob-done a{ display:inline-block; padding:14px 30px; border-radius:100px; background:var(--ob-gold); color:#fff; font-weight:700; font-size:14px; letter-spacing:0.08em; text-decoration:none; }

@media (max-width:640px){
  .ob-grid{ grid-template-columns:1fr; }
  .ob-section{ padding:28px 20px 32px; border-radius:20px; }
  .ob-hero{ padding:130px 20px 80px; }
  .ob-submit{ max-width:none; }
}
@media (prefers-reduced-motion:reduce){ .ob-input, .ob-pill, .ob-submit{ transition:none; } }
`;

/* ── Small building blocks ────────────────────────────────────────────────── */
function Field({
  label, required, note, full, children,
}: { label: string; required?: boolean; note?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={`ob-field${full ? " ob-full" : ""}`}>
      <span className="ob-label">
        {label}
        {required && <span className="ob-req" aria-hidden="true">*</span>}
        {note && <> <i>({note})</i></>}
      </span>
      {children}
    </div>
  );
}

function YesNoChoice({
  name, value, onChange,
}: { name: string; value: YesNo; onChange: (v: YesNo) => void }) {
  return (
    <div className="ob-choice" role="radiogroup">
      {(["Yes", "No"] as const).map(opt => (
        <label key={opt} className={`ob-pill${value === opt ? " on" : ""}`}>
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} />
          {opt}
        </label>
      ))}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function OnboardingForm() {
  const [f, setF] = useState<FormState>(INITIAL);
  const [logo, setLogo] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setF(prev => ({ ...prev, [key]: value }));

  const words = wordCount(f.overview);
  const wordsOk = words >= 50 && words <= 150;

  const bind = (key: keyof FormState) => ({
    value: f[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      set(key, e.target.value as never),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!wordsOk) {
      setError("Your business overview needs to be between 50 and 150 words. It is currently " + words + ".");
      return;
    }
    if (!f.permPublish) {
      setError("Please give permission to publish your business information so we can create your listing.");
      return;
    }

    // Everything goes into one readable message so it works with the shared EmailJS template.
    const line = (label: string, value: string) => `${label}: ${value || "—"}`;
    const message = [
      "FOUNDING BUSINESS ONBOARDING",
      "",
      "BUSINESS INFORMATION",
      line("Business name", f.businessName),
      line("ABN", f.abn),
      line("Category", f.category),
      line("Website", f.website),
      line("Instagram", f.instagram),
      line("LinkedIn", f.linkedin),
      line("Facebook", f.facebook),
      "",
      "PRIMARY CONTACT",
      line("Contact person", f.contactPerson),
      line("Position / role", f.position),
      line("Mobile", f.mobile),
      line("Email", f.email),
      "",
      "BUSINESS PROFILE",
      line("Overview", f.overview),
      line("Products or services", f.offering),
      line("Who they serve", f.audience),
      line("Service area", f.serviceArea),
      line("Years in operation", f.yearsInOperation),
      "",
      "COMMUNITY IMPACT",
      line("Supports CALD communities", f.caldSupport),
      line("Offers employment", f.employment),
      line("Offers internships / mentoring / work experience", f.internships),
      line("Interested in community partnerships", f.partnerships),
      "",
      "LISTING CONTENT",
      line("Logo file", logo ? logo.name : ""),
      line("Image files", images.map(i => i.name).join(", ")),
      line("Listing URL", f.listingUrl || f.website),
      line("Preferred contact method", f.contactMethod),
      "",
      "FOUNDING BUSINESS OPPORTUNITIES",
      line("Business spotlight", f.spotlight),
      line("Promote an event", f.promoteEvent),
      line("Advertise a job vacancy", f.jobVacancy),
      line("Advertise an internship", f.internshipAd),
      "",
      "PERMISSIONS",
      line("Publish business information", f.permPublish ? "Yes" : "No"),
      line("Use logo and images for promotion", f.permImages ? "Yes" : "No"),
      line("Receive Hub updates and opportunities", f.permUpdates ? "Yes" : "No"),
      "",
      "FOUNDER DECLARATION",
      line("Name", f.declarationName),
      line("Signature", f.signature),
      line("Date", f.declarationDate),
    ].join("\n");

    const nameParts = f.contactPerson.trim().split(/\s+/);

    const templateParams = {
      form_title: "New Ellevation Hub - Founding Business Onboarding",
      ms_display: "none",
      hub_display: "block",
      subject_detail: `Founding Business Onboarding: ${f.businessName}`,
      form_source: "Ellevation Hub — Founding Business Onboarding",
      logo_url: "https://ellvation-ecosystem.web.app/assets/Ellevation-darkmode-logo.png",

      membership_tier: "",
      first_name: nameParts[0] || "",
      last_name: nameParts.slice(1).join(" "),
      email: f.email,
      phone: f.mobile,

      location: f.serviceArea,
      profession: f.position,
      referral: "",
      goals: "",

      purpose: "",
      industry: f.category,
      notes: "",

      enquiry_type: "Founding Business Onboarding",
      organization: f.businessName,
      message,
    };

    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams, { publicKey: EMAILJS_PUBLIC_KEY });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("EmailJS FAILED:", err);
      setError("Your form could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ob">
      <style>{CSS}</style>

      <header className="ob-hero">
        <Link to="/hub" className="ob-back">← Back to Ellevation Hub</Link>
        <h1>Founding Business Onboarding Form</h1>
        <p>
          Thank you for joining the Ellevation Hub Founding Business Program. Complete the details below to
          set up your business profile and get the most visibility within the Hub.
        </p>
      </header>

      <div className="ob-wrap">
        {done ? (
          <div className="ob-section ob-done">
            <h2>Thank you, we have your details</h2>
            <p>
              Your Founding Business onboarding form has been received. Our team will review it and be in touch
              about your listing.
            </p>
            <Link to="/hub">Back to Ellevation Hub</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate={false}>
            {/* Business Information */}
            <section className="ob-section">
              <h2>Business information</h2>
              <p className="ob-hint">Fields marked * are required.</p>
              <div className="ob-grid">
                <Field label="Business name" required full>
                  <input className="ob-input" required {...bind("businessName")} />
                </Field>
                <Field label="ABN" note="optional">
                  <input className="ob-input" inputMode="numeric" {...bind("abn")} />
                </Field>
                <Field label="Business category" required>
                  <select className="ob-input" required {...bind("category")}>
                    <option value="">Select a category</option>
                    {BUSINESS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Business website" full>
                  <input className="ob-input" type="url" placeholder="https://" {...bind("website")} />
                </Field>
                <Field label="Instagram handle">
                  <input className="ob-input" placeholder="@yourbusiness" {...bind("instagram")} />
                </Field>
                <Field label="LinkedIn page">
                  <input className="ob-input" type="url" placeholder="https://linkedin.com/company/…" {...bind("linkedin")} />
                </Field>
                <Field label="Facebook page" full>
                  <input className="ob-input" type="url" placeholder="https://facebook.com/…" {...bind("facebook")} />
                </Field>
              </div>
            </section>

            {/* Primary Contact */}
            <section className="ob-section">
              <h2>Primary contact</h2>
              <p className="ob-hint">The person we should contact about your listing.</p>
              <div className="ob-grid">
                <Field label="Contact person" required>
                  <input className="ob-input" required autoComplete="name" {...bind("contactPerson")} />
                </Field>
                <Field label="Position or role">
                  <input className="ob-input" {...bind("position")} />
                </Field>
                <Field label="Mobile number" required>
                  <input className="ob-input" type="tel" required autoComplete="tel" {...bind("mobile")} />
                </Field>
                <Field label="Email address" required>
                  <input className="ob-input" type="email" required autoComplete="email" {...bind("email")} />
                </Field>
              </div>
            </section>

            {/* Business Profile */}
            <section className="ob-section">
              <h2>Business profile</h2>
              <p className="ob-hint">This is the content that will appear on your Hub listing.</p>
              <div className="ob-grid">
                <Field label="Business overview" required note="50–150 words" full>
                  <textarea className="ob-input" required rows={6} {...bind("overview")} />
                  <span className={`ob-count${f.overview && !wordsOk ? " bad" : ""}`} aria-live="polite">
                    {words} {words === 1 ? "word" : "words"}
                    {f.overview && !wordsOk && (words < 50 ? ` · add ${50 - words} more` : ` · remove ${words - 150}`)}
                  </span>
                </Field>
                <Field label="Products or services offered" required full>
                  <textarea className="ob-input" required rows={3} {...bind("offering")} />
                </Field>
                <Field label="Who do you serve?" required full>
                  <textarea className="ob-input" required rows={3} {...bind("audience")} />
                </Field>
                <Field label="Service area or location" required>
                  <input className="ob-input" required placeholder="e.g. Perth metro, online" {...bind("serviceArea")} />
                </Field>
                <Field label="Years in operation">
                  <input className="ob-input" inputMode="numeric" {...bind("yearsInOperation")} />
                </Field>
              </div>
            </section>

            {/* Community Impact */}
            <section className="ob-section">
              <h2>Community impact</h2>
              <p className="ob-hint">Tell us how your business gives back.</p>
              <div className="ob-grid">
                <Field label="How does your business support CALD communities?" full>
                  <textarea className="ob-input" rows={4} {...bind("caldSupport")} />
                </Field>
                <Field label="Do you offer employment opportunities?" full>
                  <YesNoChoice name="employment" value={f.employment} onChange={v => set("employment", v)} />
                </Field>
                <Field label="Do you offer internships, mentoring or work experience?" full>
                  <YesNoChoice name="internships" value={f.internships} onChange={v => set("internships", v)} />
                </Field>
                <Field label="Are you interested in community partnerships?" full>
                  <YesNoChoice name="partnerships" value={f.partnerships} onChange={v => set("partnerships", v)} />
                </Field>
              </div>
            </section>

            {/* Listing Content */}
            <section className="ob-section">
              <h2>Listing content</h2>
              <p className="ob-hint">What we need to build your listing.</p>
              <div className="ob-grid">
                <Field label="Business logo" required full>
                  <input
                    className="ob-input ob-file"
                    type="file"
                    accept="image/*"
                    required
                    onChange={e => setLogo(e.target.files?.[0] ?? null)}
                  />
                </Field>
                <Field label="High resolution images" note="optional" full>
                  <input
                    className="ob-input ob-file"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => setImages(Array.from(e.target.files ?? []))}
                  />
                </Field>
                <Field label="Website URL for your listing">
                  <input
                    className="ob-input"
                    type="url"
                    placeholder={f.website || "https://"}
                    {...bind("listingUrl")}
                  />
                </Field>
                <Field label="Preferred contact method" required>
                  <select className="ob-input" required {...bind("contactMethod")}>
                    <option value="">Select a method</option>
                    {CONTACT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>
              </div>
            </section>

            {/* Founding Business Opportunities */}
            <section className="ob-section">
              <h2>Founding business opportunities</h2>
              <p className="ob-hint">Choose what you would like us to help you promote.</p>
              <div className="ob-grid">
                <Field label="Would you like a business spotlight feature?" full>
                  <YesNoChoice name="spotlight" value={f.spotlight} onChange={v => set("spotlight", v)} />
                </Field>
                <Field label="Would you like to promote an event?" full>
                  <YesNoChoice name="promoteEvent" value={f.promoteEvent} onChange={v => set("promoteEvent", v)} />
                </Field>
                <Field label="Would you like to advertise a job vacancy?" full>
                  <YesNoChoice name="jobVacancy" value={f.jobVacancy} onChange={v => set("jobVacancy", v)} />
                </Field>
                <Field label="Would you like to advertise an internship opportunity?" full>
                  <YesNoChoice name="internshipAd" value={f.internshipAd} onChange={v => set("internshipAd", v)} />
                </Field>
              </div>
            </section>

            {/* Permissions */}
            <section className="ob-section">
              <h2>Permissions</h2>
              <p className="ob-hint">We only publish what you agree to.</p>
              <label className="ob-check">
                <input type="checkbox" checked={f.permPublish} onChange={e => set("permPublish", e.target.checked)} />
                <span>I give permission to publish my business information on Ellevation Hub. <span className="ob-req">*</span></span>
              </label>
              <label className="ob-check">
                <input type="checkbox" checked={f.permImages} onChange={e => set("permImages", e.target.checked)} />
                <span>I give permission to use my logo and images for promotional purposes.</span>
              </label>
              <label className="ob-check">
                <input type="checkbox" checked={f.permUpdates} onChange={e => set("permUpdates", e.target.checked)} />
                <span>I would like to receive Ellevation Hub updates and opportunities.</span>
              </label>
            </section>

            {/* Founder Declaration */}
            <section className="ob-section">
              <h2>Founder declaration</h2>
              <p className="ob-declare">
                I confirm that the information provided is accurate and I understand that the Founding Business
                Program is complimentary from 1 January 2027 to 31 March 2027.
              </p>
              <div className="ob-grid">
                <Field label="Full name" required>
                  <input className="ob-input" required {...bind("declarationName")} />
                </Field>
                <Field label="Date" required>
                  <input className="ob-input" type="date" required {...bind("declarationDate")} />
                </Field>
                <Field label="Signature" required note="type your full name" full>
                  <input className="ob-input ob-sign" required {...bind("signature")} />
                </Field>
              </div>
            </section>

            {error && <div className="ob-error" role="alert">{error}</div>}

            <button type="submit" className="ob-submit" disabled={sending}>
              {sending ? "Sending…" : "Submit form"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}