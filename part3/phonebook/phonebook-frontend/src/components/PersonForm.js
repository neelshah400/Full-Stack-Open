import React from 'react';

const PersonForm = ({ name, onNameChange, number, onNumberChange, onSubmit }) => {
    return (
        <form>
            <div>
                name:&nbsp;
                <input value={name} onChange={onNameChange} />
            </div>
            <div>
                number:&nbsp;
                <input value={number} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={onSubmit}>add</button>
            </div>
        </form>
    )
}

export default PersonForm