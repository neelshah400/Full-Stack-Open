import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    blogs: blogsReducer,
  },
});

export default store;
