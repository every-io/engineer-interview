import { render, screen, fireEvent } from "@testing-library/react";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { describe, it, expect, vi } from "vitest";

describe("CreateTaskForm", () => {
  it("calls onCreate with the correct data and resets inputs", () => {
    const mockOnCreate = vi.fn();
    render(<CreateTaskForm onCreate={mockOnCreate} />);

    const titleInput = screen.getByLabelText(/task title/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      /task description/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(titleInput, { target: { value: "My Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Task description" },
    });
    fireEvent.click(submitButton);

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
    expect(mockOnCreate).toHaveBeenCalledWith({
      title: "My Task",
      description: "Task description",
      status: "todo",
    });

    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });

  it("trims input values before calling onCreate", () => {
    const mockOnCreate = vi.fn();

    render(<CreateTaskForm onCreate={mockOnCreate} />);

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/task description/i);
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(titleInput, { target: { value: "  Task with spaces  " } });
    fireEvent.change(descriptionInput, {
      target: { value: "  Description  " },
    });
    fireEvent.click(submitButton);

    expect(mockOnCreate).toHaveBeenCalledWith({
      title: "Task with spaces",
      description: "Description",
      status: "todo",
    });
  });
});
