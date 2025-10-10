import { COLUMN_LABELS } from "@/utils/constants";
import { Task, TaskStatus } from "../types";

interface TaskCardProps {
  task: Task;
  onMovePrevious?: (taskId: string) => void;
  onMoveNext?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskCard({
  task,
  onMovePrevious,
  onMoveNext,
  onDelete,
}: TaskCardProps) {
  const { id, title, description, status } = task;

  const statusOrder: TaskStatus[] = ["todo", "inProgress", "done"];
  const currentIndex = statusOrder.indexOf(status);

  const statusColors: Record<TaskStatus, string> = {
    todo: "bg-blue-100",
    inProgress: "bg-yellow-100",
    done: "bg-green-100",
  };

  return (
    <div
      className={`${statusColors[status]} p-4 rounded-md shadow-sm mb-2 flex flex-col`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{COLUMN_LABELS[status]}</p>
      </div>
      <p className="mb-2">{description}</p>

      <div className="flex justify-between items-center">
        <button
          className="px-2 py-1 text-sm bg-red-200 rounded hover:bg-red-300"
          onClick={() => onDelete?.(id)}
        >
          Delete
        </button>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => onMovePrevious?.(id)}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => onMoveNext?.(id)}
            disabled={currentIndex === statusOrder.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
