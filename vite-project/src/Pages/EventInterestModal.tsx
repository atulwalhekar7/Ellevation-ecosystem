import { useState, useEffect } from "react";
import { submitRegistration } from "../Emailjs/submitRegistration";
import type { EventItem } from "./eventsData";

/* ─────────────────────────────────────────────────────────────────────────
   Reusable "Register Your Interest" form (popup) — one form for ALL events.
   Frontend-only: submissions go through the existing EmailJS helper.
   Usage:  <EventInterestModal event={clickedEvent} events={EVENTS} onClose={...} />

   Responsive: centred dialog on desktop/tablet, full-width bottom sheet on
   phones, with a sticky submit bar so the button is always reachable.
   ───────────────────────────────────────────────────────────────────────── */

const CONSENT_VERSION = "event-interest-v1 (2027)";

const CONSENT_EVENT_TEXT =
  "Yes! Notify me when tickets go on sale, registrations open and important updates are announced for this event.";
const CONSENT_GENERAL_TEXT =
  "Yes! I'd also like to receive updates about other Ellevation events, programs and opportunities.";

const WHO_OPTIONS = ["Myself", "My family or children", "My organisation or team", "Someone else"] as const;
const RELATIONSHIP_OPTIONS = ["Friend", "Family member", "Colleague", "Client or participant", "Other"] as const;
const ATTENDEE_OPTIONS = ["1", "2", "3", "4+"] as const;

type Errors = Partial<Record<"eventId" | "name" | "email" | "phone" | "privacy", string>>;

const dupKey = (eventId: string, email: string) => `eif:${eventId}:${email.trim().toLowerCase()}`;

