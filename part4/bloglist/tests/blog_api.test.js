const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

let token = ''

const logIn = async (userIndex) => {
  const response = await api.post('/api/login').send({
    username: helper.initialUsers[userIndex].username,
    password: helper.initialUsers[userIndex].password
  })
  token = response.body.token
}

const logOut = () => {
  token = ''
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Promise.all(helper.initialUsers.map(async (user, userIndex) => {
    await api.post('/api/users').send(user)
      .set('Authorization', `bearer ${token}`)
    await logIn(userIndex)
    await Promise.all(helper.initialBlogs[userIndex].map(async (blog, blogIndex) => {
      await api.post('/api/blogs').send(blog)
        .set('Authorization', `bearer ${token}`)
    }))
    await logOut(userIndex)
  }))
  await logIn(0)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
    .set('Authorization', `bearer ${token}`)
  let length = 0
  helper.initialBlogs.forEach(blogs => length += blogs.length)
  expect(response.body).toHaveLength(length)
})

test('a blog has an id property', async () => {
  const response = await api.get('/api/blogs')
    .set('Authorization', `bearer ${token}`)
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'https://www.blog2.com/',
    likes: 27
  }
  await api.post('/api/blogs').send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('Blog 2')
})

test('a blog defaults to 0 likes when added', async () => {
  const newBlog = {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'https://www.blog2.com/'
  }
  const result = await api.post('/api/blogs').send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  expect(result.body.likes).toBe(0)
})

test('a blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Author 2',
    likes: 27
  }
  await api.post('/api/blogs').send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a user without a username or password is not added', async () => {
  const newUser = {
    name: 'New User'
  }
  await api.post('/api/users').send(newUser)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})