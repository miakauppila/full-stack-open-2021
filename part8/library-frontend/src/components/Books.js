import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filterGenre, setFilterGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if(result.error) {
    return <div>Sorry, an unexpected error occurred.</div>
  }

  let books = result.data.allBooks
  let uniqueGenres = []

  if (books.length > 0) {
    let genres = []
    books.forEach(book => {
      book.genres.forEach(genre => {
        genres.push(genre)
      })
    })
    // create an array of unique values
    uniqueGenres = [...new Set(genres)]
  }

  if(filterGenre !== 'all genres') {
    books = books.filter(book => book.genres.includes(filterGenre))
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{filterGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{marginTop:'30px'}}>
      {uniqueGenres.map(genre => 
      <button key={genre} onClick={() => setFilterGenre(genre)}>{genre}</button>
        )}
      <button onClick={() => setFilterGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books