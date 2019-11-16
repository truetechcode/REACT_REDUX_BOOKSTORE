const initialState = [];

const books = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_BOOKS':
      return [...action.books]

    case 'CREATE_REQUEST':
      return [...state]

    case 'CREATE_SUCCESS':
      return [...state, {id: action.book.id, title: action.book.title, category: action.book.category}]

    case 'CREATE_FAILURE':
      return [...state]
            
    default:
      return state;
  }
}

export default books;