import React from 'react'
import { connect } from 'react-redux'
import { createNewAction } from '../reducers/anecdoteReducer'
import { setNotificationAction } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const createNew = async (event) => {
        event.preventDefault()
        console.log('createNew', event.target.newInput.value)
        const input = event.target.newInput.value
        event.target.newInput.value = ''
        props.createNewAction(input)
        props.setNotificationAction(`You created '${input}'`, 5)
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

const mapDispatchToProps = {
    createNewAction,
    setNotificationAction
  }

// use connect to access action creators+dispatch via props
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps )(AnecdoteForm)
export default ConnectedAnecdoteForm