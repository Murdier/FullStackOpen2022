import { useState, useEffect } from 'react'
import axios from 'axios'
import Records from './Records'
import Filter from './Filter'
import Details from './Details'

var countryToUse = null;

const App = () => {    
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [refresh, setRefresh] = useState(true)

    const handleClick = (event) => {        
        countryToUse = countries.filter(x => x.name.common.toString() == event.target.id)[0];
        setRefresh(!refresh);
    }
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(response => {
            setCountries(response.data);
        })
    }, [])

    const handleFilterChange = (event) => { countryToUse = null; setFilter(event.target.value);};
    const countriesToShow = countries.filter(x => x.name.common.toString().toLowerCase().includes(filter.toLowerCase()))

    countryToUse = (countriesToShow.length == 1 ? countriesToShow[0] : countryToUse);
    
    return (
        <div>
            <h1>Country Information</h1>
            <h2>Filter countries</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>                                    
            <h2>Countries</h2>
            <Records countries={countriesToShow} handleClick={handleClick} />
            <Details country={countryToUse} />
        </div>
    )
}

export default App