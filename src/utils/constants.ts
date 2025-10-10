import { TaskStatus, TaskStatusArray } from "@/types";

export const TASK_STATUS_IDS: TaskStatusArray = ["todo", "inProgress", "done"];
export const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};
