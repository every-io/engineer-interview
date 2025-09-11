/**
 * Shared types and interfaces for the Kanban board components
 */

// Task status represents the three columns in our Kanban board
export type TaskStatus = 'todo' | 'inProgress' | 'done';

// Task interface represents a single task item
export interface Task {
  id: number;
  text: string;
  status: TaskStatus;
}

// Column interface represents a single column in the Kanban board
export interface Column {
  id: TaskStatus;
  title: string;
}

// Animation configuration for task cards
export const TASK_ANIMATION = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95
  },
  transition: {
    duration: 0.4
  }
};

// Column configuration for the Kanban board
export const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];
