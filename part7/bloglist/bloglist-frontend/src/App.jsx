import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';
import { login, logUserOut } from './reducers/authReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import authService from './services/auth';

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

  const padding = {
    padding: 5,
  };

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <span>
          {user.name} logged in&nbsp;
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
        </span>
      </div>
      <h1>blogs</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
