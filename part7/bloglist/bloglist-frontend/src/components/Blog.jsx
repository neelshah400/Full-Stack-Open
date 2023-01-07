import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';

function Blog({ blog, isOwner }) {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const buttonLabel = visible ? 'hide' : 'view';

  const toggleVisibility = () => setVisible(!visible);

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div style={blogStyle} id="blogDiv" className="blog">
      <div id="basicInfoDiv">
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility} id="toggleButton">
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} id="detailedInfoDiv">
        <div id="urlDiv">{blog.url}</div>
        <div id="likesDiv" className="likes">
          likes {blog.likes}
          <button type="button" onClick={handleLike} id="likeButton">
            like
          </button>
        </div>
        <div id="userDiv">{blog.user.name}</div>
        {isOwner && (
          <div id="removeDiv">
            <button type="button" onClick={handleRemove} id="removeButton">
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
