import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("shows Simple Notes heading", async () => {
  render(<App />);

  // Wait for heading to appear
  expect(await screen.findByText(/Simple Notes/i)).toBeInTheDocument();
});
