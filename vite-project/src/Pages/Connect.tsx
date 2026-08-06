import { useEffect, useRef, useState, type CSSProperties } from "react";
import emailjs from "@emailjs/browser";
import banner2 from "../assets/banner2.avif";
//service Id :service_ux9vfej
//Template ID : template_oczchp4
//Public Key: Pu2wZN2ERnHjdboLI
/* ── Animation Helpers ── */
function useInView(threshold = 0.12) {
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
    transform: inView ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}

/* ── Hero Banner Section ── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { 
    const t = setTimeout(() => setMounted(true), 80); 
    return () => clearTimeout(t);
  }, []);

  return (
    <section 
      className="events-hero"
      style={{ 
        background: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(${banner2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "120px 24px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          ...fade(mounted, 0),
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, marginBottom: 24,
        }}>
          {/* <div className={mounted ? "line-draw" : ""} style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)", transformOrigin: "right center" }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4B1E56" }}>
            Connect With Us
          </span>
          <div className={mounted ? "line-draw" : ""} style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)", transformOrigin: "left center" }} /> */}
        </div>

        <h1 style={{
          ...fade(mounted, 130),
            fontFamily: "'Astrid Regular', serif",
            fontSize: "clamp(36px,5vw,56px)",
            fontWeight: 700, lineHeight: 1.15,
            color: "#ffff", marginBottom: 24, letterSpacing: "-0.01em",
          }}>
          Ecosystem Hub <span style={{ color: "#EFBF68" }}>Enquiry</span>
        </h1>

        <p style={{
          ...fade(mounted, 260),
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "clamp(15px,1.8vw,17px)",
          color: "#fff", maxWidth: 580, margin: "0 auto", lineHeight: 1.75,
        }}>
          Whether you are looking to collaborate, seek programmatic guidance, or establish community connections, let us build pathways together.
        </p>

        <div style={{ ...fade(mounted, 380), marginTop: 40 }}>
          <div className="bounce-arrow">↓</div>
        </div>
      </div>
    </section>
  );
}

