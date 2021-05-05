import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { setFilterAction, clearFilterAction } from '../reducers/filterReducer'

const Filter = (props) => {

    // must be declared first so the ref in the input can refer to it
    const filterInput = useRef(null);

    const handleChange = (event) => {
        const input = event.target.value
        props.setFilterAction(input)
    }

    const handleClear = (event) => {
        props.clearFilterAction()
        // clear the field connected to the ref
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

const mapDispatchToProps = {
    setFilterAction,
    clearFilterAction
  }

// use connect to access action creators+dispatch via props
const ConnectedFilter = connect(null, mapDispatchToProps )(Filter)
export default ConnectedFilter