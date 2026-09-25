import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogId, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blogId}`
  const response = await axios.put(url, newBlog, config)
  console.log('response.data', response.data)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blogId}`
  const response = await axios.delete(url, config)
  return response.data
}

const addComment = async (blogId, comment) => {
  const url = `${baseUrl}/${blogId}/comments`
  const response = await axios.post(url, { comment })
  return response.data
}

export default { getAll, create, update, remove, setToken, addComment }
