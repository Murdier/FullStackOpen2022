const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));


let persons = [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
    ]

app.get('/info', (req, res) => {
    res.send('<div>Phonebook has info for ' + persons.length +'</div><div>'+new Date().toString()+'</div>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(note => note.id === id)

    if (person)
        response.json(person)        
    else
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

    
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || body.name === '') {
        return response.status(400).json({
            error: 'Name missing'
        })
    } else if (!body.number || body.number === '') {
        return response.status(400).json({
            error: 'Number missing'
        })
    } else if (persons.filter(x => x.name.toLowerCase() == body.name.toLowerCase()).length > 0) {
        return response.status(400).json({
            error: 'Name already exists'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * (99999 - 1 + 1) + 1),
    }

    persons = persons.concat(person)

    response.json(persons)
})



const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})