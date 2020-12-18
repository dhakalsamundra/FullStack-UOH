import React from 'react'

export default function EachBlog({ blog, user, addLikes, handleDelete }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleLikes = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    addLikes(updatedBlog)
  }
  return (
    <div style={blogStyle} className='blogStyle'>
      <ul>
        <li>
          Likes: {blog.likes}
          <button onClick={() => handleLikes(blog)}>Like</button>
        </li>
        <li>Url: {blog.url}</li>
        <li>Title: {blog.title}</li>
        <li>Author: {blog.author}</li>
      </ul>
      { user ?  (
        <button onClick={() => handleDelete(blog)}>Delete</button>): null }
    </div>
  )
}
