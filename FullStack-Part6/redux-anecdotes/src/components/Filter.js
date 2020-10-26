import React from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { searchTerm, removeSearchTerm } from '../reducers/filterReducer';

const DisplayFIlter = () => {
  const filteredData = useSelector(({ data, filteredData }) => {
    if (filteredData === null) {
      return [];
    }
    return data.filter((element) =>
    element.content.toLowerCase().includes(filteredData.toLowerCase())
    );
  });

  return (
    <div>
      {filteredData.map((element) => (
        <div key={element.id}>
          {element.content} has {element.votes} votes
          <Button element={element} />
        </div>
      ))}
    </div>
  );
};

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;

    if (!value.length) {
      return dispatch(removeSearchTerm());
    }
    dispatch(searchTerm(value));
  };

  return (
    <div>
      <label>Filter</label>: <input onChange={handleChange} />
      <DisplayFIlter />
    </div>
  );
};

export default Filter;
