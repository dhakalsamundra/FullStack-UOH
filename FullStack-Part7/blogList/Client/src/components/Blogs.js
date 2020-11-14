import React from 'react'
// import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  return(
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {blog.title}
        </div>
      ))}
    </div>
  )
}
export default Blogs