import { useState } from 'react';
import { Task, TaskStatus, COLUMNS } from './types';

/**
 * Custom hook for managing task state and operations
 * 
 * Provides:
 * - Task state management
 * - Task movement between columns
 * - Task creation
 * - Task filtering by status
 * 
 * Business Logic:
 * - New tasks are added to 'todo' column
 * - Moved tasks go to the end of destination column
 * - Tasks maintain their order within columns unless moved
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Moves a task to the adjacent column (left or right)

   * Logic:
   * 1. Find the task and determine current/target columns
   * 2. Remove task from current position in array
   * 3. Update task status to new column
   * 4. Append to end of array (appears at bottom of new column)
   */
  const moveTask = (taskId: number, direction: 'left' | 'right') => {
    setTasks(currentTasks => {
      // Find the task to move
      const taskToMove = currentTasks.find(task => task.id === taskId);
      if (!taskToMove) return currentTasks;

      const currentIndex = COLUMNS.findIndex(col => col.id === taskToMove.status);
      let newIndex = currentIndex;

      // Determine new column
      if (direction === 'right' && currentIndex < COLUMNS.length - 1) {
        newIndex = currentIndex + 1;
      } else if (direction === 'left' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else {
        // No movement needed
        return currentTasks;
      }

      // Remove the task from its current position
      const tasksWithoutMoved = currentTasks.filter(task => task.id !== taskId);
      
      // Create the updated task with new status
      const updatedTask = {
        ...taskToMove,
        status: COLUMNS[newIndex].id
      };

      // Add the task to the end of the array (it will appear at the end of its new column)
      return [...tasksWithoutMoved, updatedTask];
    });
  };

  /**
   * Adds a new task to the 'todo' column
   * Logic:
   * - Validates input (non-empty after trimming)
   * - Creates task with unique ID (timestamp-based)
   * - Adds to 'todo' status by default
   * - Appends to end of tasks array
   */
  const addTask = (text: string) => {
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: Date.now(), // In production, use a proper UUID generator
      text: text.trim(),
      status: 'todo'
    };
    setTasks(currentTasks => [...currentTasks, newTask]);
  };

  /**
   * Filters tasks by their status (column)
   */
  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter(task => task.status === status);
  };

  return {
    moveTask,
    addTask,
    getTasksByStatus
  };
}
