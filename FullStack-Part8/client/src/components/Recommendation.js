import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";

import { ALL_BOOKS } from "../queries";
import Spinner from "./Spinner";

const Recommendation = ({ show,}) => {
  const [user, setUser] = useState(null);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <Spinner />;
  } else if (!result.data) {
    return <div>No book available.</div>;
  }
  const books = result.data.allBooks;


  const data = () => {
    if (user) {
      const userData = jwt_decode(user).genre;
      return userData;
    }
  };
  const finalOutput = data();
  const recommendedBooks = books.filter((book) =>
    book.genres.includes(finalOutput)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Published</th>
            <th>Author</th>
          </tr>
          { recommendedBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.published}</td>
              <td>{b.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
