import { useState, useRef, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

// Listing types (from the Hub's Events section)
const EVENT_CATEGORIES = [
  "All Events",
  "Community",
  "Sports & Youth",
  "Business & Networking",
  "Workshops & Leadership",
  "Corporate & Professional",
] as const;
type EventCategory = typeof EVENT_CATEGORIES[number];

type EventItem = {
  day: string;
  month: string;
  tag: string;
  category: Exclude<EventCategory, "All Events">;
  title: string;
  desc: string;
  location: string;
  price: string;
  registrationUrl: string;
};

// RSVP form types (for the full event detail page below the listing)
interface RSVPForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guests: string;
  dietary: string;
  agree: boolean;
}

interface RSVPErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  guests?: string;
  agree?: string;
}

const emptyForm = (): RSVPForm => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  guests: "1",
  dietary: "",
  agree: false,
});

function validateForm(data: RSVPForm): RSVPErrors {
  const errors: RSVPErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (data.phone && !/^\+?[\d\s\-().]{7,}$/.test(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!data.guests) errors.guests = "Please select a party size.";
  if (!data.agree) errors.agree = "You must agree to the Event Guidelines.";
  return errors;
}

/* ─── Content ───────────────────────────────────────────────────────────── */

// Demo events only — final Perth event listings to be confirmed by Hannah.
const EVENTS: EventItem[] = [
  {
    day: "14",
    month: "JUN 2025",
    tag: "Conference",
    category: "Business & Networking",
    title: "Rise Summit: Women in Leadership",
    desc: "A full-day summit for leaders, innovators, and changemakers across Perth's business community.",
    location: "Perth, WA",
    price: "$149",
    registrationUrl: "#",
  },
  {
    day: "22",
    month: "JUL 2025",
    tag: "Cultural Celebration",
    category: "Community",
    title: "Harmony Perth: Cultural Festival",
    desc: "A celebration of Perth's CALD communities with food, performance, and shared stories.",
    location: "Fremantle, WA",
    price: "Free",
    registrationUrl: "#",
  },
  {
    day: "08",
    month: "AUG 2025",
    tag: "Gala",
    category: "Corporate & Professional",
    title: "Ellevation Hub Annual Gala",
    desc: "An elegant evening celebrating community achievements and forging new connections.",
    location: "Perth CBD, WA",
    price: "$199",
    registrationUrl: "#",
  },
  {
    day: "15",
    month: "SEP 2025",
    tag: "Youth Program",
    category: "Sports & Youth",
    title: "Young Futures Sports & Leadership Day",
    desc: "A day of sport, mentorship, and leadership activities for youth aged 13–18.",
    location: "Joondalup, WA",
    price: "Free",
    registrationUrl: "#",
  },
  {
    day: "20",
    month: "OCT 2025",
    tag: "Workshop",
    category: "Workshops & Leadership",
    title: "Professional Pathways Leadership Workshop",
    desc: "Hands-on sessions with employers, mentors, and professional development resources.",
    location: "Perth, WA",
    price: "$49",
    registrationUrl: "#",
  },
  {
    day: "08",
    month: "NOV 2025",
    tag: "Networking",
    category: "Business & Networking",
    title: "Small Business Growth Mixer",
    desc: "An evening of networking, business tips, and connection for Hub directory members.",
    location: "Perth, WA",
    price: "$29",
    registrationUrl: "#",
  },
  {
    day: "22",
    month: "NOV 2025",
    tag: "Independence Celebration",
    category: "Community",
    title: "Community Independence Day Celebration",
    desc: "Marking independence and heritage with music, food, and community storytelling.",
    location: "Perth, WA",
    price: "Free",
    registrationUrl: "#",
  },
  {
    day: "08",
    month: "DEC 2025",
    tag: "Corporate Breakfast",
    category: "Corporate & Professional",
    title: "Year-End Corporate Partners Breakfast",
    desc: "Reflecting on the year's impact with corporate partners and setting intentions ahead.",
    location: "Perth, WA",
    price: "$39",
    registrationUrl: "#",
  },
];

const SCHEDULE = [
  { time: "5:30 PM", title: "Doors Open & Welcome Reception", detail: "Check in, mingle, and enjoy a curated selection of light bites and drinks." },
  { time: "6:15 PM", title: "Opening Remarks", detail: "A word from the Ellevation founders on this season's theme." },
  { time: "6:45 PM", title: "Fireside Conversation", detail: "An intimate conversation with our Luminary guest of honor." },
  { time: "7:30 PM", title: "Roundtable Circles", detail: "Small-group discussions guided by Ellevation mentors." },
  { time: "8:15 PM", title: "Open Networking", detail: "Connect freely with the room over dessert and champagne." },
  { time: "9:00 PM", title: "Closing Toast", detail: "We close the evening together, glass in hand." },
];

const HIGHLIGHTS = [
  { icon: "✦", title: "Curated Circle", text: "A capped guest list of ambitious women, hand-selected across industries." },
  { icon: "◈", title: "Guest of Honor", text: "A candid fireside chat with a Luminary member shaping her field." },
  { icon: "❖", title: "Evening Details", text: "Seasonal fare, live music, and a setting designed to be remembered." },
];

const EVENT_INFO = [
  { label: "DATE", value: "Sat, September 12" },
  { label: "TIME", value: "5:30 – 9:00 PM" },
  { label: "VENUE", value: "The Hearth, Manhattan" },
  { label: "DRESS CODE", value: "Cocktail Attire" },
];

/* ── Event card (Hub style) ── */
function HubEventCard({ e, onRegister }: { e: EventItem; index: number; onRegister: (e: EventItem) => void }) {
  return (
    <div className="hub-events-card" style={evs.card}>
      <span className="hub-events-date-badge" style={evs.dateBadge}>{e.day} {e.month}</span>
      <span className="hub-events-category-pill" style={evs.categoryPill}>{e.category}</span>
      <span className="hub-events-category" style={evs.category}>{e.tag} · {e.location} · {e.price}</span>
      <h3 className="hub-events-card-title" style={evs.cardTitle}>{e.title}</h3>
      <p className="hub-events-card-text" style={evs.cardText}>{e.desc}</p>
      <button className="hub-events-rsvp-btn" style={evs.rsvpBtn} onClick={() => onRegister(e)}>REGISTER NOW</button>
    </div>
  );
}

/* Quick Registration modal: collects the essentials, then hands off to the
   event's own registration page/form. */
function QuickRegistrationModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={evs.modalOverlay}
      onClick={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}
    >
      <div className="hub-events-modal" style={evs.modalCard}>
        <button aria-label="Close" className="hub-events-modal-close" onClick={onClose} style={evs.modalClose}>✕</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 8px 8px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <h3 className="hub-events-modal-title" style={evs.modalTitle}>You're on the list</h3>
            <p className="hub-events-modal-sub" style={evs.modalSub}>
              Your quick registration for <strong>{event.title}</strong> has been received. Continue below to complete your official spot on the event's registration page.
            </p>
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              style={evs.modalCtaLink}
            >
              CONTINUE TO FULL REGISTRATION →
            </a>
          </div>
        ) : (
          <>
            <span className="hub-events-modal-date-badge" style={evs.modalDateBadge}>{event.day} {event.month} · {event.location}</span>
            <h3 className="hub-events-card-title hub-events-modal-title" style={evs.modalTitle}>{event.title}</h3>
            <p className="hub-events-modal-sub" style={evs.modalSub}>Quick registration — we'll confirm your spot and send you the full event details.</p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
              <input className="form-input" required placeholder="Full Name" />
              <input className="form-input" type="email" required placeholder="Email Address" />
              <input className="form-input" type="tel" placeholder="Phone Number (optional)" />
              <select className="form-input" defaultValue="1">
                <option value="1">1 attendee</option>
                <option value="2">2 attendees</option>
                <option value="3">3 attendees</option>
                <option value="4">4+ attendees</option>
              </select>
              <button type="submit" style={evs.modalSubmitBtn}>SUBMIT QUICK REGISTRATION</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Events listing section — identical to the Hub's EventsSection ── */
function EventsSection({ events = [] }: { events?: EventItem[] }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All Events");
  const [registering, setRegistering] = useState<EventItem | null>(null);

  const filteredEvents = activeCategory === "All Events"
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section className="hub-events-section" style={{ ...evs.section, position: "relative", overflow: "hidden" }}>
      {/* Decorative ambient blurs */}
      <div className="hub-events-blob-1" style={{ position: "absolute", top: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(75,30,86,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="hub-events-blob-2" style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,191,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ ...evs.container, position: "relative", zIndex: 1 }}>
        <p className="hub-events-eye" style={evs.eye}>UPCOMING EVENTS · PERTH</p>
<h2 className="hub-events-title" style={evs.title}>
  Gather Across the{" "}
  <span style={{ color: "#EFBF68" }}>Ecosystem</span>
</h2>        <p className="hub-events-sub" style={evs.sub}>
          Community celebrations, sport and youth activities, business networking, workshops, and corporate events — all in one calendar. Listings below are demo events pending final confirmation.
        </p>

        <div style={evs.filterRow}>
          {EVENT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`hub-events-filter${activeCategory === cat ? " active" : ""}`}
              style={{ ...evs.filterBtn, ...(activeCategory === cat ? evs.filterBtnActive : {}) }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <p className="hub-events-empty" style={{ fontFamily: "'Montserrat',sans-serif", color: "#5a4070", padding: "24px 0" }}>
            No events in this category yet — check back soon.
          </p>
        ) : (
          <div style={evs.grid}>
            {filteredEvents.map((e, i) => (
              <HubEventCard key={e.title || i} e={e} index={i} onRegister={setRegistering} />
            ))}
          </div>
        )}
      </div>

      {registering && (
        <QuickRegistrationModal event={registering} onClose={() => setRegistering(null)} />
      )}
    </section>
  );
}

