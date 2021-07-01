import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '.../utils/Auth';
import { googleBooks } from '../utils/google'
import BookCard from '../components/BookCard';



import { SAVE_BOOK } from '../utils/queries';

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
      const books = response.json().map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail
      }));
      setsearchResults(books);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

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
        onChange={handleChange}
        />
      </form>
      </div>
      <div className="flex-row justify-center">
        {searchResults.map((book) => {
          return (
            <BookCard key={book.bookId}/>
          )
        })}
      </div>
    </main>
  );
};

export default Home;
