import emailjs from "@emailjs/browser";

/* ── Config ───────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID = "service_ux9vfej";
const EMAILJS_PUBLIC_KEY = "Pu2wZN2ERnHjdboLI";
const EMAILJS_TEMPLATE_5 = "template_xxxxx"; // replace once Template 5 exists

/* ── Helpers ──────────────────────────────────────────────────────────────── */

// `details` is rendered with {{{details}}} (raw HTML), so user text must be escaped.
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildDetails = (rows: [string, string][]) =>
  rows
    .map(
      ([label, value]) =>
        `<b>${escapeHtml(label)}:</b> ${escapeHtml(value.trim() || "Not provided").replace(/\n/g, "<br>")}`
    )
    .join("<br><br>");

const submittedAt = () =>
  new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

const yesNo = (b: boolean) => (b ? "Yes" : "No");
const orNotProvided = (s: string) => s.trim() || "Not provided";

/* ── Shared sender (Template 5) ───────────────────────────────────────────── */
type Template5Params = {
  form_name: string;
  page_name: string;
  full_name: string;
  user_email: string;
  phone_number: string;
  organisation_or_industry: string;
  enquiry_type: string;
  details: string;
  agreed: boolean;
};

async function sendTemplate5(p: Template5Params) {
  const templateParams = {
    // common variables
    form_name: p.form_name,
    site_name: "Ellevation Hub",
    page_name: p.page_name,
    submitted_at: submittedAt(),
    from_name: p.full_name,

    // Template 5 variables
    full_name: p.full_name,
    user_email: p.user_email,
    phone_number: p.phone_number,
    organisation_or_industry: p.organisation_or_industry,
    enquiry_type: p.enquiry_type,
    details: p.details,
    privacy_agreed: yesNo(p.agreed),
    terms_agreed: yesNo(p.agreed),
  };

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_5, templateParams, {
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

/* ── Membership form ──────────────────────────────────────────────────────── */
export type MembershipSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industry: string;
  notes: string;
  expressionOfInterest: string; // e.g. "Membership Application"
  packageName: string;          // e.g. "Grow - Growth Member"
  billingLabel: string;         // "Annual" | "Monthly"
  price: string;                // e.g. "$550"
  agreed: boolean;
};

export function submitMembership(d: MembershipSubmission) {
  return sendTemplate5({
    form_name: "Membership Form",
    page_name: "Membership Page",
    full_name: `${d.firstName.trim()} ${d.lastName.trim()}`,
    user_email: d.email.trim(),
    phone_number: orNotProvided(d.phone),
    organisation_or_industry: orNotProvided(d.industry),
    enquiry_type: d.expressionOfInterest,
    details: buildDetails([
      ["Membership Package", d.packageName],
      ["Billing Option", `${d.billingLabel} (${d.price})`],
      ["Industry", d.industry],
      ["Message", d.notes],
    ]),
    agreed: d.agreed,
  });
}

/* ── Connect form ─────────────────────────────────────────────────────────── */
export type ConnectSubmission = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  enquiryStream: string; // "General Enquiry" | "Partnership Engagement" | "Community Connection"
  message: string;
  agreed: boolean;
};

export function submitConnect(d: ConnectSubmission) {
  return sendTemplate5({
    form_name: "Connect Form",
    page_name: "Connect Page",
    full_name: d.fullName.trim(),
    user_email: d.email.trim(),
    phone_number: orNotProvided(d.phone),
    organisation_or_industry: orNotProvided(d.organisation),
    enquiry_type: d.enquiryStream,
    details: buildDetails([["How can we support you today", d.message]]),
    agreed: d.agreed,
  });
}