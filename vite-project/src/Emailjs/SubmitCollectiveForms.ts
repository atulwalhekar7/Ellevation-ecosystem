import emailjs from "@emailjs/browser";

/* ------------------------------------------------------------------ */
/* EmailJS helper for the Directory forms (enquiry + join) and the     */
/* Feedback & Complaint form. Separate from submitRegistration.ts so   */
/* these forms can have their own template.                            */
/* ------------------------------------------------------------------ */

const SERVICE_ID = "service_ncrzorh";
const PUBLIC_KEY = "RtPgLiN1d2G9V2EYH";

// Feedback/Complaint wala template. Directory forms bhi isi se jayenge.
const TEMPLATE_ID = "template_vg99w8j";

// Inbox jahan Directory + Feedback emails aane chahiye.
// IMPORTANT: apna asli email daalo (pehle yahan placeholder tha).
const TO_EMAIL = "email@gmail.com";
const LOGO_URL =
  "https://ellvation-ecosystem.web.app/assets/Ellevation-darkmode-logo.png";

export type CollectiveSection = {
  title: string;
  keys: string[]; // must match the keys used in `fields` exactly
};

export type CollectivePayload = {
  brand?: "hub" | "ellevation" | "ms";
  formTitle: string;
  itemLabel: string;
  itemName: string;
  formSource: string;
  fields: Record<string, string | undefined>;
  sections?: CollectiveSection[];
};

const BRAND_NAMES = {
  hub: "Ellevation Hub",
  ellevation: "Ellevation",
  ms: "Ms Ellevation",
} as const;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const hasValue = (v: string | undefined): v is string =>
  v !== undefined && String(v).trim() !== "";

// ISO timestamps -> readable Perth time
const formatValue = (label: string, value: string): string => {
  if (/timestamp|submitted at|received/i.test(label) && !Number.isNaN(Date.parse(value))) {
    return (
      new Date(value).toLocaleString("en-AU", {
        timeZone: "Australia/Perth",
        dateStyle: "medium",
        timeStyle: "short",
      }) + " (AWST)"
    );
  }
  return value;
};

const rowHtml = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 12px;border-bottom:1px solid #ede7f5;width:35%;color:#8a5a97;font-weight:600;vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:10px 12px;border-bottom:1px solid #ede7f5;white-space:pre-wrap;">
      ${escapeHtml(formatValue(label, value))}
    </td>
  </tr>`;

const sectionHeaderHtml = (title: string) => `
  <tr>
    <td colspan="2" style="padding:18px 12px 8px;color:#4B1E56;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;border-bottom:2px solid #D7B264;">
      ${escapeHtml(title)}
    </td>
  </tr>`;

function buildDetailsHtml(
  fields: Record<string, string | undefined>,
  sections?: CollectiveSection[]
): string {
  if (!sections || sections.length === 0) {
    return Object.entries(fields)
      .filter(([, v]) => hasValue(v))
      .map(([label, v]) => rowHtml(label, String(v)))
      .join("");
  }

  const used = new Set<string>();
  let html = "";

  for (const s of sections) {
    const rows = s.keys
      .filter((k) => hasValue(fields[k]))
      .map((k) => {
        used.add(k);
        return rowHtml(k, String(fields[k]));
      })
      .join("");
    if (rows) html += sectionHeaderHtml(s.title) + rows;
  }

  // Anything not listed in a section still shows up (nothing gets lost)
  const rest = Object.entries(fields)
    .filter(([k, v]) => !used.has(k) && hasValue(v))
    .map(([k, v]) => rowHtml(k, String(v)))
    .join("");
  if (rest) html += sectionHeaderHtml("Other details") + rest;

  return html;
}

async function sendCollectiveEmail(p: CollectivePayload) {
  const brand = p.brand ?? "hub";

  const name =
    p.fields["Full Name"] ??
    p.fields["Contact person"] ??
    p.fields["First Name"] ??
    "";

  const email =
    p.fields["Email"] ??
    p.fields["Business email (private)"] ??
    p.fields["Email Address"] ??
    "";

  const templateParams = {
    brand_name: BRAND_NAMES[brand],
    logo_url: LOGO_URL,
    form_title: p.formTitle,
    item_label: p.itemLabel,
    item_name: p.itemName,
    form_source: p.formSource,
    name,
    email,
    // Feedback template ke purane variables (agar template mein use ho rahe hon)
    to_email: TO_EMAIL,
    reply_to: email,
    phone: p.fields["Phone"] ?? p.fields["Phone (private)"] ?? "",
    organisation:
      p.fields["Organisation"] ??
      p.fields["Enquirer Organisation"] ??
      p.fields["Business / Organisation"] ??
      "",
    feedback_type: p.fields["Type"] ?? p.formTitle,
    related_to: p.fields["Related To"] ?? p.itemName,
    contact_method: p.fields["Preferred Contact"] ?? "",
    details: p.fields["Details"] ?? p.fields["Message"] ?? "",
    outcome: p.fields["Desired Outcome"] ?? "",
    summary_html: "",
    // Purane feedback code ki tarah table ke andar wrap, taaki template mein kuch badalna na pade
    details_html: `<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${buildDetailsHtml(
      p.fields,
      p.sections
    )}</table>`,
  };

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
    console.log("EmailJS (collective) success:", result.status, result.text);
    return result;
  } catch (error: unknown) {
    console.error("EmailJS (collective) error:", error);
    const err = error as { status?: number; text?: string };
    if (err?.status === 412) {
      throw new Error(
        "EmailJS error 412: reconnect your Gmail service in EmailJS (Email Services)."
      );
    }
    if (err?.status === 400) {
      throw new Error(
        `EmailJS error 400: ${err.text || "check that the service ID, template ID and public key belong to the same account."}`
      );
    }
    throw error;
  }
}

/* ── Exports: one per form ─────────────────────────────────────────── */

/** Directory: "Send an Enquiry" modal + "Create Your Directory Listing" form */
export const submitDirectoryForm = (p: CollectivePayload) =>
  sendCollectiveEmail({ ...p, brand: p.brand ?? "hub" });

/** Feedback & Complaint form */
export const submitFeedbackForm = (p: CollectivePayload) =>
  sendCollectiveEmail({ ...p, brand: p.brand ?? "ellevation" });