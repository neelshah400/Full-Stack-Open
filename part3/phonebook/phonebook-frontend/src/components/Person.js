import React from 'react';

const Person = ({ person, removePerson }) => {
    return (
        <div>
            {person.name} {person.number}&nbsp;
            <button onClick={removePerson}>delete</button>
        </div>
    )
}

export default Person