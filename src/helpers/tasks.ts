import { Task, TaskStatus } from "../types";

export const filterByStatus = (
  allTasks: Task[],
  status: TaskStatus
): Task[] => {
  return allTasks.filter((task) => task.status === status);
};
