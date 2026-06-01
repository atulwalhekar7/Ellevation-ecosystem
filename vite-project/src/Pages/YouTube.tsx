
export default function YouTube() {
  return (
    <>
      <style>{`
        .yt-page-container {
          background: #f5f0ff;
          transition: background 0.4s ease;
        }
        .yt-title {
          color: #1a0a2e;
          transition: color 0.4s ease;
        }
        .yt-desc {
          color: #5a4070;
          transition: color 0.4s ease;
        }
        [data-theme="dark"] .yt-page-container {
          background: #0f0a1a !important;
        }
        [data-theme="dark"] .yt-title {
          color: #f3ebff !important;
        }
        [data-theme="dark"] .yt-desc {
          color: #b8a8c8 !important;
        }
      `}</style>
      <div className="yt-page-container" style={{ padding: '100px 24px', textAlign: 'center', minHeight: '60vh' }}>
        <h1 className="yt-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px' }}>
          YouTube Content
        </h1>
        <p className="yt-desc" style={{ fontFamily: "'DM Sans', sans-serif" }}>Explore our video library and teachings.</p>
      </div>
    </>
  );
}