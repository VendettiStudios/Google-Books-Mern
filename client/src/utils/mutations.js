import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          title
          description
        }
      }
    }
  }
`;
export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;
export const SAVE_BOOK = gql`
mutation SaveBook($description: String!, $title: String!, $bookId: String!, $image: String, $authors: [String], $link: String) {
    saveBook(description: $description, title: $title, bookId: $bookId, image: $image, authors: $authors, link: $link) {
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        description
        image
        link
      }
    }
  }
`;
export const DELETE_BOOK = gql`
mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      email
      savedBooks {
        bookId
        authors
      }
    }
  }
  `;