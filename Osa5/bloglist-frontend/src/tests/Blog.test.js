import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test Url',
        likes: 1,
        user: 123
    }

    const user = {
        name: 'Test Name',
        username: 'Test UserName',
        id: 123,
    }

    const eventUser = userEvent.setup()
    const likeMockHandler = jest.fn()
    const deleteMockHandler = jest.fn()

    render(<Blog blog={blog} increaseLikeHandler={likeMockHandler} deleteBlogHandler={deleteMockHandler} user={user} />)

    const element = screen.getByText('Test Title Test Author')
    expect(element).toBeDefined()
})

test('like button clicked twice', async () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test Url',
        likes: 1,
        user: 123
    }

    const user = {
        name: 'Test Name',
        username: 'Test UserName',
        id: 123,
    }

    const eventUser = userEvent.setup()
    const likeMockHandler = jest.fn()
    const deleteMockHandler = jest.fn()

    render(<Blog blog={blog} increaseLikeHandler={likeMockHandler} deleteBlogHandler={deleteMockHandler} user={user} />)

    let expandButton = screen.getByText('expand')
    await eventUser.click(expandButton)

    let likeButton = screen.getByText('like')
    await eventUser.click(likeButton)
    await eventUser.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
})

test('renders content when button clicked', async () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test Url',
        likes: 1,
        user: 123
    }

    const user = {
        name: 'Test Name',
        username: 'Test UserName',
        id: 123,
    }

    const eventUser = userEvent.setup()
    const likeMockHandler = jest.fn()
    const deleteMockHandler = jest.fn()

    render(<Blog blog={blog} increaseLikeHandler={likeMockHandler} deleteBlogHandler={deleteMockHandler} user={user} />)

    let titleElemenet = screen.getByText('Title: Test Title')
    expect(titleElemenet).not.toBeVisible()

    let authorElement = screen.getByText('Author: Test Author')
    expect(authorElement).not.toBeVisible()

    let urlElement = screen.getByText('Url: Test Url')
    expect(urlElement).not.toBeVisible()

    let likeElement = screen.getByText('Likes: 1')
    expect(likeElement).not.toBeVisible()

    let button = screen.getByText('expand')
    await eventUser.click(button)

    titleElemenet = screen.getByText('Title: Test Title')
    expect(titleElemenet).toBeVisible()

    authorElement = screen.getByText('Author: Test Author')
    expect(authorElement).toBeVisible()

    urlElement = screen.getByText('Url: Test Url')
    expect(urlElement).toBeVisible()

    likeElement = screen.getByText('Likes: 1')
    expect(likeElement).toBeVisible()
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const input1 = container.querySelector(`input[name="Title"]`);
    const input2 = container.querySelector(`input[name="Author"]`);
    const input3 = container.querySelector(`input[name="Url"]`);
    const sendButton = screen.getByText('create')

    await user.type(input1, 'testing a form 1...')
    await user.type(input2, 'testing a form 2...')
    await user.type(input3, 'testing a form 3...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form 1...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing a form 2...')
    expect(createBlog.mock.calls[0][0].url).toBe('testing a form 3...')
    expect(createBlog.mock.calls[0][0].likes).toBe(0)
})