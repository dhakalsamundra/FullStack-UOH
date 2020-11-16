import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useFeild } from '../hooks'

const AddBlog = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h2>Add Blog</h2>
        <div>
          <input value={title} { ...setTitle} placeholder='title' /><br/>
          <input value={author} { ...setAuthor} placeholder='author' />
          <input value={url} { ...setUrl} placeholder='url' />
          <input value={likes} { ...setLikes} placeholder='likes' />
        </div>
        <br></br>
        <button id='addblog-btn' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default AddBlog
