import { TaskColumn } from "./components/TaskColumn";
import { TaskForm } from "./components/TaskForm";
import { useTasks } from "./hooks/useTask";
import { mockedBoard } from "./mocks";

export function ChallengeComponent() {
  const board = mockedBoard;
  const { tasks, addTask, moveTask } = useTasks({ board })

  const getTasksForColumn = (columnId: string) => {
    return tasks.filter(task => task.columnId === columnId)
  }

  return ( 
    <div className="flex flex-col justify-around p-8">
      <div className="flex justify-around">
        {
          board.columns.map((column, index) => (
            <TaskColumn 
              key={column.id} 
              column={column} 
              tasks={getTasksForColumn(column.id)} 
              onMoveTask={moveTask} 
              isFirstColumn={index === 0}
              isLastColumn={index === board.columns.length - 1}
            />
          ))
        }
      </div>

      <TaskForm onAddTask={addTask} />
    </div>
  );
}
