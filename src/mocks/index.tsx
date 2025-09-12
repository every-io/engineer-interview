import { Board } from "../types"

export const mockedTasks = [
  {id: 'task-1', text: 'Mow The lawn', columnId: 'todo', boardId: '1', updatedAt: '2025-01-01T10:00:00Z'},
  {id: 'task-2', text: 'Pull Weeds', columnId: 'inProgress', boardId: '1', updatedAt: '2025-01-01T10:00:00Z'},
  {id: 'task-3', text: 'Rake the leaves', columnId: 'done', boardId: '1', updatedAt: '2025-01-01T10:00:00Z'}
]

export const mockedBoard: Board = {
  id: '1',
  name: 'interview',
  columns: [
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
}