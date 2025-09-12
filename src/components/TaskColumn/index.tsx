import { Column, Direction, DIRECTION, Task } from "../../types";
import { TaskCard } from "../TaskCard";

interface TaskColumnProps {
    column: Column;
    tasks: Task[];
    onMoveTask: (taskId: string, direction: Direction) => void;
}

export function TaskColumn({
    column,
    tasks,
    onMoveTask
}: TaskColumnProps) {
    return (
        <div className="bg-white shadow-2xl w-[400px] min-h-[500px] p-4 rounded-lg place-items-center">
            <h2 className="text-3xl">{column.title}</h2>

            {tasks.map((task) => 
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onMoveLeft={(taskId) => onMoveTask(taskId, DIRECTION.LEFT)}
                    onMoveRight={(taskId) => onMoveTask(taskId, DIRECTION.RIGHT)}
                />
            )}
        </div>
    )
}