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

const update = (id, Object)=> {
    const request = axios.put(`${baseUrl}/${id}`, Object)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken }