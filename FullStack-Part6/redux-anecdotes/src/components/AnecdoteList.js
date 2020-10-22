import React from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';

const AnecdoteList = () => {
  const data = useSelector((state) =>
    state.data.sort((a, b) => b.votes - a.votes)
  );

  return (
    <div>
      {data.map((element) => {
        return (
          <div key={element.id}>
            {element.content}<br></br>
            {element.votes} votes 
            <Button element={element} />
          </div>
        );
      })}
    </div>
  );
};

export default AnecdoteList;
