import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EventInterestModal from "./EventInterestModal";
import { EVENTS, EVENT_CTA, type EventItem } from "./eventsData";
import DEFAULT_IMAGE from "../../src/assets/Ms Ellevation/_74A8938.jpg";

const href = (e: EventItem) => `/events/${e.id}`;

const Pin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const Cal = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const Clock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const Back = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 15V4M8 8l4-4 4 4M5 13v6a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = useMemo(() => EVENTS.find(e => e.id === id), [id]);
  const [registering, setRegistering] = useState<EventItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", saved ?? "light");
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    if (!event) return;
    document.title = `${event.title} | Ellevation`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", event.desc);
  }, [event]);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: event?.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* cancelled */ }
  };

  if (!event) {
    return (
      <div className="evd-root">
        <style>{EVD_CSS}</style>
        <div className="evd-wrap evd-notfound">
          <h1 className="evd-h1-plain">Event not found</h1>
          <p className="evd-text">This event may have been moved or removed.</p>
          <button className="evd-btn" onClick={() => navigate(-1)}>GO BACK</button>
        </div>
      </div>
    );
  }

  const img = event.image ?? DEFAULT_IMAGE;
  const overview = event.overview?.length ? event.overview : [event.desc];
  const venueText = event.venue
    ? `${event.venue}${event.address ? `, ${event.address}` : ""}`
    : "Venue to be announced";
  const timeText = event.time ?? "Time to be confirmed";

  const related = EVENTS.filter(e => e.id !== event.id && e.brand === event.brand).slice(0, 3);
  const more = related.length ? related : EVENTS.filter(e => e.id !== event.id).slice(0, 3);

  const ticketBtn = (extra = "") =>
    event.ticketUrl ? (
      <a href={event.ticketUrl} target="_blank" rel="noreferrer" className={`evd-btn ${extra}`}>
        GET TICKETS
      </a>
    ) : (
      <button type="button" className={`evd-btn ${extra}`} disabled>
        TICKETS COMING SOON
      </button>
    );

  return (
    <div className="evd-root">
      <style>{EVD_CSS}</style>

      {/* ───────── FULL-WIDTH BANNER ───────── */}
      <header className="evd-hero">
        <img className="evd-hero-img" src={img} alt={`${event.title} — Ellevation event`} />
        <div className="evd-hero-overlay" />

        <div className="evd-wrap evd-hero-top">
          <button type="button" className="evd-pillbtn" onClick={() => navigate(-1)}>
            <Back /><span>Back</span>
          </button>
          <button type="button" className="evd-pillbtn" onClick={share}>
            <ShareIcon /><span>{copied ? "Link copied ✓" : "Share"}</span>
          </button>
        </div>

        <div className="evd-wrap evd-hero-content">
          <span className="evd-chip">{event.category}</span>
          <h1 className="evd-title">{event.title}</h1>
          <p className="evd-hero-brand">Hosted by <strong>{event.brand}</strong></p>
        </div>
      </header>

      {/* ───────── KEY FACTS ───────── */}
      <div className="evd-wrap">
        <div className="evd-facts">
          <div className="evd-fact">
            <span className="evd-fact-icon"><Cal /></span>
            <span>
              <span className="evd-fact-label">Date</span>
              <span className="evd-fact-value">{event.date}</span>
            </span>
          </div>
          <div className="evd-fact">
            <span className="evd-fact-icon"><Clock /></span>
            <span>
              <span className="evd-fact-label">Time</span>
              <span className="evd-fact-value">{timeText}</span>
            </span>
          </div>
          <div className="evd-fact">
            <span className="evd-fact-icon"><Pin /></span>
            <span>
              <span className="evd-fact-label">Location</span>
              <span className="evd-fact-value">{venueText}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ───────── CONTENT ───────── */}
      <div className="evd-wrap evd-grid">
        <main className="evd-main">
          <p className="evd-note">Dates are proposed and subject to confirmation.</p>

          <section className="evd-section evd-section-first">
            <h2 className="evd-h2">Overview</h2>
            {overview.map((p, i) => <p key={i} className="evd-text">{p}</p>)}
          </section>

          {event.highlights?.length ? (
            <section className="evd-section">
              <h2 className="evd-h2">What to expect</h2>
              <ul className="evd-list">{event.highlights.map(h => <li key={h}>{h}</li>)}</ul>
            </section>
          ) : null}

          {event.whoFor?.length ? (
            <section className="evd-section">
              <h2 className="evd-h2">Who it's for</h2>
              <ul className="evd-list">{event.whoFor.map(h => <li key={h}>{h}</li>)}</ul>
            </section>
          ) : null}

          <section className="evd-section">
            <h2 className="evd-h2">Date and time</h2>
            <ul className="evd-meta">
              <li><Cal /><span>{event.date}</span></li>
              <li><Clock /><span>{timeText}</span></li>
            </ul>
          </section>

          <section className="evd-section">
            <h2 className="evd-h2">Location</h2>
            <ul className="evd-meta">
              <li><Pin /><span>{venueText}</span></li>
            </ul>
          </section>
        </main>

        {/* Desktop sticky box */}
        <aside className="evd-aside">
          <div className="evd-box">
            <p className="evd-box-kicker">Tickets</p>
            <p className="evd-box-price">{event.priceFrom ?? "Ticket details coming soon"}</p>

            <ul className="evd-box-rows">
              <li><Cal /><span>{event.date}</span></li>
              <li><Clock /><span>{timeText}</span></li>
              <li><Pin /><span>{venueText}</span></li>
            </ul>

            {ticketBtn()}
            <button type="button" className="evd-btn evd-btn-outline" onClick={() => setRegistering(event)}>
              REGISTER INTEREST
            </button>

            <p className="evd-box-foot">Registering interest does not reserve or guarantee a ticket.</p>
          </div>
        </aside>
      </div>

      {/* ───────── MORE EVENTS ───────── */}
      <section className="evd-more">
        <div className="evd-wrap">
          <h2 className="evd-h2" style={{ marginBottom: 22 }}>More events you may like</h2>
          <div className="evd-more-grid">
            {more.map(m => (
              <Link key={m.id} to={href(m)} className="evd-more-card">
                <span className="evd-more-date">{m.date}</span>
                <span className="evd-more-title">{m.title}</span>
                <span className="evd-more-brand">{m.brand}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile / tablet sticky action bar */}
      <div className="evd-mobilebar">
        <div className="evd-mobilebar-info">
          <span className="evd-mobilebar-price">{event.priceFrom ?? "Tickets soon"}</span>
          <span className="evd-mobilebar-date">{event.date}</span>
        </div>
        <div className="evd-mobilebar-btns">
          <button type="button" className="evd-btn evd-btn-outline evd-btn-mobile" onClick={() => setRegistering(event)}>
            INTEREST
          </button>
          {ticketBtn("evd-btn-mobile")}
        </div>
      </div>

      {registering && (
        <EventInterestModal
          key={registering.id}
          event={registering}
          events={EVENTS}
          onClose={() => setRegistering(null)}
        />
      )}
    </div>
  );
}

