import CategoryColumn from "./components/Category";
import { CATEGORY_NAMES } from "./constants";
import useTodos from "./hooks/useTodos";

export function ChallengeComponent() {
  const { categories, todos, createTodo, getCategoryItems } = useTodos(CATEGORY_NAMES);

  return (
    <>
      {categories.map(category => {
        const categoryTodos = getCategoryItems(category.id);

        return (
          <div key={category.id}>
            <CategoryColumn category={category} todos={todos.filter(todo => todo.categoryId === category.id)} />
          </div>
        )
      })}
    </>
  );
}
