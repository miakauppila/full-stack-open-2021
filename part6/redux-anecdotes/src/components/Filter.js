import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setFilterAction, clearFilterAction } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    // must be declared first so the ref in the input can refer to it
    const filterInput = useRef(null);

    const handleChange = (event) => {
        const input = event.target.value
        dispatch(setFilterAction(input))
    }

    const handleClear = (event) => {
        dispatch(clearFilterAction())
        // clear the field with the ref
        filterInput.current.value = ""
    }

    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            filter <input type="text" ref={filterInput} onChange={handleChange} /> <button onClick={handleClear}>clear</button>
        </div>
    )
}

export default Filter