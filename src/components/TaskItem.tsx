import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Task } from '../types/task';
import toast from 'react-hot-toast';
import { useDrag } from 'react-dnd';
import Modal from 'react-modal';
import removeIcon from '../assets/remove.svg';
import updateIcon from '../assets/update.svg';
import closeModalIcon from '../assets/closeModal.svg';
import updateModalIcon from '../assets/updateModal.svg';


export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const handleRemove = (id: string) => {
    const filterTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(filterTasks));
    setTasks(filterTasks);
    toast('Task was removed', { icon: '☠' , duration: 1000});
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    const updatedTask = { ...task, description: updatedDescription };
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast('Task description was updated', { icon: '🔄', duration: 1000 });
    setIsModalOpen(false);
  };

  return (
    <div
      ref={drag}
      className={`${
        isDragging ? 'opacity-25' : 'opacity-100'
      } relative p-4 mt-9 shadow-md rounded-md cursor-grab`}
    >
      <p>{task.title}</p>
      <p>{task.description}</p>
      <button
        className="absolute bottom-1 right-12 text-black-200"
        onClick={handleUpdate}
      >
        <img src={updateIcon} alt="update icon" className="w-6 h-6" />
      </button>
      <button
        className="absolute bottom-1 right-1 text-black-200"
        onClick={() => handleRemove(task.id)}
      >
        <img src={removeIcon} alt="remove icon" className="w-6 h-6" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Update Description Modal"
      >
        <h2>Please, update your task description</h2>
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <button onClick={handleSaveChanges}>
          <img src={updateModalIcon} alt="" className="w-6 h-6" />
        </button>
        <button onClick={handleCloseModal}>
          <img src={closeModalIcon} alt="" className="w-6 h-6" />
        </button>
      </Modal>
    </div>
  );
};
