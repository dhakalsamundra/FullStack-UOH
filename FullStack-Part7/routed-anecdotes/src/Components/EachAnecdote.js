import React from 'react'

const EachAnecdote = ({ data }) => {
    return(
        <div>
            <h1>{data.content} by {data.author}</h1><br/>
    <p>has {data.votes}</p>
    <br/>
    <a href={data.info} target='blank'>Click for more Information.</a>
        </div>
    )
}

export default EachAnecdote