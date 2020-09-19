import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/notification';
import './App.css';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 150
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>PhoneBook, Developed by Er. Dhakal Samundra, 2020</em>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const filterSearch = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch)
  );

  useEffect(() => {
    personService.getAll().then(initialPeoples => setPersons(initialPeoples));
  }, []);

  const rows = filterSearch.map((person, id) => (
    <Persons
      key={id}
      person={person}
      deletePerson={() => deletePersonEntry(person.id)}
    />
  ));

  //deleting a person entry
  const deletePersonEntry = id => {
    const contactToDelete = persons.find(person => person.id === id);

    if (window.confirm(`Do you want to delete ${contactToDelete.name}?`)) {
      personService
        .deleteContact(id)
        .then(deletedContact => {
          setPersons(persons.filter(person => person.id !== contactToDelete.id));
          setSuccessMessage(
            `${contactToDelete.name} is deleted from the database`
          );

          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(
            `${contactToDelete.name} was already deleted from server`
          );
          setPersons(
            persons.filter(person => person.id !== contactToDelete.id)
          );

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };
  // Add new contact or update contact
  const addContact = e => {
    e.preventDefault();
    const addPerson = {
      name: newName,
      number: newNumber
    };

    const person = persons.find(person => person.name === newName);
    const changedPerson = { ...person, number: newNumber };

    if (typeof person === 'undefined') {
      personService
        .create(addPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');

          setSuccessMessage(`${addedPerson.name} has been added to phonebook`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNewNumber('');
          setNewName('');
          setErrorMessage(error.response.data)
          /*setErrorMessage(err.response.data.err);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);*/
        });
    } else {
      if (
        window.confirm(
          `${changedPerson.name} already exists in phonebook. Do you want to replace the the contact?`
        )
      ) {
        personService
          .update(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== changedPerson.id ? person : updatedPerson
              )
            );
            setNewName('');
            setNewNumber('');

            setSuccessMessage(
              `${changedPerson.name} has been updated with new number`
            );

            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch(err => {
            setErrorMessage(err.response.data.err);
          });
      }
    }
  };

  const changeName = e => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };
  const changeNumber = e => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };
  const handleSearchChange = e => {
    console.log(e.target.value);
    setNewSearch(e.target.value);
  };

  return (
    <>
      <h2>PhoneBook</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <>
        Search By Name: <input value={newSearch} onChange={handleSearchChange} />
      </>
      <form onSubmit={addContact}>
        <h1>Phonebook:</h1>
        <>
          Name:
          <input value={newName} onChange={changeName} />
        </>
        <br />
        <br />
        <>
          {' '}
          Number:
          <input value={newNumber} onChange={changeNumber} />
        </>
        <br />
        <br />
        <div>
          <button type='submit' className='bottom'>
            Add
          </button>
        </div>
        <br />
      </form>
      <>
        <h1>Lists of Contacts:</h1>
        {rows}
        <br />
        <br />
        <Footer />
      </>
    </>
  );
};

export default App;
