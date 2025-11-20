import { useState } from "react";

interface NewTodoInputProps {
    onSubmit: (todoName: string) => void;
}

const NewTodoInput = ({ onSubmit }: NewTodoInputProps) => {
    const [todoName, setTodoName] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const trimmedTodoName = todoName.trim();
        if (!trimmedTodoName) {
            return;
        }

        e.preventDefault();
        onSubmit(todoName);
        setTodoName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="border border-gray-200 p-2 rounded-lg shadow-md"
                name="todoName"
                placeholder="Add Task"
                type="text"
                onChange={handleChange}
                value={todoName}
            />

            <button
                className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors px-4 ml-2"
                type="submit"
                disabled={!todoName.trim()}
            >
                +
            </button>
        </form>
    )
};

export default NewTodoInput;