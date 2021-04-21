import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  // this hook retrieves data from redux store
  const anecdotes = useSelector(state => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  )
}

export default App