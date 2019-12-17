import React, { Component } from 'react';
import { createBook } from '../actions/index';
import { connect } from "react-redux";
import '../BooksForm.css'

class BooksForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      category: 'Action'
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    let { title, category } = this.state;
    if (title.length !== 0 && category.length !== 0) {
      this.props.saveBook(this.state);
    } else {
      alert('YOU MUST SUBMIT "TITLE" + "CATEGORY" TO SAVE');
    }

    this.setState({
      title: '',
      category: 'Action'
    });
    e.preventDefault();
  };

  render() {
    const { title, category } = this.state;
    const CATEGORIES = ["Action", "Biography", "History", "Horror", "Kids", "Learning", "Sci-Fi"]
    return (
      <form>
      <label className="title">ADD NEW BOOK</label>
      <div>
        <input className="input-title" type="text" value={title} name="title" onChange={this.handleChange.bind(this)} placeholder="Enter Book Title" required={true} autoFocus={true} />
        <select className="input-category" value={category} name="category" onChange={this.handleChange.bind(this)}>
          <option value='default'> Select Book Category</option>
          {
            CATEGORIES.map((category, index) => {
              return (
                <option key={index} value={category}>{category}</option>
              )
            })
          }
        </select>
        <button className="submit-button" type="submit" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveBook: (book) => dispatch(createBook(book))
  };
};

export default connect(null, mapDispatchToProps)(BooksForm)
