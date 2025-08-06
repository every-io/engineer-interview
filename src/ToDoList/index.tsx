import React from 'react';
import { Column, TodoStatus, Direction } from './types';
import { ListColumn } from './ListColumn';
import { AddItemForm } from './AddItemForm';
import { useToDoList } from './useToDoList';

export function ToDoList() {
  const { getItemsByStatus, addTodo, moveItem } = useToDoList();

  const toDoColumn: Column = {
    status: TodoStatus.TODO,
    title: 'Todo',
    items: getItemsByStatus(TodoStatus.TODO)
  };

  const inProgressColumn: Column = {
    status: TodoStatus.IN_PROGRESS,
    title: 'In Progress',
    items: getItemsByStatus(TodoStatus.IN_PROGRESS)
  };

  const doneColumn: Column = {
    status: TodoStatus.DONE,
    title: 'Done',
    items: getItemsByStatus(TodoStatus.DONE)
  };

  const handleMoveLeft = (itemId: string) => {
    moveItem(itemId, Direction.LEFT);
  };

  const handleMoveRight = (itemId: string) => {
    moveItem(itemId, Direction.RIGHT);
  };

  const handleAddTodo = (text: string) => {
    addTodo(text);
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
