import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW':
      const toAdd = action.data;
      return [...state, toAdd];

    case 'VOTE':
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id === id ? action.data : anecdote
      );

    case 'INIT':
      return action.data;

    default:
      return state;
  }
};

export const addAnecdote = (data) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(data);
    dispatch({
      type: 'ADD_NEW',
      data: anecdote,
    });
  };
};

export const vote = (number) => {
  return async (dispatch) => {
    const updatedData = await anecdoteService.addVote(number);
    dispatch({
      type: 'VOTE',
      data: updatedData,
    });
  };
};

export const getAll = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

export default reducer;
