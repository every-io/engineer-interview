import { TaskColumn } from "./components/TaskColumn";
import { TaskForm } from "./components/TaskForm";
import { useTasks } from "./hooks/useTask";
import { Board } from "./types";

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    order: 0,
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    order: 1,
  },
  {
    id: 'done',
    title: 'Done',
    order: 2,
  },
]

const board: Board = {
  id: '1',
  name: 'interview',
  columns: columns
}

export function ChallengeComponent() {
  const { tasks, addTask, moveTask } = useTasks({ board })

  const getTasksForColumn = (columnId: string) => {
    return tasks.filter(task => task.columnId === columnId)
  }

  return ( 
    <div className="flex flex-col justify-around p-8">
      <div className="flex justify-around">
        {
          columns.map((column, index) => (
            <TaskColumn 
              key={column.id} 
              column={column} 
              tasks={getTasksForColumn(column.id)} 
              onMoveTask={moveTask} 
              isFirstColumn={index === 0}
              isLastColumn={index === columns.length - 1}
            />
          ))
        }
      </div>

      <TaskForm onAddTask={addTask} />
    </div>
  );
}
