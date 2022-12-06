import { useRef } from "react";

import { Button } from "components/UI";

import { AddTaskContainer } from "styles/AddTask";

const AddTask = ({ onAdd = (value: string) => {} }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      onAdd(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div className={AddTaskContainer()}>
      <input placeholder="Add Task" type="text" ref={inputRef} />
      <Button round onClick={add}>
        +
      </Button>
    </div>
  );
};

export default AddTask;
