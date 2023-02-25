import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'

import Userlist from './Userlist'
import User from './User'
import Blogview from './Blogview'
import BlogDetails from './BlogDetails'

import { logoutUser } from '../reducers/userReducer'
import { initializeUsers } from '../reducers/usersReducer'
import {
  initializeBlogs,
  addLikeToBlog,
  addCommentToBlog,
  deleteBlog
} from '../reducers/blogReducer'

const Blogs = ({ user, notify, notification }) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
    notify('good bye!')
  }

  const showLoggedUser = () => (
    <div>
      {user.name} logged in
      <Button onClick={logout}>logout</Button>
    </div>
  )

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(({ users }) => {
    return users
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    const likedBlog = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id
    }

    dispatch(addLikeToBlog(likedBlog)).then(() => {
      notify(`you liked '${likedBlog.title}' by ${likedBlog.author}`)
    })
  }

  const commentBlog = async ({ id, comment }) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedCommentlist = blog.comments.concat(comment)

    const commentedBlog = {
      ...blog,
      comments: updatedCommentlist,
      user: blog.user.id
    }

    dispatch(addCommentToBlog(commentedBlog)).then(() => {
      notify(
        `you added comment ${comment}' to '${commentedBlog.title}' by ${commentedBlog.author}`
      )
    })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }

    dispatch(deleteBlog(id)).then(() => {
      notify('blog was succesfully removed')
    })
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                BLOGS
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                USERS
              </Link>
            </Nav.Link>
            <div> {showLoggedUser()}</div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Blogview blogs={blogs} notify={notify} />} />
        <Route path="/blogs/" element={<Navigate to="/" replace />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blogs={blogs}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              commentBlog={commentBlog}
              user={user}
            />
          }
        />
        <Route path="/users/" element={<Userlist users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
      </Routes>
    </div>
  )
}

export default Blogs
