import { Category, Todo } from "../types";

export const newUUID = (): string => {
    return crypto.randomUUID();
}

export const createCategories = (categoryNames: string[]): Category[] => {
    return categoryNames.map(name => ({
        id: newUUID(),
        name,
    }));
}

export const createTodo = (name: string, categoryId: string): Todo => {
    return {
        id: newUUID(),
        name,
        categoryId,
    }
}