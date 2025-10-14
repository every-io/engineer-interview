import { Column, Direction, DIRECTION, Task } from "../../types";
import { TaskCard } from "../TaskCard";

interface TaskColumnProps {
    column: Column;
    tasks: Task[];
    onMoveTask: (taskId: string, direction: Direction) => void;
    isFirstColumn: boolean;
    isLastColumn: boolean;
}

export function TaskColumn({
    column,
    tasks,
    onMoveTask,
    isFirstColumn,
    isLastColumn
}: TaskColumnProps) {
    return (
        <div className="bg-white drop-shadow-xl w-[400px] min-h-[500px] p-4 rounded-lg place-items-center">
            <h2 className="text-3xl">{column.title}</h2>

            {tasks.map((task) => 
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onMoveLeft={(taskId) => onMoveTask(taskId, DIRECTION.LEFT)}
                    onMoveRight={(taskId) => onMoveTask(taskId, DIRECTION.RIGHT)}
                    isFirstColumn={isFirstColumn}
                    isLastColumn={isLastColumn}
                />
            )}
        </div>
    )
}