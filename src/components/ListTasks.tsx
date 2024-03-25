import React, { useContext, useEffect, useState } from 'react';
import { Task } from '../types/task';
import { TaskContext } from '../context/TaskContext';

import { Section } from './Section';

export const ListTasks: React.FC = () => {
  const { tasks } = useContext(TaskContext);
  const [statusTasks, setStatusTasks] = useState<{ [key: string]: Task[] }>({});

  useEffect(() => {
    const statusTasksObj = {
      todo: tasks.filter(task => task.status === 'todo'),
      inprogress: tasks.filter(task => task.status === 'inprogress'),
      closed: tasks.filter(task => task.status === 'closed')
    };

    setStatusTasks(statusTasksObj);
  }, [tasks]);

  return (
    <div className='flex justify-around bg-slate-100'>
      {Object.keys(statusTasks).map((status, index) => 
        <Section 
          key={index} 
          status={status} 
        />
      )}
    </div>
  );
};
