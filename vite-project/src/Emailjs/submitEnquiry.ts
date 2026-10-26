import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ncrzorh";        // same service (ya apna alag)
const TEMPLATE_ID = "template_uez4rtn";      // ← Template 2 ka NAYA ID yahan daalein
const PUBLIC_KEY = "RtPgLiN1d2G9V2EYH";      // same public key

export type EnquiryPayload = {
  brand: "ms" | "hub" | "ellevation";
  formTitle: string;
  itemLabel: string;
  itemName: string;
  formSource: string;
  fields: Record<string, string | undefined>;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function submitEnquiry(p: EnquiryPayload) {
  const detailsHtml = Object.entries(p.fields)
    .filter(([, value]) => value !== undefined && String(value).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #ede7f5;width:35%;color:#8a5a97;font-weight:600;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #ede7f5;white-space:pre-wrap;">${escapeHtml(String(value))}</td>
        </tr>`
    )
    .join("");

  const brandName =
    p.brand === "ms" ? "Ms Ellevation" : p.brand === "hub" ? "Ellevation Hub" : "Ellevation";

  const first = p.fields["First Name"] ?? "";
  const last = p.fields["Last Name"] ?? "";
  const name =
    p.fields["Full Name"] ?? (`${first} ${last}`.trim() || p.fields["name"] || "");

  const email =
    p.fields["Email"] ?? p.fields["Email Address"] ?? p.fields["email"] ?? "";

  const templateParams = {
    brand_name: brandName,
    form_title: p.formTitle,
    item_label: p.itemLabel,
    item_name: p.itemName,
    form_source: p.formSource,
    name,
    email,
    details_html: detailsHtml,
  };

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
    console.log("EmailJS (enquiry) success:", result.status, result.text);
    return result;
  } catch (error: unknown) {
    console.error("EmailJS (enquiry) error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      (error as { status?: number }).status === 412
    ) {
      throw new Error(
        "EmailJS returned error 412. Check your Gmail connection and authorization permissions in the EmailJS dashboard."
      );
    }
    throw error;
  }
}