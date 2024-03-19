import { gql } from '@apollo/client';

export const QUERY_ME = gql`

  {

    me {

      _id

      username

      email

      savedAnime {

        _id

        creator

        image

        synopsis

        title

        link

      }

    }

  }

`;