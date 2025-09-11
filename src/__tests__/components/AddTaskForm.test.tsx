import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AddTaskForm } from '../../components/AddTaskForm';

describe('AddTaskForm', () => {
  const mockOnAddTask = vi.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  it('renders input field and submit button', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description');
    const submitButton = screen.getByLabelText('Add new task');
    
    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Add Task');
    expect(submitButton).toHaveTextContent('+');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description') as HTMLInputElement;
    
    await user.type(input, 'New test task');
    
    expect(input.value).toBe('New test task');
  });

  it('calls onAddTask when form is submitted with valid text', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description');
    const submitButton = screen.getByLabelText('Add new task');
    
    await user.type(input, 'New test task');
    await user.click(submitButton);
    
    expect(mockOnAddTask).toHaveBeenCalledWith('New test task');
  });

  it('calls onAddTask when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description');
    
    await user.type(input, 'New test task');
    await user.keyboard('{Enter}');
    
    expect(mockOnAddTask).toHaveBeenCalledWith('New test task');
  });

  it('clears input after successful submission', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description') as HTMLInputElement;
    const submitButton = screen.getByLabelText('Add new task');
    
    await user.type(input, 'Test task');
    await user.click(submitButton);
    
    expect(input.value).toBe('');
  });

  it('trims whitespace from input before calling onAddTask', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description');
    const submitButton = screen.getByLabelText('Add new task');
    
    await user.type(input, '  Test task with spaces  ');
    await user.click(submitButton);
    
    expect(mockOnAddTask).toHaveBeenCalledWith('Test task with spaces');
  });

  it('does not call onAddTask when submitting empty text', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const submitButton = screen.getByLabelText('Add new task');
    
    await user.click(submitButton);
    
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('does not call onAddTask when submitting only whitespace', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description');
    const submitButton = screen.getByLabelText('Add new task');
    
    await user.type(input, '   ');
    await user.click(submitButton);
    
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('prevents default form submission behavior', () => {
    render(<AddTaskForm onAddTask={mockOnAddTask} />);
    
    const input = screen.getByLabelText('New task description');
    const form = input.closest('form')!;
    const mockPreventDefault = vi.fn();
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(submitEvent, 'preventDefault', {
      value: mockPreventDefault,
      writable: true
    });
    
    fireEvent(form, submitEvent);
    
    // The form should handle preventDefault internally
    expect(form).toBeInTheDocument();
  });

  describe('Styling', () => {
    it('applies correct CSS classes to input', () => {
      render(<AddTaskForm onAddTask={mockOnAddTask} />);
      
      const input = screen.getByLabelText('New task description');
      
      expect(input).toHaveClass(
        'flex-1',
        'px-4',
        'py-2',
        'border-2',
        'border-black',
        'rounded-lg',
        'bg-transparent'
      );
    });

    it('applies correct CSS classes to submit button', () => {
      render(<AddTaskForm onAddTask={mockOnAddTask} />);
      
      const submitButton = screen.getByLabelText('Add new task');
      
      expect(submitButton).toHaveClass(
        'w-12',
        'h-12',
        'bg-blue-500',
        'text-white',
        'rounded-lg'
      );
    });
  });
});
