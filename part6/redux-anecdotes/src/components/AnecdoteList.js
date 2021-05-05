import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotificationAction } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    // this hook retrieves data from redux store
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    // use this hook like store.dispatch
    const dispatch = useDispatch()

    const findMatches = (wordToSearch, anecdotes) => {
        return anecdotes.filter((anecdote) => {
          //a new rule: g= global i=insensitive
          const regex = new RegExp(wordToSearch, "gi");
          //returns a filtered array
          return anecdote.content.match(regex);
        });
      }
    
    //shows either the results of findMatches or all anecdotes
    const anecdotesToShow = filter ? findMatches(filter, anecdotes) : anecdotes;

    // sort anecdotes by amount of votes
    const sortedAnecdotes = anecdotesToShow.sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAction(anecdote))
        dispatch(setNotificationAction(`You voted '${anecdote.content}'`, 5))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnecdoteList;