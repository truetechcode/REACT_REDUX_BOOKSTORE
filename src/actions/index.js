export const createBook = book => {

  return dispatch => {
      dispatch(request(book))
      return add(book)
      .then(response => response)
      .then(json => dispatch(success(json)))
      .catch(error => dispatch(failure(error)))
  }

  function request(book) { return { type: 'CREATE_REQUEST', book } }
  function success(book) { return { type: 'CREATE_SUCCESS', book } }
  function failure(error) { return { type: 'CREATE_FAILURE', error } }
}

export const loadBooks = books => {
  return {
    type: 'LOAD_BOOKS',
    books
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE'
  }
}

export const removeBook = (bookIndex) => {

  return dispatch => {
    dispatch(request(bookIndex))
    return remove(bookIndex)
    .then(response => response)
    .then(json => dispatch(success(json)))
    .catch(error => dispatch(failure(error)))
}

function request(message) { return { type: 'DELETE_REQUEST', message } }
function success(message) { return { type: 'DELETE_SUCCESS', message } }
function failure(error) { return { type: 'DELETE_FAILURE', error } }
}

export const changeFilter = category => {
  return {
    type: `CHANGE_FILTER`,
    category
  }
}

function add(book) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
  };

  return fetch('https://boiling-ravine-66715.herokuapp.com/api/v1/books', requestOptions).then(handleResponse);
}


function remove(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(book)
  };

  return fetch(`https://boiling-ravine-66715.herokuapp.com/api/v1/books/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
      return Promise.reject(response.statusText);
  }

  return response.json();
}
