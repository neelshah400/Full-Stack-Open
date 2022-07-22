import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, asObject(content))
  return response.data
}

const voteOn = async (id) => {
  const responseGet = await axios.get(`${baseUrl}/${id}`)
  const anecdote = { ...responseGet.data, votes: responseGet.data.votes + 1 }
  const responsePut = await axios.put(`${baseUrl}/${id}`, anecdote)
  return responsePut.data
}

export default { getAll, createNew, voteOn }