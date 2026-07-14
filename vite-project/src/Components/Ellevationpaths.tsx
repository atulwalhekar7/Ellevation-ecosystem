import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// TODO: apni asli image yahan daalo (jaisa AboutPage.tsx mein aboutBg use hua hai)
import welcomeImg from "../assets/banner2.avif";

interface Path {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  route: string;
}

const paths: Path[] = [
  {
    eyebrow: "Women & Young Women Focus (17–25)",
    title: "Ms. Ellevation",
    description:
      "Dedicated to building the modern woman. A focused space designed to cultivate authentic identity, deep character, unshakeable confidence, and strategic leadership.",
    features: [
      "Leadership Workshops",
      "Mentorship (Identity, Confidence, Healing)",
      "Women Speaking Events",
      "Curated Community Events",
    ],
    cta: "Explore Programs",
    route: "/ms-ellevation",
  },
  {
    eyebrow: "Community Ecosystem & Pathways",
    title: "Ellevation Hub",
    description:
      "A dynamic membership network offering interconnected opportunity, professional alignment, and holistic wellbeing initiatives designed for the entire family unit.",
    features: [
      "1:1 Consultation and Coaching",
      "Children, Youth (5–16) & Men Programs",
      "Community Wellbeing & Shared Spaces",
      "Professional & Business Development",
    ],
    cta: "Become a Member",
    route: "/hub",
  },
];

/* ══════════════════════════════════════════════
   SECTION 1 — "Her Potential. Her Impact."
   Hero-style statement with a floating glass card
   ══════════════════════════════════════════════ */
// function ImpactStatementSection() {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setVisible(true); },
//       { threshold: 0.15 }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section ref={ref} className="impact-section">
//       {/* ambient blobs, consistent with rest of site */}
//       <div className="impact-blob impact-blob-1" />
//       <div className="impact-blob impact-blob-2" />

//       <div className="impact-inner">
//         <p
//           className="impact-eyebrow"
//           style={{
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(16px)",
//             transition: "opacity 0.6s ease, transform 0.6s ease",
//           }}
//         >
//           Why We Exist
//         </p>

//         <h2 className="impact-title">
//           Her Potential. Her Impact.
//         </h2>

//         {/* Floating glass statement card */}
//         <div
//           className="impact-glass-card"
//           style={{
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(30px)",
//             transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
//           }}
//         >
//           <h3 className="impact-card-title">
//             Building Holistic Success for Women in Australia.
//           </h3>
//           <p className="impact-card-desc">
//             Beyond every obstacle and uncertainty, Ms. Ellevation empowers her to claim her space,
//             amplify her voice, and truly flourish.
//           </p>

//           <div className="impact-tags">
//             {[
//               { n: "Voice", i: "◈" },
//               { n: "Identity", i: "✦" },
//               { n: "Confidence", i: "❀" },
//             ].map((tag) => (
//               <div key={tag.n} className="impact-tag">
//                 <span className="impact-tag-icon">{tag.i}</span>
//                 <span className="impact-tag-name">{tag.n}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* ══════════════════════════════════════════════
   SECTION 2 — "Your Harbour of Empowerment"
   Split layout: text + image with floating brand badge
   ══════════════════════════════════════════════ */
// function WelcomeSection() {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setVisible(true); },
//       { threshold: 0.15 }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section ref={ref} className="welcome-section">
//       <div className="welcome-grid">
//         {/* LEFT — text */}
//         <div
//           style={{
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(24px)",
//             transition: "opacity 0.7s ease, transform 0.7s ease",
//           }}
//         >
//           <p className="welcome-eyebrow">A Space For Women, By Women</p>
//           <h2 className="welcome-title">
//             Welcome to Your{" "}
//             <span className="welcome-title-accent">Harbour of Empowerment</span>
//           </h2>
//           <p className="welcome-desc">
//             Welcome to Ms. Ellevation — for new beginnings, bold journeys, and dreams taking
//             flight. Find your place. Lift your voice. Shine. Flourish in every part of your life.
//           </p>

//           <Link to="/ms-ellevation" className="welcome-cta">
//             Find Your Place
//             <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
//               <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </Link>
//         </div>

