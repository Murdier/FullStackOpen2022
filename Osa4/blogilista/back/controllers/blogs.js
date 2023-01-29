const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const user = request.user

        const blog = new Blog(request.body)
        const result = await blog.save()

        user.blogs = user.blogs.concat(result.id);
        await user.save()

        response.status(201).json(result)
    } catch (e) {
        next(e)
    }        
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        if (!request.user) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = request.user
        if (user.blogs.filter(x => x.toString() === request.params.id).length > 0) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'unauthorized' })
        }
    } catch (e) {
        next(e)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        if (updatedBlog)
            response.json(updatedBlog)
        else
            response.status(404).end()
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter