const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.payload
        case 'CLOSE_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

// async action creator handles both show & close
let timeoutID = null
export const setNotificationAction = (message, seconds = 5) => {
    return async dispatch => {
        if (timeoutID) {
             // earlier setTimeout call will be canceled
            clearTimeout(timeoutID)
            timeoutID = null
        }
        dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: message,
        })
        // each setTimeout creates a unique ID
        timeoutID = setTimeout(() =>
            dispatch({
                type: 'CLOSE_NOTIFICATION'
            }), seconds * 1000);
    }
}

export default notificationReducer