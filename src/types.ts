export type TaskStatus = "todo" | "inProgress" | "done";
export type TaskStatusArray = TaskStatus[];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
