import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.js";
import Content from "./Content.js";
import Total from "./Total.js";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ];

  const exe1 = parts[0].exercises
  const exe2 = parts[1].exercises
  const exe3 = parts[2].exercises
  const totalExercise = exe1 + exe2 + exe3

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={totalExercise} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
