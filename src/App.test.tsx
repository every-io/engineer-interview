import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders welcome message", () => {
    render(<App />);
    const linkElement = screen.getByText(
      /Welcome To The Every.io Code Challenge/i
    );
    expect(linkElement).toBeInTheDocument();
  });
});
