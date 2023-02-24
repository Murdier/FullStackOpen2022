import { useDispatch } from 'react-redux'
import { anecdoteReducer, appendAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'


const AnecdoteForm = () => {    
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        console.log(event.target)
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdotesService.createNew(content)

        dispatch(appendAnecdote(newAnecdote))
        dispatch(setNotification('Added anecdote'))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000);        
    }

    return (<div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input id="anecdote" /></div>
            <button>create</button>
        </form>
    </div>)    
}

export default AnecdoteForm