import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
      author { name }
      id
      published
      genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      id
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author { name }
      id
      published
      genres
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const CURRENT_USER = gql`
  query {
    me  {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author { name }
      id
      published
      genres
    }
  }
`
export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`