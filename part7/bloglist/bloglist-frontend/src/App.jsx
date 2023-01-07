import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import Users from './components/Users';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogsReducer';
import authService from './services/auth';
import { login, logUserOut } from './reducers/authReducer';
import LoginForm from './components/LoginForm';
import { initializeUsers } from './reducers/usersReducer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser) {
      dispatch(login(storedUser));
    }
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logUserOut());
  };

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
