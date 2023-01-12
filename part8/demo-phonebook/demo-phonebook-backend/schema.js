const { gql } = require('graphql-tag')

const typeDefs = gql`

  type User {
    id: ID!
    username: String!
    friends: [Person!]!
  }

  type Token {
    value: String!
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    id: ID!
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    me: User
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }
  
  type Mutation {
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
    addAsFriend(
      name: String!
    ): User
  }

  type Subscription {
    personAdded: Person!
  }
`

module.exports = typeDefs
