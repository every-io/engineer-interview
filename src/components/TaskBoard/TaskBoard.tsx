import React, { useState, useCallback } from 'react';
import { TaskColumn } from '../TaskColumns/TaskColumn';
import { TaskForm } from '../TaskForm/TaskForm';
import type { Task, Column } from '../../types/TaskTypes';
import styles from './TaskBoard.module.css';

const columnsData: Column[] = [
	{ id: 'todo', title: 'Todo' },
	{ id: 'inProgress', title: 'In Progress' },
	{ id: 'done', title: 'Done' },
];

export function TaskBoard() {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: '1', title: 'Mow the lawn', status: 'todo' },
		{ id: '2', title: 'Pull weeds', status: 'inProgress' },
		{ id: '3', title: 'Rake the leaves', status: 'done' },
	]);

	const handleMoveLeft = useCallback((taskId: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				if (task.id === taskId) {
					const currentIndex = columnsData.findIndex((col) => col.id === task.status);
					if (currentIndex > 0) {
						const newColumnId = columnsData[currentIndex - 1].id;
						return { ...task, status: newColumnId };
					}
				}
				return task;
			})
		);
	}, []);

	const handleMoveRight = useCallback((taskId: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				if (task.id === taskId) {
					const currentIndex = columnsData.findIndex((col) => col.id === task.status);
					if (currentIndex < columnsData.length - 1) {
						const newColumnId = columnsData[currentIndex + 1].id;
						return { ...task, status: newColumnId };
					}
				}
				return task;
			})
		);
	}, []);

	const handleAddTask = useCallback((newTitle: string) => {
		const firstColumnId = columnsData[0]?.id ?? '';
		setTasks((prevTasks) => [
			...prevTasks,
			{
				id: String(Date.now()),
				title: newTitle,
				status: firstColumnId,
			},
		]);
	}, []);

	return (
		<div className={styles.taskBoard}>
			<div className={styles.taskBoardContent}>
				{columnsData.map((column, index) => (
					<TaskColumn
						key={column.id}
						column={column}
						tasks={tasks.filter((task) => task.status === column.id)}
						onMoveLeft={handleMoveLeft}
						onMoveRight={handleMoveRight}
						isFirstColumn={index === 0}
						isLastColumn={index === columnsData.length - 1}
					/>
				))}
			</div>
			<TaskForm onAddTask={handleAddTask} />
		</div>
	);
}
