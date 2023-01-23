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
                number: newNumber
            }

            DataAccess.create(personObject).then((value) => {
                DataAccess.getAll().then(response => {
                    setPersons(response.data)

                    setNotification("Added " + personObject.name);
                    setNotificationIsError(false);
                    setTimeout(() => { setNotification(null) }, 3000);

                    setNewNumber('')
                    setNewName('')
                })
            }).catch(error => {
                setNotificationIsError(true);
                setNotification("Couldn't create the user; " + error.response.data.error);
            });
        } else {
            var personToUpdate = persons.filter(x => x.name.toLowerCase() === newName.toLowerCase())[0];
            console.log(personToUpdate);
            personToUpdate.number = newNumber;


            DataAccess.update(personToUpdate.id, personToUpdate).then(resp => {                
                DataAccess.getAll().then(response => {
                    setPersons(response.data)

                    setNotificationIsError(false);
                    setNotification("Updated number for " + personToUpdate.name);
                    setTimeout(() => { setNotification(null) }, 3000);
                })
            }).catch(error => {
                setNotificationIsError(true);
                setNotification("Couldn't update the user; " + error.response.data.error);
            });

        }
    }

    const removePerson = (event) => {
        event.preventDefault()        

        DataAccess.remove(event.target.id).then(resp => {
            setNotificationIsError(false);
            setNotification("Deleted " + persons.filter(x => x.id == event.target.id)[0].name);
            setTimeout(() => { setNotification(null) }, 3000);
        }).catch(error => {
            setNotificationIsError(true);
            console.log(error);
            console.log(error.response.data);
            setNotification("Couldn't remove the user; " + error.response.data.error);
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