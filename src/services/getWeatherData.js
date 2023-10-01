import axios from "axios";

const getWeatherData = async (latitude, longitude, units = "imperial", name) => {
  const apiUrl =
    `${process.env.REACT_APP_OPENWEATHERMAP_API_URL}data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

  try {
    const weatherApiResponse = await axios.get(apiUrl);
    const weatherData = weatherApiResponse.data;

    // Add max and min temp to current weather data
    weatherData.current.maxTemp = weatherData.daily[0].temp.max;
    weatherData.current.minTemp = weatherData.daily[0].temp.min;

    // Add name to current weather data
    weatherData.current.name = name;

    // Splice out last 24 hours of hourly data
    weatherData.hourly.splice(24, 24);

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default getWeatherData;
