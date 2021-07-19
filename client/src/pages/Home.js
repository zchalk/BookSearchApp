import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import Auth from '.../utils/Auth';
import { googleBooks } from '../utils/google'
import BookCard from '../components/BookCard';



import { SAVE_BOOK } from '../utils/mutations';

const Home = () => {
  const [searchResults, setsearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if(!searchInput) {
      return Error('Please enter a book title')
    }
    try {
      const response = await googleBooks(searchInput);
      if (!response.ok) {
        throw Error('Google has failed');
      }
      const data = await response.json();
      const books = data.items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors[0],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        link: book.volumeInfo.infoLink,
        image: book.volumeInfo.imageLinks?.thumbnail
      }));
      setsearchResults(books);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  const saveBookEvent = async (event, book) => {
    try {

      await saveBook({
        variables: {...book},
      });
  } catch (err) {
    throw err;
  }};

  return (
    <main>
      <div className="flex-row justify-center">
      <form onSubmit={handleFormSubmit}>
        <input
        className="form-input"
        placeholder="Book Title"
        name="searchTitle"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
        type= "submit">
          submit
        </button>
      </form>
      </div>
      <div className="flex-row justify-center">
        {searchResults.map((book) => {
          return (
            <BookCard key={book.bookId} saveBookEvent={saveBookEvent} book={book}/>
          )
        })}
      </div>
    </main>
  );
};

export default Home;
