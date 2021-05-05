import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data // backend adds id to the returned object
}

// patch includes only the changed value ie. votes
const updateVotes = async (anecdote) => {
  const object = { votes: anecdote.votes + 1 }
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, object)
  return response.data
}

export default {
  getAll,
  createNew,
  updateVotes
}