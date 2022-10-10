import { useQuery, useMutation } from '@apollo/client';
import React, {useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
    const { loading, data } = useQuery(GET_ME);
    let savedBooks = data?.me.savedBooks || []
    console.log(savedBooks)
    const [removeBook, { error }] = useMutation(DELETE_BOOK, {
        update(cache, { data: { removeBook } }) {
            try {
              // First we retrieve existing profile data that is stored in the cache under the `QUERY_PROFILES` query
              // Could potentially not exist yet, so wrap in a try/catch
              const { me } = cache.readQuery({ query: GET_ME });
      
              // Then we update the cache by combining existing profile data with the newly created data returned from the mutation
              cache.writeQuery({
                query: GET_ME,
                // If we want new data to show up before or after existing data, adjust the order of this array
                data: { me:{savedBooks: removeBook} },
              });
            } catch (e) {
              console.error(e);
            }
          },
    });
    // use this to determine if `useEffect()` hook needs to run again



    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeBook({
                variables: {bookId}
            });

            if (!data.removeBook) {
                throw new Error('something went wrong!');
            }
            // userData = data.removeBook;
            // upon success, remove book's id from localStorage
            removeBookId(bookId);
         } catch (err) {
            console.error(err);
         }
      };
        //     const updatedUser = await response.json();
        //     setUserData(updatedUser);
        //     // upon success, remove book's id from localStorage
        //     removeBookId(bookId);
        // } catch (err) {
        //     console.error(err);
        // }
    

    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Viewing saved books!</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {savedBooks.length
                        ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
                        : 'You have no saved books!'}
                </h2>
                <CardColumns>
                    {loading === false ?savedBooks.map((book) => {
                        return (
                            <Card key={book.bookId} border='dark'>
                                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                                        Delete this Book!
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    }):""}
                </CardColumns>
            </Container>
        </>
    );
};

export default SavedBooks;
