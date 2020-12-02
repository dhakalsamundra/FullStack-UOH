import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Spinner from './Spinner';

const Authors = ({ show, token, notify }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ editBirth ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => notify(error.message)
  })
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null;
  }
  if (result.loading)  {
    return <div><Spinner /></div>
  }
  const authors = result.data.allAuthors

  const options = authors.map(a => {
    return { value: a.name, label: a.name}
  })
  const handleChange = selectedOption => {
    setName(selectedOption.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setName('')
    setYear('')
    await editBirth({
      variables: { name, year:Number(year)}
    })
  }
    return (
      <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { token ? (
        <div>
          <p>Add Birth Date</p>
          <form onSubmit={onSubmit}>
            <div>
              <Select isSearchable onChange={handleChange} options={options} />
            </div>
            <div>
              Birth Date
              <input value={year} onChange={({ target }) => setYear(target.value)} />
            </div>
            <button type='submit'>Add Year</button>
          </form>
        </div>
      ) : null }
    </div>
    )
  }

  export default Authors