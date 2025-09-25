import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { ACTIONS } from "~/src/store/tasks";

import Input from "../Input";

const dispatch = vi.fn();

vi.mock("~/src/hooks", () => ({
  useTasks: vi.fn(() => ({ dispatch })),
}));

describe("Input", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input and button", () => {
    render(<Input />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("updates input value on change", async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole("textbox");

    await act(async () => {
      await user.type(input, "New Task");
    });

    expect(input).toHaveValue("New Task");
  });

  it("dispatches createTask on submit", async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole("textbox");
    await act(async () => {
      await user.type(input, "New Task");
    });
    
    await user.click(screen.getByRole("button", { name: "+" }));

    expect(dispatch).toHaveBeenCalledWith({
      type: ACTIONS.CREATE_TASK,
      payload: { title: "New Task" },
    });
  });
});