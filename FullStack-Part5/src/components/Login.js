import React, {useState} from 'react'

import LogInService from '../services/login'
import Notification from './Notification'
import blogService from '../services/blogs'

export default function Login() {
    const [input, setInput] = useState({username: '', password: ''})
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [user, setUser] = useState(null)


    const {username, password} = input

    const onChange = e => setInput({ ...input, [e.target.name]: e.target.value });

    const handleLogIn = async (event) => {
        event.preventDefault()
        
        try {
          const user = await LogInService.login({
            username, password,
          })
          window.localStorage.setItem('token', JSON.stringify(user))
          blogService.setToken(user.token)
          setUser(user)
          setSuccessMessage(`${user.name} login successfull`)
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setInput('')
        } catch (exception) {
          setErrorMessage('Invalid credentials', 'success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
      
      return (
        <div>
          <h1>Login</h1>
          <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
          <form onSubmit={handleLogIn}>
            <div>
              <label htmlFor='username'>UserName:</label>
              <input
                id='username'
                type='username'
                name='username'
                value={username}
                onChange={onChange}
                required
              />
            </div><br></br>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <button type='submit'>SignIn</button>
          </form>
        </div>
      );
    };
