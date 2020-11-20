import React from 'react'
import { useDispatch } from 'react-redux'

import { commentBlog } from '../reducers/blogReducer'
import { useFeild } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { TextField } from '@material-ui/core'

const Comment = ({ blog }) => {
  const dispatch = useDispatch()
  const [ comment, setComment ] = useFeild()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setComment.clear()
    try {
      await dispatch(commentBlog({ id: blog.id, content: comment }))
      dispatch(setNotification('Added', 5))
    } catch (error) {
      const msg = 'error'
      dispatch(setNotification(msg, 5, 'error'))
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <TextField value={ comment } { ...setComment } placeholder='Comment here' />
      </form>
    </div>
  )
}

export default Comment