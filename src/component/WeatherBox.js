import React from 'react'

const WeatherBox = ({ weather }) => {
    console.log("weather", weather);

    const weatherIcon = weather?.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

    // 현재 날짜와 시간
    const date = new Date();
    const now = date.toLocaleString("ko-KR");


    return (
        <div>
            <div className='locationtext'>
                <div className='smalltext'>* {now} 기준</div>
                <div><b>{weather?.name}</b></div>
            </div>
            <div className='weather-box'>
                {/*<div>{weather && weather.name}</div>*/}
                <h2>{weather?.main.temp}°C / {(weather?.main.temp * 9 / 5 + 32).toFixed(2)}°F</h2>
                <h3>{weather?.weather[0].description}<img className='icon' src={iconUrl} alt={weather?.weather[0].description}></img></h3>
                <hr />
                <div className='moretext'>
                    <div>최고 : {weather?.main.temp_max}°C / 최저 : {weather?.main.temp_min}°C</div>
                    <div>체감 온도 : {weather?.main.feels_like}°C</div>
                    <div>습도 : {weather?.main.humidity}%</div>
                    <div>풍속 : {weather?.wind.speed}m/s</div>
                    <div>풍향 : {weather?.wind.deg}도</div>
                </div>
            </div>
        </div>

    )
}

export default WeatherBox
