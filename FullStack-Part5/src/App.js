import React, { useState, useEffect } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUser = window.localStorage.getItem('token')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setSuccessMessage(`${user.name} logOut successful`)
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    setUser(null);
  };

  return (
    <div>
      <Notification successMessage={successMessage} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
      {user === null ? <Togglable buttonLabel = 'Login'><Login /> </Togglable>: <div><p>{user.name} logged in <button onClick={handleLogout}>logout</button></p><Togglable buttonLabel='Add Blog'><AddBlog /></Togglable></div>}     
    </div>
  )
}

export default App