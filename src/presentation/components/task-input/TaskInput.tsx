import { useState } from "react";
import styles from "./TaskInputStyles.module.css";

type Props = {
  onClick: (name: string) => void;
};

export const TaskInput = ({ onClick }: Props) => {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleClick = () => {
    onClick(name);
    setName("");
  };
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Add Task"
        value={name}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={handleClick}>
        +
      </button>
    </div>
  );
};
