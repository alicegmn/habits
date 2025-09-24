import { Button } from "./ui";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fixed mb-0 p-6 mt-12 ">
      <div className="gap-2">
        <NavLink to="/about">
          <Button variant="primary">About</Button>
        </NavLink>
        <p></p>
      </div>
    </footer>
  );
}
