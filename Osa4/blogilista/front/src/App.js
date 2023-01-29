import { useState, useEffect } from 'react'
import DataAccess from './services/DataAccess'
import Blog from './Blog'

const App = () => {       
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        DataAccess.getAll().then(response => {
            setBlogs(response.data)
        }).catch(error => {
            console.log(error.message);
        })
    }, [])

    const removeBlog = (event) => {
        event.preventDefault()

        DataAccess.remove(event.target.id).then(resp => {
        }).catch(error => {
            console.log(error);
        });;

        setBlogs(blogs.filter(x => x.id != event.target.id))
    }


    return (
        <div>
            <h1>List of blogs</h1>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />)}
        </div>
    )
}

export default App