import Button from "./ui/Button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="/" className="flex items-center gap-2">
          <span className="brand">H</span>
          <span className="text-lg font-semibold">Habits</span>
        </a>

        <nav className="nav-links">
          <a className="nav-link" href="#">
            Dashboard
          </a>
          <a className="nav-link" href="#">
            Habits
          </a>
          <a className="nav-link" href="#">
            Stats
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost">Logga in</Button>
          <Button variant="primary">Skapa konto</Button>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
