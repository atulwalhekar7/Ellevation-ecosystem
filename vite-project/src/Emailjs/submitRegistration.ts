import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ncrzorh";
const TEMPLATE_ID = "template_bm8m9l6";
const PUBLIC_KEY = "RtPgLiN1d2G9V2EYH";

const LOGOS = {
  ms: "https://ellvation-ecosystem.web.app/assets/ms-ellevation-darkmode-logo-DqRDfzgt.png",
  hub: "https://ellvation-ecosystem.web.app/assets/Ellevation-darkmode-logo.png",
  ellevation:
    "https://ellvation-ecosystem.web.app/assets/Ellevation-darkmode-logo.png",
};

export type RegisterSection = {
  title: string;
  keys: string[]; // must match the keys used in `fields` exactly
};

export type RegisterPayload = {
  brand: "ms" | "hub" | "ellevation";
  formTitle: string;
  itemLabel: string;
  itemName: string;
  formSource: string;
  fields: Record<string, string | undefined>;
  sections?: RegisterSection[]; // optional: group the email table
};

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
  if (/timestamp|submitted at/i.test(label) && !Number.isNaN(Date.parse(value))) {
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
    <td style="padding:10px 12px;border-bottom:1px solid #ede7f5;">
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
  sections?: RegisterSection[]
): string {
  // No sections -> flat table (old behaviour, Hub/Ms forms unchanged)
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

// Highlighted box at the top of the email (only for event interest forms)
function buildSummaryHtml(fields: Record<string, string | undefined>): string {
  if (!hasValue(fields["Proposed Date"])) return "";

  const chip = (label: string, yes: boolean) =>
    `<span style="display:inline-block;margin:4px 6px 0 0;padding:5px 12px;border-radius:100px;font-size:12px;font-weight:700;background:${
      yes ? "#e6f4ea" : "#f1ecf7"
    };color:${yes ? "#1e7a3c" : "#8a5a97"};">${escapeHtml(label)}: ${
      yes ? "YES" : "NO"
    }</span>`;

  const eventOptIn = fields["Notify Me About This Event"] === "Yes";
  const generalOptIn = fields["Notify Me About Other Ellevation Events"] === "Yes";
  const attendees = hasValue(fields["Attendees"])
    ? ` &nbsp;·&nbsp; <strong>Attendees:</strong> ${escapeHtml(String(fields["Attendees"]))}`
    : "";

  return `
    <div style="margin:0 0 24px;padding:16px 18px;background:#faf6ea;border-left:4px solid #D7B264;border-radius:10px;">
      <p style="margin:0 0 4px;font-size:14px;color:#1a0a2e;">
        <strong>Proposed date:</strong> ${escapeHtml(String(fields["Proposed Date"]))}${attendees}
      </p>
      <div>
        ${chip("Event updates", eventOptIn)}
        ${chip("General updates", generalOptIn)}
      </div>
    </div>`;
}

export async function submitRegistration(p: RegisterPayload) {
  const detailsHtml = buildDetailsHtml(p.fields, p.sections);
  const summaryHtml = buildSummaryHtml(p.fields);

  const brandName =
    p.brand === "ms"
      ? "Ms Ellevation"
      : p.brand === "hub"
        ? "Ellevation Hub"
        : "Ellevation";

  const logoUrl = LOGOS[p.brand];

  const name =
    p.fields["Full Name"] ?? p.fields["First Name"] ?? p.fields["name"] ?? "";

  const email =
    p.fields["Email"] ?? p.fields["Email Address"] ?? p.fields["email"] ?? "";

  const templateParams = {
    brand_name: brandName,
    logo_url: logoUrl,
    form_title: p.formTitle,
    item_label: p.itemLabel,
    item_name: p.itemName,
    form_source: p.formSource,
    name,
    email,
    summary_html: summaryHtml, // NEW
    details_html: detailsHtml,
  };

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });

    console.log("EmailJS success:", result.status, result.text);
    return result;
  } catch (error: unknown) {
    console.error("EmailJS error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      error.status === 412
    ) {
      throw new Error(
        "EmailJS returned error 412. Check your Gmail connection and authorization permissions in the EmailJS dashboard."
      );
    }

    throw error;
  }
}