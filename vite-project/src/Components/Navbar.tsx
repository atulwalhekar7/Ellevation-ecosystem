import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import darkModeLogo from "../assets/dark-mode-logo.png";

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

const ACCENT = "#4B1E56";
const NAV_BG = "#4B1E56";   // navbar background — same in both modes now
const JOIN_COLOR = "#C81E6B"; // Join button — same in both modes now
const FONT_FAMILY = "'Aster', sans-serif";

// Breakpoint below which we switch to the hamburger / drawer layout.
const MOBILE_BREAKPOINT = 1024;

/** Tracks viewport width so we can branch layout logic in JS
 *  (inline styles can't use media queries on their own). */
function useIsMobile(breakpoint: number) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

/* ------------------------------------------------------------------ */
/* Desktop dropdown (hover / click, absolutely positioned flyout)     */
/* ------------------------------------------------------------------ */

function DropdownMenu({
  items,
  open,
}: {
  items: DropdownItem[];
  open: boolean;
}) {
  const location = useLocation();

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        background: NAV_BG,
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "12px",
        padding: "8px 0",
        minWidth: "210px",
        zIndex: 1000,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transform: open
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-6px)",
        transition: "opacity 0.18s ease, transform 0.18s ease",
        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
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
              color: "#ffffff",
              backgroundColor: isSubItemActive
                ? "rgba(255,255,255,0.12)"
                : "transparent",
              textDecoration: "none",
              fontFamily: FONT_FAMILY,
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

function NavItemComponent({ item }: { item: NavItem }) {
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

  const baseColor = "#ffffff";
  const currentOpacity = isActive || isHovered ? 1 : 0.82;

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
            color: baseColor,
            opacity: currentOpacity,
            fontFamily: FONT_FAMILY,
            fontWeight: isActive ? 600 : 400,
            padding: "6px 4px",
            borderRadius: "6px",
            transition: "opacity 0.2s ease",
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
        color: baseColor,
        opacity: currentOpacity,
        textDecoration: "none",
        fontFamily: FONT_FAMILY,
        fontWeight: isActive ? 600 : 400,
        padding: "6px 4px",
        whiteSpace: "nowrap",
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.label}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile drawer: full nav, stacked, with accordion-style dropdowns   */
/* ------------------------------------------------------------------ */

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const textColor = "#ffffff";

  const isActive = item.dropdown
    ? item.dropdown.some((subItem) => location.pathname === subItem.href)
    : location.pathname === item.href;

  if (item.dropdown) {
    return (
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "17px",
            color: textColor,
            fontFamily: FONT_FAMILY,
            fontWeight: isActive ? 600 : 500,
            padding: "16px 4px",
          }}
        >
          {item.label}
          <span
            style={{
              display: "inline-block",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              fontSize: "13px",
            }}
          >
            ▾
          </span>
        </button>

        <div
          style={{
            maxHeight: expanded ? `${item.dropdown.length * 48 + 12}px` : "0px",
            overflow: "hidden",
            transition: "max-height 0.25s ease",
          }}
        >
          {item.dropdown.map((sub) => {
            const subActive = location.pathname === sub.href;
            return (
              <Link
                key={sub.label}
                to={sub.href}
                onClick={onNavigate}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  fontSize: "15px",
                  color: textColor,
                  opacity: subActive ? 1 : 0.75,
                  fontWeight: subActive ? 600 : 400,
                  textDecoration: "none",
                  fontFamily: FONT_FAMILY,
                }}
              >
                {sub.label}
              </Link>
            );
          })}
        </div>
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
      onClick={onNavigate}
      style={{
        display: "block",
        padding: "16px 4px",
        fontSize: "17px",
        color: textColor,
        opacity: isActive ? 1 : 0.9,
        fontWeight: isActive ? 600 : 500,
        textDecoration: "none",
        fontFamily: FONT_FAMILY,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {item.label}
    </Link>
  );
}

