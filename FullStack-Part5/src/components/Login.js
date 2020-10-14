import React, {useState} from 'react'

import LogInService from '../services/login'
import Notification from './Notification'
import blogService from '../services/blogs'
import AddBlog from './AddBlog'

export default function Login() {
    const [input, setInput] = useState({username: '', password: ''})
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)


    const {username, password} = input

    const onChange = e => setInput({ ...input, [e.target.name]: e.target.value });

    const handleLogIn = async (event) => {
        event.preventDefault()
        
        try {
          const user = await LogInService.login({
            username, password,
          })
          console.log('this is login user', user)
          blogService.setToken(user.token)
          setUser(user)
          setInput('')
        } catch (exception) {
          setErrorMessage('Invalid credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
      
      return (
        <div>
          <h1>Login</h1>
          <Notification message={errorMessage} />
          {user !== null ? <AddBlog />: <div></div>}
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
