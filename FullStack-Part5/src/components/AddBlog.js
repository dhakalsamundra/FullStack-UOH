import React, { useState, useEffect} from 'react';

import blogService from '../services/blogs'
import Notification from './Notification'

const AddBlog = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({
    author: '',
    url: '',
    title: '',
    likes: 0
  });

  const { author, url, title, likes } = newBlog;

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const onChange = e =>
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });

  const addBlog = e => {
    e.preventDefault()
    const object = {
        author: author,
        url: url,
        title: title,
        likes: likes
    }
    console.log('this is a new blogs', object)
    blogService
    .create(object)
    .then(returnedBlog=>{ 
      setBlogs(blogs.concat(returnedBlog))
    setNewBlog('')
    })
    setSuccessMessage('New blog added successfully')
  };

  return (
    <div>
       <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    <form onSubmit={addBlog}>
      <h2>Add Blog</h2>
      <div><label>Title:</label><input
        type='text'
        placeholder='title'
        name='title'
        value={title}
        onChange={onChange}
      /></div><br></br>
      <div><label>Url:</label><input
        type='text'
        placeholder='url'
        name='url'
        value={url}
        onChange={onChange}
      /></div><br></br>
      <div><label>Author:</label><input
        type='text'
        placeholder='author'
        name='author'
        value={author}
        onChange={onChange}
      /></div><br></br>
      <div><label>Likes:</label><input
        type='number'
        placeholder='likes'
        name='likes'
        value={likes}
        onChange={onChange}
      /></div><br></br>
      <button type="submit">Create</button>
    </form>
    </div>
  );
};

export default AddBlog;
