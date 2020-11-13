import React, { useState } from 'react'

export default function Login({ loginUser }) {
  const [input, setInput] = useState({ username: '', password: '' })
  const { username, password } = input

  const onChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value })

  const handleLogIn = async (event) => {
    event.preventDefault()
    loginUser(input)
    setInput({ username: '', password: '' })
  }

  return (
    <div>
      <h1>Login</h1>
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
        </div>
        <br></br>
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
        <button id='login-button' type='submit'>
          SignIn
        </button>
      </form>
    </div>
  )
}
