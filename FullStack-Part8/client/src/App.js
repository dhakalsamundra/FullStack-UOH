import React, { useState, useEffect } from 'react'
import { useApolloClient } from "@apollo/client";

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'
import LogIn from './components/LoginForm'


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return <div style={{ color: "red"}}>{errorMessage}</div>
}

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

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
      client.resetStore()
    };


  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
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

      <Authors show={page === 'authors'} token={token} notify={notify} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} notify={notify} />
      <Recommendation show={page==='recommend'} />
      <LogIn show={page==='login'} setToken ={setToken} setPage={setPage} notify={notify} />

    </div>
  )
}

export default App