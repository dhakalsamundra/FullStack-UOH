import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const Users = ({ users }) => {
  const { url } = useRouteMatch()
  return (
    <div>
      <h1>Users</h1>
      <h1>Blogs</h1>
      {users.map((user) => (
        <h4 key={user.id}>
          <h5>
            <Link to={`${url}/${user.id}`}>{user.name}</Link>
          </h5>
          <h5>{user.blogs.length}</h5>
        </h4>
      ))}
    </div>
  )
}

export default Users