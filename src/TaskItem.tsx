    import React from 'react';
    import styled from 'styled-components';

    interface TaskItemProps {
        task: string;
        colId: number;
    }

    export function TaskItem({ task, colId }: TaskItemProps) {
    return (
        <TaskContainer>
            <NavButton color={'red'} disabled={colId === 0}>&#8592;</NavButton>
            <p>{task}</p>
            <NavButton color={'green'} disabled={colId === 2}>&#8594;</NavButton>
        </TaskContainer>
    );
    }

    const TaskContainer = styled.div`
    width: 100%;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    margin: 4px 0;
    `;

    const NavButton = styled.button<{color: string, disabled: boolean}>`
        background-color: ${props => props.color};
        opacity: ${props => props.disabled ? 0.4 : 1};
        color: white;
        border: none;
        border-radius: 10px;
        padding: 3px 8px;
        height: 30px;
    `