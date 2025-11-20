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
            <input name="todoName" placeholder="Add Task" type="text" onChange={handleChange} value={todoName} />
            <button type="submit" disabled={!todoName.trim()}>Add</button>
        </form>
    )
};

export default NewTodoInput;