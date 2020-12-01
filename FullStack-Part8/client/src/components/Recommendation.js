import React from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";
import Spinner from "./Spinner";

const Recommendation = ({ show }) => {
  const result = useQuery(ALL_BOOKS);



  if (!show) {
    return null;
  }
  if (result.loading) {
    return <Spinner />;
  } else if (!result.data) {
    return <div>No book available.</div>;
  }
  const books = result.data.allBooks
  console.log('books', books)


  return (
    <div>
      <h2>Recommendations</h2>
    </div>
  );
};

export default Recommendation;
