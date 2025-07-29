import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectAllTasks } from './tasksSlice';
import AddTaskComponent from '../../components/AddTask/AddTaskComponent';

const MutateTask = () => {
  const task = useAppSelector(selectAllTasks);
  const { id } = useParams();
  const selectedOneTask = task.filter((item) => item._id === id);
  return (
    <div className="app-container">
      <AddTaskComponent task={selectedOneTask[0]} />
    </div>
  );
};

export default MutateTask;
