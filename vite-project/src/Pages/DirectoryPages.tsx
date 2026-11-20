/* ══════════════════════════════════════════════════════════════════════════
   THE ELLEVATION COLLECTIVE — Directory + Join the Directory
   Built to: "Final Simplified Website Content & Developer Implementation Brief"
   (Nov 2026, Phase 1).

   Drop this file next to EllevationHub.tsx, e.g. src/pages/DirectoryPages.tsx
   (adjust the import path of submitRegistration if your folders differ).

   Exports:
     DirectorySection      → public page   (?page=directory)
     JoinDirectorySection  → pricing+form  (?page=join-directory)

   CHANGES IN THIS VERSION
   1. Grow entitlement now reads "Standard listing included" (matches Membership page).
   2. Join form: location is now multi-select chips (up to 3) instead of one dropdown.
   3. Card tags: 1 service + 1 availability tag so availability is actually visible.
   4. Package dropdown no longer auto-scrolls; only the pricing-card buttons do.
   5. Join form scrolls to the success message after submit.
   6. Enquiry modal has a proper keyboard focus trap.

   PHASE 1 NOTES
   - Listings below are DEMO DATA (fictional). Replace DEMO_LISTINGS with real
     approved listings (API/CMS) when the backend exists.
   - Enquiries go ONLY to Ellevation Hub admin via EmailJS (never to the
     business). A reference number is generated client-side.
   - EmailJS cannot: store records, track status, export CSV, upload images
     or take payments. Those need a backend (see TODO(backend) markers).
   ══════════════════════════════════════════════════════════════════════════ */
import { useState, useEffect, useMemo, useRef } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { submitDirectoryForm } from "../Emailjs/SubmitCollectiveForms";
type NavFn = (p: "membership" | "directory" | "join-directory" | "connect", param?: string) => void;

/* ── Constants from the brief ─────────────────────────────────────────── */
const CATEGORIES = [
  "Business & Strategy",
  "Marketing & Branding",
  "Education & Tutoring",
  "Children’s Programs & Youth Development",
  "Men’s, Family & Community Programs & Services",
  "Health & Wellbeing",
  "Events & Entertainment",
  "Leadership & Professional Development",
  "Speakers & Facilitators",
  "Creative Services",
  "Technology & Digital Services",
  "Finance & Administration",
  "Trades & Home Services",
  "Community Organisations & Non-Profits",
];
const LOCATIONS = ["Perth Metro", "Regional WA", "Australia-Wide", "Online"];
const AVAILABILITY = ["Projects", "Workshops", "Speaking", "Events", "Partnerships"];

// Brief is inconsistent (section 2 table says 3, section 2 text/9/10 say 2).
// Change this one number once the client confirms.
const MAX_VISIBLE_TAGS = 2;
const MAX_LOCATIONS = 3;
const PAGE_SIZE = 6;
const MAX_DESC = 150;

/* Short info shown on each category card (draft copy, client se approve karwana) */
const CATEGORY_INFO: Record<string, { icon: string; desc: string }> = {
  "Business & Strategy": { icon: "◈", desc: "Business advisors, strategists and consultants helping organisations plan and grow." },
  "Marketing & Branding": { icon: "✦", desc: "Branding, marketing and communications support to help you be seen and remembered." },
  "Education & Tutoring": { icon: "☖", desc: "Tutors, trainers and educators supporting learning at every stage." },
  "Children’s Programs & Youth Development": { icon: "❀", desc: "Programs that help children and young people build confidence, skills and belonging." },
  "Men’s, Family & Community Programs & Services": { icon: "◎", desc: "Programs and services supporting men, families and community wellbeing." },
  "Health & Wellbeing": { icon: "♥", desc: "Health, wellness and wellbeing providers supporting the whole person." },
  "Events & Entertainment": { icon: "✺", desc: "Event planners, performers and entertainers who bring communities together." },
  "Leadership & Professional Development": { icon: "◑", desc: "Coaching, mentoring and training to grow leadership and careers." },
  "Speakers & Facilitators": { icon: "❖", desc: "Speakers, MCs and facilitators who inspire and guide groups." },
  "Creative Services": { icon: "✿", desc: "Designers, photographers, writers and creatives bringing ideas to life." },
  "Technology & Digital Services": { icon: "⬡", desc: "Web, software and digital specialists helping you work smarter." },
  "Finance & Administration": { icon: "❋", desc: "Accounting, bookkeeping and admin support to keep things running smoothly." },
  "Trades & Home Services": { icon: "✧", desc: "Trusted trades and home service providers for homes and businesses." },
  "Community Organisations & Non-Profits": { icon: "☼", desc: "Community groups and not-for-profits creating positive local impact." },
};

const clip = (s: string, n = MAX_DESC) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

/* ── Demo data (fictional) ────────────────────────────────────────────── */
type Listing = {
  id: string;
  business: string;
  owner: string;
  role?: string;
  category: string;            // primary category only is displayed
  extraCategories?: string[];  // used for filtering only
  locations: string[];
  whatWeDo: string;
  contribution?: string;       // omit if not supplied — never invent one
  services: string[];
  availability: string[];
  portrait?: string;           // approved image URL
  logo?: string;               // approved image URL
};

