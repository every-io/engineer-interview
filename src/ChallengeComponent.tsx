import CategoryColumn from "./components/Category";
import NewTodoInput from "./components/NewTodoInput";
import { CATEGORY_NAMES } from "./constants";
import useTodos from "./hooks/useTodos";

export function ChallengeComponent() {
  const { categories, createTodo, getCategoryItems } = useTodos(CATEGORY_NAMES);

  return (
    <div>
      {categories.map(category => {
        const categoryTodos = getCategoryItems(category.id);

        return (
          <div key={category.id}>
            <CategoryColumn category={category} todos={categoryTodos} />
          </div>
        )
      })}

      <div>
        <NewTodoInput onSubmit={createTodo} />
      </div>
    </div>
  );
}
