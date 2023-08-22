require("dotenv").config()
const express = require("express")
const cors = require("cors")  
const Note = require("./models/note")

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:", request.path)
  console.log("Body:", request.body)
  console.log("---")
  next()
}

app.use(requestLogger)

app.get("/", (request, response) => {
    response.send("<h1>hello world!</h1>")
})

app.get("/api/notes", (request, response) => {
  Note.find({}).then(result => {
    response.json(result)
})
})

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    console.log(error)
    response.status(400).send({error: "malformatted id"})
  }) 
})

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)

  notes = notes.filter(note => note.id !== id)

  response.send(204).end()
})

app.post("/api/notes", (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.send(400).json({error: "content missing"})
  }

  const note = new Note({
    content: body.content,
    important: body?.important || false,
  })
  
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const unknownEndpoint = (request, response, next) => {
  response.status(404).json({
    error: "Unknown endpoint"
  })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)