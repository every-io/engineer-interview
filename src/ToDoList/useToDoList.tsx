import { useState } from 'react';
import { Item, TodoStatus, Direction, ItemsByStatus } from './types';
import {
  WorkflowConfig,
  buildTransitionMap,
  getInitialStatus,
} from './workflowConfig';

function createInitialItemsByStatus(config: WorkflowConfig): ItemsByStatus {
  const itemsByStatus = {} as ItemsByStatus;

  config.statuses.forEach(status => {
    itemsByStatus[status.id] = [];
  });

  // Add some sample data
  itemsByStatus[TodoStatus.TODO] = [
    { id: '1', text: 'Learn React', status: TodoStatus.TODO },
    { id: '2', text: 'Build todo app', status: TodoStatus.TODO },
  ];
  itemsByStatus[TodoStatus.IN_PROGRESS] = [
    { id: '3', text: 'Write tests', status: TodoStatus.IN_PROGRESS },
  ];
  itemsByStatus[TodoStatus.DONE] = [
    { id: '4', text: 'Deploy application', status: TodoStatus.DONE },
  ];

  return itemsByStatus;
}

export function useToDoList(config: WorkflowConfig) {
  const [itemsByStatus, setItemsByStatus] = useState<ItemsByStatus>(() =>
    createInitialItemsByStatus(config)
  );

  const transitionMap = buildTransitionMap(config.transitions);
  const initialStatus = getInitialStatus(config);

  const addItem = (text: string) => {
    if (text.trim()) {
      const newItem: Item = {
        id: Date.now().toString(),
        text: text.trim(),
        status: initialStatus,
      };
      setItemsByStatus(prev => ({
        ...prev,
        [initialStatus]: [...prev[initialStatus], newItem],
      }));
    }
  };

  const moveItem = (itemId: string, direction: Direction) => {
    setItemsByStatus(prev => {
      const currentItem = Object.values(prev)
        .flat()
        .find(item => item.id === itemId);

      if (!currentItem) return prev;

      const currentStatus = currentItem.status;
      const newStatus = transitionMap[currentStatus]?.[direction];

      if (!newStatus || currentStatus === newStatus) return prev;

      const updatedItem = { ...currentItem, status: newStatus };

      return {
        ...prev,
        [currentStatus]: prev[currentStatus].filter(item => item.id !== itemId),
        [newStatus]: [...prev[newStatus], updatedItem],
      };
    });
  };

  const canMove = (itemStatus: TodoStatus, direction: Direction): boolean => {
    const targetStatus = transitionMap[itemStatus]?.[direction];
    return targetStatus !== undefined && targetStatus !== itemStatus;
  };

  return {
    itemsByStatus,
    addItem,
    moveItem,
    canMove,
    config,
  };
}
