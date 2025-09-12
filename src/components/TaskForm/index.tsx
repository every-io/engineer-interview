 import { ChangeEvent, FormEvent, useState } from "react";
import { Plus } from "react-feather";

interface TaskFormProps {
    onAddTask: (text: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
    const [newTaskText, setNewTaskText] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimText = newTaskText.trim();
        if(trimText) {
            onAddTask(trimText);
            setNewTaskText('');
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskText(e.target.value);
    }

    return (
         <form 
            onSubmit={handleSubmit} 
            className="flex flex-col justify-around p-8"
        >
            <div className="flex gap-8">
                <input 
                    value={newTaskText}
                    onChange={handleChange}
                    placeholder="Enter new task"
                    className="w-[240px] border-black border-2 border-solid px-4 text-lg" type="text"
                    aria-label="New Task text"
                />
                <button
                    type="submit"
                    className="bg-blue-button rounded-lg h-16 w-28 flex justify-center items-center">
                    <Plus color="white" size={36}/>
                </button>
            </div>
        </form>
    )
}