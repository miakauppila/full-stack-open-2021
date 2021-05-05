
import axiosService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTES':
        return action.data
    case 'NEW':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    default: return state
  }
}

export const initializeAnecdotesAction = () => {
  return async dispatch => {
    const anecdotes = await axiosService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createNewAction = (content) => {
  return async dispatch => {
    const newAnecdote = await axiosService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await axiosService.updateVotes(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer