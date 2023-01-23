const Record = ({ person, removePerson }) => {
    console.log(person.id)
    return (
        <div>
            <p>{person.name} - {person.number} <input type="button" name={person.id} id={person.id} value="delete" onClick={removePerson} /></p>
        </div>
    )
}

const Records = ({ persons, removePerson }) => {
    return (
        <div>
            {persons.map(person => <Record key={person.id} person={person} removePerson={removePerson} />)}
        </div>
    )
}

export default Records
