const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('assert')
const supertest = require('supertest')
const Blog = require('../../models/blog')
const blogsMock = require('../fixtures/blogs.json')
const app = require('../../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogsMock);
})


test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, blogsMock.length)
})

test('blog has an "id" property', async () => {
  const response = await api.get('/api/blogs')
  assert(Object.hasOwn(response.body[0], 'id'))
})

test('a blog can be inserted', async () => {
  const newBlog = {
      "title": "Lorem Ipsum is dolor",
      "author": "Marlon Bermúdez",
      "url": "https://micasaestuya.com/",
      "likes": 1,
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, blogsMock.length + 1)
  assert(titles.includes('Lorem Ipsum is dolor'))
})

test('if missing prop likes it will be zero by default', async () => {
  const newBlog = {
    "title": "A great place to search for houses!",
    "author": "Marlon Bermúdez",
    "url": "https://micasaestuya.com/"
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('a blog is not created if there are missing props likes title or url', async () => {
  await api.post('/api/blogs')
    .send({
      "title": "A great place to search for houses!",
      "author": "Marlon Bermúdez",
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api.post('/api/blogs')
    .send({
      "author": "Marlon Bermúdez",
      "url": "https://micasaestuya.com/"
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('a blog is deleted', async () => {
  const blogs = await api.get('/api/blogs')
  const blog = blogs.body[0]

  await api.delete(`/api/blogs/${blog.id}`).expect(204)
  
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogs.body.length - 1)
})


test('a blog is updated', async () => {
  const blogs = await api.get('/api/blogs')
  const originalBlog = blogs.body[0]

  const newData = {
      "title": "Modified",
      "author": "Antonio Toranzo",
      "url": "https://micasaestuya.es/",
    }

  const updatedBlog = await api.put(`/api/blogs/${originalBlog.id}`)
    .send(newData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(updatedBlog.body.title, newData.title)
  assert.strictEqual(updatedBlog.body.author, newData.author)
  assert.strictEqual(updatedBlog.body.url, newData.url)
})

after(async () => {
  await mongoose.connection.close()
})