import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { Status } from "~/src/utils/types";
import { ACTIONS } from "~/src/store/tasks";

import Task from "../Task";

const dispatch = vi.fn();

vi.mock("~/src/hooks", () => ({
  useTasks: vi.fn(() => ({ dispatch })),
}));

describe("Task", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a title", () => {
    render(<Task id="1" title="Test Task" status={Status.InProgress} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  describe('back button', () => {
    it(`is disabled when status is ${Status.ToDo}`, () => {
      render(<Task id="1" title="Task" status={Status.ToDo} />);

      expect(screen.getByText("←")).toBeDisabled();
    });

    it("dispatches updateTask with decremented status on click", () => {
      render(<Task id="1" title="Task" status={Status.InProgress} />);
      fireEvent.click(screen.getByText("←"));

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: ACTIONS.UPDATE_TASK,
          payload: { id: "1", title: "Task", status: Status.ToDo },
        })
      );
    });
  })

  describe("forward button", () => {
    it(`is disabled when status is ${Status.Done}`, () => {
      render(<Task id="1" title="Task" status={Status.Done} />);
      expect(screen.getByText("→")).toBeDisabled();
    });

    it("dispatches updateTask with incremented status on click", () => {
      render(<Task id="1" title="Task" status={Status.InProgress} />);
      fireEvent.click(screen.getByText("→"));

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: ACTIONS.UPDATE_TASK,
          payload: { id: "1", title: "Task", status: Status.Done },
        })
      );
    });
  })
});