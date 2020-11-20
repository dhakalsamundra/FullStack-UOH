import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { getAll } from '../reducers/blogReducer'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(160),
      height: theme.spacing(10),
    },
  },
}))
const Blogs = ({ blogs }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAll())
  }, [])

  return (
    <div>
      {blogs.map((blog) => (
        <div className={ classes.root}  key={blog.id}>
          <Paper>
            <div>
              {blog.title}
            </div>
            <Button color='primary' component={Link} to={`/blogs/${blog.id}`}>
              Details
            </Button>
          </Paper>
        </div>
      ))}
    </div>
  )
}
export default Blogs
