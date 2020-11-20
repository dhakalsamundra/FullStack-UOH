import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import store from './store'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)
