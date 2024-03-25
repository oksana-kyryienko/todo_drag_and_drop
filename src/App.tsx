import { useEffect, useState } from 'react';
import { CreateTask } from './components/CreateTask';
import { ListTasks } from './components/ListTasks';
import { Task } from './types/task';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskContext } from './context/TaskContext';

import './App.css';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="bg-slate-100 h-screen flex flex-col pt-20 gap-16">
          <CreateTask />
          <ListTasks />
        </div>
      </DndProvider>
    </TaskContext.Provider>
  );
}

export default App;
