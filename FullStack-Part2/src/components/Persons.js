import React from 'react';

const Persons = ({ person, deletePerson }) => {
  return (
    <li className='individual'>
      {person.name} - {person.number}
      <button onClick={deletePerson}>Delete</button>
    </li>
  );
};
export default Persons;
