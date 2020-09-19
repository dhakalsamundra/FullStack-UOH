import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'

const Nation = () => {
    const [country, setCountry] = useState([])
    const [newSearch, setNewSearch] = useState('')
    
    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => setCountry(response.data))   }, [])

    const changeCountry = (e) => {
        setNewSearch(e.target.value)
    }

    const filterCountries = country.filter((country) => country.name.toLowerCase().includes(newSearch.toLowerCase()))

    return(
        <>
        <> Search: <input value={newSearch} onChange={changeCountry} /></><br/>

        <h1>Nations:</h1>
        {newSearch && <Country search =  {filterCountries} />}</>
        )
    }
export default Nation
