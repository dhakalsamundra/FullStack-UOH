import React from "react";

export default function EachBlog({ blog, addLikes, handleDelete, user}) {

  const onChangeDelete = e => {
    const data = blog
    handleDelete(data)
  }
  const onChangeLikes = e => {
    const object = {
      id: blog.id,
      user: blog.user.id,
      author: blog.author,
      url: blog.url,
      title: blog.title,
      likes: parseInt(blog.likes) + 1

  }
  addLikes(object)
  }
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
        <li>Likes: {blog.likes}<button onClick={onChangeLikes}>Like</button></li>
        <li>Url: {blog.url}</li>
        <li>Title: {blog.title}</li>
        <li>Author: {blog.author}</li>
      </ul>
      {user.username === blog.user.username ? 
        <button onClick={onChangeDelete}>Delete</button>   :  ''
    }
    </div>
  );
}
