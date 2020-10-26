export const searchTerm = (search) => {
  return {
    type: 'SET_SEARCH',
    search,
  };
};

export const removeSearchTerm = () => {
  return {
    type: 'SET_SEARCH',
    search: null,
  };
};

const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.search;
    default:
      return state;
  }
};

export default filterReducer;
