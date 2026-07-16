import { useState, useMemo } from "react";

type Category =
  | "ALL"
  | "COACHES"
  | "PROFESSIONALS"
  | "COMMUNITY LEADERS"
  | "BUSINESSES"
  | "WELLNESS"
  | "EDUCATION"
  | "ALLIANCES";

type Gender = "female" | "female-hijab" | "male";

interface Member {
  name: string;
  role: string;
  location: string;
  bio: string;
  tags: string[];
  category: Exclude<Category, "ALL">;
  gender: Gender;
  bgColor: string;
}

const MEMBERS: Member[] = [
  { name: "Sarah Chen", role: "Executive Life Coach", location: "Sydney, NSW", bio: "12 years guiding leaders to clarity and purpose.", tags: ["LEADERSHIP", "EXECUTIVE", "MINDSET"], category: "COACHES", gender: "female", bgColor: "#f5d8ee" },
  { name: "Fatima Al-Rashid", role: "Community Strategist", location: "Melbourne, VIC", bio: "Building thriving communities through systemic change.", tags: ["STRATEGY", "COMMUNITY", "DEI"], category: "COMMUNITY LEADERS", gender: "female-hijab", bgColor: "#ead5f8" },
  { name: "Nina Patel", role: "Holistic Wellness Guide", location: "Brisbane, QLD", bio: "Integrative wellness for the modern professional woman.", tags: ["WELLNESS", "HOLISTIC", "MENTAL HEALTH"], category: "WELLNESS", gender: "female", bgColor: "#f8ddf0" },
  { name: "Anita Osei", role: "Business Growth Mentor", location: "Perth, WA", bio: "Helping women-owned businesses scale with confidence.", tags: ["BUSINESS", "GROWTH", "MENTORING"], category: "BUSINESSES", gender: "female", bgColor: "#e8d0f8" },
  { name: "Dr. Mei Lin", role: "Education Consultant", location: "Sydney, NSW", bio: "Transforming learning environments for lasting impact.", tags: ["EDUCATION", "CURRICULUM", "LEADERSHIP"], category: "EDUCATION", gender: "female", bgColor: "#fce8f5" },
  { name: "Layla Hasib", role: "Alliance Director", location: "Adelaide, SA", bio: "Connecting organisations across borders for shared impact.", tags: ["ALLIANCES", "GLOBAL", "PARTNERSHIPS"], category: "ALLIANCES", gender: "female-hijab", bgColor: "#f0d8f8" },
  { name: "Renee Bouchard", role: "Career Transition Coach", location: "Melbourne, VIC", bio: "Empowering women through pivotal career reinventions.", tags: ["CAREER", "COACHING", "TRANSITIONS"], category: "COACHES", gender: "female", bgColor: "#f8d5ec" },
  { name: "Sophia Torres", role: "Wellness & Nutrition Expert", location: "Gold Coast, QLD", bio: "Nourishing bodies and minds for peak performance.", tags: ["NUTRITION", "WELLNESS", "PERFORMANCE"], category: "WELLNESS", gender: "female", bgColor: "#e4d0f8" },
  { name: "Amara Okonkwo", role: "Professional Development Leader", location: "Canberra, ACT", bio: "Advancing women in corporate and civic spheres.", tags: ["PROFESSIONAL DEV", "CORPORATE", "LEADERSHIP"], category: "PROFESSIONALS", gender: "female", bgColor: "#f8d8f0" },
];

const CATEGORIES: Category[] = ["ALL", "COACHES", "PROFESSIONALS", "COMMUNITY LEADERS", "BUSINESSES", "WELLNESS", "EDUCATION", "ALLIANCES"];

