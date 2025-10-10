import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskColumn } from "@/components/TaskColumn";
import { Task } from "@/types";

describe("TaskColumn", () => {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Do the first thing.",
      status: "todo",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Now do the second thing.",
      status: "inProgress",
    },
  ];

  it("renders the column title", () => {
    render(
      <TaskColumn
        title="Todo"
        tasks={[]}
        moveTask={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Todo")).toBeDefined();
  });

  it("renders tasks when present", () => {
    render(
      <TaskColumn
        title="Todo"
        tasks={tasks}
        moveTask={() => {}}
        onDelete={() => {}}
      />
    );

    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeDefined();
      expect(screen.getByText(task.description)).toBeDefined();
    });
  });

  it("shows empty state when there are no tasks", () => {
    render(
      <TaskColumn
        title="Empty Column"
        tasks={[]}
        moveTask={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("No tasks")).toBeDefined();
  });

  it("calls moveTask on Previous / Next button clicks", () => {
    const moveTaskMock = vi.fn();

    render(
      <TaskColumn
        title="Todo"
        tasks={tasks}
        moveTask={moveTaskMock}
        onDelete={() => {}}
      />
    );

    const prevButtons = screen.getAllByText("Previous");
    const nextButtons = screen.getAllByText("Next");

    fireEvent.click(nextButtons[0]);
    expect(moveTaskMock).toHaveBeenCalledWith("1", "next");

    fireEvent.click(prevButtons[1]);
    expect(moveTaskMock).toHaveBeenCalledWith("2", "previous");
  });

  it("calls onDelete when Delete button is clicked", () => {
    const onDeleteMock = vi.fn();

    render(
      <TaskColumn
        title="Todo"
        tasks={tasks}
        moveTask={() => {}}
        onDelete={onDeleteMock}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");

    fireEvent.click(deleteButtons[0]);
    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });
});
