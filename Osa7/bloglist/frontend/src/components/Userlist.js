import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Userlist = ({ users }) => {
  const countBlogs = (user) => {
    return user.blogs.length
  }

  return (
    <div>
      <h2>USERS</h2>

      <Table striped="true">
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{countBlogs(user)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Userlist
