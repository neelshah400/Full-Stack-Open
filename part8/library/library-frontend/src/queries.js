import { gql } from '@apollo/client'

export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      ...AuthorDetails
    }
    published
    genres
  }
  ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!,
    $setBornTo: Int!
  ) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription bookAdded {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
