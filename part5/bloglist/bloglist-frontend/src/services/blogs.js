import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = newBlog => {
  const config = { headers: { Authorization: token } }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const update = (id, blog) => {
  const config = { headers: { Authorization: token } }
  const request = axios.put(`${baseUrl}/${id}`, blog, config)
  return request.then(response => response.data)
}

const remove = id => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, create, update, remove }