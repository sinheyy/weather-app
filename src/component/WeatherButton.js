import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, city }) => {
    const [inputCity, setInputcity] = useState("");

    const selected = (e) => {
        setCity(e.target.value);    /*버튼을 클릭하면 city 설정*/
    }

    const changeCity = (e) => {
        setInputcity(e.target.value)
    }

    const selectedOk = () => {
        setCity(inputCity)    /*버튼을 클릭하면 city 설정*/
    }

    return (
        <div className='buttons'>
            <Button className="button" variant="info" onClick={() => (setCity("current"))} ><b>Current</b></Button>
            <input className='input' placeholder='Input city in English' value={inputCity} onChange={changeCity}></input>
            <Button className="button" variant="info" onClick={selectedOk}><b>OK</b></Button>
            <div className='citytext'><b> OR </b></div>
            <select autoFocus defaultValue="CHOOSE CITY ✨" className='select' onChange={selected}>
                <option disabled>CHOOSE CITY ✨</option>
                {
                    cities.map((item) => (
                        <option className="button" value={item} variant="info" >{item}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default WeatherButton
