import { useState } from "react";
import searchSVG from "../../assets/icons/static/search.svg";
import myLocation from "../../assets/icons/static/my-location.png";
import {
  getLocationByZipcode,
  getLocationFromBrowser,
} from "../../services/geoLocation";
import getWeatherData from "../../services/getWeatherData";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setLocation,
  setWeatherData,
} from "../../containers/weatherSlice";
import Alert from "@mui/material/Alert";
import SnackBar from "@mui/material/Snackbar";
import isNight from "../../utils/isNight";
import "./SearchBar.scss";

const isValidZipcode = (input) => /^\d{5}$/.test(input);

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const units = useSelector((state) => state.units);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // handle click on search button
  const handleClick = () => {
    // validate input
    if (!isValidZipcode(input)) {
      setError("Please enter a valid 5-digit zipcode");
      return;
    }

    getWeather(input);
    //clear input
    input && setInput("");
  };

  // handle click on location button
  const handleLocationClick = () => {
    getWeather();
  };

  // get weather data
  const getWeather = async (zipcode) => {
    // set loading
    dispatch(setLoading(true));

    // get and set location and name from zipcode or browser
    const location = zipcode
      ? await getLocationByZipcode(input)
      : await getLocationFromBrowser();
    if (location === null) {
      dispatch(setLoading(false));
      setError("Please enable location services and try again.");
      return;
    }
    const { latitude, longitude, name } = location;
    dispatch(setLocation({ lat: latitude, lon: longitude, name: name }));

    // get and set weather data
    const result = await getWeatherData(latitude, longitude, units, name);
    dispatch(setWeatherData(result));

    // set theme
    isNight(result.current, dispatch);

    // loading false
    dispatch(setLoading(false));
  };

  return (
    <div className="search-bar">
      <input
        className="input"
        placeholder="Enter zipcode ... "
        value={input}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      />
      <button className="search-button" onClick={handleClick}>
        <img className="search-icon" src={searchSVG} alt="search icon" />
      </button>
      <button className="location-button" onClick={handleLocationClick}>
        <img
          className="my-location-icon"
          src={myLocation}
          alt="my location icon"
        />
      </button>
      <SnackBar
        open={error !== ""}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setInput("");
          setError("");
        }}
      >
        <Alert
          onClose={() => {
            setInput("");
            setError("");
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </SnackBar>
    </div>
  );
};

export default SearchBar;
