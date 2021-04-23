import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAction } from '../reducers/anecdoteReducer'
import { showNotificationAction, closeNotificationAction } from '../reducers/notificationReducer'
import axiosService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    // use this hook like store.dispatch
    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        console.log('createNew', event.target.newInput.value)
        const input = event.target.newInput.value
        event.target.newInput.value = ''

        const newAnecdote = await axiosService.createNew(input)
        console.log(newAnecdote)
        dispatch(createNewAction(newAnecdote)) // object from backend
        dispatch(showNotificationAction(`You created a new anecdote "${input}"`))
        setTimeout(() => {
            dispatch(closeNotificationAction())
          }, 5000)
    }

    return (
        <div className="anecdote-form">
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name="newInput" /></div>
                <button>create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm