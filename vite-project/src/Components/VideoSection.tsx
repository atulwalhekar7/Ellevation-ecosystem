import { useRef, useState, type CSSProperties } from "react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const videos = [
  {
    id: 1,
    tag: "",
    title: "",
    description: "",
    duration: "08:42",
    thumbnail:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    videoSrc: video1,
    gradientBg:
      "linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 50%, #fed7aa 100%)",
  },
  {
    id: 2,
    tag: "",
    title: "",
    description: "",
    duration: "04:18",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    videoSrc: video2,
    gradientBg:
      "linear-gradient(135deg, #a5b4fc 0%, #ddd6fe 50%, #e0e7ff 100%)",
  },
];

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 24px",
    background: "var(--bg-color)", // 🔥 theme added
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 1200,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 32,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    flex: "1 1 450px",
    maxWidth: 520,
    minWidth: 300,
    background: "var(--card-bg, #fff)", // 🔥 theme added
  },
  cardThumb: {
    position: "relative",
    width: "100%",
    height: 280,
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    opacity: 0.75,
  },
  thumbImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.5s",
  },
  thumbVideo: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.5s",
  },
  playOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s",
  },
  playBtn: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  miniPlay: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  durationBadge: {
    position: "absolute",
    bottom: 16,
    right: 16,
    background: "rgba(255,255,255,0.92)",
    color: "#1a0a3c",
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 999,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardBody: {
    padding: "26px 28px 30px",
    background: "var(--card-bg, #fff)", // 🔥 theme added
  },
  cardTag: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.16em",
    color: "#7c3aed",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "var(--text-color)", // 🔥 theme added
    fontFamily: "'Cormorant Garamond', serif",
    lineHeight: 1.3,
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: "var(--text-secondary, #6b7280)", // 🔥 theme added
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
      <div style={{ ...styles.cardThumb, background: "#e8e0f7" }}>
        <div
          style={{
            ...styles.gradientOverlay,
            background: video.gradientBg,
          }}
        />

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
          preload="auto"
          style={{ ...styles.thumbVideo, opacity: hovered ? 1 : 0 }}
        />

        <div style={{ ...styles.playOverlay, opacity: hovered ? 0 : 1 }}>
          <div style={styles.playBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24">
              <polygon points="8,6 20,12 8,18" fill="#3b1f6e" />
            </svg>
          </div>
        </div>

        <div style={styles.miniPlay}>
          <svg width="12" height="12" viewBox="0 0 24 24">
            <polygon points="8,6 20,12 8,18" fill="#6b3fa0" />
          </svg>
        </div>

        <div style={styles.durationBadge}>{video.duration}</div>
      </div>
    </div>
  );
}

export default function VideoSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.cardsRow}>
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}