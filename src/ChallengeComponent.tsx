import CategoryColumn from "./components/Category";
import NewTodoInput from "./components/NewTodoInput";
import { CATEGORY_NAMES } from "./constants";
import useTodos from "./hooks/useTodos";

export function ChallengeComponent() {
  const { categories, createTodo, getCategoryItems, isCategoryAtEdge, moveTodo } = useTodos(CATEGORY_NAMES);

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between gap-4">
        {categories.map(category => {
          const categoryTodos = getCategoryItems(category.id);

          return (
            <CategoryColumn
              key={category.id}
              category={category}
              todos={categoryTodos}
              moveTodo={moveTodo}
              isLeftmostCategory={isCategoryAtEdge(category.id, 'left')}
              isRightmostCategory={isCategoryAtEdge(category.id, 'right')}
            />
          );
        })}
      </div>

      <div className="mt-4">
        <NewTodoInput onSubmit={createTodo} />
      </div>
    </div>
  );
}
