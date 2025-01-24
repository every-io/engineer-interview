import React from 'react';
import { TaskColumn } from '../TaskColumns/TaskColumn';

export function TaskBoard() {
	return (
		<div>
			<div style={{ display: 'flex', gap: '16px' }}>
				<TaskColumn title="Todo" />
				<TaskColumn title="In Progress" />
				<TaskColumn title="Done" />
			</div>
		</div>
	);
}
