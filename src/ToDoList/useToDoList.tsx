import { useState } from 'react';
import { Item, TodoStatus, Direction } from './types';

const initialItems: Item[] = [
  { id: '1', text: 'Learn React', status: TodoStatus.TODO },
  { id: '2', text: 'Build todo app', status: TodoStatus.TODO },
  { id: '3', text: 'Write tests', status: TodoStatus.IN_PROGRESS },
  { id: '4', text: 'Deploy application', status: TodoStatus.DONE },
];

const statusTransitions = {
  [TodoStatus.TODO]: {
    [Direction.RIGHT]: TodoStatus.IN_PROGRESS,
    [Direction.LEFT]: TodoStatus.TODO, // No change
  },
  [TodoStatus.IN_PROGRESS]: {
    [Direction.RIGHT]: TodoStatus.DONE,
    [Direction.LEFT]: TodoStatus.TODO,
  },
  [TodoStatus.DONE]: {
    [Direction.RIGHT]: TodoStatus.DONE, // No change
    [Direction.LEFT]: TodoStatus.IN_PROGRESS,
  },
};

export function useToDoList() {
  const [items, setItems] = useState<Item[]>(initialItems);

  const getItemsByStatus = (status: TodoStatus): Item[] => {
    return items.filter(item => item.status === status);
  };

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newItem: Item = {
        id: Date.now().toString(),
        text: text.trim(),
        status: TodoStatus.TODO
      };
      setItems(prevItems => [...prevItems, newItem]);
    }
  };

  const moveItem = (itemId: string, direction: Direction) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId) {
          const newStatus = statusTransitions[item.status][direction];
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  return {
    items,
    getItemsByStatus,
    addTodo,
    moveItem,
  };
}
