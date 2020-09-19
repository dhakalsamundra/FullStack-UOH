import React from 'react'


const Country = ( {search}) => {
    const [showingDetails, setShowingDetails] = React.useState(false)

    return(
        <ul>
        {search.map((country,id)=><li key={id}>{country.name}{<button onClick={()=>
        setShowingDetails(!showingDetails)}>{showingDetails ? 'hide' : 'show'}</button>}{showingDetails ? country.capital : null}</li>)}
        </ul>
    )
}

  export default Country