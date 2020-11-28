import React from 'react'
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries'
import Spinner from './Spinner';

const Persons = ({ show }) => {
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null;
  }
  if (result.loading)  {
    return <div><Spinner /></div>
  }
  const books = result.data.allBooks
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
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.published}</td>
              <td>{a.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }

  export default Persons