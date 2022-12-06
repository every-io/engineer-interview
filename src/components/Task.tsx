import { Card, Button } from "components/UI";

import useTask from "hooks/useTask";

import { ITaskProps } from "types/Task";

import { TaskContainer } from "styles/Task";

const Task = (props: ITaskProps) => {
  const { isFinished, isNew, movePrevious, moveNext } = useTask(props);

  return (
    <Card className={TaskContainer()} corner={"round"}>
      <Button round variant={"danger"} onClick={movePrevious} disabled={isNew}>
        {<span>&#8592;</span>}
      </Button>
      <p>{props.content}</p>
      <Button
        round
        variant={"success"}
        onClick={moveNext}
        disabled={isFinished}
      >
        {<span>&#8594;</span>}
      </Button>
    </Card>
  );
};

export default Task;
