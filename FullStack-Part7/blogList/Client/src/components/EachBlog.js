import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comment from './Comment'

export default function EachBlog({ blog }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDeleteBlog = async () => {
    try {
      await dispatch(deleteBlog(blog))
      history.push('/')
      dispatch(setNotification('blog removed sucessfully', 5))
      dispatch(setNotification('removed', 5, 'error'))
    } catch (error) {
      const message = error.response.data.error
      dispatch(setNotification(message, 5, 'error'))
    }
  }

  if (!blog) {
    return null
  }

  const addLike = async () => {
    const toUpdateBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await dispatch(likeBlog(toUpdateBlog))
    } catch (error) {
      const message = error.response.data.error
      dispatch(setNotification(message, 5, 'error'))
    }
  }
  return (
    <div style={blogStyle} className='blogStyle'>
      <ul>
        <li>
          Likes: {blog.likes}
          <button onClick={() => addLike(blog)}>Like</button>
        </li>
        <li>Url: {blog.url}</li>
        <li>Title: {blog.title}</li>
        <li>Author: {blog.author}</li>
      </ul>
      <button onClick={() => handleDeleteBlog(blog)}>Delete</button>
      <div>
        <Comment blog={blog} />
      </div>
      <div>
        {blog.comments.map((comment) => (
          <h6 key={comment.id}>{ comment.content }</h6>
        ))}
      </div>
    </div>
  )
}
