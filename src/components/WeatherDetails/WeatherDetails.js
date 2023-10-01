import { useState } from "react";
//components
import Highlights from "../Highlights/Highlights";
import ForecastCard from "../ForecastCard/ForecastCard";
import Skeleton from "@mui/material/Skeleton";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setUnit,
  setWeatherData,
} from "../../containers/weatherSlice";
//services
import getWeatherData from "../../services/getWeatherData";
import "./WeatherDetails.scss";

const WeatherDetails = () => {
  const [weekly, setWeekly] = useState(true);

  const { units, location, loading, weatherData } = useSelector(
    (state) => state.weather
  );
  const { daily, hourly } = weatherData;
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const toggleWeekly = () => {
    setWeekly(!weekly);
  };

  const toggleUnits = async () => {
    dispatch(setUnit(units === "metric" ? "imperial" : "metric"));

    if (location.lat && location.lon) {
      // loading
      dispatch(setLoading(true));

      // get and set weather data
      const weatherData = await getWeatherData(
        location.lat,
        location.lon,
        units === "metric" ? "imperial" : "metric"
      );
      dispatch(setWeatherData(weatherData));

      // loading false
      dispatch(setLoading(false));
    }
  };

  const repeatedSkeleton = (length, className, width) =>
    Array.from({ length: length }, (_, index) => (
      <Skeleton
        key={index}
        variant="rounded"
        width={width + "%"}
        height={"100%"}
        className={className}
        sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
      />
    ));

  const darkStyle = {
    background: "rgba( 0, 0, 0, 0.5 )",
    backdropFilter: "saturate(180%) blur( 20px )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    borderRadius: "0 32px 32px 0",
    WebkitBackdropFilter: "blur( 20px )",
  };

  return (
    <div className="weather-details" style={theme.isDark ? darkStyle : {}}>
      <div className="forecast">
        <div className="forecast-header">
          <button className={`today-button ${!weekly}`} onClick={toggleWeekly}>
            Today
          </button>
          <button className={`today-button ${weekly}`} onClick={toggleWeekly}>
            Week
          </button>
          <div className="forecast-header-right">
            <div className="button" id="button-1">
              <input
                type="checkbox"
                className="checkbox"
                checked={units === "metric"}
                onChange={toggleUnits}
              />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </div>
        </div>

        <div className="forecast-body">
          {/* rendering skeleton loader while loading */}
          {loading
            ? repeatedSkeleton(7, "forecast-card", 80)
            : weekly
            ? daily?.map((day, index) => (
                <ForecastCard
                  key={index}
                  weather={day.weather[0].icon}
                  minTemperature={day.temp.min}
                  maxTemperature={day.temp.max}
                  date={{ value: day.dt, format: "ddd" }}
                />
              ))
            : hourly?.map((hour, index) => (
                <ForecastCard
                  key={index}
                  weather={hour.weather[0].icon}
                  currentTemp={hour.temp}
                  date={{ value: hour.dt, format: "h A" }}
                />
              ))}
        </div>
      </div>

      {/* todays highlights */}
      <Highlights />
    </div>
  );
};

export default WeatherDetails;
