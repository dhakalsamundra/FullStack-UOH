import React from "react";

export default function EachBlog({ blog, addLikes, handleDelete, user}) {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
  return (
    <div style={blogStyle}>
      <ul>
        <li>Likes: {blog.likes}<button onClick={()=>addLikes(blog)}>Like</button></li>
        <li>Url: {blog.url}</li>
        <li>Title: {blog.title}</li>
        <li>Author: {blog.author}</li>
      </ul>
        <button onClick={()=> handleDelete(blog)}>Delete</button>
    </div>
  )
}