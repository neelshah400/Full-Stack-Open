require('dotenv').config()
const { UserInputError, AuthenticationError } = require('@apollo/server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

const JWT_SECRET = process.env.JWT_SECRET
const PASSWORD = process.env.PASSWORD

const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let bookFilter = {}
      if (args.author) {
        bookFilter.author = await Author.findOne({ name: args.author })
      }
      if (args.genre) {
        bookFilter.genres = { $in: args.genre }
      }
      return Book.find(bookFilter).populate('author')
    },
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== PASSWORD) {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author }) 
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
        author.bookCount += 1
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
