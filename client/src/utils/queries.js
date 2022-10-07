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

export const SEARCH_GOOGLE_BOOKS = gql`
  mutation searchGoogleBooks($query: String!) {
    searchGoogleBooks(query: $query) {
      items {
        id
        title
        author
      }
    }
  }
`;

// export const getSavedBookIds = () => {
//     const savedBookIds = localStorage.getItem('saved_books')
//       ? JSON.parse(localStorage.getItem('saved_books'))
//       : [];
  //     return savedBookIds;
//   };
  
//   export const saveBookIds = (bookIdArr) => {
//     if (bookIdArr.length) {
//       localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
//     } else {
//       localStorage.removeItem('saved_books');
//     }
//   };
  

//   export const removeBookId = (bookId) => {
//     const savedBookIds = localStorage.getItem('saved_books')
//       ? JSON.parse(localStorage.getItem('saved_books'))
//       : null;
  
//     if (!savedBookIds) {
//       return false;
//     }
//     const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
//     localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
//     return true;
//   };
  