const DEMO_LISTINGS: Listing[] = [
  { id: "l1", business: "The Brand Studio", owner: "Amara Johnson", role: "Founder", category: "Marketing & Branding", extraCategories: ["Creative Services"], locations: ["Perth Metro", "Australia-Wide", "Online"], whatWeDo: "Helping entrepreneurs build confident brands through strategy, professional imagery and creative design.", contribution: "Helping small businesses strengthen their visibility and attract new customers through strategic branding and marketing.", services: ["Brand Strategy", "Creative Services"], availability: ["Projects"] },
  { id: "l2", business: "Bright Path Tutoring", owner: "Daniel Okafor", role: "Director", category: "Education & Tutoring", locations: ["Perth Metro", "Online"], whatWeDo: "Small-group and one-on-one tutoring that builds confidence in maths, English and study skills.", contribution: "Supporting newly arrived students to catch up and feel at home in the classroom.", services: ["Tutoring", "Study Skills"], availability: ["Workshops"] },
  { id: "l3", business: "Roots & Rise Youth", owner: "Mei Lin Tan", role: "Program Lead", category: "Children’s Programs & Youth Development", locations: ["Perth Metro"], whatWeDo: "Mentoring circles and leadership camps for young people aged 12 to 18.", contribution: "Creating safe spaces where young people find their voice and future pathways.", services: ["Mentoring", "Leadership Camps"], availability: ["Partnerships"] },
  { id: "l4", business: "Kinship Wellbeing", owner: "Fatima Hassan", role: "Counsellor", category: "Health & Wellbeing", locations: ["Perth Metro", "Online"], whatWeDo: "Culturally responsive counselling and wellbeing workshops for individuals and families.", services: ["Counselling", "Wellbeing Workshops"], availability: ["Workshops"] },
  { id: "l5", business: "Northbridge Digital", owner: "Samuel Reyes", role: "Co-founder", category: "Technology & Digital Services", locations: ["Australia-Wide", "Online"], whatWeDo: "Websites, booking systems and simple automation for small teams and community groups.", contribution: "Making good technology affordable for community organisations.", services: ["Web Design", "Automation"], availability: ["Projects"] },
  { id: "l6", business: "Voice & Vision Speaking", owner: "Priya Nair", role: "Speaker & Facilitator", category: "Speakers & Facilitators", extraCategories: ["Leadership & Professional Development"], locations: ["Perth Metro", "Regional WA", "Online"], whatWeDo: "Keynotes and facilitated sessions on leadership, belonging and cross-cultural communication.", services: ["Keynotes", "Facilitation"], availability: ["Speaking", "Workshops"] },
  { id: "l7", business: "Ledger & Lane", owner: "Grace Mutasa", role: "Principal", category: "Finance & Administration", locations: ["Perth Metro", "Online"], whatWeDo: "Bookkeeping, BAS and payroll support for sole traders and growing small businesses.", services: ["Bookkeeping", "BAS & Payroll"], availability: ["Projects"] },
  { id: "l8", business: "Harvest Table Events", owner: "Luca Moretti", role: "Event Director", category: "Events & Entertainment", locations: ["Perth Metro", "Regional WA"], whatWeDo: "Community celebrations, markets and cultural festivals planned from first idea to final pack-down.", contribution: "Bringing communities together around food, music and shared stories.", services: ["Event Planning", "Cultural Festivals"], availability: ["Events", "Partnerships"] },
  { id: "l9", business: "Together WA", owner: "Aisha Rahman", role: "Executive Officer", category: "Community Organisations & Non-Profits", locations: ["Perth Metro", "Regional WA"], whatWeDo: "A volunteer-led network connecting families to local services, language support and community events.", contribution: "Making it easier for families to find the help and connection they need.", services: ["Family Support", "Community Networks"], availability: ["Partnerships", "Events"] },
  { id: "l10", business: "Steady Hands Trades", owner: "Tomasz Kowal", role: "Owner", category: "Trades & Home Services", locations: ["Perth Metro"], whatWeDo: "Reliable carpentry, repairs and small renovations for homes and community venues.", services: ["Carpentry", "Repairs"], availability: ["Projects"] },
];

