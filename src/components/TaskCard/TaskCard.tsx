import React from 'react';
import type { Task } from '../../types/TaskTypes';

interface TaskCardProps {
	task: Task;
	onMoveLeft: (taskId: string) => void;
	onMoveRight: (taskId: string) => void;
}

export function TaskCard({ task, onMoveLeft, onMoveRight }: TaskCardProps) {
	const { id, title, status } = task;

	return (
		<div>
			<p>{title}</p>
			<p>{status}</p>
			<button onClick={() => onMoveLeft(id)} disabled={status === 'Todo'}>
				←
			</button>
			<button onClick={() => onMoveRight(id)} disabled={status === 'Done'}>
				→
			</button>
		</div>
	);
}
