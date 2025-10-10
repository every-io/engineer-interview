import { Task } from "@/types";

const STORAGE_KEY = "tasks";

const load = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as Task[]) : [];
};

const save = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const taskService = {
  seed: () => {
    const sampleTasks: Task[] = [
      {
        id: "1",
        title: "Do laundry",
        description: "Don't forget to run the dryer this time",
        status: "todo",
      },
      {
        id: "2",
        title: "Do dishes",
        description: "Handwash the skillet",
        status: "inProgress",
      },
      {
        id: "3",
        title: "Nap",
        description: "Try to keep it under 3 hours",
        status: "done",
      },
    ];
    save(sampleTasks);
    return sampleTasks;
  },

  fetchAll: (): Task[] => {
    return load();
  },

  create: (task: Omit<Task, "id">): Task => {
    const tasks = load();
    const newTask: Task = { id: crypto.randomUUID(), ...task };

    tasks.push(newTask);

    save(tasks);
    return newTask;
  },

  update: (id: string, updates: Partial<Omit<Task, "id">>): Task | null => {
    const tasks = load();
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) return null;

    const updatedTask = { ...tasks[index], ...updates };

    tasks[index] = updatedTask;
    save(tasks);

    return updatedTask;
  },

  delete: (id: string): boolean => {
    const tasks = load();
    const newTasks = tasks.filter((task) => task.id !== id);

    if (newTasks.length === tasks.length) return false;
    save(newTasks);

    return true;
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
