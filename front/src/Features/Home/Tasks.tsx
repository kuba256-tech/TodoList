import { useSelector } from 'react-redux';
import { selectAllTasks } from './tasksSlice';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchAllTasksThunk } from './tasksThunk';
import OneTask from './oneTask';

const Tasks = () => {
  const tasks = useSelector(selectAllTasks);
  const dispatch = useAppDispatch();

  const fetchAllTasks = useCallback(async () => {
    await dispatch(fetchAllTasksThunk()).unwrap();
  }, [tasks]);

  useEffect(() => {
    void fetchAllTasks();
  }, []);
  return (
    <div className="tasks">
      {tasks.map((task) => (
        <OneTask key={task._id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
