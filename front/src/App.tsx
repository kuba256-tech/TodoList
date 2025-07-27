import { Route, Routes } from 'react-router-dom';
import UserLogin from './Features/Users/UserLogin';
import UserRegister from './Features/Users/UserRegister';
import HomeSection from './Features/Home/HomeSection';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './store/hooks';
import { selectUser } from './Features/Users/userSlice';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <div className="wrapper">
        <div className="">
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute isAllowed={user !== null}>{user && <HomeSection user={user} />}</ProtectedRoute>}
            />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/*" element={<h4>Page Not Found</h4>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
