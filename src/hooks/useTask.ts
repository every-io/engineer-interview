import { useCallback, useState } from "react";
import { Task, Direction, Board, DIRECTION } from "../types";

interface UseTaskOptions {
    board: Board | null
}

interface UseTaskReturn {
    tasks: Task[];
    addTask: (text:string) => void;
    moveTask: (taskId:string, direction: Direction) => void;
}

const mockedTasks = [
  {id: 'task-1', text: 'Mow The lawn', columnId: 'todo', boardId: '1', updatedAt: '2025-01-01T10:00:00Z'},
  {id: 'task-2', text: 'Pull Weeds', columnId: 'inProgress', boardId: '1', updatedAt: '2025-01-01T10:00:00Z'},
  {id: 'task-3', text: 'Rake the leaves', columnId: 'done', boardId: '1', updatedAt: '2025-01-01T10:00:00Z'}
]

export const useTasks = ({ board }: UseTaskOptions): UseTaskReturn => {
    const [tasks, setTasks] = useState<Task[]>(mockedTasks)

    const addTask = useCallback((text: string) => {
        if(!board) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            text,
            columnId: 'todo',
            boardId: board.id,
            updatedAt: new Date().toISOString()
        }

        setTasks(prevTasks => [...prevTasks, newTask])
    },[])

    const moveTask = useCallback((taskId: string, direction: Direction) => {
        if(!board) return;

        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if(task.id === taskId){
                    const currentColumn = board.columns.find(col => col.id === task.columnId)
                    let targetColumn;

                    if(!currentColumn) return task

                    if(direction === DIRECTION.RIGHT) {
                        targetColumn = board.columns.find(col => col.order === currentColumn.order + 1)
                    }
                    if(direction === DIRECTION.LEFT) {
                        targetColumn = board.columns.find(col => col.order === currentColumn.order - 1)
                    }

                    if(!targetColumn) return task;

                    return {
                        ...task,
                        columnId: targetColumn.id,
                        updatedAt: new Date().toISOString()
                    }
                }
                return task;
            })
        })
    },[board])

    const sortedTasksByUpdatedDate = tasks.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

    return {
        tasks: sortedTasksByUpdatedDate,
        addTask,
        moveTask
    }
}