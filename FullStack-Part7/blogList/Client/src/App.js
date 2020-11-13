import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = React.createRef()

  useEffect(() => {
    const getBlog = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlog()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, type = 'error') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginUser = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      const message = error.response.data.error
      handleNotification(message)
      setTimeout(() => {
        handleNotification(null)
      }, 5000)
    }
  }

  const addNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisible()
    try {
      const returnedBlog = await blogService.create(newBlog)
      const message = `${returnedBlog.title} by ${returnedBlog.author} successfully added`
      handleNotification(message, 'success')
      setBlogs([...blogs, returnedBlog])
    } catch (error) {
      const message = error.response.data.error
      handleNotification(message)
      setTimeout(() => {
        handleNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async (toRemoveBlog) => {
    if (user === null) {
      handleNotification('Not Authorized')
      return setTimeout(() => {
        handleNotification(null)
      }, 5000)
    }

    try {
      const remMsg = `Remove ${toRemoveBlog.title} by ${toRemoveBlog.author}?`
      const userChoice = window.confirm(remMsg)
      if (!userChoice) {
        return null
      }
      await blogService.remove(toRemoveBlog)
      const newBlogs = blogs.filter((blog) => toRemoveBlog.id !== blog.id)
      setBlogs(newBlogs)
      handleNotification('blog removed sucessfully', 'success')
    } catch (error) {
      const message = error.response.data.error
      handleNotification(message)
      setTimeout(() => {
        handleNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Login'>
        <Login loginUser={loginUser} />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <AddBlog addNewBlog={addNewBlog} />
      </Togglable>
    )
  }

  const addLikes = async (toUpdateBlog) => {
    const returnedBlog = await blogService.update(toUpdateBlog)
    const newBlogs = blogs.filter((blog) => blog.id !== toUpdateBlog.id)
    const updatedBlogs = [...newBlogs, returnedBlog]
    setBlogs(updatedBlogs)
  }
  return (
    <div>
      <Notification notification={notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog {...{ blog, addLikes, handleDelete }} />
        </div>
      ))}
    </div>
  )
}

export default App
