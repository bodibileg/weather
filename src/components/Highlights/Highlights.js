import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import Icon from "../Icon/Icon";
import "./Highlights.scss";

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

const Highlights = () => {
  const units = useSelector((state) => state.weather.units);
  const loading = useSelector((state) => state.weather.loading);
  const { current } = useSelector(
    (state) => state.weather.weatherData
  );

  
  return (
    <div className="highlights">
      <span className="label">Highlights</span>
      <div className="highlights-body">
        {loading ? repeatedSkeleton(6, "highlight-card", 100) : null}
        {!loading && current ? (
          <>
            {console.log(current)}
            <div className="highlight-card">
              <div className="highlight-card-wrapper">
                <div className="highlight-card-title">UV Index</div>
                <div
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="12"
                  style={getColor(current.uvi)}
                ></div>
                <div className="highlight-card-foot"></div>
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card-wrapper">
                <div className="highlight-card-title">Wind Status</div>
                <div className="highlight-card-content">
                  <div className="highlight-card-content-txt">
                    {current.wind_speed}
                    <span className="id">
                      {units === "metric" ? "km/h" : "ml/h"}
                    </span>
                  </div>
                </div>
                <div className="highlight-card-foot">
                  Wind direction: {getWindDirection(current.wind_deg)}
                </div>
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card-wrapper">
                <div className="highlight-card-title">Sunrise & Sunset</div>
                <div className="highlight-card-sun">
                <Icon className="sun" code='sunrise' type="static" color="#fff" />
                  <div>{moment.unix(current.sunrise).format("LT")}</div>
                </div>
                <div className="highlight-card-sun">
                <Icon className="sun" code='sunset' type="static" color="#fff" />
                  <div>{moment.unix(current.sunset).format("LT")}</div>
                </div>
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card-wrapper">
                <div className="highlight-card-title">Humidity</div>
                <div className="highlight-card-content">
                  <div className="highlight-card-sun">
                    <div className="highlight-card-content-txt">
                      {current.humidity}
                    </div>
                  </div>
                    <Icon className="icon" code='humidity' type="static" color="#fff" />
                </div>
                <div className="highlight-card-foot">
                  {humidityDetails(current.humidity)}
                </div>
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card-wrapper">
                <div className="highlight-card-title">Visibility</div>
                <div className="highlight-card-content">
                  <div className="highlight-card-content-txt">
                    {current.visibility / (units === "metric" ? 1000 : 1600)}
                    <span className="id">
                      {units === "metric" ? "km" : "ml"}
                    </span>
                  </div>
                  <div className="highlight-card-content-icon"></div>
                </div>
                <div className="highlight-card-foot">
                  {getVisibilityDetails(current.visibility)}
                </div>
              </div>
            </div>
            <div className="highlight-card">
              <div className="highlight-card-wrapper">
                <div className="highlight-card-title">Pressure</div>
                <div className="highlight-card-content">
                  <div className="highlight-card-content-txt">
                    {parseFloat(current.pressure * 0.02952998057228486).toFixed(
                      2
                    )}
                  </div>
                  <div className="highlight-card-content-icon">
                    <Icon className="icon" code='barometer' type="static" color="#fff" />
                  </div>
                </div>
                <div className="highlight-card-foot">inhg</div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
const getColor = (val) => {
  let styles = {
    "--value": val,
    // "--chartColor" : ""
  };
  if (val <= 3) {
    styles["--chartColor"] = "#91c700";
  } else if (val <= 6) {
    styles["--chartColor"] = "#f8b801";
  } else if (val <= 8) {
    styles["--chartColor"] = "#f58d03";
  } else if (val <= 10) {
    styles["--chartColor"] = "#f23d05";
  } else {
    styles["--chartColor"] = "#9936d4";
  }
  return styles;
};
const humidityDetails = (humidity) => {
  if (humidity <= 20) {
    return "Dry";
  }
  if (humidity <= 60) {
    return "Comfortable";
  }
  return "Too Humid";
};
const getVisibilityDetails = (distance) => {
  if (distance <= 5000) {
    return "Poor visibility";
  }
  if (distance <= 7000) {
    return "Moderate visibility";
  }
  return "Good visibility";
};
const getWindDirection = (degree) => {
  //213.75 - 236.25
  const directions = [
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  let starts = 11.25;
  for (let i = 0; i < directions.length; i++) {
    if (degree >= starts && degree <= starts + 22.5) {
      return directions[i];
    }
    starts += 22.5;
  }
  return "N";
};
export default Highlights;
