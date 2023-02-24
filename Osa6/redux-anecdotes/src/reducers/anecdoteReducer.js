import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        voteWithID(state, action) {
            console.log('voteWithID')
            console.log('state: ' + JSON.stringify(state))
            console.log('action: ' + JSON.stringify(action))

            const id = action.payload

            let changeItem = state.filter(x => x.id == id);
            changeItem[0].votes += 1;

            return state.sort((a, b) => a.votes > b.votes ? -1 : 1)
        },
        createAnecdote(state, action) {
            console.log('createAnecdote')
            console.log('state: ' + JSON.stringify(state))
            console.log('action: ' + JSON.stringify(action))

            const content = action.payload
            const newItem = {
                content,
                id: generateId(),
                votes: 0
            }
            console.log("newItem: " + JSON.stringify(newItem))

            let newItems = state.filter(x => x);

            newItems.push(newItem);
            

            return newItems.sort((a, b) => a.votes > b.votes ? -1 : 1)
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const { voteWithID, createAnecdote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer