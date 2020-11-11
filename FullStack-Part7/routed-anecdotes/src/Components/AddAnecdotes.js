import React from 'react'
import { useHistory } from 'react-router-dom'
import  { useField } from '../hooks'


const CreateNew = ({ addNew, setNotification }) => {
    const {  ...content } = useField('text')
    const {  ...author } = useField('text')
    const {  ...info } = useField('text')

    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content,
        author,
        info,
        votes: 0
      })
      setNotification(`A New Anecdote ${content} created.`)
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
            reset={content.reset}
            />
          </div>
          <div>
            author:
            <input
            value={author.value} 
            type={author.type}
            onChange={author.onChange}
            reset={author.reset}
            />
          </div>
          <div>
            url for more info:
            <input
            value={info.value} 
            type={info.type}
            onChange={info.onChange}
            reset={info.reset}
            />
          </div>
          <button type="submit">create</button>
          <button type="button" onClick={handleClear}>reset</button>
        </form>
      </div>
    )
  
  }
  export default CreateNew