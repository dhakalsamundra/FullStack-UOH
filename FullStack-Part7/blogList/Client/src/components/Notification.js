import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div className={notification.type}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification
