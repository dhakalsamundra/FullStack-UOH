import React from 'react'
import { useHistory } from 'react-router-dom'
import  { useField } from '../hooks'


const CreateNew = ({ anecdotes, setAnecdotes, setNotification }) => {
    const {  ...content } = useField('text')
    const {  ...author } = useField('text')
    const {  ...info } = useField('text')

    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const addNew = {
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      }
      addNew.id = Number((Math.random() * 10000).toFixed(0))
      setAnecdotes(anecdotes.concat(addNew))
      setNotification(`A New Anecdote ${content.value} created.`)
      setTimeout(() => {
          setNotification('')
      }, 5000)
      history.push('/')

    }

    const handleClear = () => {
        content.reset('')
        author.reset('')
        info.reset('')
      };
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content:
            <input
            value={content.value} 
            type={content.type}
            onChange={content.onChange}
            />
          </div>
          <div>
            author:
            <input
            value={author.value} 
            type={author.type}
            onChange={author.onChange}
            />
          </div>
          <div>
            url for more info:
            <input
            value={info.value} 
            type={info.type}
            onChange={info.onChange}
            />
          </div>
          <button type="submit">create</button>
          <button type="button" onClick={handleClear}>reset</button>
        </form>
      </div>
    )
  
  }
  export default CreateNew