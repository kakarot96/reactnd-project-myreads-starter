import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    allBooks:[],
    query:'',
    searchedBooks:[]
  }
  componentDidMount(){
    BooksAPI.getAll().then((allBooks)=>{
      this.setState({allBooks:allBooks,
      })
  })}
  changeShelf=(book,shelf)=>{
    BooksAPI.update(book, shelf).then((res) => {
      book.shelf = shelf
      this.setState(() => ({
        allBooks: this.state.allBooks.filter((oldBook) => {
          return oldBook.id !== book.id
        }).concat([book])
      }))
    })
  }
  searchBooks=(query)=>{
    BooksAPI.search(query).then((searchResult)=>{
      if(searchResult && searchResult.length>0){
        searchResult.map(book=>{
          let currBook = this.state.allBooks.filter((b)=>book.id===b.id)
          if(currBook.length>0)book.shelf=currBook[0].shelf
          return book
        })
        this.setState({
          searchedBooks:searchResult
        })
      }
      else{
        this.setState({
          searchedBooks:[]
        })
      }
    })
  }

  clearSearchedBooks=()=>{
    this.setState({
      searchedBooks:[]
    })
  }
  render() {
    const currentlyReading = this.state.allBooks.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = this.state.allBooks.filter((book) => book.shelf === 'wantToRead')
    const read = this.state.allBooks.filter((book) => book.shelf === 'read')
    const searchedBooks = this.state.searchedBooks

    return (
      <div className="app">
        <Route exact path='/' render={(routerProps)=><div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf changeShelf={this.changeShelf} shelf='Currently Reading' books={currentlyReading}/>
                <BookShelf changeShelf={this.changeShelf} shelf='Want to Read' books={wantToRead}/>
                <BookShelf changeShelf={this.changeShelf} shelf='Read' books={read}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => routerProps.history.push('search')}>Add a book</button>
            </div>
          </div>}/>
        <Route path='/search' render={(routerProps)=><SearchBooks clearSearchedBooks={this.clearSearchedBooks} changeShelf={this.changeShelf} searchBooks={this.searchBooks} allBooks={searchedBooks} query={this.state.query} {...routerProps}/>}/>
      </div>
    )
  }
}

export default BooksApp
