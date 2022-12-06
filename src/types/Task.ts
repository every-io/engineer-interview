export interface ITask {
  id: number;
  content: string;
  column: number;
}

export interface ITaskProps extends ITask {
  lastPossibleColumn: number;
  updateTask: (task: ITask) => void;
}

export interface IAction {
  type: string;
  payload: ITask;
}
