import axios from "axios";

const getWeatherData = async (latitude, longitude, units) => {
  const url =
    process.env.REACT_APP_OPENWEATHERMAP_API_URL +
    "data/3.0/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=" +
    (units || "imperial") +
    "&exclude=minutely" +
    "&appid=" +
    process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  let weatherData = null;

  try {
    const result = await axios.get(url);
    weatherData = result.data;

    //add max and min temp to current weather data
    weatherData.current.maxTemp = weatherData.daily[0].temp.max;
    weatherData.current.minTemp = weatherData.daily[0].temp.min;

    //splice out last 24 hours of hourly data
    weatherData.hourly.splice(24, 24);
    return weatherData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getWeatherData;
