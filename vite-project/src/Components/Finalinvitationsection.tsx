import { useEffect, useRef, useState } from "react";

const FinalInvitationSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .final-invitation-section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%);
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
          box-sizing: border-box;
        }

        .fi-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fi-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fi-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #662369;
          margin: 0 0 12px 0;
        }

        .fi-heading {
          font-family: 'Astrid Regular', serif;
          font-size: 52px;
          font-weight: 700;
          color: #4B1E56;
          margin: 0 0 48px 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
          max-width: 800px;
        }

        .fi-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        /* Primary button */
        .fi-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #D7238F;
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(90, 63, 160, 0.2);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s, gap 0.2s;
          white-space: nowrap;
        }

        .fi-btn-primary:hover {
          background: #4c2882;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 40, 130, 0.3);
          gap: 12px;
        }

        /* Secondary button */
        .fi-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #D7238F;
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(90, 63, 160, 0.2);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s, gap 0.2s;
          white-space: nowrap;
        }

        .fi-btn-secondary:hover {
           background: #4c2882;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 40, 130, 0.3);
          gap: 12px;
        }

        .fi-arrow {
          font-size: 14px;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        @media (max-width: 868px) {
          .fi-heading { font-size: 38px !important; margin-bottom: 36px !important; }
          .final-invitation-section { padding: 80px 24px !important; }
        }

        @media (max-width: 600px) {
          .fi-buttons {
            flex-direction: column;
            gap: 14px;
            width: 100%;
          }
          .fi-btn-primary,
          .fi-btn-secondary {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .final-invitation-section {
          background: linear-gradient(180deg, #0d0614 0%, #160d22 100%);
        }
        [data-theme="dark"] .fi-eyebrow {
          color: #a78bfa;
        }
        [data-theme="dark"] .fi-heading {
          color: #ffffff;
        }
        [data-theme="dark"] .fi-btn-primary {
           background: #D7238F;
          color: #ffffff;
          border-color: rgba(155, 109, 190, 0.2);
        }
        [data-theme="dark"] .fi-btn-primary:hover {
          background: #1f142e;
          border-color: rgba(155, 109, 190, 0.4);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        [data-theme="dark"] .fi-btn-secondary {
          background: #D7238F;
          color: #ffffff;
          border-color: rgba(155, 109, 190, 0.2);
        }
        [data-theme="dark"] .fi-btn-secondary:hover {
          background: #1f142e;
          border-color: rgba(155, 109, 190, 0.4);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <section className="final-invitation-section" ref={sectionRef}>
        <div className={`fi-content${visible ? " visible" : ""}`}>

          <h2 className="fi-heading">
            Enter the ecosystem. Find your pathway.
          </h2>

          <div className="fi-buttons">
            <a href="/ms-ellevation" className="fi-btn-primary">
              Ms. Ellevation <span className="fi-arrow">→</span>
            </a>
            <a href="/hub" className="fi-btn-secondary">
              Ellevation Hub <span className="fi-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalInvitationSection;