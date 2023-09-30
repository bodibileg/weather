import axios from "axios";

const getUserLocation = () => {
  return new Promise(function (resolve, reject) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position.coords);
        },
        function (error) {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const getLocationFromBrowser = async () => {
  console.log("getLocationFromBrowser");
  let location = null;

  try {
    const coords = await getUserLocation();
    location = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    //call reverse Api to get city name
    const url =
      process.env.REACT_APP_OPENWEATHERMAP_API_URL +
      "geo/1.0/reverse?lat=" +
      location.latitude +
      "&lon=" +
      location.longitude +
      "&appid=" +
      process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    const result = await axios.get(url);
    location.name = result.data[0].name;
    return location;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getLocationZipcode = async (zipcode) => {
  const url =
    process.env.REACT_APP_OPENWEATHERMAP_API_URL +
    "geo/1.0/zip?zip=" +
    zipcode +
    "&appid=" +
    process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  let location = null;

  try {
    const result = await axios.get(url);
    location = {
      latitude: result.data.lat,
      longitude: result.data.lon,
      name: result.data.name,
    };
    return location;
  } catch (error) {
    console.error(error);
    alert("Please enter a valid zipcode");
    return null;
  }
};

export { getLocationZipcode, getLocationFromBrowser };
