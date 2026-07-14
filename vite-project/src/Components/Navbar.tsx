import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";

type DropdownItem = { label: string; href: string };
type NavItem = {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ms Ellevation", href: "/ms-ellevation" },
  { label: "Ellevation Hub", href: "/hub" },
  { label: "Conversations", href: "/Conversations" },
  { label: "Event", href: "/Event" },
  { label: "Connect", href: "/Connect" },
];

function DropdownMenu({ items, open }: { items: DropdownItem[]; open: boolean }) {
  const location = useLocation();

  return (
   <div
  style={{
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "50%",
    background: "#fff",
    borderRadius: "12px",
  boxShadow:
  "0 18px 50px rgba(184,180,205,0.55), 0 6px 18px rgba(0,0,0,0.08)",
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
      {items.map((item) => {
        const isSubItemActive = location.pathname === item.href;

        return (
          <Link
            key={item.label}
            to={item.href}
            style={{
              display: "block",
              padding: "10px 22px",
              fontSize: "14px",
              color: isSubItemActive ? "#4B1E56" : "#2d2d2d",
              backgroundColor: isSubItemActive ? "rgba(75, 30, 86, 0.05)" : "transparent",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: isSubItemActive ? 600 : 400,
              borderRadius: "6px",
              margin: "2px 6px",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

function NavItemComponent({ item, darkMode }: { item: NavItem; darkMode: boolean }) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation(); 

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = item.dropdown
    ? item.dropdown.some((subItem) => location.pathname === subItem.href)
    : location.pathname === item.href;

  const defaultLinkColor = darkMode ? "#e9deff" : "#2d2d2d";
  const currentLinkColor = (isActive || isHovered) ? "#4B1E56" : defaultLinkColor;

  if (item.dropdown) {
    return (
      <div
        ref={ref}
        style={{ position: "relative" }}
        onMouseEnter={() => { setOpen(true); setIsHovered(true); }}
        onMouseLeave={() => { setOpen(false); setIsHovered(false); }}
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
            color: currentLinkColor,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: isActive ? 600 : 400,
            padding: "6px 4px",
            borderRadius: "6px",
            transition: "color 0.2s ease",
          }}
        >
          {item.label}
        </button>

        <DropdownMenu items={item.dropdown} open={open} />
      </div>
    );
  }

  const shouldOpenInNewTab =
    item.label === "Ms Ellevation" || item.label === "Ellevation Hub";

  return (
    <Link
      to={item.href || "#"}
      target={shouldOpenInNewTab ? "_blank" : undefined}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
      style={{
        fontSize: "16px",
        color: currentLinkColor,
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: isActive ? 600 : 400,
        padding: "6px 4px",
        whiteSpace: "nowrap",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setDarkMode(saved === "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

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

  useEffect(() => {
    const onScroll = () => {
      setIsFixed(window.scrollY >= navTopRef.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setDarkMode(next === "dark");
  };

  // Light vs Dark Mode peripheral box-shadow styling configuration
  const getBoxShadow = () => {
    if (!isFixed) {
      return darkMode 
        ? "0 4px 14px rgba(0, 0, 0, 0.4)" 
        : "0 5px 18px rgba(184, 180, 205, 0.3)";
    }
    
    // Light mode remains deep/vibrant lavender, Dark mode uses soft, low-intensity deep shadows
    return darkMode
      ? "0 12px 40px rgba(0, 0, 0, 0.55), -6px 0 24px rgba(15, 10, 25, 0.3), 6px 0 24px rgba(15, 10, 25, 0.3)"
      : "0 12px 40px rgba(184, 180, 205, 0.75), -8px 0 28px rgba(184, 180, 205, 0.35), 8px 0 28px rgba(184, 180, 205, 0.35)";
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes navOvalPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.55; }
          50%       { transform: translateX(-50%) scale(1.08); opacity: 0.8; }
        }
      `}</style>

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
            background: darkMode ? "rgba(18,14,24,0.96)" : "rgba(253, 251, 255, 0.96)",
            borderBottom: darkMode ? "1px solid #2a2238" : "1px solid #f2ecf9",
            boxShadow: getBoxShadow(),
            backdropFilter: isFixed ? "blur(16px)" : "none",
            position: isFixed ? "fixed" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            overflow: "hidden",
            transition: "box-shadow 0.25s, backdrop-filter 0.25s, background 0.25s",
          }}
        >
          {/* Decorative oval #4B1E56 glow shade, centered behind nav content */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "680px",
              height: "130px",
             background: darkMode
  ? "radial-gradient(ellipse at center, rgba(75,30,86,0.30) 0%, rgba(75,30,86,0.14) 45%, rgba(75,30,86,0) 75%)"
  : "radial-gradient(ellipse at center, rgba(75,30,86,0.55) 0%, rgba(75,30,86,0.28) 45%, rgba(75,30,86,0) 78%)",
borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              filter: darkMode ? "blur(6px)" : "blur(4px)",
              boxShadow: darkMode
                ? "none"
                : "0 10px 34px rgba(75,30,86,0.35)",
              pointerEvents: "none",
              zIndex: 0,
              animation: "navOvalPulse 6s ease-in-out infinite",
            }}
          />

          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "190px",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={logo}
                alt="Ellevation Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Link>

          {/* Nav Links Wrapper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flex: 1,
              flexWrap: "nowrap",
              position: "relative",
              zIndex: 1,
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

          {/* Right Actions Block */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, position: "relative", zIndex: 1 }}>
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: darkMode ? "#2a1a4e" : "#ffffff",
                border: darkMode ? "1.5px solid rgba(167, 139, 250, 0.25)" : "1.5px solid rgba(184, 180, 205, 0.5)",
                borderRadius: "20px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px",
                color: darkMode ? "#e9d5ff" : "#554866",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4B1E56";
                e.currentTarget.style.color = "#4B1E56";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = darkMode ? "rgba(167, 139, 250, 0.25)" : "rgba(184, 180, 205, 0.5)";
                e.currentTarget.style.color = darkMode ? "#e9d5ff" : "#554866";
              }}
            >
              {darkMode ? "Light" : "Dark"}
            </button>

            <Link 
              to="/get-involved/directories" 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "6px", 
                background: "#fff", 
                border: "1.5px solid rgba(184, 180, 205, 0.5)", 
                borderRadius: "20px", 
                padding: "6px 16px", 
                cursor: "pointer", 
                fontSize: "13px", 
                color: "#2d2d2d", 
                fontFamily: "'DM Sans', sans-serif", 
                fontWeight: 500, 
                textDecoration: "none", 
                whiteSpace: "nowrap",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4B1E56";
                e.currentTarget.style.color = "#4B1E56";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(184, 180, 205, 0.5)";
                e.currentTarget.style.color = "#2d2d2d";
              }}
            >
              Get Listed
            </Link>

            {/* Premium Signature Deep Purple Action Button */}
            <Link 
              to="/get-involved/join" 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "6px", 
                background: "linear-gradient(135deg, #4B1E56 0%, #4B1E56 100%)", 
                border: "none", 
                borderRadius: "20px", 
                padding: "8px 22px", 
                cursor: "pointer", 
                fontSize: "13px", 
                color: "#fff", 
                fontFamily: "'DM Sans', sans-serif", 
                fontWeight: 600, 
                textDecoration: "none", 
                boxShadow: "0 4px 14px rgba(75, 30, 86, 0.35)", 
                whiteSpace: "nowrap",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(75, 30, 86, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(75, 30, 86, 0.35)";
              }}
            >
              Join
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}