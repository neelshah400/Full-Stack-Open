import React from 'react';
import Person from './Person'

const Persons = ({ persons, removePerson }) => {
    return (
        <div>
        {
            persons.map((person) => 
                <Person key={person.name} person={person} removePerson={() => removePerson(person.id)} />
            )
        }
        </div>
    )
}

export default Persons