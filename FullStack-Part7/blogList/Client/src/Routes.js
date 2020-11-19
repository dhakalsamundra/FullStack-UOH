import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import User from './components/User'

const Routes = () => {

  return (
    <div>
      <NavBar />
      <Notification />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/create' component={AddBlog} />
        <Route exact path='/users' component={User} />
        <Route  path='/' component={Blog} />
      </Switch>
    </div>
  )
}

export default Routes
