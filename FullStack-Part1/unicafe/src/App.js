import React, { useState } from 'react';

const Statistics = ({ text, score }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{score}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const setToValue = (setScore, newValue) => {
    setScore(newValue);
  };
  const totalScore = good + bad + neutral
  const averageSore = (good - bad)/ totalScore
  const percentagePositive = (good / totalScore ) * 100 + '%'
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setToValue(setGood, good + 1)}>Good</button>
      <button onClick={() => setToValue(setNeutral, neutral + 1)}>Neutral</button>
      <button onClick={() => setToValue(setBad, bad + 1)}> Bad</button>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistics text='good' score={good} />
          <Statistics text='neutral' score={neutral} />
          <Statistics text='bad' score={bad} />
          <Statistics text='all' score={totalScore} />
          <Statistics text='average' score={averageSore} />
          <Statistics
            text='positive'
            score={percentagePositive}
          />
        </tbody>
      </table>
    </div>
  );
};

export default App