import React, { useState } from 'react';
import styles from './TaskForm.module.css';

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
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="taskTitle" style={{ display: 'none' }}>New Task</label>
            <input
                id="taskTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add Task"
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                +
            </button>
        </form>
    );
}
