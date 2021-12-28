import React from 'react';

const Filter = ({ value, onChange }) => {
    return (
        <div>
            filter shown with&nbsp;
            <input value={value} onChange={onChange} />
        </div>
    )
}

export default Filter