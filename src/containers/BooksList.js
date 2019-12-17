import React from 'react'
import { connect } from "react-redux";
import Book from "../components/Book";
import BooksForm from "../containers/Booksform";
import CategoryFilter from "../components/CategoryFilter";
import { removeMessage, removeBook, changeFilter, loadBooks } from '../actions/index';
import PropTypes from 'prop-types'
import '../BooksList.css'


class BooksList extends React.Component {
  
  UNSAFE_componentWillReceiveProps(props) {
    const { message } = this.props;
    if (props.message !== message) {
      this.fetchBooks()
      this.props.clearState()
    }
  }

  handleFilterChange = (e) => {
    let filter = e.target.value;
    this.props.changeFilter(filter)
  }

  fetchBooks = () => {
    fetch('https://boiling-ravine-66715.herokuapp.com/api/v1/books')
    .then(
      response => {
        if (!response.ok) {
          return Promise.reject(response.statusText);                  
        }
        return response.json();
      }
    ).then( res => this.props.loadBooks(res))
    .catch(error => console.log(error))
  }

  componentDidMount = () => {
    this.fetchBooks()
  }

  render(){
    return (
      <>
        <div className="header">
          <div className="header-title">BS</div>
          <div className="book-filter">
            <CategoryFilter handleChange={this.handleFilterChange} />
          </div>
        </div>
        <div><p>{this.props.message}</p></div>
        <BooksForm />
        <div className="book-list">
          {
            this.props.filteredBooks.map((book, index) => {
              return (
                <Book key={index} index={index} book={book} onClick={this.props.removeBook} />
              )
            })
          }
        </div>
    </>
    )  
  }
}

const mapStateToProps = state => {
  return {
    filteredBooks: state.books.filter((book) => book.category === state.filter || state.filter === ''),
    message: state.remove,
  }
};


const mapDispatchToProps = dispatch => {
  return {
    removeBook: (bookIndex) => dispatch(removeBook(bookIndex)),
    changeFilter: (category) => dispatch(changeFilter(category)),
    loadBooks: (books) => dispatch(loadBooks(books)),
    clearState: () => {
      setTimeout(() => {
        dispatch(removeMessage())
      }, 2000);
    }
  }
}

BooksList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    }).isRequired
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList)
