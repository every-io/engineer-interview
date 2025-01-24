export interface Task {
	id: string;
	title: string;
	status: 'Todo' | 'In Progress' | 'Done';
}

export interface Board {
	tasks: Task[];
}
