const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

let testData = [
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },

    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testData.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 10000)

describe('test get', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are six blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(6)
    })

    test('the first blog is titled in certain way', async () => {
        const response = await api.get('/api/blogs')
        
        const titles = response.body.map(r => r.title)        
        expect(titles).toContain(
            'First class tests'
        )
    })
})

describe('field tests', () => {   
    test('id field is renamed', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('_id field doesn\'t exists', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0]._id).not.toBeDefined()
    })
})

describe('post tests', () => {
    test('add a single record', async () => {
        const newNote = {
            title: "To Add",
            author: "Test Author",
            url: "Test URl",
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(testData.length + 1)
        expect(titles).toContain(
            'To Add'
        )
    })

    test('add without likes', async () => {
        const newNote = {
            title: "To Add",
            author: "Test Author",
            url: "Test URl",
        }

        await api
            .post('/api/blogs')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        for (var i = 0; i < response.body.length; i++) {
            if (response.body[i].title === newNote.title) {
                expect(response.body[i].likes).toBeDefined();
            }
        }
    })

    test('add without title', async () => {
        const newNote = {
            author: "Test Author",
            url: "Test URl",
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .send(newNote)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(testData.length)
    })

    test('add without url', async () => {
        const newNote = {
            title: "To Add",
            author: "Test Author",
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .send(newNote)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(testData.length)
    })
})

describe('delete tests', () => {
    test('delete all records', async () => {
        const firstResp = await api.get('/api/blogs')        

        for (var i = 0; i < firstResp.body.length; i++) {
            await api
                .delete('/api/blogs/' + firstResp.body[i].id)
                .expect(204)
        }

        const secondResp = await api.get('/api/blogs')
        expect(secondResp.body).toHaveLength(0)
    })

    test('faulty id', async () => {
        await api
            .delete('/api/blogs/notrealid')
            .expect(400)
    })
})

describe('put tests', () => {
    test('update single record', async () => {
        const firstResp = await api.get('/api/blogs')
        let id = firstResp.body[0].id
        const newBlog = {
            title: "To Add 2",
            url: "Test URL 2",
            author: "Test Author 2",
            likes: 10,
        }


        await api
            .put('/api/blogs/' + id)
            .send(newBlog)
            .expect(200)
        
        const secondResp = await api.get('/api/blogs')

        expect(secondResp.body).toHaveLength(testData.length)
        expect(secondResp.body[0].title).toBe("To Add 2")
        expect(secondResp.body[0].url).toBe("Test URL 2")
        expect(secondResp.body[0].author).toBe("Test Author 2")
        expect(secondResp.body[0].likes).toBe(10)
    })

    test('faulty id', async () => {
        const newBlog = {
            title: "To Add 2",
            url: "Test URL 2",
            author: "Test Author 2",
            likes: 10,
        }

        await api
            .put('/api/blogs/notrealid')
            .send(newBlog)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})