import { useState, type ChangeEvent } from 'react';
import type { IRegisterUser } from '../../types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileInput from '../../components/FileInput/FileInput';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUserThunk } from './userThunks';
import { selectRegisterError } from './userSlice';

const initialRegisterState = {
  username: '',
  password: '',
  confirmPassword: '',
  avatar: null,
};

const UserRegister = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [registerForm, setRegisterForm] = useState<IRegisterUser>(initialRegisterState);
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch (error) {
      return undefined;
    }
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerForm);
    try {
      await dispatch(registerUserThunk(registerForm)).unwrap();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    if (files) {
      setRegisterForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <div className="user-register app-container">
      <div className={`modal ${isOpen && 'active'}`}>
        {registerForm.avatar && (
          <img className="preview-picture" src={URL.createObjectURL(registerForm.avatar)} alt="" />
        )}
        <Button className="close-modal-btn" variant="contained" onClick={() => setIsOpen(false)}>
          close
        </Button>
      </div>
      <div className="submit-form">
        <h3 className="form-header">LET'S GET YOU STARTED</h3>
        <p className="form-title">Create an Account</p>
        <form onSubmit={onSubmit}>
          <div className="form">
            <TextField
              fullWidth
              onChange={onChange}
              name="username"
              id="username"
              value={registerForm.username}
              label="Username"
              variant="outlined"
              type="text"
              helperText={getFieldError('username')}
              error={getFieldError('username') ? true : false}
            />
            <TextField
              fullWidth
              onChange={onChange}
              name="password"
              id="password"
              value={registerForm.password}
              label="Password"
              variant="outlined"
              type="password"
              helperText={getFieldError('password')}
              error={getFieldError('password') ? true : false}
            />
            <TextField
              type="password"
              fullWidth
              onChange={onChange}
              name="confirmPassword"
              id="confirmPassword"
              value={registerForm.confirmPassword}
              label="Confirm password"
              variant="outlined"
              helperText={getFieldError('confirmPassword')}
              error={getFieldError('confirmPassword') ? true : false}
            />

            <div className="file-div">
              <FileInput name="avatar" onGetFile={onChangeAvatar} />

              {registerForm.avatar && (
                <Button startIcon={<PreviewIcon />} variant="outlined" onClick={() => setIsOpen(true)}>
                  Preview
                </Button>
              )}
            </div>

            <Button type="submit" variant="contained">
              Register
            </Button>
          </div>
        </form>
      </div>
      <div className="user-register-bottom">
        <p>
          Already have an account?{' '}
          <Button variant="outlined" onClick={() => navigate('/')}>
            LOGIN HERE
          </Button>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