//         {/* RIGHT — image with floating brand badge */}
//         <div
//           className="welcome-image-wrap"
//           style={{
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(24px)",
//             transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
//           }}
//         >
//           <div className="welcome-image-frame">
//             <img
//               src={welcomeImg}
//               alt="Welcome to Ms. Ellevation"
//               style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//               onError={(e) => {
//                 const target = e.currentTarget;
//                 target.style.display = "none";
//                 const parent = target.parentElement;
//                 if (parent && !parent.querySelector(".welcome-fallback")) {
//                   const fb = document.createElement("div");
//                   fb.className = "welcome-fallback";
//                   fb.style.cssText =
//                     "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ede7f5 0%,#f6f3fa 100%);font-family:'Astrid Regular',serif;font-size:26px;font-weight:600;color:#662369;text-align:center;padding:24px;";
//                   fb.textContent = "Ms. Ellevation";
//                   parent.appendChild(fb);
//                 }
//               }}
//             />
//           </div>

//           {/* Floating brand badge — same language as Carousel's floating cards */}
//           <div className="welcome-badge">
//             <div className="welcome-badge-icon">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                 <path d="M12 2l1.8 5.6H20l-4.6 3.4 1.8 5.6L12 13.2 6.8 16.6l1.8-5.6L4 8h6.2z" fill="#4B1E56" />
//               </svg>
//             </div>
//             <div>
//               <p className="welcome-badge-title">Ms. Ellevation</p>
//               <p className="welcome-badge-sub">A space for women, by women</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* ══════════════════════════════════════════════
   EXISTING — Ellevation Paths grid
   ══════════════════════════════════════════════ */
export default function EllevationPaths() {
  const [visible, setVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
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

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ═══════════════════════════════════════
           SECTION 1: Impact Statement
           (all static colors live in CSS classes now,
           so dark-mode overrides can actually win)
           ═══════════════════════════════════════ */
        .impact-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #f6f3fa 100%);
          padding: 110px 24px 130px;
        }
        .impact-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .impact-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .impact-blob-1 {
          top: -100px; right: -80px; width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(75,30,86,0.08) 0%, transparent 70%);
        }
        .impact-blob-2 {
          bottom: -60px; left: -100px; width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(124,92,191,0.1) 0%, transparent 70%);
        }
        .impact-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #662369;
          margin-bottom: 18px;
        }
        .impact-title {
          font-family: 'Astrid Regular', serif;
          font-size: 52px;
          font-weight: 700;
          line-height: 1.1;
          color: #4B1E56;
          margin: 0 0 40px;
        }
        .impact-glass-card {
          display: inline-block;
          max-width: 640px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(124, 92, 191, 0.15);
          border-radius: 28px;
          padding: 40px 44px;
          box-shadow: 0 20px 50px rgba(124, 92, 191, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease, background-color 0.3s ease, border-color 0.3s ease;
        }
        .impact-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 60px rgba(124, 92, 191, 0.16);
        }
        .impact-card-title {
          font-family: 'Montserrat', sans-serif;
          color: #662369;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 16px;
          line-height: 1.3;
        }
        .impact-card-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15.5px;
          line-height: 1.7;
          color: #554866;
          margin: 0;
        }
        .impact-tags {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        .impact-tag { display: flex; align-items: center; gap: 8px; }
        .impact-tag-icon { color: #662369; font-size: 15px; }
        .impact-tag-name {
          font-family: 'Astrid Regular', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a0a2e;
        }

        /* ═══════════════════════════════════════
           SECTION 2: Welcome
           Alternate section background → #AEAAD5
           ═══════════════════════════════════════ */
        .welcome-section {
          background: #AEAAD5;
          padding: 50px 24px;
        }
        .welcome-grid {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .welcome-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #662369;
          margin: 0 0 14px;
        }
        .welcome-title {
          font-family: 'Astrid Regular', serif;
          font-size: clamp(34px, 4.5vw, 50px);
          font-weight: 700;
          line-height: 1.18;
          color: #1a0a2e;
          margin: 0 0 22px;
        }
        .welcome-title-accent { color: #4B1E56; }
        .welcome-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15.5px;
          line-height: 1.75;
          color: #554866;
          margin: 0 0 32px;
          max-width: 460px;
        }
        .welcome-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%);
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.03em;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(75, 30, 86, 0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .welcome-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(75, 30, 86, 0.35);
        }
        .welcome-image-wrap { position: relative; }
        .welcome-image-frame {
          border-radius: 28px;
          overflow: hidden;
          aspect-ratio: 4 / 3.4;
          box-shadow: 0 24px 60px rgba(75, 30, 86, 0.18);
          border: 1px solid rgba(124, 92, 191, 0.2);
        }
        .welcome-badge {
          position: absolute;
          bottom: -22px;
          left: -22px;
          background: #1a0a2e;
          border-radius: 18px;
          padding: 16px 22px;
          box-shadow: 0 14px 34px rgba(0,0,0,0.22);
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .welcome-badge-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(75, 30, 86, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .welcome-badge-title {
          font-family: 'Astrid Regular', serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }
        .welcome-badge-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }

        .paths-section {
          background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%);
        }

        .paths-header-title {
          font-family: 'Astrid Regular', serif;
          font-size: 52px;
          font-weight: 700;
          color: #4B1E56;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        /* ── Dynamic Layout Card ── */
        .path-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(124, 92, 191, 0.15);
          border-radius: 28px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(124, 92, 191, 0.04);
          transition: 
            transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1),
            background-color 0.3s ease,
            border-color 0.3s ease;
        }

        .path-card:hover {
          transform: translateY(-6px);
          background: #ffffff;
          border-color: rgba(124, 92, 191, 0.4);
          box-shadow: 
            0 30px 60px rgba(124, 92, 191, 0.12),
            0 12px 24px rgba(124, 92, 191, 0.04);
        }

        /* Ambient gradient border top */
        .path-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #662369, #4B1E56);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .path-card:hover::before { opacity: 1; }

        /* ── Header Row ── */
        .path-card-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #662369;
          margin: 0 0 8px 0;
          transition: opacity 0.3s ease;
        }
        .path-card:hover .path-card-eyebrow {
          color: #662369;
          opacity: 0.95;
        }

        .path-title {
          font-family: 'Astrid Regular', serif;
          font-size: 38px;
          font-weight: 700;
          color: #1a0a2e;
          margin: 0;
          line-height: 1.2;
          transition: color 0.3s ease;
        }
        .path-card:hover .path-title {
          color: #4B1E56;
        }

        /* ── CSS Grid Drawer Mechanism ── */
        .path-drawer-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .path-card:hover .path-drawer-wrapper {
          grid-template-rows: 1fr;
        }

        .path-drawer-content {
          overflow: hidden;
        }

        /* Interior animations when card expands */
        .path-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: #554866;
          margin: 20px 0 24px 0;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .path-card:hover .path-desc {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.1s;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .path-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14.5px;
          color: #403452;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .path-card:hover .path-feature {
          opacity: 1;
          transform: translateX(0);
        }
        .path-card:hover .path-feature:nth-child(1) { transition-delay: 0.16s; }
        .path-card:hover .path-feature:nth-child(2) { transition-delay: 0.22s; }
        .path-card:hover .path-feature:nth-child(3) { transition-delay: 0.28s; }
        .path-card:hover .path-feature:nth-child(4) { transition-delay: 0.34s; }

        .feature-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4B1E56;
          flex-shrink: 0;
        }

        /* ── CTA button ── */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #ffffff;
          background: #4B1E56;
          border: none;
          border-radius: 14px;
          padding: 14px 28px;
          cursor: pointer;
          text-decoration: none;
          opacity: 0;
          transform: translateY(10px);
          box-shadow: 0 4px 14px rgba(90, 63, 160, 0.2);
          transition: 
            background 0.2s, 
            transform 0.2s, 
            box-shadow 0.2s,
            opacity 0.3s ease,
            gap 0.2s;
        }
        .path-card:hover .cta-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.25s;
        }
        .cta-btn:hover {
          background: #35143d;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(75, 30, 86, 0.3);
          gap: 12px;
        }

        /* Responsive Breakpoint handling */
        @media (max-width: 868px) {
          .paths-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .path-drawer-wrapper { grid-template-rows: 1fr !important; }
          .path-desc, .path-feature, .cta-btn { opacity: 1 !important; transform: none !important; }
          .paths-header-title { font-size: 38px !important; }
        }

        @media (max-width: 868px) {
          .welcome-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .welcome-badge { left: 12px !important; bottom: -18px !important; }
        }

        @media (max-width: 640px) {
          .impact-section { padding: 80px 20px 100px !important; }
          .welcome-section { padding: 70px 20px !important; }
          .impact-glass-card { padding: 28px 24px !important; }
        }

        /* ═══════════════════════════════════════
           Dark Mode
           (works now — every rule below targets a
           CSS class, not an inline style, so it
           always wins over the light defaults)
           ═══════════════════════════════════════ */
        [data-theme="dark"] .impact-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }
        [data-theme="dark"] .impact-eyebrow { color: #c9a3d9; }
        [data-theme="dark"] .impact-title { color: #ffffff; }
        [data-theme="dark"] .impact-glass-card {
          background: rgba(25, 16, 38, 0.7);
          border-color: rgba(155, 109, 190, 0.15);
        }
        [data-theme="dark"] .impact-card-title { color: #d9b8e8; }
        [data-theme="dark"] .impact-card-desc { color: #cbd5e1; }
        [data-theme="dark"] .impact-tag-icon { color: #c9a3d9; }
        [data-theme="dark"] .impact-tag-name { color: #ffffff; }

        [data-theme="dark"] .welcome-section {
          background: linear-gradient(180deg, #160d22 0%, #0d0614 100%);
        }
        [data-theme="dark"] .welcome-eyebrow { color: #c9a3d9; }
        [data-theme="dark"] .welcome-title { color: #ffffff; }
        [data-theme="dark"] .welcome-title-accent { color: #d9b8e8; }
        [data-theme="dark"] .welcome-desc { color: #cbd5e1; }
        [data-theme="dark"] .welcome-image-frame { border-color: rgba(155, 109, 190, 0.25); }
        [data-theme="dark"] .welcome-cta {
          background: linear-gradient(135deg, #6b2f7a 0%, #4B1E56 100%);
        }

        [data-theme="dark"] .paths-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }
        [data-theme="dark"] .paths-header-title {
          color: #4B1E56;
        }
        [data-theme="dark"] .path-card {
          background: rgba(25, 16, 38, 0.6);
          border-color: rgba(155, 109, 190, 0.15);
        }
        [data-theme="dark"] .path-card:hover {
          background: #1f142e;
          border-color: rgba(155, 109, 190, 0.35);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        [data-theme="dark"] .path-title {
          color: #ffffff;
        }
        [data-theme="dark"] .path-card:hover .path-title {
          color: #d9b8e8;
        }
        [data-theme="dark"] .path-card-eyebrow {
          color: #c9a3d9;
        }
        [data-theme="dark"] .path-desc {
          color: #cbd5e1;
        }
        [data-theme="dark"] .path-feature {
          color: #e2e8f0;
        }
        [data-theme="dark"] .cta-btn {
          background: #6b2f7a;
        }
        [data-theme="dark"] .cta-btn:hover {
          background: #8a5a97;
        }
      `}</style>

      {/* NEW SECTION 1
      <ImpactStatementSection />

      NEW SECTION 2
      <WelcomeSection /> */}

      {/* EXISTING PATHS GRID SECTION */}
      <section
        ref={sectionRef}
        className="paths-section"
        style={{
          padding: "100px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* Main Title Section */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="paths-header-title">Choose Your Ecosystem Path</h2>
        </div>

        {/* Dynamic Cards Grid */}
        <div
          className="paths-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            maxWidth: "1140px",
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {paths.map((p: Path, i: number) => (
            <div
              key={p.title}
              className="path-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.4s ease`,
              }}
            >
              {/* Flex Header Component Structure */}
              <div style={{ width: "100%" }}>
                <p className="path-card-eyebrow">{p.eyebrow}</p>
                <h3 className="path-title">{p.title}</h3>
              </div>

              {/* Seamless dynamic pure-CSS drawer mechanism */}
              <div className="path-drawer-wrapper">
                <div className="path-drawer-content">
                  <p className="path-desc">{p.description}</p>

                  <div className="features-list">
                    {p.features.map((feat) => (
                      <div key={feat} className="path-feature">
                        <span className="feature-bullet" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: "4px" }}>
                    <Link to={p.route} className="cta-btn">
                      {p.cta}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </>
  );
}