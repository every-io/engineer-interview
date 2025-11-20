import { useEffect, useState } from "react";
import { createCategories, createTodo as createTodoUtil } from "../utils"
import { Category, Todo } from "../types";

interface UseTodosAPI {
    categories: Category[];
    todos: Todo[];
    createTodo: (name: string) => void;
    getCategoryItems: (categoryId: string) => Todo[];
    isCategoryAtEdge: (categoryId: string, direction: 'left' | 'right') => boolean;
    moveTodo: (targetTodoId: string, direction: 'left' | 'right') => void;
}

interface CategoryTodoMap {
    [categoryId: Category["id"]]: Todo[];
}

const useTodos = (categoryNames: string[]): UseTodosAPI => {
    const [categories, _setCategories] = useState(createCategories(categoryNames));
    const [todos, setTodos] = useState<Todo[]>([]);
    const [categoryTodoMap, setCategoryTodoMap] = useState<CategoryTodoMap>({});

    const getInitialCategory = () => {
        return categories[0];
    };

    const createTodo = (name: string) => {
        const initialCategory = getInitialCategory();
        if (!initialCategory) {
            throw new Error("No initial category found");
        }

        const newTodo = createTodoUtil(name, initialCategory.id);
        setTodos([...todos, newTodo]);
    };

    const getCategoryItems = (categoryId: string) => {
        return categoryTodoMap[categoryId] || [];
    };

    const isCategoryAtEdge = (categoryId: string, direction: 'left' | 'right') => {
        if (direction === 'left') {
            return categoryId === categories[0].id;
        } else {
            return categoryId === categories[categories.length - 1].id;
        }
    };

    const moveTodo = (targetTodoId: string, direction: 'left' | 'right') => {

        const todo = todos.find(todo => todo.id === targetTodoId);
        if (!todo) {
            throw new Error("Todo not found");
        }

        const currentCategory = categories.find(category => category.id === todo.categoryId);
        if (!currentCategory) {
            throw new Error("Current category not found");
        }

        const currentCategoryIndex = categories.indexOf(currentCategory);
        if (currentCategoryIndex === -1) {
            throw new Error("Current category not found");
        }

        const newCategoryIndex = currentCategoryIndex + (direction === 'left' ? -1 : 1);
        if (newCategoryIndex < 0 || newCategoryIndex >= categories.length) {
            throw new Error("New category not found");
        }

        const newCategory = categories[newCategoryIndex];
        if (!newCategory) {
            throw new Error("New category not found");
        }

        setTodos(todos.map(todo => {
            if (todo.id === targetTodoId) {
                return {
                    ...todo,
                    categoryId: newCategory.id,
                };
            }

            return todo;
        }));
    };

    /*
        In reality, implementing something like this is overkill for merely
        needing to get all the todos for a given category, but figured it'd demonstrate
        an awareness of how to structure data to reduce superfluous computation.
        You could also just stick todos inside categories (in memory), but that's more
        cumbersome imho.
    */
    useEffect(() => {
        const newCategoryTodoMap = todos.reduce<CategoryTodoMap>((acc, todo) => {
            acc[todo.categoryId] = [...(acc[todo.categoryId] || []), todo];
            return acc;
        }, {});

        setCategoryTodoMap(newCategoryTodoMap);
    }, [todos, categories]);

    return {
        categories,
        todos,
        createTodo,
        getCategoryItems,
        isCategoryAtEdge,
        moveTodo,
    };
}

export default useTodos;