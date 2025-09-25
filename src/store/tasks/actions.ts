import { Task } from '~/src/utils/types'

export const ACTIONS = {
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
} as const;

export const updateTask = (task: Task) => ({
  type: ACTIONS.UPDATE_TASK,
  payload: task,
});

export const createTask = (title: string) => ({
  type: ACTIONS.CREATE_TASK,
  payload: { title },
});