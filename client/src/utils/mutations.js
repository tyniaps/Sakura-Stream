import { gql } from '@apollo/client';

export const LOGIN_USER = gql`

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

export const SAVE_ANIME = gql`
  mutation saveAnime($input: AnimeData!) {
    saveAnime(input: $input) {
      _id 
      username 
      email 
      savedAnimes { 
        _id 
        image 
        synopsis 
        title  
        link 
      }
    }
  }
`;

export const DELETE_ANIME = gql`
  mutation removeAnime($animeId: ID!) {
    removeAnime(animeId: $animeId) {
      _id 
      username 
      email 
      savedAnime { 
        _id 
        image 
        synopsis 
        title  
        link 
      }
    }
  }
`;
