import { Task, Column, AddTask } from "components";

import { Card } from "components/UI";

import { useTasks } from "hooks";

import { ITaskBoardProps } from "types/TaskBoard";

import { ITask } from "types/Task";

import { BoardContainer, ColumnsContainer } from "styles/TaskBoard";

const DEFAULT_COLUMNS = ["To Do", "In Progress", "Done"];

const TaskBoard = ({ columns = DEFAULT_COLUMNS }: ITaskBoardProps) => {
  const { tasks, addTask, updateTask } = useTasks([]);

  return (
    <Card className={BoardContainer()} corner={"rounder"} elevation={"flat"}>
      <div className={ColumnsContainer()}>
        {columns.map((colName, i) => (
          <Column title={colName} key={colName + i}>
            {tasks
              .filter((task: ITask) => task.column === i)
              .map((task: ITask) => (
                <Task
                  key={task.id}
                  {...task}
                  updateTask={updateTask}
                  lastPossibleColumn={columns.length}
                />
              ))}
          </Column>
        ))}
      </div>
      <AddTask onAdd={addTask} />
    </Card>
  );
};

export default TaskBoard;
