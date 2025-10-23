import React from 'react';
import styled from 'styled-components';

interface TaskItemProps {
  task: string;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <TaskContainer>
        <NavButton color={'red'}>&#8592;</NavButton>
        <p>{task}</p>
        <NavButton color={'green'}>&#8594;</NavButton>
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

const NavButton = styled.button<{color: string}>`
  background-color: ${props => props.color};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 3px 8px;
  height: 30px;
`