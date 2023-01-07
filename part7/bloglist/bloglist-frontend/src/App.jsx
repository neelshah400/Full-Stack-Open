import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogsReducer';
import authService from './services/auth';
import { login, logUserOut } from './reducers/authReducer';
import LoginForm from './components/LoginForm';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser) {
      dispatch(login(storedUser));
    }
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logUserOut());
  };

  const blogFormRef = useRef();

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
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} isOwner={blog.user.username === user.username} />
      ))}
    </div>
  );
}

export default App;
