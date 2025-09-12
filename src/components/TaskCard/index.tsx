import { Task } from "../../types"
 import { ArrowLeft, ArrowRight} from 'react-feather';

interface TaskCardProps {
    task: Task;
    onMoveLeft: (taskId: string) => void;
    onMoveRight: (taskId: string) => void;
    isFirstColumn: boolean;
    isLastColumn: boolean;
}

export function TaskCard({ task, onMoveLeft, onMoveRight, isFirstColumn, isLastColumn }: TaskCardProps) {
    return <div className="p-4 rounded-lg shadow-xl w-full flex justify-between items-center">
        <button 
            onClick={() => onMoveLeft(task.id)}
            disabled={isFirstColumn}
            className={`rounded-md h-16 w-12 flex justify-center items-center ${isFirstColumn ? "bg-red-disabled" :"bg-red"}`}
        >
            <ArrowLeft color="white" size={36}/>
        </button>
        <p className="text-2xl">{task.text}</p>
        <button 
            onClick={() => onMoveRight(task.id)}
            disabled={isLastColumn}
            className={`rounded-md h-16 w-12 flex justify-center items-center ${isLastColumn ? "bg-green-disabled" :"bg-green"}`}
        >
            <ArrowRight color="white" size={36}/>
        </button>
    </div>
}