/* ── Shared CSS (scoped under .dc, dark-mode aware) ───────────────────── */
const DC_CSS = `
.dc{
  --dc-bg:#fdf9fc; --dc-soft:#f6f3fa; --dc-card:#ffffff; --dc-border:rgba(124,92,191,0.18);
  --dc-title:#1a0a2e; --dc-text:#554866; --dc-accent:#4B1E56; --dc-sub:#8a5a97; --dc-gold:#D7B264;
  --dc-field:#fdfbfe; --dc-shadow:0 8px 28px rgba(75,30,86,0.10); --dc-danger:#a4262c;
  --dc-grad:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 55%,#35143d 100%);
  font-family:'Montserrat',sans-serif; color:var(--dc-text); background:var(--dc-bg);
}
[data-theme="dark"] .dc{
  --dc-bg:#0d0614; --dc-soft:#160d22; --dc-card:#1f1330; --dc-border:rgba(155,109,190,0.25);
  --dc-title:#e8e0f8; --dc-text:#d9a8cd; --dc-accent:#c9a3d9; --dc-sub:#c9a3d9;
  --dc-field:#160d22; --dc-shadow:0 10px 36px rgba(0,0,0,0.5); --dc-danger:#ff9aa0;
  --dc-grad:linear-gradient(135deg,#2a163a 0%,#1f1330 60%,#160d22 100%);
}
.dc *{ box-sizing:border-box; }
.dc h1,.dc h2,.dc h3,.dc h4{ font-family:'Astrid Regular',serif; color:var(--dc-title); }
.dc-wrap{ max-width:1240px; margin:0 auto; padding:0 24px; }
.dc-btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; font-family:'Montserrat',sans-serif;
  font-size:15px; font-weight:700; letter-spacing:0.04em; padding:14px 28px; border-radius:100px; border:2px solid transparent;
  cursor:pointer; transition:transform .2s ease, box-shadow .2s ease; text-decoration:none; }
.dc-btn:focus-visible, .dc-link:focus-visible, .dc input:focus-visible, .dc select:focus-visible, .dc textarea:focus-visible, .dc-chip:focus-visible{
  outline:3px solid #D7B264; outline-offset:2px; }
.dc-btn-primary{ background:var(--dc-grad); color:#fff; box-shadow:0 8px 22px rgba(75,30,86,0.28); border-color:rgba(255,255,255,0.12); }
.dc-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 12px 28px rgba(75,30,86,0.36); }
.dc-btn-gold{ background:#D7B264; color:#2a163a; }
.dc-btn-ghost{ background:transparent; color:var(--dc-accent); border-color:var(--dc-accent); }
.dc-btn-onDark{ background:transparent; color:#fff; border-color:rgba(255,255,255,0.7); }
.dc-btn[disabled]{ opacity:.6; cursor:not-allowed; transform:none; }

/* Hero (compact) */
.dc-hero{ background:var(--dc-grad); color:#fff; text-align:center; padding:56px 0 48px; }
.dc-hero .dc-eyebrow{ font-size:14px; font-weight:700; letter-spacing:0.2em; color:#D7B264; margin-bottom:12px; }
.dc-hero h1{ color:#fff; font-size:clamp(34px,5vw,54px); line-height:1.1; margin-bottom:14px; }
.dc-hero p{ max-width:640px; margin:0 auto 10px; font-size:18px; line-height:1.7; color:rgba(255,255,255,0.9); }
.dc-hero-actions{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:24px; }

/* Search & filters */
.dc-search{ background:var(--dc-soft); padding:40px 0 28px; border-bottom:1px solid var(--dc-border); }
.dc-search h2{ font-size:clamp(26px,3.4vw,36px); text-align:center; margin-bottom:20px; }
.dc-search-bar{ max-width:760px; margin:0 auto 16px; }
.dc-filters{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)) auto; gap:12px; max-width:980px; margin:0 auto; align-items:end; }
.dc-label{ display:block; font-size:14px; font-weight:600; color:var(--dc-title); margin-bottom:6px; }
.dc-input, .dc select, .dc textarea{ width:100%; padding:14px 16px; border-radius:14px; border:1.5px solid var(--dc-border);
  background:var(--dc-field); color:var(--dc-title); font-family:'Montserrat',sans-serif; font-size:16px; }
.dc textarea{ resize:vertical; }
.dc-input::placeholder, .dc textarea::placeholder{ color:#8d7d9c; }
.dc-input[aria-invalid="true"], .dc select[aria-invalid="true"]{ border-color:var(--dc-danger); }

/* Results */
.dc-results{ padding:40px 0 64px; scroll-margin-top:calc(var(--nav-height,96px) + 12px); }
.dc-count{ text-align:center; font-size:16px; margin-bottom:28px; }
.dc-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:24px; }
.dc-card{ display:flex; flex-direction:column; background:var(--dc-card); border:1px solid var(--dc-border); border-radius:22px;
  overflow:hidden; box-shadow:var(--dc-shadow); }
.dc-portrait{ position:relative; aspect-ratio:4/4.4; background:linear-gradient(165deg,#6b2f7a,#2d1740); }
.dc-portrait img{ width:100%; height:100%; object-fit:cover; object-position:center 20%; display:block; }
.dc-portrait-ph{ width:100%; height:100%; display:flex; align-items:flex-end; justify-content:center; }
.dc-logo{ position:absolute; right:14px; bottom:-26px; width:64px; height:64px; border-radius:16px; background:#fff;
  border:3px solid var(--dc-card); box-shadow:0 6px 16px rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; overflow:hidden; }
.dc-logo img{ width:100%; height:100%; object-fit:contain; padding:4px; }
.dc-logo-ph{ font-family:'Astrid Regular',serif; font-weight:700; font-size:22px; color:#4B1E56; }
.dc-body{ display:flex; flex-direction:column; flex:1; padding:34px 22px 22px; gap:10px; }
.dc-name{ font-size:24px; line-height:1.15; }
.dc-owner{ font-size:16px; font-weight:600; color:var(--dc-accent); }
.dc-meta{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
.dc-pill{ display:inline-block; font-size:14px; font-weight:600; color:var(--dc-accent); background:rgba(75,30,86,0.08);
  border:1px solid var(--dc-border); padding:5px 12px; border-radius:100px; }
.dc-loc{ font-size:14px; color:var(--dc-sub); font-weight:600; }
.dc-copy-label{ font-size:14px; font-weight:700; color:var(--dc-sub); margin-bottom:2px; }
.dc-copy{ font-size:16px; line-height:1.55; color:var(--dc-text); }
.dc-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-top:2px; }
.dc-tag{ font-size:14px; font-weight:500; color:var(--dc-accent); background:rgba(75,30,86,0.07); padding:5px 12px; border-radius:100px; }
.dc-action{ margin-top:auto; padding-top:10px; }
.dc-action .dc-btn{ width:100%; }
.dc-more{ text-align:center; margin-top:36px; }
.dc-empty{ text-align:center; padding:40px 16px; font-size:18px; }

/* CTA band */
.dc-cta{ background:var(--dc-grad); color:#fff; text-align:center; padding:72px 0; }
.dc-cta h2{ color:#fff; font-size:clamp(30px,4.2vw,46px); margin-bottom:12px; }
.dc-cta p{ font-size:18px; color:rgba(255,255,255,0.9); }

/* Modal */
.dc-overlay{ position:fixed; inset:0; z-index:1000; background:rgba(26,10,46,0.6); backdrop-filter:blur(4px);
  display:flex; align-items:center; justify-content:center; padding:16px; }
.dc-modal{ position:relative; width:100%; max-width:520px; max-height:92vh; overflow-y:auto; background:var(--dc-card);
  border-radius:22px; padding:34px 28px 28px; box-shadow:0 24px 64px rgba(26,10,46,0.4); color:var(--dc-text); }
.dc-modal h3{ font-size:26px; margin-bottom:6px; }
.dc-close{ position:absolute; top:14px; right:14px; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer;
  background:var(--dc-soft); color:var(--dc-title); font-size:16px; }
.dc-form{ display:flex; flex-direction:column; gap:14px; margin-top:18px; }
.dc-check{ display:flex; gap:10px; align-items:flex-start; font-size:15px; line-height:1.5; }
.dc-check input{ width:20px; height:20px; margin-top:2px; flex-shrink:0; accent-color:#4B1E56; }
.dc-check a, .dc-link{ color:var(--dc-accent); font-weight:600; }
.dc-error{ font-size:15px; font-weight:600; color:var(--dc-danger); }
.dc-hp{ position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden; }
.dc-success{ text-align:center; padding:10px 0; }
.dc-success p{ font-size:17px; line-height:1.6; }
.dc-readonly{ background:var(--dc-soft) !important; }

/* Join page */
.dc-join-head{ background:var(--dc-grad); color:#fff; text-align:center; padding:64px 0 56px; }
.dc-join-head h1{ color:#fff; font-size:clamp(34px,5vw,54px); margin-bottom:10px; }
.dc-join-head h2{ color:#D7B264; font-size:clamp(20px,2.6vw,26px); margin-bottom:16px; }
.dc-join-head p{ max-width:760px; margin:0 auto; font-size:18px; line-height:1.75; color:rgba(255,255,255,0.9); }
.dc-section{ padding:56px 0; }
.dc-section-title{ font-size:clamp(28px,3.6vw,40px); text-align:center; margin-bottom:10px; }
.dc-section-sub{ text-align:center; max-width:720px; margin:0 auto 28px; font-size:17px; line-height:1.7; }
.dc-seg{ display:flex; justify-content:center; gap:8px; margin-bottom:28px; }
.dc-seg button{ font-family:'Montserrat',sans-serif; font-size:15px; font-weight:700; padding:10px 22px; border-radius:100px;
  border:1.5px solid var(--dc-border); background:transparent; color:var(--dc-text); cursor:pointer; }
.dc-seg button[aria-pressed="true"]{ background:#4B1E56; border-color:#4B1E56; color:#fff; }
.dc-seg button:focus-visible{ outline:3px solid #D7B264; outline-offset:2px; }
.dc-plans{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:22px; }
.dc-plan{ display:flex; flex-direction:column; background:var(--dc-card); border:1.5px solid var(--dc-border); border-radius:22px; padding:28px 24px; box-shadow:var(--dc-shadow); }
.dc-plan-featured{ border-color:#D7B264; }
.dc-plan h3{ font-size:26px; margin-bottom:6px; }
.dc-price{ font-family:'Astrid Regular',serif; font-size:40px; font-weight:700; color:var(--dc-accent); line-height:1.1; }
.dc-price small{ font-family:'Montserrat',sans-serif; font-size:15px; font-weight:500; color:var(--dc-sub); }
.dc-plan ul{ list-style:none; padding:0; margin:18px 0 22px; display:flex; flex-direction:column; gap:10px; flex:1; }
.dc-plan li{ display:flex; gap:10px; font-size:16px; line-height:1.5; }
.dc-plan li::before{ content:"✓"; flex-shrink:0; width:20px; height:20px; margin-top:1px; border-radius:50%; background:#4B1E56; color:#fff;
  font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.dc-note{ max-width:860px; margin:22px auto 0; font-size:15px; line-height:1.7; text-align:center; color:var(--dc-text); }
.dc-tablewrap{ overflow-x:auto; border:1px solid var(--dc-border); border-radius:18px; background:var(--dc-card); max-width:860px; margin:0 auto; }
.dc-table{ width:100%; border-collapse:collapse; min-width:520px; }
.dc-table th, .dc-table td{ padding:14px 18px; text-align:left; font-size:16px; border-bottom:1px solid var(--dc-border); }
.dc-table thead th{ background:var(--dc-grad); color:#fff; font-weight:700; }
.dc-table tbody th{ color:var(--dc-title); font-weight:600; }
.dc-table tr:last-child th, .dc-table tr:last-child td{ border-bottom:none; }
.dc-formcard{ max-width:860px; margin:0 auto; background:var(--dc-card); border:1px solid var(--dc-border); border-radius:24px; padding:40px 36px; box-shadow:var(--dc-shadow); scroll-margin-top:calc(var(--nav-height,96px) + 12px); }
.dc-formcard h2{ font-size:clamp(28px,3.6vw,38px); margin-bottom:6px; }
.dc-fieldset{ border:none; padding:0; margin:0 0 6px; }
.dc-fieldset legend{ font-size:16px; font-weight:700; color:var(--dc-title); margin-bottom:10px; }
.dc-row{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.dc-chips{ display:flex; flex-wrap:wrap; gap:8px; }
.dc-chip{ display:inline-flex; align-items:center; gap:8px; padding:9px 14px; border-radius:100px; border:1.5px solid var(--dc-border);
  font-size:15px; cursor:pointer; background:transparent; color:var(--dc-text); }
.dc-chip input{ accent-color:#4B1E56; width:16px; height:16px; }
.dc-chip[data-on="true"]{ background:rgba(75,30,86,0.1); border-color:#4B1E56; color:var(--dc-title); font-weight:600; }
.dc-hint{ font-size:14px; color:var(--dc-sub); margin-top:4px; }
.dc-preview{ width:96px; height:96px; object-fit:cover; border-radius:14px; border:1px solid var(--dc-border); margin-top:8px; background:#fff; }
.dc-summary{ display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; align-items:center; padding:14px 18px; border-radius:16px;
  background:var(--dc-soft); border:1px solid var(--dc-border); margin:16px 0 20px; font-size:16px; }

@media (max-width:1000px){
  .dc-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
  .dc-plans{ grid-template-columns:1fr; max-width:520px; margin:0 auto; }
  .dc-filters{ grid-template-columns:1fr 1fr; }
}
@media (max-width:640px){
  .dc-wrap{ padding:0 16px; }
  .dc-grid{ grid-template-columns:1fr; }
  .dc-filters{ grid-template-columns:1fr; }
  .dc-row{ grid-template-columns:1fr; }
  .dc-formcard{ padding:28px 20px; }
  .dc-hero-actions .dc-btn, .dc-cta .dc-hero-actions .dc-btn{ width:100%; }
}

/* Category cards */
.dc-catsearch{ display:flex; gap:12px; max-width:720px; margin:0 auto; }
.dc-catsearch .dc-input{ flex:1; min-width:0; }
.dc-catcard{ display:flex; flex-direction:column; background:var(--dc-card); border:1px solid var(--dc-border); border-radius:22px; padding:28px 24px; box-shadow:var(--dc-shadow); }
.dc-caticon{ width:52px; height:52px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; color:#fff; background:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 100%); margin-bottom:16px; }
.dc-catname{ font-size:22px; line-height:1.25; margin-bottom:10px; }
.dc-catdesc{ font-size:16px; line-height:1.6; color:var(--dc-text); margin-bottom:22px; flex:1; }
.dc-catcard .dc-btn{ width:100%; }
@media (max-width:640px){ .dc-catsearch{ flex-direction:column; } }

@media (prefers-reduced-motion:reduce){ .dc-btn{ transition:none; } .dc-btn-primary:hover{ transform:none; } }
`;