/* ─── Style A: Female Avatar ─────────────────────────────── */
const FemaleAvatar = ({ bg }: { bg: string }) => (
  <svg width="46" height="46" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: 12, flexShrink: 0, display: "block" }}>
    <rect width="56" height="56" rx="14" fill={bg} />
    {/* Body */}
    <path d="M10 56 Q10 42 28 40 Q46 42 46 56Z" fill="#c870b8" />
    {/* Shirt V */}
    <path d="M22 40 L28 46 L34 40" fill="#9b50cc" />
    {/* Neck */}
    <rect x="24.5" y="31" width="7" height="6" rx="3" fill="#e8a87c" />
    {/* Head */}
    <circle cx="28" cy="23" r="12" fill="#e8a87c" />
    {/* Hair top */}
    <path d="M16 21 Q16 8 28 8 Q40 8 40 21 Q38 12 28 13 Q18 12 16 21Z" fill="#2d1a5a" />
    {/* Hair sides */}
    <ellipse cx="16.5" cy="23" rx="2.5" ry="5" fill="#2d1a5a" />
    <ellipse cx="39.5" cy="23" rx="2.5" ry="5" fill="#2d1a5a" />
    {/* Eyebrows */}
    <path d="M22 18.5 Q24 17.5 26 18.5" stroke="#2d1a5a" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M30 18.5 Q32 17.5 34 18.5" stroke="#2d1a5a" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="24" cy="22" r="2.2" fill="#2d1a4a" />
    <circle cx="32" cy="22" r="2.2" fill="#2d1a4a" />
    {/* Eye shine */}
    <circle cx="24.7" cy="21.3" r="0.8" fill="white" />
    <circle cx="32.7" cy="21.3" r="0.8" fill="white" />
    {/* Nose */}
    <ellipse cx="28" cy="26" rx="1.2" ry="0.7" fill="#c07850" opacity="0.45" />
    {/* Smile */}
    <path d="M24 29 Q28 32.5 32 29" stroke="#a05030" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="20" cy="26" rx="3" ry="1.8" fill="#e87090" opacity="0.2" />
    <ellipse cx="36" cy="26" rx="3" ry="1.8" fill="#e87090" opacity="0.2" />
  </svg>
);

/* ─── Style A: Female Hijab Avatar ──────────────────────── */
const FemaleHijabAvatar = ({ bg }: { bg: string }) => (
  <svg width="46" height="46" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: 12, flexShrink: 0, display: "block" }}>
    <rect width="56" height="56" rx="14" fill={bg} />
    {/* Body */}
    <path d="M10 56 Q10 42 28 40 Q46 42 46 56Z" fill="#9b50cc" />
    <path d="M22 40 L28 46 L34 40" fill="#7030a0" />
    {/* Neck */}
    <rect x="24.5" y="33" width="7" height="5" rx="2.5" fill="#e8a87c" />
    {/* Hijab outer */}
    <path d="M12 28 Q12 8 28 8 Q44 8 44 28 Q42 42 28 44 Q14 42 12 28Z" fill="#2d1060" />
    {/* Face */}
    <ellipse cx="28" cy="26" rx="11" ry="12" fill="#e8a87c" />
    {/* Hijab chin wrap */}
    <path d="M15 33 Q28 40 41 33 Q41 44 28 45 Q15 44 15 33Z" fill="#1a0840" />
    {/* Eyebrows */}
    <path d="M22 21.5 Q24 20.5 26 21.5" stroke="#5a3080" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M30 21.5 Q32 20.5 34 21.5" stroke="#5a3080" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="24" cy="25" r="2.2" fill="#2d1a4a" />
    <circle cx="32" cy="25" r="2.2" fill="#2d1a4a" />
    <circle cx="24.7" cy="24.3" r="0.8" fill="white" />
    <circle cx="32.7" cy="24.3" r="0.8" fill="white" />
    {/* Nose */}
    <ellipse cx="28" cy="28.5" rx="1.2" ry="0.7" fill="#c07850" opacity="0.4" />
    {/* Smile */}
    <path d="M24 31.5 Q28 35 32 31.5" stroke="#a05030" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="19.5" cy="29" rx="3" ry="1.8" fill="#e87090" opacity="0.2" />
    <ellipse cx="36.5" cy="29" rx="3" ry="1.8" fill="#e87090" opacity="0.2" />
  </svg>
);

