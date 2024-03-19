const typeDefs = `

  type User {

    _id: ID!

    username: String!

    email: String

    animeCount: Int

    savedAnime: [Anime]

  }

  type Anime {

    _id: ID!

    creator: [String]

    synopsis: String!

    image: String

    link: String

    title: String!

  }

  type Auth {

    token: ID!

    user: User

  }

  input AnimeInput {

    creator: [String]

    synopsis: String!

    _id: String!

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

    removeAnime(_id: ID!): User

  }

`;

module.exports = typeDefs;