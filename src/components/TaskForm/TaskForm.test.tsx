import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { TaskForm } from './index';
import { act } from 'react';

describe('TaskForm', () => {
  const mockOnAddTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    expect(screen.getByRole('textbox', {
        name: /new task text/i
    })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('clears input after successful submission', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByRole('textbox', {
        name: /new task text/i
    }) as HTMLInputElement;
    
    await act(async () => {
        await user.type(input, 'New task');
        await user.click(screen.getByRole('button'));
    })

    expect(input.value).toBe('');
  });

  test('does not submit empty or whitespace only tasks', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByRole('textbox', {
        name: /new task text/i
    }) as HTMLInputElement;
    const button = screen.getByRole('button');

    await act(async () => {
        await user.click(button);
    })

    expect(mockOnAddTask).not.toHaveBeenCalled();

    await act(async () => {
        await user.type(input, '   ');
        await user.click(button);
    })

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  test('submits form on Enter key press', async () => {
    const user = userEvent.setup();
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByRole('textbox', {
        name: /new task text/i
    }) as HTMLInputElement;

    await act(async () => {
        await user.type(input, 'Task from enter{enter}');
    })
    
    expect(mockOnAddTask).toHaveBeenCalledWith('Task from enter');
  });
});