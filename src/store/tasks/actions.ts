import { Task } from '~/src/utils/types'

export const ACTIONS = {
  UPDATE_TASK: 'UPDATE_TASK',
};

export const updateTask = (task: Task) => ({
  type: ACTIONS.UPDATE_TASK,
  payload: task,
});