import React from 'react';
import { TaskCard } from '../TaskCard/TaskCard';
import type { Task, Column } from '../../types/TaskTypes';
import styles from './TaskColumn.module.css';

interface TaskColumnProps {
	column: Column;
	tasks: Task[];
	onMoveLeft: (taskId: string) => void;
	onMoveRight: (taskId: string) => void;
	isFirstColumn: boolean;
	isLastColumn: boolean;
}

export function TaskColumn({
	column,
	tasks,
	onMoveLeft,
	onMoveRight,
	isFirstColumn,
	isLastColumn,
}: TaskColumnProps) {
	return (
		<div className={styles.taskColumn}>
			<h3>{column.title}</h3>
			{tasks.map((task) => (
				<TaskCard
					key={task.id}
					task={task}
					onMoveLeft={onMoveLeft}
					onMoveRight={onMoveRight}
					isLeftDisabled={isFirstColumn}
					isRightDisabled={isLastColumn}
				/>
			))}
		</div>
	);
}
