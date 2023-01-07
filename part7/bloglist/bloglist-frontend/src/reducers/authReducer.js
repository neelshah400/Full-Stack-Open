import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth';
import { createNotification } from './notificationReducer';

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const logUserIn = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await authService.login({ username, password });
      authService.setUser(user);
      dispatch(login(user));
      dispatch(createNotification('success', 'logged in successfully'));
    } catch (exception) {
      dispatch(createNotification('error', 'wrong username or password'));
    }
  };
};

export const logUserOut = () => {
  return async (dispatch) => {
    authService.logout();
    dispatch(logout(null));
    dispatch(createNotification('success', 'logged out successfully'));
  };
};

export default authSlice.reducer;
