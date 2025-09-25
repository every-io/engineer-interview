import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { Status, Task as TaskType } from "~/src/utils/types";

import Column from "../Column";

vi.mock("../Task", () => ({
  default: vi.fn(({ id, title, status }) => (
    <li data-testid="mock-task">
      {title} ({id}) - {status}
    </li>
  )),
}));

describe("Column", () => {
  const tasks: TaskType[] = [
    { id: "1", title: "Task One", status: Status.ToDo },
    { id: "2", title: "Task Two", status: Status.InProgress },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the column title", () => {
    render(<Column title="Todo Column" tasks={tasks} />);

    expect(screen.getByText("Todo Column")).toBeInTheDocument();
  });

  it("renders one Task per task passed in", () => {
    render(<Column title="Todo Column" tasks={tasks} />);

    expect(screen.getAllByTestId("mock-task")).toHaveLength(tasks.length);
  });
});