/**
 * Component exports for the Kanban board
 * 
 * This file provides a clean interface for importing components
 * and maintains separation of concerns between different parts of the app.
 */

// Component exports
export { TaskCard } from './TaskCard';
export { TaskColumn } from './TaskColumn';
export { AddTaskForm } from './AddTaskForm';

// Hook exports
export { useTasks } from './useTasks';

// Type exports
export type { Task, TaskStatus, Column } from './types';
export { COLUMNS, TASK_ANIMATION } from './types';
