import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './Book'
const BookShelf = props => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                       props.books.map((book) => (
                            <li key={book.title}><BookItem book={book} /></li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    shelf:PropTypes.string,
    books:PropTypes.array
};

export default BookShelf;