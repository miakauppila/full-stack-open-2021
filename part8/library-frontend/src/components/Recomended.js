import React from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS } from '../queries'

const Recomended = (props) => {

  const result = useQuery(CURRENT_USER)
  const bookResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const user = result.data.me
  console.log(user)
  const favoriteGenre = user.favoriteGenre

  let books = bookResult.data.allBooks

  if(favoriteGenre) {
    books = books.filter(book => book.genres.includes(favoriteGenre))
  }

  return (
    <div>
      <h2>Recomendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
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
    </div>
  )
}

export default Recomended