import { motion } from 'framer-motion';
import { Task, TASK_ANIMATION } from './types';

interface TaskCardProps {
  task: Task;
  onMoveTask: (taskId: number, direction: 'left' | 'right') => void;
}

/**
 * TaskCard component renders an individual task with move buttons
 * 
 * Features:
 * - Displays task text between left and right arrow buttons
 * - Handles button disabled states based on current column
 * - Smooth animations for enter/exit/layout changes
 * - Accessibility labels for screen readers
 */
export function TaskCard({ task, onMoveTask }: TaskCardProps) {
  // Determine button states based on current task status
  const isLeftDisabled = task.status === 'todo';
  const isRightDisabled = task.status === 'done';

  /**
   * Generates consistent button classes based on disabled state and colors
   * @param isDisabled - Whether the button should be disabled
   * @param enabledColor - Tailwind color class for enabled state
   * @param disabledColor - Tailwind color class for disabled state
   * @returns Complete className string for the button
   */
  const getButtonClasses = (isDisabled: boolean, enabledColor: string, disabledColor: string) => {
    return `w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-3xl transition-colors ${
      isDisabled
        ? `${disabledColor} cursor-not-allowed`
        : `${enabledColor} hover:${enabledColor.replace('500', '600')}`
    }`;
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg p-3 shadow-md"
      layout
      initial={TASK_ANIMATION.initial}
      animate={TASK_ANIMATION.animate}
      exit={TASK_ANIMATION.exit}
      transition={{
        ...TASK_ANIMATION.transition,
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }}
    >
      <div className="flex justify-between items-center">
        {/* Left arrow button - moves task to previous column */}
        <button
          onClick={() => onMoveTask(task.id, 'left')}
          disabled={isLeftDisabled}
          className={getButtonClasses(isLeftDisabled, 'bg-red-500', 'bg-red-300')}
          aria-label="Move task to previous column"
        >
          ←
        </button>

        {/* Task text content */}
        <p className="text-gray-800 text-center flex-1 mx-3 font-medium text-base">
          {task.text}
        </p>

        {/* Right arrow button - moves task to next column */}
        <button
          onClick={() => onMoveTask(task.id, 'right')}
          disabled={isRightDisabled}
          className={getButtonClasses(isRightDisabled, 'bg-green-500', 'bg-green-300')}
          aria-label="Move task to next column"
        >
          →
        </button>
      </div>
    </motion.div>
  );
}
