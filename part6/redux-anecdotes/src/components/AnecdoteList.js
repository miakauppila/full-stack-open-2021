import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ anecdotes }) => {
    const dispatch = useDispatch()

    // sort anecdotes by amount of votes
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAction(id))
      }

    return (
        <div className="anecdote-list">
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnecdoteList;