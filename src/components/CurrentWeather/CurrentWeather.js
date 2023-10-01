import SearchBar from "../SearchBar/SearchBar";
import Icon from "../Icon/Icon";
import Skeleton from "@mui/material/Skeleton";

import thermometerMoon from "../../assets/icons/static/thermometer-glass.svg";
import thermometerSun from "../../assets/icons/static/thermometer.svg";
import cloud from "../../assets/icons/static/cloudy.svg";

import { useSelector } from "react-redux";
import moment from "moment";
import "./CurrentWeather.scss";

const CurrentWeather = () => {
  const currentWeather = useSelector(
    (state) => state.weather.weatherData.current
  );
  const loading = useSelector((state) => state.weather.loading);
  const theme = useSelector((state) => state.theme);

  const darkStyle = {
    background: "rgba( 0, 0, 0, 0.5 )",
    backdropFilter: "saturate(180%) blur( 4px )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    borderRadius: "32px 0 0 32px",
    WebkitBackdropFilter: "blur( 4px )",
  };

  return (
    <div className="current-weather" style={theme.isDark ? darkStyle : {}}>
      <div className="search-box">
        <SearchBar />
      </div>

      <div className="current-weather-body">
        <div className="current-weather-top">
          {/* location name */}
          {loading ? (
            <Skeleton
              variant="text"
              width={"60%"}
              style={{ height: "50px" }}
              sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
            />
          ) : (
            <div className="location">
              <span className="location-name">{currentWeather.name}</span>
            </div>
          )}

          {/* animated icon */}
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
              variant="rounded"
              width={"100%"}
              height={"50%"}
              // className="animated-icon"
            />
          ) : (
            <Icon
              className="animated-icon"
              code={currentWeather.weather[0].icon}
              weatherCode={currentWeather.weather[0].id}
              type="animated"
              color="#fff"
            />
          )}
        </div>

        {/* current weather details */}
        <div className="current-weather-bottom">
          {loading ? (
            <Skeleton
              variant="text"
              width={"40%"}
              className="temperature"
              sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
            />
          ) : (
            <span className="temperature">
              {Math.round(currentWeather.temp) + "°"}
            </span>
          )}

          {loading ? (
            <Skeleton
              variant="text"
              width={"40%"}
              className="weather"
              sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
            />
          ) : (
            <span className="weather">
              {currentWeather.weather[0].description[0].toUpperCase() +
                currentWeather.weather[0].description.slice(1)}
            </span>
          )}
          {loading ? (
            <Skeleton
              variant="text"
              width={"50%"}
              className="date"
              sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
            />
          ) : (
            <span className="date">
              {moment.unix(currentWeather.dt).format("MMMM D, YYYY").toString()}
            </span>
          )}
          {loading ? (
            <Skeleton
              variant="text"
              width={"40%"}
              className="max-min"
              sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
            />
          ) : (
            <div className="max-min">
              <img className="max-icon" src={thermometerSun} alt="max icon" />
              <span className="max">
                {Math.round(currentWeather.maxTemp) + "°"}
              </span>
              <img className="min-icon" src={thermometerMoon} alt="min icon" />
              <span className="min">
                {Math.round(currentWeather.minTemp) + "°"}
              </span>
            </div>
          )}

          {/* cloudiness */}
          {loading ? (
            <Skeleton
              variant="text"
              width={"20%"}
              className="clouds"
              sx={{ bgcolor: "rgba( 255, 255, 255, 0.5 )" }}
            />
          ) : (
            <div className="clouds">
              <img className="cloud-icon" src={cloud} alt="cloud icon" />
              <span className="cloudiness">{currentWeather.clouds + "%"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
