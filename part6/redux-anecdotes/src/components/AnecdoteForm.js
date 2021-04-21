import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    // use this hook like store.dispatch
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        console.log('createNew', event.target.newInput.value)
        const input = event.target.newInput.value
        event.target.newInput.value = ''
        dispatch(createNewAction(input))
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