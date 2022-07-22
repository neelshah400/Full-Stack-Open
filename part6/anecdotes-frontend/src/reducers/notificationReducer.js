import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    time: 0
  },
  reducers: {
    setNotification(state, action) {
      return state = action.payload
    },
  }
})

export const { setNotification } = notificationSlice.actions

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, time }))
  }
}

export default notificationSlice.reducer