import React from 'react';
import "../Book.css";

function Book(props) {
  const {title, category } = props.book;
  return (
    <div className="Lesson-Panel">
      <div className="title">{title}</div>
      <div className="category">{category}</div>
      <button className="delete-button" onClick={() => props.onClick(id)}> Remove Book </button>
    </div>
  )
}

export default Book;
