import React from 'react';
import BookShelf from './BookShelf';
import { debounce } from 'throttle-debounce';

const SearchBooks = props => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={()=>{props.clearSearchedBooks();props.history.goBack()}}>Close</button>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" 
                    onChange={(event)=>debounce(3000,props.searchBooks(event.target.value))}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    <BookShelf changeShelf={props.changeShelf} books={props.allBooks}/>
                </ol>
            </div>
        </div>
    );
};

SearchBooks.propTypes = {
    
};

export default SearchBooks;