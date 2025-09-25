import { Task as TaskType } from '~/src/utils/types';

import Task from "./Task"

type Props = {
  title: string
  tasks: TaskType[]
}

export default function Column({ title, tasks }: Props) {

  return (
    <div className='p-4 border-2 rounded-lg shadow-lg'>
      <h2 className="text-center text-xl">{title}</h2>

      <ul className='mt-8 flex flex-col gap-2'>
        {tasks.map(task => <Task key={task.id} {...task} />)}
      </ul>
    </div>
  )
}