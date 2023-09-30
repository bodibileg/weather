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
import "./WeatherDetails.scss";
import Highlights from "../Highlights/Highlights";

const WeatherDetails = () => {
  const [weekly, setWeekly] = useState(true);

  const units = useSelector((state) => state.weather.units);
  const location = useSelector((state) => state.weather.location);
  const loading = useSelector((state) => state.weather.loading);
  const { daily, hourly } = useSelector((state) => state.weather.weatherData);
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


  const repeatedSkeleton = (length, className, width) => Array.from({ length: length }, (_, index) => (
    <Skeleton
      key={index}
      variant="rounded"
      width={width+"%"}
      height={"100%"}
      className={className}
      sx={{ bgcolor: 'rgba( 255, 255, 255, 0.5 )' }}
    />
  ));

  const darkStyle = {
    background: 'rgba( 0, 0, 0, 0.5 )',
    backdropFilter: 'saturate(180%) blur( 20px )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    borderRadius: '0 32px 32px 0',
    WebkitBackdropFilter: "blur( 20px )"
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
          {loading
            ? repeatedSkeleton(7, 'forecast-card', 80)
            : (weekly ? (
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
            ))
          }
          {}
        </div>
      </div>

      <Highlights />
    </div>
  );
};

export default WeatherDetails;
