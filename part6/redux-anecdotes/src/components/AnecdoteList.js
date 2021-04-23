import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { showNotificationAction, closeNotificationAction } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    // this hook retrieves data from redux store
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

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
        dispatch(voteAction(anecdote.id))
        dispatch(showNotificationAction(`You voted "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(closeNotificationAction())
          }, 5000)
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