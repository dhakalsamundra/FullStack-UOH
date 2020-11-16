import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

import EachBlog from './EachBlog'
import Blogs from './Blogs'

const Blog = () => {
  const { path } = useRouteMatch()
  const blogs = useSelector((state) => state.blogs)
  console.log('this is samundra blog', blogs)

  const match = useRouteMatch('/blogs/:id')

  const blog = match
    ? blogs.find((blog) => blog.id === String(match.params.id))
    : null


  return (
    <Switch>
      <Route exact path='/blogs/:id'><EachBlog blog={blog} /></Route>
      <Route path={path}><Blogs blogs={blogs} /></Route>
    </Switch>
  )
}

export default Blog
