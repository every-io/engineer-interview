import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TaskColumn } from './index';
import type { Task, Column } from '../../types';

describe('TaskColumn', () => {
  const mockColumn: Column = {
    id: 'todo',
    title: 'Todo',
    order: 0
  };

  const mockTasks: Task[] = [
    { id: '1', text: 'Task 1', columnId: 'todo', boardId: 'board-1', updatedAt: '2024-01-01T00:00:00Z' },
    { id: '2', text: 'Task 2', columnId: 'todo', boardId: 'board-1', updatedAt: '2024-01-01T00:00:00Z' }
  ];

  const mockOnMoveTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with correct title and tasks', () => {
    render(
      <TaskColumn
        column={mockColumn}
        tasks={mockTasks}
        onMoveTask={mockOnMoveTask}
        isFirstColumn={true}
        isLastColumn={false}
      />
    );

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});