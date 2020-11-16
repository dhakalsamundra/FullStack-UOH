import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useFeild } from '../hooks'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [username, setUserName] = useFeild('text')
  const [password, setPassword] = useFeild('password')

  const handleLogIn = async (event) => {
    event.preventDefault()
    setUserName.clear()
    setPassword.clear()
    try {
      await dispatch(loginUser({ username, password }))
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
        <input value={username} { ...setUserName} placeholder='UserName' /><br/>
        <input value={password} { ...setPassword} placeholder='Password' />
        <button id='login-button' type='submit'>
          SignIn
        </button>
      </form>
    </div>
  )
}
