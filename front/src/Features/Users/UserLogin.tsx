import { Alert, Button, TextField } from '@mui/material';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ILoginUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUserThunk } from './userThunks';
import { selectLoginError, selectLoginLoading, unSetLoginError } from './userSlice';

const initialState = {
  username: '',
  password: '',
};

const UserLogin = () => {
  const [loginForm, setLoginForm] = useState<ILoginUser>(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginError = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginUserThunk(loginForm)).unwrap();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(unSetLoginError());
  }, []);

  return (
    <div className="user-register app-container">
      <div className="submit-form">
        <h3 className="form-header">Welcome</h3>
        <p className="form-title">Log in to your account</p>
        <form onSubmit={onSubmit}>
          <div className="form">
            {loginError && <Alert severity="error">{loginError.error}</Alert>}
            <TextField
              fullWidth
              onChange={onChange}
              name="username"
              id="username"
              value={loginForm.username}
              label="Username"
              variant="outlined"
              type="text"
            />
            <TextField
              fullWidth
              onChange={onChange}
              name="password"
              id="password"
              value={loginForm.password}
              label="Password"
              variant="outlined"
              type="password"
            />

            <Button loading={loginLoading} disabled={loginLoading} type="submit" variant="contained">
              Log in
            </Button>
          </div>
        </form>
      </div>
      <div className="user-register-bottom">
        <p>
          Do not have an account?{' '}
          <Button disabled={loginLoading} variant="outlined" onClick={() => navigate('/register')}>
            REGISTER HERE
          </Button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
