import { Button, Divider, Menu, MenuItem } from '@mui/material';
import { apiUrl } from '../../GlobalConstant';
import type { IUser } from '../../types';
import AddTaskComponent from '../../components/AddTask/AddTaskComponent';
import Tasks from './Tasks';
import noPic from '../../assets/images/noPicIcon.png';
import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { logOutThunk } from '../Users/userThunks';
import { unSetUser } from '../Users/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  user: IUser | null;
}
const HomeSection: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await dispatch(logOutThunk()).unwrap();
    await dispatch(unSetUser());
    navigate('/login');
    handleClose();
  };

  let userImg = noPic;
  if(!user){
    return <NavLink to={"/login"} replace/>
  }

  if (user.avatar) {
    userImg = apiUrl + '/' + user.avatar;
  }
  console.log(userImg)

  return (
    <div className="home-section app-container">
      <div className="home-top">
        <p>{user.username}</p>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <img src={userImg} alt="img" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <Divider className="divider">Tasks</Divider>
      <div className="home-content">
        <Tasks />
        <AddTaskComponent task={null} />
      </div>
    </div>
  );
};

export default HomeSection;
