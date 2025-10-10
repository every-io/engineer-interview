import { describe, it, expect, beforeEach } from "vitest";
import { taskService } from "@/services/taskService";

describe("taskService", () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    // @ts-ignore
    global.localStorage = localStorageMock;
    localStorage.clear();
  });

  it("seeds sample tasks", () => {
    const seededTasks = taskService.seed();

    expect(seededTasks.length).toBe(3);

    const tasks = JSON.parse(localStorage.getItem("tasks")!);

    expect(tasks.length).toBe(3);
  });

  it("fetchs all tasks", () => {
    taskService.seed();
    const tasks = taskService.fetchAll();

    expect(tasks.length).toBe(3);
  });

  it("creates a new task", () => {
    taskService.seed();
    const newTask = taskService.create({
      title: "Test task",
      description: "Test description",
      status: "todo",
    });

    expect(newTask.id).toBeDefined();
    expect(newTask.title).toBe("Test task");

    const tasks = taskService.fetchAll();

    expect(tasks.length).toBe(4);
  });

  it("updates an existing task", () => {
    const tasks = taskService.seed();
    const taskToUpdate = tasks[0];

    const updated = taskService.update(taskToUpdate.id, {
      title: "Updated title",
      status: "done",
    });

    expect(updated).not.toBeNull();
    expect(updated?.title).toBe("Updated title");
    expect(updated?.status).toBe("done");

    const stored = taskService.fetchAll().find((t) => t.id === taskToUpdate.id);

    expect(stored?.title).toBe("Updated title");
  });

  it("returns null when updating non-existent task", () => {
    const result = taskService.update("non-existent-id", {
      title: "This does not exist",
    });

    expect(result).toBeNull();
  });

  it("deletes a task", () => {
    const tasks = taskService.seed();
    const taskToDelete = tasks[0];
    const result = taskService.delete(taskToDelete.id);

    expect(result).toBe(true);

    const remainingTasks = taskService.fetchAll();

    expect(remainingTasks.length).toBe(2);
    expect(
      remainingTasks.find((t) => t.id === taskToDelete.id)
    ).toBeUndefined();
  });

  it("returns false when deleting a non-existent task", () => {
    taskService.seed();
    const result = taskService.delete("non-existent-id");

    expect(result).toBe(false);
  });

  it("clears all tasks", () => {
    taskService.seed();
    taskService.clear();

    const tasks = taskService.fetchAll();

    expect(tasks.length).toBe(0);
  });
});
