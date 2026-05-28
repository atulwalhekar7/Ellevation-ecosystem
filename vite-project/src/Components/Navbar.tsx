import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/MS-Ellevation-Logo.webp";

type DropdownItem = { label: string; href: string };
type NavItem = {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Ellevation", href: "/about" },
  {
    label: "Content",
    dropdown: [
      { label: "YouTube", href: "/content/youtube" },
      { label: "Social Media Pages", href: "/content/social-media" },
    ],
  },
  {
    label: "Get Involved",
    dropdown: [
      { label: "Join Us Ellevation", href: "/get-involved/join" },
      { label: "Alliances", href: "/get-involved/alliances" },
      { label: "Professional Membership Directories", href: "/get-involved/directories" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Ms. Ellevation", href: "/ms-ellevation" },
  { label: "Ellevation Hub", href: "/hub" },
];

function DropdownMenu({ items, open }: { items: DropdownItem[]; open: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(120,80,180,0.13), 0 2px 8px rgba(0,0,0,0.07)",
        padding: "8px 0",
        minWidth: "210px",
        zIndex: 1000,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transform: open
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-6px)",
        transition: "opacity 0.18s ease, transform 0.18s ease",
      }}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          style={{
            display: "block",
            padding: "10px 22px",
            fontSize: "14px",
            color: "#2d2d2d",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            borderRadius: "6px",
            margin: "2px 6px",
            transition: "background 0.13s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.background = "#f5f0ff")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.background = "transparent")
          }
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (item.dropdown) {
    return (
      <div
        ref={ref}
        style={{ position: "relative" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: "#2d2d2d",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            padding: "6px 4px",
            borderRadius: "6px",
            transition: "color 0.15s",
            whiteSpace: "nowrap",
          }}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {item.label}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transition: "transform 0.18s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              marginTop: "1px",
            }}
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="#888"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <DropdownMenu items={item.dropdown} open={open} />
      </div>
    );
  }

  const shouldOpenInNewTab = item.label === "Ms. Ellevation" || item.label === "Ellevation Hub";

  return (
    <Link
      to={item.href || "#"}
      target={shouldOpenInNewTab ? "_blank" : undefined}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
      style={{
        fontSize: "14px",
        color: "#2d2d2d",
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        padding: "6px 4px",
        borderRadius: "6px",
        whiteSpace: "nowrap",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#7c3aed")}
      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#2d2d2d")}
    >
      {item.label}
    </Link>
  );
}

export default function EllevationNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          padding: "0 24px",
          height: "74px",
          background: darkMode ? "#18141f" : "#fff",
          borderBottom: darkMode ? "1px solid #2a2238" : "1px solid #f0eaf8",
          boxShadow: "0 1px 0 rgba(120,80,180,0.07)",
          position: "relative",
          zIndex: 100,
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#1a0a2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src={logo} alt="Ellevation Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ lineHeight: 1.15 }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                color: darkMode ? "#e9deff" : "#1a0a2e",
                letterSpacing: "0.01em",
              }}
            >
              Ellevation
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "9px",
                color: "#8b5cf6",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Community
              <br />
              Ecosystem
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flex: 1,
            flexWrap: "nowrap",
          }}
        >
          {navItems.map((item) => (
            <NavItemComponent key={item.label} item={item} />
          ))}
        </div>

        {/* Right Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: darkMode ? "#2a1a4e" : "#f5f0ff",
              border: "1.5px solid #e0d4f7",
              borderRadius: "20px",
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: "13px",
              color: darkMode ? "#c4a8ff" : "#5b21b6",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {darkMode ? (
                <>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              )}
            </svg>
            {darkMode ? "Light" : "Dark"}
          </button>

          {/* Get Listed */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#fff",
              border: "1.5px solid #d1c4e9",
              borderRadius: "20px",
              padding: "6px 16px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#2d2d2d",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            Get Listed
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Join */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
              border: "none",
              borderRadius: "20px",
              padding: "8px 20px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(168,85,247,0.35)",
              transition: "opacity 0.15s, box-shadow 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.9";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 18px rgba(168,85,247,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 2px 12px rgba(168,85,247,0.35)";
            }}
          >
            Join
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </nav>
    </>
  );
}