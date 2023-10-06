import React, { useState, useEffect } from 'react';
import searchIcon from './Assets/search.png';
import cloudIcon from './Assets/cloud.png';
import drizzleIcon from './Assets/drizzle.png';
import humidityIcon from './Assets/humidity.png';
import clearIcon from './Assets/clear.png';
import rainIcon from './Assets/rain.png';
import snowIcon from './Assets/snow.png';
import windIcon from './Assets/wind.png';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        windSpeed: '',
        temperature: '',
        location: '',
        description: '',
    });

    const [weatherIcon, setWeatherIcon] = useState(cloudIcon);

    const apiKey = 'aba312ea73142cab0213a2fb67c8f94a';

    const fetchData = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setWeatherData({
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} km/h`,
                temperature: `${data.main.temp}°C`,
                location: data.name,
                description: data.weather[0].description,
            });

            setWeatherIcon(getWeatherIcon(data.weather[0].icon));
        }
    };

    useEffect(() => {
        fetchData('London');
    }, []);

    const getWeatherIcon = (iconCode) => {
        const iconMapping = {
            '01d': clearIcon,
            '01n': clearIcon,
            '02d': cloudIcon,
            '02n': cloudIcon,
            '03d': drizzleIcon,
            '03n': drizzleIcon,
            '04d': drizzleIcon,
            '04n': snowIcon,
            '09d': rainIcon,
            '09n': rainIcon,
            '10d': rainIcon,
            '10n': rainIcon,
            '13d': snowIcon,
            '13n': snowIcon,
        };

        return iconMapping[iconCode] || cloudIcon;
    };

    const search = async () => {
        const element = document.getElementsByClassName('cityInput')[0];
        if (element.value === '') {
            return;
        }
        fetchData(element.value);
    };

    return (
        <div className='h-full min-h-screen p-5 flex flex-col sm:flex-row items-center justify-center gap-5 '>
            <div className='sm:w-2/3 gap-5 flex flex-col w-full max-w-[400px] tracking-wide'>
                <div className='flex items-center justify-center shadow-xl bg-white px-5 py-2 rounded-xl'>
                    <input type='text' placeholder='Search' className='cityInput w-full' />
                    <div className='search-icon items-center flex justify-center' onClick={search}>
                        <img className='flex items-center justify-center' src={searchIcon} alt='' />
                    </div>
                </div>
                <div className='weather-image backgroundBox flex items-center justify-center rounded-xl shadow-xl'>
                    <img src={weatherIcon} alt='' />
                </div>
                <div className='backgroundBox rounded-xl p-5 shadow-xl text-white font-bold tracking-wide text-xl text-center w-full'>{weatherData.description}</div>

            </div>

            <div className='sm:w-2/3 flex flex-col gap-5 h-full w-full max-w-[400px] tracking-wide'>
                <div className='flex gap-5 sm:h-[150px] flex-col sm:flex-row w-full'>
                    <div className='backgroundBox flex items-center justify-center rounded-xl w-full p-5 shadow-xl text-white font-extrabold text-3xl text-center sm:w-2/3'>{weatherData.location}</div>
                    <div className='backgroundBox rounded-xl p-5 shadow-xl text-white font-extrabold text-4xl flex justify-center items-center text-center sm:w-2/3'>{weatherData.temperature}</div>
                </div>
                <div className='backgroundBox rounded-xl shadow-xl flex justify-between text-white font-bold tracking-wide p-5'>
                    <img src={humidityIcon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity-percent text-3xl'>{weatherData.humidity}</div>
                        <div className='text-sm'>Humidity</div>
                    </div>
                </div>
                <div className='backgroundBox rounded-xl shadow-xl flex justify-between text-white font-bold tracking-wide p-5'>
                    <img src={windIcon} alt='' className='icon' />
                    <div className='data flex flex-col justify-end'>
                        <div className='humidity-percent text-3xl'>{weatherData.windSpeed}</div>
                        <div className='text-sm'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
