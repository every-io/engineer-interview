import { TaskColumn, AddTaskForm, useTasks, COLUMNS } from './components';

export function ChallengeComponent() {
  const { moveTask, addTask, getTasksByStatus } = useTasks();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Kanban Board - Three Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {COLUMNS.map(column => (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={getTasksByStatus(column.id)}
            onMoveTask={moveTask}
          />
        ))}
      </div>

      {/* Add Task Form - Positioned below and aligned with first column */}
      <AddTaskForm onAddTask={addTask} />
    </div>
  );
}