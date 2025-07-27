import { Divider } from '@mui/material';
import { apiUrl } from '../../GlobalConstant';
import type { IUser } from '../../typed';

import AddTaskComponent from '../../components/AddTask/AddTaskComponent';

interface Props {
  user: IUser;
}
const HomeSection: React.FC<Props> = ({ user }) => {
  let userImg;
  console.log(user);

  if (user.avatar) {
    userImg = apiUrl + '/' + user.avatar;
  }

  return (
    <div className="home-section app-container">
      <div className="home-top">
        <p>{user.username}</p>
        <img src={userImg} alt="img" />
      </div>
      <Divider>Tasks</Divider>
      <div className="home-content">
        <AddTaskComponent />
      </div>
    </div>
  );
};

export default HomeSection;
