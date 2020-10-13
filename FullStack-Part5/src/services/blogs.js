import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = Object => {
    const request = axios.post(baseUrl, Object)
    return request.then(response => response.data)
}

const update = (id, Object)=> {
    const request = axios.put(`${baseUrl}/${id}`, Object)
    return request.then(response => response.data)
}

export default { getAll, create, update }