import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import MyButton from "../Button";
import SearchBar from "../SearchBar";
import DataContext, { THEMES, ThemeKey } from "../../data/Contesxt";
import "./index.scss";

const AppIcon = ({ color }: { color: string }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="7" y1="8" x2="17" y2="8" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="7" y1="16" x2="13" y2="16" />
  </svg>
);

const SearchIcon = ({ color }: { color: string }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

function ProfileDropdown() {
  const navigate = useNavigate();
  const { userInfo, theme, setTheme } = useContext(DataContext);
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

  function logout() {
    localStorage.removeItem("Authorization");
    navigate("/");
  }

  const initials = userInfo?.fullName
    ? userInfo.fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="profile-dropdown" ref={ref}>
      <button className="profile-avatar" onClick={() => setOpen((o) => !o)}>
        {initials}
      </button>
      {open && (
        <div className="profile-menu">
          <div className="profile-menu-section">
            <span className="profile-menu-label">Background</span>
            <div className="theme-toggle-row">
              <span className="theme-toggle-option">Dark</span>
              <button
                className={`theme-toggle ${theme === "light" ? "is-light" : ""}`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <span className="theme-toggle-knob" />
              </button>
              <span className="theme-toggle-option">Light</span>
            </div>
          </div>
          <div className="profile-menu-divider" />
          <button className="profile-menu-item" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

interface SwitchNavBarProps {
  typeUser: string;
  teacherTitle?: string;
}

export default function SwitchNavBar({
  typeUser,
}: SwitchNavBarProps) {
  const { theme } = useContext(DataContext);
  const isDark = theme === "dark";

  const textColor   = isDark ? "#f5f5f5" : "#1b1b1b";
  const borderColor = isDark ? "#2e2e2e" : "#e0e0e0";
  const iconColor   = isDark ? "#aaa"    : "#666";

  return (
    <nav
      className="app-navbar"
      data-theme={theme}
      style={{
        background:   isDark ? "#1b1b1b" : "#ffffff",
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div className="navbar-brand-wrap">
        <AppIcon color={textColor} />
        <span className="navbar-brand-name" style={{ color: textColor }}>
          Nome app
        </span>
      </div>

      <div className="navbar-center">
        {typeUser !== "Teacher" && (
           <div className="search-wrapper" data-theme={theme}>
            <SearchBar />
            <div className="search-icon-area">
              <span
                className="search-divider"
                style={{ background: isDark ? "#444" : "#ccc" }}
              />
              <SearchIcon color={iconColor} />
            </div>
          </div>
        )}
      </div>

      <div className="navbar-right">
        <ProfileDropdown />
      </div>
    </nav>
  );
}
