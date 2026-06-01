import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Ms-Ellevation-removebg-preview.png";

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
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function NavItemComponent({ item, darkMode }: { item: NavItem; darkMode: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkColor = darkMode ? "#e9deff" : "#2d2d2d";

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
            fontSize: "16px",
            color: linkColor,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            padding: "6px 4px",
            borderRadius: "6px",
          }}
        >
          {item.label}
        </button>

        <DropdownMenu items={item.dropdown} open={open} />
      </div>
    );
  }

  const shouldOpenInNewTab =
    item.label === "Ms. Ellevation" || item.label === "Ellevation Hub";

  return (
    <Link
      to={item.href || "#"}
      target={shouldOpenInNewTab ? "_blank" : undefined}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
      style={{
        fontSize: "16px",
        color: linkColor,
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        padding: "6px 4px",
      }}
      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#7c3aed")}
      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = linkColor)}
    >
      {item.label}
    </Link>
  );
}

const NAV_HEIGHT = 110;

export default function EllevationNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navTopRef = useRef<number>(0);

  // ✅ THEME LOAD (added only)
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setDarkMode(saved === "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Measure natural position of navbar wrapper after mount
  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) {
        navTopRef.current =
          wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Fix navbar when scrolled past its natural top position
  useEffect(() => {
    const onScroll = () => {
      setIsFixed(window.scrollY >= navTopRef.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ THEME TOGGLE (updated only)
  const toggleTheme = () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    setDarkMode(next === "dark");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        ref={wrapperRef}
        style={{ height: `${NAV_HEIGHT}px`, position: "relative" }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            padding: "0 24px",
            height: `${NAV_HEIGHT}px`,
            background: darkMode ? "rgba(24,20,31,0.97)" : "rgba(255,255,255,0.97)",
            borderBottom: darkMode ? "1px solid #2a2238" : "1px solid #f0eaf8",
            boxShadow: isFixed
              ? "0 4px 24px rgba(120,80,180,0.13)"
              : "0 1px 0 rgba(120,80,180,0.07)",
            backdropFilter: isFixed ? "blur(12px)" : "none",
            position: isFixed ? "fixed" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            transition: "box-shadow 0.25s, backdrop-filter 0.25s, background 0.25s",
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
                width: "170px",
                height: "110px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={logo}
                alt="Ellevation Logo"
                style={{ width: "80%", height: "100%", objectFit: "cover" }}
              />
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
              <NavItemComponent
                key={item.label}
                item={item}
                darkMode={darkMode}
              />
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            
            {/* Dark Mode Toggle (ONLY CHANGE HERE IS FUNCTION) */}
            <button
              onClick={toggleTheme}
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
              }}
            >
              {darkMode ? "Light" : "Dark"}
            </button>

            {/* Get Listed */}
            <a href="#" style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1.5px solid #d1c4e9", borderRadius: "20px", padding: "6px 16px", cursor: "pointer", fontSize: "13px", color: "#2d2d2d", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}>
              Get Listed
            </a>

            {/* Join */}
            <a href="#" style={{ display: "flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)", border: "none", borderRadius: "20px", padding: "8px 20px", cursor: "pointer", fontSize: "13px", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 12px rgba(168,85,247,0.35)", whiteSpace: "nowrap" }}>
              Join
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}