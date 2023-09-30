import { useEffect, useState } from "react";

const Icon = ({ code, type , color, className }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        if(code) {
          import(`../../assets/icons/${type}/${iconList[code]}.svg`).then((icon) =>
            setIcon(icon.default)
          );
        }
      } catch (error) {}
    };
    importIcon();
  }, [code, type]);

  if(!icon) return null;

    return <img className={className} src={icon} alt={iconList[code]}
     fill={color} />;
};

const iconList = {
    '01d': 'clear-day',
    '01n': 'starry-night',
    '02d': 'partly-cloudy-day',
    '02n': 'partly-cloudy-night',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'overcast',
    '04n': 'overcast',
    '09d': 'overcast-rain',
    '09n': 'overcast-rain',
    '10d': 'rain',
    '10n': 'rain',
    '11d': 'thunderstorms',
    '11n': 'thunderstorms',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'mist',
    '50n': 'mist',
    'sunrise': 'sunrise',
    'sunset': 'sunset',
    'humidity': 'humidity',
    'barometer': 'barometer',
}

// const weatherIcons = {
//   200: 'thunderstorms-rain.svg',
//   201: 'thunderstorms-rain.svg',
//   202: 'thunderstorms-day-extreme-rain.svg',
//   210: 'thunderstorms.svg',
//   211: 'thunderstorms.svg',
//   212: 'thunderstorms-overcast.svg',
//   221: 'thunderstorms-overcast.svg',
//   230: 'thunderstorms-rain.svg',
//   231: 'thunderstorms-rain.svg',
//   232: 'thunderstorms-rain.svg',
//   300: 'drizzle.svg',
//   301: 'drizzle.svg',
//   302: 'drizzle.svg',
//   310: 'drizzle.svg',
//   311: 'drizzle.svg',
//   312: 'drizzle.svg',
//   313: 'drizzle.svg',
//   314: 'drizzle.svg',
//   321: 'drizzle.svg',
//   500: 'rain.svg',
//   501: 'rain.svg',
//   502: 'rain.svg',
//   503: 'rain.svg',
//   504: 'rain.svg',
//   511: 'freezing-rain.svg',
//   520: 'rain.svg',
//   521: 'rain.svg',
//   522: 'rain.svg',
//   531: 'rain.svg',
//   600: 'snow.svg',
//   601: 'snow.svg',
//   602: 'snow.svg',
//   611: 'sleet.svg',
//   612: 'sleet.svg',
//   613: 'sleet.svg',
//   615: 'snow.svg',
//   616: 'snow.svg',
//   620: 'snow.svg',
//   621: 'snow.svg',
//   622: 'snow.svg',
//   701: 'mist.svg',
//   711: 'smoke.svg',
//   721: 'haze.svg',
//   731: 'dust.svg',
//   741: 'fog.svg',
//   751: 'dust.svg',
//   761: 'dust.svg',
//   762: 'volcanic-ash.svg',
//   771: 'squalls.svg',
//   781: 'tornado.svg',
//   800: 'clear-day.svg',
//   801: 'cloudy.svg',
//   802: 'cloudy.svg',
//   803: 'cloudy.svg',
//   804: 'overcast.svg'
// };

export default Icon;
