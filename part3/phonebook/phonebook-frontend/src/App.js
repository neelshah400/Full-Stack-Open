import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {

  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [style, setStyle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name)
    const person = {
      name: newName,
      number: newNumber
    }
    if (names.indexOf(newName) !== -1) {
      const id = persons[names.indexOf(newName)].id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(id, person)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setStyle('success')
            setMessage(`Updated ${newName}'s phone number`)
            setTimeout(() => {
              setStyle('')
              setMessage('')
            }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== id))
            setStyle('error')
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setStyle('')
              setMessage('')
            }, 5000)
          })
      }
    }
    else {
      personsService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setStyle('success')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setStyle('')
            setMessage('')
          }, 5000)
        })
        .catch(error => {
          setStyle('error')
          setMessage(error.response.data.error)
          setTimeout(() => {
            setStyle('')
            setMessage('')
          }, 5000)
        })
    }
  }

  const removePerson = (id) => {
    let oldName = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${oldName}?`)) {
      personsService
      .remove(id)
      .then(returnedPerson => {
        let name = returnedPerson.name
        setPersons(persons.filter(p => p.id !== id))
        setStyle('success')
        setMessage(`Deleted ${oldName}`)
        setTimeout(() => {
          setStyle('')
          setMessage('')
        }, 5000)
      })
      .catch(error => {
        setStyle('error')
        setMessage(error.response.data.error)
        setTimeout(() => {
          setStyle('')
          setMessage('')
        }, 5000)
      })
    }
  }

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={style} message={message} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )

}

export default App