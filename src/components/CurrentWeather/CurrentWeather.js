import moment from "moment";

import thermometerMoon from "../../assets/icons/static/thermometer-glass.svg";
import thermometerSun from "../../assets/icons/static/thermometer.svg";
import cloud from "../../assets/icons/static/cloudy.svg";

import SearchBar from "../SearchBar/SearchBar";
import Icon from "../Icon/Icon";

import Skeleton from "@mui/material/Skeleton";

import { useSelector } from "react-redux";

const CurrentWeather = () => {
  const currentWeather = useSelector((state) => state.weatherData.current);
  const loading = useSelector((state) => state.loading);

  return (
    <div className="current-weather">
      <SearchBar />

      {/* location name */}
      {loading ? (
        <Skeleton variant="text" width={"60%"} className="location" />
      ) : (
        <div className="location">
          <span className="location-name">{currentWeather && currentWeather.name}</span>
        </div>
      )}

      {/* animated icon */}
      {loading ? (
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={"100%"}
          className="animated-icon"
        />
      ) : (
        <Icon
          className="animated-icon"
          code={currentWeather && currentWeather.weather[0].icon}
          type="animated"
          color="#fff"
        />
      )}
      {/* <Icon
        className="animated-icon"
        code={currentWeather && currentWeather.weather[0].icon}
        type="animated"
        color="#fff"
      /> */}

      {/* current weather details */}
      {loading ? (
        <Skeleton variant="text" width={"40%"} className="temperature" />
      ) : (
        <span className="temperature">
          {currentWeather && Math.round(currentWeather.temp) + "°"}
        </span>
      )}
      {/* <Typography variant="h2" className="temperature">{loading ? <Skeleton width={'100%'} /> : currentWeather && Math.round(currentWeather.temp) + "°"}</Typography> */}
      {loading ? (
        <Skeleton variant="text" width={"50%"} className="date" />
      ) : (
        <span className="date">
          {currentWeather &&
            moment.unix(currentWeather.dt).format("MMMM D, YYYY").toString()}
        </span>
      )}
      {loading ? (
        <Skeleton variant="text" width={"40%"} className="weather" />
      ) : (
      <span className="weather">
        {currentWeather &&
          currentWeather.weather[0].description[0].toUpperCase() +
            currentWeather.weather[0].description.slice(1)}
      </span>)}
      {loading ? (
        <Skeleton variant="text" width={"40%"} className="max-min" />
      ) : (
      <div className="max-min">
        <img className="max-icon" src={thermometerSun} alt="max icon" />
        <span className="max">
          {currentWeather && Math.round(currentWeather.maxTemp) + "°"}
        </span>
        <img className="min-icon" src={thermometerMoon} alt="min icon" />
        <span className="min">
          {currentWeather && Math.round(currentWeather.minTemp) + "°"}
        </span>
      </div>)}

      {/* cloudiness */}
      {loading ? (
        <Skeleton variant="text" width={"20%"} className="clouds" />
      ) : (
      <div className="clouds">
        <img className="cloud-icon" src={cloud} alt="cloud icon" />
        <span className="cloudiness">
          {currentWeather && currentWeather.clouds + "%"}
        </span>
      </div>)}
    </div>
  );
};

export default CurrentWeather;
