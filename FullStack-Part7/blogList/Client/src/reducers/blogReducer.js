import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_NEW':{
    const toAdd = action.data
    return [...state, toAdd]
  }
  case 'REMOVE_BLOG':{
    const removeBlog = action.data
    const newBlogs = state.filter((blog) => blog.id !== removeBlog.id)
    return newBlogs
  }
  case 'UPDATE_BLOG': {
    const updateBlog = action.data
    const updatedBlogs = state.filter((blog) => blog.id !== updateBlog.id)
    return [...updatedBlogs, updateBlog]
  }
  case 'INIT':
    return action.data

  default:
    return state
  }
}

export const getAll = () => {
  return async (dispatch) => {
    const getBlogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: getBlogs,
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const addBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: addBlog,
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const removeBlog = await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: removeBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogLiked = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blogLiked
    })
  }
}

export const commentBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.comment(blog)
    dispatch({ type: 'UPDATE_BLOG', data: response })
  }
}

export default reducer
