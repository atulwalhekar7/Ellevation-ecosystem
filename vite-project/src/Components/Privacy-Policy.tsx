import { useEffect, useRef, useState, type CSSProperties } from "react";

/* ── helpers ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function fade(inView: boolean, delay = 0): CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
}

/* ── content ── */
type Clause = { n: string; text: string };
type Section = { heading: string; intro?: string; clauses: Clause[] };

const SECTIONS: Section[] = [
  {
    heading: "1. We Respect Your Privacy",
    clauses: [
      { n: "1.1", text: "We respect your right to privacy and are committed to safeguarding the privacy of our members, customers, and website visitors. We adhere to the National Privacy Principles established by the Privacy Act 1988 (Cth). This policy sets out how we collect and treat your personal information." },
      { n: "1.2", text: "\u201CPersonal information\u201D is information we hold which is identifiable as being about you." },
    ],
  },
  {
    heading: "2. Collection of Personal Information",
    clauses: [
      { n: "2.1", text: "We will, from time to time, receive and store personal information you enter onto our website, provide to us directly, or give to us in other forms." },
      { n: "2.2", text: "You may provide basic information such as your name, phone number, address, and email address to enable us to send information, provide updates, and process your product or service order. We may collect additional information at other times, including but not limited to when you provide feedback, when you provide information about your personal or business affairs, change your content or email preference, respond to surveys and/or promotions, provide financial or credit card information, or communicate with our support team." },
      { n: "2.3", text: "We may also collect any other information you provide while interacting with us." },
    ],
  },
  {
    heading: "3. How We Collect Your Personal Information",
    clauses: [
      { n: "3.1", text: "We collect personal information from you in a variety of ways, including when you interact with us electronically or in person, when you access our website, and when we provide our services to you. We may receive personal information from third parties. If we do, we will protect it as set out in this Privacy Policy." },
    ],
  },
  {
    heading: "4. Use of Your Personal Information",
    clauses: [
      { n: "4.1", text: "We may use personal information collected from you to provide you with information, updates, and our services. We may also make you aware of new and additional products, services, and opportunities available to you. We may use your personal information to improve our products and services and better understand your needs." },
      { n: "4.2", text: "We may contact you by a variety of measures including, but not limited to, telephone, email, SMS, or mail." },
    ],
  },
  {
    heading: "5. Disclosure of Your Personal Information",
    clauses: [
      { n: "5.1", text: "We may disclose your personal information to any of our employees, officers, insurers, professional advisers, agents, suppliers, or subcontractors insofar as reasonably necessary for the purposes set out in this Policy. Personal information is only supplied to a third party when it is required for the delivery of our services." },
      { n: "5.2", text: "We may from time to time need to disclose personal information to comply with a legal requirement, such as a law, regulation, court order, subpoena, warrant, in the course of a legal proceeding, or in response to a law enforcement agency request." },
      { n: "5.3", text: "We may also use your personal information to protect the copyright, trademarks, legal rights, property, or safety of our organisation, our website, our members, or third parties." },
      { n: "5.4", text: "Information that we collect may from time to time be stored, processed in, or transferred between parties located in countries outside of Australia." },
      { n: "5.5", text: "If there is a change of control in our organisation, or a sale or transfer of our organisation's assets, we reserve the right to transfer, to the extent permissible at law, our user databases, together with any personal information and non-personal information contained in those databases. This information may be disclosed to a potential purchaser under an agreement to maintain confidentiality. We would seek to only disclose information in good faith and where required by any of the above circumstances." },
      { n: "5.6", text: "By providing us with personal information, you consent to the terms of this Privacy Policy and the types of disclosure covered by this Policy. Where we disclose your personal information to third parties, we will request that the third party follow this Policy regarding handling your personal information." },
    ],
  },
  {
    heading: "6. Security of Your Personal Information",
    clauses: [
      { n: "6.1", text: "We are committed to ensuring that the information you provide to us is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure information and protect it from misuse, interference, loss, and unauthorised access, modification, and disclosure." },
      { n: "6.2", text: "The transmission and exchange of information is carried out at your own risk. We cannot guarantee the security of any information that you transmit to us, or receive from us. Although we take measures to safeguard against unauthorised disclosures of information, we cannot assure you that personal information that we collect will not be disclosed in a manner that is inconsistent with this Privacy Policy." },
    ],
  },
  {
    heading: "7. Access to Your Personal Information",
    clauses: [
      { n: "7.1", text: "You may request details of personal information that we hold about you in accordance with the provisions of the Privacy Act 1988 (Cth). A small administrative fee may be payable for the provision of information. If you would like a copy of the information which we hold about you, or believe that any information we hold on you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details below." },
      { n: "7.2", text: "We reserve the right to refuse to provide you with information that we hold about you, in certain circumstances set out in the Privacy Act." },
    ],
  },
  {
    heading: "8. Complaints About Privacy",
    clauses: [
      { n: "8.1", text: "If you have any complaints about our privacy practices, please feel free to send in details of your complaint using the contact details listed at the end of this policy. We take complaints very seriously and will respond shortly after receiving written notice of your complaint." },
    ],
  },
  {
    heading: "9. Changes to This Privacy Policy",
    clauses: [
      { n: "9.1", text: "Please be aware that we may change this Privacy Policy in the future. We may modify this Policy at any time, in our sole discretion, and all modifications will be effective immediately upon our posting of the modifications on our website. Please check back from time to time to review our Privacy Policy." },
    ],
  },
  {
    heading: "10. Our Website",
    clauses: [
      { n: "10.1", text: "When you visit our website, we may collect certain information such as browser type, operating system, and the website visited immediately before coming to our site. This information is used in an aggregated manner to analyse how people use our site, so that we can improve our service." },
      { n: "10.2", text: "We may from time to time use cookies on our website. Cookies are very small files which a website uses to identify you when you come back to the site and to store details about your use of the site. Cookies are not malicious programs that access or damage your computer. Most web browsers automatically accept cookies, but you can choose to reject cookies by changing your browser settings. However, this may prevent you from taking full advantage of our website." },
      { n: "10.3", text: "Our website may from time to time use cookies to analyse website traffic and help us provide a better website visitor experience. In addition, cookies may be used to serve relevant ads to website visitors through third-party services such as Google Ads. These ads may appear on this website or other websites you visit." },
      { n: "10.4", text: "Our site may from time to time have links to other websites not owned or controlled by us. These links are meant for your convenience only. Links to third-party websites do not constitute sponsorship, endorsement, or approval of those websites. We are not responsible for the privacy practices of other such websites, and we encourage our users to be aware, when they leave our website, to read the privacy statements of each and every website they visit." },
    ],
  },
];


