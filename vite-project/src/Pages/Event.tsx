import { useState, useEffect } from "react";
import EventInterestModal from "./EventInterestModal";
import {
  EVENTS,
  EVENT_CATEGORIES,
  EVENT_CTA,
  type EventCategory,
  type EventItem,
} from "./eventsData";

/* ── Event card ── */
function HubEventCard({ e, onRegister }: { e: EventItem; onRegister: (e: EventItem) => void }) {
  return (
    <div className="hub-events-card" style={evs.card}>
      <span className="hub-events-date-badge" style={evs.dateBadge}>{e.date}</span>
      <span className="hub-events-category-pill" style={evs.categoryPill}>{e.category}</span>
      <span className="hub-events-category" style={evs.category}>{e.brand}</span>
      <h3 className="hub-events-card-title" style={evs.cardTitle}>{e.title}</h3>
      <p className="hub-events-card-text" style={evs.cardText}>{e.desc}</p>
      <button className="hub-events-rsvp-btn" style={evs.rsvpBtn} onClick={() => onRegister(e)}>
        {EVENT_CTA.toUpperCase()}
      </button>
    </div>
  );
}

/* ── Events listing section ── */
function EventsSection({ events = [] }: { events?: EventItem[] }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All Events");
  const [registering, setRegistering] = useState<EventItem | null>(null);

  // Only show filters that have at least one event (plus "All Events").
  const visibleFilters = EVENT_CATEGORIES.filter(
    c => c === "All Events" || events.some(e => e.category === c)
  );

  const filteredEvents = activeCategory === "All Events"
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section className="hub-events-section" style={{ ...evs.section, position: "relative", overflow: "hidden" }}>
      <div className="hub-events-blob-1" style={{ position: "absolute", top: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(75,30,86,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="hub-events-blob-2" style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,191,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ ...evs.container, position: "relative", zIndex: 1 }}>
        <p className="hub-events-eye" style={evs.eye}>UPCOMING EVENTS · 2027</p>
        <h2 className="hub-events-title" style={evs.title}>
          Gather Across the{" "}
          <span style={{ color: "#EFBF68" }}>Ecosystem</span>
        </h2>
        <p className="hub-events-sub" style={evs.sub}>
          Community celebrations, children and youth programs, business networking, workshops, and corporate events — all in one calendar. Dates shown are proposed and subject to confirmation.
        </p>

        <div style={evs.filterRow}>
          {visibleFilters.map(cat => (
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
          <div className="hub-events-grid" style={evs.grid}>
            {filteredEvents.map(e => (
              <HubEventCard key={e.id} e={e} onRegister={setRegistering} />
            ))}
          </div>
        )}
      </div>

      {registering && (
        <EventInterestModal
          // key resets the form when a different event is opened
          key={registering.id}
          event={registering}
          events={events}
          onClose={() => setRegistering(null)}
        />
      )}
    </section>
  );
}

/* ─── Root page ─────────────────────────────────────────────────────────── */
export default function EllevationEventsPage() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", saved ?? "light");
  }, []);

  useEffect(() => {
    document.title = "Upcoming Events 2027 | Ellevation";

    const description =
      "Explore upcoming Ellevation events for 2027 — community celebrations, children and youth programs, business networking, workshops, and corporate events, all in one calendar.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <div className="hub-events-root" style={{ fontFamily: "'Montserrat',sans-serif", background: "#fdf9fc", minHeight: "100vh", color: "#1a0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

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

        @media (max-width: 900px) {
          .hub-events-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hub-events-section { padding: 56px 24px !important; }
        }

        /* ── Dark Mode Overrides (the form popup carries its own dark styles) ── */
        [data-theme="dark"] .hub-events-root { background: #0d0614 !important; color: #e8e0f8 !important; }
        [data-theme="dark"] .hub-events-section { background: #0d0614 !important; }
        [data-theme="dark"] .hub-events-blob-1,
        [data-theme="dark"] .hub-events-blob-2 { opacity: 0.6; }
        [data-theme="dark"] .hub-events-eye { color: #d9a8cd !important; }
        [data-theme="dark"] .hub-events-title { color: #ffffff !important; }
        [data-theme="dark"] .hub-events-sub { color: #cbd5e1 !important; }
        [data-theme="dark"] .hub-events-empty { color: #d9a8cd !important; }

        [data-theme="dark"] .hub-events-filter {
          background: #160d22 !important;
          border-color: rgba(155, 109, 190, 0.3) !important;
          color: #d9a8cd !important;
        }
        [data-theme="dark"] .hub-events-filter.active {
          background: #D7B264 !important;
          border-color: #D7B264 !important;
          color: #fff !important;
        }

        [data-theme="dark"] .hub-events-card {
          background: rgba(22, 13, 34, 0.85) !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35) !important;
        }
        [data-theme="dark"] .hub-events-date-badge { background: #4B1E56 !important; }
        [data-theme="dark"] .hub-events-category-pill {
          color: #e8d5f0 !important;
          background: rgba(75,30,86,0.25) !important;
          border-color: rgba(155,109,190,0.35) !important;
        }
        [data-theme="dark"] .hub-events-category { color: #c9a3d8 !important; }
        [data-theme="dark"] .hub-events-card-title { color: #ffffff !important; }
        [data-theme="dark"] .hub-events-card-text { color: #cbd5e1 !important; }
      `}</style>

      <EventsSection events={EVENTS} />
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const evs: Record<string, React.CSSProperties> = {
  section: { padding: "100px 48px", background: "#fff" },
  container: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  eye: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 700, color: "#662369", letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" },
  title: { fontFamily: "'Astrid Regular',serif", fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "#4B1E56", marginBottom: 16, lineHeight: 1.1 },
  sub: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 56px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, textAlign: "left" },
  card: { padding: "28px 26px", background: "rgba(255,255,255,0.75)", borderRadius: 24, border: "1px solid rgba(124, 92, 191, 0.15)", display: "flex", flexDirection: "column", gap: 0, boxShadow: "0 10px 30px rgba(124, 92, 191, 0.02)" },
  dateBadge: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: "#1a0a2e", padding: "5px 12px", borderRadius: 100, marginBottom: 12, width: "fit-content" },
  categoryPill: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em", color: "#662369", background: "rgba(75,30,86,0.08)", border: "1px solid rgba(75,30,86,0.18)", padding: "4px 11px", borderRadius: 100, marginBottom: 10, width: "fit-content" },
  category: { display: "inline-block", fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "#9b7db8", marginBottom: 8 },
  cardTitle: { fontFamily: "'Astrid Regular',serif", fontSize: "22px", color: "#4B1E56", marginBottom: 8 },
  cardText: { fontFamily: "'Montserrat',sans-serif", fontSize: "18px", color: "#554866", lineHeight: 1.6, marginBottom: 20, flexGrow: 1 },
  rsvpBtn: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "12px",
    borderRadius: 100,
    border: "2px solid #D7B264",
    background: "#D7B264",
    color: "#FFFFFF",
    cursor: "pointer",
    marginTop: "auto",
    transition: "all 0.2s ease",
  },
  filterRow: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" as const, marginBottom: 40 },
  filterBtn: { fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", padding: "10px 18px", borderRadius: 100, border: "1.5px solid rgba(124, 92, 191, 0.2)", background: "#fff", color: "#554866", cursor: "pointer", transition: "all 0.2s ease" },
  filterBtnActive: { background: "#D7B264", borderColor: "#D7B264", color: "#fff", boxShadow: "0 4px 16px rgba(215,178,100,0.4)" },
};
