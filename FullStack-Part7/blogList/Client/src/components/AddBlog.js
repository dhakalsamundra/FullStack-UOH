import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useFeild } from '../hooks'

const useStyles = makeStyles({
  formStyle: {
    width: '100%',
    textAlign: 'center'
  },
  btnStyle: {
    marginTop: 20,
    color: 'primary'
  }
})
const AddBlog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const [title, setTitle] = useFeild('text')
  const [author, setAuthor] = useFeild('text')
  const [url, setUrl ] = useFeild('text')
  const [ likes, setLikes] = useFeild('number')


  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await dispatch(addBlog({ title, author, likes, url }))
      setTitle.clear()
      setAuthor.clear()
      setUrl.clear()
      setLikes.clear()

      history.push('/')
      dispatch(setNotification('Blog Added', 5))
    } catch (error) {
      const message = error.response.data.error
      dispatch(setNotification(message, 5, 'error'))
    }
  }

  return (
    <div className={classes.formStyle}>
      <form onSubmit={handleSubmit}>
        <h2>Add Blog</h2>
        <div>
          <TextField value={title} { ...setTitle} placeholder='title' /><br/>
          <TextField value={author} { ...setAuthor} placeholder='author' /><br/>
          <TextField value={url} { ...setUrl} placeholder='url' /><br/>
          <TextField value={likes} { ...setLikes} placeholder='likes' /><br/>
        </div>
        <br></br>
        <Button className={classes.btnStyle} type='submit' color='primary' variant='contained'>
          Create
        </Button>
      </form>
    </div>
  )
}

export default AddBlog