export default function EventInterestModal({
  event,
  events,
  onClose,
}: {
  event: EventItem;
  events: EventItem[];
  onClose: () => void;
}) {
  const [eventId, setEventId] = useState(event.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendees, setAttendees] = useState<string>("1");
  const [forWhom, setForWhom] = useState("");
  const [relationship, setRelationship] = useState("");
  const [notifyEvent, setNotifyEvent] = useState(false);
  const [notifyGeneral, setNotifyGeneral] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [trap, setTrap] = useState(""); // honeypot (bots fill this, people never see it)

  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const selected = events.find(e => e.id === eventId) ?? event;

  // Lock page scroll while the popup is open + close on Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const changeForWhom = (v: string) => {
    const next = forWhom === v ? "" : v; // tap again to unselect (optional field)
    setForWhom(next);
    if (next !== "Someone else") setRelationship(""); // hide + clear
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!eventId) e.eventId = "Please select an event.";
    if (!name.trim()) e.name = "Full name is required.";
    if (!email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (phone && !/^\+?[\d\s\-().]{7,}$/.test(phone)) e.phone = "Enter a valid phone number.";
    if (!privacy) e.privacy = "Please acknowledge the Privacy Policy to continue.";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setTimeout(() => document.querySelector<HTMLElement>(".eif-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 30);
      return;
    }

    // Spam protection: bots fill the hidden field. Pretend success, send nothing.
    if (trap) {
      setDuplicate(false);
      setSubmitted(true);
      return;
    }

    // Graceful duplicate handling (this browser only — no backend yet).
    const key = dupKey(eventId, email);
    let already = false;
    try { already = !!localStorage.getItem(key); } catch { /* storage unavailable */ }
    if (already) {
      setDuplicate(true);
      setSubmitted(true);
      setRegisteredIds(prev => (prev.includes(eventId) ? prev : [...prev, eventId]));
      return;
    }

    const now = new Date().toISOString();
    setSending(true);
    try {
      await submitRegistration({
        brand: "ellevation",
        formTitle: "Event Expression of Interest",
        itemLabel: "Event",
        itemName: selected.title,
        formSource: "Ellevation — Event Expression of Interest",
        fields: {
          "Full Name": name,
          "Email": email,
          "Phone": phone,
          "Attendees": attendees,
          "Registering Interest For": forWhom,
          "Relationship To Person": forWhom === "Someone else" ? relationship : "",
          "Event ID": selected.id,
          "Proposed Date": selected.date,
          "Event Brand": selected.brand,
          "Notify Me About This Event": notifyEvent ? "Yes" : "No",
          "Event Consent Timestamp": notifyEvent ? now : "",
          "Notify Me About Other Ellevation Events": notifyGeneral ? "Yes" : "No",
          "General Marketing Consent Timestamp": notifyGeneral ? now : "",
          "Privacy Policy Acknowledged": "Yes",
          "Consent Version": CONSENT_VERSION,
          "Event Consent Wording": notifyEvent ? CONSENT_EVENT_TEXT : "",
          "General Consent Wording": notifyGeneral ? CONSENT_GENERAL_TEXT : "",
                 "Submitted At": now,
        },
        sections: [
          { title: "Contact", keys: ["Full Name", "Email", "Phone"] },
          {
            title: "Event",
            keys: [
              "Proposed Date",
              "Event Brand",
              "Event ID",
              "Attendees",
              "Registering Interest For",
              "Relationship To Person",
            ],
          },
          {
            title: "Marketing consent",
            keys: [
              "Notify Me About This Event",
              "Event Consent Timestamp",
              "Notify Me About Other Ellevation Events",
              "General Marketing Consent Timestamp",
            ],
          },
          {
            title: "Privacy & consent record",
            keys: [
              "Privacy Policy Acknowledged",
              "Consent Version",
              "Event Consent Wording",
              "General Consent Wording",
              "Submitted At",
            ],
          },
        ],
      });
      try { localStorage.setItem(key, now); } catch { /* ignore */ }
      setDuplicate(false);
      setSubmitted(true);
      setRegisteredIds(prev => (prev.includes(eventId) ? prev : [...prev, eventId]));
    } catch (err: any) {
      console.error("Event interest error:", err);
      alert(`Your registration of interest could not be sent. Please try again.\n\nError: ${err?.text || err?.message || "Unknown error"}`);
    } finally {
      setSending(false);
    }
  };

  // "Register for another event": keep contact details, reset event + consents.
  const registerAnother = (id: string) => {
    setEventId(id);
    setNotifyEvent(false);
    setNotifyGeneral(false);
    setPrivacy(false);
    setErrors({});
    setDuplicate(false);
    setSubmitted(false);
  };

  const otherEvents = events.filter(e => !registeredIds.includes(e.id));

  const closeBtn = (
    <button type="button" aria-label="Close" className="eif-close" onClick={onClose}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  );

  return (
    <div className="eif-overlay" onClick={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}>
      <style>{EIF_CSS}</style>

      <div className="eif-modal" role="dialog" aria-modal="true" aria-labelledby="eif-heading">
        {submitted ? (
          /* ───────────── 5. CONFIRMATION ───────────── */
          <div className="eif-done-wrap">
            {closeBtn}
            <div className="eif-scroll">
              <div className="eif-success">
                <div className="eif-success-icon" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 id="eif-heading" className="eif-success-title">Thank you for your interest!</h3>
                <p className="eif-success-text">
                  We've received your details. If you've opted in, we'll notify you when tickets or registrations become available for your selected event. Registering interest does not guarantee a place.
                </p>
                {duplicate && (
                  <p className="eif-notice">
                    You've already registered your interest in this event from this device, so we haven't sent it again.
                  </p>
                )}
              </div>

              {otherEvents.length > 0 && (
                <div className="eif-another">
                  <p className="eif-another-title">Interested in another event?</p>
                  <p className="eif-help" style={{ marginTop: 0, marginBottom: 12 }}>
                    Tap an event to register your interest — we'll keep your contact details filled in.
                  </p>
                  <div className="eif-another-list">
                    {otherEvents.map(o => (
                      <button key={o.id} type="button" className="eif-another-item" onClick={() => registerAnother(o.id)}>
                        <span className="eif-another-info">
                          <span className="eif-another-name">{o.title}</span>
                          <span className="eif-another-date">{o.date}</span>
                        </span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="eif-foot">
              <button type="button" className="eif-btn-ghost" onClick={onClose}>DONE</button>
            </div>
          </div>
        ) : (
          /* ───────────── 1–4. FORM ───────────── */
          <form className="eif-form" onSubmit={handleSubmit} noValidate>
            <header className="eif-head">
              {closeBtn}
              <p className="eif-eyebrow">ELLEVATION · 2027</p>
              <h3 id="eif-heading" className="eif-title">Register Your Interest</h3>
              <p className="eif-intro">
                Be part of the Ellevation experience! Register your interest to receive information about your selected event, including when tickets go on sale and registrations open.
              </p>
            </header>

            <div className="eif-scroll">
              {/* Selected event */}
              <section className="eif-event-card">
                <label className="eif-label" htmlFor="eif-event">Event of interest <span className="eif-req">*</span></label>
                <div className="eif-select-wrap">
                  <select id="eif-event" className="eif-input eif-select" value={eventId} onChange={e => setEventId(e.target.value)} aria-invalid={!!errors.eventId}>
                    {events.map(o => (
                      <option key={o.id} value={o.id}>{o.title} — {o.date}</option>
                    ))}
                  </select>
                </div>
                {errors.eventId && <span className="eif-error">{errors.eventId}</span>}
                <div className="eif-event-meta">
                  <span className="eif-chip-date">{selected.date}</span>
                  <span className="eif-chip-brand">{selected.brand}</span>
                </div>
                <p className="eif-help">Dates are proposed and subject to confirmation.</p>
              </section>

              {/* Your details */}
              <section className="eif-section">
                <h4 className="eif-section-title">Your details</h4>
                <div className="eif-grid">
                  <div className={`eif-field${errors.name ? " has-error" : ""}`}>
                    <label className="eif-label" htmlFor="eif-name">Full name <span className="eif-req">*</span></label>
                    <input id="eif-name" className="eif-input" autoComplete="name" placeholder="Your full name"
                      value={name} onChange={e => setName(e.target.value)} aria-invalid={!!errors.name} />
                    {errors.name && <span className="eif-error">{errors.name}</span>}
                  </div>

                  <div className={`eif-field${errors.email ? " has-error" : ""}`}>
                    <label className="eif-label" htmlFor="eif-email">Email address <span className="eif-req">*</span></label>
                    <input id="eif-email" className="eif-input" type="email" autoComplete="email" inputMode="email" placeholder="name@email.com"
                      value={email} onChange={e => setEmail(e.target.value)} aria-invalid={!!errors.email} />
                    {errors.email && <span className="eif-error">{errors.email}</span>}
                  </div>

                  <div className={`eif-field eif-span-2${errors.phone ? " has-error" : ""}`}>
                    <label className="eif-label" htmlFor="eif-phone">Phone number <span className="eif-opt">(optional)</span></label>
                    <input id="eif-phone" className="eif-input" type="tel" autoComplete="tel" inputMode="tel" placeholder="+61 4XX XXX XXX"
                      value={phone} onChange={e => setPhone(e.target.value)} aria-invalid={!!errors.phone} />
                    {errors.phone && <span className="eif-error">{errors.phone}</span>}
                  </div>
                </div>
              </section>

              {/* Attendees + who */}
              <section className="eif-section">
                <h4 className="eif-section-title">About your interest</h4>

                <div className="eif-field">
                  <span className="eif-label" id="eif-attendees-label">Number of attendees</span>
                  <div className="eif-chips" role="group" aria-labelledby="eif-attendees-label">
                    {ATTENDEE_OPTIONS.map(n => (
                      <button key={n} type="button" className={`eif-chip${attendees === n ? " on" : ""}`}
                        aria-pressed={attendees === n} onClick={() => setAttendees(n)}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="eif-field" style={{ marginTop: 18 }}>
                  <span className="eif-label" id="eif-who-label">Who are you registering interest for? <span className="eif-opt">(optional)</span></span>
                  <div className="eif-chips" role="group" aria-labelledby="eif-who-label">
                    {WHO_OPTIONS.map(o => (
                      <button key={o} type="button" className={`eif-chip${forWhom === o ? " on" : ""}`}
                        aria-pressed={forWhom === o} onClick={() => changeForWhom(o)}>
                        {o}
                      </button>
                    ))}
                  </div>

                  {forWhom === "My family or children" && (
                    <p className="eif-notice">
                      Please use your own contact details above. Don't enter children's personal information on this form — attendee details are only collected later, if needed for booking.
                    </p>
                  )}
                </div>

                {forWhom === "Someone else" && (
                  <div className="eif-field" style={{ marginTop: 18 }}>
                    <label className="eif-label" htmlFor="eif-rel">What is your relationship to this person? <span className="eif-opt">(optional)</span></label>
                    <div className="eif-select-wrap">
                      <select id="eif-rel" className="eif-input eif-select" value={relationship} onChange={e => setRelationship(e.target.value)}>
                        <option value="">Select an option</option>
                        {RELATIONSHIP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <p className="eif-help">
                      We will contact you using the details you provided. No additional personal information is required at this stage.
                    </p>
                  </div>
                )}
              </section>

              {/* Honeypot — hidden from people and screen readers */}
              <div className="eif-trap" aria-hidden="true">
                <label htmlFor="eif-website">Website</label>
                <input id="eif-website" tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} />
              </div>

              {/* 3. Stay in the Loop */}
              <section className="eif-section">
                <h4 className="eif-section-title">Stay in the Loop!</h4>
                <p className="eif-help" style={{ marginTop: 0, marginBottom: 12 }}>
                  Don't miss out! Let us know what you'd like to hear about.
                </p>
                <label className={`eif-consent${notifyEvent ? " on" : ""}`}>
                  <input type="checkbox" checked={notifyEvent} onChange={e => setNotifyEvent(e.target.checked)} />
                  <span className="eif-box" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="eif-consent-text">{CONSENT_EVENT_TEXT}</span>
                </label>
                <label className={`eif-consent${notifyGeneral ? " on" : ""}`}>
                  <input type="checkbox" checked={notifyGeneral} onChange={e => setNotifyGeneral(e.target.checked)} />
                  <span className="eif-box" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="eif-consent-text">{CONSENT_GENERAL_TEXT}</span>
                </label>
              </section>

              {/* 4. Privacy */}
              <section className="eif-section" style={{ paddingBottom: 4 }}>
                <label className={`eif-consent${privacy ? " on" : ""}${errors.privacy ? " has-error" : ""}`}>
                  <input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)} aria-invalid={!!errors.privacy} />
                  <span className="eif-box" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="eif-consent-text">
                    I acknowledge the Ellevation{" "}
                    <a href="/privacy-policy" target="_blank" rel="noreferrer" className="eif-link">Privacy Policy</a>{" "}
                    and understand that my information will be used to respond to my event enquiry. <span className="eif-req">*</span>
                  </span>
                </label>
                {errors.privacy && <span className="eif-error">{errors.privacy}</span>}
              </section>
            </div>

            {/* Sticky submit bar */}
            <footer className="eif-foot">
              <button type="submit" disabled={sending} className="eif-btn">
                {sending ? "SENDING..." : "REGISTER MY INTEREST"}
                {!sending && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <p className="eif-foot-note">Registering interest does not reserve or guarantee a ticket.</p>
            </footer>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Styles (class-based so media queries + dark mode work) ── */
const EIF_CSS = `
.eif-overlay, .eif-overlay *{ box-sizing:border-box; }
.eif-overlay{
  position:fixed; inset:0; z-index:1000;
  display:flex; align-items:center; justify-content:center;
  padding:20px;
  background:rgba(20,10,34,0.6);
  backdrop-filter:blur(5px); -webkit-backdrop-filter:blur(5px);
  animation:eifFade .2s ease both;
  font-family:'Montserrat',sans-serif;
}
.eif-modal{
  position:relative; width:100%; max-width:600px;
  max-height:min(92vh, 900px); max-height:min(92dvh, 900px);
  display:flex; flex-direction:column;
  background:#ffffff; border-radius:26px; overflow:hidden;
  box-shadow:0 30px 80px rgba(45,23,64,0.35);
  animation:eifPop .28s cubic-bezier(.22,1,.36,1) both;
}
@keyframes eifFade{ from{opacity:0} to{opacity:1} }
@keyframes eifPop{ from{opacity:0; transform:translateY(18px) scale(.97)} to{opacity:1; transform:none} }
@keyframes eifSheet{ from{transform:translateY(100%)} to{transform:none} }

.eif-form, .eif-done-wrap{ display:flex; flex-direction:column; min-height:0; flex:1; }

/* Header */
.eif-head{
  position:relative; flex-shrink:0; overflow:hidden;
  padding:30px 32px 26px;
  background:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 55%,#2d1740 100%);
  color:#fff;
}
.eif-head::after{
  content:""; position:absolute; right:-70px; top:-70px; width:230px; height:230px; border-radius:50%;
  background:radial-gradient(circle, rgba(215,178,100,0.38) 0%, transparent 70%); pointer-events:none;
}
.eif-eyebrow{ position:relative; z-index:1; font-size:11px; font-weight:700; letter-spacing:0.22em; color:#EFBF68; margin:0 0 8px; }
.eif-title{ position:relative; z-index:1; font-family:'Astrid Regular',serif; font-size:clamp(24px,5vw,30px); font-weight:700; line-height:1.15; color:#fff; margin:0 0 10px; padding-right:40px; }
.eif-intro{ position:relative; z-index:1; font-size:14px; line-height:1.65; color:rgba(255,255,255,0.88); margin:0; }

.eif-close{
  position:absolute; top:16px; right:16px; z-index:3;
  width:36px; height:36px; border-radius:50%; border:none; cursor:pointer;
  display:inline-flex; align-items:center; justify-content:center;
  background:rgba(255,255,255,0.18); color:#fff; transition:background .2s ease;
}
.eif-close:hover{ background:rgba(255,255,255,0.3); opacity:1; transform:none; }
.eif-done-wrap > .eif-close{ background:#f1ecf7; color:#4B1E56; }
.eif-done-wrap > .eif-close:hover{ background:#e6def0; }

/* Scroll area */
.eif-scroll{ flex:1; min-height:0; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:24px 32px 12px; }
.eif-section{ padding:0 0 22px; margin-bottom:22px; border-bottom:1px solid rgba(124,92,191,0.14); }
.eif-section:last-of-type{ border-bottom:none; margin-bottom:0; }
.eif-section-title{ font-family:'Astrid Regular',serif; font-size:19px; font-weight:700; color:#4B1E56; margin:0 0 14px; }

/* Event card */
.eif-event-card{ padding:18px; margin-bottom:24px; border-radius:18px; background:linear-gradient(180deg,#f6f3fa 0%,#efe8f7 100%); border:1px solid rgba(124,92,191,0.16); }
.eif-event-meta{ display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
.eif-chip-date{ font-size:11px; font-weight:700; letter-spacing:0.1em; color:#fff; background:#1a0a2e; padding:5px 12px; border-radius:100px; }
.eif-chip-brand{ font-size:11px; font-weight:600; letter-spacing:0.05em; color:#662369; background:rgba(75,30,86,0.08); border:1px solid rgba(75,30,86,0.16); padding:4px 11px; border-radius:100px; }

/* Fields */
.eif-grid{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.eif-span-2{ grid-column:1 / -1; }
.eif-field{ min-width:0; }
.eif-label{ display:block; font-size:13px; font-weight:600; color:#1a0a2e; margin-bottom:8px; }
.eif-req{ color:#b3402a; }
.eif-opt{ font-weight:400; color:#8a5a97; }
.eif-input{
  width:100%; padding:14px 16px; border-radius:14px;
  border:1.5px solid rgba(124,92,191,0.25); background:#fdfbfe;
  font-family:'Montserrat',sans-serif; font-size:15px; color:#1c1630;
  outline:none; transition:border-color .2s ease, box-shadow .2s ease, background .2s ease;
}
.eif-input::placeholder{ color:#a898b8; }
.eif-input:focus{ border-color:#4B1E56; background:#fff; box-shadow:0 0 0 4px rgba(75,30,86,0.10); }
.has-error .eif-input{ border-color:#b3402a; background:#fff8f6; }
.eif-select-wrap{ position:relative; }
.eif-select{ appearance:none; -webkit-appearance:none; padding-right:44px; cursor:pointer; text-overflow:ellipsis; }
.eif-select-wrap::after{
  content:""; position:absolute; right:18px; top:50%; width:8px; height:8px; margin-top:-6px;
  border-right:2px solid #4B1E56; border-bottom:2px solid #4B1E56; transform:rotate(45deg); pointer-events:none;
}
.eif-error{ display:block; font-size:12.5px; color:#b3402a; margin-top:6px; }
.eif-help{ font-size:12.5px; color:#6b5a7c; line-height:1.55; margin:8px 0 0; }
.eif-notice{ margin:12px 0 0; padding:12px 14px; border-radius:12px; font-size:13px; line-height:1.55; color:#4B1E56; background:rgba(215,178,100,0.14); border-left:3px solid #D7B264; }

/* Chips (toggle buttons) */
.eif-chips{ display:flex; flex-wrap:wrap; gap:8px; }
.eif-chip{
  font-family:'Montserrat',sans-serif; font-size:13.5px; font-weight:600; color:#554866;
  background:#fff; border:1.5px solid rgba(124,92,191,0.25); border-radius:100px;
  padding:10px 18px; cursor:pointer; transition:all .2s ease;
}
.eif-chip:hover{ border-color:#4B1E56; opacity:1; transform:none; filter:none; }
.eif-chip.on{ background:#4B1E56; border-color:#4B1E56; color:#fff; box-shadow:0 4px 14px rgba(75,30,86,0.25); }
.eif-chip:focus-visible, .eif-btn:focus-visible, .eif-close:focus-visible, .eif-another-item:focus-visible{ outline:3px solid rgba(215,178,100,0.8); outline-offset:2px; }

/* Consent cards (custom checkbox) */
.eif-consent{
  position:relative; display:flex; align-items:flex-start; gap:12px; cursor:pointer;
  padding:14px 16px; margin-bottom:10px; border-radius:14px;
  background:#fdfbfe; border:1.5px solid rgba(124,92,191,0.2);
  transition:border-color .2s ease, background .2s ease;
}
.eif-consent:last-child{ margin-bottom:0; }
.eif-consent:hover{ border-color:rgba(75,30,86,0.45); }
.eif-consent.on{ background:rgba(215,178,100,0.12); border-color:#D7B264; }
.eif-consent.has-error{ border-color:#b3402a; background:#fff8f6; }
.eif-consent input{ position:absolute; opacity:0; width:100%; height:100%; left:0; top:0; margin:0; cursor:pointer; }
.eif-box{
  flex-shrink:0; width:22px; height:22px; margin-top:1px; border-radius:7px;
  display:inline-flex; align-items:center; justify-content:center;
  border:2px solid rgba(75,30,86,0.4); background:#fff; color:transparent; transition:all .2s ease;
}
.eif-consent.on .eif-box{ background:#4B1E56; border-color:#4B1E56; color:#fff; }
.eif-consent input:focus-visible ~ .eif-box{ outline:3px solid rgba(215,178,100,0.8); outline-offset:2px; }
.eif-consent-text{ font-size:13.5px; line-height:1.55; color:#554866; }
.eif-link{ color:#4B1E56; font-weight:700; text-decoration:underline; text-underline-offset:2px; position:relative; z-index:1; }

/* Honeypot */
.eif-trap{ position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden; }

/* Footer / submit */
.eif-foot{
  flex-shrink:0; padding:16px 32px 20px; background:#fff;
  border-top:1px solid rgba(124,92,191,0.14);
  box-shadow:0 -10px 24px rgba(75,30,86,0.05);
}
.eif-btn, .eif-btn-ghost{
  width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
  font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.12em;
  padding:16px; border-radius:100px; cursor:pointer; transition:transform .2s ease, box-shadow .2s ease, opacity .2s ease;
}
.eif-btn{ border:none; background:#D7B264; color:#fff; box-shadow:0 8px 22px rgba(75,30,86,0.28); }
.eif-btn:hover:not(:disabled){ transform:translateY(-2px); box-shadow:0 12px 28px rgba(75,30,86,0.36); opacity:1; }
.eif-btn:disabled{ opacity:.7; cursor:not-allowed; }
.eif-btn svg{ transition:transform .2s ease; }
.eif-btn:hover:not(:disabled) svg{ transform:translateX(3px); }
.eif-btn-ghost{ background:transparent; color:#4B1E56; border:2px solid #D7B264; }
.eif-foot-note{ margin:10px 0 0; text-align:center; font-size:12.5px; color:#6b5a7c; line-height:1.5; }

/* Confirmation */
.eif-success{ text-align:center; padding:34px 4px 8px; }
.eif-success-icon{
  width:72px; height:72px; margin:0 auto 18px; border-radius:50%;
  display:flex; align-items:center; justify-content:center; color:#fff;
  background:linear-gradient(135deg,#6b2f7a 0%,#4B1E56 100%);
  box-shadow:0 12px 30px rgba(75,30,86,0.32), 0 0 0 8px rgba(215,178,100,0.2);
  animation:eifPop .4s cubic-bezier(.22,1,.36,1) both;
}
.eif-success-title{ font-family:'Astrid Regular',serif; font-size:clamp(24px,5vw,30px); font-weight:700; color:#4B1E56; margin:0 0 12px; }
.eif-success-text{ font-size:15px; line-height:1.7; color:#554866; max-width:440px; margin:0 auto; }
.eif-success .eif-notice{ text-align:left; max-width:440px; margin:16px auto 0; }
.eif-another{ margin-top:28px; padding-top:22px; border-top:1px solid rgba(124,92,191,0.16); }
.eif-another-title{ font-family:'Astrid Regular',serif; font-size:19px; font-weight:700; color:#4B1E56; margin:0 0 6px; }
.eif-another-list{ display:flex; flex-direction:column; gap:8px; max-height:280px; overflow-y:auto; padding:2px 2px 8px; }
.eif-another-item{
  display:flex; align-items:center; justify-content:space-between; gap:12px; text-align:left; cursor:pointer;
  font-family:'Montserrat',sans-serif; color:#4B1E56;
  background:#fdfbfe; border:1.5px solid rgba(124,92,191,0.2); border-radius:14px; padding:12px 16px;
  transition:border-color .2s ease, background .2s ease;
}
.eif-another-item:hover{ border-color:#D7B264; background:rgba(215,178,100,0.1); opacity:1; transform:none; filter:none; }
.eif-another-info{ display:flex; flex-direction:column; gap:2px; min-width:0; }
.eif-another-name{ font-size:14px; font-weight:700; color:#1a0a2e; }
.eif-another-date{ font-size:12.5px; color:#8a5a97; }
.eif-another-item svg{ flex-shrink:0; }

/* ───── Tablet ───── */
@media (max-width:768px){
  .eif-head{ padding:26px 24px 22px; }
  .eif-scroll{ padding:20px 24px 8px; }
  .eif-foot{ padding:14px 24px 18px; }
}

/* ───── Phones: full-width bottom sheet ───── */
@media (max-width:600px){
  .eif-overlay{ padding:0; align-items:flex-end; }
  .eif-modal{
    max-width:none; width:100%;
    max-height:94vh; max-height:94dvh;
    border-radius:24px 24px 0 0;
    animation:eifSheet .32s cubic-bezier(.22,1,.36,1) both;
  }
  .eif-head{ padding:24px 20px 20px; }
  .eif-head::before{
    content:""; position:absolute; top:8px; left:50%; width:42px; height:4px; margin-left:-21px;
    border-radius:4px; background:rgba(255,255,255,0.35); z-index:2;
  }
  .eif-close{ top:14px; right:14px; }
  .eif-eyebrow{ margin-top:6px; }
  .eif-scroll{ padding:18px 20px 6px; }
  .eif-grid{ grid-template-columns:1fr; gap:14px; }
  .eif-span-2{ grid-column:auto; }
  .eif-event-card{ padding:14px; }
  .eif-chip{ padding:10px 15px; font-size:13px; }
  .eif-consent{ padding:12px 14px; }
  .eif-foot{ padding:12px 20px calc(14px + env(safe-area-inset-bottom, 0px)); }
  .eif-another-list{ max-height: 220px; }
}
@media (max-width:360px){
  .eif-chip{ flex:1 1 auto; text-align:center; }
}

@media (prefers-reduced-motion:reduce){
  .eif-overlay, .eif-modal, .eif-success-icon{ animation:none !important; }
  .eif-btn, .eif-chip, .eif-consent{ transition:none !important; }
}

/* ───── Dark mode ───── */
[data-theme="dark"] .eif-modal{ background:#160d22; box-shadow:0 30px 80px rgba(0,0,0,0.6); }
[data-theme="dark"] .eif-scroll, [data-theme="dark"] .eif-foot{ background:#160d22; }
[data-theme="dark"] .eif-foot{ border-top-color:rgba(155,109,190,0.25); box-shadow:0 -10px 24px rgba(0,0,0,0.3); }
[data-theme="dark"] .eif-section, [data-theme="dark"] .eif-another{ border-color:rgba(155,109,190,0.25); }
[data-theme="dark"] .eif-section-title, [data-theme="dark"] .eif-success-title, [data-theme="dark"] .eif-another-title{ color:#f3ecff; }
[data-theme="dark"] .eif-label, [data-theme="dark"] .eif-another-name{ color:#e8e0f8; }
[data-theme="dark"] .eif-opt, [data-theme="dark"] .eif-another-date{ color:#c9a3d9; }
[data-theme="dark"] .eif-help, [data-theme="dark"] .eif-foot-note, [data-theme="dark"] .eif-success-text, [data-theme="dark"] .eif-consent-text{ color:#cbd5e1; }
[data-theme="dark"] .eif-event-card{ background:linear-gradient(180deg,#1f1330 0%,#1a102a 100%); border-color:rgba(155,109,190,0.25); }
[data-theme="dark"] .eif-chip-date{ background:#4B1E56; }
[data-theme="dark"] .eif-chip-brand{ color:#e8d5f0; background:rgba(75,30,86,0.3); border-color:rgba(155,109,190,0.35); }
[data-theme="dark"] .eif-input{ background:#140c1f; border-color:rgba(155,109,190,0.3); color:#e8e0f8; }
[data-theme="dark"] .eif-input::placeholder{ color:rgba(232,224,248,0.38); }
[data-theme="dark"] .eif-input:focus{ background:#1a1129; border-color:#D7B264; box-shadow:0 0 0 4px rgba(215,178,100,0.15); }
[data-theme="dark"] .eif-input option{ color:#1c1630; }
[data-theme="dark"] .eif-select-wrap::after{ border-color:#d9a8cd; }
[data-theme="dark"] .has-error .eif-input{ background:#2a1218; }
[data-theme="dark"] .eif-error{ color:#ff9b87; }
[data-theme="dark"] .eif-chip{ background:#140c1f; border-color:rgba(155,109,190,0.3); color:#d9a8cd; }
[data-theme="dark"] .eif-chip.on{ background:#D7B264; border-color:#D7B264; color:#fff; }
[data-theme="dark"] .eif-consent{ background:#140c1f; border-color:rgba(155,109,190,0.28); }
[data-theme="dark"] .eif-consent.on{ background:rgba(215,178,100,0.12); border-color:#D7B264; }
[data-theme="dark"] .eif-consent.has-error{ background:#2a1218; border-color:#ff9b87; }
[data-theme="dark"] .eif-box{ background:#0d0614; border-color:rgba(217,168,205,0.5); }
[data-theme="dark"] .eif-consent.on .eif-box{ background:#D7B264; border-color:#D7B264; }
[data-theme="dark"] .eif-link{ color:#e8b8f0; }
[data-theme="dark"] .eif-notice{ color:#f0e4c6; background:rgba(215,178,100,0.12); }
[data-theme="dark"] .eif-another-item{ background:#140c1f; border-color:rgba(155,109,190,0.28); color:#e8b8f0; }
[data-theme="dark"] .eif-another-item:hover{ background:rgba(215,178,100,0.1); border-color:#D7B264; }
[data-theme="dark"] .eif-btn-ghost{ color:#fff; }
[data-theme="dark"] .eif-done-wrap > .eif-close{ background:#241735; color:#d9a8cd; }
`;