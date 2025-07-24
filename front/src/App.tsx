import { Route, Routes } from 'react-router-dom';
import UserLogin from './Features/Users/UserLogin';
import UserRegister from './Features/Users/UserRegister';
import HomeSection from './Features/Home/HomeSection';

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="">
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/" element={<HomeSection />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
