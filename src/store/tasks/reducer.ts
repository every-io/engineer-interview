import { State, Action, Task, Status } from '~/src/utils/types'
import { ACTIONS } from './actions';

export const INITIAL_STATE: State = {
  tasks: {}
};

const handleCreateTask = (state: State, payload: { title: string }) => {
  const task = {
    id: crypto.randomUUID(),
    title: payload.title,
    status: Status.ToDo
  }

  return { ...state, tasks: { ...state.tasks, [task.id]: task } }
}

const handleUpdateTask = (state: State, payload: Task) => {
  return { ...state, tasks: { ...state.tasks, [payload.id]: payload } };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.CREATE_TASK:
      return handleCreateTask(state, action.payload);
    case ACTIONS.UPDATE_TASK:
      return handleUpdateTask(state, action.payload);
    default:
      return state;
  }
}
