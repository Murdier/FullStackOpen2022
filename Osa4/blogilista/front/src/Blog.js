const Blog = ({ blog, removeBlog }) => {

    return (
        <div>
            <h2>{blog.title}</h2>            
            <div>
                <input type="button" name={blog.id} id={blog.id} value="delete" onClick={removeBlog} />
                <p>{'\t'}Author: {blog.author}</p>
                <p>{'\t'}Url: {blog.url}</p>
                <p>{'\t'}Likes: {blog.likes}</p>
            </div>
        </div>
    )
}

export default Blog