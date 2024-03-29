import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (removeObject) => {
  const id = removeObject.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + `/${id}`, config)
  return response.data
}

const update = async (newObject) => {
  const id = newObject.id
  const response = await axios.put(baseUrl + `/${id}`, newObject)
  return response.data
}
export default { getAll, setToken, create, update, remove }
