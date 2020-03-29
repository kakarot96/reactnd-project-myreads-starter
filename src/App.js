import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks : []
  }
  componentDidMount(){
    BooksAPI.getAll().then((allBooks)=>{
      this.setState({
        allBooks:allBooks
      })
    })
  }
  render() {
    const currentlyReading = this.state.allBooks.filter((book) => book.shelf === 'currentlyReading');
    const wantToRead = this.state.allBooks.filter((book) => book.shelf === 'wantToRead');
    const read = this.state.allBooks.filter((book) => book.shelf === 'read');


    return (
      <div className="app">
        <Route exact path='/' render={(routerProps)=><div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {console.log(this.state.allBooks)}
            <div className="list-books-content">
              <div>
                <BookShelf shelf='Currently Reading' books={currentlyReading}/>
                <BookShelf shelf='Want to Read' books={wantToRead}/>
                <BookShelf shelf='Read' books={read}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => routerProps.history.push('search')}>Add a book</button>
            </div>
          </div>}/>
        <Route path='/search' render={(routerProps)=> <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={routerProps.history.goBack}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          }/>
      </div>
    )
  }
}

export default BooksApp
