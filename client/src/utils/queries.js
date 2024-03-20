import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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