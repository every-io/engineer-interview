export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum Direction {
  PREV = 'prev',
  NEXT = 'next',
}

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

export type ItemsByStatus = Record<TodoStatus, Item[]>;
export type TransitionMap = Record<TodoStatus, Record<Direction, TodoStatus>>;
