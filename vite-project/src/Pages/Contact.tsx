import { useState, useEffect, useRef, type ChangeEvent } from "react";
import banner3 from "../assets/banner3.avif";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function EllevationContact() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [sendHovered, setSendHovered] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", topic: "", message: "",
  });

  const { ref: heroRef, inView: heroIn } = useInView(0.1);
  const { ref: leftRef, inView: leftIn } = useInView(0.1);
  const { ref: formRef, inView: formIn } = useInView(0.1);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdf9fc; }

        /* ── Form fields (same as Conversations story form) ── */
        .contact-field-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4B1E56;
          margin-bottom: 8px;
        }
        .contact-form-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 14px;
          border: 1.5px solid rgba(124, 92, 191, 0.15);
          background: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 14.5px;
          color: #4B1E56;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-form-input::placeholder { color: #8a7a9a; }
        .contact-form-input:focus {
          border-color: #4B1E56;
          box-shadow: 0 0 0 4px rgba(75, 30, 86, 0.1);
        }
        select.contact-form-input { cursor: pointer; }

        /* ── Layout ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 52px;
          max-width: 1040px;
          margin: 0 auto;
          align-items: start;
        }
        .contact-name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 640px) {
          .contact-hero-section h1 { font-size: 34px !important; }
          .contact-name-row { grid-template-columns: 1fr; }
          .contact-form-card { padding: 36px 22px !important; }
        }

        /* ── Dark Mode (same system as Conversations page) ── */
        [data-theme="dark"] body { background: #0f0a1a !important; }
        [data-theme="dark"] .contact-hero-overlay {
          background: linear-gradient(100deg, rgba(10,5,16,0.88) 0%, rgba(10,5,16,0.6) 100%) !important;
        }
        [data-theme="dark"] .contact-body-section { background: #0f0a1a !important; }
        [data-theme="dark"] .contact-eyebrow { color: #d8ccf4 !important; }
        [data-theme="dark"] .contact-info-wrap h2 { color: #f3ebff !important; }
        [data-theme="dark"] .contact-info-wrap p { color: #b8a8c8 !important; }
        [data-theme="dark"] .contact-info-item-label { color: #d8ccf4 !important; }
        [data-theme="dark"] .contact-info-item-value { color: #b8a8c8 !important; }
        [data-theme="dark"] .contact-form-card {
          background: #1a1226 !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important;
        }
        [data-theme="dark"] .contact-form-card h3 { color: #f3ebff !important; }
        [data-theme="dark"] .contact-field-label { color: #d8ccf4 !important; }
        [data-theme="dark"] .contact-form-input {
          background: #1f172e !important;
          border-color: rgba(155,109,190,0.2) !important;
          color: #f3ebff !important;
        }
        [data-theme="dark"] .contact-form-input:focus {
          border-color: #a78bfa !important;
          background: #231933 !important;
          box-shadow: none !important;
        }
        [data-theme="dark"] .contact-form-input::placeholder { color: #7a6f94 !important; }
      `}</style>

      <section style={{ width: "100%", fontFamily: "'Montserrat', sans-serif" }}>
        {/* ── HERO ── */}
        <div
          ref={heroRef}
          className="contact-hero-section"
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundImage: `url(${banner3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "120px 24px 100px",
            textAlign: "center",
          }}
        >
          <div
            className="contact-hero-overlay"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background:
                "linear-gradient(100deg, rgba(22,10,34,0.8) 0%, rgba(22,10,34,0.45) 100%)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#fff",
                textTransform: "uppercase",
                marginBottom: 12,
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Contact
            </p>

            {/* Heading */}
            <h1
              style={{
                fontFamily: "'Astrid Regular', serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                marginBottom: 24,
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              Let's <span style={{ color: "#EFBF68" }}>Connect</span>
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.9)",
                maxWidth: 520,
                margin: "0 auto 36px",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              Whether you're ready to join, want to partner with us, or simply
              want to learn more — our team is here for you.
            </p>

            {/* CTA Button */}
            <div
              style={{
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
              }}
            >
              <button
                type="button"
                onClick={scrollToForm}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 14,
                  background: "#D7B264",
                  color: "#fff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(75, 30, 86, 0.25)",
                  transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                Get in Touch →
              </button>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div
          className="contact-body-section"
          style={{
            background: "linear-gradient(180deg, #f6f3fa 0%, #ede7f5 100%)",
            padding: "80px 24px 100px",
          }}
        >
          <div className="contact-grid">
            {/* ── LEFT INFO ── */}
            <div
              ref={leftRef}
              className="contact-info-wrap"
              style={{
                opacity: leftIn ? 1 : 0,
                transform: leftIn ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span
                className="contact-eyebrow"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#662369",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                Reach Out
              </span>
              <h2
                style={{
                  fontFamily: "'Astrid Regular', serif",
                  fontSize: "clamp(32px, 4vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#1a0a2e",
                  marginBottom: 24,
                }}
              >
                We'd Love to Hear From You
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 18,
                  color: "#554866",
                  lineHeight: 1.65,
                  marginBottom: 36,
                }}
              >
                From intimate conversations to community partnerships — reach
                out and let's begin.
              </p>

              {[
                { label: "Email", value: "hello@ellevation.com.au" },
                { label: "Phone", value: "+61 2 9000 0000" },
                { label: "Location", value: "Sydney, NSW, Australia" },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 24 }}>
                  <p
                    className="contact-info-item-label"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#4B1E56",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    className="contact-info-item-value"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 18,
                      color: "#554866",
                      lineHeight: 1.65,
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── FORM CARD ── */}
            <div
              ref={formRef}
              className="contact-form-card"
              style={{
                background: "#fff",
                border: "1px solid rgba(124, 92, 191, 0.15)",
                borderRadius: 28,
                padding: "40px 32px",
                boxShadow: "0 10px 30px rgba(124, 92, 191, 0.02)",
                opacity: formIn ? 1 : 0,
                transform: formIn ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Astrid Regular', serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#4B1E56",
                  textAlign: "center",
                  marginBottom: 32,
                }}
              >
                Send Us a Message
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {/* Name row */}
                <div className="contact-name-row">
                  <div>
                    <label htmlFor="firstName" className="contact-field-label">First Name</label>
                    <input
                      id="firstName"
                      className="contact-form-input"
                      placeholder="First name"
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="contact-field-label">Last Name</label>
                    <input
                      id="lastName"
                      className="contact-form-input"
                      placeholder="Last name"
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="contact-field-label">Email Address</label>
                  <input
                    id="email"
                    className="contact-form-input"
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="contact-field-label">Phone (optional)</label>
                  <input
                    id="phone"
                    className="contact-form-input"
                    placeholder="Your phone number"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Topic */}
                <div>
                  <label htmlFor="topic" className="contact-field-label">How can we help you?</label>
                  <select
                    id="topic"
                    className="contact-form-input"
                    style={{ color: form.topic ? undefined : "#8a7a9a" }}
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="join">Join the community</option>
                    <option value="partner">Partnership enquiry</option>
                    <option value="events">Events &amp; retreats</option>
                    <option value="general">General question</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="contact-field-label">Your Message</label>
                  <textarea
                    id="message"
                    className="contact-form-input"
                    style={{ resize: "vertical", lineHeight: 1.6 }}
                    rows={6}
                    placeholder="Tell us how we can help..."
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onMouseEnter={() => setSendHovered(true)}
                  onMouseLeave={() => setSendHovered(false)}
                  style={{
                    width: "100%",
                    padding: "15px 26px",
                    borderRadius: 14,
                    border: "none",
                    background: "#D7B264",
                    color: "#fff",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(75, 30, 86, 0.25)",
                    transform: sendHovered ? "translateY(-2px)" : "translateY(0)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}