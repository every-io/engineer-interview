import { State, Action, Task } from '~/src/utils/types'
import { ACTIONS } from './actions';

export const INITIAL_STATE: State = {
  tasks: {}
};

const handleUpdateTask = (state: State, payload: Task) => {
  return { ...state, tasks: { ...state.tasks, [payload.id]: payload } };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.UPDATE_TASK:
      return handleUpdateTask(state, action.payload);
    default:
      return state;
  }
}
