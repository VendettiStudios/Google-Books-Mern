import { gql } from '@apollo/client';


export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      username
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;