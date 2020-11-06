import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Button = ( props,element) => {
  element = props.element

  const handleClick = (element) => {
    props.vote(element);
    props.setNotification((`You had vote ${element.content}`, 5));
  };

  return <button onClick={()=>handleClick(element)}>Vote</button>;
};

export default connect(
  null, 
  {vote, setNotification}
)(Button)
