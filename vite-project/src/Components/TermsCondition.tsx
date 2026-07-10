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
type Section = { heading: string; clauses: Clause[] };

const SECTIONS: Section[] = [
  {
    heading: "1. Information",
    clauses: [
      { n: "1.1", text: "The information contained on this Site is for general information purposes only. While we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the Site for any purpose. Any reliance you place on the information is at your own risk. Before acting on any information, we recommend that you consider whether it is appropriate for your circumstances and make your own enquiries to determine if the information, products, or services are appropriate for your intended use." },
    ],
  },
  {
    heading: "2. Licence to Use Site",
    clauses: [
      { n: "2.1", text: "We grant you a non-exclusive, worldwide, non-transferable licence to use the Site in accordance with these Terms." },
      { n: "2.2", text: "You may access and use the Site in the normal manner and may also print copies of any page within the Site for your own personal, non-commercial use. You may copy extracts only to individual third parties for their personal use, but only if you acknowledge the Site as the source of the material. Any redistribution or reproduction of part or all of the contents in any form is prohibited unless expressly allowed by these Terms." },
      { n: "2.3", text: "You may not, except with our express written permission, distribute or commercially exploit the content of this Site. You may not transmit it or store it on any other website or other form of electronic retrieval system." },
      { n: "2.4", text: "You must not use or add any content to the Site unless you hold all necessary rights, licences, and consents to do so; that would cause you or us to breach any law, regulation, rule, code, or other legal obligation; that is or could reasonably be considered to be obscene, inappropriate, defamatory, disparaging, indecent, seditious, offensive, pornographic, threatening, abusive, liable to incite racial hatred, discriminatory, blasphemous, in breach of confidence, or in breach of privacy; that would bring us or the Site into disrepute; or that infringes the intellectual property or other rights of any person." },
      { n: "2.5", text: "The Site may contain links to other websites as well as content added by people other than us. We have no control over the nature, content, and availability of those websites or external content. We do not endorse, recommend, sponsor, or approve any such user-generated content, the views expressed within that content, or any content available on any linked website." },
      { n: "2.6", text: "You acknowledge and agree that we retain complete editorial control over the Site and may alter, amend, or cease the operation of the Site at any time in our sole discretion, and that the Site will not operate on a continuous basis and may be unavailable from time to time (including for maintenance purposes)." },
    ],
  },
  {
    heading: "3. Intellectual Property Rights",
    clauses: [
      { n: "3.1", text: "Nothing in these Terms constitutes a transfer of any intellectual property rights. You acknowledge and agree that, as between you and us, we own all intellectual property rights in the Site." },
      { n: "3.2", text: "Our Site contains material which is owned by or licensed to us and is protected by Australian and international laws, including but not limited to the trademarks, trade names, software, content, design, images, graphics, layout, appearance, and look of our Site. We own the copyright that subsists in all creative and literary works displayed on the Site." },
      { n: "3.3", text: "By posting or adding any content onto the Site, you grant us a perpetual, non-exclusive, royalty-free, irrevocable, worldwide, and transferable right and licence to use that content in any way (including, without limitation, by reproducing, changing, and communicating the content to the public) and permit us to authorise any other person to do the same thing." },
      { n: "3.4", text: "You consent to any act or omission that would otherwise constitute an infringement of your moral rights, and if you add any content in which any third party has moral rights, you must also ensure that the third party also consents in the same manner." },
      { n: "3.5", text: "The licence in paragraph 3.3 will survive any termination of these Terms." },
      { n: "3.6", text: "You represent and warrant to us that you have all necessary rights to grant the licences and consents set out in paragraphs 3.2 and 3.3." },
    ],
  },
  {
    heading: "4. Warranties",
    clauses: [
      { n: "4.1", text: "You represent and warrant to us that you have had sufficient opportunity to access and comply with these Terms and that you have the legal capacity to enter these Terms. If you do not agree with these Terms, please do not use this Site." },
    ],
  },
  {
    heading: "5. Liability",
    clauses: [
      { n: "5.1", text: "To the full extent permitted by law, we exclude all liability for any loss, damage, costs, or expense, whether direct, indirect, incidental, special, and/or consequential, including loss of profits or data, suffered by you or any third party, or claims made against you or any third party, which result from any use or access of, or any inability to use or access, the Site." },
      { n: "5.2", text: "To the full extent permitted by law, we exclude all representations, warranties, guarantees, or terms (whether express or implied) other than those expressly set out in these Terms." },
      { n: "5.3", text: "These Terms are to be read subject to any legislation which prohibits or restricts the exclusion, restriction, or modification of any implied warranties, conditions, guarantees, or obligations. Every effort is made to keep the Site up and running smoothly. We take no responsibility for, and will not be liable for, the Site being temporarily unavailable due to technical issues beyond our control." },
    ],
  },
  {
    heading: "6. Indemnity",
    clauses: [
      { n: "6.1", text: "You may only use this Site if you agree to indemnify and hold us (and our officers, directors, employees, and agents) harmless from and against all claims, actions, suits, demands, damages, liabilities, costs, or expenses (including legal costs and expenses on a full indemnity basis), including in tort, contract, or negligence, arising out of or connected to your use of this Site." },
      { n: "6.2", text: "These Terms, and any rights and licences granted hereunder, may not be transferred or assigned by you, but may be assigned by us without restriction." },
    ],
  },
  {
    heading: "7. Changes",
    clauses: [
      { n: "7.1", text: "This information and these Terms may be amended without notice, from time to time, in our sole discretion. Your use of the Site following the amendments indicates that you accept the amendments. You should check these Terms from time to time to review any changes." },
    ],
  },
  {
    heading: "8. Breach of These Terms",
    clauses: [
      { n: "8.1", text: "You may only use this Site for a lawful purpose and in a manner consistent with the provisions set out in these Terms. You must not use this Site if you think the exclusions and limitations of liability set out in these Terms are unreasonable. We reserve the right to take down content and information found to be in breach of copyright, or which in our reasonable opinion is deemed illegal and/or inappropriate. If you breach the Terms, we reserve the right to block you from the Site, bring court proceedings against you, and to enforce our rights against you. All rights not expressly granted in the Terms are reserved." },
    ],
  },
  {
    heading: "9. Competitors",
    clauses: [
      { n: "9.1", text: "Competitors are prohibited from using the content or information on our Site for the purpose of competing with our business. If you breach this provision, we will hold you responsible for any loss that we may sustain, and hold you accountable for any profits that you may make from the prohibited use. We reserve the right, in our sole discretion, to exclude any person from using our Site." },
    ],
  },
  {
    heading: "10. Enforceability",
    clauses: [
      { n: "10.1", text: "If any clause or provision of these Terms is found to be illegal, invalid, or unenforceable by a court of law, then the clause or provision will not apply in that jurisdiction and is deemed not to have been included in the Terms in that jurisdiction. This will not affect the remaining provisions, which continue in full effect." },
    ],
  },
  {
    heading: "11. Disputes",
    clauses: [
      { n: "11.1", text: "By accepting these Terms, you agree to use your best endeavours to use negotiation and mediation to resolve disputes arising from or in connection with these Terms. Please notify us in writing of any dispute you may have." },
    ],
  },
  {
    heading: "12. Termination",
    clauses: [
      { n: "12.1", text: "These Terms terminate automatically if, for any reason, we cease to operate the Site." },
      { n: "12.2", text: "We may otherwise terminate these Terms immediately, on notice to you, if you have breached these Terms in any way." },
    ],
  },
  {
    heading: "13. General",
    clauses: [
      { n: "13.1", text: "Each party must, at its own expense, do everything reasonably necessary to give full effect to this Agreement and the events contemplated by it." },
    ],
  },
  {
    heading: "14. Jurisdiction",
    clauses: [
      { n: "14.1", text: "These Terms are governed by the laws of Australia, and each party submits to the jurisdiction of the courts of Australia." },
    ],
  },
];

const LAST_UPDATED = "July 2026";

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
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.26em", color: "#7a5a8a" }}>
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
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#5a4070", letterSpacing: "0.02em" }}>
          Last updated: {LAST_UPDATED}
        </p>
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
        color: "#1c1630",
        marginBottom: 6,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(155,125,184,0.18)",
      }}>
        {section.heading}
      </h2>
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
export default function TermsConditionsPage() {
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

      <LegalHero title="Terms &amp; Conditions" eyebrow="LEGAL" />

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
              These Terms are important and you should ensure that you read them carefully and contact us with any questions before you use the Site. If you continue to browse and use this Site, you acknowledge and agree that you have had sufficient chance to read and understand the Terms and you agree to be bound by them. If you do not agree to the Terms, please do not use the Site.
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
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:hello@msellevation.com" style={{ color: "#9b7db8", fontWeight: 600, textDecoration: "underline" }}>
                hello@msellevation.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}