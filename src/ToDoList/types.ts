export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right'
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
