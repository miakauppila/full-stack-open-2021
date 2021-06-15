import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select';

const Authors = (props) => {
  const [selectedName, setSelectedName] = useState(null);
  const [bornYear, setBornYear] = useState('')
  
  const result = useQuery(ALL_AUTHORS)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    // mutation returns id and Author on the list is updated without refetch
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    // if no author is selected in the drop-down
    if(!selectedName) {
      props.setError('choose an author first')
      return
    }
    const setBornTo = Number(bornYear)
    const name=selectedName.value
    updateAuthor({ variables: { name, setBornTo } })

    setSelectedName(null)
    setBornYear('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  //authors available only after result.loading false
  const authors = result.data.allAuthors

  const authorsOptions = authors.map(a => ({
    "value" : a.name,
    "label" : a.name
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <p>
        <Select
          value={selectedName}
          onChange={setSelectedName}
          options={authorsOptions}
        />
        </p>
        <div>
          born
          <input
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
            required
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors