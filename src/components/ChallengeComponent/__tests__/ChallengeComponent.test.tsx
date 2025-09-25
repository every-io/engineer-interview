import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ChallengeComponent from "../ChallengeComponent";


vi.mock("../Column", () => ({
  default: vi.fn(({ title }) => <div data-testid="mock-column">{title}</div>),
}));

describe("ChallengeComponent", () => {
  it("renders three columns", () => {
    render(<ChallengeComponent />);
    const columns = screen.getAllByTestId("mock-column");

    expect(columns).toHaveLength(3);
  });
});