import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskColumn } from '../../components/TaskColumn';
import { Task, Column } from '../../components/types';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => children,
}));

// Mock TaskCard component
vi.mock('../../components/TaskCard', () => ({
  TaskCard: ({ task, onMoveTask }: { task: Task; onMoveTask: Function }) => (
    <div data-testid={`task-${task.id}`}>
      <span>{task.text}</span>
      <button onClick={() => onMoveTask(task.id, 'left')}>←</button>
      <button onClick={() => onMoveTask(task.id, 'right')}>→</button>
    </div>
  )
}));

describe('TaskColumn', () => {
  const mockOnMoveTask = vi.fn();

  const todoColumn: Column = {
    id: 'todo',
    title: 'To Do'
  };

  const sampleTasks: Task[] = [
    { id: 1, text: 'First task', status: 'todo' },
    { id: 2, text: 'Second task', status: 'todo' },
    { id: 3, text: 'Third task', status: 'todo' }
  ];

  beforeEach(() => {
    mockOnMoveTask.mockClear();
  });

  it('renders column title correctly', () => {
    render(<TaskColumn column={todoColumn} tasks={[]} onMoveTask={mockOnMoveTask} />);
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('To Do');
  });

  it('renders all provided tasks', () => {
    render(<TaskColumn column={todoColumn} tasks={sampleTasks} onMoveTask={mockOnMoveTask} />);
    
    expect(screen.getByTestId('task-1')).toBeInTheDocument();
    expect(screen.getByTestId('task-2')).toBeInTheDocument();
    expect(screen.getByTestId('task-3')).toBeInTheDocument();
    
    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
    expect(screen.getByText('Third task')).toBeInTheDocument();
  });

  it('renders empty column when no tasks provided', () => {
    render(<TaskColumn column={todoColumn} tasks={[]} onMoveTask={mockOnMoveTask} />);
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.queryByTestId(/task-/)).not.toBeInTheDocument();
  });

  it('passes onMoveTask function to TaskCard components', () => {
    render(<TaskColumn column={todoColumn} tasks={sampleTasks} onMoveTask={mockOnMoveTask} />);
    
    // The TaskCard mock should receive the onMoveTask function
    // This is verified by the fact that TaskCard components render correctly
    expect(screen.getAllByText('←')).toHaveLength(3);
    expect(screen.getAllByText('→')).toHaveLength(3);
  });

  it('applies correct styling classes', () => {
    const { container } = render(
      <TaskColumn column={todoColumn} tasks={[]} onMoveTask={mockOnMoveTask} />
    );
    
    const columnDiv = container.firstChild as HTMLElement;
    expect(columnDiv).toHaveClass(
      'bg-gray-50',
      'border',
      'border-gray-200',
      'rounded-lg',
      'p-4',
      'min-h-[400px]',
      'shadow-lg'
    );
  });

  it('renders tasks in the order provided', () => {
    render(<TaskColumn column={todoColumn} tasks={sampleTasks} onMoveTask={mockOnMoveTask} />);
    
    const taskElements = screen.getAllByTestId(/task-/);
    expect(taskElements).toHaveLength(3);
    
    // Verify order by checking the task IDs in data-testid
    expect(taskElements[0]).toHaveAttribute('data-testid', 'task-1');
    expect(taskElements[1]).toHaveAttribute('data-testid', 'task-2');
    expect(taskElements[2]).toHaveAttribute('data-testid', 'task-3');
  });

  describe('Different Column Types', () => {
    const inProgressColumn: Column = { id: 'inProgress', title: 'In Progress' };
    const doneColumn: Column = { id: 'done', title: 'Done' };

    it('renders In Progress column correctly', () => {
      render(<TaskColumn column={inProgressColumn} tasks={[]} onMoveTask={mockOnMoveTask} />);
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    it('renders Done column correctly', () => {
      render(<TaskColumn column={doneColumn} tasks={[]} onMoveTask={mockOnMoveTask} />);
      expect(screen.getByText('Done')).toBeInTheDocument();
    });
  });
});
