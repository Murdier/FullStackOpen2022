import Bloglist from './Bloglist'
import NewBlog from './NewBlog'

const Blogview = ({ blogs, notify }) => {
  return (
    <div>
      <h2>BLOGS</h2>
      <div>
        <NewBlog notify={notify} />
      </div>
      <div>
        <Bloglist blogs={blogs} />
      </div>
    </div>
  )
}

export default Blogview
