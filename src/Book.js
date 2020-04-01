import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BookItem = props => {
    const [selected,setSelected] = useState(props.book.shelf)
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193,
                 backgroundImage: `url(${props.book.imageLinks?props.book.imageLinks.smallThumbnail:null})`}}></div>
                <div className="book-shelf-changer">
                    <select value={selected} onChange={(event)=>{setSelected(event.target.value) ;props.changeShelf(props.book,event.target.value)}}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors && props.book.authors[0]}</div>
        </div>
    );
};

BookItem.propTypes = {
    book:PropTypes.object.isRequired,
    shelf:PropTypes.object
};

export default BookItem;