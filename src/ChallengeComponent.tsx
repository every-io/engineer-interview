import { TaskColumn } from "./components/TaskColumn";

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    order: 0,
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    order: 1,
  },
  {
    id: 'done',
    title: 'Done',
    order: 2,
  },
]

const mockedTasks = [
  {id: 'task-1', text: 'Mow The lawn', columnId: 'todo'},
  {id: 'task-2', text: 'Pull Weeds', columnId: 'inProgress'},
  {id: 'task-1', text: 'Rake the leaves', columnId: 'done'}
]

export function ChallengeComponent() {

  const getTasksForColumn = (columnId: string) => {
    return mockedTasks.filter(task => task.columnId === columnId)
  }

  return ( 
    <div className="flex justify-around p-8">
      {
        columns.map((column) => (
          <TaskColumn key={column.id} column={column} tasks={getTasksForColumn(column.id)}/>
        ))
      }
    </div>
  );
}
