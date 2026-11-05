import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

/* ───────────────────────── Types (inline, offers.config not available) ───────────────────────── */
export type OfferKind = "event" | "offer" | "program";

export type Offer = {
  id: string;
  kind: OfferKind;
  title: string;
  description: string;
  priceLabel: string;
  paymentLink: string;
  status?: "available" | "sold-out" | "coming-soon";
  badge?: string;
  tagline?: string;
  dateLabel?: string;
  location?: string;
  includes?: string[];
  compareAtLabel?: string;
  validUntil?: string;
  buttonLabel?: string;
  startISO?: string;
  endISO?: string;
};

const OFFERS: Offer[] = [];

/* ───────────────────────── Data loading ─────────────────────────
   1. Starts with the bundled OFFERS from offers.config.ts
   2. Then tries /offers.json (public folder). If it exists and is valid,
      it replaces the bundled list, so offers can change WITHOUT a rebuild. */

function isValidOffer(o: any): o is Offer {
  return (
    o &&
    typeof o.id === "string" && /^[A-Za-z0-9_-]+$/.test(o.id) &&
    typeof o.title === "string" &&
    typeof o.description === "string" &&
    typeof o.priceLabel === "string" &&
    typeof o.paymentLink === "string" &&
    ["event", "offer", "program"].includes(o.kind)
  );
}

function useOffers(): Offer[] {
  const [offers, setOffers] = useState<Offer[]>(OFFERS);
  useEffect(() => {
    let cancelled = false;
    fetch("/offers.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          const valid = data.filter(isValidOffer);
          if (valid.length) setOffers(valid);
        }
      })
      .catch(() => { /* keep bundled offers */ });
    return () => { cancelled = true; };
  }, []);
  return offers;
}

/* Only allow https links to be used as payment redirects */
const isUsableLink = (link: string) => /^https:\/\/[^\s]+$/i.test(link.trim()) && !link.includes("REPLACE_ME");

/* Adds client_reference_id so the booking can be matched to the offer in Stripe */
function buildCheckoutUrl(o: Offer): string {
  const url = new URL(o.paymentLink.trim());
  url.searchParams.set("client_reference_id", o.id);
  return url.toString();
}

