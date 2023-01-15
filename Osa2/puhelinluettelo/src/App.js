import { useState, useEffect } from 'react'
import axios from 'axios'
import Records from './Records'
import Form from './Form'
import Filter from './Filter'
import Notification from './Notification'
import DataAccess from './services/DataAccess'

const App = () => {    
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [newName, setNewName] = useState('')    
    const [newNumber, setNewNumber] = useState('')
    const [notificationMessage, setNotification] = useState(null)
    const [notificationIsError, setNotificationIsError] = useState(false)

    useEffect(() => {
        DataAccess.getAll().then(response => {
            setPersons(response.data)            
        })
    }, [])

    const handleNumberChange = (event) => setNewNumber(event.target.value);
    const handlePersonChange = (event) => setNewName(event.target.value);
    const handleFilterChange = (event) => setFilter(event.target.value);

    const addNote = (event) => {
        event.preventDefault()

        if (persons.filter(x => x.name === newName).length == 0) {
            const personObject = {
                name: newName,
                number: newNumber,
                id: (persons.length + 1)
            }
            setPersons(persons.concat(personObject))

            setNotification("Added " + personObject.name);
            setNotificationIsError(false);
            setTimeout(() => { setNotification(null) }, 3000);

            DataAccess.create(personObject).catch(error => {
                setNotificationIsError(true);
                setNotification("Couldn't create the user");
            });

            setNewNumber('')
            setNewName('')
        } else {
            var personToUpdate = persons.filter(x => x.name === newName)[0];
            personToUpdate.number = newNumber;

            setNotificationIsError(false);
            setNotification("Updated number for " + personToUpdate.name);
            setTimeout(() => { setNotification(null) }, 3000);

            DataAccess.update(personToUpdate.id, personToUpdate).then(resp => {
                DataAccess.getAll().then(response => {
                    setPersons(response.data)
                })
            }).catch(error => {
                setNotificationIsError(true);
                setNotification("Couldn't update the user");
            });

        }
    }

    const removePerson = (event) => {
        event.preventDefault()        

        setNotificationIsError(false);
        setNotification("Deleted " + persons.filter(x => x.id == event.target.id)[0].name);
        setTimeout(() => { setNotification(null) }, 3000);

        DataAccess.remove(event.target.id).catch(error => {
            setNotificationIsError(true);
            setNotification("Couldn't remove the user");
        });;
        setPersons(persons.filter(x => x.id != event.target.id))
    }

    const personsToShow = persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notificationMessage} isError={notificationIsError} />
            <h2>Filter numbers</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>            
            <h2>Add a new person</h2>
            <Form addNote={addNote} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber } handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Records persons={personsToShow} removePerson={removePerson}/>
        </div>
    )
}

export default App