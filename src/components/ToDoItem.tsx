import { Todo } from "../types";

interface ToDoItemProps {
    todo: Todo;
}

const ToDoItem = ({ todo }: ToDoItemProps) => {
    return (
        <div>
            <div>{todo.name}</div>
        </div>
    )
}

export default ToDoItem;