/* ─── Full event detail + RSVP page (featured event) ───────────────────── */
/* Not yet mounted on the page below — kept ready (and exported) for when
   the featured-event flow is wired back in. */
export function EventDetailAndRSVP() {
  const [form, setForm] = useState<RSVPForm>(emptyForm());
  const [errors, setErrors] = useState<RSVPErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof RSVPForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof RSVPErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorEl = formRef.current?.querySelector("[data-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="hub-event-root" style={ev.root}>
      {/* ── HERO ── */}
      <section id="rise-summit" style={ev.hero}>
        <div style={ev.heroOverlay} />
        <div style={ev.heroBlobTL} />
        <div style={ev.heroBlobBR} />
        <div className="hub-event-hero-content" style={ev.heroContent}>
          <div style={ev.badgeRow}>
            <span className="hub-event-date-badge" style={ev.dateBadge}>SAT, SEP 12</span>
            <span className="hub-event-category-pill" style={ev.categoryPill}>Business &amp; Networking</span>
          </div>
          <p className="hub-event-hero-eyebrow" style={ev.eyebrowText}>ELLEVATION HUB PRESENTS</p>
          <h1 style={ev.heroTitle}>The Rise Summit</h1>
          <p style={ev.heroSub}>
            An evening of candid conversation, real connection, and the kind
            of room you leave a little braver than you arrived.
          </p>
        </div>
      </section>

      {/* ── EVENT INFO STRIP ── */}
      <section className="hub-event-info-section" style={ev.infoSection}>
        <div className="hub-event-info-grid" style={ev.infoGrid}>
          {EVENT_INFO.map((item) => (
            <div key={item.label} className="hub-event-info-strip" style={ev.infoCard}>
              <span className="hub-event-info-label" style={ev.infoLabel}>{item.label}</span>
              <span className="hub-event-info-value" style={ev.infoValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="hub-event-highlights-section" style={ev.section}>
        <p className="hub-event-section-eye" style={ev.eyebrowLabel}>WHAT TO EXPECT</p>
        <h2 className="hub-event-section-title" style={ev.sectionTitle}>
          A Night Built With Intention
        </h2>

        <div className="hub-event-highlights-grid" style={ev.highlightsGrid}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="hub-event-highlight-card" style={ev.highlightCard}>
              <div style={ev.highlightIcon}>{h.icon}</div>
              <h3 className="hub-event-highlight-title" style={ev.highlightTitle}>{h.title}</h3>
              <p className="hub-event-highlight-text" style={ev.highlightText}>{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="hub-event-schedule-section" style={{ ...ev.section, background: "#f6f3fa" }}>
        <p className="hub-event-section-eye" style={ev.eyebrowLabel}>RUN OF SHOW</p>
        <h2 className="hub-event-section-title" style={ev.sectionTitle}>
          The Evening, Hour by Hour
        </h2>

        <div style={ev.timeline}>
          {SCHEDULE.map((item, i) => (
            <div key={item.time} style={ev.timelineRow}>
              <div style={ev.timelineTimeCol}>
                <span className="hub-event-timeline-time" style={ev.timelineTime}>{item.time}</span>
              </div>
              <div style={ev.timelineMarkerCol}>
                <span className="hub-event-timeline-dot" style={ev.timelineDot} />
                {i !== SCHEDULE.length - 1 && (
                  <span className="hub-event-timeline-line" style={ev.timelineLine} />
                )}
              </div>
              <div style={ev.timelineContentCol}>
                <h4 className="hub-event-timeline-title" style={ev.timelineTitle}>{item.title}</h4>
                <p className="hub-event-timeline-detail" style={ev.timelineDetail}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RSVP FORM ── */}
      <section id="rsvp" className="hub-event-form-section" style={ev.formSection}>
        <div style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
          <p className="hub-event-section-eye" style={ev.eyebrowLabel}>RSVP</p>
          <h2 className="hub-event-section-title" style={{ ...ev.sectionTitle, marginBottom: 12 }}>
            Reserve Your Seat
          </h2>
          <p className="hub-event-form-intro" style={ev.formIntro}>
            Seating is limited to keep the room intimate. We'll confirm your
            spot by email within 48 hours.
          </p>

          <div ref={formRef} className="hub-event-form-card" style={ev.formCard}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 8px" }}>
                <div style={ev.successIcon}>✦</div>
                <h3 className="hub-event-success-title" style={ev.successTitle}>You're On The List</h3>
                <p className="hub-event-success-text" style={ev.successText}>
                  Thank you, <strong>{form.firstName}</strong>. A confirmation
                  is on its way to <strong>{form.email}</strong>. We can't
                  wait to see you at The Rise Summit.
                </p>
                <button
                  style={ev.submitBtn}
                  onClick={() => { setSubmitted(false); setForm(emptyForm()); }}
                >
                  RSVP ANOTHER GUEST
                </button>
              </div>
            ) : (
              <>
                <div className="hub-event-row" style={ev.row}>
                  <div style={ev.fieldWrap}>
                    <input
                      className="hub-event-input"
                      style={{ ...ev.input, ...(errors.firstName ? ev.inputError : {}) }}
                      placeholder="First Name *"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      data-error={errors.firstName ? "true" : undefined}
                    />
                    {errors.firstName && <span style={ev.errorMsg}>{errors.firstName}</span>}
                  </div>
                  <div style={ev.fieldWrap}>
                    <input
                      className="hub-event-input"
                      style={{ ...ev.input, ...(errors.lastName ? ev.inputError : {}) }}
                      placeholder="Last Name *"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      data-error={errors.lastName ? "true" : undefined}
                    />
                    {errors.lastName && <span style={ev.errorMsg}>{errors.lastName}</span>}
                  </div>
                </div>

                <div style={ev.fieldWrap}>
                  <input
                    className="hub-event-input"
                    style={{ ...ev.input, ...(errors.email ? ev.inputError : {}) }}
                    placeholder="Email Address *"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    data-error={errors.email ? "true" : undefined}
                  />
                  {errors.email && <span style={ev.errorMsg}>{errors.email}</span>}
                </div>

                <div className="hub-event-row" style={ev.row}>
                  <div style={ev.fieldWrap}>
                    <input
                      className="hub-event-input"
                      style={{ ...ev.input, ...(errors.phone ? ev.inputError : {}) }}
                      placeholder="Phone Number"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    {errors.phone && <span style={ev.errorMsg}>{errors.phone}</span>}
                  </div>
                  <div style={ev.fieldWrap}>
                    <select
                      className="hub-event-input"
                      style={{ ...ev.input, ...ev.select, ...(errors.guests ? ev.inputError : {}) }}
                      value={form.guests}
                      onChange={(e) => handleChange("guests", e.target.value)}
                      data-error={errors.guests ? "true" : undefined}
                    >
                      <option value="1">Just Me</option>
                      <option value="2">Me + 1 Guest</option>
                      <option value="3">Me + 2 Guests</option>
                    </select>
                    {errors.guests && <span style={ev.errorMsg}>{errors.guests}</span>}
                  </div>
                </div>

                <div style={ev.fieldWrap}>
                  <input
                    className="hub-event-input"
                    style={ev.input}
                    placeholder="Dietary restrictions (optional)"
                    value={form.dietary}
                    onChange={(e) => handleChange("dietary", e.target.value)}
                  />
                </div>

                <div style={ev.agreeRow} data-error={errors.agree ? "true" : undefined}>
                  <label style={ev.agreeLabel}>
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={(e) => handleChange("agree", e.target.checked)}
                      style={ev.checkbox}
                    />
                    <span className="hub-event-agree-text" style={ev.agreeText}>
                      I agree to the Ellevation{" "}
                      <a href="#" style={ev.agreeLink}>Event Guidelines</a>{" "}
                      and understand seats are non-transferable.
                    </span>
                  </label>
                  {errors.agree && <span style={ev.errorMsg}>{errors.agree}</span>}
                </div>

                <button style={ev.submitBtn} onClick={handleSubmit}>
                  CONFIRM MY SEAT
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Root page: Hub-style Events listing + full detail/RSVP for the featured event ── */
export default function EllevationEventsPage() {
  // ✅ Sync with the theme saved by EllevationNavbar on mount (same pattern as About page)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", saved ?? "light");
  }, []);

  return (
    <div className="hub-events-root" style={{ fontFamily: "'Montserrat',sans-serif", background: "#fdf9fc", minHeight: "100vh", color: "#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

        /* Astrid Regular is a licensed/custom display font (not on Google Fonts).
           Replace the src url below with the path to your actual font file. */
        @font-face {
          font-family: 'Astrid Regular';
          src: url('/fonts/AstridRegular.woff2') format('woff2'),
               url('/fonts/AstridRegular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus, select:focus, textarea:focus { border-color: #4B1E56!important; box-shadow: 0 0 0 3px rgba(75,30,86,0.1); outline:none; }
        button:hover { opacity: 0.92; }
        .hub-event-highlight-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hub-event-highlight-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(124,92,191,0.12); }

        @keyframes floatBlob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-15px) scale(1.04); } 66% { transform: translate(-10px,10px) scale(0.97); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .hub-event-hero-content { animation: fadeSlideUp 0.9s ease both; }

        .form-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 14px;
          border: 1.5px solid rgba(124,92,191,0.15);
          background: #fdfbfe;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #1c1630;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input:focus { border-color: #4B1E56; background: #fff; box-shadow: 0 4px 12px rgba(75,30,86,0.08); }

        @media (max-width: 720px) {
          .hub-event-info-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hub-event-highlights-grid { grid-template-columns: 1fr !important; }
          .hub-event-row { grid-template-columns: 1fr !important; }
          .hub-events-section .hub-events-title ~ div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .hub-events-root {
          background: #0d0614 !important;
          color: #e8e0f8 !important;
        }

        /* Events listing section */
        [data-theme="dark"] .hub-events-section {
          background: #0d0614 !important;
        }
        [data-theme="dark"] .hub-events-blob-1,
        [data-theme="dark"] .hub-events-blob-2 {
          opacity: 0.6;
        }
        [data-theme="dark"] .hub-events-eye {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-title {
          color: #ffffff !important;
        }
        [data-theme="dark"] .hub-events-sub {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .hub-events-empty {
          color: #d9a8cd !important;
        }

        /* Filter buttons */
        [data-theme="dark"] .hub-events-filter {
          background: #160d22 !important;
          border-color: rgba(155, 109, 190, 0.3) !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-filter.active {
          background: linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%) !important;
          border-color: #4B1E56 !important;
          color: #fff !important;
        }

        /* Event cards */
        [data-theme="dark"] .hub-events-card {
          background: rgba(22, 13, 34, 0.85) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35) !important;
        }
        [data-theme="dark"] .hub-events-date-badge {
          background: #4B1E56 !important;
        }
        [data-theme="dark"] .hub-events-category-pill {
          color: #e8d5f0 !important;
          background: rgba(75,30,86,0.25) !important;
          border-color: rgba(155,109,190,0.35) !important;
        }
        [data-theme="dark"] .hub-events-category {
          color: #c9a3d8 !important;
        }
        [data-theme="dark"] .hub-events-card-title {
          color: #ffffff !important;
        }
        [data-theme="dark"] .hub-events-card-text {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .hub-events-rsvp-btn {
          border-color: #ffffff !important;
          color: #ffffff !important;
        }
        [data-theme="dark"] .hub-events-rsvp-btn:hover {
          background: #4B1E56 !important;
        }

        /* Quick registration modal */
        [data-theme="dark"] .hub-events-modal {
          background: #160d22 !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55) !important;
        }
        [data-theme="dark"] .hub-events-modal-close {
          background: #241735 !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-modal-date-badge {
          color: #c9a3d8 !important;
        }
        [data-theme="dark"] .hub-events-modal-title {
          color: #ffffff !important;
        }
        [data-theme="dark"] .hub-events-modal-sub {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .form-input {
          background: #140c1f !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .form-input::placeholder {
          color: rgba(232, 224, 248, 0.35) !important;
        }
        [data-theme="dark"] .form-input:focus {
          background: #1a1129 !important;
        }

        /* ── Full event detail + RSVP page (currently unmounted, styled for future use) ── */
        [data-theme="dark"] .hub-event-info-section,
        [data-theme="dark"] .hub-event-highlights-section {
          background: #0d0614 !important;
        }
        [data-theme="dark"] .hub-event-schedule-section {
          background: #160d22 !important;
        }
        [data-theme="dark"] .hub-event-form-section {
          background: #0d0614 !important;
        }
        [data-theme="dark"] .hub-event-section-eye {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-event-section-title {
          color: #ffffff !important;
        }
        [data-theme="dark"] .hub-event-info-strip {
          background: rgba(22, 13, 34, 0.85) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
        }
        [data-theme="dark"] .hub-event-info-label {
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-event-info-value {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-event-highlight-card {
          background: rgba(22, 13, 34, 0.85) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
        }
        [data-theme="dark"] .hub-event-highlight-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-event-highlight-text {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .hub-event-timeline-time {
          color: #ffffff !important;
        }
        [data-theme="dark"] .hub-event-timeline-dot {
          background: #ffffff !important;
        }
        [data-theme="dark"] .hub-event-timeline-line {
          background: rgba(155, 109, 190, 0.25) !important;
        }
        [data-theme="dark"] .hub-event-timeline-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-event-timeline-detail {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .hub-event-form-intro {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .hub-event-form-card {
          background: rgba(22, 13, 34, 0.9) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4) !important;
        }
        [data-theme="dark"] .hub-event-input {
          background: #140c1f !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-event-input::placeholder {
          color: rgba(232, 224, 248, 0.35) !important;
        }
        [data-theme="dark"] .hub-event-agree-text {
          color: #cbd5e1 !important;
        }
        [data-theme="dark"] .hub-event-success-title {
          color: #e8e0f8 !important;
        }
        [data-theme="dark"] .hub-event-success-text {
          color: #cbd5e1 !important;
        }
      `}</style>

      <EventsSection events={EVENTS} />
      {/* <EventDetailAndRSVP /> */}
    </div>
  );
}

// ─── STYLES: evs = Hub's Events section tokens (retoned to match the Conversations page palette) ────────────────
const evs: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" },
  title: { fontFamily: "'Astrid Regular',serif", fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "1rem", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, textAlign: "left" },
  card: { padding: "28px 26px", background: "rgba(255,255,255,0.75)", borderRadius: 24, border: "1px solid rgba(124, 92, 191, 0.15)", display: "flex", flexDirection: "column", gap: 0, boxShadow: "0 10px 30px rgba(124, 92, 191, 0.02)" },
  dateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: "#1a0a2e", padding: "5px 12px", borderRadius: 100, marginBottom: 12, width: "fit-content" },
  categoryPill: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "4px 11px", borderRadius: 100, marginBottom: 10, width: "fit-content" },
  category: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "#9b7db8", marginBottom: 8 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.25rem", color: "#4B1E56", marginBottom: 8 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem", color: "#554866", lineHeight: 1.6, marginBottom: 20, flexGrow: 1 },
rsvpBtn: {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  padding: "12px",
  borderRadius: 100,
  border: "2px solid #D7238F",
  background: "#D7238F",
  color: "#FFFFFF",
  cursor: "pointer",
  marginTop: "auto",
  transition: "all 0.2s ease",
},  filterRow: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" as const, marginBottom: 40 },
  filterBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.04em", padding: "10px 18px", borderRadius: 100, border: "1.5px solid rgba(124, 92, 191, 0.2)", background: "#fff", color: "#554866", cursor: "pointer", transition: "all 0.2s ease" },
  filterBtnActive: { background: "#d7238f", borderColor: "#4B1E56", color: "#fff", boxShadow: "0 4px 16px rgba(75,30,86,0.3)" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(20,10,34,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 },
  modalCard: { background: "#fff", borderRadius: 22, padding: "36px 32px", maxWidth: 440, width: "100%", position: "relative", boxShadow: "0 24px 64px rgba(124,92,191,0.18)" },
  modalClose: { position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: "50%", border: "none", background: "#f6f3fa", color: "#662369", fontSize: "0.85rem", cursor: "pointer" },
  modalDateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "#9b7db8", marginBottom: 10 },
  modalTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "1.5rem", color: "#1a0a2e", marginBottom: 10, textAlign: "left" },
  modalSub: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: "#554866", lineHeight: 1.6, textAlign: "left" },
  modalSubmitBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", padding: "14px", borderRadius: 100, border: "none", background: "linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%)", color: "#fff", cursor: "pointer", marginTop: 4, boxShadow: "0 4px 14px rgba(75, 30, 86, 0.25)" },
  modalCtaLink: { display: "inline-block", marginTop: 20, fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: "linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%)", padding: "14px 24px", borderRadius: 100, textDecoration: "none" },
};

// ─── STYLES: ev = full event detail / RSVP page tokens (retoned to match the Conversations page palette) ─
const NAVY = "#1a0a2e";
const PLUM = "#4B1E56";

const ev: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'Montserrat', sans-serif", background: "#fdf9fc", color: NAVY, overflowX: "hidden" },

  hero: {
    position: "relative", overflow: "hidden", padding: "140px 24px 90px", textAlign: "center",
    display: "flex", alignItems: "center", justifyContent: "center", background:"#FFFAED",
  },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(22,10,34,0.85) 0%, rgba(38,18,63,0.55) 100%)", zIndex: 0 },
  heroBlobTL: { position: "absolute", top: -100, left: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(75,30,86,0.3) 0%, transparent 70%)", animation: "floatBlob 10s ease-in-out infinite", zIndex: 1 },
  heroBlobBR: { position: "absolute", bottom: -100, right: -70, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,191,0.28) 0%, transparent 70%)", animation: "floatBlob 13s ease-in-out infinite reverse", zIndex: 1 },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 720 },

  badgeRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 22, flexWrap: "wrap" as const },
  dateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: NAVY, padding: "5px 12px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.25)" },
  categoryPill: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#f0d9f5", background: "rgba(75,30,86,0.3)", border: "1px solid rgba(155,109,190,0.35)", padding: "4px 11px", borderRadius: 100 },

  eyebrowText: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", color: "#c98fd6", marginBottom: 16, textTransform: "uppercase" as const },
  heroTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "clamp(2.8rem, 6vw, 4.6rem)", fontWeight: 500, color: "#fff", lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.01em" },
  heroSub: { fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", fontWeight: 400, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" },

  infoSection: { maxWidth: 1000, margin: "0 auto", padding: "0 24px", transform: "translateY(-40px)" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  infoCard: { display: "flex", flexDirection: "column", gap: 6, background: "rgba(255,255,255,0.9)", border: "1px solid rgba(124, 92, 191, 0.15)", borderRadius: 18, padding: "20px 22px", boxShadow: "0 8px 32px rgba(124,92,191,0.1)" },
  infoLabel: { fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "#662369" },
  infoValue: { fontFamily: "'Astrid Regular', serif", fontSize: "1.2rem", fontWeight: 600, color: NAVY },

  section: { padding: "100px 48px", background: "#fff", textAlign: "center" },
  eyebrowLabel: { fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" as const },
  sectionTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 500, color: PLUM, marginBottom: 48, lineHeight: 1.1 },

  highlightsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" },
  highlightCard: { background: "rgba(255,255,255,0.75)", border: "1px solid rgba(124, 92, 191, 0.15)", borderRadius: 24, padding: "28px 26px", textAlign: "left" },
  highlightIcon: { fontSize: "1.5rem", color: PLUM, marginBottom: 14 },
  highlightTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "1.25rem", fontWeight: 600, color: NAVY, marginBottom: 8 },
  highlightText: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem", fontWeight: 400, color: "#554866", lineHeight: 1.6 },

  timeline: { display: "flex", flexDirection: "column", maxWidth: 680, margin: "0 auto" },
  timelineRow: { display: "grid", gridTemplateColumns: "84px 22px 1fr", textAlign: "left" },
  timelineTimeCol: { display: "flex", justifyContent: "flex-end", paddingRight: 16, paddingTop: 2 },
  timelineTime: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.04em", color: PLUM, whiteSpace: "nowrap" },
  timelineMarkerCol: { display: "flex", flexDirection: "column", alignItems: "center" },
  timelineDot: { width: 9, height: 9, borderRadius: "50%", background: PLUM, marginTop: 5, flexShrink: 0 },
  timelineLine: { width: 1.5, flex: 1, background: "rgba(124, 92, 191, 0.2)", marginTop: 4, marginBottom: 4 },
  timelineContentCol: { paddingBottom: 30, paddingLeft: 4 },
  timelineTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "1.2rem", fontWeight: 600, color: NAVY, marginBottom: 4 },
  timelineDetail: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.86rem", fontWeight: 400, color: "#554866", lineHeight: 1.6 },

  formSection: { padding: "100px 24px 120px", background: "#fff", display: "flex", justifyContent: "center", textAlign: "center" },
  formIntro: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem", fontWeight: 400, color: "#554866", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.8 },
  formCard: { background: "rgba(255,255,255,0.9)", borderRadius: 24, padding: "44px 40px", boxShadow: "0 10px 30px rgba(124, 92, 191, 0.08)", border: "1px solid rgba(124, 92, 191, 0.15)", textAlign: "left" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fieldWrap: { display: "flex", flexDirection: "column", marginBottom: 16 },
  input: { width: "100%", fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", padding: "13px 16px", borderRadius: 14, border: "1.5px solid rgba(124, 92, 191, 0.15)", background: "#fdfbfe", color: NAVY, transition: "all 0.2s ease" },
  inputError: { borderColor: "#c0705a !important" as any, background: "#fff8f6" },
  select: { appearance: "none" as const, cursor: "pointer" },
  errorMsg: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#c0705a", marginTop: 5, paddingLeft: 4 },

  agreeRow: { marginBottom: 26, marginTop: 4 },
  agreeLabel: { display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" },
  checkbox: { marginTop: 3, accentColor: PLUM, width: 15, height: 15, flexShrink: 0 },
  agreeText: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.83rem", color: "#554866", lineHeight: 1.5 },
  agreeLink: { textDecoration: "underline", textUnderlineOffset: "2px", color: PLUM, fontWeight: 600 },

  submitBtn: { width: "100%", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", color: "#fff", border: "none", borderRadius: 100, padding: "16px 24px", cursor: "pointer", background: "linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%)", boxShadow: "0 4px 14px rgba(75, 30, 86, 0.25)", transition: "all 0.2s ease" },

  successIcon: { fontSize: "2.2rem", marginBottom: 14, color: PLUM },
  successTitle: { fontFamily: "'Astrid Regular', serif", fontSize: "1.8rem", fontWeight: 500, color: NAVY, marginBottom: 12 },
  successText: { fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem", color: "#554866", lineHeight: 1.7, marginBottom: 28 },
};