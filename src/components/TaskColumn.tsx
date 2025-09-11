import { AnimatePresence } from 'framer-motion';
import { TaskCard } from './TaskCard';
import { Column, Task } from './types';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onMoveTask: (taskId: number, direction: 'left' | 'right') => void;
}

/**
 * TaskColumn component renders a single column in the Kanban board
 * 
 * Features:
 * - Displays column title at the top
 * - Shows all tasks for the current column status
 * - Handles smooth animations when tasks are added/removed
 * - Maintains consistent column height and styling
 */
export function TaskColumn({ column, tasks, onMoveTask }: TaskColumnProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[400px] shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {column.title}
      </h3>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onMoveTask={onMoveTask}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