/* ─── Style A: Male Avatar ───────────────────────────────── */
const MaleAvatar = ({ bg }: { bg: string }) => (
  <svg width="46" height="46" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: 12, flexShrink: 0, display: "block" }}>
    <rect width="56" height="56" rx="14" fill={bg} />
    <path d="M10 56 Q10 42 28 40 Q46 42 46 56Z" fill="#9b50cc" />
    <path d="M22 40 L28 46 L34 40" fill="#c870b8" opacity="0.6" />
    <rect x="24.5" y="31" width="7" height="6" rx="3" fill="#e8a87c" />
    <circle cx="28" cy="23" r="12" fill="#e8a87c" />
    {/* Cap */}
    <path d="M16 21 Q16 8 28 8 Q40 8 40 21 Q38 12 28 13 Q18 12 16 21Z" fill="#2d1a5a" />
    <rect x="13" y="19" width="30" height="3.5" rx="1.8" fill="#2d1a5a" />
    <path d="M22 18.5 Q24 17.5 26 18.5" stroke="#4a3080" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M30 18.5 Q32 17.5 34 18.5" stroke="#4a3080" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <circle cx="24" cy="22.5" r="2.2" fill="#2d1a4a" />
    <circle cx="32" cy="22.5" r="2.2" fill="#2d1a4a" />
    <circle cx="24.7" cy="21.8" r="0.8" fill="white" />
    <circle cx="32.7" cy="21.8" r="0.8" fill="white" />
    <ellipse cx="28" cy="26.5" rx="1.2" ry="0.7" fill="#c07850" opacity="0.4" />
    <path d="M24 29.5 Q28 33 32 29.5" stroke="#a05030" strokeWidth="1.3" fill="none" strokeLinecap="round" />
  </svg>
);

const AvatarComponent = ({ gender, bg }: { gender: Gender; bg: string }) => {
  if (gender === "female-hijab") return <FemaleHijabAvatar bg={bg} />;
  if (gender === "male") return <MaleAvatar bg={bg} />;
  return <FemaleAvatar bg={bg} />;
};

/* ─── Icons ─────────────────────────────────────────────── */
const PinIcon = () => (
  <svg width="11" height="13" viewBox="0 0 12 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#4B1E56" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Member Card ────────────────────────────────────────── */
const MemberCard = ({ member, index }: { member: Member; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="member-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 22, border: "1px solid rgba(124, 92, 191, 0.15)",
        padding: "1.25rem",
        transition: "transform 0.4s cubic-bezier(.25,1,.5,1), box-shadow 0.4s ease, border-color 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 26px 54px rgba(124, 92, 191, 0.12)" : "0 10px 30px rgba(124, 92, 191, 0.02)",
        animation: `cardIn 0.4s ease ${index * 0.07}s both`,
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3, borderTopLeftRadius: 21, borderTopRightRadius: 21,
        background: "#4B1E56",
        margin: "-1.25rem -1.25rem 1rem -1.25rem",
        opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s",
      }} />

      {/* Avatar + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <AvatarComponent gender={member.gender} bg={member.bgColor} />
        <div>
          <div className="member-name" style={{ fontFamily: "'Astrid Regular',serif", fontWeight: 700, fontSize: 16, color: "#1a0a2e" }}>{member.name}</div>
          <div className="member-role" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: "#4B1E56", marginTop: 2 }}>{member.role}</div>
        </div>
      </div>

      {/* Location */}
      <div className="member-location" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#662369", display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
        <PinIcon />{member.location}
      </div>

      {/* Bio */}
      <div className="member-bio" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, color: "#554866", lineHeight: 1.55, marginBottom: 12 }}>{member.bio}</div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {member.tags.map((t) => (
          <span key={t} className="member-tag" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 50, border: "1px solid rgba(124, 92, 191, 0.2)", color: "#4B1E56", background: "rgba(124, 92, 191, 0.06)" }}>{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="member-card-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(124, 92, 191, 0.12)", paddingTop: 10 }}>
        <span className="member-category" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 50, border: "1px solid rgba(75, 30, 86, 0.35)", color: "#4B1E56" }}>{member.category}</span>
        <button className="connect-btn" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", padding: "7px 15px", borderRadius: 50, border: "none", background: "#D7238F", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          CONNECT <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

