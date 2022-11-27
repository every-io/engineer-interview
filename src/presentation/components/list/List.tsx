import { TaskData } from "../../../domain/models";

import { TaskCard } from "../task-card/TaskCard";

import styles from "./ListStyles.module.css";

type Props = {
  name: string;
  items: Array<TaskData>;
  onChangeStatus: (task: TaskData) => void;
};

export const List = ({ items, name, onChangeStatus }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{name}</span>
      {items.map((item) => (
        <TaskCard key={item.id} data={item} onChangeStatus={onChangeStatus} />
      ))}
    </div>
  );
};
