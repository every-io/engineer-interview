import { Category, Todo } from "../types";
import ToDoItem from "./ToDoItem";

interface CategoryColumnProps {
    category: Category;
    todos: Todo[];
    isLeftmostCategory?: boolean;
    isRightmostCategory?: boolean;
    moveTodo: (targetTodoId: string, direction: 'left' | 'right') => void;
}

const CategoryColumn = ({ category, todos, isLeftmostCategory = false, isRightmostCategory = false, moveTodo }: CategoryColumnProps) => {
    return (
        <div className="flex-1 border border-gray-200 p-4 rounded-lg shadow-md min-h-96">
            <div className="text-center">
                <h2 className="text-2xl">{category.name}</h2>
            </div>

            {todos.map(todo => (
                <ToDoItem key={todo.id} todo={todo} canMoveLeft={!isLeftmostCategory} canMoveRight={!isRightmostCategory} moveTodo={moveTodo} />
            ))}
        </div>
    )
}

export default CategoryColumn;