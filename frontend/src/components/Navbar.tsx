import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const base = "nav-link";
  const active = "text-[var(--color-fg)] font-medium";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="brand">H</span>
          <span className="text-lg font-semibold">Habits</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [base, isActive && active].filter(Boolean).join(" ")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/habits"
            className={({ isActive }) =>
              [base, isActive && active].filter(Boolean).join(" ")
            }
          >
            Habits
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              [base, isActive && active].filter(Boolean).join(" ")
            }
          >
            Settings
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
