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
  console.log('this is service delte', removeObject)
  const id = removeObject.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl.concat(`/${id}`), config)
  return response.data
}

const update = async (newObject) => {
  newObject = { ...newObject, user: newObject.user.id }
  const id = newObject.id
  const response = await axios.put(baseUrl.concat(`/${id}`), newObject)
  return response.data
}

const comment = async(addComment) => {
  const config = {
    headers: { Authorization: token }
  }
  const { id } = addComment
  const object = { content: addComment.content }

  const response = await axios.post( baseUrl.concat(`/${id}/comments`), object, config)
  return response.data
}
export default { getAll, setToken, create, update, remove, comment }
