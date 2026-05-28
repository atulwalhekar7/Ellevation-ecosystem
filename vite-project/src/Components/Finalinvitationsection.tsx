import { useEffect, useRef, useState } from "react";

const FinalInvitationSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap');
.fi-eyebrow {
  font-family: 'Segoe UI', sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color:  rgb(124, 92, 191);
  margin: 0 0 16px;
  text-align: center;
}
        .final-invitation-section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #f5e6e8 0%,
            #f0dde8 20%,
            #e8d5e8 40%,
            #ddd0e8 55%,
            #e8d5d8 70%,
            #f0ddd5 85%,
            #f5e8e0 100%
          );
          position: relative;
          overflow: hidden;
          font-family: 'Playfair Display', Georgia, serif;
          padding: 60px 40px;
          box-sizing: border-box;
        }

        /* Soft ambient blobs for depth */
        .final-invitation-section::before {
          content: '';
          position: absolute;
          top: -60px;
          left: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255, 220, 210, 0.55) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .final-invitation-section::after {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -60px;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(200, 180, 230, 0.45) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .fi-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .fi-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        

        .fi-heading {
          font-family: "Cormorant Garamond", serif;;
          font-size: clamp(36px, 5.5vw, 68px);
          font-weight: 700;
          line-height: 1.15;
          color: #1a1525;
          margin: 0;
          max-width: 760px;
          letter-spacing: -0.01em;
        }

        .fi-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          align-items: center;
        }

        /* Primary button — dark pill */
        .fi-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: #1a1525;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }

        .fi-btn-primary:hover {
          background: #2c2140;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26, 21, 37, 0.28);
        }

        .fi-btn-primary:active {
          transform: translateY(0);
        }

        /* Secondary button — soft lavender pill with border */
        .fi-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          background: rgba(200, 180, 230, 0.22);
          color: #3d2f5a;
          border: 1.5px solid rgba(160, 130, 210, 0.45);
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.01em;
          backdrop-filter: blur(6px);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }

        .fi-btn-secondary:hover {
          background: rgba(200, 180, 230, 0.38);
          border-color: rgba(160, 130, 210, 0.7);
          transform: translateY(-1px);
        }

        .fi-btn-secondary:active {
          transform: translateY(0);
        }

        .fi-arrow {
          font-size: 15px;
          line-height: 1;
        }

        @media (max-width: 600px) {
          .fi-buttons {
            flex-direction: column;
            gap: 12px;
          }

          .fi-btn-primary,
          .fi-btn-secondary {
            width: 220px;
            justify-content: center;
          }
        }
      `}</style>

      <section className="final-invitation-section" ref={sectionRef}>
        <div className={`fi-content${visible ? " visible" : ""}`}>
          <p className="fi-eyebrow">Final Invitation</p>

          {/* <h2 className="fi-heading">
            Enter the ecosystem. Find your pathway. Rise with us.
          </h2> */}

          <div className="fi-buttons">
            <a href="/ms-ellevation" className="fi-btn-primary">
              Enter Ms. Ellevation <span className="fi-arrow">→</span>
            </a>
            <a href="/hub" className="fi-btn-secondary">
              Join Membership <span className="fi-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinalInvitationSection;