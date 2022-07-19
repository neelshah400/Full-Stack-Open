import React from 'react'
import Country from './Country'
import ListedCountry from './ListedCountry'

const Countries = ({ countries }) => {

    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>
    else if (countries.length === 1)
        return <Country country={countries[0]} />
    return (
        <div>
            {countries.map(country => 
                <ListedCountry key={country.name} country={country} />
            )}
        </div>
    )

}

export default Countries