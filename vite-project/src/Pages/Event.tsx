import { useState, useEffect } from "react";
import EventInterestModal from "./EventInterestModal";
import {
  EVENTS,
  EVENT_CATEGORIES,
  EVENT_CTA,
  type EventCategory,
  type EventItem,
} from "./eventsData";

/* ── ONE image for ALL event cards ──────────────────────────────────────
   Later: put your approved 16:9 event image in src/assets and change ONLY
   this import line (path + file name). Do not use the full promotional flyer. */
import EVENT_IMAGE from "../../src/assets/Ms Ellevation/_74A8938.jpg";

/* Individual event page link (page to be built). Uses the event id as the slug. */
const eventHref = (e: EventItem) => `/events/${e.id}`;

type ViewMode = "grid" | "list";

/* ── View toggle icons ── */
const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="2" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="2" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="3.8" cy="6" r="1.3" fill="currentColor" />
    <circle cx="3.8" cy="12" r="1.3" fill="currentColor" />
    <circle cx="3.8" cy="18" r="1.3" fill="currentColor" />
  </svg>
);

/* ── Event card (layout follows the brief mock-up) ──
   image → date → category → host → title → description → button → Explore Event */
function HubEventCard({ e, onRegister }: { e: EventItem; onRegister: (e: EventItem) => void }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="hub-events-card">
      <a href={eventHref(e)} className="hub-events-img-wrap" tabIndex={-1} aria-hidden="true">
        {imgFailed ? (
          <span className="hub-events-img-fallback" />
        ) : (
          <img
            src={EVENT_IMAGE}
            alt={`${e.title} — Ellevation event`}
            loading="lazy"
            className="hub-events-img"
            onError={() => setImgFailed(true)}
          />
        )}
      </a>

      <div className="hub-events-body">
        <span className="hub-events-date-badge">{e.date}</span>
        <span className="hub-events-category-pill">{e.category}</span>
        <span className="hub-events-category">{e.brand}</span>

        <h3 className="hub-events-card-title">
          <a href={eventHref(e)}>{e.title}</a>
        </h3>
        <p className="hub-events-card-text">{e.desc}</p>

        <div className="hub-events-actions">
          <button type="button" className="hub-events-rsvp-btn" onClick={() => onRegister(e)}>
            {EVENT_CTA.toUpperCase()}
          </button>
          <a href={eventHref(e)} className="hub-events-explore">Explore Event &gt;</a>
        </div>
      </div>
    </article>
  );
}

