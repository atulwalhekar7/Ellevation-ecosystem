import { useState, useEffect, useRef, type ChangeEvent } from "react";
import banner3 from "../assets/banner3.avif";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
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

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #e0d5ec",
    borderRadius: 10,
    fontFamily: "'Jost', sans-serif",
    fontSize: 13,
    color: "#2d1f3d",
    background: "#fdfaff",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseArrow {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(4px); }
        }

        .elv-inp::placeholder { color: #b0a0c0; }
        .elv-inp:focus { border-color: #9b6fc4 !important; }
        .elv-select { cursor: pointer; color: #b0a0c0; }
        .elv-select:focus { border-color: #9b6fc4 !important; }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .contact-body-section {
          background: linear-gradient(160deg, #140a1a 0%, #0f0a1a 60%, #080510 100%) !important;
        }
        [data-theme="dark"] .contact-info-wrap h2 {
          color: #f3ebff !important;
        }
        [data-theme="dark"] .contact-info-wrap p {
          color: #b8a8c8 !important;
        }
        [data-theme="dark"] .contact-info-item-label {
          color: #a78bfa !important;
        }
        [data-theme="dark"] .contact-info-item-value {
          color: #d8ccf4 !important;
        }
        [data-theme="dark"] .contact-form-card {
          background: #1a1226 !important;
          border-color: rgba(155, 109, 190, 0.2) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
        }
        [data-theme="dark"] .contact-form-card h3 {
          color: #f3ebff !important;
        }
        [data-theme="dark"] .elv-inp, 
        [data-theme="dark"] .elv-select {
          background: #0f0a1a !important;
          border-color: rgba(155, 109, 190, 0.3) !important;
          color: #f3ebff !important;
        }
        [data-theme="dark"] .elv-inp::placeholder {
          color: rgba(243, 235, 255, 0.4) !important;
        }
        [data-theme="dark"] .contact-hero-section {
          background-blend-mode: overlay;
          background-color: rgba(15, 10, 26, 0.6);
        }
      `}</style>

      <section
        style={{
          width: "100%",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {/* ── HERO ── */}
        <div
          ref={heroRef}
          className="contact-hero-section"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "72px 32px 80px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.26em",
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
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 20,
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            Let's Connect
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.75,
              maxWidth: 520,
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
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 30px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg, #9b6fc4, #c084d4)",
                fontFamily: "'Jost', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "0.04em",
                transform: btnHovered ? "scale(1.05)" : "scale(1)",
                opacity: btnHovered ? 0.92 : 1,
                transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s",
                boxShadow: btnHovered
                  ? "0 8px 24px rgba(155,111,196,0.35)"
                  : "0 4px 14px rgba(155,111,196,0.22)",
              }}
            >
              Get in Touch
              <span
                style={{
                  display: "inline-block",
                  animation: btnHovered ? "pulseArrow 0.6s ease infinite" : "none",
                }}
              > {/* Changed arrow color to white */}
                →
              </span>
            </button>
          </div>
        </div>

        {/* ── BODY ── */}
        <div
          className="contact-body-section"
          style={{
            background:
              "linear-gradient(160deg, #fdf6fb 0%, #f5eef8 60%, #ede8f5 100%)",
            padding: "60px 28px 80px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: 52,
              maxWidth: 900,
              margin: "0 auto",
              alignItems: "start",
            }}
          >
            {/* ── LEFT INFO ── */}
            <div
              ref={leftRef}
              className="contact-info-wrap"
              style={{
                opacity: leftIn ? 1 : 0,
                transform: leftIn ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 30,
                  fontWeight: 500,
                  color: "#2d1f3d",
                  lineHeight: 1.3,
                  marginBottom: 14,
                }}
              >
                We'd Love to Hear From You
              </h2>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: "#7a6a8a",
                  lineHeight: 1.75,
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
                <div key={label} style={{ marginBottom: 22 }}>
                  <p
                    className="contact-info-item-label"
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      color: "#9b6fc4",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    {label}
                  </p>
                  <p className="contact-info-item-value" style={{ fontSize: 14, color: "#2d1f3d", fontWeight: 400 }}>
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
                background: "#ffffff",
                borderRadius: 16,
                border: "1px solid #e8ddf0",
                padding: "36px 28px",
                opacity: formIn ? 1 : 0,
                transform: formIn ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#2d1f3d",
                  textAlign: "center",
                  marginBottom: 26,
                }}
              >
                Send Us a Message
              </h3>

              {/* Name row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <input
                  className="elv-inp"
                  style={inputStyle}
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                <input
                  className="elv-inp"
                  style={inputStyle}
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: 10 }}>
                <input
                  className="elv-inp"
                  style={inputStyle}
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 10 }}>
                <input
                  className="elv-inp"
                  style={inputStyle}
                  placeholder="Phone (optional)"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Topic */}
              <div style={{ marginBottom: 10 }}>
                <select
                  className="elv-select"
                  style={{ ...inputStyle, color: form.topic ? "#2d1f3d" : "#b0a0c0" }}
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
              </div>

              {/* Message */}
              <div style={{ marginBottom: 10 }}>
                <textarea
                  className="elv-inp"
                  style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                  placeholder="Your message..."
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <button
                onMouseEnter={() => setSendHovered(true)}
                onMouseLeave={() => setSendHovered(false)}
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: 6,
                  background: "linear-gradient(135deg, #9b6fc4, #c084d4)",
                  border: "none",
                  borderRadius: 999,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#fff",
                  cursor: "pointer",
                  transform: sendHovered ? "scale(1.02)" : "scale(1)",
                  opacity: sendHovered ? 0.9 : 1,
                  boxShadow: sendHovered
                    ? "0 8px 24px rgba(155,111,196,0.35)"
                    : "0 4px 14px rgba(155,111,196,0.2)",
                  transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}