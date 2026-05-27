import { useRef, useState, CSSProperties } from "react";

const videos = [
  {
    id: 1,
    tag: "FEATURED VIDEO",
    title: "Inside the Ellevation Room",
    description:
      "A static video-style feature card for future YouTube, CMS, or hosted media embeds.",
    duration: "08:42",
    thumbnail: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&q=80",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    gradientBg: "linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 50%, #fed7aa 100%)",
  },
  {
    id: 2,
    tag: "DIRECTORY WALKTHROUGH",
    title: "How the Directory Works",
    description:
      "A guided preview of search, filters, member profiles, and get-listed pathways.",
    duration: "04:18",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
    gradientBg: "linear-gradient(135deg, #a5b4fc 0%, #ddd6fe 50%, #e0e7ff 100%)",
  },
];

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 24px",
    background: "#f5f0ff",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 1100,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 56,
    flexWrap: "wrap",
  },
  leftPane: {
    flexShrink: 0,
    width: 320,
    minWidth: 260,
  },
  eyebrow: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: "0.18em",
    color: "rgb(124, 92, 191)",
    textTransform: "uppercase" as const,
    marginBottom: 14,
  },
  heading: {
    fontSize: 42,
    fontWeight: 700,
    lineHeight: 1.18,
    color: "#1a0a3c",
    fontFamily: "'Cormorant Garamond', serif",
    marginBottom: 18,
    margin: "0 0 18px 0",
  },
  subtext: {
    fontSize: 15,
    lineHeight: 1.7,
    color: " rgb(90, 64, 112)",
    marginBottom: 32,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 24px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    color: "#fff",
    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
    boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginBottom: 28,
  },
  avatarRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  avatarStack: {
    display: "flex",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "2.5px solid #fff",
    objectFit: "cover" as const,
    marginLeft: -10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },
  avatarFirst: {
    marginLeft: 0,
  },
  communityText: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 500,
  },
  communityCount: {
    color: "#7c3aed",
    fontWeight: 700,
  },
  cardsRow: {
    display: "flex",
    flexDirection: "row" as const,
    gap: 20,
    flex: 1,
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    background: "#fff",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    flex: "1 1 260px",
    maxWidth: 360,
    minWidth: 240,
  },
  cardThumb: {
    position: "relative" as const,
    width: "100%",
    height: 210,
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute" as const,
    inset: 0,
    opacity: 0.75,
  },
  thumbImg: {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "opacity 0.5s",
  },
  thumbVideo: {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "opacity 0.5s",
  },
  playOverlay: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s",
  },
  playBtn: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  miniPlay: {
    position: "absolute" as const,
    top: 12,
    left: 12,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  durationBadge: {
    position: "absolute" as const,
    bottom: 12,
    right: 12,
    background: "rgba(255,255,255,0.92)",
    color: "#1a0a3c",
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 999,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardBody: {
    padding: "20px 22px 24px",
    background: "#fff",
  },
  cardTag: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.16em",
    color: "#7c3aed",
    textTransform: "uppercase" as const,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#1a0a3c",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    lineHeight: 1.3,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.65,
  },
};

function VideoCard({ video }: { video: (typeof videos)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 60px rgba(120,80,200,0.22)"
          : "0 8px 32px rgba(120,80,200,0.12)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail / Video */}
      <div style={{ ...styles.cardThumb, background: "#e8e0f7" }}>
        <div style={{ ...styles.gradientOverlay, background: video.gradientBg }} />

        <img
          src={video.thumbnail}
          alt={video.title}
          style={{ ...styles.thumbImg, opacity: hovered ? 0 : 1 }}
        />

        <video
          ref={videoRef}
          src={video.videoSrc}
          loop
          muted
          playsInline
          style={{ ...styles.thumbVideo, opacity: hovered ? 1 : 0 }}
        />

        {/* Center play button */}
        <div style={{ ...styles.playOverlay, opacity: hovered ? 0 : 1 }}>
          <div style={styles.playBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <polygon points="8,6 20,12 8,18" fill="#3b1f6e" />
            </svg>
          </div>
        </div>

        {/* Mini top-left play */}
        <div style={styles.miniPlay}>
          <svg width="12" height="12" viewBox="0 0 24 24">
            <polygon points="8,6 20,12 8,18" fill="#6b3fa0" />
          </svg>
        </div>

        {/* Duration */}
        <div style={styles.durationBadge}>{video.duration}</div>
      </div>

      {/* Card text */}
      <div style={styles.cardBody}>
        <p style={styles.cardTag}>{video.tag}</p>
        <h3 style={styles.cardTitle}>{video.title}</h3>
        <p style={styles.cardDesc}>{video.description}</p>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section style={styles.section}>
      <div style={styles.container}>

        {/* LEFT: Text */}
        <div style={styles.leftPane}>
          <p style={styles.eyebrow}>Watch &amp; Experience</p>
          <h2 style={styles.heading}>
            Static video moments that make the ecosystem feel alive.
          </h2>
          <p style={styles.subtext}>
            These polished video cards are ready for future YouTube, Vimeo, CMS,
            or hosted media embeds while keeping the current frontend fully static.
          </p>


         
        </div>

        {/* RIGHT: Video Cards */}
        <div style={styles.cardsRow}>
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}