import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Typography, Paper, List, ListItem, IconButton } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import { useSnackbar } from 'notistack'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comment from './Comment'

export default function EachBlog({ blog }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const user = useSelector((state) => state.user)



  const handleDeleteBlog = async () => {
    try {
      const dialog = window.confirm('Do you confirm that you want to delete this blog?')
      if(dialog) await dispatch(deleteBlog(blog))
      history.push('/')
      enqueueSnackbar('Blog Deleted', { variant: 'success' })
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
    <Paper className='blog' elevation={3}>
      <div className='blogStyle'>
        <Typography variant='h4' color='primary'>
          Title: {blog.title}
        </Typography>
        <Typography variant='h4' color='textSecondary'>
          Url: {blog.url}
        </Typography>
        <Typography variant='h4' color='textSecondary'>
          Author: {blog.author}
        </Typography>
        <Typography variant='h4' color='textSecondary'>
          <ThumbUpAltIcon />: {blog.likes}
        </Typography>
        <Typography variant='h4' color='textSecondary'>
          Added By:{blog.user.name}
        </Typography>
        { user ? <IconButton onClick={() => handleDeleteBlog(blog)} aria-label='like Button'><DeleteIcon /></IconButton> : null }
        <IconButton onClick={() => addLike(blog)} aria-label='delete blog'><ThumbUpAltIcon /></IconButton>
        <Comment blog={blog} />
      </div>
      <Typography variant='h5' color='primary'>Comments</Typography>
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment.id}>{ comment.content }</ListItem>
        ))}
      </List>
    </Paper>
  )
}
