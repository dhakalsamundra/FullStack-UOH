import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Form = (props) => {
  const style = {
    marginBottom: 10,
  };
  const handleForm = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.addAnecdote(content)
    // dispatch(setNotification(`${content} added to the list`), 5);
    props.setNotification((`${content} added to the list`), 5);
  };

  return (
    <div style={style}>
      <h2>Create New</h2>
      <form onSubmit={handleForm}>
        <input name='anecdote' />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default connect(
  null, 
  {addAnecdote, setNotification}
)(Form)
