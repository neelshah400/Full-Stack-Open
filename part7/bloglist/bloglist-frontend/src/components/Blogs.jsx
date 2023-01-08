import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

function Blogs() {
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <h3>blogs added</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blogs;
