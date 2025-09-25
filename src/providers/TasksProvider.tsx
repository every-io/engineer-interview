import { PropsWithChildren, useMemo, useReducer } from 'react';

import { Context, INITIAL_STATE, reducer } from '~/src/store/tasks';

export default function AppStateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const tasks = Object.values(state.tasks);
  
  const value = useMemo(
    () => ({
      ...state,
      tasks,
      dispatch
    }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
