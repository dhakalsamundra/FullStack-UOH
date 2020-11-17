import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const Blogs = ({ blogs }) => {
  return(
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {blog.title}
          <Button color="primary" component={Link} to={`/blogs/${blog.id}`}>Details</Button>
        </div>
      ))}
    </div>
  )
}
export default Blogs