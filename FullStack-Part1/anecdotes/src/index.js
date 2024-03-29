import React, { useState } from "react";
import ReactDOM from "react-dom";


const AnecdotesDay = ({ data, index }) => {
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[index]}</p>
      <p>Has {data[index]} votes</p>
    </div>
  );
};

const TopAnecdote = ({ data }) => {
  const topVote = Math.max(...data);
  const topAne = data.findIndex((value) => {
    return topVote === value;
  });
  if (topVote === 0) {
    return (
      <div>
        <p>Not Enough Vote to preview Anecdote of the day</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[topAne]}</p>
      <p>Has {topVote}</p>
    </div>
  );
};

const App = ({ anecdotes }) => {
  const randomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const [selected, setSelected] = useState(randomNumber());
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const nextAction = () => {
    setSelected(randomNumber());
  };

  const voteAction = () => {
    const newVotes = [...points];
    newVotes[selected] += 1;
    setPoints(newVotes);
  };

  return (
    <div>
      <AnecdotesDay data={points} index={selected} />
      <button onClick={nextAction}>Next</button>
      <button  onClick={voteAction}>Vote</button>
      <TopAnecdote data={points} />
    </div>
  );
};

const anecdotes = [
  "Adding manpower to a late software project makes it later!",
  "The best way to get a project done faster is to start sooner",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Even the best planning is not so omniscient as to get it right the first time.",
  "How does a project get to be a year late?... One day at a time.",
  "Every good work of software starts by scratching a developer's personal itch",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
