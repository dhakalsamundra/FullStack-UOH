import React, { useState } from 'react'

const AddBlog = ({ addNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    author: '',
    url: '',
    title: '',
    likes: 0,
  })

  const { author, url, title, likes } = newBlog

  const onChange = (e) =>
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })

  const addBlog = (e) => {
    e.preventDefault()
    addNewBlog(newBlog)
    setNewBlog({
      author: '',
      url: '',
      title: '',
      likes: 0,
    })
  }

  return (
    <div className='form'>
      <form onSubmit={addBlog}>
        <h2>Add Blog</h2>
        <div>
          <label>Title:</label>
          <input
            type='text'
            placeholder='title'
            name='title'
            id='Title'
            value={title}
            onChange={onChange}
          />
        </div>
        <br></br>
        <div>
          <label>Url:</label>
          <input
            type='text'
            placeholder='url'
            id='Url'
            name='url'
            value={url}
            onChange={onChange}
          />
        </div>
        <br></br>
        <div>
          <label>Author:</label>
          <input
            type='text'
            placeholder='author'
            name='author'
            id='Author'
            value={author}
            onChange={onChange}
          />
        </div>
        <br></br>
        <div>
          <label>Likes:</label>
          <input
            type='number'
            placeholder='likes'
            name='likes'
            id='Likes'
            value={likes}
            onChange={onChange}
          />
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
