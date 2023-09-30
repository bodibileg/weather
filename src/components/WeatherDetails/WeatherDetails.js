import { useState } from "react";
import ForecastCard from "../ForecastCard/ForecastCard";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setUnit,
  setWeatherData,
} from "../../containers/weatherSlice";
import getWeatherData from "../../services/getWeatherData";
import Skeleton from "@mui/material/Skeleton";

const WeatherDetails = () => {
  const [weekly, setWeekly] = useState(true);

  const units = useSelector((state) => state.units);
  const location = useSelector((state) => state.location);
  const loading = useSelector((state) => state.loading);
  const { daily, hourly } = useSelector((state) => state.weatherData);

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
      const result = await getWeatherData(
        location.lat,
        location.lon,
        units === "metric" ? "imperial" : "metric"
      );
      result.current.name = location.name;
      dispatch(setWeatherData(result));

      // loading false
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="weather-details">
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
          {/* {loading
            ? daily.map((day) => (
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={"100%"}
                  className="forecast-card"
                />
              ))
            : null
          } */}
          {weekly ? (
            daily?.map((day, index) => (
              <ForecastCard
                key={index}
                weather={day.weather[0].icon}
                min={day.temp.min}
                max={day.temp.max}
                date={{ value: day.dt, format: "ddd" }}
              />
            ))
          ) : (
            hourly?.map((hour, index) => (
              <ForecastCard
                key={index}
                weather={hour.weather[0].icon}
                temp={hour.temp}
                date={{ value: hour.dt, format: "h A" }}
              />
            ))
          )}
        </div>
      </div>

      <div className="highlights">
        <span className="label">Highlights</span>
        <div className="highlights-body">
          <div className="highlight-card"></div>
          <div className="highlight-card"></div>
          <div className="highlight-card"></div>
          <div className="highlight-card"></div>
          <div className="highlight-card"></div>
          <div className="highlight-card"></div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
