import { useTasks } from '~/src/hooks'
import { Status } from "~/src/utils/types"

import Column from './Column';
import Input from './Input';

export default function ChallengeComponent() {
  const { tasks } = useTasks();

  return (
    <section className="p-8">
      <Input />

      <div className="grid grid-cols-3 gap-8 mt-4">
        <Column title="To do" tasks={tasks.filter(task => task.status == Status.ToDo)} />

        <Column title="In progress" tasks={tasks.filter(task => task.status == Status.InProgress)} />

        <Column title="Done" tasks={tasks.filter(task => task.status == Status.Done)} />
      </div>
    </section>
  );
}
