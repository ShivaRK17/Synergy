import React, { useContext, useEffect, useState } from 'react'
import './WeatherDashboard.css'
import { AppContext } from '../context/AppContext'

const WeatherDashboard = () => {
    const {userdetails,forecastdata,fetchForecastData} = useContext(AppContext);
    const [isCelsius, setIsCelsius] = useState(true);

    const toggleTemperatureUnit = () => {
        setIsCelsius((prevState) => !prevState);
    };

    // const convertToCelsius = (temperature) => {
    //     return Math.round((temperature - 32) * (5 / 9));
    // };
    const formatDay = (dateString) => {
        const options = { weekday: "long" };
        const date = new Date(dateString * 1000);
        return date.toLocaleDateString("en-US", options);
    };
    const convertToFahrenheit = (temperature) => {
        return Math.round((temperature * 9) / 5 + 32);
    };
    const getCurrentDate = () => {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        };
        const currentDate = new Date().toLocaleDateString("en-US", options);
        return currentDate;
    };
    const renderTemperature = (temperature) => {
        if (isCelsius) {
            return Math.round(temperature);
        } else {
            return convertToFahrenheit(temperature);
        }
    };


    useEffect(() => {
        fetchForecastData(userdetails.location);
        // eslint-disable-next-line
    }, [])

    return (
        <>

            <div className="wdcity-name">
                <h2 className="weather-des">{forecastdata.daily[0].condition.description.toUpperCase()}</h2>
                <h3>
                    {forecastdata.city}, <span>{forecastdata.country}</span>
                </h3>
                <div className="wddate">
                    <span>{getCurrentDate()}</span>
                </div>
            </div>
            <div className="weathercontainer">
                <div className="weatherleft">

                    <div className="wdtemp">
                        {forecastdata.daily[0].condition.icon_url && (
                            <img
                                src={forecastdata.daily[0].condition.icon_url}
                                alt={forecastdata.daily[0].condition.description}
                                className="wdtemp-icon"
                            />
                        )}
                        <div>

                            {renderTemperature(forecastdata.daily[0].temperature.day)}
                            <sup className="wdtemp-deg" onClick={toggleTemperatureUnit}>
                                {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
                            </sup>
                        </div>
                    </div>
                </div>
                <div className="weatherright">
                    <div className="weather-info">
                        <div className="col">
                            {/* <ReactAnimatedWeather icon="WIND" size="40" /> */}
                            <div>
                                <p className="wind">{forecastdata.daily[0].wind.speed}m/s</p>
                                <p>Wind speed</p>
                            </div>
                        </div>
                        <div className="col">
                            {/* <ReactAnimatedWeather icon="RAIN" size="40" /> */}
                            <div>
                                <p className="humidity">{forecastdata.daily[0].temperature.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="forecast">
                <h3>5-Day Forecast:</h3>
                <div className="forecast-container">
                    {forecastdata &&
                        forecastdata.daily.slice(0, 5).map((day) => (
                            <div className="day" key={day.time}>
                                <p className="day-name">{formatDay(day.time)}</p>
                                {day.condition.icon_url && (
                                    <img
                                        className="day-icon"
                                        src={day.condition.icon_url}
                                        alt={day.condition.description}
                                    />
                                )}
                                <p className="day-temperature">
                                    {Math.round(day.temperature.minimum)}°/ <span>{Math.round(day.temperature.maximum)}°</span>
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default WeatherDashboard