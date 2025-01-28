export interface Task {
	id: string; // string for now, but could be a UUID
	title: string;
	status: string;
}

export interface Column {
	id: string;  // string for now, but could be a UUID
	title: string;
}

export interface Board {
	tasks: Task[];
}
