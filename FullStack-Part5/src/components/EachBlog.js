import React from "react";

import blogService from '../services/blogs'


export default function EachBlog({ blog, user }) {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
      const addlikes = () => {
          const object = {
              id: blog.id,
              user: blog.user.id,
              author: blog.author,
              url: blog.url,
              title: blog.title,
              likes: parseInt(blog.likes) + 1

          }
          blogService.update(object)
      }

      const handleDelete = () => {
        const id = blog.id
        if (window.confirm(`Do you want to delete ${blog.title}?`)) {
        blogService.deleteBlog(id)
      }
    }
  return (
    <div style={blogStyle}>
      <ul>
        <li>Likes: {blog.likes}<button onClick={addlikes}>Like</button></li>
        <li>Url: {blog.url}</li>
        <li>Title: {blog.title}</li>
        <li>Author: {blog.author}</li>
      </ul>
      {user.username === blog.user.username ? 
        <button onClick={handleDelete}>Delete</button>   :  ''
    }
    </div>
  );
}
