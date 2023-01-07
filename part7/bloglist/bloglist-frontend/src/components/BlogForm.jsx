/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogsReducer';

function BlogForm() {
  const dispatch = useDispatch();

  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetURL, ...url } = useField('text');

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    resetTitle();
    resetAuthor();
    resetURL();
    dispatch(createBlog(newBlog));
  };

  return (
    <div id="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog} id="form">
        <div id="titleDiv">
          title:
          <input name="Title" id="titleInput" {...title} />
        </div>
        <div id="authorDiv">
          author:
          <input name="Author" id="authorInput" {...author} />
        </div>
        <div id="urlDiv">
          url:
          <input name="URL" id="urlInput" {...url} />
        </div>
        <button type="submit" id="createButton">
          create
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
