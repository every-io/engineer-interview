import { ITaskProps } from "types/Task";

const useTask = ({
  id,
  content,
  column,
  lastPossibleColumn,
  updateTask,
}: ITaskProps) => {
  const isNew = column === 0;

  const isFinished = column === lastPossibleColumn - 1;

  const movePrevious = () => {
    if (!isNew) updateTask({ id, content, column: --column });
  };

  const moveNext = () => {
    if (!isFinished) updateTask({ id, content, column: ++column });
  };

  return { isFinished, isNew, movePrevious, moveNext };
};

export default useTask;
