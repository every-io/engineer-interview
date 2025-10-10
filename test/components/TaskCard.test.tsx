import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/types";
import { COLUMN_LABELS } from "@/utils/constants";

describe("TaskCard", () => {
  const baseTask: Task = {
    id: "1",
    title: "Do Things!",
    description: "Do all of the things!",
    status: "inProgress",
  };

  it("renders task title, description, and status label", () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByText(baseTask.title)).toBeInTheDocument();
    expect(screen.getByText(baseTask.description)).toBeInTheDocument();
    expect(
      screen.getByText(COLUMN_LABELS[baseTask.status])
    ).toBeInTheDocument();
  });

  it("calls onMovePrevious and onMoveNext when buttons are clicked", () => {
    const mockPrev = vi.fn();
    const mockNext = vi.fn();

    render(
      <TaskCard
        task={baseTask}
        onMovePrevious={mockPrev}
        onMoveNext={mockNext}
      />
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(mockPrev).toHaveBeenCalledTimes(1);
    expect(mockPrev).toHaveBeenCalledWith(baseTask.id);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(baseTask.id);
  });

  it("disables Previous button when task is first in status order", () => {
    const firstTask: Task = { ...baseTask, status: "todo" };
    render(<TaskCard task={firstTask} />);
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button when task is last in status order", () => {
    const lastTask: Task = { ...baseTask, status: "done" };
    render(<TaskCard task={lastTask} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });
});
