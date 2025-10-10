import { useEffect, useState } from "react";
import { TaskColumn } from "./components/TaskColumn";
import { Task, TaskStatus } from "./types";
import { taskService } from "./services/taskService";
import { filterByStatus } from "./helpers/tasks";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { COLUMN_LABELS, TASK_STATUS_IDS } from "./utils/constants";

export function ChallengeComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      // Seed a list of tasks if the task list is empty for demo purposes.
      let allTasks = await taskService.fetchAll();
      if (allTasks.length === 0) {
        allTasks = await taskService.seed();
      }
      setTasks(allTasks);
    })();
  }, []);

  const moveTask = async (id: string, direction: "previous" | "next") => {
    const order: TaskStatus[] = ["todo", "inProgress", "done"];
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    let taskStatusIndex = order.indexOf(task.status);
    if (direction === "previous")
      taskStatusIndex = Math.max(0, taskStatusIndex - 1);
    if (direction === "next")
      taskStatusIndex = Math.min(order.length - 1, taskStatusIndex + 1);

    const updated = await taskService.update(id, {
      status: order[taskStatusIndex],
    });

    if (updated) {
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    }
  };

  const handleCreate = async (task: Omit<Task, "id">) => {
    const newTask = await taskService.create(task);
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDelete = async (id: string) => {
    await taskService.delete(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleClear = async () => {
    await taskService.clear();
    setTasks([]);
  };

  const handleSeed = async () => {
    const seeded = await taskService.seed();
    setTasks(seeded);
  };

  return (
    <div className="flex flex-col gap-6 m-6">
      <div className="flex flex-col md:flex-row gap-4">
        {TASK_STATUS_IDS.map((taskStatusId) => (
          <TaskColumn
            key={taskStatusId}
            title={COLUMN_LABELS[taskStatusId]}
            tasks={filterByStatus(tasks, taskStatusId)}
            moveTask={moveTask}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="flex flex-col items-start gap-4 p-4 bg-gray-50">
        <CreateTaskForm onCreate={handleCreate} />
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500"
          >
            Clear Tasks
          </button>
          <button
            onClick={handleSeed}
            className="px-3 py-1 bg-green-400 text-white rounded hover:bg-green-500"
          >
            Re-Seed Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
