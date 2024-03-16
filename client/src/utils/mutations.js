import { gql } from '@apollo/client';

// This GraphQL mutation is for logging in a user.
export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token 
      user { 
        _id 
        username 
      }
    }
  }
`;

// This GraphQL mutation is for adding a new user.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token 
      user { 
        _id 
        username
      }
    }
  }
`;

// saving anime to a user collection.
export const SAVE_ANIME = gql`
  mutation saveAnime($input: AnimeData!) {
    saveAnime(input: $input) {
      _id 
      username 
      email 
      savedAnime { 
        animeId 
        description 
        title 
        image 
        link 
      }
    }
  }
`;

//removing anime from user collection.
export const REMOVE_ANIME = gql`
  mutation removeAnime($animeId: ID!) {
    removeBook(bookId: $animeId) {
      _id 
      username 
      email 
      animeCount 
      savedAnime { 
        animeId 
        description 
        title 
        image 
        link 
      }
    }
  }
`;