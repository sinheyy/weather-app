import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

// steps
// 1. 앱 실행 시, 현재 위치 기반 날씨가 보임
// 2. 날씨 정보는 도시, 섭씨, 화씨, 날씨 상태가 보임
// 3. 아래에 버튼 5개 - 1개는 현재 위치, 4개는 다른 도시
// 4. 도서 버튼을 클릭할 때마다 도시별 날씨가 나옴
// 5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재 위치 기반으로 돌아옴
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities = ['Paris', 'New York', 'Busan', 'Seoul', 'Tokyo', 'Kyoto', 'Jakarta', 'Abu Dhabi', 'Ankara', 'Beijing', 'Bangkok', 'Cairo', 'Cape Town', 'Dallas', 'Doha', 'Fukuoka', 'Rome', 'Singapore', 'Sydney', 'Auckland'];
  const api_key = process.env.REACT_APP_API_KEY;
  console.log("test", api_key);

  // 현재 위치 얻기
  const getCurrentLocation = () => {
    // console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    })
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {   // dynamic 하게 변하는 값은 $ 사인
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      setLoading(true);
      let response = await fetch(url);    // await 쓰려면 함수가 async 처리해야 함
      let data = await response.json();
      //console.log("data", data);

      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

  }

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
      setLoading(true);
      let response = await fetch(url);    // await 쓰려면 함수가 async 처리해야 함
      let data = await response.json();
      console.log("data", data);

      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

  }

  useEffect(() => {
    if (city == "" || city == "current") {
      getCurrentLocation();  //현재 위치 가져옴
    }
    else {
      getWeatherByCity();   // 도시별 날씨 보여주자
    }

  }, [city]); // array에 아무 것도 없으면 componentDidMount, // city state를 주시하다가 city가 바뀌면 호출해줌

  return (
    <div className='main' style={
      weather
        ? {
          backgroundImage: `url(/images/bg-${weather?.weather[0]?.main}.jpg)`
        }
        : {
          background: `url(https://www.colorhexa.com/e6e9ec.png)`
        }
    }>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap')
      </style>

      { // 삼항 연산식으로 loading이 true일 때는 박스가 안 보이고 로딩 스피너가 보이도록 함
        loading ? (<div className='container'><ClipLoader color="#FFFFFF" loading={loading} size={150} /></div>) :
          (<div className='container'>
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} setCity={setCity} city={city} />  {/*setCity도 보내줄 수 있다!*/}
          </div>)
      }
    </div>
  );
}

export default App;
