import React from 'react';
import { Direction } from './types';
import { ListColumn } from './ListColumn';
import { AddItemForm } from './AddItemForm';
import { useToDoList } from './useToDoList';
import { defaultWorkflowConfig, getOrderedStatuses } from './workflowConfig';

export function ToDoList() {
  const { itemsByStatus, addItem, moveItem, canMove, config } = useToDoList(defaultWorkflowConfig);
  const orderedStatuses = getOrderedStatuses(config);

  const handleMove = (itemId: string, direction: Direction) => {
    moveItem(itemId, direction);
  };

  const handleAddItem = (text: string) => {
    addItem(text);
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px'
      }}>
        To Do List
      </h1>
      
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {orderedStatuses.map(status => (
          <ListColumn
            key={status.id}
            title={status.title}
            items={itemsByStatus[status.id] || []}
            onMove={handleMove}
            canMove={canMove}
          />
        ))}
      </div>

      <AddItemForm onSubmit={handleAddItem} />
    </div>
  );
}