/* ─── Main ───────────────────────────────────────────────── */
export default function ProfessionalDirectory() {
  const [activeFilter, setActiveFilter] = useState<Category>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => MEMBERS.filter((m) => {
    const matchCat = activeFilter === "ALL" || m.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  }), [activeFilter, searchQuery]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

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

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.07)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
        .hero-h1{animation:fadeUp 0.8s ease both}
        .hero-p{animation:fadeUp 0.9s ease 0.1s both}
        .hero-search{animation:fadeUp 1s ease 0.2s both}
        .search-input::placeholder{color:#9a86ac}
        .search-input:focus{border-color:#4B1E56!important;background:rgba(255,255,255,0.95)!important;outline:none;box-shadow:0 0 0 4px rgba(75,30,86,0.08)}
        .chip-btn{cursor:pointer;transition:all 0.2s;font-family:'Montserrat',sans-serif}
        .chip-btn:hover{background:rgba(75,30,86,0.08)!important;transform:translateY(-1px)}
        .get-listed-btn{cursor:pointer;font-family:'Montserrat',sans-serif;transition:all 0.25s}
        .get-listed-btn:hover{opacity:0.9;transform:translateY(-1px)}
        .cta-btn{cursor:pointer;font-family:'Montserrat',sans-serif;transition:all 0.25s}
        .cta-btn:hover{opacity:0.9;transform:translateY(-2px)}
        .connect-btn{transition:all 0.2s;}
        .connect-btn:hover{opacity:0.9;transform:translateY(-1px);}

        /* ── Dark Mode Overrides — matched to About page's theme ── */
        [data-theme="dark"] body { background: #0d0614 !important; }
        [data-theme="dark"] .directory-page-root { background: #0d0614 !important; }
        [data-theme="dark"] .directory-hero {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%) !important;
        }
        [data-theme="dark"] .directory-hero h1 { color: #ffffff !important; }
        [data-theme="dark"] .directory-hero p { color: #cbd5e1 !important; }
        [data-theme="dark"] .directory-hero span { color: #cbd5e1 !important; }
        [data-theme="dark"] .search-input {
          background: rgba(25, 16, 38, 0.7) !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
          color: #ffffff !important;
        }
        [data-theme="dark"] .directory-filters,
        [data-theme="dark"] .directory-grid-wrap,
        [data-theme="dark"] .directory-results-info {
          background: #160d22 !important;
          border-bottom-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .directory-results-info { color: #cbd5e1 !important; }
        [data-theme="dark"] .chip-btn { color: #ffffff !important; }
        [data-theme="dark"] .member-card {
          background: rgba(25, 16, 38, 0.6) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .member-name { color: #ffffff !important; }
        [data-theme="dark"] .member-role { color: #d9b8e8 !important; }
        [data-theme="dark"] .member-location { color: #c9a3d9 !important; }
        [data-theme="dark"] .member-bio { color: #cbd5e1 !important; }
        [data-theme="dark"] .member-tag {
          background: rgba(155, 109, 190, 0.12) !important;
          color: #d9b8e8 !important;
          border-color: rgba(155, 109, 190, 0.25) !important;
        }
        [data-theme="dark"] .member-card-footer { border-top-color: rgba(155, 109, 190, 0.15) !important; }
        [data-theme="dark"] .member-category { color: #d9b8e8 !important; border-color: rgba(155, 109, 190, 0.35) !important; }
        [data-theme="dark"] .directory-cta-wrap { background: #160d22 !important; }
        [data-theme="dark"] .directory-cta-card {
          background: rgba(25, 16, 38, 0.6) !important;
          border-color: rgba(155, 109, 190, 0.15) !important;
        }
        [data-theme="dark"] .directory-cta-card h2 { color: #ffffff !important; }
        [data-theme="dark"] .directory-cta-card p { color: #cbd5e1 !important; }
        [data-theme="dark"] .directory-cta-card span { color: #c9a3d9 !important; }
      `}</style>

      <div className="directory-page-root" style={{ fontFamily: "'Montserrat', sans-serif", background: "#fdf9fc", minHeight: "100vh" }}>

        {/* Hero */}
        <div
          className="directory-hero"
          style={{
            background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)",
            padding: "160px 74px 140px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: "-40%", left: "-20%", width: "60%", height: "160%", background: "radial-gradient(ellipse,rgba(124,92,191,0.14) 0%,transparent 70%)", animation: "pulse 5s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "120%", background: "radial-gradient(ellipse,rgba(75,30,86,0.08) 0%,transparent 70%)", animation: "pulse 7s ease-in-out infinite reverse", pointerEvents: "none" }} />

          <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#662369", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: "1.2rem", position: "relative", zIndex: 1 }}>
            <span style={{ display: "inline-block", width: 30, height: 1, background: "rgba(75,30,86,0.35)" }} />PROFESSIONAL DIRECTORY<span style={{ display: "inline-block", width: 30, height: 1, background: "rgba(75,30,86,0.35)" }} />
          </div>

          <h1 className="hero-h1" style={{ fontFamily: "'Astrid Regular', serif", fontSize: "clamp(2.2rem,5vw,3.4rem)", fontWeight: 700, color: "#1a0a2e", marginBottom: "0.8rem", position: "relative", zIndex: 1, lineHeight: 1.15 }}>
            Discover Our <span style={{ color: "#4B1E56" }}>Community</span>
          </h1>

          <p className="hero-p" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15.5, color: "#554866", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
            Connect with coaches, professionals, community leaders, and changemakers.
          </p>

          <div className="hero-search" style={{ maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="9" cy="9" r="6" stroke="#4B1E56" strokeWidth="2" /><path d="M14 14l3 3" stroke="#4B1E56" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search by name, role, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", padding: "14px 20px 14px 48px", borderRadius: 50,
                border: "1.5px solid rgba(75, 30, 86, 0.25)",
                background: "rgba(255,255,255,0.85)",
                color: "#1a0a2e", fontSize: 14, fontFamily: "'Montserrat',sans-serif",
                transition: "all 0.2s ease",
              }}
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="directory-filters" style={{ background: "#fdf9fc", padding: "1.2rem 74px 1rem", borderBottom: "1px solid rgba(124, 92, 191, 0.15)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="chip-btn"
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "7px 16px", borderRadius: 50, fontSize: 11, fontWeight: 600, letterSpacing: "0.09em",
                  border: activeFilter === cat ? "none" : "1.5px solid rgba(75, 30, 86, 0.25)",
                  color: activeFilter === cat ? "#fff" : "#4B1E56",
                  background: activeFilter === cat ? "#4B1E56" : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
            <button
              className="get-listed-btn"
              style={{ padding: "7px 16px", borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", border: "none", background: "#D7238F", color: "#fff" }}
            >
              + GET LISTED
            </button>
          </div>
        </div>
        <div className="directory-results-info" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: "#662369", padding: "0.5rem 74px", background: "#fdf9fc", borderBottom: "1px solid rgba(124, 92, 191, 0.15)" }}>
          {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
        </div>

        {/* Cards Grid */}
        <div className="directory-grid-wrap" style={{ padding: "74px", background: "linear-gradient(180deg, #fdf9fc 0%, #f6f3fa 100%)", minHeight: 300 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
            {filtered.map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
          </div>
        </div>

        {/* CTA */}
        <div className="directory-cta-wrap" style={{ padding: "74px", background: "#f6f3fa" }}>
          <div className="directory-cta-card" style={{ border: "1px solid rgba(124, 92, 191, 0.15)", borderRadius: 24, padding: "3rem 2rem", textAlign: "center", background: "#fff" }}>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "#662369", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: "1rem" }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(75,30,86,0.3)" }} />JOIN THE DIRECTORY<span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(75,30,86,0.3)" }} />
            </div>
            <h2 style={{ fontFamily: "'Astrid Regular',serif", fontSize: "clamp(28px,3.5vw,38px)", fontWeight: 700, color: "#4B1E56", marginBottom: "0.8rem" }}>Share Your Expertise</h2>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, color: "#554866", maxWidth: 460, margin: "0 auto 1.6rem", lineHeight: 1.65 }}>
              Get your professional profile in front of thousands of women seeking connection, collaboration, and the services you offer.
            </p>
            <button className="cta-btn" style={{ padding: "13px 34px", borderRadius: 50, border: "none", background: "#D7238F", color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>
              REQUEST A LISTING
            </button>
          </div>
        </div>

      </div>
    </>
  );
}