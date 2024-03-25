import { createContext } from 'react';
import { Task } from '../types/task';

export const TaskContext = createContext<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}>({
  tasks: [],
  setTasks: () => {},
});