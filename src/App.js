import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.div`
  margin: 100px auto 20px;
  text-align: center;
  font-size: 24px;
`;

const WeatherBox = styled.div`
  width: 300px;
  height: 150px;
  margin: 50px auto 20px;
  text-align: center;
  box-shadow: 0 0 38px -12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Weather = styled.div`
  font-size: 32px;
`;

const Input = styled.input`
  display: block;
  border-radius: 4px;
  height: 30px;
  width: 300px;
  border: 1px solid #ccc;
  margin: 50px auto;
`;

function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState("Vancouver");
  const [hasError, setHasError] = useState(false);

  useEffect(async () => {
    getApi();
  }, []);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getApi();
  };

  const getApi = () => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: location,
          appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
        },
      })
      .then((res) => {
        setHasError(false);
        setWeather(res.data.weather[0].description);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  return (
    <main>
      <Title>{location}'s Weather</Title>
      <WeatherBox>
        <Weather>{hasError ? "Not Found" : weather}</Weather>
      </WeatherBox>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="location"
          onChange={handleChange}
          value={location}
        />
      </form>
    </main>
  );
}

export default App;
