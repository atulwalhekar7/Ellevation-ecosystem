
export default function SocialMedia() {
  return (
    <>
      <style>{`
        .sm-page-container {
          background: #fdf6f9;
          transition: background 0.4s ease;
        }
        .sm-title {
          color: #1a0a2e;
          transition: color 0.4s ease;
        }
        .sm-desc {
          color: #5a4070;
          transition: color 0.4s ease;
        }
        [data-theme="dark"] .sm-page-container {
          background: #0f0a1a !important;
        }
        [data-theme="dark"] .sm-title {
          color: #f3ebff !important;
        }
        [data-theme="dark"] .sm-desc {
          color: #b8a8c8 !important;
        }
      `}</style>
      <div className="sm-page-container" style={{ padding: '100px 24px', textAlign: 'center', minHeight: '60vh' }}>
        <h1 className="sm-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px' }}>
          Social Media
        </h1>
        <p className="sm-desc" style={{ fontFamily: "'DM Sans', sans-serif" }}>Connect with us across our platforms.</p>
      </div>
    </>
  );
}