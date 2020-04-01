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
    currentlyReading:[],
    wantToRead:[],
    read:[],
    query:'',
    searchedBooks:[]
  }
  componentDidMount(){
    BooksAPI.getAll().then((allBooks)=>{
      console.log(allBooks)
      this.setState({
        allBooks:allBooks,
        currentlyReading:allBooks.filter((book) => book.shelf === 'currentlyReading'),
        wantToRead:allBooks.filter((book) => book.shelf === 'wantToRead'),
        read:allBooks.filter((book) => book.shelf === 'read'),
      })
    })

    BooksAPI.get("OCFKdl3wEDIC").then((book)=>console.log(book))
  }
  searchBooks=(query)=>{
    var arr=[]

    BooksAPI.search(query).then((searchedBooks)=>{

      if(searchedBooks && !searchedBooks.error){
        searchedBooks.map((book)=>{
          arr.push(BooksAPI.get(book.id).then(book=>book))
        })
        Promise.all(arr).then((books=>{
          this.setState({
            searchedBooks:books
          })
        })
          
        )
        
      }
      else{
        this.setState({
          searchedBooks:[]
        })
      }
      
    })
  }
  changeShelf=(book,shelf)=>{
    BooksAPI.update(book,shelf).then((allBooks)=>{
      BooksAPI.getAll().then((books)=>{
        this.setState({
        currentlyReading:books.filter((book) => book.shelf === 'currentlyReading'),
        wantToRead:books.filter((book) => book.shelf === 'wantToRead'),
        read:books.filter((book) => book.shelf === 'read'),
        })
      })
    })
  }
  clearSearchedBooks=()=>{
    this.setState({
      searchedBooks:[]
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={(routerProps)=><div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf changeShelf={this.changeShelf} shelf={{text:'Currently Reading',value:'currentlyReading'}} books={this.state.currentlyReading}/>
                <BookShelf changeShelf={this.changeShelf} shelf={{text:'Want to Read',value:'wantToRead'}} books={this.state.wantToRead}/>
                <BookShelf changeShelf={this.changeShelf} shelf={{text:'Read',value:'read'}} books={this.state.read}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => routerProps.history.push('search')}>Add a book</button>
            </div>
          </div>}/>
        <Route path='/search' render={(routerProps)=><SearchBooks clearSearchedBooks={this.clearSearchedBooks} changeShelf={this.changeShelf} searchBooks={this.searchBooks} allBooks={this.state.searchedBooks} query={this.state.query} {...routerProps}/>}/>
      </div>
    )
  }
}

export default BooksApp
