const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5e98061c84cc120a0d6d7fad',
    title: 'Murphy Law Defination',
    author: 'Samundra',
    url: 'https://en.wikipedia.org/wiki/Murphy%27s_law',
    likes: 20,
    __v: 0
  },
  {
    _id: '5e980aa937dbb30b51ce6e27',
    title: 'Featuring the HomeSense',
    author:'Sandhya',
    url:'https://www.capturebylucy.com/blog',
    likes:120,
    __V: 0
  },
  {
    _id: '5e980af337dbb30b51ce6e28',
    title: 'Interior Designing',
    author: 'Sandesh',
    url: 'https://www.thegoodtrade.com/',
    likes: 120,
    __v: 0
  },
  {
    _id: '5e9825155bb9db121455fb0c',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5e9825335bb9db121455fb0d',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5e9825475bb9db121455fb0e',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5e98255a5bb9db121455fb0f',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5e9825685bb9db121455fb10',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  }
]

const nonExixtingId = async () => {
  const blog = new Blog({ title: 'Sachin Tendulkar' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExixtingId, blogsInDb, usersInDb
}