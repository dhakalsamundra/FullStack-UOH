import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }

// modules can have several named exports
export const useCountry = (name) => {
  const [country, setCountry ] = useState(null)

  useEffect(() => {
      if(name.length === 0){
          return setCountry(null)
      }

    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    const findCountry = async () => {
        try{
            const res = await axios.get(url)
            setCountry({ data: res.data[0], found: true})
        } catch (error){
            setCountry({ found: false})
        }
    }
    findCountry()
  }, [ name ])
  return country
}
