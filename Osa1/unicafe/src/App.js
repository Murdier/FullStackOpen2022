import { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodOnClick = () => setGood(good + 1)
    const neutralOnClick = () => setNeutral(neutral + 1)
    const badOnClick = () => setBad(bad + 1)

    return (
        <div>
            <FormHeader/>
            <div>
                <Button onClick={goodOnClick} text="good" />
                <Button onClick={neutralOnClick} text="neutral" />
                <Button onClick={badOnClick} text="bad" />
            </div>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    const hasFeedback = (good + neutral + bad) > 0

    if (hasFeedback)
        return (
            <div>
                <StatisticsHeader />
                <table>
                    <tbody>
                        <StatisticsLine value={good} text="good" />
                        <StatisticsLine value={neutral} text="neutral" />
                        <StatisticsLine value={bad} text="bad" />
                        <StatisticsLine text="all" value={good + neutral + bad} />
                        <StatisticsLine text="average" value={good - bad} />
                        <StatisticsLine text="positive" value={((good / (good + neutral + bad)) * 100) + "%"} />
                    </tbody>
                </table>
            </div>
        )
    else
        return (
            <div>
                <StatisticsHeader />
                no feedback given
            </div>
        )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const FormHeader = () => <div style={{ fontWeight: "bold" }}><p>give feedback</p></div>
const StatisticsHeader = () => <div style={{ fontWeight: "bold" }}><p>statistics</p></div>

const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

export default App