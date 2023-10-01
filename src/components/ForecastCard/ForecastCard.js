import Icon from "../Icon/Icon";
import moment from "moment";


const ForecastCard = ({ weather, currentTemp, date, maxTemperature, minTemperature }) => {
  const DATE_FORMAT = "ddd";
  const isToday = moment.unix(date.value).isSame(moment(), "day");
  const isNow = moment.unix(date.value).isSame(moment(), "hour");
  // check if the date is today or now and format it accordingly
  const formattedDate = (date.format === DATE_FORMAT && isToday) ? "Today" : (isNow ? "Now" : moment.unix(date.value).format(date.format).toString());

  return (
    <div className="forecast-card">
      <span className="forecast-card-text">
        {formattedDate}
      </span>
      <Icon code={weather} type="static" color="#fff" />
      {currentTemp ? (
        <span className="forecast-card-text">{Math.round(currentTemp)}</span>
      ) : (
        <span className="forecast-card-text">
          {Math.round(maxTemperature)}{" "}
          <span className="forecast-card-text-gray">{Math.round(minTemperature)}</span>
        </span>
      )}
    </div>
  );
};

export default ForecastCard;
