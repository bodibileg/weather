import WeatherDetails from "../WeatherDetails/WeatherDetails";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";

import "./WeatherCard.scss";
import { useEffect, useState } from "react";

const WeatherCard = () => {
  const [delayed, setDelayed] = useState(false);
  const current = useSelector((state) => state.weather.weatherData.current);
  const loading = useSelector((state) => state.weather.loading);

  useEffect(() => {
    if(loading) {
      setTimeout(() => {
        setDelayed(true);
      }, 500);
    }
  }
  , [loading]);

  return (
    <div className="weather-card">
      {(current 
      || (loading && delayed)
      ) ? (
        <>
          <CurrentWeather />
          <WeatherDetails />
        </>
      ) : (
        <div className={`search-container ${loading ? 'grow' : ''}`}>
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
