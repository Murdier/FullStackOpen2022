const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body

        if (password === undefined) {
            return response.status(400).json({ error: 'password missing' })
        } else if (password.length <= 3) {
            return response.status(400).json({ error: 'password too short' })
        } 

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (e) {
        next(e)
    }
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
        response.json(users)
    } catch (e) {
        next(e)
    }
})

module.exports = usersRouter