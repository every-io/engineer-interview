import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTasks } from '../../components/useTasks';

describe('useTasks', () => {
  it('initializes with empty tasks array', () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.getTasksByStatus('todo')).toEqual([]);
    expect(result.current.getTasksByStatus('inProgress')).toEqual([]);
    expect(result.current.getTasksByStatus('done')).toEqual([]);
  });

  describe('addTask', () => {
    it('adds a new task to todo column', () => {
      const { result } = renderHook(() => useTasks());
      
      act(() => {
        result.current.addTask('Test task');
      });
      
      const todoTasks = result.current.getTasksByStatus('todo');
      expect(todoTasks).toHaveLength(1);
      expect(todoTasks[0].text).toBe('Test task');
      expect(todoTasks[0].status).toBe('todo');
      expect(todoTasks[0].id).toBeTypeOf('number');
    });

    it('trims whitespace from task text', () => {
      const { result } = renderHook(() => useTasks());
      
      act(() => {
        result.current.addTask('  Test task with spaces  ');
      });
      
      const todoTasks = result.current.getTasksByStatus('todo');
      expect(todoTasks[0].text).toBe('Test task with spaces');
    });

    it('does not add task when text is empty', () => {
      const { result } = renderHook(() => useTasks());
      
      act(() => {
        result.current.addTask('');
      });
      
      expect(result.current.getTasksByStatus('todo')).toHaveLength(0);
    });

    it('does not add task when text is only whitespace', () => {
      const { result } = renderHook(() => useTasks());
      
      act(() => {
        result.current.addTask('   ');
      });
      
      expect(result.current.getTasksByStatus('todo')).toHaveLength(0);
    });

    it('generates unique IDs for multiple tasks', async () => {
      const { result } = renderHook(() => useTasks());
      
      act(() => {
        result.current.addTask('First task');
      });
      
      // Small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 1));
      
      act(() => {
        result.current.addTask('Second task');
      });
      
      const todoTasks = result.current.getTasksByStatus('todo');
      expect(todoTasks).toHaveLength(2);
      expect(todoTasks[0].id).not.toBe(todoTasks[1].id);
    });
  });

  describe('moveTask', () => {
    it('moves task from todo to inProgress', () => {
      const { result } = renderHook(() => useTasks());
      
      // Add a task first
      act(() => {
        result.current.addTask('Test task');
      });
      
      const taskId = result.current.getTasksByStatus('todo')[0].id;
      
      // Move task right
      act(() => {
        result.current.moveTask(taskId, 'right');
      });
      
      expect(result.current.getTasksByStatus('todo')).toHaveLength(0);
      expect(result.current.getTasksByStatus('inProgress')).toHaveLength(1);
      expect(result.current.getTasksByStatus('inProgress')[0].text).toBe('Test task');
    });

    it('moves task from inProgress to done', () => {
      const { result } = renderHook(() => useTasks());
      
      // Add and move task to inProgress first
      act(() => {
        result.current.addTask('Test task');
      });
      
      const taskId = result.current.getTasksByStatus('todo')[0].id;
      
      act(() => {
        result.current.moveTask(taskId, 'right');
      });
      
      // Now move to done
      act(() => {
        result.current.moveTask(taskId, 'right');
      });
      
      expect(result.current.getTasksByStatus('inProgress')).toHaveLength(0);
      expect(result.current.getTasksByStatus('done')).toHaveLength(1);
    });

    it('moves task from done to inProgress', () => {
      const { result } = renderHook(() => useTasks());
      
      // Add and move task to done first
      act(() => {
        result.current.addTask('Test task');
      });
      
      const taskId = result.current.getTasksByStatus('todo')[0].id;
      
      act(() => {
        result.current.moveTask(taskId, 'right');
        result.current.moveTask(taskId, 'right');
      });
      
      // Now move back left
      act(() => {
        result.current.moveTask(taskId, 'left');
      });
      
      expect(result.current.getTasksByStatus('done')).toHaveLength(0);
      expect(result.current.getTasksByStatus('inProgress')).toHaveLength(1);
    });

    it('does not move task when already at leftmost column', () => {
      const { result } = renderHook(() => useTasks());
      
      act(() => {
        result.current.addTask('Test task');
      });
      
      const taskId = result.current.getTasksByStatus('todo')[0].id;
      
      // Try to move left from todo (should not move)
      act(() => {
        result.current.moveTask(taskId, 'left');
      });
      
      expect(result.current.getTasksByStatus('todo')).toHaveLength(1);
    });

    it('does not move task when already at rightmost column', () => {
      const { result } = renderHook(() => useTasks());
      
      // Add and move task to done
      act(() => {
        result.current.addTask('Test task');
      });
      
      const taskId = result.current.getTasksByStatus('todo')[0].id;
      
      act(() => {
        result.current.moveTask(taskId, 'right');
        result.current.moveTask(taskId, 'right');
      });
      
      // Try to move right from done (should not move)
      act(() => {
        result.current.moveTask(taskId, 'right');
      });
      
      expect(result.current.getTasksByStatus('done')).toHaveLength(1);
    });

    it('moves task to end of destination column', () => {
      const { result } = renderHook(() => useTasks());
      
      // Add a task and verify it's in todo
      act(() => {
        result.current.addTask('Test task');
      });
      
      expect(result.current.getTasksByStatus('todo')).toHaveLength(1);
      
      const taskId = result.current.getTasksByStatus('todo')[0].id;
      
      // Move task to inProgress
      act(() => {
        result.current.moveTask(taskId, 'right');
      });
      
      // Verify task moved correctly
      expect(result.current.getTasksByStatus('todo')).toHaveLength(0);
      expect(result.current.getTasksByStatus('inProgress')).toHaveLength(1);
      expect(result.current.getTasksByStatus('inProgress')[0].text).toBe('Test task');
    });

    it('handles non-existent task ID gracefully', () => {
      const { result } = renderHook(() => useTasks());
      
      act(() => {
        result.current.addTask('Test task');
      });
      
      const originalTasks = result.current.getTasksByStatus('todo');
      
      // Try to move non-existent task
      act(() => {
        result.current.moveTask(999999, 'right');
      });
      
      // Tasks should remain unchanged
      expect(result.current.getTasksByStatus('todo')).toEqual(originalTasks);
    });
  });

  describe('getTasksByStatus', () => {
    it('returns empty array when no tasks exist for status', () => {
      const { result } = renderHook(() => useTasks());
      
      expect(result.current.getTasksByStatus('todo')).toEqual([]);
      expect(result.current.getTasksByStatus('inProgress')).toEqual([]);
      expect(result.current.getTasksByStatus('done')).toEqual([]);
    });

    it('filters tasks correctly by status', () => {
      const { result } = renderHook(() => useTasks());
      
      // Add tasks to todo column
      act(() => {
        result.current.addTask('First task');
        result.current.addTask('Second task');
      });
      
      // Verify both tasks are in todo
      const todoTasks = result.current.getTasksByStatus('todo');
      expect(todoTasks).toHaveLength(2);
      expect(todoTasks[0].text).toBe('First task');
      expect(todoTasks[1].text).toBe('Second task');
      
      // Verify other columns are empty
      expect(result.current.getTasksByStatus('inProgress')).toHaveLength(0);
      expect(result.current.getTasksByStatus('done')).toHaveLength(0);
    });
  });
});
