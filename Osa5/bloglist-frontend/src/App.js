import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      setSuccessMessage('Logged in')
      setTimeout(() => { setSuccessMessage(null) }, 2000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)

    setSuccessMessage('Logged out')
    setTimeout(() => { setSuccessMessage(null) }, 2000)
  }

  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)

      setSuccessMessage('Created new blog')
      setTimeout(() => { setSuccessMessage(null) }, 2000)

      setBlogFormVisible(false)

      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    } catch (e) {
      setErrorMessage('Couldn\'t create blog ' + e.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const increaseLikeHandler = async (blogObject) => {
    try {
      const newBlog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: blogObject.likes + 1,
        user: blogObject.user.id.toString()
      }

      console.log(blogObject.id)
      await blogService.update(newBlog, blogObject.id)

      setSuccessMessage('Increased Likes')
      setTimeout(() => { setSuccessMessage(null) }, 2000)

      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    } catch (e) {
      setErrorMessage('Couldn\'t increase likes ' + e.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const deleteBlogHandler = async (blogObject) => {
    try {
      if (window.confirm('Do you really want to remove this blog?')) {
        await blogService.remove(blogObject.id)

        setSuccessMessage('Removed ' + blogObject.title)
        setTimeout(() => { setSuccessMessage(null) }, 2000)

        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      }
    } catch (e) {
      setErrorMessage('Couldn\'t remove blog ' + e.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  if (user === null || user === undefined) {
    return (
      <div>
        <Notification message={errorMessage} isError={true} />
        <Notification message={successMessage} isError={false} />

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
                        username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
                        password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <div>
      <Notification message={errorMessage} isError={true} />
      <Notification message={successMessage} isError={false} />

      <div>
        <h2>User</h2>
        <p>Logged in as {user.name}</p>
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
      </div>

      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            createBlog={createBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>

      <div>
        <h2>Blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} increaseLikeHandler={increaseLikeHandler} deleteBlogHandler={deleteBlogHandler} user={user} />)}
      </div>
    </div>
  )
}

export default App