/* ── Events listing section ── */
function EventsSection({ events = [] }: { events?: EventItem[] }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All Events");
  const [registering, setRegistering] = useState<EventItem | null>(null);
  const [view, setView] = useState<ViewMode>("grid");

  // Only show filters that have at least one event (plus "All Events").
  const visibleFilters = EVENT_CATEGORIES.filter(
    c => c === "All Events" || events.some(e => e.category === c)
  );

  const filteredEvents = activeCategory === "All Events"
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section className="hub-events-section">
      <div className="hub-events-container">
        <p className="hub-events-eye">UPCOMING EVENTS · 2027</p>
        <h2 className="hub-events-title">
          Gather Across the <span className="hub-events-title-accent">Ecosystem</span>
        </h2>
        <p className="hub-events-sub">
          Community celebrations, children and youth programs, business networking, workshops, and corporate events — all in one calendar. Dates shown are proposed and subject to confirmation.
        </p>

        <div className="hub-events-filter-row" role="group" aria-label="Filter events by category">
          {visibleFilters.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`hub-events-filter${activeCategory === cat ? " active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar: result count + grid/list toggle */}
        <div className="hub-events-toolbar">
          <p className="hub-events-count" aria-live="polite">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
          </p>
          <div className="hub-events-view-toggle" role="group" aria-label="Change layout">
            <button
              type="button"
              className={`hub-events-view-btn${view === "grid" ? " active" : ""}`}
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              <GridIcon /><span>Grid</span>
            </button>
            <button
              type="button"
              className={`hub-events-view-btn${view === "list" ? " active" : ""}`}
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <ListIcon /><span>List</span>
            </button>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <p className="hub-events-empty">No events in this category yet — check back soon.</p>
        ) : (
          <div className={`hub-events-grid${view === "list" ? " is-list" : ""}`}>
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
    <div className="hub-events-root">
      <style>{EVENTS_CSS}</style>
      <EventsSection events={EVENTS} />
    </div>
  );
}

/* ─── STYLES ───────────────────────────────────────────────────────────────
   Fonts and font sizes are unchanged from the current page
   (Montserrat + Astrid Regular). Colours follow the brief:
   section #F7F4FA · cards #FFFFFF · headings/CTA text #451D53
   booking button #D4AD60 · borders/filters #E8DFF0 · body text #51465C
   (verify against official brand guidelines before launch)
   ─────────────────────────────────────────────────────────────────────── */
const EVENTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

@font-face {
  font-family: 'Astrid Regular';
  src: url('/fonts/AstridRegular.woff2') format('woff2'),
       url('/fonts/AstridRegular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.hub-events-root, .hub-events-root *{ box-sizing:border-box; margin:0; padding:0; }
.hub-events-root{ font-family:'Montserrat',sans-serif; background:#F7F4FA; min-height:100vh; color:#51465C; }

/* Section header */
.hub-events-section{ padding:100px 48px; background:#F7F4FA; }
.hub-events-container{ max-width:1100px; margin:0 auto; text-align:center; }
.hub-events-eye{ font-size:14px; font-weight:700; color:#662369; letter-spacing:0.2em; margin-bottom:16px; text-transform:uppercase; }
.hub-events-title{ font-family:'Astrid Regular',serif; font-size:clamp(2.2rem,5vw,3.2rem); font-weight:400; color:#451D53; margin-bottom:16px; line-height:1.1; }
.hub-events-title-accent{ color:#D4AD60; }
.hub-events-sub{ font-size:18px; color:#51465C; line-height:1.8; max-width:640px; margin:0 auto 56px; }

/* Filters */
.hub-events-filter-row{ display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:28px; }
.hub-events-filter{
  font-family:'Montserrat',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.04em;
  padding:10px 18px; border-radius:100px; border:1.5px solid #E8DFF0; background:#fff; color:#51465C;
  cursor:pointer; transition:all .2s ease;
}
.hub-events-filter:hover{ border-color:#D4AD60; }
.hub-events-filter.active{ background:#D4AD60; border-color:#D4AD60; color:#451D53; box-shadow:0 4px 16px rgba(212,173,96,0.4); }
.hub-events-filter:focus-visible, .hub-events-rsvp-btn:focus-visible, .hub-events-explore:focus-visible,
.hub-events-card-title a:focus-visible, .hub-events-view-btn:focus-visible{ outline:3px solid rgba(212,173,96,0.9); outline-offset:2px; }
.hub-events-empty{ color:#5a4070; padding:24px 0; }

/* Toolbar: count + grid/list toggle */
.hub-events-toolbar{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:20px; }
.hub-events-count{ font-size:14px; font-weight:600; color:#51465C; }
.hub-events-view-toggle{ display:inline-flex; padding:4px; gap:4px; background:#fff; border:1.5px solid #E8DFF0; border-radius:100px; }
.hub-events-view-btn{
  display:inline-flex; align-items:center; gap:8px;
  font-family:'Montserrat',sans-serif; font-size:13px; font-weight:600; letter-spacing:0.04em;
  padding:8px 16px; border:none; border-radius:100px; background:transparent; color:#51465C;
  cursor:pointer; transition:all .2s ease;
}
.hub-events-view-btn:hover{ color:#451D53; }
.hub-events-view-btn.active{ background:#D4AD60; color:#451D53; box-shadow:0 3px 10px rgba(212,173,96,0.4); }

/* Grid view: 2 per row on desktop, 1 on tablet/mobile. Equal heights. */
.hub-events-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; text-align:left; align-items:stretch; }

/* Card: white, thin lavender border, rounded corners, subtle shadow */
.hub-events-card{
  display:flex; flex-direction:column; min-width:0; overflow:hidden;
  background:#FFFFFF; border:1px solid #E8DFF0; border-radius:16px;
  box-shadow:0 4px 14px rgba(69,29,83,0.06);
  transition:transform .25s ease, box-shadow .25s ease;
}
.hub-events-card:hover{ transform:translateY(-4px); box-shadow:0 14px 32px rgba(69,29,83,0.14); }

/* Image (16:9) with zoom on hover */
.hub-events-img-wrap{ position:relative; display:block; aspect-ratio:16/9; overflow:hidden; background:#E8DFF0; }
.hub-events-img{ position:absolute; inset:0; display:block; width:100%; height:100%; object-fit:cover; transition:transform .45s ease; }
.hub-events-card:hover .hub-events-img{ transform:scale(1.05); }
.hub-events-img-fallback{ position:absolute; inset:0; display:block; background:linear-gradient(135deg,#6b2f7a 0%,#451D53 60%,#2d1740 100%); }

/* Body */
.hub-events-body{ display:flex; flex-direction:column; flex:1; min-width:0; padding:22px 24px 24px; }
.hub-events-date-badge{ font-family:'Montserrat',sans-serif; font-size:1.15rem; font-weight:700; letter-spacing:0.02em; color:#451D53; text-transform:uppercase; margin-bottom:8px; }
.hub-events-category-pill{ font-family:'Montserrat',sans-serif; font-size:0.72rem; font-weight:600; letter-spacing:0.08em; color:#51465C; text-transform:uppercase; margin-bottom:6px; }
.hub-events-category{ font-family:'Montserrat',sans-serif; font-size:0.8rem; font-weight:500; color:#51465C; margin-bottom:16px; }
.hub-events-card-title{ font-family:'Astrid Regular',serif; font-size:22px; font-weight:400; line-height:1.25; margin-bottom:10px; }
.hub-events-card-title a{ color:#451D53; text-decoration:none; }
.hub-events-card-title a:hover{ text-decoration:underline; text-underline-offset:4px; text-decoration-color:#D4AD60; }
.hub-events-card-text{ font-family:'Montserrat',sans-serif; font-size:18px; color:#51465C; line-height:1.6; margin-bottom:20px; flex-grow:1; } /* keeps buttons aligned across cards */

/* Buttons */
.hub-events-actions{ display:flex; flex-direction:column; gap:14px; }
.hub-events-rsvp-btn{
  display:block; width:100%; text-align:center;
  font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.1em; line-height:1.3;
  padding:14px 12px; border-radius:8px; border:2px solid #D4AD60; background:#D4AD60; color:#451D53;
  cursor:pointer; transition:all .2s ease;
}
.hub-events-rsvp-btn:hover{ filter:brightness(1.05); box-shadow:0 8px 20px rgba(212,173,96,0.45); transform:translateY(-1px); }
.hub-events-explore{ align-self:flex-start; font-family:'Montserrat',sans-serif; font-size:14px; font-weight:500; color:#51465C; text-decoration:none; }
.hub-events-explore:hover{ color:#451D53; text-decoration:underline; text-underline-offset:4px; text-decoration-color:#D4AD60; }

/* ───── List view: one wide row per event (image left, details right) ───── */
.hub-events-grid.is-list{ grid-template-columns:1fr; gap:20px; }
.is-list .hub-events-card{ flex-direction:row; }
.is-list .hub-events-img-wrap{ flex:0 0 36%; aspect-ratio:auto; min-height:240px; }
.is-list .hub-events-body{ justify-content:center; padding:26px 30px; }
.is-list .hub-events-card-text{ flex-grow:0; }
.is-list .hub-events-actions{ flex-direction:row; flex-wrap:wrap; align-items:center; gap:14px 22px; }
.is-list .hub-events-rsvp-btn{ width:auto; padding:14px 28px; }
.is-list .hub-events-explore{ align-self:center; }

/* ───── Responsive ───── */
@media (max-width:900px){
  .hub-events-grid:not(.is-list){ grid-template-columns:1fr; max-width:640px; margin:0 auto; }
}
@media (max-width:768px){
  .hub-events-section{ padding:56px 24px; }
  .hub-events-sub{ margin-bottom:36px; }
  .hub-events-filter-row{ margin-bottom:22px; }
  /* list view stacks image above details on tablets/phones, but stays one-per-row and compact */
  .is-list .hub-events-card{ flex-direction:column; }
  .is-list .hub-events-img-wrap{ flex:none; width:100%; min-height:0; aspect-ratio:21/9; }
  .is-list .hub-events-body{ padding:20px 22px 22px; }
  .is-list .hub-events-card-text{
    display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:16px;
  }
}
@media (max-width:480px){
  .hub-events-section{ padding:44px 16px; }
  .hub-events-grid{ gap:18px; }
  .hub-events-body, .is-list .hub-events-body{ padding:18px 18px 20px; }
  .hub-events-filter{ font-size:13px; padding:9px 14px; }
  .hub-events-view-btn{ padding:8px 13px; }
  .is-list .hub-events-rsvp-btn{ width:100%; }
  .is-list .hub-events-actions{ flex-direction:column; align-items:stretch; gap:14px; }
  .is-list .hub-events-explore{ align-self:flex-start; }
  /* filters scroll sideways on very small screens instead of stacking */
  .hub-events-filter-row{ flex-wrap:nowrap; justify-content:flex-start; overflow-x:auto; margin-left:-16px; margin-right:-16px; padding:0 16px 6px; scrollbar-width:none; -webkit-overflow-scrolling:touch; }
  .hub-events-filter-row::-webkit-scrollbar{ display:none; }
  .hub-events-filter{ flex-shrink:0; white-space:nowrap; }
}
@media (prefers-reduced-motion:reduce){
  .hub-events-card, .hub-events-img, .hub-events-rsvp-btn, .hub-events-filter, .hub-events-view-btn{ transition:none !important; }
  .hub-events-card:hover, .hub-events-card:hover .hub-events-img, .hub-events-rsvp-btn:hover{ transform:none !important; }
}

/* ───── Dark mode (the form popup carries its own dark styles) ───── */
[data-theme="dark"] .hub-events-root,
[data-theme="dark"] .hub-events-section{ background:#0d0614; color:#e8e0f8; }
[data-theme="dark"] .hub-events-eye{ color:#d9a8cd; }
[data-theme="dark"] .hub-events-title{ color:#ffffff; }
[data-theme="dark"] .hub-events-sub, [data-theme="dark"] .hub-events-card-text, [data-theme="dark"] .hub-events-count{ color:#cbd5e1; }
[data-theme="dark"] .hub-events-empty{ color:#d9a8cd; }
[data-theme="dark"] .hub-events-filter{ background:#160d22; border-color:rgba(155,109,190,0.3); color:#d9a8cd; }
[data-theme="dark"] .hub-events-filter.active{ background:#D4AD60; border-color:#D4AD60; color:#451D53; }
[data-theme="dark"] .hub-events-view-toggle{ background:#160d22; border-color:rgba(155,109,190,0.3); }
[data-theme="dark"] .hub-events-view-btn{ color:#d9a8cd; }
[data-theme="dark"] .hub-events-view-btn.active{ background:#D4AD60; color:#451D53; }
[data-theme="dark"] .hub-events-card{ background:rgba(22,13,34,0.92); border-color:rgba(155,109,190,0.25); box-shadow:0 10px 30px rgba(0,0,0,0.35); }
[data-theme="dark"] .hub-events-date-badge, [data-theme="dark"] .hub-events-card-title a{ color:#ffffff; }
[data-theme="dark"] .hub-events-category-pill, [data-theme="dark"] .hub-events-category, [data-theme="dark"] .hub-events-explore{ color:#d9a8cd; }
`;