const EVD_CSS = `
.evd-root, .evd-root *{ box-sizing:border-box; margin:0; padding:0; }
.evd-root{ font-family:'Montserrat',sans-serif; background:#F7F4FA; color:#51465C; min-height:100vh; overflow-x:hidden; }
.evd-wrap{ max-width:1180px; margin:0 auto; padding:0 24px; width:100%; }

/* ── Banner ── */
.evd-hero{ position:relative; display:flex; flex-direction:column; justify-content:space-between; min-height:clamp(340px,46vw,540px); padding:20px 0 clamp(56px,7vw,88px); color:#fff; overflow:hidden; background:#2d1740; }
.evd-hero-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }
.evd-hero-overlay{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(26,10,46,.55) 0%, rgba(26,10,46,.15) 35%, rgba(26,10,46,.88) 100%); }
.evd-hero-top, .evd-hero-content{ position:relative; z-index:2; }
.evd-hero-top{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.evd-pillbtn{
  display:inline-flex; align-items:center; gap:8px; cursor:pointer;
  font-family:'Montserrat',sans-serif; font-size:14px; font-weight:600; color:#fff;
  background:rgba(255,255,255,.16); border:1.5px solid rgba(255,255,255,.4); border-radius:100px; padding:10px 18px;
  backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); transition:background .2s ease, border-color .2s ease;
}
.evd-pillbtn:hover{ background:rgba(255,255,255,.28); border-color:#D4AD60; }
.evd-hero-content{ margin-top:48px; }
.evd-chip{ display:inline-block; font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#451D53; background:#D4AD60; padding:7px 14px; border-radius:100px; margin-bottom:16px; }
.evd-title{ font-family:'Astrid Regular',serif; font-size:clamp(30px,5.2vw,56px); font-weight:400; line-height:1.12; color:#fff; max-width:900px; margin-bottom:14px; text-shadow:0 2px 24px rgba(0,0,0,.35); }
.evd-hero-brand{ font-size:clamp(14px,1.6vw,16px); color:rgba(255,255,255,.9); }
.evd-hero-brand strong{ font-weight:600; color:#EFBF68; }

/* ── Key facts (overlaps banner) ── */
.evd-facts{ position:relative; z-index:5; margin-top:-48px; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); background:#fff; border:1px solid #E8DFF0; border-radius:20px; box-shadow:0 14px 40px rgba(69,29,83,.14); overflow:hidden; }
.evd-fact{ display:flex; align-items:center; gap:14px; padding:22px 24px; min-width:0; }
.evd-fact + .evd-fact{ border-left:1px solid #E8DFF0; }
.evd-fact-icon{ flex-shrink:0; width:46px; height:46px; border-radius:14px; display:flex; align-items:center; justify-content:center; background:rgba(212,173,96,.18); color:#451D53; }
.evd-fact-label{ display:block; font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#8a5a97; margin-bottom:4px; }
.evd-fact-value{ display:block; font-size:15px; font-weight:600; color:#451D53; line-height:1.4; overflow-wrap:anywhere; }

/* ── Content grid ── */
.evd-grid{ display:grid; grid-template-columns:minmax(0,1fr) 340px; gap:56px; padding-top:40px; padding-bottom:72px; align-items:start; }
.evd-note{ font-size:13px; font-style:italic; color:#8a5a97; }
.evd-section{ margin-top:36px; padding-top:30px; border-top:1px solid #E8DFF0; }
.evd-section-first{ margin-top:18px; border-top:none; padding-top:0; }
.evd-h2{ font-family:'Astrid Regular',serif; font-size:clamp(24px,3vw,30px); font-weight:400; color:#451D53; margin-bottom:16px; }
.evd-text{ font-size:18px; font-weight:300; line-height:1.8; color:#51465C; margin-bottom:16px; }
.evd-list{ list-style:none; display:grid; gap:12px; }
.evd-list li{ position:relative; padding-left:34px; font-size:18px; line-height:1.6; color:#51465C; }
.evd-list li::before{ content:"✓"; position:absolute; left:0; top:1px; width:22px; height:22px; border-radius:50%; background:#D4AD60; color:#451D53; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.evd-meta{ list-style:none; display:flex; flex-direction:column; gap:12px; }
.evd-meta li{ display:flex; align-items:center; gap:12px; font-size:17px; color:#51465C; }
.evd-meta li svg{ flex-shrink:0; width:20px; height:20px; color:#451D53; }

/* ── Aside / ticket box ── */
.evd-aside{ position:sticky; top:24px; }
.evd-box{ background:#fff; border:1px solid #E8DFF0; border-radius:20px; padding:28px 26px; box-shadow:0 10px 30px rgba(69,29,83,.09); }
.evd-box-kicker{ font-size:11px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#8a5a97; margin-bottom:6px; }
.evd-box-price{ font-size:20px; font-weight:700; color:#451D53; margin-bottom:18px; line-height:1.3; }
.evd-box-rows{ list-style:none; display:flex; flex-direction:column; gap:12px; padding:16px 0; margin-bottom:20px; border-top:1px solid #E8DFF0; border-bottom:1px solid #E8DFF0; }
.evd-box-rows li{ display:flex; align-items:flex-start; gap:10px; font-size:14px; line-height:1.45; color:#51465C; }
.evd-box-rows li svg{ width:18px; height:18px; flex-shrink:0; margin-top:1px; color:#451D53; }
.evd-box-foot{ margin-top:14px; font-size:12.5px; line-height:1.55; color:#6b5a7c; text-align:center; }

/* ── Buttons ── */
.evd-btn{
  display:block; width:100%; text-align:center; cursor:pointer; text-decoration:none;
  font-family:'Montserrat',sans-serif; font-size:13.5px; font-weight:700; letter-spacing:.08em; line-height:1.3;
  white-space:nowrap; padding:15px 12px; border-radius:10px; border:2px solid #D4AD60; background:#D4AD60; color:#451D53;
  transition:filter .2s ease, box-shadow .2s ease, transform .2s ease, background .2s ease;
}
.evd-btn:hover{ filter:brightness(1.05); box-shadow:0 8px 20px rgba(212,173,96,.45); transform:translateY(-1px); }
.evd-btn:disabled{ opacity:.55; cursor:not-allowed; box-shadow:none; transform:none; filter:none; }
.evd-btn-outline{ background:transparent; color:#451D53; margin-top:12px; }
.evd-btn-outline:hover{ background:rgba(212,173,96,.16); box-shadow:none; }

/* ── More events ── */
.evd-more{ background:#fff; border-top:1px solid #E8DFF0; padding:60px 0 80px; }
.evd-more-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
.evd-more-card{ display:flex; flex-direction:column; gap:8px; padding:22px; background:#F7F4FA; border:1px solid #E8DFF0; border-radius:16px; text-decoration:none; transition:transform .25s ease, box-shadow .25s ease; }
.evd-more-card:hover{ transform:translateY(-4px); box-shadow:0 14px 32px rgba(69,29,83,.14); }
.evd-more-date{ font-size:13px; font-weight:700; text-transform:uppercase; color:#451D53; }
.evd-more-title{ font-family:'Astrid Regular',serif; font-size:21px; line-height:1.25; color:#451D53; }
.evd-more-brand{ font-size:13px; color:#51465C; }

/* ── Not found ── */
.evd-notfound{ text-align:center; padding-top:140px; padding-bottom:140px; }
.evd-h1-plain{ font-family:'Astrid Regular',serif; font-size:clamp(30px,5vw,44px); font-weight:400; color:#451D53; margin-bottom:14px; }
.evd-notfound .evd-btn{ max-width:240px; margin:22px auto 0; }

/* ── Mobile bar (hidden on desktop) ── */
.evd-mobilebar{ display:none; }

.evd-pillbtn:focus-visible, .evd-btn:focus-visible, .evd-more-card:focus-visible{ outline:3px solid rgba(212,173,96,.9); outline-offset:2px; }

/* ── Tablet ── */
@media (max-width:1000px){
  .evd-grid{ grid-template-columns:1fr; gap:0; padding-top:32px; }
  .evd-aside{ display:none; }
  .evd-more-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }

  .evd-mobilebar{
    display:flex; align-items:center; justify-content:space-between; gap:14px;
    position:fixed; left:0; right:0; bottom:0; z-index:50;
    background:#fff; border-top:1px solid #E8DFF0; box-shadow:0 -10px 28px rgba(69,29,83,.14);
    padding:12px 20px calc(12px + env(safe-area-inset-bottom, 0px));
  }
  .evd-mobilebar-info{ display:flex; flex-direction:column; min-width:0; }
  .evd-mobilebar-price{ font-size:15px; font-weight:700; color:#451D53; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .evd-mobilebar-date{ font-size:12.5px; color:#51465C; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .evd-mobilebar-btns{ display:flex; gap:8px; flex-shrink:0; }
  .evd-mobilebar .evd-btn-outline{ margin-top:0; }
  .evd-mobilebar .evd-btn-mobile{ width:auto; padding:12px 16px; font-size:12.5px; letter-spacing:.06em; }
  .evd-root{ padding-bottom:84px; }
}

/* ── Phones ── */
@media (max-width:700px){
  .evd-wrap{ padding:0 18px; }
  .evd-hero{ min-height:380px; padding-bottom:72px; }
  .evd-hero-content{ margin-top:32px; }
  .evd-pillbtn{ padding:9px 14px; font-size:13px; }

  .evd-facts{ grid-template-columns:1fr; margin-top:-40px; border-radius:16px; }
  .evd-fact{ padding:16px 18px; }
  .evd-fact + .evd-fact{ border-left:none; border-top:1px solid #E8DFF0; }

  .evd-text, .evd-list li{ font-size:16px; }
  .evd-meta li{ font-size:15px; }
  .evd-more-grid{ grid-template-columns:1fr; }
  .evd-more{ padding:44px 0 64px; }
}
@media (max-width:520px){
  .evd-mobilebar-info{ display:none; }
  .evd-mobilebar-btns{ width:100%; }
  .evd-mobilebar-btns .evd-btn-mobile{ flex:1; }
}
@media (prefers-reduced-motion:reduce){
  .evd-btn, .evd-more-card, .evd-pillbtn{ transition:none !important; }
}

/* ── Dark mode ── */
[data-theme="dark"] .evd-root{ background:#0d0614; color:#cbd5e1; }
[data-theme="dark"] .evd-facts, [data-theme="dark"] .evd-box, [data-theme="dark"] .evd-more-card{ background:#1f1330; border-color:rgba(155,109,190,.25); box-shadow:0 14px 40px rgba(0,0,0,.45); }
[data-theme="dark"] .evd-fact + .evd-fact{ border-color:rgba(155,109,190,.25); }
[data-theme="dark"] .evd-fact-icon{ background:rgba(212,173,96,.16); color:#EFBF68; }
[data-theme="dark"] .evd-fact-label, [data-theme="dark"] .evd-note, [data-theme="dark"] .evd-box-kicker{ color:#c9a3d9; }
[data-theme="dark"] .evd-fact-value, [data-theme="dark"] .evd-h2, [data-theme="dark"] .evd-h1-plain, [data-theme="dark"] .evd-box-price, [data-theme="dark"] .evd-more-date, [data-theme="dark"] .evd-more-title{ color:#fff; }
[data-theme="dark"] .evd-text, [data-theme="dark"] .evd-list li, [data-theme="dark"] .evd-meta li, [data-theme="dark"] .evd-box-rows li, [data-theme="dark"] .evd-box-foot, [data-theme="dark"] .evd-more-brand{ color:#cbd5e1; }
[data-theme="dark"] .evd-meta li svg, [data-theme="dark"] .evd-box-rows li svg{ color:#d9a8cd; }
[data-theme="dark"] .evd-box-rows{ border-color:rgba(155,109,190,.25); }
[data-theme="dark"] .evd-section{ border-color:rgba(155,109,190,.25); }
[data-theme="dark"] .evd-more{ background:#160d22; border-color:rgba(155,109,190,.25); }
[data-theme="dark"] .evd-btn-outline{ color:#fff; border-color:#D4AD60; }
[data-theme="dark"] .evd-btn-outline:hover{ background:rgba(212,173,96,.18); }
[data-theme="dark"] .evd-mobilebar{ background:#160d22; border-color:rgba(155,109,190,.3); }
[data-theme="dark"] .evd-mobilebar-price{ color:#fff; }
[data-theme="dark"] .evd-mobilebar-date{ color:#cbd5e1; }
`;