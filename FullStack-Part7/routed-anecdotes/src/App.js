import React from 'react'
import Footer from './Components/Footer'

import NavBar from './Components/NavBar'
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <NavBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App;
