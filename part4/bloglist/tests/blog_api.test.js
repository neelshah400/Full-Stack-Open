const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a blog has an id property', async () => {
  const response = await api.get('/api/blogs')
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
    .expect(400)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})