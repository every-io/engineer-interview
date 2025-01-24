import React from 'react';

interface TaskColumnProps {
	title: string;
}

export function TaskColumn({ title }: TaskColumnProps) {
	return (
		<div>
			<h3>{title}</h3>
		</div>
	);
}
