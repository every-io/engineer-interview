import { useReducer } from "react";

import { ITask, IAction } from "types/Task";

const reducer = (state: ITask[], action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TASK":
      return [...state, payload];

    case "UPDATE_TASK":
      const taskIndex = state.findIndex(
        (task: ITask) => task.id === payload.id
      );

      const stateCopy = [...state];

      stateCopy[taskIndex] = action.payload;

      return stateCopy;

    default:
      return state;
  }
};

const useTaskBoard = (defaultTasks: ITask[] = []) => {
  const [tasks, dispatch] = useReducer(reducer, defaultTasks);

  function addTask(content: string) {
    const newTask = {
      id: Math.random(),
      column: 0,
      content,
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  }

  function updateTask(payload: ITask) {
    dispatch({
      type: "UPDATE_TASK",
      payload,
    });
  }
  return { tasks, addTask, updateTask };
};

export default useTaskBoard;
