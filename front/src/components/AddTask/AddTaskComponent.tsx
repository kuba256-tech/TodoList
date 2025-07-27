import { useState } from 'react';
import type { ITaskMutation } from '../../types';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useAppDispatch } from '../../store/hooks';
import { postTaskThunk } from '../../Features/Home/tasksThunk';

const initialState: ITaskMutation = {
  title: '',
  description: '',
  date: '',
  isCompleted: false,
};
const AddTaskComponent = () => {
  const [taskMutation, setTaskMutation] = useState(initialState);
  const dispatch = useAppDispatch();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(postTaskThunk(taskMutation));
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
              <Button type="submit" variant="contained" color="success">
                Add task
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaskComponent;
