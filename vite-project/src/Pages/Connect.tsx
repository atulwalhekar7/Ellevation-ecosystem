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
        body { background: #f5eef8; }

        @keyframes pulseArrow {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(4px); }
        }

        /* ── Form fields (same as Connect page) ── */
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
        .form-input::placeholder { color: #8a7a9a; }
        .form-input:focus {
          border-color: #9b7db8;
          background: #fff;
          box-shadow: 0 4px 12px rgba(155,125,184,0.06);
        }
        .form-select { cursor: pointer; }

        /* ── Layout ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 52px;
          max-width: 1000px;
          margin: 0 auto;
          align-items: start;
        }
        .contact-name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 520px) {
          .contact-name-row { grid-template-columns: 1fr; }
          .contact-form-card { padding: 36px 22px !important; }
        }

        /* ── Dark Mode (same system as Connect page) ── */
        [data-theme="dark"] body { background: #0f0a1a !important; }
        [data-theme="dark"] .contact-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${banner3}) !important;
          background-size: cover !important;
          background-position: center !important;
        }
        [data-theme="dark"] .contact-body-section { background: #140a1a !important; }
        [data-theme="dark"] .contact-info-wrap h2 { color: #f3ebff !important; }
        [data-theme="dark"] .contact-info-wrap p { color: #b8a8c8 !important; }
        [data-theme="dark"] .contact-info-item-label { color: #a78bfa !important; }
        [data-theme="dark"] .contact-info-item-value { color: #d8ccf4 !important; }
        [data-theme="dark"] .contact-form-card {
          background: #1a1226 !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important;
        }
        [data-theme="dark"] .contact-form-card h3 { color: #f3ebff !important; }
        [data-theme="dark"] .form-input {
          background: #1f172e !important;
          border-color: rgba(155,109,190,0.2) !important;
          color: #f3ebff !important;
        }
        [data-theme="dark"] .form-input::placeholder { color: rgba(243, 235, 255, 0.4) !important; }
        [data-theme="dark"] .form-input:focus {
          border-color: #a78bfa !important;
          background: #231933 !important;
        }
      `}</style>

      <section style={{ width: "100%", fontFamily: "'Montserrat', sans-serif" }}>
        {/* ── HERO ── */}
        <div
          ref={heroRef}
          className="contact-hero-section"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(${banner3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "120px 24px 100px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#fff",
              textTransform: "uppercase",
              marginBottom: 22,
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
              color: "#fff",
              lineHeight: 1.75,
              maxWidth: 580,
              margin: "0 auto 40px",
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
                padding: "14px 36px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: btnHovered ? "#4B1E56" : "#D7B264",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#fff",
                boxShadow: btnHovered
                  ? "0 8px 24px rgba(140,110,180,0.35)"
                  : "0 4px 14px rgba(140,110,180,0.18)",
                transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.25s ease",
              }}
            >
              Get in Touch
              <span
                style={{
                  display: "inline-block",
                  animation: btnHovered ? "pulseArrow 0.6s ease infinite" : "none",
                }}
              >
                →
              </span>
            </button>
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
                transform: leftIn ? "translateY(0)" : "translateY(26px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Astrid Regular', serif",
                  fontSize: "clamp(32px, 4vw, 44px)",
                  fontWeight: 700,
                  color: "#1a0a2e",
                  lineHeight: 1.2,
                  marginBottom: 18,
                }}
              >
                We'd Love to Hear From You
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 15,
                  color: "#5a4a6a",
                  lineHeight: 1.6,
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
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "#662369",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    className="contact-info-item-value"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 15,
                      color: "#1c1630",
                      fontWeight: 400,
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
                border: "1.5px solid rgba(180,160,210,0.18)",
                borderRadius: 24,
                padding: "48px 40px",
                boxShadow: "0 16px 48px rgba(140,110,180,0.08)",
                opacity: formIn ? 1 : 0,
                transform: formIn ? "translateY(0)" : "translateY(26px)",
                transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Astrid Regular', serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#1c1630",
                  textAlign: "center",
                  marginBottom: 28,
                }}
              >
                Send Us a Message
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Name row */}
                <div className="contact-name-row">
                  <input
                    className="form-input"
                    placeholder="First Name"
                    aria-label="First Name"
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <input
                  className="form-input"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

                {/* Phone */}
                <input
                  className="form-input"
                  placeholder="Phone (optional)"
                  aria-label="Phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                {/* Topic */}
                <select
                  className="form-input form-select"
                  aria-label="How can we help you?"
                  style={{ color: form.topic ? undefined : "#8a7a9a" }}
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                >
                  <option value="" disabled>How can we help you?</option>
                  <option value="join">Join the community</option>
                  <option value="partner">Partnership enquiry</option>
                  <option value="events">Events &amp; retreats</option>
                  <option value="general">General question</option>
                </select>

                {/* Message */}
                <textarea
                  className="form-input"
                  style={{ minHeight: 120, resize: "vertical" }}
                  placeholder="Your message..."
                  aria-label="Your message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />

                {/* Submit */}
                <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onMouseEnter={() => setSendHovered(true)}
                    onMouseLeave={() => setSendHovered(false)}
                    style={{
                      padding: "14px 36px",
                      borderRadius: 999,
                      border: "none",
                      background: sendHovered ? "#4B1E56" : "#D7B264",
                      color: "#fff",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: sendHovered
                        ? "0 8px 24px rgba(140,110,180,0.35)"
                        : "0 4px 14px rgba(140,110,180,0.18)",
                      transform: sendHovered ? "translateY(-2px)" : "translateY(0)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}