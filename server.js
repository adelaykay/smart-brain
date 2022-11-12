import bodyParser from 'body-parser'
import express from 'express'
import { hash, compare } from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import { handleImageGet, handleApiCall } from './controllers/image.js'
import handleProfileGet from './controllers/profile.js'

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'test',
    database: 'smart-brain',
  },
})

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => {
  db.select('*')
    .from('users')
    .then(data => {
      res.json(data)
    })
})

app.post('/signin', (req, res) => {
  handleSignin(req, res, compare, db)
})

app.put('/register', (req, res) => {
  handleRegister(req, res, hash, db)
})

app.get('/profile/:id', (req, res) => {
  handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
  handleImageGet(req, res, db)
})

app.post('/imageurl', handleApiCall)

app.listen(3000)
