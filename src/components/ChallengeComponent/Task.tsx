import { useTasks } from "~/src/hooks"
import { updateTask } from '~/src/store/tasks'
import { Status } from "~/src/utils/types"

type Props = {
  id: string
  title: string
  status: Status
}

export default function Task({ id, title, status }: Props) {
  const { dispatch } = useTasks();

  const handleBack = () => dispatch(updateTask({ id, title, status: status - 1 }));
  const handleForward = () => dispatch(updateTask({ id, title, status: status + 1 }));

  return (
    <li className="w-full flex justify-between content-center gap-4 shadow-md p-4 rounded-md">
      <button className="rounded-lg py-4 px-2 bg-red-500 disabled:bg-red-200 text-2xl" disabled={status === Status.ToDo} onClick={handleBack}>←</button>

      <span className="text-lg">
        {title}
      </span>

      <button className="rounded-lg py-4 px-2 bg-green-500 disabled:bg-green-200 text-2xl" disabled={status === Status.Done} onClick={handleForward}>→</button>
    </li>
  )
}