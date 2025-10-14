import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TaskCard } from './index';
import type { Task } from '../../types';
import { fireEvent, render, screen } from '@testing-library/react';

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '1',
    text: 'Test task',
    columnId: 'todo',
    boardId: 'board-1',
    updatedAt: '2024-01-01T00:00:00Z'
  };

  const mockOnMoveLeft = vi.fn();
  const mockOnMoveRight = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders task text correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        isFirstColumn={false}
        isLastColumn={false}
      />
    );

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  test('calls onMoveLeft when left arrow is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        isFirstColumn={false}
        isLastColumn={false}
      />
    );

    const leftButton = screen.getByTestId('move-left-1');
    fireEvent.click(leftButton);
    
    expect(mockOnMoveLeft).toHaveBeenCalledWith('1');
    expect(mockOnMoveLeft).toHaveBeenCalledTimes(1);
  });

  test('calls onMoveRight when right arrow is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        isFirstColumn={false}
        isLastColumn={false}
      />
    );

    const rightButton = screen.getByTestId('move-right-1');
    fireEvent.click(rightButton);
    
    expect(mockOnMoveRight).toHaveBeenCalledWith('1');
    expect(mockOnMoveRight).toHaveBeenCalledTimes(1);
  });

  test('disables left button when isFirstColumn is true', () => {
    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        isFirstColumn={true}
        isLastColumn={false}
      />
    );

    const leftButton = screen.getByTestId('move-left-1');
    expect(leftButton).toBeDisabled();
  });

  test('disables right button when isLastColumn is true', () => {
    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        isFirstColumn={false}
        isLastColumn={true}
      />
    );

    const rightButton = screen.getByTestId('move-right-1');
    expect(rightButton).toBeDisabled();
  });
});