/** Simple three-line / X hamburger icon, animated between states. */
function HamburgerIcon({ open }: { open: boolean }) {
  const color = "#ffffff";
  const barStyle: React.CSSProperties = {
    display: "block",
    height: "2px",
    width: "100%",
    background: color,
    borderRadius: "2px",
    transition: "transform 0.25s ease, opacity 0.2s ease",
  };
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "22px",
        height: "16px",
      }}
    >
      <span
        style={{
          ...barStyle,
          transform: open ? "translateY(7px) rotate(45deg)" : "none",
        }}
      />
      <span style={{ ...barStyle, opacity: open ? 0 : 1 }} />
      <span
        style={{
          ...barStyle,
          transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
        }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main navbar                                                        */
/* ------------------------------------------------------------------ */

const NAV_HEIGHT_DESKTOP = 110;
const NAV_HEIGHT_MOBILE = 72;

export default function EllevationNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navTopRef = useRef<number>(0);
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  const navHeight = isMobile ? NAV_HEIGHT_MOBILE : NAV_HEIGHT_DESKTOP;

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

  // Close the mobile drawer automatically if the viewport grows past
  // the breakpoint (e.g. rotating a tablet, or resizing a browser window).
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
      <div
        ref={wrapperRef}
        style={{ height: `${navHeight}px`, position: "relative" }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "12px" : "24px",
            padding: isMobile ? "0 16px" : "0 24px",
            height: `${navHeight}px`,
            background: NAV_BG,
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "none",
            backdropFilter: "none",
            position: isFixed ? "fixed" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            overflow: "hidden",
            transition: "background 0.25s, height 0.25s",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
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
                width: isMobile ? "120px" : "190px",
                height: isMobile ? "56px" : "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                transition: "width 0.25s, height 0.25s",
              }}
            >
              <img
                src={darkModeLogo}
                alt="Ellevation Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </Link>

          {!isMobile && (
            <>
              {/* Nav Links Wrapper (desktop) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  flex: 1,
                  flexWrap: "nowrap",
                  position: "relative",
                  zIndex: 1,
                  minWidth: 0,
                }}
              >
                {navItems.map((item) => (
                  <NavItemComponent key={item.label} item={item} />
                ))}
              </div>

              {/* Right Actions Block (desktop) */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, position: "relative", zIndex: 1 }}>
                <button
                  onClick={toggleTheme}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#ffffff",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
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
                    background: "transparent",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderRadius: "20px",
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#ffffff",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 500,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                >
                  Get Listed
                </Link>

                {/* Signature Action Button */}
                <Link
                  to="/get-involved/join"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: JOIN_COLOR,
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 22px",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#ffffff",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                >
                  Join
                </Link>
              </div>
            </>
          )}

          {isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginLeft: "auto",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Compact theme toggle stays visible on mobile too */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                {darkMode ? "☀" : "☾"}
              </button>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          )}
        </nav>

        {/* Mobile drawer + backdrop */}
        {isMobile && (
          <>
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                top: `${navHeight}px`,
                background: "rgba(0,0,0,0.35)",
                opacity: menuOpen ? 1 : 0,
                pointerEvents: menuOpen ? "all" : "none",
                transition: "opacity 0.2s ease",
                zIndex: 98,
              }}
            />
            <div
              style={{
                position: "fixed",
                top: `${navHeight}px`,
                left: 0,
                right: 0,
                maxHeight: menuOpen ? "calc(100vh - " + navHeight + "px)" : "0px",
                overflowY: "auto",
                background: NAV_BG,
                borderBottom: menuOpen
                  ? "1px solid rgba(255,255,255,0.12)"
                  : "none",
                boxShadow: menuOpen ? "0 16px 32px rgba(0,0,0,0.15)" : "none",
                transition: "max-height 0.28s ease",
                zIndex: 99,
                padding: menuOpen ? "8px 20px 24px" : "0 20px",
              }}
            >
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <Link
                  to="/get-involved/directories"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderRadius: "24px",
                    padding: "12px 16px",
                    fontSize: "15px",
                    color: "#ffffff",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Get Listed
                </Link>

                <Link
                  to="/get-involved/join"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: JOIN_COLOR,
                    border: "none",
                    borderRadius: "24px",
                    padding: "13px 16px",
                    fontSize: "15px",
                    color: "#ffffff",
                    fontFamily: FONT_FAMILY,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Join
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}