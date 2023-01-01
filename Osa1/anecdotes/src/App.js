import { useState } from 'react'
var scores = [0, 0, 0, 0, 0, 0, 0]
const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

const App = () => {
    const [selected, setSelected] = useState(0)
    const [rerender, setRerender] = useState(false);

    const randomize = () => {
        setSelected(randomNumberInRange(0, anecdotes.length - 1))
    }
    const vote = () => {
        scores[selected] += 1
        setRerender(!rerender)
    }

    return (
        <div>
            <div>
                <Header text="Anecdote of the day" />
                <Anecdote index={selected} />
            </div>
            <div>
                <Button onClick={vote} text="vote" />
                <Button onClick={randomize} text="next anecdote"/>
            </div>
            <div>
                <Header text="Anecdote with most votes" />
                <Anecdote index={scores.indexOf(Math.max(...scores))} />
            </div>  
        </div>
    )
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Header = ({ text }) => <div style={{ fontWeight: "bold" }}><p>{text}</p></div>
const Anecdote = ({ index }) => <div>{anecdotes[index]}<p>has {scores[index]} votes</p></div>

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default App