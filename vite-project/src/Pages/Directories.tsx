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
    <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#c080b8" />
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 18, border: "1px solid #ecd8f5",
        padding: "1.25rem",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(170,80,200,0.12)" : "0 2px 8px rgba(170,80,200,0.04)",
        animation: `cardIn 0.4s ease ${index * 0.07}s both`,
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3, borderTopLeftRadius: 17, borderTopRightRadius: 17,
        background: "linear-gradient(90deg, #c870b8, #9b50cc)",
        margin: "-1.25rem -1.25rem 1rem -1.25rem",
        opacity: hovered ? 1 : 0.35, transition: "opacity 0.3s",
      }} />

      {/* Avatar + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <AvatarComponent gender={member.gender} bg={member.bgColor} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#3a1a5a" }}>{member.name}</div>
          <div style={{ fontSize: 12, color: "#9060a8", marginTop: 2 }}>{member.role}</div>
        </div>
      </div>

      {/* Location */}
      <div style={{ fontSize: 11, color: "#c080b8", display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
        <PinIcon />{member.location}
      </div>

      {/* Bio */}
      <div style={{ fontSize: 12.5, color: "#6a4a7a", lineHeight: 1.55, marginBottom: 12 }}>{member.bio}</div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {member.tags.map((t) => (
          <span key={t} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 50, border: "1px solid #e4c8f0", color: "#8040a8", background: "#faf0ff" }}>{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f5e8ff", paddingTop: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 50, border: "1px solid #d8b0e8", color: "#7a3a88" }}>{member.category}</span>
        <button style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", padding: "6px 14px", borderRadius: 50, border: "none", background: "linear-gradient(135deg, #c870b8, #9b50cc)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.07)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
        .hero-h1{animation:fadeUp 0.8s ease both}
        .hero-p{animation:fadeUp 0.9s ease 0.1s both}
        .hero-search{animation:fadeUp 1s ease 0.2s both}
        .search-input::placeholder{color:#b090c0}
        .search-input:focus{border-color:#b070d0!important;background:rgba(255,255,255,0.95)!important;outline:none}
        .chip-btn{cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif}
        .chip-btn:hover{background:#f5e0ff!important;transform:translateY(-1px)}
        .get-listed-btn{cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.25s}
        .get-listed-btn:hover{opacity:0.88;transform:translateY(-1px)}
        .cta-btn{cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.25s}
        .cta-btn:hover{opacity:0.87;transform:translateY(-2px)}
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fff", minHeight: "100vh" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #eddaf7 0%, #f8ddf0 50%, #f2daf8 100%)", padding: "3.5rem 2rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position:"absolute",top:"-40%",left:"-20%",width:"60%",height:"160%",background:"radial-gradient(ellipse,rgba(200,140,220,0.22) 0%,transparent 70%)",animation:"pulse 5s ease-in-out infinite",pointerEvents:"none" }} />
          <div style={{ position:"absolute",top:"-20%",right:"-10%",width:"50%",height:"120%",background:"radial-gradient(ellipse,rgba(230,150,200,0.18) 0%,transparent 70%)",animation:"pulse 7s ease-in-out infinite reverse",pointerEvents:"none" }} />
          <div style={{ fontSize:11,letterSpacing:"0.22em",color:"#a060b0",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:"1.2rem",position:"relative",zIndex:1 }}>
            <span style={{ display:"inline-block",width:30,height:1,background:"#c090c8" }} />PROFESSIONAL DIRECTORY<span style={{ display:"inline-block",width:30,height:1,background:"#c090c8" }} />
          </div>
          <h1 className="hero-h1" style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:400,color:"#3a1a5a",marginBottom:"0.8rem",position:"relative",zIndex:1 }}>Discover Our Community</h1>
          <p className="hero-p" style={{ fontSize:14,color:"#7a5a8a",marginBottom:"2rem",position:"relative",zIndex:1 }}>Connect with coaches, professionals, community leaders, and changemakers.</p>
          <div className="hero-search" style={{ maxWidth:480,margin:"0 auto",position:"relative",zIndex:1 }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ position:"absolute",left:18,top:"50%",transform:"translateY(-50%)" }}>
              <circle cx="9" cy="9" r="6" stroke="#b070c0" strokeWidth="2" /><path d="M14 14l3 3" stroke="#b070c0" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input className="search-input" type="text" placeholder="Search by name, role, or expertise..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width:"100%",padding:"14px 20px 14px 48px",borderRadius:50,border:"1.5px solid #d8b0e8",background:"rgba(255,255,255,0.75)",color:"#3a1a5a",fontSize:14,fontFamily:"'DM Sans',sans-serif" }} />
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ background:"#fdf5ff",padding:"1.2rem 2rem 1rem",borderBottom:"1px solid #ecd8f5" }}>
          <div style={{ display:"flex",flexWrap:"wrap",alignItems:"center",gap:8 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} className="chip-btn" onClick={() => setActiveFilter(cat)}
                style={{ padding:"6px 16px",borderRadius:50,fontSize:11,fontWeight:500,letterSpacing:"0.09em",border:activeFilter===cat?"none":"1.5px solid #d8b0e8",color:activeFilter===cat?"#fff":"#7a3a8a",background:activeFilter===cat?"linear-gradient(135deg,#c870b8,#9b50cc)":"transparent" }}>
                {cat}
              </button>
            ))}
            <button className="get-listed-btn" style={{ padding:"6px 16px",borderRadius:50,fontSize:11,fontWeight:600,letterSpacing:"0.09em",border:"none",background:"linear-gradient(135deg,#c870b8,#9b50cc)",color:"#fff" }}>
              + GET LISTED
            </button>
          </div>
        </div>
        <div style={{ fontSize:13,color:"#a070b0",padding:"0.5rem 2rem",background:"#fdf5ff",borderBottom:"1px solid #ecd8f5" }}>
          {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
        </div>

        {/* Cards Grid */}
        <div style={{ padding:"2rem",background:"#fdf5ff",minHeight:300 }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:20 }}>
            {filtered.map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding:"2rem",background:"#fdf5ff" }}>
          <div style={{ border:"1px solid #e8d0f5",borderRadius:20,padding:"2.5rem 2rem",textAlign:"center",background:"#fff" }}>
            <div style={{ fontSize:11,letterSpacing:"0.18em",color:"#b070c0",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:"1rem" }}>
              <span style={{ display:"inline-block",width:28,height:1,background:"#d0a8e0" }} />JOIN THE DIRECTORY<span style={{ display:"inline-block",width:28,height:1,background:"#d0a8e0" }} />
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"2rem",fontWeight:400,color:"#3a1a5a",marginBottom:"0.8rem" }}>Share Your Expertise</h2>
            <p style={{ fontSize:13,color:"#7a5a8a",maxWidth:440,margin:"0 auto 1.6rem",lineHeight:1.6 }}>Get your professional profile in front of thousands of women seeking connection, collaboration, and the services you offer.</p>
            <button className="cta-btn" style={{ padding:"12px 32px",borderRadius:50,border:"none",background:"linear-gradient(135deg,#c870b8,#9b50cc)",color:"#fff",fontSize:12,fontWeight:600,letterSpacing:"0.12em" }}>
              REQUEST A LISTING
            </button>
          </div>
        </div>

        
       
      </div>
    </>
  );
}