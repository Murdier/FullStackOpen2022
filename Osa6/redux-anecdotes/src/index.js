import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers(
    {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
)

anecdoteService.getAll().then(
    notes => notes.forEach(note =>
    {
        store.dispatch(appendAnecdote(note))
    })
)

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)