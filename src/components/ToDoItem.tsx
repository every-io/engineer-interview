import { Todo } from "../types";
import TodoButton from "./TodoButton";

interface ToDoItemProps {
    todo: Todo;
    canMoveLeft: boolean;
    canMoveRight: boolean;
    moveTodo: (targetTodoId: string, direction: 'left' | 'right') => void;
}

const ToDoItem = ({ todo, canMoveLeft, canMoveRight, moveTodo }: ToDoItemProps) => {
    const handleMoveTodo = (direction: 'left' | 'right') => {
        moveTodo(todo.id, direction);
    };

    return (
        <div className="flex flex-row justify-between items-center border border-gray-200 p-2 rounded-lg shadow-md">
            <TodoButton direction="left" disabled={!canMoveLeft} handleClick={handleMoveTodo} />
            <div>{todo.name}</div>
            <TodoButton direction="right" disabled={!canMoveRight} handleClick={handleMoveTodo} />
        </div>
    )
}

export default ToDoItem;