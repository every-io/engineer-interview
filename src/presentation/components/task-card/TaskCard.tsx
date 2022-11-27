import { TaskData } from "../../../domain/models";
import { Arrow } from "../arrow/Arrow";

import styles from "./TaskCard.module.css";

type Props = {
  data: TaskData;
  onChangeStatus: (task: TaskData) => void;
};

export const TaskCard = ({ data, onChangeStatus }: Props) => {
  const buttonClasses = `${styles.button} ${styles.advance}`;

  const handleAdvance = () => {
    if (data.status === "todo")
      return onChangeStatus({ ...data, status: "progress" });

    return onChangeStatus({ ...data, status: "done" });
  };

  const handleReturn = () => {
    if (data.status === "done")
      return onChangeStatus({ ...data, status: "progress" });

    return onChangeStatus({ ...data, status: "todo" });
  };

  const progressDisabled = data.status === "done";
  const returnDisabled = data.status === "todo";

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={handleReturn}
        disabled={returnDisabled}
      >
        <Arrow />
      </button>
      {data.name}
      <button
        className={buttonClasses}
        onClick={handleAdvance}
        disabled={progressDisabled}
      >
        <Arrow />
      </button>
    </div>
  );
};
