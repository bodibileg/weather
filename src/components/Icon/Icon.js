import { useEffect, useState } from "react";

const Icon = ({ code, weatherCode, type, color, className }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        if (code) {
          import(
            `../../assets/icons/${type}/${
              weatherIconList[weatherCode] || iconList[code]
            }.svg`
          ).then((icon) => setIcon(icon.default));
        }
      } catch (error) {}
    };
    importIcon();
  }, [code, weatherCode, type]);

  if (!icon) return null;

  return (
    <img className={className} src={icon} alt={iconList[code]} fill={color} />
  );
};

const iconList = {
  "01d": "clear-day",
  "01n": "starry-night",
  "02d": "partly-cloudy-day",
  "02n": "partly-cloudy-night",
  "03d": "cloudy",
  "03n": "cloudy",
  "04d": "overcast",
  "04n": "overcast",
  "09d": "overcast-rain",
  "09n": "overcast-rain",
  "10d": "rain",
  "10n": "rain",
  "11d": "thunderstorms",
  "11n": "thunderstorms",
  "13d": "snow",
  "13n": "snow",
  "50d": "mist",
  "50n": "mist",
  sunrise: "sunrise",
  sunset: "sunset",
  humidity: "humidity",
  barometer: "barometer",
};

const weatherIconList = {
  200: "thunderstorms-rain",
  201: "thunderstorms-rain",
  202: "thunderstorms-overcast-rain",
  210: "thunderstorms",
  211: "thunderstorms",
  212: "thunderstorms-overcast",
  221: "thunderstorms-overcast",
  230: "thunderstorms-rain",
  231: "thunderstorms-rain",
  232: "thunderstorms-rain",
  300: "drizzle",
  301: "drizzle",
  302: "drizzle",
  310: "drizzle",
  311: "rain",
  312: "drizzle",
  313: "drizzle",
  314: "drizzle",
  321: "drizzle",
  500: "rain",
  501: "rain",
  502: "rain",
  503: "rain",
  504: "rain",
  511: "overcast-sleet",
  520: "rain",
  521: "rain",
  522: "rain",
  531: "rain",
  600: "snow",
  601: "snow",
  602: "snow",
  611: "sleet",
  612: "sleet",
  613: "sleet",
  615: "snow",
  616: "snow",
  620: "snow",
  621: "snow",
  622: "snow",
  701: "mist",
  711: "smoke",
  721: "haze",
  731: "dust",
  741: "fog",
  751: "dust",
  761: "dust",
  762: "smoke",
  771: "thunderstorms",
  781: "tornado",
};

export default Icon;
