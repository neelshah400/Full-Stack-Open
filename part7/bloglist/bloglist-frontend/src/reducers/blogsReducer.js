import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { createNotification } from './notificationReducer';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        createNotification('success', `a new blog ${newBlog.title} by ${newBlog.author} added`)
      );
    } catch (error) {
      dispatch(createNotification('error', `failed to add new blog to database: ${error.message}`));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.update({ ...blog, likes: blog.likes + 1 });
      dispatch(updateBlog(updatedBlog));
      dispatch(
        createNotification(
          'success',
          `existing blog ${updatedBlog.title} by ${updatedBlog.author} liked`
        )
      );
    } catch (error) {
      dispatch(
        createNotification('error', `failed to like existing blog in database: ${error.message}`)
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.remove(blog);
      dispatch(removeBlog(blog));
      dispatch(createNotification('success', `blog ${blog.title} by ${blog.author} deleted`));
    } catch (error) {
      dispatch(
        createNotification('error', `failed to delete blog from database: ${error.message}`)
      );
    }
  };
};

export const commentOnBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogsService.commentOn(blog, comment);
      dispatch(updateBlog(commentedBlog));
      dispatch(createNotification('success', `commented on blog ${blog.title} by ${blog.author}`));
    } catch (error) {
      dispatch(
        createNotification('error', `failed to comment on blog from database: ${error.message}`)
      );
    }
  };
};

export default blogsSlice.reducer;