/* ── Integrated Common Enquiry Form Module ── */
function CommonEnquiryForm() {
  const { ref, inView } = useInView(0.1);
  const [enquiryType, setEnquiryType] = useState("general");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitHov, setSubmitHov] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formRef.current) return;

  emailjs
    .sendForm(
      "service_ux9vfej",
      "template_oczchp4",
      formRef.current,
      {
        publicKey: "Pu2wZN2ERnHjdboLI",
      }
    )
    .then(
      () => {
        setFormSubmitted(true);
      },
      (error) => {
        console.error("FAILED...", error);
        alert("Something went wrong. Please try again.");
      }
    );
};

  return (
    <section className="enquiry-form-section" style={{ background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)", padding: "80px 24px 100px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        
        {/* Section Heading Typography Grid */}
        <div ref={ref} style={{ ...fade(inView, 0), textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#662369", margin: "0 0 12px" }}>
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "'Astrid Regular', serif", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "32px", color: "#1a0a2e" }}>
Reach Out to Us          </h2>
        </div>

        {/* Central Form Wrapper Card Layout */}
        <div style={{
          ...fade(inView, 120),
          background: "#fff",
          border: "1.5px solid rgba(180,160,210,0.18)",
          borderRadius: 24,
          padding: "48px 40px",
          boxShadow: "0 16px 48px rgba(140,110,180,0.08)",
          position: "relative"
        }} className="form-wrapper-card">
          
          {formSubmitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <h3 style={{ fontFamily: "'Astrid Regular', serif", fontSize: 32, color: "#1c1630", marginBottom: 12 }}>Thank You</h3>
              <p style={{ fontFamily: "'Montserrat',sans-serif", color: "#5a4a6a", fontSize: 15, lineHeight: 1.6, maxWidth: 445, margin: "0 auto" }}>
                Your request has been successfully synchronized with our leadership network. We will get back to you shortly.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Specialized Radio Segment Fields */}
              <div>
                <label style={{ display: "block", fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#662369", marginBottom: 12 }}>
                  Enquiry Stream
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                  {[
                    { id: "general", label: "General Enquiry" },
                    { id: "partnership", label: "Partnership Engagement" },
                    { id: "connection", label: "Community Connection" }
                  ].map((stream) => (
                    <label 
                      key={stream.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 16px",
                        borderRadius: 14,
                        border: "1.5px solid",
                        borderColor: enquiryType === stream.id ? "#9b7db8" : "rgba(180,160,210,0.25)",
                        background: enquiryType === stream.id ? "rgba(155,125,184,0.06)" : "transparent",
                        cursor: "pointer",
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: 14,
                        fontWeight: enquiryType === stream.id ? 600 : 400,
                        color: "#1c1630",
                        transition: "all 0.2s ease"
                      }}
                      className="radio-tile"
                    >
                      <input 
                        type="radio" 
                        name="enquiryType" 
                        value={stream.id}
                        checked={enquiryType === stream.id}
                        onChange={(e) => setEnquiryType(e.target.value)}
                        style={{ accentColor: "#9b7db8", cursor: "pointer" }}
                      />
                      {stream.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Standard Grid Inputs Layout Matrix */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                <div>
                  <label htmlFor="fullName" className="field-label">Full Name *</label>
                  <input type="text"   name="fullName" id="fullName" required className="form-input" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="emailAddress" className="field-label">Email Address *</label>
                  <input type="email" name="emailAddress" id="emailAddress" required className="form-input" placeholder="name@domain.com" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                <div>
                  <label htmlFor="phoneNumber" className="field-label">Phone Number</label>
                  <input type="tel" name="phoneNumber" id="phoneNumber" className="form-input" placeholder="Optional" />
                </div>
                <div>
                  <label htmlFor="organizationName" className="field-label">Organization / Community Group</label>
                  <input type="text" id="organizationName" name="organizationName" className="form-input" placeholder="If applicable" />
                </div>
              </div>

              {/* Contextual Messaging Prompts logic bases on stream select */}
              <div>
                <label htmlFor="messageBody" className="field-label">
                  {enquiryType === "general" && "How can we support you today? *"}
                  {enquiryType === "partnership" && "Detail your partnership proposal objectives *"}
                  {enquiryType === "connection" && "Describe your community connection request details *"}
                </label>
                <textarea 
                  id="messageBody" 
                  required 
                  rows={5} 
                  className="form-input" 
                  name="messageBody"
                  style={{ resize: "vertical" }}
                  placeholder="Provide comprehensive details here..."
                />
              </div>

              {/* Action Operations Execution block */}
              <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  onMouseEnter={() => setSubmitHov(true)}
                  onMouseLeave={() => setSubmitHov(false)}
                  style={{
                    padding: "14px 36px",
                    borderRadius: 999,
                    border: "none",
                    background: submitHov ? "#4B1E56" : "#D7B264",
                    color: "#fff",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    boxShadow: submitHov ? "0 8px 24px rgba(140,110,180,0.35)" : "0 4px 14px rgba(140,110,180,0.18)",
                    transform: submitHov ? "translateY(-2px)" : "translateY(0)",
                    transition: "all 0.25s ease",
                  }}
                >
                  Submit Form
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}

/* ── Main Export Block ── */
export default function EventsPage() {
  useEffect(() => {
    document.title = "Ecosystem Hub Enquiry | Get in Touch";

    const description =
      "Whether you're looking to collaborate, seek programmatic guidance, or establish community connections, reach out to our Ecosystem Hub. Let's build pathways together.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    // Optional cleanup: reset title/description when leaving the page
    return () => {
      document.title = "Your Site Name";
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5eef8; }

        .blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .blob-1 { top: -100px; left: -80px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,210,230,0.45) 0%, transparent 68%); animation: floatA 9s ease-in-out infinite; }
        .blob-2 { bottom: -80px; right: -60px; width: 420px; height: 420px; background: radial-gradient(circle, rgba(190,170,240,0.35) 0%, transparent 68%); animation: floatB 11s ease-in-out infinite 2s; }
        .blob-3 { top: 30%; left: 55%; width: 260px; height: 260px; background: radial-gradient(circle, rgba(210,190,255,0.22) 0%, transparent 68%); animation: floatA 13s ease-in-out infinite 4s; }

        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(18px,-14px) scale(1.02); }
          66%      { transform: translate(-10px,10px) scale(0.98); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-16px,12px) scale(1.03); }
          70%      { transform: translate(12px,-8px) scale(0.97); }
        }

        .line-draw { animation: lineDraw 0.7s ease 0.2s both; }
        @keyframes lineDraw {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .bounce-arrow { display: inline-block; font-size: 20px; color: #fff; animation: bounceDown 2s ease-in-out infinite; }
        @keyframes bounceDown {
          0%,100% { transform: translateY(0); opacity: 0.7; }
          50%      { transform: translateY(8px); opacity: 1; }
        }

        .field-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #2a183a;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 13px 18px;
          border-radius: 12px;
          border: 1.5px solid rgba(180,160,210,0.25);
          background: #fdfbfe;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #1c1630;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input:focus {
          border-color: #9b7db8;
          background: #fff;
          box-shadow: 0 4px 12px rgba(155,125,184,0.06);
        }

        /* ── Theme Switch Dark Mode System ── */
        [data-theme="dark"] body { background: #0f0a1a !important; }
        [data-theme="dark"] .events-hero { background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${banner2}) !important; background-size: cover !important; }
        [data-theme="dark"] .enquiry-form-section { background: #140a1a !important; }
        [data-theme="dark"] .enquiry-form-section h2 { color: #f3ebff !important; }
        [data-theme="dark"] .form-wrapper-card { background: #1a1226 !important; border-color: rgba(155, 109, 190, 0.2) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important; }
        [data-theme="dark"] .field-label { color: #d8ccf4 !important; }
        [data-theme="dark"] .radio-tile { color: #f3ebff !important; border-color: rgba(155,109,190,0.2) !important; }
        [data-theme="dark"] .form-input { background: #1f172e !important; border-color: rgba(155,109,190,0.2) !important; color: #f3ebff !important; }
        [data-theme="dark"] .form-input:focus { border-color: #a78bfa !important; background: #231933 !important; }
        [data-theme="dark"] .form-wrapper-card h3 { color: #f3ebff !important; }
        [data-theme="dark"] .form-wrapper-card p { color: #b8a8c8 !important; }
        [data-theme="dark"] .bounce-arrow { color: #a78bfa !important; }
      `}</style>

      <Hero />
      <CommonEnquiryForm />
    </>
  );
}