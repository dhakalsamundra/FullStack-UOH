import React, { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'
import LogIn from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
      setToken(userToken);
    }
  }, [])

    const logout = () => {
      setToken(null);
      localStorage.clear();
      setPage('authors');
    };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>Add Book</button>
            <button onClick={() => setPage('recommend')}>Recommend</button>
            <button onClick={logout}>LogOut</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>logIn</button>
        )}

      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommendation show={page==='recommend'} />
      <LogIn show={page==='login'} setToken ={setToken} setPage={setPage} />

    </div>
  )
}

export default App