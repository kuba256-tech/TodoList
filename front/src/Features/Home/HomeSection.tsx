import { Divider } from '@mui/material';
import { apiUrl } from '../../GlobalConstant';
import type { IUser } from '../../types';
import AddTaskComponent from '../../components/AddTask/AddTaskComponent';
import Tasks from './Tasks';
import noPic from '../../assets/images/noPicIcon.png';

interface Props {
  user: IUser;
}
const HomeSection: React.FC<Props> = ({ user }) => {
  let userImg = noPic;

  if (user.avatar) {
    userImg = apiUrl + '/' + user.avatar;
  }

  return (
    <div className="home-section app-container">
      <div className="home-top">
        <p>{user.username}</p>
        <img src={userImg} alt="img" />
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
