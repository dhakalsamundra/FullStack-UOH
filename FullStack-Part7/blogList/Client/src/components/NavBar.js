import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button, Toolbar, AppBar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'

import { logoutUser } from '../reducers/userReducer'

const useStyles = makeStyles({
  NavBarStyle: {
    flex: 1,
    textAlign: 'end'
  },
})

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

const LogoutBtn = ({ user }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logoutUser())
    enqueueSnackbar(`${user.username} logged out..`, { variant: 'success' })
    history.push('/')
  }

  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  )
}

const NavBar = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.user)

  return (
    <AppBar position="static">
      <Toolbar>
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
        {user ? <LogoutBtn user={ user } /> : <LoginBtn />}
        {user ? (
          <Typography className={classes.NavBarStyle}>{user.name}</Typography>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
