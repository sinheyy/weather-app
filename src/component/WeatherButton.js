import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, city }) => {
    const selected = (e) => {
        setCity(e.target.value);    /*버튼을 클릭하면 city 설정*/
    }

    return (
        <div className='buttons'>
            <Button className="button" variant="info" onClick={() => (setCity("current"))} ><b>Current</b></Button>
            <div className='citytext'><b>Other city :</b></div>
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
