import { useState, FormEvent } from "react";
import { Task } from "../types";

interface CreateTaskFormProps {
  onCreate: (task: Omit<Task, "id">) => void;
}

export function CreateTaskForm({ onCreate }: CreateTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreate({
      title: title.trim(),
      description: description.trim(),
      status: "todo",
    });

    // Note: if this were to be handled by an HTTP request, we would only reset the
    // inputs after onSuccess.
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        aria-label="Task title"
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        aria-label="Task description"
        className="border rounded px-2 py-1"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
}
