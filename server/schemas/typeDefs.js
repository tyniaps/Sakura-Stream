const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {

    _id: ID!

    username: String!

    email: String

    animeCount: Int

    savedAnimes: [Anime]

  }

  type Anime {

    _id: ID!

    synopsis: String

    image: String

    link: String

    title: String!

  }

  type Auth {

    token: ID!

    user: User

  }

  input AnimeData {

    synopsis: String

    _id: ID!

    image: String

    link: String

    title: String!

  }

  type Query {

    me: User

  }

  type Mutation {

    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    saveAnime(input: AnimeData!): User

    removeAnime(_id: ID!): User

  }

`;

module.exports = typeDefs;