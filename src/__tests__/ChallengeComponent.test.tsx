import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ChallengeComponent } from '../ChallengeComponent';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('ChallengeComponent - Integration Tests', () => {
  it('renders all three columns with correct titles', () => {
    render(<ChallengeComponent />);
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('renders the add task form', () => {
    render(<ChallengeComponent />);
    
    expect(screen.getByLabelText('New task description')).toBeInTheDocument();
    expect(screen.getByLabelText('Add new task')).toBeInTheDocument();
  });

  it('adds a new task and displays it in Todo column', async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);
    
    const input = screen.getByLabelText('New task description');
    const addButton = screen.getByLabelText('Add new task');
    
    await user.type(input, 'Integration test task');
    await user.click(addButton);
    
    expect(screen.getByText('Integration test task')).toBeInTheDocument();
  });

  it('completes full workflow: add task and move through all columns', async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);
    
    // Add a task
    const input = screen.getByLabelText('New task description');
    const addButton = screen.getByLabelText('Add new task');
    
    await user.type(input, 'Workflow test task');
    await user.click(addButton);
    
    expect(screen.getByText('Workflow test task')).toBeInTheDocument();
    
    // Move to In Progress
    const rightButtons = screen.getAllByLabelText('Move task to next column');
    await user.click(rightButtons[0]);
    
    // Task should still be visible (now in In Progress column)
    expect(screen.getByText('Workflow test task')).toBeInTheDocument();
    
    // Move to Done
    const rightButtonsAfterMove = screen.getAllByLabelText('Move task to next column');
    await user.click(rightButtonsAfterMove[0]);
    
    // Task should still be visible (now in Done column)
    expect(screen.getByText('Workflow test task')).toBeInTheDocument();
  });

  it('handles multiple tasks correctly', async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);
    
    const input = screen.getByLabelText('New task description');
    const addButton = screen.getByLabelText('Add new task');
    
    // Add multiple tasks
    await user.type(input, 'First task');
    await user.click(addButton);
    
    await user.type(input, 'Second task');
    await user.click(addButton);
    
    await user.type(input, 'Third task');
    await user.click(addButton);
    
    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
    expect(screen.getByText('Third task')).toBeInTheDocument();
  });

  it('maintains correct button states based on task positions', async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);
    
    // Add a task
    const input = screen.getByLabelText('New task description');
    const addButton = screen.getByLabelText('Add new task');
    
    await user.type(input, 'Button state test');
    await user.click(addButton);
    
    // In Todo column - left should be disabled, right enabled
    let leftButtons = screen.getAllByLabelText('Move task to previous column');
    let rightButtons = screen.getAllByLabelText('Move task to next column');
    
    expect(leftButtons[0]).toBeDisabled();
    expect(rightButtons[0]).not.toBeDisabled();
    
    // Move to In Progress
    await user.click(rightButtons[0]);
    
    // In Progress column - both should be enabled
    leftButtons = screen.getAllByLabelText('Move task to previous column');
    rightButtons = screen.getAllByLabelText('Move task to next column');
    
    expect(leftButtons[0]).not.toBeDisabled();
    expect(rightButtons[0]).not.toBeDisabled();
    
    // Move to Done
    await user.click(rightButtons[0]);
    
    // In Done column - left enabled, right disabled
    leftButtons = screen.getAllByLabelText('Move task to previous column');
    rightButtons = screen.getAllByLabelText('Move task to next column');
    
    expect(leftButtons[0]).not.toBeDisabled();
    expect(rightButtons[0]).toBeDisabled();
  });

  it('clears input field after adding task', async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);
    
    const input = screen.getByLabelText('New task description') as HTMLInputElement;
    const addButton = screen.getByLabelText('Add new task');
    
    await user.type(input, 'Clear input test');
    expect(input.value).toBe('Clear input test');
    
    await user.click(addButton);
    expect(input.value).toBe('');
  });

  it('handles form submission via Enter key', async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);
    
    const input = screen.getByLabelText('New task description');
    
    await user.type(input, 'Enter key test');
    await user.keyboard('{Enter}');
    
    expect(screen.getByText('Enter key test')).toBeInTheDocument();
  });

  describe('Edge Cases', () => {
    it('handles empty form submission gracefully', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);
      
      const addButton = screen.getByLabelText('Add new task');
      
      await user.click(addButton);
      
      // Should not add any tasks
      expect(screen.queryByText(/task/i)).not.toBeInTheDocument();
    });

    it('handles rapid task additions', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);
      
      const input = screen.getByLabelText('New task description');
      const addButton = screen.getByLabelText('Add new task');
      
      // Rapidly add multiple tasks
      for (let i = 1; i <= 5; i++) {
        await user.type(input, `Rapid task ${i}`);
        await user.click(addButton);
      }
      
      // All tasks should be present
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(`Rapid task ${i}`)).toBeInTheDocument();
      }
    });
  });
});
