import { useCallback, useMemo, useState } from "react";
import { Task, Direction, Board, DIRECTION } from "../types";
import { mockedTasks } from "../mocks";

interface UseTaskOptions {
    board: Board | null
}

interface UseTaskReturn {
    tasks: Task[];
    addTask: (text:string) => void;
    moveTask: (taskId:string, direction: Direction) => void;
}



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

    const sortedTasksByUpdatedDate = useMemo(() => {
       return tasks.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    },[ tasks])

    return {
        tasks: sortedTasksByUpdatedDate,
        addTask,
        moveTask,
    }
}