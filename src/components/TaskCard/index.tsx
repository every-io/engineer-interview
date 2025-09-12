import { Task } from "../../types"
 import { ArrowLeft, ArrowRight} from 'react-feather';

interface TaskCardProps {
    task: Task
}

export function TaskCard({task}: TaskCardProps) {
    return <div className="p-4 rounded-lg shadow-xl w-full flex justify-between items-center">
        <button className="bg-red-700 rounded-md h-16 w-12 flex justify-center items-center"><ArrowLeft color="white" size={36}/></button>
        <p className="text-2xl">{task.text}</p>
        <button className="bg-green-700 rounded-md h-16 w-12 flex justify-center items-center"><ArrowRight color="white" size={36}/></button>
    </div>
}