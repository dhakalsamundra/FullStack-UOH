import React, { useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import userService from '../services/users'
import Users from './Users'
import EachUser from './EachUser'

const User = () => {
  const [ users, setUsers] = useState([])
  const { path } = useRouteMatch()
  const userId = path.concat('/:id')
  const match = useRouteMatch(userId)

  useEffect(() => {
    const getAllUsers = async() => {
      const getUsers = await userService.getAll()
      setUsers(getUsers)
    }
    getAllUsers()
  }, [])

  const user = match ? users.find((user) => user.id === String(match.params.id)) : null

  return (
    <div>
      <Switch>
        <Route path={`${path}/:id`}><EachUser {...user} /></Route>
        <Route path={path}><Users users={users} /></Route>
      </Switch>
    </div>
  )
}

export default User