/* ───────────────────────── Add to calendar (.ics) ───────────────────────── */
function downloadIcs(o: Offer) {
  if (!o.startISO) return;
  const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const start = new Date(o.startISO);
  const end = o.endISO ? new Date(o.endISO) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ellevation Hub//Tickets//EN",
    "BEGIN:VEVENT",
    `UID:${o.id}@ellevation-hub`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(start.toISOString())}`,
    `DTEND:${fmt(end.toISOString())}`,
    `SUMMARY:${esc(o.title)}`,
    `DESCRIPTION:${esc(o.description)}`,
    o.location ? `LOCATION:${esc(o.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${o.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}

/* ───────────────────────── Styles ───────────────────────── */
const TK_CSS = `
.tk{ --t-title:#4B1E56; --t-text:#554866; --t-ink:#1a0a2e; --t-eye:#662369; --t-card:#fff; --t-border:rgba(124,92,191,0.18); --t-gold:#D7B264; --t-soft:#f6f3fa; font-family:'Montserrat',sans-serif; color:var(--t-ink); }
[data-theme="dark"] .tk{ --t-title:#e8e0f8; --t-text:#d9a8cd; --t-ink:#f3ecff; --t-eye:#c9a3d9; --t-card:#1f1330; --t-border:rgba(155,109,190,0.22); --t-soft:#160d22; }
.tk *{ box-sizing:border-box; }
.tk-sec{ padding:100px 48px; background:linear-gradient(180deg,#f6f3fa 0%,#ede7f5 100%); text-align:center; }
[data-theme="dark"] .tk-sec{ background:#160d22; }
.tk-wrap{ max-width:1180px; margin:0 auto; }
.tk-eye{ font-size:14px; font-weight:700; letter-spacing:0.2em; color:var(--t-eye); margin-bottom:16px; text-transform:uppercase; }
.tk-title{ font-family:'Astrid Regular',serif; font-weight:700; font-size:clamp(36px,5vw,52px); color:var(--t-title); line-height:1.12; margin-bottom:16px; }
.tk-sub{ font-size:18px; line-height:1.8; color:var(--t-text); max-width:680px; margin:0 auto 36px; }
.tk-filters{ display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:40px; }
.tk-filter{ font-family:'Montserrat',sans-serif; font-size:14px; font-weight:600; padding:10px 20px; border-radius:100px; border:1.5px solid #ded4ee; background:var(--t-card); color:var(--t-text); cursor:pointer; }
.tk-filter.on{ background:var(--t-gold); border-color:var(--t-gold); color:#fff; box-shadow:0 4px 16px rgba(215,178,100,0.4); }
.tk-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:24px; text-align:left; }
.tk-card{ position:relative; display:flex; flex-direction:column; background:var(--t-card); border:1px solid var(--t-border); border-radius:22px; padding:28px 26px 26px; box-shadow:0 6px 28px rgba(75,30,86,0.07); transition:transform .3s ease, box-shadow .3s ease; overflow:hidden; }
.tk-card::before{ content:""; position:absolute; top:0; left:0; right:0; height:5px; background:linear-gradient(90deg,#4B1E56,#D7B264); }
.tk-card:hover{ transform:translateY(-6px); box-shadow:0 20px 50px rgba(75,30,86,0.16); }
.tk-row{ display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:14px; }
.tk-kind{ font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#fff; background:#1a0a2e; padding:5px 12px; border-radius:100px; }
.tk-badge{ font-size:12px; font-weight:700; letter-spacing:0.06em; color:#4B1E56; background:rgba(215,178,100,0.25); border:1px solid rgba(215,178,100,0.6); padding:4px 11px; border-radius:100px; }
.tk-card h3{ font-family:'Astrid Regular',serif; font-size:24px; line-height:1.25; color:var(--t-ink); margin-bottom:6px; }
.tk-tag{ font-size:14px; font-weight:600; color:#8a5a97; margin-bottom:10px; }
.tk-desc{ font-size:16px; line-height:1.65; color:var(--t-text); margin-bottom:16px; }
.tk-meta{ font-size:14px; line-height:1.7; color:var(--t-text); margin-bottom:14px; }
.tk-meta b{ color:var(--t-ink); }
.tk-inc{ list-style:none; padding:0; margin:0 0 20px; display:flex; flex-direction:column; gap:8px; }
.tk-inc li{ display:flex; gap:10px; font-size:15px; color:var(--t-text); }
.tk-inc li::before{ content:"✓"; flex-shrink:0; width:20px; height:20px; border-radius:50%; background:var(--t-gold); color:#fff; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; margin-top:2px; }
.tk-foot{ margin-top:auto; padding-top:18px; border-top:1px solid var(--t-border); display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap; }
.tk-price{ font-family:'Astrid Regular',serif; font-size:30px; font-weight:700; color:var(--t-title); line-height:1; }
.tk-old{ font-family:'Montserrat',sans-serif; font-size:15px; font-weight:500; color:#8a5a97; text-decoration:line-through; margin-left:8px; }
.tk-valid{ font-size:13px; color:#a04a70; font-weight:600; margin-top:6px; }
.tk-btn{ font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:14px 26px; border-radius:100px; border:none; background:var(--t-gold); color:#fff; cursor:pointer; box-shadow:0 6px 20px rgba(75,30,86,0.25); text-decoration:none; display:inline-block; text-align:center; }
.tk-btn:disabled{ background:#c9bfd6; cursor:not-allowed; box-shadow:none; opacity:1; }
.tk-btn.ghost{ background:transparent; color:var(--t-title); border:2px solid var(--t-title); box-shadow:none; }
[data-theme="dark"] .tk-btn.ghost{ border-color:#c9a3d9; color:#e8e0f8; }
.tk-note{ margin:44px auto 0; max-width:720px; font-size:14px; line-height:1.7; color:var(--t-text); }
.tk-empty{ padding:30px 0; font-size:16px; color:var(--t-text); }
.tk-btn:focus-visible,.tk-filter:focus-visible{ outline:3px solid rgba(215,178,100,0.8); outline-offset:2px; }

/* success page */
.tk-ok{ max-width:760px; margin:0 auto; background:var(--t-card); border:1px solid var(--t-border); border-radius:26px; padding:48px 40px; box-shadow:0 16px 48px rgba(75,30,86,0.12); text-align:center; }
.tk-tick{ width:72px; height:72px; border-radius:50%; background:var(--t-gold); color:#fff; font-size:36px; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
.tk-sum{ text-align:left; background:var(--t-soft); border:1px solid var(--t-border); border-radius:16px; padding:20px 22px; margin:24px 0; }
.tk-sum h4{ font-family:'Astrid Regular',serif; font-size:22px; color:var(--t-ink); margin-bottom:8px; }
.tk-sum p{ font-size:15px; line-height:1.7; color:var(--t-text); }
.tk-steps{ text-align:left; margin:0 0 28px; padding-left:20px; font-size:15px; line-height:1.8; color:var(--t-text); }
.tk-actions{ display:flex; justify-content:center; gap:12px; flex-wrap:wrap; }
@media (max-width:768px){ .tk-sec{ padding:56px 20px; } .tk-grid{ grid-template-columns:1fr; } .tk-ok{ padding:34px 22px; } }
`;

const KIND_LABEL: Record<OfferKind, string> = { event: "Event", offer: "Offer", program: "Program" };
const DEFAULT_BTN: Record<OfferKind, string> = { event: "Get Tickets", offer: "Claim Offer", program: "Book Now" };
const FILTERS: { id: "all" | OfferKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "event", label: "Events" },
  { id: "offer", label: "Offers" },
  { id: "program", label: "Programs" },
];

/* ───────────────────────── Offer card ───────────────────────── */
function OfferCard({ o, onEnquire }: { o: Offer; onEnquire: () => void }) {
  const status = o.status ?? "available";
  const linkOk = isUsableLink(o.paymentLink);
  const canBook = status === "available" && linkOk;

  const handleBook = () => {
    // Same tab on purpose, so Stripe can send the customer back to the success page.
    window.location.href = buildCheckoutUrl(o);
  };

  return (
    <article className="tk-card">
      <div className="tk-row">
        <span className="tk-kind">{KIND_LABEL[o.kind]}</span>
        {o.badge && <span className="tk-badge">{o.badge}</span>}
      </div>
      <h3>{o.title}</h3>
      {o.tagline && <p className="tk-tag">{o.tagline}</p>}
      <p className="tk-desc">{o.description}</p>

      {(o.dateLabel || o.location) && (
        <p className="tk-meta">
          {o.dateLabel && <><b>When:</b> {o.dateLabel}<br /></>}
          {o.location && <><b>Where:</b> {o.location}</>}
        </p>
      )}

      {o.includes && o.includes.length > 0 && (
        <ul className="tk-inc">{o.includes.map((i) => <li key={i}>{i}</li>)}</ul>
      )}

      <div className="tk-foot">
        <div>
          <div className="tk-price">
            {o.priceLabel}
            {o.compareAtLabel && <span className="tk-old">{o.compareAtLabel}</span>}
          </div>
          {o.validUntil && <p className="tk-valid">{o.validUntil}</p>}
        </div>

        {canBook ? (
          <button className="tk-btn" onClick={handleBook}>
            {o.buttonLabel || DEFAULT_BTN[o.kind]}
          </button>
        ) : status === "sold-out" ? (
          <button className="tk-btn" disabled>Sold Out</button>
        ) : status === "coming-soon" || !linkOk ? (
          <button className="tk-btn ghost" onClick={onEnquire}>
            {status === "coming-soon" ? "Coming Soon · Enquire" : "Enquire"}
          </button>
        ) : null}
      </div>
    </article>
  );
}

/* ───────────────────────── Tickets & Offers page ───────────────────────── */
export function TicketsSection({ nav }: { nav: (p: "connect" | "tickets") => void }) {
  const offers = useOffers();
  const [filter, setFilter] = useState<"all" | OfferKind>("all");

  const shown = useMemo(
    () => (filter === "all" ? offers : offers.filter((o) => o.kind === filter)),
    [offers, filter]
  );

  return (
    <section className="tk tk-sec">
      <style>{TK_CSS}</style>
      <div className="tk-wrap">
        <p className="tk-eye">Tickets &amp; Offers</p>
        <h2 className="tk-title">Book Your Place</h2>
        <p className="tk-sub">
          Secure your spot at upcoming events and take advantage of member offers. Payments are
          handled on a secure Stripe checkout page, and you'll be brought back here to confirm
          your booking.
        </p>

        <div className="tk-filters" role="group" aria-label="Filter offers">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`tk-filter${filter === f.id ? " on" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="tk-empty">Nothing available in this category right now. Please check back soon.</p>
        ) : (
          <div className="tk-grid">
            {shown.map((o) => (
              <OfferCard key={o.id} o={o} onEnquire={() => nav("connect")} />
            ))}
          </div>
        )}

        <p className="tk-note">
          You will be redirected to Stripe's secure payment page. Apple Pay, Google Pay and cards
          are available where supported by your device. A receipt will be emailed to you by Stripe.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Booking confirmation page ─────────────────────────
   Stripe redirects here after payment:
   /hub?page=booking-success&offer=<id>&session_id=cs_...                       */
export function BookingSuccessSection({ nav }: { nav: (p: "home" | "connect" | "tickets") => void }) {
  const [params] = useSearchParams();
  const offers = useOffers();
  const offerId = params.get("offer") || "";
  const sessionId = params.get("session_id") || "";
  const offer = offers.find((o) => o.id === offerId);
  const ref = sessionId ? sessionId.slice(-10).toUpperCase() : "";

  return (
    <section className="tk tk-sec">
      <style>{TK_CSS}</style>
      <div className="tk-ok">
        <div className="tk-tick" aria-hidden="true">✓</div>
        <p className="tk-eye">Booking Confirmation</p>
        <h2 className="tk-title" style={{ fontSize: "clamp(30px,4.5vw,44px)" }}>Thank You!</h2>
        <p className="tk-sub" style={{ marginBottom: 0 }}>
          Your payment has been submitted through Stripe. A receipt will be emailed to you shortly.
          If you don't see it within a few minutes, please check your spam folder.
        </p>

        {offer && (
          <div className="tk-sum">
            <h4>{offer.title}</h4>
            <p>
              {offer.dateLabel && <>When: {offer.dateLabel}<br /></>}
              {offer.location && <>Where: {offer.location}<br /></>}
              Amount: {offer.priceLabel}
              {ref && <><br />Reference: {ref}</>}
            </p>
          </div>
        )}

        <ol className="tk-steps">
          <li>Check your inbox for the Stripe receipt and booking details.</li>
          {offer?.startISO && <li>Add the event to your calendar so you don't miss it.</li>}
          <li>Questions about your booking? Contact the Ellevation Hub team and quote your reference.</li>
        </ol>

        <div className="tk-actions">
          {offer?.startISO && (
            <button className="tk-btn" onClick={() => downloadIcs(offer)}>Add to Calendar</button>
          )}
          <button className="tk-btn ghost" onClick={() => nav("tickets")}>More Tickets &amp; Offers</button>
          <button className="tk-btn ghost" onClick={() => nav("connect")}>Contact Us</button>
        </div>
      </div>
    </section>
  );
}