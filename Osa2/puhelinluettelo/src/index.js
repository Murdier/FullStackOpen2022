import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(ReactDOM.createRoot(document.getElementById('root')).render(<App />))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)




