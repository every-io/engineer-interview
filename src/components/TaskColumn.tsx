import { Task } from "../types";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  moveTask: (id: string, direction: "previous" | "next") => void;
  onDelete: (id: string) => void;
}

export function TaskColumn({
  title,
  tasks,
  moveTask,
  onDelete,
}: TaskColumnProps) {
  return (
    <div className="flex-1 p-4 border rounded-md shadow-md min-w-[250px] max-w-[300px] flex flex-col min-h-[750px]">
      <h2 className="font-semibold mb-2 text-center border-b pb-4 mb-4">
        {title}
      </h2>
      <ul className="flex-1 overflow-y-auto space-y-2">
        {tasks.length === 0 ? (
          <li className="text-gray-500 text-center mt-4">No tasks</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onMovePrevious={(id) => moveTask(id, "previous")}
                onMoveNext={(id) => moveTask(id, "next")}
                onDelete={onDelete}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
