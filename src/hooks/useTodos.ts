import { useEffect, useState } from "react";
import { createCategories, createTodo as createTodoUtil } from "../utils"
import { Category, Todo } from "../types";

interface UseTodosAPI {
    categories: Category[];
    createTodo: (name: string) => void;
    getCategoryItems: (categoryId: string) => Todo[];
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
        createTodo,
        getCategoryItems,
    };
}

export default useTodos;