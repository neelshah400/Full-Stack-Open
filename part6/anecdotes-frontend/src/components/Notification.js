import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification !== '') {
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 5000)
    }
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return notification && (
    <div style={style}>
      {notification}
    </div>
  )

}

export default Notification