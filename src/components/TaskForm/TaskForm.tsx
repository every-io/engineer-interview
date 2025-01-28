import React, { useState } from 'react';

interface TaskFormProps {
	onAddTask: (title: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
	const [title, setTitle] = useState('');

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (title.trim()) {
			onAddTask(title);
			setTitle('');
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="taskTitle" style={{ display: 'none' }}>New Task</label>
			<input
				id="taskTitle"
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Enter a new task"
			/>
			<button type="submit">Add Task</button>
		</form>
	);
}
