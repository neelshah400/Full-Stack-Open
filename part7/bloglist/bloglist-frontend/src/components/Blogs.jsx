import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Blog from './Blog';

function Blogs() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth);

  const blogFormRef = useRef();

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} isOwner={blog.user.username === user.username} />
      ))}
    </div>
  );
}

export default Blogs;
