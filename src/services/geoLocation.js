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
  try {
    const coordinates = await getUserLocation();
    const location = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    const reverseApiUrl =
      `${process.env.REACT_APP_OPENWEATHERMAP_API_URL}geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

    const result = await axios.get(reverseApiUrl);
    location.name = result.data[0].name;

    return location;
  } catch (error) {
    console.error("Error getting location from browser:", error);
    return null;
  }
};

const getLocationByZipcode = async (zipcode) => {
  try {
    const zipcodeApiUrl =
      `${process.env.REACT_APP_OPENWEATHERMAP_API_URL}geo/1.0/zip?zip=${zipcode}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

    const result = await axios.get(zipcodeApiUrl);
    const location = {
      latitude: result.data.lat,
      longitude: result.data.lon,
      name: result.data.name,
    };

    return location;
  } catch (error) {
    console.error("Error getting location by zipcode:", error);
    alert("An error occurred while fetching data. Please try again later.");
    return null;
  }
};

export { getLocationByZipcode, getLocationFromBrowser };
