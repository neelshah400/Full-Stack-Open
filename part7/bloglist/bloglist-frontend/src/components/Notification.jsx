import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(setNotification(null));
      }, notification.time);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [dispatch, notification]);

  return notification && <div className={notification.style}>{notification.message}</div>;
}

export default Notification;
