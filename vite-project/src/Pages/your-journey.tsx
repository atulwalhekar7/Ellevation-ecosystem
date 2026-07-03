import React, { useState, type ChangeEvent, type FormEvent } from "react";
type EnquiryPurpose = 
  | "program_enquiry" 
  | "consultation_request" 
  | "journey_application";

interface FormData {
  fullName: string;
  email: string;
  purpose: EnquiryPurpose;
  message: string;
}

export default function YourJourneyForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    purpose: "journey_application", // Defaulting to your-journey page context
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Enquiry Submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "580px",
          margin: "40px auto",
          padding: "32px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(120, 80, 180, 0.08), 0 2px 10px rgba(0, 0, 0, 0.04)",
          border: "1px solid #f0eaf8",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span 
            style={{ 
              fontSize: "13px", 
              fontWeight: 600, 
              color: "#a855f7", 
              textTransform: "uppercase", 
              letterSpacing: "1.5px" 
            }}
          >
            Start Your Journey
          </span>
          <h2 style={{ fontSize: "28px", color: "#2d2d2d", margin: "8px 0 4px 0", fontWeight: 700 }}>
            Common Enquiry Form
          </h2>
          <p style={{ fontSize: "15px", color: "#6b7280", margin: 0 }}>
            Let us know how we can support your elevation.
          </p>
        </div>

        {isSubmitted ? (
          <div 
            style={{ 
              textAlign: "center", 
              padding: "40px 20px", 
              backgroundColor: "#f5f0ff", 
              borderRadius: "12px",
              border: "1px solid #e0d4f7"
            }}
          >
            <h3 style={{ color: "#7c3aed", margin: "0 0 10px 0" }}>Thank You!</h3>
            <p style={{ color: "#5b21b6", margin: 0, fontSize: "15px" }}>
              Your enquiry has been received. Our team will guide you on the next steps of your journey shortly.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              style={{
                marginTop: "20px",
                background: "none",
                border: "none",
                color: "#7c3aed",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              Submit another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Full Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="fullName" style={{ fontSize: "14px", fontWeight: 500, color: "#4b5563" }}>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                style={inputStyle}
              />
            </div>

            {/* Email Address */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="email" style={{ fontSize: "14px", fontWeight: 500, color: "#4b5563" }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                style={inputStyle}
              />
            </div>

            {/* Purpose of Enquiry Dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="purpose" style={{ fontSize: "14px", fontWeight: 500, color: "#4b5563" }}>
                What can we help you with?
              </label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="journey_application">Journey Application Enquiry</option>
                <option value="program_enquiry">Program Enquiry</option>
                <option value="consultation_request">Consultation Request</option>
              </select>
            </div>

            {/* Message / Context */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="message" style={{ fontSize: "14px", fontWeight: 500, color: "#4b5563" }}>
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us a bit more about your goals or questions..."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
                border: "none",
                borderRadius: "24px",
                padding: "12px 24px",
                cursor: "pointer",
                fontSize: "15px",
                color: "#fff",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(168, 85, 247, 0.35)",
                marginTop: "10px",
                transition: "transform 0.1s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </>
  );
}

// Reusable styling template for fields
const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: "15px",
  fontFamily: "'DM Sans', sans-serif",
  borderRadius: "8px",
  border: "1.5px solid #d1c4e9",
  outline: "none",
  color: "#2d2d2d",
  backgroundColor: "#fafafa",
  transition: "border-color 0.2s ease, background-color 0.2s ease",
};