/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function LegalHero({ title, eyebrow }: { title: string; eyebrow: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="legal-hero"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "150px 24px 90px",
        textAlign: "center",
        background: "linear-gradient(150deg,#f9e4ec 0%,#f0d8ee 25%,#e2d0f0 55%,#d8ccf4 80%,#e8d8f8 100%)",
      }}
    >
      <div className="legal-blob legal-blob-1" />
      <div className="legal-blob legal-blob-2" />
      <div style={{ ...fade(visible, 0), position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ width: 40, height: 1, background: "#7a5a8a" }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.26em", color: "#d11a8e" }}>
            {eyebrow}
          </span>
          <span style={{ width: 40, height: 1, background: "#7a5a8a" }} />
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
          fontWeight: 500,
          color: "#1c1630",
          lineHeight: 1.1,
          marginBottom: 16,
          letterSpacing: "-0.01em",
        }}>
          {title}
        </h1>
        {/* <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#5a4070", letterSpacing: "0.02em" }}>
          Last updated: {LAST_UPDATED}
        </p> */}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SECTION BLOCK
══════════════════════════════════════ */
function SectionBlock({ section, index }: { section: Section; index: number }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div ref={ref} style={{ ...fade(inView, Math.min(index * 40, 200)), marginBottom: 44 }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "1.55rem",
        fontWeight: 600,
        color: "#d11a8e",
        marginBottom: 6,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(155,125,184,0.18)",
      }}>
        {section.heading}
      </h2>
      {section.intro && (
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#3a2e50", lineHeight: 1.8, margin: "14px 0" }}>
          {section.intro}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
        {section.clauses.map((c) => (
          <div key={c.n} style={{ display: "flex", gap: 14 }}>
            <span style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700,
              color: "#9b7db8", minWidth: 40, flexShrink: 0,
            }}>
              {c.n}
            </span>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#3a2e50", lineHeight: 1.8, margin: 0 }}>
              {c.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function PrivacyPolicyPage() {
  const contentInView = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .legal-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .legal-blob-1 { top: -80px; left: -80px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(255,182,210,0.4) 0%, transparent 70%); animation: legalFloat 9s ease-in-out infinite; }
        .legal-blob-2 { bottom: -100px; right: -60px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(182,140,210,0.35) 0%, transparent 70%); animation: legalFloat 12s ease-in-out infinite reverse; }
        @keyframes legalFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(16px,-12px) scale(1.03); }
          66% { transform: translate(-10px,10px) scale(0.98); }
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .legal-hero { background: linear-gradient(150deg, #1a0f1f 0%, #140a1a 40%, #0f0a1a 100%) !important; }
        [data-theme="dark"] .legal-hero h1 { color: #f3ebff !important; }
        [data-theme="dark"] .legal-body { background: #0f0a1a !important; }
        [data-theme="dark"] .legal-card { background: #1a1226 !important; border-color: rgba(155,109,190,0.2) !important; box-shadow: 0 8px 60px rgba(0,0,0,0.4) !important; }
        [data-theme="dark"] .legal-card h2 { color: #f3ebff !important; border-bottom-color: rgba(155,109,190,0.25) !important; }
        [data-theme="dark"] .legal-card p { color: #b8a8c8 !important; }
        [data-theme="dark"] .legal-contact { background: #1a1226 !important; border-color: rgba(155,109,190,0.2) !important; }
        [data-theme="dark"] .legal-contact p,
        [data-theme="dark"] .legal-contact a { color: #b8a8c8 !important; }
        [data-theme="dark"] .legal-contact a { color: #a78bfa !important; }
      `}</style>

      <LegalHero title="Privacy Policy" eyebrow="LEGAL" />

      <section className="legal-body" style={{ background: "#fdf9fc", padding: "72px 24px 100px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            ref={contentInView.ref}
            className="legal-card"
            style={{
              ...fade(contentInView.inView, 0),
              background: "#fff",
              border: "1.5px solid rgba(180,160,210,0.22)",
              borderRadius: 24,
              padding: "48px 40px",
              boxShadow: "0 20px 60px rgba(140,110,180,0.08)",
            }}
          >
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#3a2e50", lineHeight: 1.85, marginBottom: 40 }}>
              We respect your right to privacy and are committed to safeguarding the privacy of our members, customers, and website visitors. This Privacy Policy sets out how we collect, hold, use, and disclose your personal information, and applies to our website and the services we provide.
            </p>

            {SECTIONS.map((s, i) => (
              <SectionBlock key={s.heading} section={s} index={i} />
            ))}
          </div>

          <div
            className="legal-contact"
            style={{
              marginTop: 32,
              background: "#f5eef8",
              border: "1px solid rgba(155,125,184,0.2)",
              borderRadius: 18,
              padding: "28px 32px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#3a2e50", lineHeight: 1.7, margin: 0 }}>
              Questions about this Privacy Policy? Contact us at{" "}
              <a href="mailto:privacy@msellevation.com" style={{ color: "#9b7db8", fontWeight: 600, textDecoration: "underline" }}>
                privacy@msellevation.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}