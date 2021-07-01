import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = (book) => {
  
  return (
    <div>
          <div key={book.bookId} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {book.title} <br />
              <span style={{ fontSize: '1rem' }}>
                 by {book.author}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{book.description}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              href={`${book.link}`}
            >
            </Link>
          </div>
    </div>
  );
};

export default BookCard;
