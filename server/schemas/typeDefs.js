const typeDefs = `

  type User {

    _id: ID!

    username: String!

    email: String

    animeCount: Int

    savedAnime: [Anime]

  }

  type Book {

    animeId: ID!

    creator: [String]

    description: String

    image: String

    link: String

    title: String!

  }

  type Auth {

    token: ID!

    user: User

  }

  input BookInput {

    creator: [String]

    description: String!

    AnimeId: String!

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

    saveAnime(animeData: AnimeInput!): User

    removeAnime(animeId: ID!): User

  }

`;

module.exports = typeDefs;