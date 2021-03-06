import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error.message)
      props.setError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook)
    },
    onCompleted: () => {
      props.setPage('books')
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const published=Number(publishedYear)
    createBook({  variables: { title, author, published, genres } })

    setTitle('')
    setPublishedYear('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            required
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            required
            type="number"
            value={publishedYear}
            onChange={({ target }) => setPublishedYear(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button style={{marginTop:'10px'}} type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
