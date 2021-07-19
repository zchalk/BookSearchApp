import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import SavedBook from '../components/SavedBook';
import Auth from '../utils/auth';


import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries'

const SavedBooks = () => {

  const { loading, error, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const removeBookEvent = async (event, bookId) => {
    try {
      console.log(bookId);
      await removeBook({
        variables: {bookId}
      });
  } catch (err) {
    console.log(err);
  }};
 
  
  return (

    < div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
      {Auth.getProfile().data.username}'s books:
      </h3>
    { loading?  <div>Loading...</div>:
      data?.me.savedBooks.map((book) => {
          return (<SavedBook key={book.bookId} removeBookEvent={removeBookEvent} book={book}/>)
      })}
    </div>
  );
};

export default SavedBooks;
