import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, increaseLikeHandler, deleteBlogHandler, user }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenVisible = { display: expanded ? 'none' : '' }
  const showWhenVisible = { display: expanded ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (blog.user.id === user.id) {
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setExpanded(true)} className="expandButton">expand</button>
        </div>
        <div style={showWhenVisible} className="blog">
          <div>Title: {blog.title}</div>
          <div>Author: {blog.author}</div>
          <div>Url: {blog.url}</div>
          <div>
                        Likes: {blog.likes}
            <button onClick={() => increaseLikeHandler(blog)} className="likeButton">like</button>
          </div>
          <div>Creator: {blog.user.name}</div>
          <button onClick={() => setExpanded(false)}>close</button>
          <button onClick={() => deleteBlogHandler(blog)}>delete</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(true)} className="expandButton">expand</button>
      </div>
      <div style={showWhenVisible} className="blog">
        <div>Title: {blog.title}</div>
        <div>Author: {blog.author}</div>
        <div>Url: {blog.url}</div>
        <div>
                    Likes: {blog.likes}
          <button onClick={() => increaseLikeHandler(blog)} className="likeButton">like</button>
        </div>
        <div>Creator: {blog.user.name}</div>
        <button onClick={() => setExpanded(false)}>close</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLikeHandler: PropTypes.func.isRequired,
  deleteBlogHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog