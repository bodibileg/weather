import WeatherDetails from "../WeatherDetails/WeatherDetails";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import "./style.scss";

const WeatherCard = () => {

  return (
    <div className="weather-card">
      <CurrentWeather />
      <WeatherDetails />
    </div>
  );
};

export default WeatherCard;
