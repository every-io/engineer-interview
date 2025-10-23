import React from 'react';
import styled from 'styled-components';

import {TaskItem} from './TaskItem'

export function ChallengeComponent() {
  const columnInitialData = [
    {id: 0, title: "To Do", items: []},
    {id: 1, title: "In Progress", items: []},
    {id: 2, title: "Done", items: []},
  ];

  const [columns, setColumns] = React.useState(columnInitialData)
  const [newTask, setNewTask] = React.useState<string>("");
  
  const addNewTask = () => {
    const updatedColumns = [...columns];
    updatedColumns[0].items.push(newTask)
    setColumns(updatedColumns);
    setNewTask("");
  }

  return (
    <Container>
      <ColumnContainer>
        {columns.map((column) => (
          <Column key={column.id}>
            <h2>{column.title}</h2>
            {column.items.map((item) => (
              <TaskItem task={item} colId={column.id}/>
            ))}
          </Column>
        ))}
      </ColumnContainer>

      <Input type="text" placeholder="Add Task" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
      <AddButton onClick={addNewTask}>+</AddButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 30px;
` 

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Column = styled.div`
  border: 1px solid grey;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  min-height: 300px;
  width: 30%;
  padding: 25px;
  justify-items: center;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid black;
  background-color: transparent;
  margin-top: 25px;
`;

const AddButton = styled.button`
  background: blue;
  color: white;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  margin-left: 20px;
`