import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      const blog = action.payload
      state.push(blog)
    },

    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },

    setBlog(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    },

    setBlogs(state, action) {
      const blogs = action.payload
      return blogs
    }
  }
})

export const { appendBlog, removeBlog, setBlog, setBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const addLikeToBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(setBlog(updatedBlog))
  }
}

export const addCommentToBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.createComment(blog.id, blog)
    dispatch(setBlog(updatedBlog))
  }
}

export default blogsSlice.reducer
