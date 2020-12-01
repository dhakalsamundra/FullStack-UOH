import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries'
import Spinner from './Spinner';

const Book = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const [ filter, setFilter ] = useState('')

  if (!show) {
    return null;
  }
  if (result.loading)  {
    return <div><Spinner /></div>
  }
  const books = result.data.allBooks
  const filteredBook = () => {
    if(filter === 'reset') return books
    else if (filter === '') return books
    const result = books.filter((book) => book.genres.includes(filter))
    return result
  }

  const genres = () => {
    const samundra = books.map(b=> b.genres)
    const sam = [ ...samundra].flat()
      return sam
  }
  const handleFilter = (genre) => {
    setFilter(genre)
  }
    return (
      <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>published</th>
            <th>name</th>
          </tr>
          {filteredBook().map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.published}</td>
              <td>{b.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres().map(genre => (
        <button onClick={() => handleFilter(genre)}>{genre}</button>
      )
      )}
      <button onClick={() => handleFilter('reset')}>books</button>
    </div>
    )
  }

  export default Book