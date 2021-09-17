const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')

// Write your tests here
test('[0]sanity', () => {
  expect(true).not.toBe(false)
})

test('[1] saves the user with a bcrypted password instead of plain text', async () => {
  await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
  const devon = await db('users').where('username', 'devon').first()
  expect(bcrypt.compareSync('1234', devon.password)).toBeTruthy()
})

test('[2] creates a new user in the database when client does not provide role_name', async () => {
  await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
  const devon = await db('users').where('username', 'devon').first()
  expect(devon).toMatchObject({ username: 'devon' })
})

test ('[3] responds with the correct message on valid credentials', async () => {
  const res = await request(server).post('/api/auth/login').send({ username: 'Captain Marvel', password: '1234' })
  expect(res.body.message).toMatch(/welcome, Captain Marvel/i)
})

test ('[4] responds with the correct status and message on invalid credentials', async () => {
  let res = await request(server).post('/api/auth/login').send({ username: 'bobsy', password: '1234' })
  expect(res.body.message).toMatch(/invalid credentials/i)
  expect(res.status).toBe(401)
  res = await request(server).post('/api/auth/login').send({ username: 'bob', password: '12345' })
  expect(res.body.message).toMatch(/invalid credentials/i)
  expect(res.status).toBe(401)
})



