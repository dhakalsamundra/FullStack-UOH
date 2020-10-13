import React, { useState} from 'react';

import blogService from '../services/blogs'
const AddBlog = () => {

  const [newBlog, setNewBlog] = useState({
    author: '',
    url: '',
    title: '',
    likes: 0
  });

  const { author, url, title, likes } = newBlog;

  const onChange = e =>
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()
    const object = {
        author: author,
        url: url,
        title: title,
        likes: likes
    }
    blogService.create(object).then(returnedBlog=>{ setNewBlog(newBlog.concat(returnedBlog))})
  };

  return (
    <form onSubmit={onSubmit}>
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
  );
};

export default AddBlog;
