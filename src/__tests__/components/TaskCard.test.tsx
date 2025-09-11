import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from '../../components/TaskCard';
import { Task } from '../../components/types';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('TaskCard', () => {
  const mockOnMoveTask = vi.fn();

  const todoTask: Task = {
    id: 1,
    text: 'Test task in todo',
    status: 'todo'
  };

  const inProgressTask: Task = {
    id: 2,
    text: 'Test task in progress',
    status: 'inProgress'
  };

  const doneTask: Task = {
    id: 3,
    text: 'Test task done',
    status: 'done'
  };

  beforeEach(() => {
    mockOnMoveTask.mockClear();
  });

  it('renders task text correctly', () => {
    render(<TaskCard task={todoTask} onMoveTask={mockOnMoveTask} />);
    expect(screen.getByText('Test task in todo')).toBeInTheDocument();
  });

  it('displays both arrow buttons', () => {
    render(<TaskCard task={inProgressTask} onMoveTask={mockOnMoveTask} />);
    
    const leftButton = screen.getByLabelText('Move task to previous column');
    const rightButton = screen.getByLabelText('Move task to next column');
    
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(leftButton).toHaveTextContent('←');
    expect(rightButton).toHaveTextContent('→');
  });

  describe('Button States', () => {
    it('disables left button when task is in todo column', () => {
      render(<TaskCard task={todoTask} onMoveTask={mockOnMoveTask} />);
      
      const leftButton = screen.getByLabelText('Move task to previous column');
      const rightButton = screen.getByLabelText('Move task to next column');
      
      expect(leftButton).toBeDisabled();
      expect(rightButton).not.toBeDisabled();
    });

    it('disables right button when task is in done column', () => {
      render(<TaskCard task={doneTask} onMoveTask={mockOnMoveTask} />);
      
      const leftButton = screen.getByLabelText('Move task to previous column');
      const rightButton = screen.getByLabelText('Move task to next column');
      
      expect(leftButton).not.toBeDisabled();
      expect(rightButton).toBeDisabled();
    });

    it('enables both buttons when task is in progress', () => {
      render(<TaskCard task={inProgressTask} onMoveTask={mockOnMoveTask} />);
      
      const leftButton = screen.getByLabelText('Move task to previous column');
      const rightButton = screen.getByLabelText('Move task to next column');
      
      expect(leftButton).not.toBeDisabled();
      expect(rightButton).not.toBeDisabled();
    });
  });

  describe('Button Interactions', () => {
    it('calls onMoveTask with correct parameters when left button is clicked', () => {
      render(<TaskCard task={inProgressTask} onMoveTask={mockOnMoveTask} />);
      
      const leftButton = screen.getByLabelText('Move task to previous column');
      fireEvent.click(leftButton);
      
      expect(mockOnMoveTask).toHaveBeenCalledWith(2, 'left');
    });

    it('calls onMoveTask with correct parameters when right button is clicked', () => {
      render(<TaskCard task={inProgressTask} onMoveTask={mockOnMoveTask} />);
      
      const rightButton = screen.getByLabelText('Move task to next column');
      fireEvent.click(rightButton);
      
      expect(mockOnMoveTask).toHaveBeenCalledWith(2, 'right');
    });

    it('does not call onMoveTask when disabled button is clicked', () => {
      render(<TaskCard task={todoTask} onMoveTask={mockOnMoveTask} />);
      
      const leftButton = screen.getByLabelText('Move task to previous column');
      fireEvent.click(leftButton);
      
      expect(mockOnMoveTask).not.toHaveBeenCalled();
    });
  });

  describe('Button Styling', () => {
    it('applies correct classes for enabled buttons', () => {
      render(<TaskCard task={inProgressTask} onMoveTask={mockOnMoveTask} />);
      
      const leftButton = screen.getByLabelText('Move task to previous column');
      const rightButton = screen.getByLabelText('Move task to next column');
      
      expect(leftButton).toHaveClass('bg-red-500');
      expect(rightButton).toHaveClass('bg-green-500');
    });

    it('applies correct classes for disabled buttons', () => {
      render(<TaskCard task={todoTask} onMoveTask={mockOnMoveTask} />);
      
      const leftButton = screen.getByLabelText('Move task to previous column');
      
      expect(leftButton).toHaveClass('bg-red-300', 'cursor-not-allowed');
    });
  });
});
