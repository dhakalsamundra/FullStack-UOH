import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async Object => {
    const config = { headers: {Authorization: token}}
    const response = axios.post(baseUrl, Object, config)
    return response.data
}

const update = ( Object)=> {
  const id = Object.id
    const response = axios.put(`${baseUrl}/${id}`, Object)
    return response.data
}

const deleteBlog = async (id) => {
  console.log('this is the delete blog id', id)
  const config = {
    headers: {Authorization: token}
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, deleteBlog }