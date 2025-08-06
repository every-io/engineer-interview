import React from 'react';
import { Column, Item } from './types';
import { ListColumn } from './ListColumn';
import { AddItemForm } from './AddItemForm';

const dummyTodos: Item[] = [
  { id: '1', text: 'Learn React', status: 'todo' },
  { id: '2', text: 'Build todo app', status: 'todo' },
  { id: '3', text: 'Write tests', status: 'in-progress' },
  { id: '4', text: 'Deploy application', status: 'done' },
];

export function ToDoList() {
  const toDoColumn: Column = {
    status: 'todo',
    title: 'Todo',
    items: dummyTodos.filter(item => item.status === 'todo')
  };

  const inProgressColumn: Column = {
    status: 'in-progress',
    title: 'In Progress',
    items: dummyTodos.filter(item => item.status === 'in-progress')
  };

  const doneColumn: Column = {
    status: 'done',
    title: 'Done',
    items: dummyTodos.filter(item => item.status === 'done')
  };

  const handleMoveLeft = (itemId: string) => {
    console.log('Move left:', itemId);
  };

  const handleMoveRight = (itemId: string) => {
    console.log('Move right:', itemId);
  };

  const handleAddTodo = (text: string) => {
    console.log('Add todo:', text);
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
        <ListColumn
          column={toDoColumn}
          onMoveLeft={handleMoveLeft}
          onMoveRight={handleMoveRight}
        />
        <ListColumn
          column={inProgressColumn}
          onMoveLeft={handleMoveLeft}
          onMoveRight={handleMoveRight}
        />
        <ListColumn
          column={doneColumn}
          onMoveLeft={handleMoveLeft}
          onMoveRight={handleMoveRight}
        />
      </div>

      <AddItemForm onSubmit={handleAddTodo} />
    </div>
  );
}