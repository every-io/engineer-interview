import React, { useCallback, useMemo, useState } from "react";

import styles from "./TodoStyles.module.css";

import { List } from "../list/List";
import { TaskInput } from "../task-input/TaskInput";
import { TaskData } from "../../../domain/models";

export const Todo = () => {
  const [taskList, setTaskList] = useState<Array<TaskData>>([]);

  const todoList = useMemo(
    () => taskList.filter((task) => task.status === "todo"),
    [taskList]
  );
  const progressList = useMemo(
    () => taskList.filter((task) => task.status === "progress"),
    [taskList]
  );
  const doneList = useMemo(
    () => taskList.filter((task) => task.status === "done"),
    [taskList]
  );

  const handleAddTask = useCallback((name: string) => {
    setTaskList((prev) => [...prev, { id: Date.now(), name, status: "todo" }]);
  }, []);

  const handleChangeStatus = useCallback(
    (task: TaskData) =>
      setTaskList((prev) => [
        ...prev.filter((item) => item.id !== task.id),
        task,
      ]),
    []
  );

  return (
    <div className={styles.container}>
      <TaskInput onClick={handleAddTask} />
      <div className={styles.wrapper}>
        <List
          name="To Do"
          items={todoList}
          onChangeStatus={handleChangeStatus}
        />
        <List
          name="In Progress"
          items={progressList}
          onChangeStatus={handleChangeStatus}
        />
        <List
          name="Done"
          items={doneList}
          onChangeStatus={handleChangeStatus}
        />
      </div>
    </div>
  );
};
