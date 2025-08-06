import React from 'react';
import { Column } from './types';
import { ListItem } from './ListItem';

interface ListColumnProps {
  column: Column;
  onMoveLeft: (itemId: string) => void;
  onMoveRight: (itemId: string) => void;
}

export function ListColumn({ column, onMoveLeft, onMoveRight }: ListColumnProps) {
  return (
    <div style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '16px',
      margin: '0 8px',
      minHeight: '400px'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '16px',
        color: '#495057',
        textTransform: 'capitalize'
      }}>
        {column.title}
      </h3>
      
      <div>
        {column.items.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onMoveLeft={() => onMoveLeft(item.id)}
            onMoveRight={() => onMoveRight(item.id)}
            canMoveLeft={column.status !== 'todo'}
            canMoveRight={column.status !== 'done'}
          />
        ))}
      </div>
    </div>
  );
}