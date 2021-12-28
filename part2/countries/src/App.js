import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <form>
        <div>
          find countries&nbsp;
          <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <Countries countries={filteredCountries} />
    </div>
  )

}

export default App;
