import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import { setUser } from './reducers/userReducer'
import { getAll } from './reducers/blogReducer'
import NavBar from './components/NavBar'
import User from './components/User'

const Routes = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAll())
    dispatch(setUser())
  })
  return (
    <div>
      <NavBar />
      <Notification />
      <Switch>
        <Route  path='/' component={Blog} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/create' component={AddBlog} />
        <Route exact path='/users' component={User} />
      </Switch>
    </div>
  )
}

export default Routes
