import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const createNotification = (style, message, time = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification({ style, message, time }));
  };
};

export default notificationSlice.reducer;
