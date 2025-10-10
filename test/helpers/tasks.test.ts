import { describe, it, expect } from "vitest";
import { filterByStatus } from "@/helpers/tasks";
import { Task, TaskStatus } from "@/types";

describe("filterByStatus", () => {
  const sampleTasks: Task[] = [
    { id: "1", title: "Task 1", description: "Do the thing", status: "todo" },
    {
      id: "2",
      title: "Task 2",
      description: "Do the thing",
      status: "inProgress",
    },
    { id: "3", title: "Task 3", description: "Do the thing", status: "done" },
    { id: "4", title: "Task 4", description: "Do the thing", status: "todo" },
  ];

  it.each([
    ["todo", ["1", "4"]],
    ["inProgress", ["2"]],
    ["done", ["3"]],
  ] as [TaskStatus, string[]][])(
    "returns only tasks with corredsponding status",
    (status, expectedIds) => {
      const result = filterByStatus(sampleTasks, status);
      expect(result.map((t) => t.id)).toEqual(expectedIds);
    }
  );

  it("returns an empty array when given an empty task list", () => {
    expect(filterByStatus([], "todo")).toEqual([]);
  });
});
