import React from 'react';
import Button from './Button';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {

  return (
    <div>
      {props.data.map((element) => {
        return (
          <div key={element.id}>
            {element.content}<br></br>
            {element.votes} votes 
            <Button element={element} />
          </div>
        );
      })}
    </div>
  );
};


const mapStateToProps = (state) => {
  if ( state.filteredData === 'ALL' ) {
    return {
      data: state.data
    }
  }

  return {
    data: (state.filteredData  === ' ' 
    ? state.data.filter(data => data)
    : state.data.filter(data => data)
    )
  }
}

const ConnectedNotes = connect(
  mapStateToProps,
)(AnecdoteList)

export default ConnectedNotes 