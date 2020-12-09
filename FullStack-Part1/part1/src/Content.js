import React from "react";

const Content = props => {
  return (
    <div>
      {props.parts.map(data => (
        <p key={data.name}>{data.name} {data.exercises}</p>
      ))}
    </div>
  );
};

export default Content;
