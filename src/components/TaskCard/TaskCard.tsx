import React from 'react';
import type { Task } from '../../types/TaskTypes';
import styles from './TaskCard.module.css';

interface TaskCardProps {
	task: Task;
	onMoveLeft: (taskId: string) => void;
	onMoveRight: (taskId: string) => void;
	isLeftDisabled: boolean;
	isRightDisabled: boolean;
}

export function TaskCard({
	task,
	onMoveLeft,
	onMoveRight,
	isLeftDisabled,
	isRightDisabled,
}: TaskCardProps) {
	const { id, title } = task;

	return (
		<div className={styles.taskCard}>
			<button
				onClick={() => onMoveLeft(id)}
				disabled={isLeftDisabled}
				aria-label="Move Task Left"
			>
				⬅
			</button>

			<p className={styles.taskTitle}>{title}</p>

			<button
				onClick={() => onMoveRight(id)}
				disabled={isRightDisabled}
				aria-label="Move Task Right"
			>
				⮕
			</button>
		</div>
	);
}
