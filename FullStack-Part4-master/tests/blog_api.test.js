const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Blog model', () => {
  describe('GET requests', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are four blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('POST requests', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
      const contents = blogsAtEnd.map(n => n.title)
      expect(contents).toContain(
        'Type wars'
      )
    })

    test('if likes property is missing, it will get value 0', async() => {
      const newBlog = {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(n => n.likes)
      expect(likes).not.toContain(undefined)
    })

    test('if backend responds with 400 if title and url are missing', async() => {
      const newBlog = {
        author: 'Samundra',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const response = await helper.blogsInDb()
      expect(response).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('PUT requests', () => {
    test('succeeds with valid data', async () => {
      // Update the blog from 120 to 125 likes.
      const blogsAtStart = await helper.blogsInDb()
      const blog = '5f7d91832f69e1a09f099260'
      const updateBlog = { likes: 20 }

      const updatedBlog = await api
        .put(`/api/blogs/${blog}`)
        .send(updateBlog)
        .expect(200)
      expect(updatedBlog.body.likes).toBe(20)
    })
  })

  describe('DELETE requests', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const author = blogsAtEnd.map(r => r.author)
      expect(author).not.toContain(blogToDelete.author)
    })
  })
})

// describe('User model', () => {
//   describe('GET requests', () => {
//     beforeEach(async () => {
//       await User.deleteMany({})
//       const user1 = new User({ username: 'user1', password: 'password1' })
//       const user2 = new User({ username: 'user2', password: 'password2' })
//       const user3 = new User({ username: 'user3', password: 'password3' })
//       await user1.save()
//       await user2.save()
//       await user3.save()
//     })

//     test('users are returned as json', async () => {
//       await api
//         .get('/api/users')
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//     })

//     test('there are three users', async () => {
//       const response = await api.get('/api/users')
//       expect(response.body.length).toBe(3)
//     })

//     test('the unique identifier property of the user is named id', async () => {
//       const response = await api.get('/api/users')
//       expect(response.body[0].id).toBeDefined()
//     })
//   })

//   describe('POST requests', () => {
//     beforeEach(async () => {
//       await User.deleteMany({})
//       const user = new User({ username: 'root', password: 'sekret' })
//       await user.save()
//     })

//     test('creation succeeds with a fresh username', async () => {
//       const usersAtStart = await helper.usersInDb()

//       const newUser = {
//         username: 'SamDha',
//         name: 'Samundra Dhakal',
//         password: 'SamDha',
//       }

//       await api
//         .post('/api/users')
//         .send(newUser)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//       const usersAtEnd = await helper.usersInDb()
//       expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

//       const usernames = usersAtEnd.map(u => u.username)
//       expect(usernames).toContain(newUser.username)
//     })

//     test('creation fails with proper statuscode and message if username already taken', async () => {
//       const usersAtStart = await helper.usersInDb()

//       const newUser = {
//         username: 'SamDha',
//         name: 'Sandesh Dhakal',
//         password: 'SanDha',
//       }

//       const result = await api
//         .post('/api/users')
//         .send(newUser)
//         .expect(400)
//         .expect('Content-Type', /application\/json/)

//       expect(result.body.error).toContain('`username` to be unique')

//       const usersAtEnd = await helper.usersInDb()
//       expect(usersAtEnd.length).toBe(usersAtStart.length)
//     })

//     test('creation fails if username is smaller than 3 characters', async () => {
//       const usersAtStart = await helper.usersInDb()

//       const newUser = {
//         username: 'SD',
//         name: 'Samundra Dhakal',
//         password: 'SamDha',
//       }

//       const result = await api
//         .post('/api/users')
//         .send(newUser)
//         .expect(400)
//         .expect('Content-Type', /application\/json/)

//       expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

//       const usersAtEnd = await helper.usersInDb()
//       expect(usersAtEnd.length).toBe(usersAtStart.length)
//     })

//     test('creation fails if password is smaller than 3 characters', async () => {
//       const usersAtStart = await helper.usersInDb()

//       const newUser = {
//         username: 'SamDha',
//         name: 'Samundra Dhakal',
//         password: 'sa',
//       }

//       const result = await api
//         .post('/api/users')
//         .send(newUser)
//         .expect(400)

//       const usersAtEnd = await helper.usersInDb()
//       expect(usersAtEnd.length).toBe(usersAtStart.length)
//     })
//   })
// })

afterAll(() => {
  mongoose.connection.close()
})