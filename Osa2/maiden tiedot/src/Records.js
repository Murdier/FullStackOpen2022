const Record = ({ country, handleClick }) => {
    return (
        <div>
            <p>{country.name.common.toString()}<input type="submit" value="show" onClick={handleClick} id={country.name.common.toString()} /></p>
                       
        </div>
    )
}

const Records = ({ countries, handleClick }) => {   
    if (countries.length <= 1) {
        return ("");
    }
    else if (countries.length <= 10) {
        return (
                <div>
                {countries.map(country => <Record key={country.cca3.toString()} country={country} handleClick={handleClick} />)}
                </div>
        )
    } else {
        return "Too many matches, specify another filter";
    }    
}

export default Records
