import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification.message !== '') {
      setTimeout(() => {
        dispatch(setNotification(''))
      }, notification.time)
    }
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return notification.message && (
    <div style={style}>
      {notification.message}
    </div>
  )

}

export default Notification