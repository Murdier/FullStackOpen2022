import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Table, Button } from 'react-bootstrap'

const BlogButtons = ({ blog, likeBlog, removeBlog, commentBlog, own }) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    commentBlog({ id: blog.id, comment })
    setComment('')
  }
  return (
    <div>
      <div>
        <Button onClick={() => likeBlog(blog.id)}>like this blog</Button>
      </div>
      <div>
        {own && (
          <Button onClick={() => navigate('/') || removeBlog(blog.id)}>
            remove this blog
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="comment"
            placeholder="add your comment"
          />
        </div>
        <Button id="create-comment" type="submit">
          add comment
        </Button>
      </form>
    </div>
  )
}

const BlogDetails = ({ blogs, likeBlog, removeBlog, commentBlog, user }) => {
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const own = blog.user && user.username === blog.user.username

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <Table>
        <tbody>
          <tr>
            blog author: <b>{blog.author}</b>
          </tr>
          <tr>
            blog url:
            <a href={blog.url}>
              <b>{blog.url}</b>
            </a>
          </tr>
          <tr>
            blog has <b>{blog.likes}</b> likes
          </tr>
          <tr>
            blog was added by:<b>{addedBy}</b>
          </tr>
          <tr>
            blog comments:
            {blog.comments.length === 0 ? (
              ' no comments added yet'
            ) : (
              <ul>
                {blog.comments.map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            )}
          </tr>
        </tbody>
      </Table>
      <BlogButtons
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        commentBlog={commentBlog}
        own={own}
      />
    </div>
  )
}

export default BlogDetails
