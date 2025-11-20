import { Category, Todo } from "../types";
import ToDoItem from "./ToDoItem";

interface CategoryColumnProps {
    category: Category;
    todos: Todo[];
}

const CategoryColumn = ({ category, todos }: CategoryColumnProps) => {
    return (
        <div>

            <h2>{category.name}</h2>
            {todos.map(todo => (
                <ToDoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}

export default CategoryColumn;