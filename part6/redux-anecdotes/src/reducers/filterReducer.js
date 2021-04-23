const initialState = null

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload
        case 'CLEAR_FILTER':
            return initialState
        default:
            return state
    }
}

export const setFilterAction = (input) => {
    return {
        type: 'FILTER',
        payload: input 
    }
}

export const clearFilterAction = () => {
    return {
        type: 'CLEAR_FILTER'
    }
}

export default filterReducer