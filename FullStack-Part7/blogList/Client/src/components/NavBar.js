import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'


import { logoutUser } from '../reducers/userReducer'

// const useStyles = makeStyles({
//   userNameNav: {
//     flex: 1,
//   },
// })

const LoginBtn = () => {
  const history = useHistory()

  const handleLogin = () => {
    history.push('/login')
  }

  return (
    <Button onClick={handleLogin} color="inherit">
      Login
    </Button>
  )
}

const LogoutBtn = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logoutUser())
    history.push('/')
  }

  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  )
}

const NavBar = () => {
  const user = useSelector((state) => state.user)

  return (
    <div>
      <div>
        {user ? (
          <h1>{user.name}</h1>
        ) : null}
        <Button color="inherit" component={Link} to="/">
          Blog
        </Button>
        {user && (
          <Button color="inherit" component={Link} to="/create">
            Create
          </Button>
        )}
        {user && (
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        )}
        {user ? <LogoutBtn /> : <LoginBtn />}
      </div>
    </div>
  )
}

export default NavBar
