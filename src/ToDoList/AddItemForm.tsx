import React, { useState } from 'react';

interface AddItemFormProps {
  onSubmit: (text: string) => void;
}

export function AddItemForm({ onSubmit }: AddItemFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '8px',
      marginTop: '20px',
      padding: '16px',
      backgroundColor: '#fff',
      border: '1px solid #dee2e6',
      borderRadius: '8px'
    }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        style={{
          flex: 1,
          padding: '8px 12px',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Add Task
      </button>
    </form>
  );
}