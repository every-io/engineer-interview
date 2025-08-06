import { TodoStatus, Direction } from './types';

export interface StatusConfig {
  id: TodoStatus;
  title: string;
  order: number;
  isInitial?: boolean;
}

export interface TransitionConfig {
  from: TodoStatus;
  to: TodoStatus;
  direction: Direction;
}

export interface WorkflowConfig {
  statuses: StatusConfig[];
  transitions: TransitionConfig[];
}

export const defaultWorkflowConfig: WorkflowConfig = {
  statuses: [
    {
      id: TodoStatus.TODO,
      title: 'To Do',
      order: 0,
      isInitial: true,
    },
    {
      id: TodoStatus.IN_PROGRESS,
      title: 'In Progress',
      order: 1,
    },
    {
      id: TodoStatus.DONE,
      title: 'Done',
      order: 2,
    },
  ],
  transitions: [
    {
      from: TodoStatus.TODO,
      to: TodoStatus.IN_PROGRESS,
      direction: Direction.NEXT,
    },
    {
      from: TodoStatus.IN_PROGRESS,
      to: TodoStatus.DONE,
      direction: Direction.NEXT,
    },
    {
      from: TodoStatus.IN_PROGRESS,
      to: TodoStatus.TODO,
      direction: Direction.PREV,
    },
    {
      from: TodoStatus.DONE,
      to: TodoStatus.IN_PROGRESS,
      direction: Direction.PREV,
    },
  ],
};

export function buildTransitionMap(transitions: TransitionConfig[]) {
  return transitions.reduce((map, transition) => {
    if (!map[transition.from]) {
      map[transition.from] = {};
    }
    map[transition.from][transition.direction] = transition.to;
    return map;
  }, {} as Record<TodoStatus, Partial<Record<Direction, TodoStatus>>>);
}

export function getInitialStatus(config: WorkflowConfig): TodoStatus {
  const initial = config.statuses.find(status => status.isInitial);
  return initial ? initial.id : config.statuses[0].id;
}

export function getOrderedStatuses(config: WorkflowConfig): StatusConfig[] {
  return [...config.statuses].sort((a, b) => a.order - b.order);
}
