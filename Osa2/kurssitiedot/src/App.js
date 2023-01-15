import Course from './Course'

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        },
        {
            name: 'Node.js 2',
            id: 3,
            parts: [
                {
                    name: 'Routing3',
                    exercises: 5,
                    id: 1
                },
                {
                    name: 'Middleware1s',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <Header name="Web Development Curriculum" />
            {courses.map(course => <Course key={course.id} course={course} />)}            
        </div>
    )
}

export default App