/* ── Small helpers ────────────────────────────────────────────────────── */
function makeReference() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `ENQ-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function PersonPlaceholder() {
  // Neutral placeholder — never substitute the logo for a face.
  return (
    <div className="dc-portrait-ph" role="img" aria-label="Portrait coming soon">
      <svg viewBox="0 0 200 220" width="70%" aria-hidden="true">
        <circle cx="100" cy="82" r="38" fill="rgba(255,255,255,0.28)" />
        <path d="M20 220c0-48 36-78 80-78s80 30 80 78z" fill="rgba(255,255,255,0.28)" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ENQUIRY MODAL — enquiry goes to Ellevation Hub only, never to the business
   ══════════════════════════════════════════════════════════════════════════ */
function EnquiryModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false); // required, never pre-ticked
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(Date.now());

  // focus management, focus trap, Escape to close, lock body scroll, restore focus
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([tabindex="-1"]):not([readonly]), select, textarea'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) return setError("Enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Enter a valid email address, for example name@domain.com.");
    if (!message.trim()) return setError("Tell us what you’re looking for in the message box.");
    if (!consent) return setError("Tick the consent box so we can manage your enquiry.");

    // Anti-spam: honeypot filled or submitted implausibly fast → pretend success, send nothing.
    if (honeypot || Date.now() - openedAt.current < 3000) { setReference(makeReference()); return; }

    setSending(true);
    const ref = makeReference();
    try {
      // Goes to Ellevation Hub admin only. NOT emailed to the business.
      // TODO(backend): also save an enquiry record (status "New") + send visitor acknowledgement.
      await submitDirectoryForm({
        brand: "hub",
        formTitle: "Directory Enquiry",
        itemLabel: "Business",
        itemName: listing.business,
        formSource: "Ellevation Hub — Directory Enquiry",
        fields: {
          "Reference": ref,
          "Status": "New",
          "Selected Business": listing.business,
          "Owner / Representative": listing.owner,
          "Full Name": fullName,
          "Email": email,
          "Phone": phone,
          "Enquirer Organisation": org,
          "Message": message,
          "Consent": "Agreed: Ellevation Hub may use these details to manage this enquiry and share relevant information with the selected business to facilitate a connection.",
          "Received": new Date().toISOString(),
        },
      });
      setReference(ref);
    } catch (err) {
      console.error("Directory enquiry failed:", err);
      setError("Your enquiry could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="dc-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dc-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="dc-enq-title">
        <button type="button" className="dc-close" aria-label="Close enquiry form" onClick={onClose}>✕</button>

        {reference ? (
          <div className="dc-success" role="status">
            <h3 id="dc-enq-title">Enquiry received</h3>
            <p>Thank you! Your enquiry has been received. We’ll be in touch with an update.</p>
            <p className="dc-hint">Reference: {reference}</p>
            <button type="button" className="dc-btn dc-btn-primary" style={{ marginTop: 18 }} onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 id="dc-enq-title">Send an Enquiry</h3>
            <p>Tell us what you’re looking for, and we’ll help connect you.</p>

            <form className="dc-form" onSubmit={submit} noValidate>
              <div>
                <label className="dc-label" htmlFor="enq-biz">Business / Organisation</label>
                <input id="enq-biz" className="dc-input dc-readonly" value={listing.business} readOnly />
              </div>
              <div>
                <label className="dc-label" htmlFor="enq-name">Full name *</label>
                <input id="enq-name" ref={firstRef} className="dc-input" autoComplete="name" required value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div>
                <label className="dc-label" htmlFor="enq-email">Email address *</label>
                <input id="enq-email" type="email" className="dc-input" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="dc-row">
                <div>
                  <label className="dc-label" htmlFor="enq-phone">Phone number</label>
                  <input id="enq-phone" type="tel" className="dc-input" autoComplete="tel" placeholder="Optional" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="dc-label" htmlFor="enq-org">Your organisation</label>
                  <input id="enq-org" className="dc-input" autoComplete="organization" placeholder="Optional" value={org} onChange={e => setOrg(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="dc-label" htmlFor="enq-msg">Message *</label>
                <textarea id="enq-msg" rows={4} className="dc-input" required value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              {/* honeypot — hidden from people, bots fill it */}
              <div className="dc-hp" aria-hidden="true">
                <label>Leave this empty<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></label>
              </div>

              <label className="dc-check">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required />
                <span>
                  I agree that Ellevation Hub may use my details to manage this enquiry and share relevant information with the selected business to facilitate a connection.{" "}
                  <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>
                </span>
              </label>

              <div role="alert" aria-live="assertive">{error && <p className="dc-error">{error}</p>}</div>

              <button type="submit" className="dc-btn dc-btn-primary" disabled={sending}>
                {sending ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DIRECTORY CARD
   ══════════════════════════════════════════════════════════════════════════ */
function DirectoryCard({ l, onEnquire }: { l: Listing; onEnquire: (l: Listing) => void }) {
  // Show 1 availability tag (if any) + services for the remaining slots,
  // so availability is visible like in the brief's mock-up.
  const avTag = l.availability.slice(0, 1).map(a => `Available for ${a}`);
  const svcTags = l.services.slice(0, Math.max(0, MAX_VISIBLE_TAGS - avTag.length));
  const tags = [...svcTags, ...avTag];

  const location = l.locations.slice(0, 2).join(" | ");
  const initials = l.business.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();

  return (
    <article className="dc-card" aria-label={l.business}>
      <div className="dc-portrait">
        {l.portrait ? <img src={l.portrait} alt={`${l.owner}, ${l.role ? l.role + " of " : ""}${l.business}`} loading="lazy" /> : <PersonPlaceholder />}
        <div className="dc-logo">
          {l.logo ? <img src={l.logo} alt={`${l.business} logo`} loading="lazy" /> : <span className="dc-logo-ph" aria-hidden="true">{initials}</span>}
        </div>
      </div>

      <div className="dc-body">
        <h3 className="dc-name">{l.business}</h3>
        <p className="dc-owner">{l.owner}{l.role ? ` • ${l.role}` : ""}</p>
        <div className="dc-meta">
          <span className="dc-pill">{l.category}</span>
          <span className="dc-loc">{location}</span>
        </div>

        <div>
          <p className="dc-copy-label">What We Do</p>
          <p className="dc-copy">{clip(l.whatWeDo)}</p>
        </div>
        {l.contribution && (
          <div>
            <p className="dc-copy-label">How We Contribute</p>
            <p className="dc-copy">{clip(l.contribution)}</p>
          </div>
        )}

        {tags.length > 0 && (
          <ul className="dc-tags" style={{ listStyle: "none", padding: 0 }} aria-label="Services and availability">
            {tags.map(t => <li key={t} className="dc-tag">{t}</li>)}
          </ul>
        )}

        <div className="dc-action">
          <button type="button" className="dc-btn dc-btn-primary" onClick={() => onEnquire(l)} aria-label={`Send an enquiry to ${l.business}`}>
            Send an Enquiry →
          </button>
        </div>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 1 — DIRECTORY (4 sections: Hero → Search & Filters → Cards → Join CTA)
   ══════════════════════════════════════════════════════════════════════════ */
export function DirectorySection({ nav, listings = DEMO_LISTINGS }: { nav: NavFn; listings?: Listing[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [enquiring, setEnquiring] = useState<Listing | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter(l => {
      if (category && l.category !== category && !l.extraCategories?.includes(category)) return false;
      if (location && !l.locations.includes(location)) return false;
      if (availability && !l.availability.includes(availability)) return false;
      if (!q) return true;
      // business name, owner name, services, category and description
      const haystack = [l.business, l.owner, l.category, ...(l.extraCategories ?? []), ...l.services, l.whatWeDo, l.contribution ?? ""].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [listings, query, category, location, availability]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [query, category, location, availability]);

  const hasFilters = !!(query || category || location || availability);
  const clear = () => { setQuery(""); setCategory(""); setLocation(""); setAvailability(""); };

  return (
    <div className="dc">
      <style>{DC_CSS}</style>

      {/* 1 ── HERO (compact) */}
      <section className="dc-hero" aria-labelledby="dc-hero-title">
        <div className="dc-wrap">
          <p className="dc-eyebrow">THE ELLEVATION COLLECTIVE</p>
          <h1 id="dc-hero-title">Discover the People Behind the Impact</h1>
          <p>Discover businesses, professionals, services and community organisations making a difference.</p>
          <p>Find the people, expertise and opportunities you’re looking for, all in one connected community.</p>
          <div className="dc-hero-actions">
            <button type="button" className="dc-btn dc-btn-gold" onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              Explore the Directory
            </button>
            <button type="button" className="dc-btn dc-btn-onDark" onClick={() => nav("join-directory")}>Join the Directory</button>
          </div>
        </div>
      </section>

      {/* 2 ── SEARCH & FILTERS */}
      <section className="dc-search" aria-labelledby="dc-search-title">
        <div className="dc-wrap">
          <h2 id="dc-search-title">Find What You’re Looking For</h2>
          <div className="dc-search-bar">
            <label className="dc-label" htmlFor="dc-q">Search the directory</label>
            <input id="dc-q" type="search" className="dc-input" placeholder="Search businesses, services or people..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="dc-filters">
            <div>
              <label className="dc-label" htmlFor="dc-cat">Category</label>
              <select id="dc-cat" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="dc-label" htmlFor="dc-loc">Location</label>
              <select id="dc-loc" value={location} onChange={e => setLocation(e.target.value)}>
                <option value="">All locations</option>
                {LOCATIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="dc-label" htmlFor="dc-av">Availability</label>
              <select id="dc-av" value={availability} onChange={e => setAvailability(e.target.value)}>
                <option value="">Any availability</option>
                {AVAILABILITY.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="button" className="dc-btn dc-btn-ghost" onClick={clear} disabled={!hasFilters}>Clear Filters</button>
          </div>
        </div>
      </section>

      {/* 3 ── DIRECTORY CARDS */}
      <section className="dc-results" ref={resultsRef} aria-label="Directory results">
        <div className="dc-wrap">
          <p className="dc-count" role="status" aria-live="polite">
            {filtered.length === 0 ? "No matches" : `Showing ${Math.min(visible, filtered.length)} of ${filtered.length} listings`}
          </p>

          {filtered.length === 0 ? (
            <div className="dc-empty">
              <p>Nothing matches those filters. Try a different search, or clear the filters.</p>
              <button type="button" className="dc-btn dc-btn-primary" style={{ marginTop: 16 }} onClick={clear}>Clear Filters</button>
            </div>
          ) : (
            <div className="dc-grid">
              {filtered.slice(0, visible).map(l => <DirectoryCard key={l.id} l={l} onEnquire={setEnquiring} />)}
            </div>
          )}

          {visible < filtered.length && (
            <div className="dc-more">
              <button type="button" className="dc-btn dc-btn-ghost" onClick={() => setVisible(v => v + PAGE_SIZE)}>Load More</button>
            </div>
          )}
        </div>
      </section>

      {/* 4 ── JOIN CTA (no pricing on this page) */}
      <section className="dc-cta" aria-labelledby="dc-cta-title">
        <div className="dc-wrap">
          <h2 id="dc-cta-title">Showcase What You Do</h2>
          <p>Be discovered. Build connections. Create opportunities.</p>
          <div className="dc-hero-actions">
            <button type="button" className="dc-btn dc-btn-gold" onClick={() => nav("join-directory")}>Join the Directory</button>
            <button type="button" className="dc-btn dc-btn-onDark" onClick={() => nav("membership")}>Become a Member</button>
          </div>
        </div>
      </section>

      {enquiring && <EnquiryModal listing={enquiring} onClose={() => setEnquiring(null)} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 2 — JOIN THE DIRECTORY (package comparison + application + membership)
   ══════════════════════════════════════════════════════════════════════════ */
type PackageId = "starter" | "plus" | "connect";
const PACKAGES: { id: PackageId; name: string; annual: number; monthly: number; maxCategories: number; tagsAllowed: boolean; cta: string; features: string[] }[] = [
  { id: "starter", name: "Village Starter", annual: 0, monthly: 0, maxCategories: 1, tagsAllowed: false, cta: "Join Free",
    features: ["Basic card", "Portrait and logo", "Business name, category, short description, location", "Send an Enquiry button", "Inclusion in search"] },
  { id: "plus", name: "Village Plus", annual: 120, monthly: 12, maxCategories: 3, tagsAllowed: true, cta: "Choose Village Plus",
    features: ["Everything in Village Starter", "Up to 3 categories", "Availability tags", "Eligible for rotating featured placement", "Up to 2 opportunity submissions per year"] },
  { id: "connect", name: "Village Connect", annual: 240, monthly: 24, maxCategories: 3, tagsAllowed: true, cta: "Choose Village Connect",
    features: ["Everything in Village Plus", "Up to 6 opportunity submissions per year", "Up to 4 promotional submissions per year", "Priority consideration for rotating features", "Selected Village networking invitations"] },
];

// Directory entitlement per Hub membership — confirm mapping with Ellevation before launch.
// Grow = "Standard" to match the Membership page comparison table.
const HUB_ENTITLEMENTS = [
  { tier: "Belong", price: "$250", entitlement: "No paid listing included; free Starter available" },
  { tier: "Grow", price: "$550", entitlement: "Standard listing included" },
  { tier: "Influence", price: "$990", entitlement: "Featured listing included" },
  { tier: "Partner", price: "$1,500", entitlement: "Priority listing included" },
  { tier: "Legacy Partner", price: "$2,500", entitlement: "Premium priority listing included" },
];

const MAX_IMG_BYTES = 5 * 1024 * 1024;
const IMG_TYPES = ["image/jpeg", "image/png", "image/webp"];

function useImagePick() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  const pick = (f: File | null | undefined) => {
    setErr("");
    if (!f) { setFile(null); setPreview(""); return; }
    if (!IMG_TYPES.includes(f.type)) { setErr("Use a JPG, PNG or WebP image."); return; }
    if (f.size > MAX_IMG_BYTES) { setErr("Image must be 5 MB or smaller."); return; }
    setFile(f); setPreview(URL.createObjectURL(f));
  };
  return { file, preview, err, pick };
}

const scrollToForm = () =>
  setTimeout(() => document.getElementById("directory-join-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);

export function JoinDirectorySection({ nav }: { nav: NavFn }) {
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");
  const [pkgId, setPkgId] = useState<PackageId>("starter");
  const pkg = PACKAGES.find(p => p.id === pkgId)!;

  const [contact, setContact] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const validCategory = CATEGORIES.includes(categoryParam) ? categoryParam : "";
  const [category, setCategory] = useState(validCategory);

  // Category card se aaye to category set karo aur form tak scroll karo
  useEffect(() => {
    if (!validCategory) return;
    setCategory(validCategory);
    const t = setTimeout(
      () => document.getElementById("directory-join-form")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      400
    );
    return () => clearTimeout(t);
  }, [validCategory]);
    const [extraCats, setExtraCats] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState("");
  const [website, setWebsite] = useState("");
  const [social, setSocial] = useState("");
  const [services, setServices] = useState("");
  const [avail, setAvail] = useState<string[]>([]);
  const [noPortrait, setNoPortrait] = useState(false);
  const [agreed, setAgreed] = useState(false); // required, never pre-ticked
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const openedAt = useRef(Date.now());

  const portrait = useImagePick();
  const logo = useImagePick();

  const money = (n: number) => (n === 0 ? "Free" : `$${n}`);
  const priceText = pkg.annual === 0 ? "Free" : billing === "annual" ? `$${pkg.annual} per year` : `$${pkg.monthly} per month`;

  // Changing the package from the dropdown only updates state (no scroll).
  const selectPackage = (id: PackageId) => {
    setPkgId(id);
    const next = PACKAGES.find(p => p.id === id)!;
    setExtraCats(c => c.slice(0, next.maxCategories - 1));
    if (!next.tagsAllowed) setAvail([]);
  };
  // Clicking a pricing-card button selects AND scrolls to the form.
  const choose = (id: PackageId) => {
    selectPackage(id);
    scrollToForm();
  };

  const toggle = (list: string[], set: (v: string[]) => void, v: string, max = Infinity) =>
    set(list.includes(v) ? list.filter(x => x !== v) : list.length < max ? [...list, v] : list);

  const finish = () => {
    setDone(true);
    scrollToForm(); // bring the success message into view
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const req: [string, string][] = [
      [contact, "contact person name"], [business, "business or organisation name"], [email, "business email"],
      [phone, "phone number"], [category, "primary category"], [description, "short description"],
    ];
    for (const [v, label] of req) if (!v.trim()) return setError(`Enter your ${label}.`);
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Enter a valid business email, for example name@business.com.");
    if (locations.length === 0) return setError("Select at least one location or service area.");
    if (description.length > MAX_DESC) return setError(`Shorten your description to ${MAX_DESC} characters or fewer.`);
    if (!portrait.file && !noPortrait) return setError("Upload a professional portrait, or tick the box to use a placeholder until you have one.");
    if (!logo.file) return setError("Upload your business logo.");
    if (portrait.err || logo.err) return setError("Fix the image problem shown above before submitting.");
    if (!agreed) return setError("Accept the Terms and Privacy Policy to continue.");

    if (honeypot || Date.now() - openedAt.current < 3000) { finish(); return; }

    setSending(true);
    try {
      // TODO(backend): upload portrait/logo to storage, create the listing as "Pending review",
      // and take payment for paid packages (Stripe etc.) BEFORE submitting for review.
      // EmailJS cannot carry the image files, so only file names are sent for now.
         await submitDirectoryForm({
        brand: "hub",
        formTitle: "Directory Listing Application",
        itemLabel: "Package",
        itemName: pkg.name,
        formSource: "Ellevation Hub — Directory Listing Application",
        fields: {
          "Package": pkg.name,
          "Billing": pkg.annual === 0 ? "Free" : billing === "annual" ? "Annual" : "Monthly",
          "Price (AUD)": priceText,
          "Payment status": pkg.annual === 0 ? "Not required" : "Pending — arrange payment before approval",
          "Contact person": contact,
          "Business / Organisation": business,
          "Business email (private)": email,
          "Phone (private)": phone,
          "Primary category": category,
          "Additional categories": extraCats.join(", "),
          "Location / service area": locations.join(", "),
          "Description": description,
          "Community contribution": contribution,
          "Website (private)": website,
          "Social media (private)": social,
          "Services": services,
          "Availability tags": avail.join(", "),
          "Portrait file": noPortrait && !portrait.file ? "None — use placeholder until approved" : portrait.file?.name ?? "",
          "Logo file": logo.file?.name ?? "",
          "Terms/Privacy accepted": "Yes",
        },
      });
      finish();
    } catch (err) {
      console.error("Directory application failed:", err);
      setError("Your application could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="dc">
      <style>{DC_CSS}</style>

      <section className="dc-join-head" aria-labelledby="dc-join-title">
        <div className="dc-wrap">
          <h1 id="dc-join-title">Join the Ellevation Collective</h1>
          <h2>Showcase What You Do. Connect With Your Community.</h2>
          <p>
            Whether you’re an emerging entrepreneur, established business, independent professional or community organisation,
            the Ellevation Collective gives you a place to be discovered. Choose the listing option that suits your needs.
            Ellevation Hub coordinates enquiries and introductions, helping create meaningful connections.
          </p>
        </div>
      </section>

      {/* Package comparison */}
      <section className="dc-section" aria-labelledby="dc-pkg-title">
        <div className="dc-wrap">
          <h2 className="dc-section-title" id="dc-pkg-title">Choose Your Listing</h2>
          <div className="dc-seg" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={billing === "annual"} onClick={() => setBilling("annual")}>Annual</button>
            <button type="button" aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")}>Monthly</button>
          </div>

          <div className="dc-plans">
            {PACKAGES.map(p => (
              <div key={p.id} className={`dc-plan${p.id === "plus" ? " dc-plan-featured" : ""}`}>
                <h3>{p.name}</h3>
                <p className="dc-price">
                  {p.annual === 0 ? "Free" : billing === "annual" ? money(p.annual) : money(p.monthly)}
                  {p.annual > 0 && <small> / {billing === "annual" ? "year" : "month"}</small>}
                </p>
                <ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul>
                <button type="button" className={`dc-btn ${p.id === "starter" ? "dc-btn-ghost" : "dc-btn-primary"}`} onClick={() => choose(p.id)}>{p.cta}</button>
              </div>
            ))}
          </div>

          <p className="dc-note">
            Paid packages provide visibility and participation benefits, not guaranteed enquiries, introductions, bookings or sales.
            All listings and promotional submissions are subject to review. Annual and monthly prices are separate billing choices;
            monthly prices total more over 12 months. Prices are in AUD.
            {/* TODO(client): confirm GST-inclusive/exclusive display and subscription terms before publishing. */}
          </p>
        </div>
      </section>

      {/* Hub membership integration */}
      <section className="dc-section" style={{ background: "var(--dc-soft)" }} aria-labelledby="dc-hub-title">
        <div className="dc-wrap">
          <h2 className="dc-section-title" id="dc-hub-title">Already an Ellevation Hub member?</h2>
          <p className="dc-section-sub">
            Eligible membership packages include directory benefits. You do not need to purchase a separate listing for equivalent included features.
          </p>
          <div className="dc-tablewrap" role="region" aria-label="Hub membership directory entitlements" tabIndex={0}>
            <table className="dc-table">
              <thead><tr><th scope="col">Hub membership</th><th scope="col">Annual price</th><th scope="col">Directory entitlement</th></tr></thead>
              <tbody>
                {HUB_ENTITLEMENTS.map(r => (
                  <tr key={r.tier}><th scope="row">{r.tier}</th><td>{r.price}</td><td>{r.entitlement}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dc-hero-actions">
            <button type="button" className="dc-btn dc-btn-primary" onClick={() => nav("membership")}>Explore Hub Membership</button>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="dc-section" aria-labelledby="dc-form-title">
        <div className="dc-wrap">
          <div id="directory-join-form" className="dc-formcard">
            <h2 id="dc-form-title">Create Your Directory Listing</h2>

            {done ? (
              <div className="dc-success" role="status">
                <p style={{ fontSize: 20, fontWeight: 600, color: "var(--dc-title)" }}>
                  Thank you for joining the Ellevation Collective. Your listing has been submitted for review. We’ll notify you once it has been approved.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="dc-summary">
                  <span><strong>{pkg.name}</strong> · {priceText}</span>
                  <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15 }}>
                    Package
                    <select value={pkgId} onChange={e => selectPackage(e.target.value as PackageId)} style={{ width: "auto" }} aria-label="Selected package">
                      {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </label>
                </div>
                {pkg.annual > 0 && (
                  <p className="dc-hint" style={{ marginBottom: 16 }}>
                    Ellevation Hub will arrange secure payment before your listing is approved.
                  </p>
                )}

                <div className="dc-form">
                  <div className="dc-row">
                    <div><label className="dc-label" htmlFor="j-contact">Contact person name *</label>
                      <input id="j-contact" className="dc-input" autoComplete="name" value={contact} onChange={e => setContact(e.target.value)} required /></div>
                    <div><label className="dc-label" htmlFor="j-biz">Business / organisation name *</label>
                      <input id="j-biz" className="dc-input" autoComplete="organization" value={business} onChange={e => setBusiness(e.target.value)} required /></div>
                  </div>
                  <div className="dc-row">
                    <div><label className="dc-label" htmlFor="j-email">Business email *</label>
                      <input id="j-email" type="email" className="dc-input" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
                      <p className="dc-hint">Private. Never shown publicly.</p></div>
                    <div><label className="dc-label" htmlFor="j-phone">Phone *</label>
                      <input id="j-phone" type="tel" className="dc-input" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                      <p className="dc-hint">Private. Never shown publicly.</p></div>
                  </div>

                  <div>
                    <label className="dc-label" htmlFor="j-cat">Primary category *</label>
                    <select id="j-cat" value={category} onChange={e => { setCategory(e.target.value); setExtraCats(c => c.filter(x => x !== e.target.value)); }} required>
                      <option value="">Select a category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <fieldset className="dc-fieldset">
                    <legend>Location / service area * (up to {MAX_LOCATIONS})</legend>
                    <div className="dc-chips">
                      {LOCATIONS.map(c => (
                        <label key={c} className="dc-chip" data-on={locations.includes(c)}>
                          <input type="checkbox" checked={locations.includes(c)}
                            onChange={() => toggle(locations, setLocations, c, MAX_LOCATIONS)} />{c}
                        </label>
                      ))}
                    </div>
                    <p className="dc-hint">The first two selected are shown on your card; all are used for search.</p>
                  </fieldset>

                  <div>
                    <label className="dc-label" htmlFor="j-desc">Description * <span className="dc-hint">({description.length}/{MAX_DESC})</span></label>
                    <textarea id="j-desc" rows={3} maxLength={MAX_DESC} className="dc-input" value={description} onChange={e => setDescription(e.target.value)} required
                      aria-describedby="j-desc-h" />
                    <p id="j-desc-h" className="dc-hint">One sentence about what you do, shown on your card.</p>
                  </div>
                  <div>
                    <label className="dc-label" htmlFor="j-contrib">How you contribute to the community (optional)</label>
                    <textarea id="j-contrib" rows={2} maxLength={MAX_DESC} className="dc-input" value={contribution} onChange={e => setContribution(e.target.value)} />
                    <p className="dc-hint">If left blank, this line is simply left off your card.</p>
                  </div>

                  {pkg.maxCategories > 1 && (
                    <fieldset className="dc-fieldset">
                      <legend>Additional categories (up to {pkg.maxCategories - 1}) — used for search only</legend>
                      <div className="dc-chips">
                        {CATEGORIES.filter(c => c !== category).map(c => (
                          <label key={c} className="dc-chip" data-on={extraCats.includes(c)}>
                            <input type="checkbox" checked={extraCats.includes(c)} onChange={() => toggle(extraCats, setExtraCats, c, pkg.maxCategories - 1)} />{c}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {pkg.tagsAllowed && (
                    <fieldset className="dc-fieldset">
                      <legend>Availability tags (optional)</legend>
                      <div className="dc-chips">
                        {AVAILABILITY.map(a => (
                          <label key={a} className="dc-chip" data-on={avail.includes(a)}>
                            <input type="checkbox" checked={avail.includes(a)} onChange={() => toggle(avail, setAvail, a)} />{a}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  <div className="dc-row">
                    <div><label className="dc-label" htmlFor="j-web">Website (optional)</label>
                      <input id="j-web" type="url" className="dc-input" placeholder="https://" value={website} onChange={e => setWebsite(e.target.value)} />
                      <p className="dc-hint">Private admin field.</p></div>
                    <div><label className="dc-label" htmlFor="j-soc">Social media (optional)</label>
                      <input id="j-soc" className="dc-input" value={social} onChange={e => setSocial(e.target.value)} />
                      <p className="dc-hint">Private admin field.</p></div>
                  </div>
                  <div><label className="dc-label" htmlFor="j-svc">Services (optional)</label>
                    <input id="j-svc" className="dc-input" placeholder="e.g. Brand Strategy, Creative Services" value={services} onChange={e => setServices(e.target.value)} /></div>

                  <div className="dc-row">
                    <div>
                      <label className="dc-label" htmlFor="j-portrait">Professional portrait *</label>
                      <input id="j-portrait" type="file" accept={IMG_TYPES.join(",")} className="dc-input" onChange={e => portrait.pick(e.target.files?.[0])} aria-describedby="j-portrait-h" />
                      <p id="j-portrait-h" className="dc-hint">JPG, PNG or WebP, up to 5 MB. Shown as the main image on your card.</p>
                      {portrait.err && <p className="dc-error" role="alert">{portrait.err}</p>}
                      {portrait.preview && <img className="dc-preview" src={portrait.preview} alt="Portrait preview" />}
                      <label className="dc-check" style={{ marginTop: 10 }}>
                        <input type="checkbox" checked={noPortrait} onChange={e => setNoPortrait(e.target.checked)} />
                        <span>I don’t have a portrait yet. Use a neutral placeholder until one is approved.</span>
                      </label>
                    </div>
                    <div>
                      <label className="dc-label" htmlFor="j-logo">Business logo *</label>
                      <input id="j-logo" type="file" accept={IMG_TYPES.join(",")} className="dc-input" onChange={e => logo.pick(e.target.files?.[0])} aria-describedby="j-logo-h" />
                      <p id="j-logo-h" className="dc-hint">JPG, PNG or WebP, up to 5 MB. Shown separately from your portrait.</p>
                      {logo.err && <p className="dc-error" role="alert">{logo.err}</p>}
                      {logo.preview && <img className="dc-preview" src={logo.preview} alt="Logo preview" style={{ objectFit: "contain" }} />}
                    </div>
                  </div>

                  <div className="dc-hp" aria-hidden="true">
                    <label>Leave this empty<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></label>
                  </div>

                  <label className="dc-check">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
                    <span>
                      I accept the <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a> and{" "}
                      <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>. I understand all listings are reviewed before publishing.
                    </span>
                  </label>

                  <div role="alert" aria-live="assertive">{error && <p className="dc-error">{error}</p>}</div>

                  <button type="submit" className="dc-btn dc-btn-primary" disabled={sending}>
                    {sending ? "Submitting…" : pkg.annual === 0 ? "Submit for Review" : "Submit for Review & Payment"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   PAGE 1 (category version) — Hero → Search → Category cards → Join CTA
   Har card ke niche "Join this category" button → Join form (category preselected)
   ══════════════════════════════════════════════════════════════════════════ */
export function DirectoryCategoriesSection({ nav }: { nav: NavFn }) {
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(c =>
      c.toLowerCase().includes(q) || (CATEGORY_INFO[c]?.desc ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="dc">
      <style>{DC_CSS}</style>

      {/* 1 ── HERO */}
      <section className="dc-hero" aria-labelledby="dc-hero-title">
        <div className="dc-wrap">
          <p className="dc-eyebrow">THE ELLEVATION COLLECTIVE</p>
          <h1 id="dc-hero-title">Discover the People Behind the Impact</h1>
          <p>Discover businesses, professionals, services and community organisations making a difference.</p>
          <p>Find the people, expertise and opportunities you’re looking for, all in one connected community.</p>
          <div className="dc-hero-actions">
            <button type="button" className="dc-btn dc-btn-gold" onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              Explore the Directory
            </button>
            <button type="button" className="dc-btn dc-btn-onDark" onClick={() => nav("join-directory")}>Join the Directory</button>
          </div>
        </div>
      </section>

      {/* 2 ── SEARCH */}
      <section className="dc-search" aria-labelledby="dc-search-title">
        <div className="dc-wrap">
          <h2 id="dc-search-title">Find What You’re Looking For</h2>
          <div className="dc-catsearch">
            <input
              type="search"
              className="dc-input"
              placeholder="Search categories or services..."
              aria-label="Search directory categories"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button type="button" className="dc-btn dc-btn-ghost" onClick={() => setQuery("")} disabled={!query}>Clear</button>
          </div>
        </div>
      </section>

      {/* 3 ── CATEGORY CARDS */}
      <section className="dc-results" ref={resultsRef} aria-label="Directory categories">
        <div className="dc-wrap">
          {filtered.length === 0 ? (
            <div className="dc-empty">
              <p>No categories match your search. Try a different word or clear the search.</p>
            </div>
          ) : (
            <div className="dc-grid">
              {filtered.map(c => (
                <article key={c} className="dc-catcard">
                  <div className="dc-caticon" aria-hidden="true">{CATEGORY_INFO[c]?.icon ?? "◈"}</div>
                  <h3 className="dc-catname">{c}</h3>
                  <p className="dc-catdesc">{CATEGORY_INFO[c]?.desc}</p>
                  <button type="button" className="dc-btn dc-btn-primary" onClick={() => nav("join-directory", c)}>
                    Join this category →
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4 ── JOIN CTA */}
      <section className="dc-cta" aria-labelledby="dc-cta-title">
        <div className="dc-wrap">
          <h2 id="dc-cta-title">Showcase What You Do</h2>
          <p>Be discovered. Build connections. Create opportunities.</p>
          <div className="dc-hero-actions">
            <button type="button" className="dc-btn dc-btn-gold" onClick={() => nav("join-directory")}>Join the Directory</button>
            <button type="button" className="dc-btn dc-btn-onDark" onClick={() => nav("membership")}>Become a Member</button>
          </div>
        </div>
      </section>
    </div>
  );
}