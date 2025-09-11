import { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [taskText, setTaskText] = useState('');

  /**
   * Handles form submission
   * - Prevents default form behavior
   * - Validates input (non-empty after trimming)
   * - Calls onAddTask callback with trimmed text
   * - Clears input field on success
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-3 p-6">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add Task"
          className="flex-1 px-4 py-2 border-2 border-black rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ backgroundColor: 'transparent' }}
          aria-label="New task description"
        />
        
        <button
          type="submit"
          className="w-12 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center font-bold text-xl"
          aria-label="Add new task"
        >
          +
        </button>
      </form>
    </div>
  );
}
