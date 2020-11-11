import React, { useState } from "react";
import { useRouteMatch, Switch, Route, Redirect} from "react-router-dom";

import About from "./Components/About";
import CreateNew from "./Components/AddAnecdotes";
import AnecdoteList from "./Components/Anecdotes";
import EachAnecdote from "./Components/EachAnecdote";
import Notification from './Components/Notification'

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
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
      if(anecdote){
    anecdote.id = Number((Math.random() * 10000).toFixed(0));
    setAnecdotes(anecdotes.concat(anecdote));
  } else {
    setNotification('Please fill the data before creating..')
    setTimeout(() => {
        setNotification('')
    }, 5000)
  }
  }
//   const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

//   const vote = (id) => {
//     const anecdote = anecdoteById(id);

//     const voted = {
//       ...anecdote,
//       votes: anecdote.votes + 1,
//     };

//     setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
//   };

  const match = useRouteMatch('/anecdotes/:id');
  const data = match
    ? anecdotes.find((ane) => ane.id === Number(match.params.id))
    : null;

  return (
    <Switch>
      <Route exact path="/">
        <Notification notification={notification} />
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
      <Route exact path="/create">
        <CreateNew addNew={addNew} setNotification={setNotification}/>
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/anecdotes/:id">
        {data ? <EachAnecdote data={data} /> : <Redirect to='/'></Redirect>}
      </Route>
    </Switch>
  );
};

export default Routes;
