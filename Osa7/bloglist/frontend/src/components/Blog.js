import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </td>
  )
}

export default Blog
