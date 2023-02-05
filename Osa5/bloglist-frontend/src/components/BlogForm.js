import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    createBlog(newBlog)
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={handleNewBlog}>
        <div>
                    title
                  <input type="textbox" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
                    author
                  <input type="textbox" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
                    url
                  <input type="textbox" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm