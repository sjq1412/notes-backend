const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.info('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())
app.use(express.static('build'))


app.use(middleware.requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>hello world!</h1>')
})

app.use('/api/notes', notesRouter)


app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app