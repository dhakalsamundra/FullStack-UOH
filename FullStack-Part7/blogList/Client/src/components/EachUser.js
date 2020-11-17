import React from 'react'

const EachUser = ({ name, blogs }) => {
  if (!name) {
    return null
  }
  console.log('this is the name of the user', name)

  return (
    <div>
      <h1>{name}</h1>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <p>{blog.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EachUser