import React from 'react'
import ReactDOM from 'react-dom/client'
import Reducer from './reducer'

import { createStore } from 'redux'

const store = createStore(Reducer)

const App = () => {
    return (
        <div>
            <div>
                <p>Good: {store.getState().good}</p>
                <p>Ok: {store.getState().ok}</p>
                <p>Bad: {store.getState().bad}</p>
            </div>
            <button
                onClick={e => store.dispatch({ type: 'GOOD' })}
            >
                Good
            </button>
            <button
                onClick={e => store.dispatch({ type: 'OK' })}
            >
                Ok
            </button>
            <button
                onClick={e => store.dispatch({ type: 'BAD' })}
            >
                Bad
            </button>
            <button
                onClick={e => store.dispatch({ type: 'ZERO' })}
            >
                clear
            </button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)