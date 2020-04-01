import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './Book'
const BookShelf = props => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf?props.shelf.text:null}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        !props.books.error && props.books.map((book) => (
                            <li key={book.title}>
                                <BookItem book={book} {...props}/>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    shelf:PropTypes.object,
    books:PropTypes.array.isRequired,
    changeShelf:PropTypes.func
};

export default BookShelf;