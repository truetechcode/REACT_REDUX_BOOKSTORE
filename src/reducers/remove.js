const initialState = '';

const remove = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_REQUEST':
      return state

    case 'DELETE_SUCCESS':
      return action.message.message

    case 'DELETE_FAILURE':
      return state

    default:
      return state;
  }
}

export default remove;