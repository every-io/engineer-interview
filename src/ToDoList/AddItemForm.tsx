import React, { useState } from 'react';
import { Button, Card } from '../ui';

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
    <Card style={{ marginTop: '20px' }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: '8px',
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
        <Button
          type="submit"
          disabled={!text}
          size="md"
        >
          Add Task
        </Button>
      </form>
    </Card>
  );
}
