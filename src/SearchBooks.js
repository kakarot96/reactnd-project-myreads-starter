import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const SearchBooks = props => {
    const [query,setQuery] = useState('')

    const handleOnInputChange=(value)=>{
                setQuery(value)
                props.searchBooks(value)
        
    }    
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={()=>{props.clearSearchedBooks();props.history.goBack()}}>Close</button>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" 
                    onChange={(event)=>handleOnInputChange(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {console.log(props.allBooks)}
                    <BookShelf changeShelf={props.changeShelf} shelf={{value:'none'}} books={props.allBooks}/>
                </ol>
            </div>
        </div>
    );
};

SearchBooks.propTypes = {
    
};

export default SearchBooks;