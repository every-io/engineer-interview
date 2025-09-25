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

export type UpdateTaskAction = {
  type: typeof ACTIONS.UPDATE_TASK
  payload: Task
}

export type CreateTaskAction = {
  type: typeof ACTIONS.CREATE_TASK
  payload: { title: string }
}

export type Action = CreateTaskAction | UpdateTaskAction

export type ContextType = {
  dispatch: React.Dispatch<Action>
  tasks: Task[]
};