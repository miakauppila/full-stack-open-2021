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

export const showNotificationAction = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        payload: message 
    }
}

export const closeNotificationAction = () => {
    return {
        type: 'CLOSE_NOTIFICATION'
    }
}

export default notificationReducer