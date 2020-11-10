import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'

const CreateNew = ({ addNew, setNotification }) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      setNotification(`A New Anecdote ${content.value} created.`)
      console.log('this is a content', content.value)
      setTimeout(() => {
          setNotification('')
      }, 5000)
      history.push('/')

    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            url for more info
            <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  
  }
  export default CreateNew