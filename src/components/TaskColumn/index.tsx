import { Column, Task } from "../../types";
import { TaskCard } from "../TaskCard";

interface TaskColumnProps {
    column: Column;
    tasks: Task[];
}

export function TaskColumn({
    column,
    tasks
}: TaskColumnProps) {
    return (
        <div className="bg-white shadow-2xl w-[400px] min-h-[500px] p-4 rounded-lg place-items-center">
            <h2 className="text-3xl">{column.title}</h2>

            {tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
    )
}