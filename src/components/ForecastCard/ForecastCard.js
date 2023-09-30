import Icon from "../Icon/Icon";
import moment from "moment";

const ForecastCard = ({ weather, temp, date, max, min }) => {
  return (
    <div className="forecast-card">
      <span className="forecast-card-text">
        {date.format === "ddd"
          ? moment.unix(date.value).isSame(moment(), "day")
            ? "Today"
            : moment.unix(date.value).format(date.format).toString()
          : moment.unix(date.value).isSame(moment(), "hour")
          ? "Now"
          : moment.unix(date.value).format(date.format).toString()}
      </span>
      <Icon code={weather} type="static" color="#fff" />
      {temp ? (
        <span className="forecast-card-text">{Math.round(temp)}</span>
      ) : (
        <span className="forecast-card-text">
          {Math.round(max)}{" "}
          <span className="forecast-card-text-gray">{Math.round(min)}</span>
        </span>
      )}
    </div>
  );
};

export default ForecastCard;
