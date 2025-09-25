import { createContext } from 'react';

import { ContextType } from '~/src/utils/types';

export default createContext<ContextType>({
  tasks: [],
  dispatch: () => { }
});
