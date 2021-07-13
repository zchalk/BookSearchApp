import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import BookCard from '../components/BookCard';
import Auth from '../utils/auth';


import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME} from '../utils/queries'

const SavedBooks = () => {

  const { loading, error, data } = useQuery(GET_ME);
  console.log(data?.me.savedBooks.title);
//   const [removeBook, { error }] = useMutation(REMOVE_BOOK);

 
  
  return (

    < div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
      {Auth.getProfile().data.username}'s books:
      </h3>
    { loading?  <div>Loading...</div>:
      data?.me.savedBooks.map((book) => {
          return (<BookCard key={book.bookId}  book={book}/>)
      })}
    </div>
  );
};

export default SavedBooks;
