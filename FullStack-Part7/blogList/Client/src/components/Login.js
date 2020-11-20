import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'


const useStyles = makeStyles({
  btnStyle: {
    marginTop: 10,
  },
})

import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useFeild } from '../hooks'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()

  const [username, setUserName] = useFeild('text')
  const [password, setPassword] = useFeild('password')

  const handleLogIn = async (event) => {
    event.preventDefault()
    setUserName.clear()
    setPassword.clear()
    try {
      await dispatch(loginUser({ username, password }))
      enqueueSnackbar(`${username} logged in..`, { variant: 'success' })
      history.push('/')
    } catch (error) {
      const message = error.response.data.error
      dispatch(setNotification(message, 5, 'error'))
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogIn}>
        <TextField value={username} { ...setUserName} placeholder='UserName' /><br/>
        <TextField value={password} { ...setPassword} placeholder='Password' /><br/>
        <Button className={classes.btnStyle} type='submit' color='primary' variant='contained'>
          SignIn
        </Button>
      </form>
    </div>
  )
}
