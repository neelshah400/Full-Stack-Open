import React, { useState } from 'react'
import Country from './Country'

const ListedCountry = ({ country }) => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <div>
            {country.name}
            <button onClick={handleClick}>
                {show ? 'hide' : 'show'}
            </button>
            {
                show &&
                <Country country={country} />
            }
        </div>
    )

}

export default ListedCountry