const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Total = (props) => {
    const initialValue = 0;
    const total =
        props.course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)

    return (
        <p>Number of exercises {total}</p>
    )
}

const Course = ( { course } ) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course
