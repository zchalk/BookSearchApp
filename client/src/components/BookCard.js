import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = (props) => {
  
  return (
    <div>
          <div  className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {props.book.title} <br />
              <span style={{ fontSize: '1rem' }}>
                 by {props.book.author}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{props.book.description}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              href={`${props.book.link}`}
            >
            </Link>
            <button onClick={(event)=>props.saveBookEvent(event, props.book)}>Save</button>
          </div>
    </div>
  );
};

export default BookCard;
