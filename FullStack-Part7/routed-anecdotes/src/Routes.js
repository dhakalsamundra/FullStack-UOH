import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./Components/About";
import CreateNew from "./Components/AddAnecdotes";
import AnecdoteList from "./Components/Anecdotes";

const Routes = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Number((Math.random() * 10000).toFixed(0));
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
  return (
    <Switch>
      <Route exact path="/">
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
      <Route exact path="/create">
        <CreateNew addNew={addNew} />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
    </Switch>
  );
};

export default Routes;
