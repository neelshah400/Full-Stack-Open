/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useField } from '../hooks';
import { commentOnBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer';

function Blog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.auth);

  const { reset: resetComment, ...comment } = useField('text');

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate('/');
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    if (comment.value.trim()) {
      dispatch(commentOnBlog(blog, comment.value.trim()));
      resetComment();
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>by: {blog.author}</p>
      <p>
        url:&nbsp;
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        likes: {blog.likes}&nbsp;
        <button type="button" onClick={handleLike} id="likeButton">
          like
        </button>
      </p>
      <p>added by: {blog.user.name}</p>
      {blog.user.username === user.username && (
        <div>
          <button type="button" onClick={handleRemove}>
            remove
          </button>
        </div>
      )}
      <h3>comments</h3>
      {blog.comments && (
        <ul>
          {blog.comments.map((c, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleComment}>
        <input name="comment" {...comment} />
        <button type="submit">comment</button>
      </form>
    </div>
  );
}

export default Blog;
