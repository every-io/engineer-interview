import { ACTIONS } from '~/src/store/tasks';

export enum Status {
  ToDo = 0,
  InProgress = 1,
  Done = 2
}

export type Task = {
  id: string
  title: string
  status: Status
}

export type State = {
  tasks: Record<string, Task>
};

export type Action = {
  type: (typeof ACTIONS)[keyof typeof ACTIONS]
  payload: Task
}

export type ContextType = {
  dispatch: React.Dispatch<Action>
  tasks: Task[]
};