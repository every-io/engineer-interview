export interface Column {
    id: string;
    title: string;
    order: number;
}

export interface Task {
    id: string;
    text: string;
    columnId: string;
}