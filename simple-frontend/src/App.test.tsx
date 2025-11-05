import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("shows Simple Notes heading", () => {
  render(<App />);
  expect(screen.getByText(/Simple Notes/i)).toBeInTheDocument();
});
