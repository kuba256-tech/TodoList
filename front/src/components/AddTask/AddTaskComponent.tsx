import { useState } from 'react';
import type { ITask, ITaskMutation } from '../../types';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllTasksThunk, mutateTaskThunk, postTaskThunk } from '../../Features/Home/tasksThunk';
import { useNavigate } from 'react-router-dom';
import { selectPostingTasks } from '../../Features/Home/tasksSlice';

interface Props {
  task: ITask | null;
}

const initialState: ITaskMutation = {
  title: '',
  description: '',
  date: '',
  isCompleted: false,
};
const AddTaskComponent: React.FC<Props> = ({ task = null }) => {
  const [taskMutation, setTaskMutation] = useState(task ? task : initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const postingTask = useAppSelector(selectPostingTasks);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (task) {
      await dispatch(mutateTaskThunk({ ...taskMutation, _id: task._id }));
      await dispatch(fetchAllTasksThunk());
      navigate('/');
    } else {
      await dispatch(postTaskThunk(taskMutation));
    }

    setTaskMutation(initialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskMutation((prevState) => ({ ...prevState, isCompleted: event.target.checked }));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTaskMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="addtask-form">
        <form onSubmit={onSubmit}>
          <div className="form">
            <TextField
              required
              fullWidth
              onChange={onChange}
              id="title"
              name="title"
              label="Title"
              variant="filled"
              value={taskMutation.title}
            />
            <TextField
              required
              fullWidth
              onChange={onChange}
              id="description"
              name="description"
              label="Description"
              variant="filled"
              value={taskMutation.description}
            />
            <div className="is-completed">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={taskMutation.isCompleted}
                    name="isCompleted"
                    id="isCompleted"
                    onChange={handleChange}
                    icon={<CheckCircleOutlineRoundedIcon />}
                    checkedIcon={<CheckCircleRoundedIcon />}
                  />
                }
                label="Completed"
              />
              <Button loading={postingTask} disabled={postingTask} type="submit" variant="contained" color="success">
                {task ? 'Edit Task' : 'Add task'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaskComponent;
