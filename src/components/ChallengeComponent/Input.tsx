import { useState } from 'react';

import { useTasks } from "~/src/hooks";
import { createTask } from '~/src/store/tasks';

export default function Input() {
  const [title, setTitle] = useState('');
  const { dispatch } = useTasks();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(createTask(title));
    setTitle('');
  }
  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => 
    setTitle(value);

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input className="border border-black rounded-md py-2 px-4" value={title} onChange={handleChange} />

      <button className="rounded-lg bg-blue-600 text-white py-2 px-5" type="submit">+</button>
    </form>
  );
}