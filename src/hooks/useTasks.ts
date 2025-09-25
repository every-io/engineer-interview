import { useContext } from 'react';

import { Context } from '~/src/store/tasks';

const useTasks = () => useContext(Context);

export default useTasks;
