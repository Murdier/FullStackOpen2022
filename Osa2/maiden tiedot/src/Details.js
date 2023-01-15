import { useState, useEffect } from 'react'
import axios from 'axios'

const Language = ({ language }) => {
    return (
        <div>
            <p>- {language}</p>
        </div>
    )
}

const Details = ({ country }) => {
    if (country === null || country === undefined) {
        return ("");
    }

    return (
        <div>
            <BasicDetails country={country} />
            <Forecast cityName={country.capital[0].toString()} latitude = { country.capitalInfo.latlng[0].toString() } longitude = { country.capitalInfo.latlng[1].toString() } />
        </div>
    )
}

const BasicDetails = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common.toString()}</h1>
            <div>
                <p>Capital: {country.capital[0].toString()}</p>
                <p>Area: {country.area.toString()}</p>
            </div>
            <h3>Languages</h3>
            <div>
                {Object.keys(country.languages).map(function (keyName, keyIndex) {
                    return <Language key={keyName} language={country.languages[keyName].toString()} />;
                })}
            </div>
            <div>
                <img
                    src={country.flags.png}
                    alt="new"
                />
            </div>
        </div>
    )
}

var data = null;
const Forecast = ({ cityName, latitude, longitude }) => {
    const [loading, setLoading] = useState(true);

    const apikey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude+"&lon=" + longitude+"&units=metric&appid="+apikey).then(response => {
            data = response.data;
            setLoading(false);
        })
    }, [])
   
    if (loading || data === null || data === undefined) {
        return (<div>Loading weather...</div>)
    } else {
        return (
            <div>
                <h1>Weather in {cityName}</h1>
                <p>temperature {data.main.temp.toString()} Celcius</p>
                <img
                    src={"http://openweathermap.org/img/wn/" + data.weather[0].icon.toString() + "@2x.png"}
                    alt="new"
                />
                <p>wind {data.wind.speed.toString()} m/s</p>
            </div>
        )
    }

}

export default Details