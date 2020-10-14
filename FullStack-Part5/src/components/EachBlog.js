import React from "react";

export default function EachBlog({ blog }) {
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
        <li>Likes: {blog.likes}</li>
        <li>Url: {blog.url}</li>
        <li>Title: {blog.title}</li>
        <li>Author: {blog.author}</li>
      </ul>
    </div>
  );
}
