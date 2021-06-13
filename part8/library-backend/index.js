const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/authorSchema')
const Book = require('./models/bookSchema')
const config = require('./utils/config')

const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int 
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }


  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      // await is necessary for the filtering
      let books = await Book.find({}).populate('author')
      if(args.author) {
        books = books.filter((book) => book.author.name === args.author ? book : !book)
      }
      if(args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      // await is necessary for the filtering
      const books = await Book.find({}).populate('author')
      const booksFromAuthor = books.filter(book => book.author.name === root.name)
      return booksFromAuthor.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const existingAuthor = await Author.findOne({ name: args.author })
      if(!existingAuthor) {
        const newAuthor = new Author({ name: args.author, born: null })
        const newBook = new Book({ ...args, author: newAuthor })
        try {
          await newAuthor.save()
          await newBook.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return newBook
      }
      else {
        const newBook = new Book({ ...args, author: existingAuthor })
      try {
        await newBook.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } 
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})