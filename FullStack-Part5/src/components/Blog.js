import React, {useState} from 'react'
import EachBlog from './EachBlog'

const Blog = ({ blog, user, addLikes, handleDelete }) => {
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
  <div style={blogStyle} className='blog'>
    {blog.title} written by {blog.author}
    {toggleButton ? (
      <div>
        <button onClick={button}>Hide</button><EachBlog {...{blog, addLikes, user, handleDelete}}/></div>) : (
        <button onClick={button}>Show</button>)}
  </div>
)
}

export default Blog
