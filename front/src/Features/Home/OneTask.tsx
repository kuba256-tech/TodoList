import { Button } from '@mui/material';
import type { ITask } from '../../types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { useAppDispatch } from '../../store/hooks';
import { deleteTaskThunk, fetchAllTasksThunk } from './tasksThunk';

interface Props {
  task: ITask;
}

const OneTask: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  const deleteTask = async (taskId: string) => {
    await dispatch(deleteTaskThunk(taskId));
    await dispatch(fetchAllTasksThunk());
  };
  return (
    <div className="task">
      <div className="task-info">
        <p>{task.title}</p>
        <span>{task.description} </span>
      </div>
      <div className="task-functions">
        <Button startIcon={<EditIcon color="secondary" />} />
        <Button onClick={() => deleteTask(task._id)} startIcon={<DeleteIcon color="error" />} />
        <Button startIcon={task.isCompleted ? <AssignmentTurnedInRoundedIcon /> : <AssignmentTurnedInOutlinedIcon />} />
      </div>
    </div>
  );
};

export default OneTask;
