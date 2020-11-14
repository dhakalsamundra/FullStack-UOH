import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'SETUSER':
    return action.data
  default:
    return state
  }
}

export const loginUser = (data) => {
  return async (dispatch) => {
    const user = await loginService.login(data)
    localStorage.setItem('SignInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const setUser = () => {
  return (dispatch) => {
    const loggedUserJson = window.localStorage.getItem('SignInUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      dispatch({
        type: 'SETUSER',
        data: user,
      })
    }
  }
}

export default reducer
