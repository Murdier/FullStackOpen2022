import Blog from './Blog'
import { Table } from 'react-bootstrap'

const Bloglist = ({ blogs }) => {
  const byLikesAndTitles = (a, b) =>
    b.likes - a.likes || a.title.localeCompare(b.title)

  const sortedBlogs = [...blogs].sort(byLikesAndTitles)

  return (
    <div>
      ALL BLOGS
      <Table striped="true">
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <Blog key={blog.id} blog={blog} />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Bloglist
