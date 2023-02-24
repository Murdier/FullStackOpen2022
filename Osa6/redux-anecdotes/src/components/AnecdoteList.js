import { useSelector, useDispatch } from 'react-redux'
import { voteWithID } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    let anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    console.log(anecdotes)
    console.log(filter)
    if(filter !== 'ALL')
        anecdotes = anecdotes.filter(x => x.content.includes(filter.payload.content))
    console.log(anecdotes)

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteWithID(id))
        dispatch(setNotification('Voted Anecdote'))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000);
    }

    console.log(anecdotes)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )  
}

export default AnecdoteList