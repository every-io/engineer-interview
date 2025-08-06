import React from 'react';
import { Item } from './types';

interface ListItemProps {
  item: Item;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

export function ListItem({ item, onMoveLeft, onMoveRight, canMoveLeft, canMoveRight }: ListItemProps) {
  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '12px',
      margin: '8px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <button
        onClick={onMoveLeft}
        disabled={!canMoveLeft}
        style={{
          background: canMoveLeft ? 'red' : 'lightcoral',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: canMoveLeft ? 'pointer' : 'not-allowed',
          fontSize: '12px'
        }}
      >
        ←
      </button>
      
      <span style={{
        flex: 1,
        textAlign: 'center',
        padding: '0 12px'
      }}>
        {item.text}
      </span>
      
      <button
        onClick={onMoveRight}
        disabled={!canMoveRight}
        style={{
          background: canMoveRight ? 'green' : 'lightgreen',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: canMoveRight ? 'pointer' : 'not-allowed',
          fontSize: '12px'
        }}
      >
        →
      </button>
    </div>
  );
}
