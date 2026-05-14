import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/navigation";
import { profile } from "../../data/profile";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <NavLink className="brand" to="/" aria-label={`${profile.name} home`} onClick={closeMenu}>
          {profile.initials}
        </NavLink>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${isOpen ? "open" : ""}`} id="site-nav" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
