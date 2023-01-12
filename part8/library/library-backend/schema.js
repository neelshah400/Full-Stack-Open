const { gql } = require('graphql-tag')

const typeDefs = gql`

  type User {
    id: ID!
    username: String!
    favouriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Query {
    me: User
    authorCount: Int!
    allAuthors: [Author!]!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
