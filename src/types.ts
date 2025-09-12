export interface Board {
    id: string;
    name: string;
    columns: Column[]
}

export interface Column {
    id: string;
    title: string;
    order: number;
}

export interface Task {
    id: string;
    text: string;
    columnId: string;
    boardId: string;
}

export type Direction = 'left' | 'right'

export const DIRECTION = {
    LEFT: 'left' as const,
    RIGHT: 'right' as const
} as const;