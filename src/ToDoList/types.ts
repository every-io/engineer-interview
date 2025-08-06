export type TodoStatus = 'todo' | 'in-progress' | 'done';

export interface Item {
  id: string;
  text: string;
  status: TodoStatus;
}

export interface Column {
  status: TodoStatus;
  title: string;
  items: Item[];
}