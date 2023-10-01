import WeatherDetails from "../WeatherDetails/WeatherDetails";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";

import "./WeatherCard.scss";
import { useEffect, useState } from "react";

const WeatherCard = () => {
  const [delayed, setDelayed] = useState(false);

  // Redux selectors to get data from the store
  const current = useSelector((state) => state.weather.weatherData.current);
  const loading = useSelector((state) => state.weather.loading);

  // Effect to manage the loading delay
  useEffect(() => {
    if (loading) {
      // Set a delay before showing the loading animation
      setTimeout(() => {
        setDelayed(true);
      }, 500);
    }
  }, [loading]);

  return (
    <div className="weather-card">
      {/* delay to wait for the animation to finish */}
      {current || (loading && delayed) ? (
        <>
          <CurrentWeather />
          <WeatherDetails />
        </>
      ) : (
        <div className={`search-container ${loading ? "grow" : ""}`}>
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
