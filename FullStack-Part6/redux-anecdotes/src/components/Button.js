import React from 'react';
import { useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Button = ({ element }) => {
  console.log('sam', element)
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(vote(element));
    dispatch(setNotification(`You had vote ${element.content}`, 5));
  };

  return <button onClick={handleClick}>Vote</button>;
};

export default Button;
