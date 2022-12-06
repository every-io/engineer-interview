import { ITask } from "types/Task";

export interface ITaskBoardProps {
  columns?: string[];
  defaultTasks?: ITask[];
}
