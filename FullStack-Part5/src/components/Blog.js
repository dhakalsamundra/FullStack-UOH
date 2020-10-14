import React, {useState} from 'react'
import Togglable from './Togglable'
import EachBlog from './EachBlog'

const Blog = ({ blog, user }) => {

  const [toggleButton, setToggleButton] = useState(false)

  const button = () => {
    setToggleButton(!toggleButton)
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
    {blog.title} written by {blog.author}
    {toggleButton ? (
      <div>
        <button onClick={button}>Hide</button><EachBlog blog={blog} /></div>) : (
        <button onClick={button}>Show</button>)}
  </div>
)
}

export default Blog
