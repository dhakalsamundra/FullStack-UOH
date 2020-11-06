import React from 'react';
import Button from './Button';
import { connect, useSelector } from 'react-redux';
import { searchTerm, removeSearchTerm } from '../reducers/filterReducer';

const DisplayFilter = () => {
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

const Filter = (props) => {

  const handleChange = (event) => {
    const value = event.target.value;

    if (!value.length) {
      return props.removeSearchTerm();
    }
    props.searchTerm(value);
  };

  return (
    <div>
      <label>Filter</label>: <input onChange={handleChange} />
      <DisplayFilter />
    </div>
  );
};

export default connect(
  null, 
  {searchTerm, removeSearchTerm}
)(Filter)

